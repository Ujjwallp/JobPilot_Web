export const isEmail = (value) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || "").trim());

export function validateAuth({ name, email, password, mode }) {
  const errors = {};
  if (mode === "signup") {
    if (!name || name.trim().length < 2)
      errors.name = "Please enter your full name.";
  }
  if (!email || !isEmail(email))
    errors.email = "Please enter a valid email address.";
  if (!password || password.length < 6)
    errors.password = "Password must be at least 6 characters.";
  return { errors, isValid: Object.keys(errors).length === 0 };
}

export function validateJob(values) {
  const errors = {};
  if (!values.company || !values.company.trim())
    errors.company = "Company name is required.";
  if (!values.position || !values.position.trim())
    errors.position = "Position is required.";
  if (values.url && !/^https?:\/\/.+\..+/i.test(values.url))
    errors.url = "Enter a valid URL (starting with http:// or https://).";
  if (values.contactEmail && !isEmail(values.contactEmail))
    errors.contactEmail = "Enter a valid email address.";
  return { errors, isValid: Object.keys(errors).length === 0 };
}

export function validateProfile({ name, photoURL }) {
  const errors = {};
  if (!name || name.trim().length < 2)
    errors.name = "Display name is required.";
  if (photoURL && !/^https?:\/\/.+\..+/i.test(photoURL))
    errors.photoURL = "Enter a valid image URL.";
  return { errors, isValid: Object.keys(errors).length === 0 };
}
