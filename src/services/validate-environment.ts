import { EnvVars } from "./consts.ts";

const requiredEnvironmentVariables = [
  EnvVars.MONGO_HOST,
  EnvVars.MONGO_PORT,
  EnvVars.JWT_KEY,
  EnvVars.USER_ID,
  EnvVars.USER_NAME,
  EnvVars.USER_PASSWORD,
];

interface ValidationMessage {
  [index: number]: string;
}

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
