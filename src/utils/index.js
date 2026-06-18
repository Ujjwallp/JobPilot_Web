import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind classes intelligently (clsx + tailwind-merge). */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/** Coerce many date-like values (ISO string, Firestore Timestamp, ms) into a Date. */
function toDate(value) {
  if (!value) return null;
  if (value instanceof Date) return value;
  if (typeof value === "object") {
    if (typeof value.seconds === "number") return new Date(value.seconds * 1000);
    if (typeof value.toDate === "function") return value.toDate();
  }
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
}

export function formatDate(value, options) {
  const d = toDate(value);
  if (!d) return "—";
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    ...options,
  });
}

/** Human friendly relative date: Today / Yesterday / 3 days ago / fallback. */
export function formatRelative(value) {
  const d = toDate(value);
  if (!d) return "—";
  const now = new Date();
  const startToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startDay = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const diffDays = Math.round((startToday - startDay) / 86_400_000);
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays === -1) return "Tomorrow";
  if (diffDays > 1 && diffDays < 7) return `${diffDays} days ago`;
  if (diffDays <= -2 && diffDays > -7) return `In ${Math.abs(diffDays)} days`;
  return formatDate(value);
}

/** Format a date for an <input type="date"> value (yyyy-mm-dd). */
export function toInputDate(value) {
  const d = toDate(value);
  if (!d) return "";
  const tz = d.getTimezoneOffset() * 60_000;
  return new Date(d.getTime() - tz).toISOString().slice(0, 10);
}

export function todayInput() {
  const d = new Date();
  const tz = d.getTimezoneOffset() * 60_000;
  return new Date(d.getTime() - tz).toISOString().slice(0, 10);
}

export function pluralize(count, word) {
  return `${count} ${word}${count === 1 ? "" : "s"}`;
}

export function formatDisplayName(rawName, fallbackEmail) {
  const name = rawName == null ? "" : String(rawName).trim();
  if (name) {
    return name
      .split(/\s+/)
      .filter(Boolean)
      .map((part) => `${part[0].toUpperCase()}${part.slice(1).toLowerCase()}`)
      .join(" ");
  }

  if (!fallbackEmail || typeof fallbackEmail !== "string") {
    return "User";
  }

  const local = fallbackEmail.split("@")[0].replace(/\+.*$/, "");
  const parts = local
    .replace(/[._-]+/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => `${part[0].toUpperCase()}${part.slice(1).toLowerCase()}`);

  return parts.length > 0 ? parts.join(" ") : "User";
}

function capitalize(value) {
  return value ? `${value[0].toUpperCase()}${value.slice(1).toLowerCase()}` : "";
}

export function getInitials(name) {
  const value = name == null ? "" : String(name);
  const normalized = value.trim().replace(/[._+-]+/g, " ");
  const parts = normalized.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

const GRADIENTS = [
  "from-indigo-500 to-violet-500",
  "from-sky-500 to-blue-600",
  "from-emerald-500 to-teal-600",
  "from-rose-500 to-pink-600",
  "from-amber-500 to-orange-600",
  "from-fuchsia-500 to-purple-600",
  "from-cyan-500 to-sky-600",
];

/** Deterministic gradient class from a seed string (e.g. company/user id). */
export function gradientFor(seed) {
  const value = seed == null ? "" : String(seed);
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = value.charCodeAt(i) + ((hash << 5) - hash);
  }
  return GRADIENTS[Math.abs(hash) % GRADIENTS.length];
}


/** Build an array of the last `count` month buckets ending this month. */
export function lastMonths(count = 6) {
  const months = [];
  const now = new Date();
  for (let i = count - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push({
      key: `${d.getFullYear()}-${d.getMonth()}`,
      label: d.toLocaleDateString("en-US", { month: "short" }),
      year: d.getFullYear(),
      month: d.getMonth(),
    });
  }
  return months;
}
