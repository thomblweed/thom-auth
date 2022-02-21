import { green, red, yellow } from "../deps.ts";

import { Client } from "./data/client.ts";
import { Databases } from "./data/data.enum.ts";
import { seedData } from "./data/services/seed.service.ts";
import { EnvVars } from "./enums/env-vars.enum.ts";
import {
  validateEnvironmentVariables,
  ValidationMessage,
} from "./validation/environment.validation.ts";

const startup = async () => {
  try {
    const validationMessages: ValidationMessage[] =
      validateEnvironmentVariables(Deno.env.toObject());
    if (validationMessages.length > 0) {
      throw new Error(validationMessages.toString());
    }

    const username = Deno.env.get(EnvVars.MONGO_USERNAME)!;
    const password = Deno.env.get(EnvVars.MONGO_PASSWORD)!;
    const host = Deno.env.get(EnvVars.MONGO_HOST)!;
    const port = +Deno.env.get(EnvVars.MONGO_PORT)!;

    const client: Client = Client.getInstance();
    client.setCredential({
      username,
      password,
      db: "admin",
      mechanism: "SCRAM-SHA-1",
    });
    await client.connectMongo(host, port, Databases.AUTH);
    console.info(green("successfully connected to mongodb"));

    Deno.env.get(EnvVars.SEED)
      ? seedData(client.getMongoDatabase(Databases.AUTH))
      : console.info(yellow("seed env var not set, data not seeded"));
  } catch (error) {
    console.error(red("startup error :>> "), error);

    throw new Error("throwing startup error for retry");
  }
};

export { startup };
