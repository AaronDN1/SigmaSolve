"use client";

type AnalyticsEventProperties = Record<string, string | number | boolean | null | undefined>;
type FeatureName = "ai_prompt" | "lab_helper" | "graphing";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";
const ANALYTICS_ENABLED = process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === "true";
const ANONYMOUS_ID_KEY = "sigma_analytics_anonymous_id";

type SessionState = {
  sessionId: string;
  startedAt: number;
  promptCount: number;
  activeFeature: FeatureName | null;
  activeFeatureStartedAt: number | null;
};

let currentUserId: string | null = null;
let sessionState: SessionState | null = null;
let listenersInstalled = false;

function nowIso() {
  return new Date().toISOString();
}

function getAnonymousId() {
  if (typeof window === "undefined") return "server";

  const existing = window.localStorage.getItem(ANONYMOUS_ID_KEY);
  if (existing) return existing;

  const created = crypto.randomUUID();
  window.localStorage.setItem(ANONYMOUS_ID_KEY, created);
  return created;
}

function postAnalyticsEvent(event: string, properties: AnalyticsEventProperties = {}, useBeacon = false) {
  if (!ANALYTICS_ENABLED || typeof window === "undefined") return;

  const payload = JSON.stringify({
    event,
    distinct_id: currentUserId ?? getAnonymousId(),
    timestamp: nowIso(),
    properties: {
      session_id: sessionState?.sessionId ?? null,
      user_id: currentUserId,
      anonymous_id: currentUserId ? null : getAnonymousId(),
      ...properties,
    },
  });

  if (useBeacon && navigator.sendBeacon) {
    const blob = new Blob([payload], { type: "application/json" });
    navigator.sendBeacon(`${API_URL}/api/analytics/capture`, blob);
    return;
  }

  void fetch(`${API_URL}/api/analytics/capture`, {
    method: "POST",
    credentials: "include",
    keepalive: useBeacon,
    headers: { "Content-Type": "application/json" },
    body: payload,
  }).catch(() => undefined);
}

function closeActiveFeature(reason: "tab_switch" | "session_end" | "page_hidden") {
  if (!sessionState?.activeFeature || !sessionState.activeFeatureStartedAt) return;

  postAnalyticsEvent("feature_closed", {
    feature_name: sessionState.activeFeature,
    duration_ms: Date.now() - sessionState.activeFeatureStartedAt,
    reason,
  });

  sessionState = {
    ...sessionState,
    activeFeature: null,
    activeFeatureStartedAt: null,
  };
}

export function installAnalyticsListeners() {
  if (typeof window === "undefined" || listenersInstalled) return;
  listenersInstalled = true;

  window.addEventListener("error", (event) => {
    postAnalyticsEvent("frontend_error", {
      error_type: "window_error",
      message: event.message,
      source_file: event.filename ?? null,
      line_number: event.lineno ?? null,
      column_number: event.colno ?? null,
    });
  });

  window.addEventListener("unhandledrejection", (event) => {
    postAnalyticsEvent("frontend_error", {
      error_type: "unhandled_promise_rejection",
      message: event.reason instanceof Error ? event.reason.message : String(event.reason),
    });
  });

  window.addEventListener("beforeunload", () => {
    if (!sessionState) return;
    closeActiveFeature("session_end");
    postAnalyticsEvent(
      "session_ended",
      {
        duration_ms: Date.now() - sessionState.startedAt,
        prompts_in_session: sessionState.promptCount,
        reason: "beforeunload",
      },
      true,
    );
    sessionState = null;
  });
}

export function setAnalyticsUser(userId: string | null) {
  currentUserId = userId;
}

export function startAnalyticsSession(userId: string) {
  currentUserId = userId;
  if (sessionState) return sessionState.sessionId;

  sessionState = {
    sessionId: crypto.randomUUID(),
    startedAt: Date.now(),
    promptCount: 0,
    activeFeature: null,
    activeFeatureStartedAt: null,
  };

  postAnalyticsEvent("session_started", {
    session_id: sessionState.sessionId,
  });

  return sessionState.sessionId;
}

export function endAnalyticsSession(reason: "page_exit" | "app_unmount") {
  if (!sessionState) return;
  closeActiveFeature("session_end");
  postAnalyticsEvent("session_ended", {
    duration_ms: Date.now() - sessionState.startedAt,
    prompts_in_session: sessionState.promptCount,
    reason,
  });
  sessionState = null;
}

export function openFeature(featureName: FeatureName) {
  if (!sessionState) return;
  if (sessionState.activeFeature === featureName) return;

  closeActiveFeature("tab_switch");
  sessionState = {
    ...sessionState,
    activeFeature: featureName,
    activeFeatureStartedAt: Date.now(),
  };
  postAnalyticsEvent("feature_opened", { feature_name: featureName });
}

export function trackAiPromptSubmitted(properties: AnalyticsEventProperties) {
  if (sessionState) {
    sessionState = { ...sessionState, promptCount: sessionState.promptCount + 1 };
  }
  postAnalyticsEvent("ai_prompt_submitted", properties);
}

export function trackAiResponseReceived(properties: AnalyticsEventProperties) {
  postAnalyticsEvent("ai_response_received", properties);
}

export function trackLabHelperStarted(properties: AnalyticsEventProperties) {
  postAnalyticsEvent("lab_helper_started", properties);
}

export function trackLabHelperCompleted(properties: AnalyticsEventProperties) {
  postAnalyticsEvent("lab_helper_completed", properties);
}

export function trackGraphingStarted(properties: AnalyticsEventProperties) {
  postAnalyticsEvent("graphing_started", properties);
}

export function trackGraphGenerated(properties: AnalyticsEventProperties) {
  postAnalyticsEvent("graph_generated", properties);
}

export function trackThreadLoaded(properties: AnalyticsEventProperties) {
  postAnalyticsEvent("thread_resumed", properties);
}

export function trackClientApiFailure(properties: AnalyticsEventProperties) {
  postAnalyticsEvent("api_call_failed", {
    source: "frontend",
    ...properties,
  });
}

export function getAnalyticsHeaders(featureName?: FeatureName) {
  return {
    ...(sessionState?.sessionId ? { "x-sigma-session-id": sessionState.sessionId } : {}),
    ...(featureName ? { "x-sigma-feature-name": featureName } : {}),
  };
}
