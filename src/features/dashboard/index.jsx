import { Link } from "react-router-dom";
import {
  Briefcase,
  Users,
  Trophy,
  XCircle,
  Percent,
  Plus,
  Sparkles,
} from "lucide-react";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/Card";
import { StatCard } from "@/features/dashboard/components/StatCard";
import {
  StatusDonut,
  TimelineBars,
  StatusBars,
} from "@/components/ui/Charts";
import { JobCard } from "@/features/jobs/components/JobCard";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { StatCardSkeleton, Skeleton } from "@/components/ui/Skeleton";
import { useJobs } from "@/hooks/useJobs";
import { useAuth } from "@/hooks/useAuth";
import { useJobModals } from "@/hooks/useJobModals";
import { useAddJobModal } from "@/hooks/useAddJobModal";

export function Dashboard() {
  const { currentUser } = useAuth();
  const { jobs, loading, stats } = useJobs();
  const { openAddJobModal: openAdd } = useAddJobModal();
  const { handleEdit, handleDelete, modals } = useJobModals();

  const firstName = (
    currentUser?.displayName || currentUser?.email?.split("@")[0] || "User"
  )
    .replace(/[._-]+/g, " ")
    .split(" ")[0];
  const recent = jobs.slice(0, 5);

  const cards = [
    {
      label: "Total applications",
      value: stats.total,
      icon: Briefcase,
      accent: "indigo",
    },
    {
      label: "Interviews",
      value: stats.counts.interview,
      icon: Users,
      accent: "amber",
    },
    { label: "Offers", value: stats.counts.offer, icon: Trophy, accent: "emerald" },
    {
      label: "Rejections",
      value: stats.counts.rejected,
      icon: XCircle,
      accent: "rose",
    },
    {
      label: "Response rate",
      value: `${stats.responseRate}%`,
      icon: Percent,
      accent: "violet",
      hint: "Interviews + offers",
    },
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-64 rounded-lg" />
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <StatCardSkeleton key={i} />
          ))}
        </div>
        <div className="grid gap-5 lg:grid-cols-2">
          <Skeleton className="h-64 rounded-xl" />
          <Skeleton className="h-64 rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Welcome back, {firstName} 👋
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Here&apos;s your job search at a glance.
          </p>
        </div>
        <Button onClick={openAdd}>
          <Plus className="h-4 w-4" />
          Add application
        </Button>
      </div>

      {jobs.length === 0 ? (
        <EmptyState
          icon={Briefcase}
          title="No applications yet"
          description="Start tracking your job search by adding your first application."
          action={
            <Button onClick={openAdd}>
              <Plus className="h-4 w-4" />
              Add application
            </Button>
          }
        />
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
            {cards.map((c) => (
              <StatCard
                key={c.label}
                label={c.label}
                value={c.value}
                icon={c.icon}
                accent={c.accent}
                hint={c.hint}
              />
            ))}
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Status distribution</CardTitle>
              </CardHeader>
              <CardBody>
                <StatusDonut counts={stats.counts} total={stats.total} />
              </CardBody>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Applications over time</CardTitle>
                <span className="text-xs text-slate-400">Last 6 months</span>
              </CardHeader>
              <CardBody>
                <TimelineBars data={stats.timeline} />
              </CardBody>
            </Card>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Pipeline breakdown</CardTitle>
              </CardHeader>
              <CardBody>
                <StatusBars counts={stats.counts} total={stats.total} />
              </CardBody>
            </Card>
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Recent applications</CardTitle>
                <Link
                  to="/jobs"
                  className="text-sm font-medium text-indigo-600 hover:underline dark:text-indigo-400"
                >
                  View all
                </Link>
              </CardHeader>
              <CardBody className="space-y-3">
                {recent.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))}
              </CardBody>
            </Card>
          </div>
        </>
      )}

      {modals}
    </div>
  );
}
