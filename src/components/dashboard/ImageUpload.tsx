"use client";

import { useState } from "react";

type ImageEntry = { localUrl: string; serverUrl: string | null; uploading: boolean };

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
  const [images, setImages] = useState<ImageEntry[]>(
    defaultValue
      ? defaultValue.split(",").map((s) => s.trim()).filter(Boolean).map((url) => ({
          localUrl: url,
          serverUrl: url,
          uploading: false,
        }))
      : []
  );
  const [error, setError] = useState<string | null>(null);

  const serverUrls = images
    .map((img) => img.serverUrl)
    .filter(Boolean)
    .join(",");

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    setError(null);
    e.target.value = "";

    const toUpload = multiple ? files : [files[0]];

    for (const file of toUpload) {
      const localUrl = URL.createObjectURL(file);
      const id = localUrl;

      setImages((prev) => {
        const entry: ImageEntry = { localUrl, serverUrl: null, uploading: true };
        return multiple ? [...prev, entry] : [entry];
      });

      try {
        const fd = new FormData();
        fd.append("file", file);
        const res = await fetch("/api/upload", { method: "POST", body: fd });
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || "Upload failed");

        setImages((prev) =>
          prev.map((img) =>
            img.localUrl === id ? { ...img, serverUrl: json.url, uploading: false } : img
          )
        );
      } catch (err) {
        setError(err instanceof Error ? err.message : "Upload failed");
        setImages((prev) => prev.filter((img) => img.localUrl !== id));
        URL.revokeObjectURL(localUrl);
      }
    }
  }

  function remove(localUrl: string) {
    setImages((prev) => {
      const img = prev.find((i) => i.localUrl === localUrl);
      if (img && img.localUrl.startsWith("blob:")) URL.revokeObjectURL(img.localUrl);
      return prev.filter((i) => i.localUrl !== localUrl);
    });
  }

  const anyUploading = images.some((img) => img.uploading);

  return (
    <div>
      <label className="field-label">{label}</label>
      <input type="hidden" name={name} value={serverUrls} />

      {images.length > 0 && (
        <div className="mb-3 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-5">
          {images.map((img) => (
            <div
              key={img.localUrl}
              className="relative aspect-video overflow-hidden rounded-lg border border-slate-200 bg-slate-50 group"
            >
              <img
                src={img.localUrl}
                alt="Preview"
                className={`h-full w-full object-cover transition ${img.uploading ? "opacity-60" : ""}`}
              />
              {img.uploading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <span className="text-xs font-medium text-white">Uploading…</span>
                </div>
              )}
              {!img.uploading && (
                <button
                  type="button"
                  onClick={() => remove(img.localUrl)}
                  className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white shadow hover:bg-red-600 transition"
                  title="Remove image"
                >
                  &times;
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center gap-4">
        <label className="cursor-pointer inline-flex items-center justify-center rounded-lg border-2 border-dashed border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:border-brand-teal hover:bg-slate-50 transition shadow-sm">
          <input
            type="file"
            accept="image/*"
            multiple={multiple}
            onChange={onFile}
            disabled={anyUploading}
            className="hidden"
          />
          {anyUploading
            ? "Uploading..."
            : multiple && images.length > 0
            ? "+ Add More Images"
            : images.length > 0
            ? "Change Image"
            : "Upload Image"}
        </label>
        {error && <p className="text-xs text-red-600">{error}</p>}
      </div>
    </div>
  );
}
