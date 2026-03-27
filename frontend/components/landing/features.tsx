import { BrainCircuit, ChartSpline, FileChartColumnIncreasing, ShieldCheck, UploadCloud, Wallet } from "lucide-react";

import { SectionHeading } from "@/components/shared/section-heading";

const features = [
  {
    icon: BrainCircuit,
    title: "Professor-style AI guidance",
    body: "Structured explanations that teach students how to think through STEM problems instead of just dumping answers."
  },
  {
    icon: UploadCloud,
    title: "Image and PDF context",
    body: "Attach homework screenshots, lab sheets, or reference pages so Sigma Solve answers with the actual material in view."
  },
  {
    icon: FileChartColumnIncreasing,
    title: "Lab report drafting",
    body: "Build a complete report from methods, observations, data, and notes with a format instructors expect."
  },
  {
    icon: ChartSpline,
    title: "Python graph generation",
    body: "Use equations or raw measured data to create clean visualizations for homework, labs, and reports."
  },
  {
    icon: ShieldCheck,
    title: "Real plan enforcement",
    body: "Free users get 3 total generations per day. Unlimited users bypass the limit with tracked subscription state."
  },
  {
    icon: Wallet,
    title: "Affordable premium access",
    body: "Unlimited costs $5/month, making it dramatically cheaper than heavyweight premium AI subscriptions."
  }
];

export function Features() {
  return (
    <section id="features" className="px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-12">
        <SectionHeading
          eyebrow="Features"
          title="Everything is designed around serious STEM workflows."
          description="Sigma Solve is opinionated about quality: clear explanations, strong academic structure, clean visuals, and a product surface that feels reliable enough to use every day."
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {features.map(({ icon: Icon, title, body }) => (
            <article key={title} className="glass-panel rounded-[1.75rem] p-7">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-500">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-ink">{title}</h3>
              <p className="mt-4 text-base leading-8 text-slate-600">{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
