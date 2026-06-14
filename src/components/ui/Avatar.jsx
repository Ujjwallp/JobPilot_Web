import { cn, getInitials, gradientFor } from "@/lib/utils";

const SIZES = {
  xs: "h-6 w-6 text-[10px]",
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-14 w-14 text-lg",
  xl: "h-20 w-20 text-2xl",
  "2xl": "h-28 w-28 text-4xl",
};

export function Avatar({ name = "", src, size = "md", className }) {
  const safeName = String(name || "User").trim();
  if (src) {
    return (
      <img
        src={src}
        alt={safeName || "Avatar"}
        className={cn(
          "rounded-full object-cover ring-2 ring-white dark:ring-slate-900",
          SIZES[size],
          className
        )}
      />
    );
  }
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full bg-gradient-to-br font-bold text-white ring-2 ring-white dark:ring-slate-900",
        gradientFor(safeName),
        SIZES[size],
        className
      )}
      aria-hidden="true"
    >
      {getInitials(safeName)}
    </div>
  );
}
