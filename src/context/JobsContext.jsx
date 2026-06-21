import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { jobService } from "@/services/jobService";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/useToast";
import { lastMonths } from "@/utils";

export const JobsContext = createContext(undefined);

export function JobsProvider({ children }) {
  const { currentUser } = useAuth();
  const toast = useToast();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  
  // AddJobModal state integrated here
  const [isAddJobModalOpen, setIsAddJobModalOpen] = useState(false);
  const openAddJobModal = () => setIsAddJobModalOpen(true);
  const closeAddJobModal = () => setIsAddJobModalOpen(false);

  useEffect(() => {
    if (!currentUser) {
      setJobs([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const unsubscribe = jobService.subscribeToJobs(
      currentUser.uid,
      (list) => {
        setJobs(list);
        setLoading(false);
      },
      (err) => {
        setError(err);
        setLoading(false);
        toast.error("Failed to load your applications.");
      }
    );
    return unsubscribe;
  }, [currentUser, toast]);

  const addJob = async (data) => {
    setActionLoading(true);
    try {
      await jobService.addJob(currentUser.uid, data);
      toast.success("Application added.");
    } finally {
      setActionLoading(false);
    }
  };

  const updateJob = async (id, data) => {
    setActionLoading(true);
    try {
      await jobService.updateJob(currentUser.uid, id, data);
      toast.success("Application updated.");
    } finally {
      setActionLoading(false);
    }
  };

  const deleteJob = async (id) => {
    setActionLoading(true);
    try {
      await jobService.deleteJob(currentUser.uid, id);
      toast.success("Application deleted.");
    } finally {
      setActionLoading(false);
    }
  };

  const clearAll = async () => {
    try {
      await jobService.clearAll(currentUser.uid);
      toast.success("All applications cleared.");
    } catch {
      toast.error("Could not clear your data.");
    }
  };

  const total = jobs.length;
  const counts = { applied: 0, interview: 0, offer: 0, rejected: 0 };
  for (const job of jobs) {
    counts[job.status] = (counts[job.status] || 0) + 1;
  }
  const responseRate = total
    ? Math.round(((counts.interview + counts.offer) / total) * 100)
    : 0;
  const offerRate = total
    ? Math.round((counts.offer / total) * 100)
    : 0;

  const months = lastMonths(6);
  const timeline = months.map((m) => ({
    label: m.label,
    value: jobs.filter((job) => {
      const d = job.appliedDate ? new Date(job.appliedDate) : null;
      return (
        d &&
        d.getFullYear() === m.year &&
        d.getMonth() === m.month
      );
    }).length,
  }));

  const stats = { total, counts, responseRate, offerRate, timeline };

  const value = {
    jobs,
    loading,
    error,
    actionLoading,
    stats,
    addJob,
    updateJob,
    deleteJob,
    clearAll,
    isAddJobModalOpen,
    openAddJobModal,
    closeAddJobModal,
  };

  return <JobsContext.Provider value={value}>{children}</JobsContext.Provider>;
}
