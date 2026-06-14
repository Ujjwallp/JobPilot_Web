import { createContext, useCallback, useMemo, useState } from "react";
import { JobModal } from "@/components/jobs/JobModal";

export const AddJobModalContext = createContext(undefined);

/**
 * Owns the global "Add application" modal.
 *
 * Any component (Topbar, Dashboard, Jobs, Kanban) can open it via the
 * `useAddJobModal()` hook — no prop drilling and no dependency on React
 * Router outlet context. The <JobModal> itself is rendered inside this
 * provider, so it always has access to the JobsProvider + ToastProvider
 * that wrap the layout.
 */
export function AddJobModalProvider({ children }) {
  const [open, setOpen] = useState(false);

  const openAddJobModal = useCallback(() => setOpen(true), []);
  const closeAddJobModal = useCallback(() => setOpen(false), []);

  const value = useMemo(
    () => ({ open, openAddJobModal, closeAddJobModal }),
    [open, openAddJobModal, closeAddJobModal]
  );

  return (
    <AddJobModalContext.Provider value={value}>
      {children}
      <JobModal open={open} onClose={closeAddJobModal} />
    </AddJobModalContext.Provider>
  );
}
