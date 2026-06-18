import { useMemo, useState } from "react";
import { Search, Plus, Briefcase, X, Sparkles } from "lucide-react";
import { JobCard } from "@/features/jobs/components/JobCard";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { EmptyState } from "@/components/ui/EmptyState";
import { JobRowSkeleton } from "@/components/ui/Skeleton";
import { useJobs } from "@/hooks/useJobs";
import { useJobModals } from "@/hooks/useJobModals";
import { useAddJobModal } from "@/hooks/useAddJobModal";
import { useDebounce } from "@/hooks/useDebounce";
import {
  STATUS_ORDER,
  STATUS_CONFIG,
  JOB_TYPES,
  PRIORITY_ORDER,
  SORT_OPTIONS,
} from "@/constants";
import { pluralize } from "@/utils";

const PRIORITY_RANK = { High: 0, Medium: 1, Low: 2 };

export function Jobs() {
  const { jobs, loading } = useJobs();
  const { openAddJobModal: openAdd } = useAddJobModal();
  const { handleEdit, handleDelete, modals } = useJobModals();

  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [type, setType] = useState("all");
  const [priority, setPriority] = useState("all");
  const [sort, setSort] = useState("newest");
  const debounced = useDebounce(query, 250);

  const filtered = useMemo(() => {
    const q = debounced.trim().toLowerCase();
    const list = jobs.filter((j) => {
      const haystack = `${j.company} ${j.position} ${j.location || ""}`.toLowerCase();
      return (
        (!q || haystack.includes(q)) &&
        (status === "all" || j.status === status) &&
        (type === "all" || j.jobType === type) &&
        (priority === "all" || j.priority === priority)
      );
    });

    return list.sort((a, b) => {
      switch (sort) {
        case "oldest":
          return (a.createdAt || 0) - (b.createdAt || 0);
        case "company":
          return a.company.localeCompare(b.company);
        case "position":
          return a.position.localeCompare(b.position);
        case "status":
          return (
            STATUS_ORDER.indexOf(a.status) - STATUS_ORDER.indexOf(b.status)
          );
        case "priority":
          return (
            (PRIORITY_RANK[a.priority] ?? 1) - (PRIORITY_RANK[b.priority] ?? 1)
          );
        default:
          return (b.createdAt || 0) - (a.createdAt || 0);
      }
    });
  }, [jobs, debounced, status, type, priority, sort]);

  const hasFilters =
    status !== "all" || type !== "all" || priority !== "all" || debounced !== "";
  const reset = () => {
    setQuery("");
    setStatus("all");
    setType("all");
    setPriority("all");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Applications
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {pluralize(jobs.length, "application")} tracked
          </p>
        </div>
        <Button onClick={openAdd}>
          <Plus className="h-4 w-4" />
          Add application
        </Button>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Input
              icon={Search}
              placeholder="Search company, role or location…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <Select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            aria-label="Filter by status"
          >
            <option value="all">All statuses</option>
            {STATUS_ORDER.map((s) => (
              <option key={s} value={s}>
                {STATUS_CONFIG[s].label}
              </option>
            ))}
          </Select>
          <Select
            value={type}
            onChange={(e) => setType(e.target.value)}
            aria-label="Filter by type"
          >
            <option value="all">All types</option>
            {JOB_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </Select>
          <Select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            aria-label="Sort applications"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </Select>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <Select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              aria-label="Filter by priority"
              className="w-auto"
            >
              <option value="all">All priorities</option>
              {PRIORITY_ORDER.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </Select>
          </div>
          {hasFilters && (
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center gap-1 text-sm font-medium text-slate-500 transition-colors hover:text-rose-600 dark:text-slate-400"
            >
              <X className="h-4 w-4" />
              Clear filters
            </button>
          )}
          <span className="ml-auto text-sm text-slate-500 dark:text-slate-400">
            {pluralize(filtered.length, "result")}
          </span>
        </div>
      </div>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <JobRowSkeleton key={i} />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={Briefcase}
          title={hasFilters ? "No matches found" : "No applications yet"}
          description={
            hasFilters
              ? "Try adjusting your search or filters."
              : "Add your first application to get started."
          }
          action={
            hasFilters ? (
              <Button variant="outline" onClick={reset}>
                Clear filters
              </Button>
            ) : (
              <Button onClick={openAdd}>
                <Plus className="h-4 w-4" />
                Add application
              </Button>
            )
          }
        />
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {modals}
    </div>
  );
}
