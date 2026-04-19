export type CookieConsentValue = "accepted" | "rejected" | "account";

export const COOKIE_CONSENT_STORAGE_KEY = "veridia-cookie-consent";
export const COOKIE_CONSENT_EVENT = "veridia-cookie-consent-changed";

export function getCookieConsent(): CookieConsentValue | null {
  if (typeof window === "undefined") return null;
  const value = window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
  if (value === "accepted" || value === "rejected" || value === "account") {
    return value;
  }
  return null;
}

export function setCookieConsent(value: CookieConsentValue) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, value);
  window.dispatchEvent(new CustomEvent(COOKIE_CONSENT_EVENT, { detail: value }));
}

export function hasGrantedCookieConsent(value: CookieConsentValue | null = getCookieConsent()) {
  return value === "accepted" || value === "account";
}
