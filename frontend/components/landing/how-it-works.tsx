"use client";

import { SectionHeading } from "@/components/shared/section-heading";
import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Choose the right tool",
    body: "Switch between AI Prompt, Lab Helper, and Graphing from a single premium workspace with consistent inputs."
  },
  {
    number: "02",
    title: "Upload context or data",
    body: "Add PDF lab sheets, screenshots, observations, equations, or numerical data to ground the result in your actual work."
  },
  {
    number: "03",
    title: "Generate polished output",
    body: "Receive readable explanations, formal report drafts, or downloadable graphs designed to be immediately useful."
  }
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-10">
        <SectionHeading
          eyebrow="Workflow"
          title="A simple flow that still feels premium."
        />

        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-3">
          {steps.map((step, index) => (
            <motion.article
              key={step.number}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="glass-panel rounded-[1.85rem] p-7"
            >
              <p className="text-sm font-semibold tracking-[0.3em] text-brand-500">{step.number}</p>
              <h3 className="mt-5 text-2xl font-semibold text-ink dark:text-white">{step.title}</h3>
              <p className="mt-4 text-base leading-8 text-slate-600 dark:text-slate-300">{step.body}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
