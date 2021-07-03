import { Bson, red } from "../deps.ts";

import { Client } from "./data/client.ts";
import { Seed } from "./data/seed.ts";
import { AUTH_DATABASE, EnvVars } from "./services/consts.ts";
import PasswordManager from "./services/password-manager.ts";
import {
  validateEnvironmentVariables,
  ValidationMessage,
} from "./services/validate-environment.ts";

const startup = async () => {
  try {
    const validationMessages: ValidationMessage[] =
      validateEnvironmentVariables(
        Deno.env.toObject(),
      );
    if (validationMessages.length > 0) {
      throw new Error(validationMessages.toString());
    }

    const client: Client = Client.getInstance();
    await client.connect(
      Deno.env.get(EnvVars.MONGO_HOST)!,
      +Deno.env.get(EnvVars.MONGO_PORT)!,
      AUTH_DATABASE,
    );

    const seed: Seed = new Seed(client.getClient());
    const hashPassword: string = await PasswordManager.toHash(
      Deno.env.get(EnvVars.USER_PASSWORD)!,
    );
    seed.seedAdminData([{
      _id: new Bson.ObjectId(Deno.env.get(EnvVars.USER_ID)!),
      email: Deno.env.get(EnvVars.USER_NAME)!,
      password: hashPassword,
    }]);
  } catch (error) {
    console.log(red("startup error :>> "), error);
  }
};

export { startup };
