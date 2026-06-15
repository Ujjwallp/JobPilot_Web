import { useState } from "react";
import {
  Briefcase,
  MapPin,
  DollarSign,
  Link as LinkIcon,
  Calendar,
  Mail,
  User,
} from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { validateJob } from "@/utils/validation";
import {
  STATUS_ORDER,
  STATUS_CONFIG,
  JOB_TYPES,
  WORK_MODES,
  PRIORITY_ORDER,
} from "@/constants";
import { todayInput, toInputDate } from "@/utils";

const EMPTY = {
  company: "",
  position: "",
  status: "applied",
  location: "",
  jobType: JOB_TYPES[0],
  workMode: WORK_MODES[0],
  salary: "",
  url: "",
  appliedDate: todayInput(),
  priority: "Medium",
  contactName: "",
  contactEmail: "",
  notes: "",
};

export function JobForm({
  mode = "add",
  initialValues,
  onSubmit,
  onCancel,
  submitting,
}) {
  const [values, setValues] = useState(() => ({
    ...EMPTY,
    ...initialValues,
    appliedDate: toInputDate(initialValues?.appliedDate) || todayInput(),
  }));
  const [errors, setErrors] = useState({});

  const set = (field) => (e) => {
    const value = e?.target ? e.target.value : e;
    setValues((v) => ({ ...v, [field]: value }));
    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { errors: errs, isValid } = validateJob(values);
    setErrors(errs);
    if (!isValid) return;
    onSubmit({
      ...values,
      appliedDate: values.appliedDate
        ? new Date(values.appliedDate).toISOString()
        : null,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Company"
          placeholder="e.g. Vercel"
          icon={Briefcase}
          value={values.company}
          onChange={set("company")}
          error={errors.company}
          required
        />
        <Input
          label="Position"
          placeholder="e.g. Frontend Engineer"
          value={values.position}
          onChange={set("position")}
          error={errors.position}
          required
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Select label="Status" value={values.status} onChange={set("status")}>
          {STATUS_ORDER.map((s) => (
            <option key={s} value={s}>
              {STATUS_CONFIG[s].label}
            </option>
          ))}
        </Select>
        <Select label="Priority" value={values.priority} onChange={set("priority")}>
          {PRIORITY_ORDER.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </Select>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Select label="Job type" value={values.jobType} onChange={set("jobType")}>
          {JOB_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </Select>
        <Select label="Work mode" value={values.workMode} onChange={set("workMode")}>
          {WORK_MODES.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </Select>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Location"
          placeholder="e.g. Remote, New York"
          icon={MapPin}
          value={values.location}
          onChange={set("location")}
        />
        <Input
          label="Salary"
          placeholder="e.g. $120k – $150k"
          icon={DollarSign}
          value={values.salary}
          onChange={set("salary")}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Date applied"
          type="date"
          icon={Calendar}
          value={values.appliedDate}
          onChange={set("appliedDate")}
        />
        <Input
          label="Posting URL"
          placeholder="https://…"
          icon={LinkIcon}
          value={values.url}
          onChange={set("url")}
          error={errors.url}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Contact name"
          placeholder="Recruiter or referral"
          icon={User}
          value={values.contactName}
          onChange={set("contactName")}
        />
        <Input
          label="Contact email"
          placeholder="name@company.com"
          icon={Mail}
          value={values.contactEmail}
          onChange={set("contactEmail")}
          error={errors.contactEmail}
        />
      </div>

      <Textarea
        label="Notes"
        placeholder="Interview notes, follow-ups, anything useful…"
        value={values.notes}
        onChange={set("notes")}
        rows={3}
      />

      <div className="flex items-center justify-end gap-3 pt-1">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={submitting}
        >
          Cancel
        </Button>
        <Button type="submit" loading={submitting}>
          {mode === "edit" ? "Save changes" : "Add application"}
        </Button>
      </div>
    </form>
  );
}
