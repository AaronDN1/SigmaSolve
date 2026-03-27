import Link from "next/link";

import { Button } from "@/components/shared/button";

export function MarketingNav() {
  return (
    <header className="sticky top-0 z-20 border-b border-white/40 bg-white/65 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-ink text-sm font-bold text-white">
            SS
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Sigma Solve</p>
            <p className="text-xs text-slate-500">STEM clarity, beautifully delivered</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-slate-600 md:flex">
          <a href="#features">Features</a>
          <a href="#how-it-works">How it works</a>
          <a href="#pricing">Pricing</a>
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/signin">
            <Button variant="ghost" className="text-slate-600">
              Sign in
            </Button>
          </Link>
          <Link href="/app">
            <Button>Get started</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
