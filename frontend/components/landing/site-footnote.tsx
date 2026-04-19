"use client";

import Link from "next/link";
import { useState } from "react";

import { LegalDocumentModal } from "@/components/shared/legal-document-modal";
import { FOOTER_LEGAL_DOCUMENTS, LEGAL_DOCUMENTS, type LegalDocumentKey } from "@/lib/legal-documents";

export function SiteFootnote() {
  const [openDocument, setOpenDocument] = useState<LegalDocumentKey | null>(null);

  return (
    <>
      <footer className="px-6 pb-10 pt-4 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 border-t border-slate-200/80 pt-5 text-sm text-slate-500 dark:border-white/10 dark:text-slate-400 md:flex-row">
          <p>Veridia public beta</p>
          <div className="flex flex-wrap items-center justify-center gap-5 md:justify-end">
            <Link href="/feedback" className="transition hover:text-ink dark:hover:text-white">
              Feedback
            </Link>
            {FOOTER_LEGAL_DOCUMENTS.map((documentKey) => (
              <button
                key={documentKey}
                type="button"
                onClick={() => setOpenDocument(documentKey)}
                className="transition hover:text-ink dark:hover:text-white"
              >
                {LEGAL_DOCUMENTS[documentKey].title}
              </button>
            ))}
            <a
              href="mailto:VeridiaSupport@gmail.com"
              className="transition hover:text-ink dark:hover:text-white"
            >
              Contact: VeridiaSupport@gmail.com
            </a>
          </div>
        </div>
      </footer>
      <LegalDocumentModal
        documentKey={openDocument}
        open={Boolean(openDocument)}
        onClose={() => setOpenDocument(null)}
      />
    </>
  );
}
