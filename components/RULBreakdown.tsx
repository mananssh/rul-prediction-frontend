export type RULPayload = {
  progress: number; // 0..1
  current_time_s: number;
  total_life_time_s: number;
  RUL_s: number;
  seq_len: number;
  device: string;
};

export function RULBreakdown({ data }: { data: RULPayload }) {
  const fmt = (s: number) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = Math.floor(s % 60);
    return `${h}h ${m}m ${sec}s`;
  };

  return (
    <div className="rounded-3xl border border-[#2A2743] bg-[#121129]/90 p-6 shadow-[inset_0_0_0_1px_#3F3A66] backdrop-blur-sm">
      <div className="mb-4 flex items-center gap-2">
        {/* analytics icon */}
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="#22D3EE" strokeWidth="1.8">
          <path d="M4 19V5" />
          <path d="M9 19V9" />
          <path d="M14 19V13" />
          <path d="M19 19V3" />
        </svg>
        <h3 className="text-lg font-semibold tracking-tight">RUL Calculation</h3>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between rounded-xl border border-[#2A2743] bg-[#191735] px-3 py-2 shadow-[inset_0_0_0_1px_#3F3A66]">
            <span className="text-[#B8C1CC]">Progress (p)</span>
            <span className="font-medium text-[#22D3EE]">{data.progress.toFixed(4)}</span>
          </div>
          <div className="flex items-center justify-between rounded-xl border border-[#2A2743] bg-[#191735] px-3 py-2 shadow-[inset_0_0_0_1px_#3F3A66]">
            <span className="text-[#B8C1CC]">Current time (t)</span>
            <span className="text-right">
              <span className="font-medium text-white/90">{data.current_time_s.toFixed(2)} s</span>{" "}
              <span className="ml-1 text-[#8A90A2]">({fmt(data.current_time_s)})</span>
            </span>
          </div>
          <div className="flex items-center justify-between rounded-xl border border-[#2A2743] bg-[#191735] px-3 py-2 shadow-[inset_0_0_0_1px_#3F3A66]">
            <span className="text-[#B8C1CC]">Total life (T)</span>
            <span className="text-right">
              <span className="font-medium text-white/90">{data.total_life_time_s.toFixed(2)} s</span>{" "}
              <span className="ml-1 text-[#8A90A2]">({fmt(data.total_life_time_s)})</span>
            </span>
          </div>
          <div className="flex items-center justify-between rounded-xl border border-[#2A2743] bg-[#191735] px-3 py-2 shadow-[inset_0_0_0_1px_#3F3A66]">
            <span className="text-[#B8C1CC]">RUL (T − t)</span>
            <span className="font-semibold text-[#FDE047]">{data.RUL_s.toFixed(2)} s</span>
          </div>
        </div>

        <div className="rounded-2xl border border-[#2A2743] bg-[#0F0B1E] p-4 shadow-[inset_0_0_0_1px_#3F3A66]">
          <div className="mb-2 flex items-center gap-2 text-[#B8C1CC]">
            {/* formula icon */}
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="#B8C1CC" strokeWidth="1.5">
              <path d="M4 7h16" />
              <path d="M10 7v10" />
              <path d="M4 17h12" />
              <path d="M16 13h4" />
            </svg>
            <span>Formulae</span>
          </div>
          <pre className="whitespace-pre-wrap rounded-xl border border-[#2A2743] bg-[#191735] p-4 text-[#B8C1CC] shadow-[inset_0_0_0_1px_#3F3A66] text-sm leading-7">{`progress = p ∈ (0,1)
current_time = t

Total life:       T = t / p
Remaining (RUL):  R = T - t = t * (1 - p) / p`}</pre>
          <div className="mt-3 text-xs text-[#8A90A2]">
            Device: {data.device} • Sequence length: {data.seq_len}
          </div>
        </div>
      </div>
    </div>
  );
}
