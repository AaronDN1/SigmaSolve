"use client";

import { motion } from "framer-motion";
import { Settings2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { SettingsModal } from "@/components/shared/settings-modal";
import { Button } from "@/components/shared/button";

export function MarketingNav() {
  const pathname = usePathname();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const featuresHref = pathname === "/" ? "#features" : "/#features";
  const howItWorksHref = pathname === "/" ? "#how-it-works" : "/#how-it-works";

  return (
    <>
      <header className="sticky top-0 z-30 px-4 pt-4 lg:px-6">
        <div className="glass-panel mx-auto flex max-w-7xl items-center justify-between rounded-[1.75rem] px-4 py-4 lg:px-6">
          <Link href="/" className="flex items-center gap-3">
            <motion.div
              whileHover={{ y: -2, scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-500 text-sm font-bold text-white shadow-[0_14px_30px_rgba(31,143,85,0.24)]"
            >
              SS
            </motion.div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-200">Sigma Solve</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Public beta for serious STEM workflows</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-2 rounded-full border border-slate-200/80 bg-white/70 p-1 text-sm text-slate-600 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] dark:border-white/10 dark:bg-white/5 dark:text-slate-300 md:flex">
            <Link href={featuresHref} className="rounded-full px-4 py-2 transition hover:bg-brand-50 hover:text-brand-700 dark:hover:bg-brand-500/10 dark:hover:text-brand-100">
              Features
            </Link>
            <Link href={howItWorksHref} className="rounded-full px-4 py-2 transition hover:bg-brand-50 hover:text-brand-700 dark:hover:bg-brand-500/10 dark:hover:text-brand-100">
              How it works
            </Link>
            <Link href="/about" className="rounded-full px-4 py-2 transition hover:bg-brand-50 hover:text-brand-700 dark:hover:bg-brand-500/10 dark:hover:text-brand-100">
              About Me
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <div className="premium-accent hidden rounded-full px-3 py-1 text-xs font-semibold text-brand-700 dark:text-brand-100 md:block">
              Public Beta - features currently free
            </div>
            <button
              type="button"
              onClick={() => setSettingsOpen(true)}
              className="premium-card inline-flex items-center justify-center rounded-full p-3 text-slate-600 transition hover:-translate-y-0.5 hover:text-ink dark:text-slate-200 dark:hover:text-white"
              aria-label="Open settings"
            >
              <Settings2 className="h-4 w-4" />
            </button>
            <Link href="/signin">
              <Button variant="ghost" className="text-slate-600 dark:text-slate-200 dark:hover:text-white">
                Sign in
              </Button>
            </Link>
            <Link href="/app">
              <Button>Get started</Button>
            </Link>
          </div>
        </div>
      </header>
      <SettingsModal open={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </>
  );
}
