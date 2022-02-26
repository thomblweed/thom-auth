import {
  validateEnvironmentVariables,
  ValidationMessage,
} from "./environment.validation.ts";

export const validate = () => {
  const validationMessages: ValidationMessage[] = validateEnvironmentVariables(
    Deno.env.toObject(),
  );
  if (validationMessages.length > 0) {
    throw new Error(validationMessages.toString());
  }
};
