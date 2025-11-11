"use client";
import React from "react";
export type OrderedFile = { file: File; id: string };

export function UploadSequence({
  seqLen,
  onChange,
}: {
  seqLen: number;
  onChange: (files: OrderedFile[]) => void;
}) {
  const [items, setItems] = React.useState<OrderedFile[]>([]);
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  function addFiles(list: FileList | null) {
    if (!list) return;
    const next = Array.from(list).map((f) => ({ file: f, id: crypto.randomUUID() }));
    const merged = [...items, ...next].slice(-seqLen);
    setItems(merged);
    onChange(merged);
  }
  function remove(id: string) {
    const filtered = items.filter((it) => it.id !== id);
    setItems(filtered);
    onChange(filtered);
  }
  function move(idx: number, dir: -1 | 1) {
    const target = idx + dir;
    if (target < 0 || target >= items.length) return;
    const clone = [...items];
    const [it] = clone.splice(idx, 1);
    clone.splice(target, 0, it);
    setItems(clone);
    onChange(clone);
  }

  return (
    <div className="rounded-3xl border border-[#2A2743] bg-[#121129]/90 p-5 shadow-[inset_0_0_0_1px_#3F3A66] backdrop-blur-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold tracking-tight">Sequential CSVs (oldest → newest)</h3>
        <button
          onClick={() => inputRef.current?.click()}
          className="inline-flex items-center gap-2 rounded-xl border border-[#2A2743] px-4 py-2 text-sm text-[#B8C1CC] hover:text-white hover:border-[#7C3AED] transition-colors"
        >
          {/* upload icon */}
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="#B8C1CC" strokeWidth="1.5">
            <path d="M12 16V4" />
            <path d="M8 8l4-4 4 4" />
            <path d="M20 16v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2" />
          </svg>
          Choose Files
        </button>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept=".csv"
          className="hidden"
          onChange={(e) => addFiles(e.target.files)}
        />
      </div>

      <p className="mb-3 text-sm text-[#B8C1CC]">
        Exactly {seqLen} files. You can reorder after selecting.
      </p>

      <div className="grid gap-3">
        {items.map((it, idx) => (
          <div
            key={it.id}
            className="flex items-center justify-between rounded-2xl border border-[#2A2743] bg-[#191735] px-4 py-3 shadow-[inset_0_0_0_1px_#3F3A66]"
          >
            <div className="truncate text-sm">
              <span className="text-[#22D3EE]">{idx + 1}.</span>{" "}
              <span className="text-white/90">{it.file.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => move(idx, -1)}
                className="rounded-lg border border-[#2A2743] px-2 py-1 text-xs text-[#B8C1CC] hover:text-white hover:border-[#22D3EE] transition-colors"
                aria-label="Move up"
                title="Move up"
              >
                {/* up icon */}
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="#B8C1CC" strokeWidth="2">
                  <path d="M12 19V5" />
                  <path d="M5 12l7-7 7 7" />
                </svg>
              </button>
              <button
                onClick={() => move(idx, 1)}
                className="rounded-lg border border-[#2A2743] px-2 py-1 text-xs text-[#B8C1CC] hover:text-white hover:border-[#22D3EE] transition-colors"
                aria-label="Move down"
                title="Move down"
              >
                {/* down icon */}
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="#B8C1CC" strokeWidth="2">
                  <path d="M12 5v14" />
                  <path d="M19 12l-7 7-7-7" />
                </svg>
              </button>
              <button
                onClick={() => remove(it.id)}
                className="rounded-lg border border-[#2A2743] px-2 py-1 text-xs text-[#B8C1CC] hover:text-[#EC4899] hover:border-[#EC4899] transition-colors"
                aria-label="Remove"
                title="Remove"
              >
                {/* trash icon */}
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="#B8C1CC" strokeWidth="1.8">
                  <path d="M3 6h18" />
                  <path d="M8 6l1-2h6l1 2" />
                  <path d="M19 6l-1 14H6L5 6" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 text-sm text-[#B8C1CC]">
        Tip: If filenames contain indices (e.g., <span className="text-white/90">acc_000123.csv</span>),
        ensure the order reflects oldest → newest.
      </div>
    </div>
  );
}
