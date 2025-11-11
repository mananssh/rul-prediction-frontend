export function Brand() {
  return (
    <div className="flex items-center gap-3">
      <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-[#7C3AED] via-[#22D3EE] to-[#FDE047] shadow-[0_0_35px_#7C3AED55]" />
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          PRONOSTIA <span className="text-[#7C3AED]">RUL</span>
        </h1>
        <p className="text-sm text-[#B8C1CC]">Degradation → RUL, with receipts.</p>
      </div>
    </div>
  );
}
