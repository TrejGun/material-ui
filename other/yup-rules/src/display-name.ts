import { string } from "yup";

import { displayNameMinLength, displayNameMaxLength } from "@ethberry/constants";

export const displayNameValidationSchema = string()
  .min(displayNameMinLength, "form.validations.tooShort")
  .max(displayNameMaxLength, "form.validations.tooLong")
  .required("form.validations.valueMissing");
