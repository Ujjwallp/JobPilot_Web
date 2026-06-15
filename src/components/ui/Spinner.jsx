import { Loader2 } from "lucide-react";
import { cn } from "@/utils";

export function Spinner({ className, size = 24 }) {
  return (
    <Loader2
      className={cn("animate-spin text-indigo-500", className)}
      style={{ width: size, height: size }}
    />
  );
}

export function FullPageSpinner({ label = "Loading…" }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-slate-50 dark:bg-slate-950">
      <Spinner size={36} />
      <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
    </div>
  );
}
