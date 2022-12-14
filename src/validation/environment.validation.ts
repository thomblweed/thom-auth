import { EnvVars } from "../enums/env-vars.enum.ts";
import { ValidationMessage } from "./validation-message.interface.ts";

const requiredEnvironmentVariables = [
  EnvVars.MONGO_HOST,
  EnvVars.MONGO_PORT,
  EnvVars.MONGO_USERNAME,
  EnvVars.MONGO_PASSWORD,
  EnvVars.MONGO_PORT,
  EnvVars.JWT_KEY,
  EnvVars.USER_ID,
  EnvVars.USER_NAME,
  EnvVars.USER_PASSWORD,
  EnvVars.ADMIN_ROLE_ID,
  EnvVars.USER_ROLE_ID,
  EnvVars.CORS_ORIGIN,
];

const validateEnvironmentVariables = (
  variables: { [index: string]: string | number },
): ValidationMessage[] => {
  const messages: ValidationMessage[] = [];
  requiredEnvironmentVariables.forEach((value) => {
    if (!variables[value]) {
      messages.push(
        `Environment Variable '${value}' is not defined`,
      );
    }
  });
  return messages;
};

export { validateEnvironmentVariables };
export type { ValidationMessage };
