enum EnvVars {
  MONGO_URI = "MONGO_URI",
  MONGO_HOST = "MONGO_HOST",
  MONGO_PORT = "MONGO_PORT",
  JWT_KEY = "JWT_KEY",
  SEED = "SEED",
  USER_ID = "USER_ID",
  USER_NAME = "USER_NAME",
  USER_PASSWORD = "USER_PASSWORD",
}

const AUTH_DATABASE = "auth";
const USERS_COLLECTION = "users";

export { AUTH_DATABASE, EnvVars, USERS_COLLECTION };
