import Link from "next/link";

export function SiteFootnote() {
  return (
    <footer className="px-6 pb-10 pt-4 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 border-t border-slate-200/80 pt-5 text-sm text-slate-500 dark:border-white/10 dark:text-slate-400 md:flex-row">
        <p>Veridia public beta</p>
        <div className="flex items-center gap-5">
          <Link href="/feedback" className="transition hover:text-ink dark:hover:text-white">
            Feedback
          </Link>
          <span
            aria-disabled="true"
            className="cursor-default text-slate-400 dark:text-slate-500"
            title="Privacy Policy placeholder"
          >
            Privacy Policy
          </span>
        </div>
      </div>
    </footer>
  );
}
