import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User, ArrowRight } from "lucide-react";
import { AuthShell, AuthDivider } from "@/components/auth/AuthShell";
import { GoogleButton } from "@/components/auth/GoogleButton";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/useToast";
import { validateAuth } from "@/lib/validation";
import { authErrorMessage } from "@/lib/constants";

export function Signup() {
  const { signUp, signInWithGoogle } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const set = (field) => (e) => {
    setValues((v) => ({ ...v, [field]: e.target.value }));
    setErrors((p) => ({ ...p, [field]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { errors: errs, isValid } = validateAuth({
      ...values,
      mode: "signup",
    });
    setErrors(errs);
    if (!isValid) return;
    setLoading(true);
    try {
      await signUp(values.email, values.password, values.name);
      toast.success("Account created — welcome to JobPilot!");
      navigate("/dashboard", { replace: true });
    } catch (err) {
      toast.error(authErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setGoogleLoading(true);
    try {
      await signInWithGoogle();
      toast.success("Welcome to JobPilot!");
      navigate("/dashboard", { replace: true });
    } catch (err) {
      toast.error(authErrorMessage(err));
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <AuthShell
      title="Create your account"
      subtitle="Start organizing your job search in minutes."
      footer={
        <>
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
          >
            Sign in
          </Link>
        </>
      }
    >
      <div className="space-y-3">
        <GoogleButton onClick={handleGoogle} loading={googleLoading} />
        <p className="text-center text-sm text-slate-400">
          Use Google or your email address to create an account.
        </p>
      </div>
      <AuthDivider>Continue with email</AuthDivider>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Full name"
          placeholder="Jane Doe"
          icon={User}
          value={values.name}
          onChange={set("name")}
          error={errors.name}
          autoComplete="name"
        />
        <Input
          label="Email"
          type="email"
          placeholder="you@example.com"
          icon={Mail}
          value={values.email}
          onChange={set("email")}
          error={errors.email}
          autoComplete="email"
        />
        <Input
          label="Password"
          type="password"
          placeholder="At least 6 characters"
          icon={Lock}
          value={values.password}
          onChange={set("password")}
          error={errors.password}
          autoComplete="new-password"
          hint="Use 6 or more characters."
        />
        <Button type="submit" className="w-full" loading={loading}>
          Create account
          <ArrowRight className="h-4 w-4" />
        </Button>
        <p className="text-center text-xs text-slate-400">
          By continuing you agree to our Terms &amp; Privacy Policy.
        </p>
      </form>
    </AuthShell>
  );
}
