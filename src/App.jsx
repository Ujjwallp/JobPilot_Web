import { HashRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/context/ThemeContext";
import { ToastProvider } from "@/context/ToastContext";
import { AuthProvider } from "@/context/AuthContext";
import { JobsProvider } from "@/context/JobsContext";
import { ProtectedRoute, PublicRoute } from "@/layouts/ProtectedRoute";
import { Layout } from "@/layouts";
import { Landing } from "@/features/landing";
import { Login } from "@/features/auth/login";
import { Signup } from "@/features/auth/signup";
import { ForgotPassword } from "@/features/auth/forgot-password";
import { Dashboard } from "@/features/dashboard";
import { Jobs } from "@/features/jobs";
import { Kanban } from "@/features/pipeline";
import { Profile } from "@/features/profile";
import { Settings } from "@/features/settings";
import { NotFound } from "@/features/not-found";

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <HashRouter>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route
                path="/login"
                element={
                  <PublicRoute>
                    <Login />
                  </PublicRoute>
                }
              />
              <Route
                path="/signup"
                element={
                  <PublicRoute>
                    <Signup />
                  </PublicRoute>
                }
              />
              <Route
                path="/forgot-password"
                element={
                  <PublicRoute>
                    <ForgotPassword />
                  </PublicRoute>
                }
              />

              <Route
                element={
                  <ProtectedRoute>
                    <JobsProvider>
                      <Layout />
                    </JobsProvider>
                  </ProtectedRoute>
                }
              >
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/jobs" element={<Jobs />} />
                <Route path="/pipeline" element={<Kanban />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </HashRouter>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
