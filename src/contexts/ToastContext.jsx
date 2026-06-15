import {
  createContext,
  useCallback,
  useMemo,
  useState,
} from "react";
import {
  CheckCircle2,
  AlertCircle,
  Info,
  AlertTriangle,
  X,
} from "lucide-react";
import { cn } from "@/utils";

export const ToastContext = createContext(undefined);

const ICONS = {
  success: CheckCircle2,
  error: AlertCircle,
  info: Info,
  warning: AlertTriangle,
};

const ICON_COLORS = {
  success: "text-emerald-500",
  error: "text-rose-500",
  info: "text-indigo-500",
  warning: "text-amber-500",
};

const ACCENTS = {
  success: "border-l-emerald-500",
  error: "border-l-rose-500",
  info: "border-l-indigo-500",
  warning: "border-l-amber-500",
};

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const remove = useCallback((id) => {
    setToasts((current) => current.filter((t) => t.id !== id));
  }, []);

  const push = useCallback(
    (message, type = "info", duration = 4000) => {
      const id = Math.random().toString(36).slice(2);
      setToasts((current) => [...current, { id, message, type }]);
      if (duration) window.setTimeout(() => remove(id), duration);
      return id;
    },
    [remove]
  );

  const toast = useMemo(
    () => ({
      push,
      success: (m, d) => push(m, "success", d),
      error: (m, d) => push(m, "error", d ?? 5500),
      info: (m, d) => push(m, "info", d),
      warning: (m, d) => push(m, "warning", d),
    }),
    [push]
  );

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div
        className="pointer-events-none fixed inset-x-0 top-0 z-[100] flex flex-col items-center gap-2.5 p-4 sm:items-end sm:p-6"
        aria-live="polite"
      >
        {toasts.map((t) => {
          const Icon = ICONS[t.type] || Info;
          return (
            <div
              key={t.id}
              role="status"
              className={cn(
                "pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-xl border border-l-4 border-slate-200 bg-white p-3.5 shadow-lg shadow-slate-900/5 ring-1 ring-black/5 animate-slide-in-right dark:border-slate-700 dark:bg-slate-900",
                ACCENTS[t.type]
              )}
            >
              <Icon
                className={cn("mt-0.5 h-5 w-5 shrink-0", ICON_COLORS[t.type])}
              />
              <p className="flex-1 text-sm font-medium leading-snug text-slate-800 dark:text-slate-100">
                {t.message}
              </p>
              <button
                type="button"
                onClick={() => remove(t.id)}
                className="-mr-1 rounded-md p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                aria-label="Dismiss notification"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}
