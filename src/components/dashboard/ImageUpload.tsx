"use client";

import { useState } from "react";

export function ImageUpload({
  name,
  defaultValue = "",
  label = "Image",
  multiple = false,
}: {
  name: string;
  defaultValue?: string;
  label?: string;
  multiple?: boolean;
}) {
  const [urls, setUrls] = useState<string[]>(
    defaultValue ? defaultValue.split(",").map((s) => s.trim()).filter(Boolean) : []
  );
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Upload failed");
      
      if (multiple) {
        setUrls((prev) => [...prev, json.url]);
      } else {
        setUrls([json.url]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  function removeUrl(indexToRemove: number) {
    setUrls((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  }

  return (
    <div>
      <label className="field-label">{label}</label>
      <input type="hidden" name={name} value={urls.join(",")} />
      
      {urls.length > 0 && (
        <div className="mb-3 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-5">
          {urls.map((url, idx) => (
            <div key={idx} className="relative aspect-video overflow-hidden rounded-lg border border-slate-200 bg-slate-50 group">
              <img src={url} alt="Uploaded preview" className="h-full w-full object-cover" />
              <button
                type="button"
                onClick={() => removeUrl(idx)}
                className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white shadow hover:bg-red-600 transition"
                title="Remove image"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center gap-4">
        <label className="cursor-pointer inline-flex items-center justify-center rounded-lg border-2 border-dashed border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:border-brand-teal hover:bg-slate-50 transition shadow-sm">
          <input
            type="file"
            accept="image/*"
            onChange={onFile}
            disabled={uploading}
            className="hidden"
          />
          {uploading
            ? "Uploading..."
            : multiple && urls.length > 0
            ? "+ Add More Images"
            : urls.length > 0
            ? "Change Image"
            : "Upload Image"}
        </label>
        {uploading && <p className="text-xs text-brand-blue">Uploading…</p>}
        {error && <p className="text-xs text-red-600">{error}</p>}
      </div>
    </div>
  );
}
