import { cn } from "@/lib/utils";

export function Card({ className, children, ...props }) {
  return (
    <div
      className={cn(
        "rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, children }) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-4 border-b border-slate-200 p-5 dark:border-slate-800",
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardTitle({ className, children }) {
  return (
    <h3
      className={cn("text-base font-semibold text-slate-900 dark:text-white", className)}
    >
      {children}
    </h3>
  );
}

export function CardBody({ className, children }) {
  return <div className={cn("p-5", className)}>{children}</div>;
}
