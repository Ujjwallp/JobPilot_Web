import { Modal } from "@/components/ui/Modal";
import { JobForm } from "./JobForm";
import { useJobs } from "@/hooks/useJobs";
import { useToast } from "@/hooks/useToast";

export function JobModal({ open, mode = "add", initialValues, onClose }) {
  const { addJob, updateJob, actionLoading } = useJobs();
  const toast = useToast();

  const handleSubmit = async (values) => {
    try {
      if (mode === "edit" && initialValues?.id) {
        await updateJob(initialValues.id, values);
      } else {
        await addJob(values);
      }
      onClose();
    } catch {
      toast.error("Could not save the application.");
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={mode === "edit" ? "Edit application" : "Add application"}
      description={
        mode === "edit"
          ? "Update the details for this role."
          : "Track a new role you're applying to."
      }
      size="lg"
    >
      <JobForm
        mode={mode}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        onCancel={onClose}
        submitting={actionLoading}
      />
    </Modal>
  );
}
