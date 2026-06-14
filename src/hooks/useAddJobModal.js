import { useContext } from "react";
import { AddJobModalContext } from "@/context/AddJobModalContext";

/**
 * Access the global "Add application" modal.
 * Must be used within an <AddJobModalProvider> (provided by the Layout).
 */
export function useAddJobModal() {
  const ctx = useContext(AddJobModalContext);
  if (!ctx) {
    throw new Error(
      "useAddJobModal must be used within an <AddJobModalProvider>"
    );
  }
  return ctx;
}
