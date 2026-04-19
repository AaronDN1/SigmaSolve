"use client";

import { useEffect, useState } from "react";

import { LegalDocumentModal } from "@/components/shared/legal-document-modal";
import { Button } from "@/components/shared/button";
import { getSession } from "@/lib/api";
import { getCookieConsent, setCookieConsent } from "@/lib/cookie-consent";
import type { LegalDocumentKey } from "@/lib/legal-documents";

export function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);
  const [openDocument, setOpenDocument] = useState<LegalDocumentKey | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function resolveConsentState() {
      const storedConsent = getCookieConsent();
      if (storedConsent) {
        return;
      }

      try {
        const session = await getSession();
        if (!cancelled && session.user) {
          setCookieConsent("account");
          return;
        }
      } catch {
        // Anonymous visitors should still see the banner if no prior choice exists.
      }

      if (!cancelled) {
        setVisible(true);
      }
    }

    void resolveConsentState();

    return () => {
      cancelled = true;
    };
  }, []);

  function handleChoice(value: "accepted" | "rejected") {
    setCookieConsent(value);
    setVisible(false);
  }

  return (
    <>
      {visible ? (
        <div className="pointer-events-none fixed inset-x-0 bottom-4 z-40 flex justify-center px-4">
          <div className="glass-panel pointer-events-auto w-full max-w-xl rounded-[1.75rem] p-5 shadow-[0_24px_64px_rgba(16,32,22,0.16)]">
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-500">Cookie Notice</p>
                <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
                  We use cookies and similar technologies to support core functionality, improve the experience, and understand usage. See our{" "}
                  <button
                    type="button"
                    onClick={() => setOpenDocument("privacy")}
                    className="font-semibold text-brand-600 transition hover:text-brand-700 dark:text-brand-200 dark:hover:text-brand-100"
                  >
                    Privacy Policy
                  </button>{" "}
                  for more information.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Button className="min-w-[8.5rem] justify-center" onClick={() => handleChoice("accepted")}>
                  Accept
                </Button>
                <Button variant="secondary" className="min-w-[8.5rem] justify-center" onClick={() => handleChoice("rejected")}>
                  Reject
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <LegalDocumentModal
        documentKey={openDocument}
        open={Boolean(openDocument)}
        onClose={() => setOpenDocument(null)}
      />
    </>
  );
}
