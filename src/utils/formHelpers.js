const s = (v) => (typeof v === "string" ? v.trim() : "");
export const isRequired = (v) => s(v).length > 0;
export const isEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s(email));
export const isHttpUrl = (url) => {
  const v = s(url);
  return v.startsWith("http://") || v.startsWith("https://");
};
export const isOptionalHttpUrl = (url) => {
  const v = s(url);
  return !v || isHttpUrl(v);
};

export const required =
  (msg = "This field is required") =>
  (v) =>
    isRequired(v) ? null : msg;

export const emailRule =
  (msg = "Enter a valid email address") =>
  (v) =>
    isEmail(v) ? null : msg;

export const minLen =
  (n, msg = `Must be at least ${n} characters`) =>
  (v) =>
    s(v).length >= n ? null : msg;

export const httpUrl =
  (msg = "Must start with http:// or https://") =>
  (v) =>
    isHttpUrl(v) ? null : msg;

export const optionalHttpUrl =
  (msg = "Must start with http:// or https://") =>
  (v) =>
    isOptionalHttpUrl(v) ? null : msg;

export const truthy =
  (msg = "Please select a value") =>
  (v) =>
    v ? null : msg;

const REGISTRATION_RULES = {
  email: [required("Email is required"), emailRule()],
  password: [required("Password is required"), minLen(6)],
  name: [required("Name is required")],
  avatar: [optionalHttpUrl()],
};

const LOGIN_RULES = {
  email: [required("Email is required"), emailRule()],
  password: [required("Password is required")],
};

const EDIT_PROFILE_RULES = {
  name: [required("Name is required")],
  avatar: [optionalHttpUrl()],
};

const ADD_ITEM_RULES = {
  name: [required("Name is required")],
  imageUrl: [required("Image URL is required"), httpUrl()],
  weather: [truthy("Weather is required")],
};

const FORM_RULES = {
  registration: REGISTRATION_RULES,
  login: LOGIN_RULES,
  "edit-profile": EDIT_PROFILE_RULES,
  "add-item": ADD_ITEM_RULES,
};

export function validateByRules(formData, rulesMap) {
  const errors = {};
  for (const field in rulesMap) {
    const rules = rulesMap[field] || [];
    const value = formData?.[field];
    const firstError = rules.map((fn) => fn(value, formData)).find(Boolean);
    if (firstError) errors[field] = firstError;
  }

  return { errors, isValid: Object.keys(errors).length === 0 };
}

export function validateForm(formName, formData) {
  const rules = FORM_RULES[formName];
  if (!rules) return { errors: { general: "Unknown form" }, isValid: false };
  return validateByRules(formData, rules);
}

export function isFormValid(formName, formData) {
  return validateForm(formName, formData).isValid;
}

export function getFormRules(formName) {
  return FORM_RULES[formName] || null;
}
