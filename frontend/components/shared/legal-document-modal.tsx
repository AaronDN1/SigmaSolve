"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Download, X } from "lucide-react";

import { Button } from "@/components/shared/button";
import { LEGAL_DOCUMENTS, type LegalDocumentKey } from "@/lib/legal-documents";

type Props = {
  documentKey: LegalDocumentKey | null;
  open: boolean;
  onClose: () => void;
};

export function LegalDocumentModal({ documentKey, open, onClose }: Props) {
  if (!open || !documentKey) {
    return null;
  }

  const document = LEGAL_DOCUMENTS[documentKey];

  function handleDownload() {
    const blob = new Blob([document.content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = window.document.createElement("a");
    anchor.href = url;
    anchor.download = document.fileName;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-md">
      <div className="glass-panel flex max-h-[88vh] w-full max-w-4xl flex-col rounded-[2rem] p-6 md:p-8">
        <div className="flex items-start justify-between gap-4 border-b border-slate-200/80 pb-5 dark:border-white/10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-500">Legal</p>
            <h2 className="mt-3 text-2xl font-semibold text-ink dark:text-white">{document.title}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="premium-card rounded-full p-2 text-slate-500 transition hover:-translate-y-0.5 hover:text-ink dark:text-slate-300 dark:hover:text-white"
            aria-label={`Close ${document.title}`}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="premium-scroll mt-6 overflow-y-auto pr-2">
          <div className="markdown-content max-w-none text-sm">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{document.content}</ReactMarkdown>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 border-t border-slate-200/80 pt-5 dark:border-white/10 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-500 dark:text-slate-300">
            Contact:{" "}
            <a href="mailto:VeridiaSupport@gmail.com" className="font-semibold text-brand-600 transition hover:text-brand-700 dark:text-brand-200 dark:hover:text-brand-100">
              VeridiaSupport@gmail.com
            </a>
          </p>
          <div className="flex flex-wrap items-center gap-3">
            {document.downloadable ? (
              <Button variant="secondary" className="gap-2" onClick={handleDownload}>
                <Download className="h-4 w-4" />
                Download
              </Button>
            ) : null}
            <Button onClick={onClose}>Close</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
