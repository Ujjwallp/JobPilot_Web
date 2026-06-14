import { useState } from "react";
import { Mail, Calendar, Camera, Save, User as UserIcon } from "lucide-react";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import { useAuth } from "@/hooks/useAuth";
import { useJobs } from "@/hooks/useJobs";
import { useToast } from "@/hooks/useToast";
import { validateProfile } from "@/lib/validation";
import { authErrorMessage } from "@/lib/constants";
import { formatDate } from "@/lib/utils";

export function Profile() {
  const { currentUser, updateUserProfile } = useAuth();
  const { stats } = useJobs();
  const toast = useToast();

  const [values, setValues] = useState({
    name:
      currentUser?.displayName || currentUser?.email?.split("@")[0] || "",
    photoURL: currentUser?.photoURL || "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const set = (field) => (e) => {
    setValues((v) => ({ ...v, [field]: e.target.value }));
    setErrors((p) => ({ ...p, [field]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { errors: errs, isValid } = validateProfile(values);
    setErrors(errs);
    if (!isValid) return;
    setLoading(true);
    try {
      await updateUserProfile({
        displayName: values.name.trim(),
        photoURL: values.photoURL.trim(),
      });
      toast.success("Profile updated.");
    } catch (err) {
      toast.error(authErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const created = currentUser?.metadata?.creationTime;
  const summary = [
    { label: "Applications", value: stats.total },
    { label: "Interviews", value: stats.counts.interview },
    { label: "Offers", value: stats.counts.offer },
  ];

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Profile
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Manage your personal information and avatar.
        </p>
      </div>

      <Card>
        <CardBody className="flex flex-col items-center gap-5 sm:flex-row">
          <Avatar
            name={
              values.name ||
              currentUser?.displayName ||
              currentUser?.email?.split("@")[0] ||
              "User"
            }
            src={values.photoURL || currentUser?.photoURL}
            size="2xl"
          />
          <div className="text-center sm:text-left">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              {currentUser?.displayName || currentUser?.email?.split("@")[0] || "User"}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {currentUser?.email}
            </p>
            <div className="mt-2 flex flex-wrap justify-center gap-4 text-xs text-slate-400 sm:justify-start">
              <span className="inline-flex items-center gap-1">
                <Mail className="h-3.5 w-3.5" />
                {currentUser?.emailVerified ? "Verified" : "Not verified"}
              </span>
              {created && (
                <span className="inline-flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  Joined {formatDate(created)}
                </span>
              )}
            </div>
          </div>
        </CardBody>
      </Card>

      <div className="grid grid-cols-3 gap-4">
        {summary.map((s) => (
          <Card key={s.label} className="p-4 text-center">
            <p className="text-2xl font-bold text-slate-900 dark:text-white">
              {s.value}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {s.label}
            </p>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Edit profile</CardTitle>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Display name"
              icon={UserIcon}
              value={values.name}
              onChange={set("name")}
              error={errors.name}
            />
            <Input
              label="Profile image URL"
              icon={Camera}
              placeholder="https://…/avatar.png"
              value={values.photoURL}
              onChange={set("photoURL")}
              error={errors.photoURL}
              hint="Paste an image URL — leave empty to use your initials avatar."
            />
            <div className="flex justify-end">
              <Button type="submit" loading={loading}>
                <Save className="h-4 w-4" />
                Save changes
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
