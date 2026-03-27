"use client";

import { UploadCloud, X } from "lucide-react";

import { Button } from "@/components/shared/button";
import type { UploadedFile } from "@/types";

type Props = {
  purpose: "ai_prompt" | "lab_helper";
  files: UploadedFile[];
  loading: boolean;
  onUpload: (file: File, purpose: "ai_prompt" | "lab_helper") => Promise<void>;
  onRemove: (fileId: string) => void;
};

export function UploadPanel({ purpose, files, loading, onUpload, onRemove }: Props) {
  return (
    <div className="rounded-[1.5rem] border border-dashed border-slate-300 bg-slate-50/80 p-5">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-brand-500 shadow-sm">
          <UploadCloud className="h-5 w-5" />
        </div>
        <div>
          <p className="font-semibold text-ink">Upload PDF or image context</p>
          <p className="text-sm text-slate-500">Use files to ground the explanation or lab report in your actual work.</p>
        </div>
      </div>

      <label className="mt-4 flex cursor-pointer items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-4 text-sm font-medium text-slate-700 transition hover:border-brand-100 hover:text-brand-600">
        <input
          type="file"
          className="hidden"
          accept=".pdf,image/*,text/*"
          disabled={loading}
          onChange={async (event) => {
            const file = event.target.files?.[0];
            if (!file) return;
            await onUpload(file, purpose);
            event.target.value = "";
          }}
        />
        {loading ? "Uploading..." : "Choose file"}
      </label>

      {files.length > 0 && (
        <div className="mt-4 space-y-3">
          {files.map((file) => (
            <div key={file.id} className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 shadow-sm">
              <div>
                <p className="text-sm font-semibold text-ink">{file.original_name}</p>
                <p className="text-xs text-slate-500">{file.mime_type}</p>
              </div>
              <Button type="button" variant="ghost" className="px-2 py-2 text-slate-500" onClick={() => onRemove(file.id)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
