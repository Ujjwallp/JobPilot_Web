import { useState } from "react";
import { Plus } from "lucide-react";
import { JobCard } from "@/components/jobs/JobCard";
import { JobModal } from "@/components/jobs/JobModal";
import { Skeleton } from "@/components/ui/Skeleton";
import { useJobs } from "@/hooks/useJobs";
import { useJobModals } from "@/hooks/useJobModals";
import { STATUS_ORDER, STATUS_CONFIG } from "@/constants";
import { cn } from "@/utils";

export function Kanban() {
  const { jobs, loading, updateJob } = useJobs();
  const { handleEdit, handleDelete, modals } = useJobModals();
  const [dragId, setDragId] = useState(null);
  const [dragOver, setDragOver] = useState(null);
  const [addingFor, setAddingFor] = useState(null);

  const columns = STATUS_ORDER.map((status) => ({
    status,
    config: STATUS_CONFIG[status],
    items: jobs.filter((j) => j.status === status),
  }));

  const handleDrop = async (status) => {
    const job = jobs.find((j) => j.id === dragId);
    setDragOver(null);
    setDragId(null);
    if (job && job.status !== status) {
      try {
        await updateJob(job.id, { status });
      } catch {
        /* surfaced via toast in context */
      }
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Pipeline
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Move applications through your workflow to keep status up to date.
        </p>
      </div>

      <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-2 xl:grid-cols-4">
        {columns.map((col) => (
          <div
            key={col.status}
            onDragOver={(e) => {
              e.preventDefault();
              if (dragOver !== col.status) setDragOver(col.status);
            }}
            onDrop={() => handleDrop(col.status)}
            className={cn(
              "flex min-h-[240px] flex-col rounded-xl border transition-colors",
              dragOver === col.status
                ? "border-indigo-400 bg-indigo-50/50 ring-2 ring-indigo-400/30 dark:bg-indigo-500/5"
                : "border-slate-200 bg-slate-100/60 dark:border-slate-800 dark:bg-slate-900/40"
            )}
          >
            <div className="flex items-center justify-between gap-2 border-b border-slate-200 px-4 py-3 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span
                  className={cn("h-2.5 w-2.5 rounded-full", col.config.dot)}
                />
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                  {col.config.label}
                </h3>
                <span className="rounded-full bg-slate-200 px-2 py-0.5 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                  {col.items.length}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setAddingFor(col.status)}
                className="rounded-md p-1 text-slate-400 transition-colors hover:bg-slate-200 hover:text-slate-700 dark:hover:bg-slate-800"
                aria-label={`Add to ${col.config.label}`}
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 space-y-2.5 p-3">
              {loading ? (
                <div className="space-y-2.5">
                  <Skeleton className="h-24 rounded-xl" />
                  <Skeleton className="h-24 rounded-xl" />
                </div>
              ) : col.items.length === 0 ? (
                <div className="flex h-28 items-center justify-center rounded-lg border border-dashed border-slate-300 text-xs text-slate-400 dark:border-slate-700">
                  {dragOver === col.status ? "Drop here" : "No applications"}
                </div>
              ) : (
                col.items.map((job) => (
                  <div
                    key={job.id}
                    className={cn(dragId === job.id && "opacity-40")}
                  >
                    <JobCard
                      job={job}
                      variant="kanban"
                      draggable
                      onDragStart={() => setDragId(job.id)}
                      onDragEnd={() => {
                        setDragId(null);
                        setDragOver(null);
                      }}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                    />
                  </div>
                ))
              )}
            </div>
          </div>
        ))}
      </div>

      <JobModal
        open={Boolean(addingFor)}
        initialValues={addingFor ? { status: addingFor } : null}
        onClose={() => setAddingFor(null)}
      />
      {modals}
    </div>
  );
}
