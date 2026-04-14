"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { WorkspaceShell } from "@/components/app/workspace-shell";
import { endAnalyticsSession, setAnalyticsUser, startAnalyticsSession } from "@/lib/analytics";
import { getDashboard, getSession, getUsageStatus } from "@/lib/api";
import type { DashboardData, UsageStatus, User } from "@/types";

export default function WorkspacePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [usage, setUsage] = useState<UsageStatus | null>(null);
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [session, usageData, dashboardData] = await Promise.all([getSession(), getUsageStatus(), getDashboard()]);
        if (!session.user) {
          router.replace("/signin");
          return;
        }
        setAnalyticsUser(session.user.id);
        startAnalyticsSession(session.user.id);
        setUser(session.user);
        setUsage(usageData);
        setDashboard(dashboardData);
      } catch {
        router.replace("/signin");
      } finally {
        setLoading(false);
      }
    }

    void load();
  }, [router]);

  useEffect(() => {
    return () => {
      endAnalyticsSession("app_unmount");
    };
  }, []);

  if (loading || !user || !usage || !dashboard) {
    return (
      <main className="flex min-h-screen items-center justify-center px-6">
        <div className="glass-panel rounded-[2rem] px-8 py-6 text-sm font-medium text-slate-600">Loading Sigma Solve...</div>
      </main>
    );
  }

  return <WorkspaceShell user={user} usage={usage} dashboard={dashboard} />;
}
