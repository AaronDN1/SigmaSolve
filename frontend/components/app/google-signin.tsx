"use client";

import Script from "next/script";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { LegalDocumentModal } from "@/components/shared/legal-document-modal";
import { signInWithGoogle } from "@/lib/api";
import type { LegalDocumentKey } from "@/lib/legal-documents";

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: { credential: string }) => void;
          }) => void;
          renderButton: (element: HTMLElement, options: Record<string, string>) => void;
        };
      };
    };
  }
}

export function GoogleSignIn() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [acceptedLegal, setAcceptedLegal] = useState(false);
  const [openDocument, setOpenDocument] = useState<LegalDocumentKey | null>(null);

  useEffect(() => {
    if (!ready || !window.google) return;

    const container = document.getElementById("google-signin-button");
    if (!container) return;
    container.innerHTML = "";

    window.google.accounts.id.initialize({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "",
      callback: async ({ credential }) => {
        setLoading(true);
        setError("");
        try {
          await signInWithGoogle(credential, {
            accepted_terms: acceptedLegal,
            accepted_privacy: acceptedLegal
          });
          router.push("/app");
          router.refresh();
        } catch (err) {
          setError(err instanceof Error ? err.message : "Google sign-in failed.");
        } finally {
          setLoading(false);
        }
      }
    });

    window.google.accounts.id.renderButton(container, {
      type: "standard",
      theme: "outline",
      text: "signin_with",
      shape: "pill",
      size: "large"
    });
  }, [acceptedLegal, ready, router]);

  return (
    <>
      <Script src="https://accounts.google.com/gsi/client" strategy="afterInteractive" onLoad={() => setReady(true)} />
      <div className="space-y-4">
        <div className="premium-card rounded-[1.5rem] p-4">
          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              checked={acceptedLegal}
              onChange={(event) => setAcceptedLegal(event.target.checked)}
              className="mt-1 h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-400 dark:border-white/15 dark:bg-white/5 dark:text-brand-300"
            />
            <span className="text-sm leading-6 text-slate-600 dark:text-slate-300">
              I have read and agree to the{" "}
              <button
                type="button"
                onClick={() => setOpenDocument("terms")}
                className="font-semibold text-brand-600 transition hover:text-brand-700 dark:text-brand-200 dark:hover:text-brand-100"
              >
                Terms of Service
              </button>{" "}
              and{" "}
              <button
                type="button"
                onClick={() => setOpenDocument("privacy")}
                className="font-semibold text-brand-600 transition hover:text-brand-700 dark:text-brand-200 dark:hover:text-brand-100"
              >
                Privacy Policy
              </button>
              . Required to create a new account. You can also review the{" "}
              <button
                type="button"
                onClick={() => setOpenDocument("aup")}
                className="font-semibold text-brand-600 transition hover:text-brand-700 dark:text-brand-200 dark:hover:text-brand-100"
              >
                Acceptable Use Policy
              </button>{" "}
              and{" "}
              <button
                type="button"
                onClick={() => setOpenDocument("accessibility")}
                className="font-semibold text-brand-600 transition hover:text-brand-700 dark:text-brand-200 dark:hover:text-brand-100"
              >
                Accessibility Statement
              </button>
              .
            </span>
          </label>
        </div>
        <div id="google-signin-button" />
        {loading && <p className="text-sm text-slate-500 dark:text-slate-300">Signing you in...</p>}
        {error && <p className="text-sm text-rose-600 dark:text-rose-300">{error}</p>}
      </div>
      <LegalDocumentModal
        documentKey={openDocument}
        open={Boolean(openDocument)}
        onClose={() => setOpenDocument(null)}
      />
    </>
  );
}
