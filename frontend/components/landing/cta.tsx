"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import { Button } from "@/components/shared/button";

export function Cta() {
  return (
    <section className="px-6 pb-24 pt-8 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="glass-panel mx-auto max-w-7xl overflow-hidden rounded-[2.2rem] px-8 py-14 shadow-soft md:px-14"
      >
        <div className="absolute inset-0 -z-10 bg-hero-glow opacity-70" />
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-500">Public Beta</p>
        <div className="mt-5 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="font-serif text-4xl leading-tight text-ink dark:text-white md:text-5xl">
              A cleaner, more convincing STEM workflow starts here.
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-300">
              Veridia is currently free to use during public beta, with a simple 20-prompt daily cap to keep the
              experience stable while the product matures.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link href="/signin">
              <Button variant="secondary">Sign in</Button>
            </Link>
            <Link href="/app">
              <Button>Open app</Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
