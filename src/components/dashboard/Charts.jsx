import { STATUS_ORDER, STATUS_CONFIG } from "@/lib/constants";

/** SVG donut chart of application status distribution + legend. */
export function StatusDonut({ counts, total }) {
  const size = 180;
  const stroke = 20;
  const r = (size - stroke) / 2;
  const circumference = 2 * Math.PI * r;
  let acc = 0;

  const data = STATUS_ORDER.map((s) => ({
    key: s,
    label: STATUS_CONFIG[s].label,
    value: counts[s] || 0,
    hex: STATUS_CONFIG[s].hex,
  }));

  return (
    <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-center sm:gap-10">
      <div className="relative shrink-0" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            strokeWidth={stroke}
            className="stroke-slate-100 dark:stroke-slate-800"
          />
          {data
            .filter((d) => d.value > 0)
            .map((d) => {
              const len = total ? (d.value / total) * circumference : 0;
              const seg = (
                <circle
                  key={d.key}
                  cx={size / 2}
                  cy={size / 2}
                  r={r}
                  fill="none"
                  stroke={d.hex}
                  strokeWidth={stroke}
                  strokeDasharray={`${Math.max(len - 2, 0)} ${circumference}`}
                  strokeDashoffset={-acc}
                  strokeLinecap="round"
                />
              );
              acc += len;
              return seg;
            })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-slate-900 dark:text-white">
            {total}
          </span>
          <span className="text-xs text-slate-400">Total</span>
        </div>
      </div>

      <ul className="w-full max-w-[220px] space-y-2.5">
        {data.map((d) => (
          <li key={d.key} className="flex items-center gap-2.5 text-sm">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ background: d.hex }}
            />
            <span className="text-slate-600 dark:text-slate-300">{d.label}</span>
            <span className="ml-auto font-semibold text-slate-900 dark:text-white">
              {d.value}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** CSS bar chart of applications per month (last 6 months). */
export function TimelineBars({ data }) {
  const max = Math.max(1, ...data.map((d) => d.value));
  return (
    <div className="flex h-48 items-end gap-2.5">
      {data.map((d) => (
        <div
          key={d.label}
          className="group flex flex-1 flex-col items-center gap-2"
        >
          <div className="flex w-full flex-1 items-end">
            <div
              className="relative w-full rounded-t-lg bg-gradient-to-t from-indigo-500 to-violet-500 transition-all duration-500 group-hover:from-indigo-600 group-hover:to-violet-600"
              style={{
                height: `${(d.value / max) * 100}%`,
                minHeight: d.value > 0 ? 12 : 3,
              }}
            >
              {d.value > 0 && (
                <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] font-semibold text-slate-500 dark:text-slate-400">
                  {d.value}
                </span>
              )}
            </div>
          </div>
          <span className="text-[11px] font-medium text-slate-400">
            {d.label}
          </span>
        </div>
      ))}
    </div>
  );
}

/** Horizontal animated progress bars for each status. */
export function StatusBars({ counts, total }) {
  const data = STATUS_ORDER.map((s) => ({
    key: s,
    label: STATUS_CONFIG[s].label,
    value: counts[s] || 0,
    hex: STATUS_CONFIG[s].hex,
  }));
  return (
    <div className="space-y-4">
      {data.map((d) => (
        <div key={d.key}>
          <div className="mb-1.5 flex items-center justify-between text-sm">
            <span className="font-medium text-slate-600 dark:text-slate-300">
              {d.label}
            </span>
            <span className="text-slate-500 dark:text-slate-400">
              {d.value}
              {total > 0 && (
                <span className="ml-1 text-xs text-slate-400">
                  ({Math.round((d.value / total) * 100)}%)
                </span>
              )}
            </span>
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${total ? (d.value / total) * 100 : 0}%`,
                background: d.hex,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
