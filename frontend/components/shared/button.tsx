import { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

export function Button({ className, variant = "primary", ...props }: Props) {
  return (
    <button
      type={props.type ?? "button"}
      className={cn(
        "inline-flex items-center justify-center rounded-full border px-5 py-3 text-sm font-semibold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent disabled:cursor-not-allowed disabled:opacity-65",
        variant === "primary" &&
          "border-brand-600 bg-brand-500 text-white shadow-[0_14px_34px_rgba(31,143,85,0.26)] hover:-translate-y-0.5 hover:border-brand-700 hover:bg-brand-600 hover:shadow-[0_18px_42px_rgba(31,143,85,0.3)] active:translate-y-0 dark:border-brand-400/40 dark:bg-brand-500 dark:text-slate-950 dark:hover:bg-brand-400",
        variant === "secondary" &&
          "border-slate-200/90 bg-white/85 text-ink shadow-[0_12px_28px_rgba(16,32,22,0.08)] backdrop-blur hover:-translate-y-0.5 hover:border-brand-200 hover:bg-white hover:shadow-[0_16px_32px_rgba(16,32,22,0.12)] active:translate-y-0 dark:border-white/12 dark:bg-white/7 dark:text-white dark:hover:border-brand-300/35 dark:hover:bg-white/10 dark:hover:shadow-[0_14px_30px_rgba(2,6,23,0.32)]",
        variant === "ghost" &&
          "border-slate-200/85 bg-white/55 text-slate-700 shadow-[0_8px_18px_rgba(16,32,22,0.06)] hover:-translate-y-0.5 hover:border-brand-100 hover:bg-white/85 hover:text-ink active:translate-y-0 dark:border-white/12 dark:bg-white/5 dark:text-slate-200 dark:hover:border-brand-300/30 dark:hover:bg-white/10 dark:hover:text-white",
        className
      )}
      {...props}
    />
  );
}
