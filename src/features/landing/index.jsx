import { Link } from "react-router-dom";
import {
  Briefcase,
  Moon,
  Sun,
  KanbanSquare,
  BarChart3,
  Search,
  ClipboardList,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Check,
} from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { useAuth } from "@/hooks/useAuth";

const FEATURES = [
  {
    icon: KanbanSquare,
    title: "Application pipeline",
    description:
      "Drag cards through applied, interview, offer, and rejected stages.",
  },
  {
    icon: BarChart3,
    title: "Live analytics",
    description: "Track response rates and application trends at a glance.",
  },
  {
    icon: Search,
    title: "Instant search",
    description: "Find any application fast with powerful filters and sorting.",
  },
  {
    icon: ClipboardList,
    title: "Rich details",
    description: "Notes, contacts, salary ranges and priority for every role.",
  },
  {
    icon: Moon,
    title: "Dark mode",
    description: "A clean interface that's easy on the eyes, day or night.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Authentication",
    description: "Email and Google sign-in built for a recruiter-ready job search.",
  },
];


const primaryLink =
  "inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-600/30 transition-colors hover:bg-indigo-700";
const ghostLink =
  "inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800";

function FeatureCard({ icon: Icon, title, description }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-500/30">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="mt-4 text-base font-semibold text-slate-900 dark:text-white">
        {title}
      </h3>
      <p className="mt-1.5 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
        {description}
      </p>
    </div>
  );
}

export function Landing() {
  const { theme, toggleTheme } = useTheme();
  const { currentUser } = useAuth();
  const primaryHref = currentUser ? "/dashboard" : "/signup";
  const primaryLabel = currentUser ? "Go to dashboard" : "Start tracking";

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-white/70 backdrop-blur-xl dark:border-slate-800/70 dark:bg-slate-950/70">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center overflow-hidden">
              <img src="/favicon.png" alt="JobPilot" className="h-full w-full object-contain" />
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
              JobPilot
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
            {!currentUser && (
              <Link
                to="/login"
                className="hidden rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 sm:inline-flex"
              >
                Sign in
              </Link>
            )}
            <Link to={primaryHref} className={primaryLink}>
              {primaryLabel}
            </Link>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-40 left-1/2 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-gradient-to-br from-indigo-300/40 via-violet-300/30 to-fuchsia-300/30 blur-3xl dark:from-indigo-700/20 dark:via-violet-700/20 dark:to-fuchsia-700/20" />
        </div>
        <div className="mx-auto max-w-6xl px-4 pb-16 pt-16 sm:px-6 sm:pt-24">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 dark:border-indigo-500/20 dark:bg-indigo-500/10 dark:text-indigo-300">
              <Sparkles className="h-3.5 w-3.5" />
              Your job search, finally organized
            </span>
            <h1 className="mt-6 text-4xl font-black leading-tight tracking-tight text-slate-900 dark:text-white sm:text-6xl">
              Track every application.{" "}
              <span className="bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent">
                Land the right offer.
              </span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-400 sm:text-lg">
              JobPilot turns a chaotic job search into a clear pipeline — your
              your applications, interviews, and offers, clearly organized in one
              dashboard.
            </p>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              Sign up using Google or your email address, and keep every stage of
              your job hunt in one organized workflow.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link to={primaryHref} className={`${primaryLink} px-6 py-3 text-base`}>
                {primaryLabel}
                <ArrowRight className="h-4 w-4" />
              </Link>
              {!currentUser && (
                <Link to="/login" className={`${ghostLink} px-6 py-3 text-base`}>
                  I already have an account
                </Link>
              )}
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-5 text-xs text-slate-400">
              <span className="inline-flex items-center gap-1.5">
                <Check className="h-4 w-4 text-emerald-500" /> Google & email
                sign-in
              </span>
            </div>
          </div>

        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Everything you need to land your next role
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400">
            Thoughtful features designed around how a real job search actually
            works.
          </p>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <FeatureCard key={f.title} {...f} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600 px-6 py-14 text-center shadow-xl">
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
          <h2 className="relative text-3xl font-bold tracking-tight text-white">
            Ready to organize your job search?
          </h2>
          <p className="relative mx-auto mt-3 max-w-xl text-white/80">
            Create a free account and add your first application in under a
            minute.
          </p>
          <Link
            to={primaryHref}
            className="relative mt-7 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-base font-semibold text-indigo-700 shadow-lg transition-transform hover:scale-105"
          >
            {primaryLabel}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <footer className="border-t border-slate-200 py-10 dark:border-slate-800">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:grid-cols-[1.5fr_1fr] sm:px-6">
          <div className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
            <p>© 2026 JobPilot. Developed by Ujjwal Prakash.</p>
            <p>
              JobPilot helps job seekers manage applications, interviews, offers,
              and rejections from a single dashboard.
            </p>
            <ul className="space-y-1">
              <li>Google Authentication</li>
              <li>Email Authentication</li>
              <li>Protected Routes</li>
              <li>Firestore Database</li>
              <li>Pipeline board</li>
              <li>Analytics Dashboard</li>
              <li>Dark Mode</li>
              <li>Responsive Design</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 text-sm text-slate-700 shadow-sm dark:border-slate-800 dark:bg-slate-900/90 dark:text-slate-300">
            <p className="text-base font-semibold text-slate-900 dark:text-white">
              Developer
            </p>
            <p className="mt-2 font-medium">Ujjwal Prakash</p>
            <p className="text-slate-500 dark:text-slate-400">Frontend Developer</p>
            <div className="mt-4 space-y-1">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-400 dark:text-slate-500">
                Tech Stack
              </p>
              <p>React</p>
              <p>Vite</p>
              <p>Firebase</p>
              <p>Firestore</p>
              <p>Tailwind CSS</p>
              <p>React Router</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
