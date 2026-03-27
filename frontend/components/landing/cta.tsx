import Link from "next/link";

import { Button } from "@/components/shared/button";

export function Cta() {
  return (
    <section className="px-6 pb-24 pt-8 lg:px-8">
      <div className="mx-auto max-w-7xl rounded-[2rem] bg-ink bg-hero-glow px-8 py-14 text-white shadow-soft md:px-14">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-300">Start now</p>
        <div className="mt-5 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="font-serif text-4xl leading-tight md:text-5xl">A cleaner, more convincing STEM workflow starts here.</h2>
            <p className="mt-4 text-lg leading-8 text-slate-300">
              Use the free plan to explore every feature, then upgrade to Unlimited when Sigma Solve becomes part of your weekly routine.
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
      </div>
    </section>
  );
}
