import { Link } from "react-router-dom";
import { Briefcase, CheckCircle2 } from "lucide-react";
const HIGHLIGHTS = [
  "Track every application in one organized board",
  "Get a clear view of interviews, offers & rejections",
  "Visualize your pipeline with live analytics",
];

export function AuthDivider({ children = "or" }) {
  return (
    <div className="my-5 flex items-center gap-3 text-xs font-medium uppercase tracking-wide text-slate-400">
      <span className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
      {children}
      <span className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
    </div>
  );
}

export function AuthShell({ title, subtitle, children, footer }) {
  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600 p-12 lg:flex">
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-fuchsia-400/20 blur-3xl" />

        <Link to="/" className="relative flex items-center gap-3 text-white">
          <div className="flex h-11 w-11 items-center justify-center overflow-hidden">
            <img src="/favicon.png" alt="JobPilot" className="h-full w-full object-contain" />
          </div>
          <span className="text-lg font-bold tracking-tight">JobPilot</span>
        </Link>

        <div className="relative text-white">
          <h2 className="max-w-md text-3xl font-bold leading-tight">
            Land your next role with a clear, organized pipeline.
          </h2>
          <ul className="mt-8 space-y-3.5">
            {HIGHLIGHTS.map((h) => (
              <li key={h} className="flex items-center gap-3 text-sm text-white/90">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-white" />
                {h}
              </li>
            ))}
          </ul>
        </div>

        <p className="relative text-sm text-white/70">
          A clean, focused sign-in experience for tracking applications, interviews, and offers.
        </p>
      </div>

      <div className="flex w-full flex-col justify-center px-5 py-10 sm:px-8 lg:w-1/2">
        <div className="mx-auto w-full max-w-sm">
          <Link to="/" className="mb-8 flex items-center gap-2.5 lg:hidden">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/30">
              <Briefcase className="h-5 w-5" />
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
              JobPilot
            </span>
          </Link>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">
              {subtitle}
            </p>
          )}

          <div className="mt-7">{children}</div>

          {footer && (
            <div className="mt-7 text-center text-sm text-slate-500 dark:text-slate-400">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
