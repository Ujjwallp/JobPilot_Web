import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { FullPageSpinner } from "@/components/ui/Spinner";

/** Guards private routes — redirects to /login when there is no session. */
export function ProtectedRoute({ children }) {
  const { currentUser, loading } = useAuth();
  const location = useLocation();

  if (loading) return <FullPageSpinner label="Checking your session…" />;
  if (!currentUser)
    return <Navigate to="/login" replace state={{ from: location }} />;
  return children;
}

/** Keeps auth visitors out of the auth pages. */
export function PublicRoute({ children }) {
  const { currentUser, loading } = useAuth();
  if (loading) return <FullPageSpinner label="Loading…" />;
  if (currentUser) return <Navigate to="/dashboard" replace />;
  return children;
}
