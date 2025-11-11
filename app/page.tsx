"use client";
import React from "react";
import { Brand } from "@/components/Brand";
import { UploadSequence, type OrderedFile } from "@/components/UploadSequence";
import { NumberField } from "@/components/NumberField";
import { SegmentedToggle } from "@/components/SegmentedToggle";
import { ProgressRing } from "@/components/ProgressRing";
import { RULBreakdown } from "@/components/RULBreakdown";
import { postSequence } from "@/lib/api";

export default function Page() {
  const [seqLen, setSeqLen] = React.useState<number>(5);
  const [mode, setMode] = React.useState<"files" | "elapsed">("files");
  const [files, setFiles] = React.useState<OrderedFile[]>([]);
  const [totalFiles, setTotalFiles] = React.useState<string>("");
  const [elapsed, setElapsed] = React.useState<string>("");
  const [apiBase, setApiBase] = React.useState<string>("http://localhost:8000");
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>("");
  const [result, setResult] = React.useState<any>(null);

  const ready =
    files.length === seqLen &&
    ((mode === "files" && !!totalFiles) || (mode === "elapsed" && !!elapsed));

  async function submit() {
    try {
      setError("");
      setLoading(true);
      setResult(null);
      const ordered = files.map((f) => f.file);
      const r = await postSequence(
        apiBase,
        ordered,
        seqLen,
        mode === "files" ? Number(totalFiles) : undefined,
        mode === "elapsed" ? Number(elapsed) : undefined
      );
      setResult(r);
    } catch (e: any) {
      setError(e?.message ?? "Request failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="space-y-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Brand />
        <div className="flex items-center gap-3">
          <div className="relative">
            <input
              className="w-[320px] rounded-xl border border-[#2A2743] bg-[#121129]/90 px-10 py-2 text-sm text-white backdrop-blur-sm placeholder:text-[#8A90A2] focus:outline-none focus:ring-2 focus:ring-[#22D3EE] shadow-[0_0_0_1px_#3F3A66,0_10px_30px_-15px_#00000088]"
              value={apiBase}
              onChange={(e) => setApiBase(e.target.value)}
              placeholder="http://localhost:8000"
            />
            {/* link icon */}
            <svg
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#B8C1CC]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#B8C1CC"
              strokeWidth="1.5"
            >
              <path d="M10 14a3 3 0 0 0 4 0l3-3a3 3 0 1 0-4-4l-.5.5" />
              <path d="M14 10a3 3 0 0 0-4 0l-3 3a3 3 0 1 0 4 4l.5-.5" />
            </svg>
          </div>
          <span className="text-xs text-[#8A90A2]">API Base URL</span>
        </div>
      </div>

      {/* Upload + Controls */}
      <section className="rounded-3xl border border-[#2A2743] bg-gradient-to-b from-[#121129] to-[#0F0B1E] p-6 shadow-[inset_0_0_0_1px_#3F3A66,0_30px_80px_-40px_#000000aa]">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold tracking-tight bg-gradient-to-r from-[#7C3AED] via-[#22D3EE] to-[#FDE047] bg-clip-text text-transparent">
            Upload Sequence
          </h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-[#B8C1CC]">SEQ_LEN</span>
              <input
                type="number"
                min={1}
                max={64}
                className="w-20 rounded-xl border border-[#2A2743] bg-[#191735] px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#22D3EE] transition-shadow shadow-[inset_0_0_0_1px_#3F3A66]"
                value={seqLen}
                onChange={(e) =>
                  setSeqLen(Math.max(1, Math.min(64, Number(e.target.value))))
                }
              />
            </div>
            <SegmentedToggle
              value={mode}
              onChange={(v) => setMode(v as "files" | "elapsed")}
              options={[
                { label: "Use total files seen", value: "files" },
                { label: "Use elapsed seconds", value: "elapsed" },
              ]}
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <UploadSequence seqLen={seqLen} onChange={setFiles} />
          </div>

          <div className="space-y-4">
            {mode === "files" ? (
              <NumberField
                label="Total files seen (from start → newest in your sequence)"
                value={totalFiles}
                onChange={setTotalFiles}
                placeholder="e.g. 1330"
                min={1}
              />
            ) : (
              <NumberField
                label="Elapsed seconds since start (up to newest file)"
                value={elapsed}
                onChange={setElapsed}
                placeholder="e.g. 13300"
                min={0}
                step={0.1}
              />
            )}

            <button
              onClick={submit}
              disabled={!ready || loading}
              className={`group w-full rounded-2xl px-4 py-3 text-sm font-semibold tracking-wide transition-all duration-200 ${
                ready && !loading
                  ? "bg-[#7C3AED] hover:bg-[#6D28D9] text-white shadow-[0_0_0_2px_#3F3A66,0_10px_30px_-10px_#7C3AED88]"
                  : "cursor-not-allowed bg-[#191735] text-[#8A90A2]"
              }`}
            >
              <span className="inline-flex items-center gap-2">
                {loading ? (
                  <>
                    <svg
                      className="h-4 w-4 animate-spin"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#E5E7EB"
                      strokeWidth="2"
                    >
                      <circle cx="12" cy="12" r="9" opacity="0.25" />
                      <path d="M21 12a9 9 0 0 1-9 9" />
                    </svg>
                    Computing RUL…
                  </>
                ) : (
                  <>
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#E5E7EB"
                      strokeWidth="2"
                    >
                      <path d="M12 5v14" />
                      <path d="M5 12h14" />
                    </svg>
                    Predict RUL
                  </>
                )}
              </span>
            </button>

            {error && (
              <div className="rounded-xl border border-[#EC4899] bg-[#3C1430] px-3 py-2 text-sm text-white shadow-[0_10px_30px_-15px_#EC489955]">
                {error}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Results */}
      {result && (
        <section className="grid gap-6 md:grid-cols-3">
          <div className="flex flex-col items-center justify-center rounded-3xl border border-[#2A2743] bg-[#121129]/90 p-6 shadow-[inset_0_0_0_1px_#3F3A66] backdrop-blur-sm">
            <div className="mb-4 text-sm text-[#B8C1CC]">Degradation Progress</div>
            <ProgressRing value={result.progress} />
          </div>

          <div className="md:col-span-2">
            <RULBreakdown data={result} />
          </div>
        </section>
      )}

      {/* Footer note */}
      <footer className="text-xs leading-relaxed text-[#8A90A2]">
        • CSV format expected: 6 columns, 2560 rows each (0.1s @ 25.6kHz). Upload exactly SEQ_LEN files ordered oldest → newest.
        <br />• RUL is derived from progress p using: T = t / p, RUL = T − t = t × (1 − p) / p.
      </footer>
    </main>
  );
}
