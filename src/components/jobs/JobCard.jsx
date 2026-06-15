import { useEffect, useRef, useState } from "react";
import {
  MoreVertical,
  Pencil,
  Trash2,
  ExternalLink,
  MapPin,
  Briefcase,
  Calendar,
  DollarSign,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { STATUS_CONFIG, PRIORITY_CONFIG } from "@/constants";
import { cn, formatRelative, getInitials, gradientFor } from "@/utils";

function CompanyAvatar({ company }) {
  const label = company == null ? "" : String(company);
  return (
    <div
      className={cn(
        "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-sm font-bold text-white",
        gradientFor(label)
      )}
    >
      {getInitials(label)}
    </div>
  );
}

function MetaItem({ icon: Icon, children }) {
  if (!children) return null;
  return (
    <span className="inline-flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
      <Icon className="h-3.5 w-3.5" />
      {children}
    </span>
  );
}

function ActionsMenu({ onEdit, onDelete }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setOpen((o) => !o);
        }}
        className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800"
        aria-label="Actions"
      >
        <MoreVertical className="h-4 w-4" />
      </button>
      {open && (
        <div className="absolute right-0 top-full z-30 mt-1 w-36 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl animate-scale-in dark:border-slate-800 dark:bg-slate-900">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setOpen(false);
              onEdit?.();
            }}
            className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <Pencil className="h-4 w-4" />
            Edit
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setOpen(false);
              onDelete?.();
            }}
            className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-sm font-medium text-rose-600 transition-colors hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-500/10"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export function JobCard({
  job,
  onEdit,
  onDelete,
  variant = "list",
  draggable = false,
  onDragStart,
  onDragEnd,
}) {
  const status = STATUS_CONFIG[job.status] || STATUS_CONFIG.applied;
  const priority = PRIORITY_CONFIG[job.priority] || PRIORITY_CONFIG.Medium;
  const isKanban = variant === "kanban";

  return (
    <div
      draggable={draggable}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      className={cn(
        "group relative rounded-xl border border-slate-200 bg-white shadow-sm transition-all hover:border-slate-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700",
        isKanban ? "cursor-grab p-3.5 active:cursor-grabbing" : "p-4",
        draggable && "active:rotate-1 active:shadow-lg"
      )}
    >
      <div className="flex items-start gap-3">
        <CompanyAvatar company={job.company} />
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="truncate font-semibold text-slate-900 dark:text-white">
                {job.company}
              </p>
              <p className="truncate text-sm text-slate-500 dark:text-slate-400">
                {job.position}
              </p>
            </div>
            {!isKanban && (
              <Badge className={status.badge}>
                <span className={cn("h-1.5 w-1.5 rounded-full", status.dot)} />
                {status.label}
              </Badge>
            )}
          </div>
        </div>
        {isKanban && (
          <span
            className={cn("mt-1 h-2 w-2 shrink-0 rounded-full", priority.dot)}
            title={`${job.priority} priority`}
          />
        )}
      </div>

      <div
        className={cn(
          "flex flex-wrap items-center gap-x-3 gap-y-1.5",
          isKanban ? "mt-2.5" : "mt-3"
        )}
      >
        <MetaItem icon={Calendar}>{formatRelative(job.appliedDate)}</MetaItem>
        {job.location && <MetaItem icon={MapPin}>{job.location}</MetaItem>}
        {!isKanban && job.jobType && (
          <MetaItem icon={Briefcase}>{job.jobType}</MetaItem>
        )}
        {!isKanban && job.salary && (
          <MetaItem icon={DollarSign}>{job.salary}</MetaItem>
        )}
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3 dark:border-slate-800">
        <Badge className={priority.badge}>{job.priority} priority</Badge>
        <div className="flex items-center gap-1">
          {job.url && (
            <a
              href={job.url}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-indigo-600 dark:hover:bg-slate-800"
              aria-label="Open posting"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
          <ActionsMenu onEdit={() => onEdit?.(job)} onDelete={() => onDelete?.(job)} />
        </div>
      </div>
    </div>
  );
}
