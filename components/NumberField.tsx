"use client";
export function NumberField({
  label,
  value,
  onChange,
  placeholder,
  min,
  step,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  min?: number;
  step?: number | string;
}) {
  return (
    <label className="block">
      <div className="mb-1.5 text-sm text-[#B8C1CC]">{label}</div>
      <div className="relative">
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          min={min}
          step={step}
          className="w-full rounded-xl border border-[#2A2743] bg-[#121129]/90 px-10 py-2 text-sm text-white placeholder:text-[#8A90A2] focus:outline-none focus:ring-2 focus:ring-[#7C3AED] transition-shadow shadow-[inset_0_0_0_1px_#3F3A66]"
        />
        {/* counter icon */}
        <svg
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#B8C1CC"
          strokeWidth="1.5"
        >
          <path d="M4 12h16" />
          <path d="M12 4v16" />
        </svg>
      </div>
    </label>
  );
}
