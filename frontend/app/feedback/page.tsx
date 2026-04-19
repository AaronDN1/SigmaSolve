"use client";

import Link from "next/link";
import { useState } from "react";

import { MarketingNav } from "@/components/landing/marketing-nav";
import { SiteFootnote } from "@/components/landing/site-footnote";
import { Button } from "@/components/shared/button";
import { createFeedback } from "@/lib/api";

export default function FeedbackPage() {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedSubject = subject.trim();
    const trimmedBody = body.trim();

    if (!trimmedSubject || !trimmedBody) {
      setError("Please add both a subject and feedback before submitting.");
      setSuccess("");
      return;
    }

    setSubmitting(true);
    setError("");
    setSuccess("");

    try {
      await createFeedback({ subject: trimmedSubject, body: trimmedBody });
      setSubject("");
      setBody("");
      setSuccess("Thanks for the feedback. It has been sent to the Veridia team.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to submit feedback.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen">
      <MarketingNav />
      <section className="px-6 pb-20 pt-10 lg:px-8 lg:pt-14">
        <div className="mx-auto max-w-3xl space-y-6">
          <div className="glass-panel rounded-[2rem] p-8 md:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-500">Feedback</p>
            <h1 className="mt-4 font-serif text-4xl text-ink dark:text-white md:text-5xl">Tell us what would make Veridia better.</h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">
              Share bugs, friction points, or feature ideas. If you are signed in, we will automatically attach your account email to the submission.
            </p>

            <form className="mt-8 space-y-5" onSubmit={(event) => void handleSubmit(event)}>
              <div className="space-y-2">
                <label htmlFor="feedback-subject" className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
                  Subject
                </label>
                <input
                  id="feedback-subject"
                  value={subject}
                  onChange={(event) => setSubject(event.target.value)}
                  placeholder="What should we know?"
                  className="premium-input w-full rounded-[1.4rem] px-4 py-3 text-sm"
                  maxLength={160}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="feedback-body" className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
                  Feedback
                </label>
                <textarea
                  id="feedback-body"
                  value={body}
                  onChange={(event) => setBody(event.target.value)}
                  placeholder="What is working well, what feels off, or what should we improve next?"
                  className="premium-input min-h-56 w-full rounded-[1.6rem] px-4 py-4 text-sm"
                  maxLength={5000}
                />
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Button type="submit" disabled={submitting}>
                  {submitting ? "Submitting..." : "Submit feedback"}
                </Button>
                <Link href="/app">
                  <Button variant="secondary">Open app</Button>
                </Link>
              </div>
            </form>
          </div>

          {error ? (
            <div className="rounded-[1.5rem] border border-rose-200 bg-rose-50 px-5 py-4 text-sm text-rose-700 dark:border-rose-400/30 dark:bg-rose-500/10 dark:text-rose-200">
              {error}
            </div>
          ) : null}

          {success ? (
            <div className="rounded-[1.5rem] border border-brand-200 bg-brand-50 px-5 py-4 text-sm text-brand-700 dark:border-brand-400/20 dark:bg-brand-500/10 dark:text-brand-100">
              {success}
            </div>
          ) : null}
        </div>
      </section>
      <SiteFootnote />
    </main>
  );
}
