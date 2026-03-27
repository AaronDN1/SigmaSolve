"use client";

import { useMemo, useState } from "react";
import { BrainCircuit, ChartSpline, FlaskConical, LogOut, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

import { ResponseRenderer } from "@/components/app/response-renderer";
import { UploadPanel } from "@/components/app/upload-panel";
import { Button } from "@/components/shared/button";
import { createCheckoutSession, generateGraph, logout, runLabHelper, runPromptTool, uploadFile } from "@/lib/api";
import { formatPlan } from "@/lib/utils";
import type { DashboardData, UploadedFile, UsageStatus, User } from "@/types";

type WorkspaceTab = "ai_prompt" | "lab_helper" | "graphing";

type Props = {
  user: User;
  usage: UsageStatus;
  dashboard: DashboardData;
};

const subjectOptions = [
  "Math",
  "Physics",
  "Chemistry",
  "Biology",
  "Engineering",
  "Computer Science",
  "Statistics",
  "General STEM"
];

export function WorkspaceShell({ user, usage, dashboard }: Props) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<WorkspaceTab>("ai_prompt");
  const [response, setResponse] = useState<string>("");
  const [graphUrl, setGraphUrl] = useState<string>("");
  const [promptFiles, setPromptFiles] = useState<UploadedFile[]>([]);
  const [labFiles, setLabFiles] = useState<UploadedFile[]>([]);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [loadingAction, setLoadingAction] = useState(false);
  const [error, setError] = useState<string>("");

  const [promptForm, setPromptForm] = useState({
    subject: "Math",
    prompt: ""
  });
  const [labForm, setLabForm] = useState({
    subject: "Chemistry",
    lab_title: "",
    description: "",
    observations: "",
    methods: "",
    results: "",
    notes: ""
  });
  const [graphForm, setGraphForm] = useState({
    title: "Position vs Time",
    x_label: "Time (s)",
    y_label: "Position (m)",
    graph_type: "line",
    equation: "sin(x)",
    x_min: -10,
    x_max: 10,
    sample_count: 200,
    rawX: "0,1,2,3,4",
    rawY: "0,1.4,2.9,4.1,5.2",
    label: "Measured data"
  });

  const recentOutputs = dashboard.recent_outputs;

  const usageLabel = useMemo(() => {
    if (usage.remaining_today === null) return "Unlimited access";
    return `${usage.remaining_today} uses remaining today`;
  }, [usage.remaining_today]);

  async function handleUpload(file: File, purpose: "ai_prompt" | "lab_helper") {
    setLoadingUpload(true);
    setError("");
    try {
      const uploaded = await uploadFile(file, purpose);
      if (purpose === "ai_prompt") {
        setPromptFiles((current) => [uploaded, ...current]);
      } else {
        setLabFiles((current) => [uploaded, ...current]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setLoadingUpload(false);
    }
  }

  function removeFile(fileId: string, purpose: "ai_prompt" | "lab_helper") {
    if (purpose === "ai_prompt") {
      setPromptFiles((current) => current.filter((file) => file.id !== fileId));
    } else {
      setLabFiles((current) => current.filter((file) => file.id !== fileId));
    }
  }

  async function handlePromptSubmit() {
    setLoadingAction(true);
    setError("");
    try {
      const result = await runPromptTool({
        ...promptForm,
        file_ids: promptFiles.map((file) => file.id)
      });
      setGraphUrl("");
      setResponse(result.content);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to generate explanation.");
    } finally {
      setLoadingAction(false);
    }
  }

  async function handleLabSubmit() {
    setLoadingAction(true);
    setError("");
    try {
      const result = await runLabHelper({
        ...labForm,
        file_ids: labFiles.map((file) => file.id)
      });
      setGraphUrl("");
      setResponse(result.content);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to draft lab report.");
    } finally {
      setLoadingAction(false);
    }
  }

  async function handleGraphSubmit() {
    setLoadingAction(true);
    setError("");
    try {
      const x = graphForm.rawX
        .split(",")
        .map((value) => Number(value.trim()))
        .filter((value) => !Number.isNaN(value));
      const y = graphForm.rawY
        .split(",")
        .map((value) => Number(value.trim()))
        .filter((value) => !Number.isNaN(value));

      const result = await generateGraph({
        title: graphForm.title,
        x_label: graphForm.x_label,
        y_label: graphForm.y_label,
        graph_type: graphForm.graph_type,
        equation: graphForm.equation || undefined,
        x_min: Number(graphForm.x_min),
        x_max: Number(graphForm.x_max),
        sample_count: Number(graphForm.sample_count),
        series: x.length && y.length ? [{ x, y, label: graphForm.label }] : []
      });
      setResponse("");
      setGraphUrl(result.image_url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to generate graph.");
    } finally {
      setLoadingAction(false);
    }
  }

  async function handleUpgrade() {
    try {
      setError("");
      const session = await createCheckoutSession();
      window.location.href = session.checkout_url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to start checkout.");
    }
  }

  async function handleLogout() {
    await logout();
    router.push("/");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-transparent p-4 md:p-6">
      <div className="mx-auto grid max-w-7xl gap-6 xl:grid-cols-[300px_1fr]">
        <aside className="glass-panel rounded-[2rem] p-6">
          <div className="flex items-center gap-4">
            {user.avatar_url ? (
              <img src={user.avatar_url} alt={user.full_name} width={54} height={54} className="rounded-2xl" />
            ) : (
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-ink text-white">
                {user.full_name.charAt(0)}
              </div>
            )}
            <div>
              <p className="text-lg font-semibold text-ink">{user.full_name}</p>
              <p className="text-sm text-slate-500">{user.email}</p>
            </div>
          </div>

          <div className="mt-6 rounded-[1.5rem] bg-ink p-5 text-white">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-300">Plan</p>
            <div className="mt-3 flex items-center justify-between">
              <p className="text-2xl font-semibold">{formatPlan(user.plan_type)}</p>
              <Sparkles className="h-5 w-5 text-gold" />
            </div>
            <p className="mt-3 text-sm text-slate-300">{usageLabel}</p>
            {user.plan_type === "free" && (
              <Button className="mt-5 w-full" onClick={handleUpgrade}>
                Upgrade to Unlimited
              </Button>
            )}
          </div>

          <div className="mt-6 space-y-2">
            <SidebarButton active={activeTab === "ai_prompt"} icon={BrainCircuit} label="AI Prompt" onClick={() => setActiveTab("ai_prompt")} />
            <SidebarButton active={activeTab === "lab_helper"} icon={FlaskConical} label="Lab Helper" onClick={() => setActiveTab("lab_helper")} />
            <SidebarButton active={activeTab === "graphing"} icon={ChartSpline} label="Graphing" onClick={() => setActiveTab("graphing")} />
          </div>

          <div className="mt-8">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Recent outputs</p>
            <div className="mt-4 space-y-3">
              {recentOutputs.map((item) => (
                <div key={item.id} className="rounded-2xl border border-slate-200/80 bg-white px-4 py-3">
                  <p className="text-sm font-semibold text-ink">{item.title}</p>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{item.output_type.replace("_", " ")}</p>
                </div>
              ))}
              {recentOutputs.length === 0 && <p className="text-sm text-slate-500">No saved outputs yet.</p>}
            </div>
          </div>

          <Button variant="secondary" className="mt-8 w-full justify-center gap-2" onClick={handleLogout}>
            <LogOut className="h-4 w-4" />
            Log out
          </Button>
        </aside>

        <section className="space-y-6">
          <div className="glass-panel rounded-[2rem] p-6 md:p-8">
            <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-500">Workspace</p>
                <h1 className="mt-3 font-serif text-4xl text-ink">Solve homework, draft labs, and build graphs.</h1>
              </div>
              <p className="max-w-xl text-sm leading-7 text-slate-500">
                Default tool: AI Prompt. Responses are structured for teaching, not just outputting answers.
              </p>
            </div>
            {error && (
              <div className="mt-5 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                {error}
              </div>
            )}
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
            <div className="glass-panel rounded-[2rem] p-6 md:p-8">
              {activeTab === "ai_prompt" && (
                <div className="space-y-5">
                  <select
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-brand-500"
                    value={promptForm.subject}
                    onChange={(event) => setPromptForm((current) => ({ ...current, subject: event.target.value }))}
                  >
                    {subjectOptions.map((subject) => (
                      <option key={subject} value={subject}>
                        {subject}
                      </option>
                    ))}
                  </select>
                  <textarea
                    className="min-h-44 w-full rounded-[1.5rem] border border-slate-200 bg-white px-4 py-4 text-sm outline-none transition focus:border-brand-500"
                    placeholder="Ask a homework question, paste your work, or describe what you need help understanding."
                    value={promptForm.prompt}
                    onChange={(event) => setPromptForm((current) => ({ ...current, prompt: event.target.value }))}
                  />
                  <UploadPanel
                    purpose="ai_prompt"
                    files={promptFiles}
                    loading={loadingUpload}
                    onUpload={handleUpload}
                    onRemove={(fileId) => removeFile(fileId, "ai_prompt")}
                  />
                  <Button className="w-full" onClick={handlePromptSubmit} disabled={loadingAction}>
                    {loadingAction ? "Generating response..." : "Generate explanation"}
                  </Button>
                </div>
              )}

              {activeTab === "lab_helper" && (
                <div className="space-y-5">
                  <div className="grid gap-4 md:grid-cols-2">
                    <input
                      className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-brand-500"
                      placeholder="Lab title"
                      value={labForm.lab_title}
                      onChange={(event) => setLabForm((current) => ({ ...current, lab_title: event.target.value }))}
                    />
                    <select
                      className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-brand-500"
                      value={labForm.subject}
                      onChange={(event) => setLabForm((current) => ({ ...current, subject: event.target.value }))}
                    >
                      {subjectOptions.map((subject) => (
                        <option key={subject} value={subject}>
                          {subject}
                        </option>
                      ))}
                    </select>
                  </div>
                  <textarea className="min-h-28 rounded-[1.5rem] border border-slate-200 bg-white px-4 py-4 text-sm outline-none focus:border-brand-500" placeholder="Describe the lab and its objective." value={labForm.description} onChange={(event) => setLabForm((current) => ({ ...current, description: event.target.value }))} />
                  <textarea className="min-h-24 rounded-[1.5rem] border border-slate-200 bg-white px-4 py-4 text-sm outline-none focus:border-brand-500" placeholder="Methods / procedure" value={labForm.methods} onChange={(event) => setLabForm((current) => ({ ...current, methods: event.target.value }))} />
                  <textarea className="min-h-24 rounded-[1.5rem] border border-slate-200 bg-white px-4 py-4 text-sm outline-none focus:border-brand-500" placeholder="Observations" value={labForm.observations} onChange={(event) => setLabForm((current) => ({ ...current, observations: event.target.value }))} />
                  <textarea className="min-h-24 rounded-[1.5rem] border border-slate-200 bg-white px-4 py-4 text-sm outline-none focus:border-brand-500" placeholder="Results / data summary" value={labForm.results} onChange={(event) => setLabForm((current) => ({ ...current, results: event.target.value }))} />
                  <textarea className="min-h-24 rounded-[1.5rem] border border-slate-200 bg-white px-4 py-4 text-sm outline-none focus:border-brand-500" placeholder="Additional notes or sources of error" value={labForm.notes} onChange={(event) => setLabForm((current) => ({ ...current, notes: event.target.value }))} />
                  <UploadPanel
                    purpose="lab_helper"
                    files={labFiles}
                    loading={loadingUpload}
                    onUpload={handleUpload}
                    onRemove={(fileId) => removeFile(fileId, "lab_helper")}
                  />
                  <Button className="w-full" onClick={handleLabSubmit} disabled={loadingAction}>
                    {loadingAction ? "Drafting report..." : "Generate lab report"}
                  </Button>
                </div>
              )}

              {activeTab === "graphing" && (
                <div className="space-y-5">
                  <div className="grid gap-4 md:grid-cols-2">
                    <input className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-brand-500" placeholder="Graph title" value={graphForm.title} onChange={(event) => setGraphForm((current) => ({ ...current, title: event.target.value }))} />
                    <select className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-brand-500" value={graphForm.graph_type} onChange={(event) => setGraphForm((current) => ({ ...current, graph_type: event.target.value }))}>
                      <option value="line">Line graph</option>
                      <option value="scatter">Scatter plot</option>
                    </select>
                  </div>
                  <input className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-brand-500" placeholder="Equation, e.g. sin(x) or x^2 + 3*x" value={graphForm.equation} onChange={(event) => setGraphForm((current) => ({ ...current, equation: event.target.value }))} />
                  <div className="grid gap-4 md:grid-cols-3">
                    <input className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-brand-500" placeholder="X label" value={graphForm.x_label} onChange={(event) => setGraphForm((current) => ({ ...current, x_label: event.target.value }))} />
                    <input className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-brand-500" placeholder="Y label" value={graphForm.y_label} onChange={(event) => setGraphForm((current) => ({ ...current, y_label: event.target.value }))} />
                    <input className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-brand-500" placeholder="Series label" value={graphForm.label} onChange={(event) => setGraphForm((current) => ({ ...current, label: event.target.value }))} />
                  </div>
                  <div className="grid gap-4 md:grid-cols-3">
                    <input type="number" className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-brand-500" placeholder="x min" value={graphForm.x_min} onChange={(event) => setGraphForm((current) => ({ ...current, x_min: Number(event.target.value) }))} />
                    <input type="number" className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-brand-500" placeholder="x max" value={graphForm.x_max} onChange={(event) => setGraphForm((current) => ({ ...current, x_max: Number(event.target.value) }))} />
                    <input type="number" className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-brand-500" placeholder="samples" value={graphForm.sample_count} onChange={(event) => setGraphForm((current) => ({ ...current, sample_count: Number(event.target.value) }))} />
                  </div>
                  <textarea className="min-h-24 rounded-[1.5rem] border border-slate-200 bg-white px-4 py-4 text-sm outline-none focus:border-brand-500" placeholder="Optional X data, comma separated" value={graphForm.rawX} onChange={(event) => setGraphForm((current) => ({ ...current, rawX: event.target.value }))} />
                  <textarea className="min-h-24 rounded-[1.5rem] border border-slate-200 bg-white px-4 py-4 text-sm outline-none focus:border-brand-500" placeholder="Optional Y data, comma separated" value={graphForm.rawY} onChange={(event) => setGraphForm((current) => ({ ...current, rawY: event.target.value }))} />
                  <Button className="w-full" onClick={handleGraphSubmit} disabled={loadingAction}>
                    {loadingAction ? "Rendering graph..." : "Generate graph"}
                  </Button>
                </div>
              )}
            </div>

            <div className="glass-panel rounded-[2rem] p-6 md:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-500">Output</p>
              <div className="mt-5 min-h-[28rem] rounded-[1.5rem] bg-white p-5">
                {response ? (
                  <ResponseRenderer content={response} />
                ) : graphUrl ? (
                  <div className="space-y-4">
                    <img src={graphUrl} alt="Generated graph" className="w-full rounded-3xl border border-slate-100" />
                    <a href={graphUrl} download className="inline-flex rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white">
                      Download graph
                    </a>
                  </div>
                ) : (
                  <div className="flex h-full min-h-[24rem] items-center justify-center rounded-[1.5rem] border border-dashed border-slate-200 bg-slate-50 text-center text-slate-500">
                    Generated explanations, lab reports, and graphs will appear here.
                  </div>
                )}
              </div>

              {dashboard.uploaded_files.length > 0 && (
                <div className="mt-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Recent uploads</p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {dashboard.uploaded_files.map((file) => (
                      <a key={file.id} href={file.url} target="_blank" rel="noreferrer" className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600">
                        {file.original_name}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function SidebarButton({
  active,
  icon: Icon,
  label,
  onClick
}: {
  active: boolean;
  icon: typeof BrainCircuit;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-2xl px-4 py-4 text-left text-sm font-semibold transition ${
        active ? "bg-ink text-white shadow-soft" : "bg-white text-slate-700 hover:bg-slate-50"
      }`}
    >
      <Icon className="h-5 w-5" />
      {label}
    </button>
  );
}
