type Props = {
  options: { label: string; value: string }[];
  value: string;
  onChange: (v: string) => void;
};

export function SegmentedToggle({ options, value, onChange }: Props) {
  return (
    <div className="inline-flex rounded-2xl bg-[#121129]/90 p-1 border border-[#2A2743] shadow-[inset_0_0_0_1px_#3F3A66] backdrop-blur-sm">
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={`px-4 py-2 text-sm rounded-xl transition-all duration-150 ${
              active
                ? "bg-[#1B1833] text-white shadow-[0_0_25px_#7C3AED55]"
                : "text-[#B8C1CC] hover:text-white hover:bg-[#181533]"
            }`}
          >
            <span className="inline-flex items-center gap-2">
              {/* simple dot icon to indicate toggle segment */}
              <span
                className={`h-2 w-2 rounded-full ${
                  active ? "bg-[#7C3AED]" : "bg-[#3F3A66]"
                }`}
              />
              {opt.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
