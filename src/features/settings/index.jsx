import { useState } from "react";
import {
  Moon,
  Sun,
  Cloud,
  Trash2,
  Mail,
  Lock,
  ShieldCheck,
  LogOut,
} from "lucide-react";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { useTheme } from "@/hooks/useTheme";
import { useAuth } from "@/hooks/useAuth";
import { useJobs } from "@/hooks/useJobs";
import { useToast } from "@/hooks/useToast";
import { isEmail } from "@/utils/validation";
import { authErrorMessage } from "@/constants";
import { cn } from "@/utils";

export function Settings() {
  const { theme, setTheme } = useTheme();
  const { currentUser, updateUserEmail, updateUserPassword, logOut } = useAuth();
  const { clearAll, actionLoading } = useJobs();
  const toast = useToast();

  const [emailVal, setEmailVal] = useState(currentUser?.email || "");
  const [emailLoading, setEmailLoading] = useState(false);
  const [pw, setPw] = useState({ next: "", confirm: "" });
  const [pwLoading, setPwLoading] = useState(false);
  const [clearOpen, setClearOpen] = useState(false);

  const providers = currentUser?.providerData || [];
  const isPasswordUser = providers.some((p) => p.providerId === "password");

  const saveEmail = async (e) => {
    e.preventDefault();
    if (!isEmail(emailVal)) {
      toast.error("Please enter a valid email.");
      return;
    }
    setEmailLoading(true);
    try {
      await updateUserEmail(emailVal.trim());
      toast.success("Email updated.");
    } catch (err) {
      toast.error(authErrorMessage(err));
    } finally {
      setEmailLoading(false);
    }
  };

  const savePassword = async (e) => {
    e.preventDefault();
    if (pw.next.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }
    if (pw.next !== pw.confirm) {
      toast.error("Passwords don't match.");
      return;
    }
    setPwLoading(true);
    try {
      await updateUserPassword(pw.next);
      toast.success("Password updated.");
      setPw({ next: "", confirm: "" });
    } catch (err) {
      toast.error(authErrorMessage(err));
    } finally {
      setPwLoading(false);
    }
  };

  const onClear = async () => {
    await clearAll();
    setClearOpen(false);
  };

  const themeOptions = [
    { value: "light", label: "Light", icon: Sun },
    { value: "dark", label: "Dark", icon: Moon },
  ];

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Settings
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Manage appearance, data and your account.
        </p>
      </div>

      <Card>
        <CardBody className="flex items-center gap-3">
          <Cloud className="h-5 w-5 shrink-0 text-emerald-500" />
          <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-white">
              Connected to Firebase
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Your data syncs securely with Cloud Firestore.
            </p>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
        </CardHeader>
        <CardBody>
          <p className="mb-3 text-sm text-slate-500 dark:text-slate-400">
            Choose how JobPilot looks to you.
          </p>
          <div className="grid max-w-sm grid-cols-2 gap-3">
            {themeOptions.map((o) => (
              <button
                key={o.value}
                type="button"
                onClick={() => setTheme(o.value)}
                className={cn(
                  "flex items-center justify-center gap-2 rounded-lg border p-3 text-sm font-medium transition-colors",
                  theme === o.value
                    ? "border-indigo-500 bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300"
                    : "border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                )}
              >
                <o.icon className="h-4 w-4" />
                {o.label}
              </button>
            ))}
          </div>
        </CardBody>
      </Card>

      {isPasswordUser ? (
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
          </CardHeader>
          <CardBody className="space-y-6">
            <form onSubmit={saveEmail} className="space-y-3">
              <Input
                label="Email address"
                type="email"
                icon={Mail}
                value={emailVal}
                onChange={(e) => setEmailVal(e.target.value)}
              />
              <div className="flex justify-end">
                <Button type="submit" variant="outline" loading={emailLoading}>
                  Update email
                </Button>
              </div>
            </form>
            <div className="border-t border-slate-200 pt-5 dark:border-slate-800">
              <form onSubmit={savePassword} className="space-y-3">
                <Input
                  label="New password"
                  type="password"
                  icon={Lock}
                  placeholder="At least 6 characters"
                  value={pw.next}
                  onChange={(e) => setPw((p) => ({ ...p, next: e.target.value }))}
                />
                <Input
                  label="Confirm new password"
                  type="password"
                  icon={Lock}
                  value={pw.confirm}
                  onChange={(e) =>
                    setPw((p) => ({ ...p, confirm: e.target.value }))
                  }
                />
                <div className="flex justify-end">
                  <Button type="submit" loading={pwLoading}>
                    Update password
                  </Button>
                </div>
              </form>
            </div>
          </CardBody>
        </Card>
      ) : (
        <Card>
          <CardBody className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
            <ShieldCheck className="h-5 w-5 shrink-0 text-indigo-500" />
            You signed in with Google — manage your account from your Google
            profile.
          </CardBody>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Data</CardTitle>
        </CardHeader>
        <CardBody className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-slate-900 dark:text-white">
                Clear all data
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Permanently delete every application.
              </p>
            </div>
            <Button variant="danger" onClick={() => setClearOpen(true)}>
              <Trash2 className="h-4 w-4" />
              Clear all
            </Button>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-slate-900 dark:text-white">
              Sign out
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              End your current session on this device.
            </p>
          </div>
          <Button variant="outline" onClick={logOut}>
            <LogOut className="h-4 w-4" />
            Sign out
          </Button>
        </CardBody>
      </Card>

      <ConfirmDialog
        open={clearOpen}
        onClose={() => setClearOpen(false)}
        onConfirm={onClear}
        loading={actionLoading}
        title="Clear all applications?"
        message="This permanently deletes every application in your tracker. This action can't be undone."
        confirmText="Delete everything"
      />
    </div>
  );
}
