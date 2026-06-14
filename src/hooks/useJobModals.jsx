import { useState } from "react";
import { JobModal } from "@/components/jobs/JobModal";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { useJobs } from "@/hooks/useJobs";

/**
 * Shared edit + delete modals for JobCards used across Dashboard, Jobs and
 * Kanban. Returns action handlers plus the rendered modal elements.
 */
export function useJobModals() {
  const { deleteJob, actionLoading } = useJobs();
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);

  const handleEdit = (job) => setEditing(job);
  const handleDelete = (job) => setDeleting(job);

  const confirmDelete = async () => {
    if (!deleting) return;
    await deleteJob(deleting.id);
    setDeleting(null);
  };

  const modals = (
    <>
      <JobModal
        open={Boolean(editing)}
        mode="edit"
        initialValues={editing}
        onClose={() => setEditing(null)}
      />
      <ConfirmDialog
        open={Boolean(deleting)}
        onClose={() => setDeleting(null)}
        onConfirm={confirmDelete}
        loading={actionLoading}
        title="Delete application?"
        message={
          <>
            This permanently removes{" "}
            <span className="font-semibold text-slate-900 dark:text-white">
              {deleting?.company}
            </span>{" "}
            — {deleting?.position} from your tracker. This can&apos;t be undone.
          </>
        }
        confirmText="Delete"
      />
    </>
  );

  return { handleEdit, handleDelete, modals };
}
