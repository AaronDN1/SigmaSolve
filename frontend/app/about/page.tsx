"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BrainCircuit, BriefcaseBusiness, Boxes, Sparkles } from "lucide-react";

import { MarketingNav } from "@/components/landing/marketing-nav";
import { SiteFootnote } from "@/components/landing/site-footnote";
import { Button } from "@/components/shared/button";

const focusAreas = [
  "AI integration",
  "Prompt engineering",
  "Frontend and backend development",
  "Workflow and product design",
  "Systems thinking",
  "Data-driven iteration"
];

const profileHighlights = [
  {
    label: "Education",
    value: "B.S. Physics, May 2026"
  },
  {
    label: "Graduate Study",
    value: "M.E. Applied Artificial Intelligence, December 2026"
  },
  {
    label: "Career Direction",
    value: "AI engineering, ML, and applied AI roles"
  }
];

const detailSections = [
  {
    eyebrow: "What I Built",
    title: "The Veridia Project.",
    body:
      "I built Veridia as a focused AI workspace for STEM students who need clearer problem solving, better explanations, and cleaner outputs. That meant shaping the product from end to end: workflow design, AI model selection and integration, prompt behavior, frontend and backend implementation decisions, threaded conversations, analytics, usage controls, and the math-rendering and UX details that make the experience usable instead of frustrating."
  },
  {
    eyebrow: "Execution Story",
    title: "The idea was there before the acceleration.",
    body:
      "I had the idea for Veridia for a while and made multiple attempts to build a version I actually liked. The turning point came after I found the Codex challenge on Handshake. Codex accelerated execution, iteration, and debugging, but it did not replace engineering judgment. I knew what I wanted to build, how I wanted it to work, and used AI tooling as leverage to turn that into a real product faster."
  },
  {
    eyebrow: "What I Work On",
    title: "I like technical work that connects product thinking to systems reality.",
    body:
      "I am especially interested in building intelligent systems that have to work under real constraints: clear interfaces, reliable backend behavior, good user feedback loops, and outputs that are actually understandable. The part I enjoy most is taking a messy problem, designing a strong workflow around it, and then implementing the details well enough that the product feels coherent."
  },
  {
    eyebrow: "What I'm Looking For",
    title: "I am looking for opportunities where I can help build useful AI systems.",
    body:
      "I am seeking roles in AI engineering, machine learning, and applied AI, especially on teams building real-world products rather than demos. I want to work on systems that combine model capability, sound engineering, and product clarity."
  },
  {
    eyebrow: "Interests",
    title: "I am especially interested in building and improving intelligent systems.",
    body:
      "That includes AI engineering, engineering more broadly, training and developing models, and the product and infrastructure work required to make those systems useful. I am drawn to work that combines technical depth with practical execution."
  }
];

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <MarketingNav />
      <section className="px-6 pb-24 pt-14 lg:px-8 lg:pt-20">
        <div className="mx-auto max-w-6xl space-y-8">
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="glass-panel overflow-hidden rounded-[2.25rem] p-8 md:p-10"
          >
            <div className="grid gap-8 lg:grid-cols-[1.35fr_0.65fr] lg:items-start">
              <div>
                <h1 className="max-w-4xl font-serif text-5xl leading-tight text-ink dark:text-white md:text-6xl">
                  Aaron Nathans
                </h1>
                <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">
                  I’m an engineer focused on building intelligent systems that turn complex technical ideas into simple, usable products. My work sits at the intersection of AI, data, and software execution—where understanding a problem deeply matters just as much as building it correctly. Veridia reflects how I approach projects: identify real workflows, design with clarity, and engineer systems that actually deliver value in practice.
                </p>
                <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600 dark:text-slate-300">
                  I graduate in May 2026 with a B.S. in Physics and in December 2026 with an M.E. in Applied Artificial Intelligence. I am looking for opportunities across AI engineering, machine learning, and applied AI.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  {focusAreas.map((item) => (
                    <span
                      key={item}
                      className="premium-card rounded-full px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap gap-4">
                  <Link href="/app">
                    <Button>
                      Open Veridia
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/">
                    <Button
                      variant="secondary"
                      className="dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
                    >
                      Back to product
                    </Button>
                  </Link>
                </div>
              </div>

              <aside className="space-y-4">
                <div className="premium-card rounded-[1.75rem] p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Profile Snapshot</p>
                  <div className="mt-5 space-y-4">
                    {profileHighlights.map((item) => (
                      <div
                        key={item.label}
                        className="premium-subtle rounded-2xl px-4 py-4"
                      >
                        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">{item.label}</p>
                        <p className="mt-2 text-sm font-semibold leading-6 text-ink dark:text-white">{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="premium-accent rounded-[1.75rem] p-6">
                  <p className="text-sm leading-7 text-slate-700 dark:text-slate-200">
                    Fun fact! You can find me in the background of the movie Happy Gilmore 2.
                  </p>
                </div>
              </aside>
            </div>
          </motion.section>

          <section className="grid gap-6 lg:grid-cols-2">
            {detailSections.map((section, index) => (
              <motion.article
                key={section.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
                className={[
                  "glass-panel rounded-[1.9rem] p-8",
                  index === 0 ? "lg:col-span-2" : ""
                ].join(" ")}
              >
                <div className="flex items-start gap-4">
                  <div className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-500 text-white shadow-[0_14px_28px_rgba(31,143,85,0.22)] dark:bg-brand-400 dark:text-slate-950">
                    {index === 0 && <Boxes className="h-5 w-5" />}
                    {index === 1 && <BrainCircuit className="h-5 w-5" />}
                    {index === 2 && <Sparkles className="h-5 w-5" />}
                    {index === 3 && <BriefcaseBusiness className="h-5 w-5" />}
                    {index === 4 && <Sparkles className="h-5 w-5" />}
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-500">{section.eyebrow}</p>
                    <h2 className="mt-3 max-w-3xl text-3xl font-semibold leading-tight text-ink dark:text-white">
                      {section.title}
                    </h2>
                    <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600 dark:text-slate-300">
                      {section.body}
                    </p>
                  </div>
                </div>
              </motion.article>
            ))}
          </section>
        </div>
      </section>
      <SiteFootnote />
    </main>
  );
}
