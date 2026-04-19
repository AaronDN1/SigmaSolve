import Link from "next/link";

import { GoogleSignIn } from "@/components/app/google-signin";
import { VeridiaLogo } from "@/components/shared/veridia-logo";

export default function SignInPage() {
  return (
    <main className="min-h-screen px-6 py-10 lg:px-8">
      <div className="mx-auto grid min-h-[85vh] max-w-6xl items-center gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <section className="glass-panel overflow-hidden rounded-[2rem] p-10">
          <div className="absolute inset-0 -z-10 bg-hero-glow opacity-70" />
          <div className="inline-flex items-center gap-3 rounded-full border border-brand-500/12 bg-white/70 px-4 py-2 shadow-[0_14px_30px_rgba(31,143,85,0.1)] backdrop-blur-sm dark:border-white/10 dark:bg-white/5">
            <VeridiaLogo className="h-7 w-7" />
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-600 dark:text-brand-100">Veridia</p>
          </div>
          <h1 className="mt-6 font-serif text-5xl leading-tight text-ink dark:text-white">A polished STEM workspace now running in public beta.</h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            Sign in with Google to open the app, track your plan, save uploads, and use AI Prompt, Lab Helper, and Graphing in one place.
          </p>
          <div className="mt-10 space-y-4 text-sm text-slate-600 dark:text-slate-300">
            <p>Public Beta - 20 prompts per day.</p>
            <p>All signed-in users can access the full product experience while public testing is active.</p>
          </div>
        </section>

        <section className="glass-panel rounded-[2rem] p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-500">Authentication</p>
          <h2 className="mt-5 text-4xl font-semibold text-ink dark:text-white">Continue with Google</h2>
          <p className="mt-4 max-w-lg text-lg leading-8 text-slate-600 dark:text-slate-300">
            The backend verifies the Google credential, creates or updates your user record, and sets a secure app session.
          </p>
          <div className="mt-10">
            <GoogleSignIn />
          </div>
          <div className="mt-10 flex flex-wrap gap-5">
            <Link href="/" className="inline-block text-sm font-semibold text-slate-500 transition hover:text-ink dark:text-slate-300 dark:hover:text-white">
              Return to homepage
            </Link>
            <Link href="/about" className="inline-block text-sm font-semibold text-slate-500 transition hover:text-ink dark:text-slate-300 dark:hover:text-white">
              About Me
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
