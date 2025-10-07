import { useMemo, useCallback } from "react";
import {
  validateForm,
  getFormRules,
  validateByRules,
} from "../utils/formHelpers";

export function useFormValidation(formName, formData, formErrors) {
  const isValidFromErrors = useMemo(
    () => Object.keys(formErrors || {}).every((k) => !formErrors[k]),
    [formErrors]
  );

  const runFullValidation = useCallback(() => {
    return validateForm(formName, formData);
  }, [formName, formData]);

  const validateField = useCallback(
    (field) => {
      const rules = getFormRules(formName);
      const only = { [field]: rules?.[field] || [] };
      const result = validateByRules({ [field]: formData?.[field] }, only);
      return {
        error: result.errors[field] || "",
        isFieldValid: !result.errors[field],
      };
    },
    [formName, formData]
  );

  return { isValidFromErrors, runFullValidation, validateField };
}
