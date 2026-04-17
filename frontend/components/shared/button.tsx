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
        "inline-flex items-center justify-center rounded-full border px-5 py-3 text-sm font-semibold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
        variant === "primary" &&
          "border-slate-900 bg-ink text-white shadow-[0_12px_28px_rgba(13,19,33,0.18)] hover:-translate-y-0.5 hover:bg-slate-900 hover:shadow-[0_16px_34px_rgba(13,19,33,0.24)] dark:border-white/10",
        variant === "secondary" &&
          "border-slate-300 bg-white/90 text-ink shadow-[0_10px_24px_rgba(15,23,42,0.08)] backdrop-blur hover:-translate-y-0.5 hover:border-brand-200 hover:bg-white hover:shadow-[0_14px_30px_rgba(15,23,42,0.12)] dark:border-white/15 dark:bg-white/7 dark:text-white dark:hover:bg-white/10 dark:hover:shadow-[0_14px_30px_rgba(2,6,23,0.32)]",
        variant === "ghost" &&
          "border-slate-200 bg-white/60 text-slate-700 shadow-[0_8px_18px_rgba(15,23,42,0.06)] hover:-translate-y-0.5 hover:border-brand-100 hover:bg-white hover:text-ink dark:border-white/12 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10 dark:hover:text-white",
        className
      )}
      {...props}
    />
  );
}
