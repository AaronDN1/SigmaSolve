import Link from "next/link";

import { GoogleSignIn } from "@/components/app/google-signin";

export default function SignInPage() {
  return (
    <main className="min-h-screen px-6 py-10 lg:px-8">
      <div className="mx-auto grid min-h-[85vh] max-w-6xl items-center gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <section className="rounded-[2rem] bg-ink bg-hero-glow p-10 text-white shadow-soft">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-300">Sigma Solve</p>
          <h1 className="mt-6 font-serif text-5xl leading-tight">A premium study workspace for STEM students.</h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
            Sign in with Google to open the app, track your plan, save uploads, and use AI Prompt, Lab Helper, and Graphing in one place.
          </p>
          <div className="mt-10 space-y-4 text-sm text-slate-300">
            <p>Free plan: all features, 3 total uses per day.</p>
            <p>Unlimited plan: all features, unlimited use, $5/month.</p>
          </div>
        </section>

        <section className="glass-panel rounded-[2rem] p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-500">Authentication</p>
          <h2 className="mt-5 text-4xl font-semibold text-ink">Continue with Google</h2>
          <p className="mt-4 max-w-lg text-lg leading-8 text-slate-600">
            The backend verifies the Google credential, creates or updates your user record, and sets a secure app session.
          </p>
          <div className="mt-10">
            <GoogleSignIn />
          </div>
          <Link href="/" className="mt-10 inline-block text-sm font-semibold text-slate-500 transition hover:text-ink">
            Return to homepage
          </Link>
        </section>
      </div>
    </main>
  );
}
