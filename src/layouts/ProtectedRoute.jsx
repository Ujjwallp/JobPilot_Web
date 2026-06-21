import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { FullPageSpinner } from "@/components/ui/Spinner";

export function ProtectedRoute({ children }) {
  const { currentUser, loading } = useAuth();
  const location = useLocation();

  if (loading) return <FullPageSpinner label="Checking your session…" />;
  if (!currentUser)
    return <Navigate to="/login" replace state={{ from: location }} />;
  return children;
}

export function PublicRoute({ children }) {
  const { currentUser, loading } = useAuth();
  if (loading) return <FullPageSpinner label="Loading…" />;
  if (currentUser) return <Navigate to="/dashboard" replace />;
  return children;
}
