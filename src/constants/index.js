import {
  LayoutDashboard,
  Briefcase,
  KanbanSquare,
  User,
  Settings,
} from "lucide-react";

const STATUS = Object.freeze({
  APPLIED: "applied",
  INTERVIEW: "interview",
  OFFER: "offer",
  REJECTED: "rejected",
});

export const STATUS_ORDER = ["applied", "interview", "offer", "rejected"];

export const STATUS_CONFIG = {
  applied: {
    value: "applied",
    label: "Applied",
    description: "Submitted and waiting to hear back",
    badge:
      "bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-600/20 dark:bg-blue-500/15 dark:text-blue-300 dark:ring-blue-400/25",
    dot: "bg-blue-500",
    bar: "bg-blue-500",
    hex: "#3b82f6",
    gradient: "from-blue-500 to-indigo-500",
  },
  interview: {
    value: "interview",
    label: "Interview",
    description: "In the interview process",
    badge:
      "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20 dark:bg-amber-500/15 dark:text-amber-300 dark:ring-amber-400/25",
    dot: "bg-amber-500",
    bar: "bg-amber-500",
    hex: "#f59e0b",
    gradient: "from-amber-500 to-orange-500",
  },
  offer: {
    value: "offer",
    label: "Offer",
    description: "You received an offer 🎉",
    badge:
      "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20 dark:bg-emerald-500/15 dark:text-emerald-300 dark:ring-emerald-400/25",
    dot: "bg-emerald-500",
    bar: "bg-emerald-500",
    hex: "#10b981",
    gradient: "from-emerald-500 to-teal-500",
  },
  rejected: {
    value: "rejected",
    label: "Rejected",
    description: "No longer in the running",
    badge:
      "bg-rose-50 text-rose-700 ring-1 ring-inset ring-rose-600/20 dark:bg-rose-500/15 dark:text-rose-300 dark:ring-rose-400/25",
    dot: "bg-rose-500",
    bar: "bg-rose-500",
    hex: "#f43f5e",
    gradient: "from-rose-500 to-pink-500",
  },
};

export const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Internship", "Temporary"];
export const WORK_MODES = ["Remote", "Hybrid", "On-site"];

export const PRIORITY_CONFIG = {
  Low: {
    label: "Low",
    badge:
      "bg-slate-100 text-slate-600 ring-1 ring-inset ring-slate-500/15 dark:bg-slate-700/40 dark:text-slate-300",
    dot: "bg-slate-400",
  },
  Medium: {
    label: "Medium",
    badge:
      "bg-sky-50 text-sky-700 ring-1 ring-inset ring-sky-600/20 dark:bg-sky-500/15 dark:text-sky-300",
    dot: "bg-sky-500",
  },
  High: {
    label: "High",
    badge:
      "bg-rose-50 text-rose-700 ring-1 ring-inset ring-rose-600/20 dark:bg-rose-500/15 dark:text-rose-300",
    dot: "bg-rose-500",
  },
};
export const PRIORITY_ORDER = ["High", "Medium", "Low"];

export const SORT_OPTIONS = [
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
  { value: "company", label: "Company (A–Z)" },
  { value: "position", label: "Position (A–Z)" },
  { value: "status", label: "Status" },
  { value: "priority", label: "Priority" },
];

export const NAV_ITEMS = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/jobs", label: "Applications", icon: Briefcase },
  { to: "/pipeline", label: "Pipeline", icon: KanbanSquare },
  { to: "/profile", label: "Profile", icon: User },
  { to: "/settings", label: "Settings", icon: Settings },
];

const AUTH_ERROR_MESSAGES = {
  "auth/email-already-in-use": "An account with this email already exists.",
  "auth/invalid-credential": "Invalid email or password.",
  "auth/wrong-password": "Invalid email or password.",
  "auth/user-not-found": "No account found with this email.",
  "auth/invalid-email": "Please enter a valid email address.",
  "auth/weak-password": "Password should be at least 6 characters.",
  "auth/popup-closed-by-user": "The sign-in popup was closed before completing.",
  "auth/cancelled-popup-request": "Sign-in was cancelled.",
  "auth/popup-request-blocked": "The sign-in popup was blocked by the browser.",
  "auth/too-many-requests": "Too many attempts. Please try again later.",
  "auth/network-request-failed": "Network error. Check your connection.",
  "auth/requires-recent-login": "Please sign out and back in, then try again.",
  "auth/operation-not-allowed": "This sign-in method is not enabled in Firebase.",
  "auth/unauthorized-domain": "This domain is not authorized for sign-in.",
  "auth/user-disabled": "This account has been disabled.",
};

export function authErrorMessage(error) {
  if (!error) return "Something went wrong. Please try again.";
  return AUTH_ERROR_MESSAGES[error.code] || error.message || "Something went wrong.";
}
