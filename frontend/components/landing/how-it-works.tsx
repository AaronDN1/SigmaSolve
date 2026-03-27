import { SectionHeading } from "@/components/shared/section-heading";

const steps = [
  {
    number: "01",
    title: "Sign in with Google",
    body: "Get into the workspace quickly with a low-friction authentication flow built for real session handling."
  },
  {
    number: "02",
    title: "Choose the right tool",
    body: "Switch between AI Prompt, Lab Helper, and Graphing from a single premium workspace with consistent inputs."
  },
  {
    number: "03",
    title: "Upload context or data",
    body: "Add PDF lab sheets, screenshots, observations, equations, or numerical data to ground the result in your actual work."
  },
  {
    number: "04",
    title: "Generate polished output",
    body: "Receive readable explanations, formal report drafts, or downloadable graphs designed to be immediately useful."
  }
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-12">
        <SectionHeading
          eyebrow="Workflow"
          title="A simple flow that still feels premium."
          description="The product stays clean and direct, but the backend supports real state, uploads, subscriptions, and generation services behind the scenes."
        />

        <div className="grid gap-6 lg:grid-cols-4">
          {steps.map((step) => (
            <article key={step.number} className="rounded-[1.75rem] border border-slate-200/70 bg-white p-7 shadow-soft">
              <p className="text-sm font-semibold tracking-[0.3em] text-brand-500">{step.number}</p>
              <h3 className="mt-5 text-2xl font-semibold text-ink">{step.title}</h3>
              <p className="mt-4 text-base leading-8 text-slate-600">{step.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
