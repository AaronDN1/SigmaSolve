import { clsx } from "clsx";

export function cn(...values: Array<string | false | null | undefined>) {
  return clsx(values);
}

export function formatPlan(plan: "free" | "unlimited") {
  return plan === "unlimited" ? "Unlimited" : "Free";
}
