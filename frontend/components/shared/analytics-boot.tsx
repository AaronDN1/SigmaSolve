"use client";

import { useEffect } from "react";

import { initAnalytics, installAnalyticsListeners } from "@/lib/analytics";
import { COOKIE_CONSENT_EVENT, getCookieConsent, hasGrantedCookieConsent } from "@/lib/cookie-consent";

export function AnalyticsBoot() {
  useEffect(() => {
    installAnalyticsListeners();

    function syncAnalyticsConsent() {
      if (hasGrantedCookieConsent(getCookieConsent())) {
        initAnalytics();
      }
    }

    syncAnalyticsConsent();
    window.addEventListener(COOKIE_CONSENT_EVENT, syncAnalyticsConsent);

    return () => {
      window.removeEventListener(COOKIE_CONSENT_EVENT, syncAnalyticsConsent);
    };
  }, []);

  return null;
}
