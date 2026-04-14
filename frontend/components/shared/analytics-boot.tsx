"use client";

import { useEffect } from "react";

import { installAnalyticsListeners } from "@/lib/analytics";

export function AnalyticsBoot() {
  useEffect(() => {
    installAnalyticsListeners();
  }, []);

  return null;
}
