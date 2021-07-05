import { Bson, green, red } from "../deps.ts";

import { Client } from "./data/client.ts";
import { UserService } from "./data/user-service.ts";
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
    await client.connectMongo(
      Deno.env.get(EnvVars.MONGO_HOST)!,
      +Deno.env.get(EnvVars.MONGO_PORT)!,
      AUTH_DATABASE,
    );
    console.log(green("successfully connected to mongodb"));

    Deno.env.get(EnvVars.SEED) && seedAdminUserData(client);
  } catch (error) {
    console.log(red("startup error :>> "), error);
  }
};

const seedAdminUserData = async (client: Client) => {
  const userService = new UserService(client.getMongoDatabase(AUTH_DATABASE));
  if (await userService.getNumberOfUsers() > 0) return;

  console.log("seeding user data");
  const hashPassword: string = await PasswordManager.toHash(
    Deno.env.get(EnvVars.USER_PASSWORD)!,
  );
  userService.addUser({
    _id: new Bson.ObjectId(Deno.env.get(EnvVars.USER_ID)!),
    email: Deno.env.get(EnvVars.USER_NAME)!,
    password: hashPassword,
  });
  console.log(green("user data seeded successfully"));
};

export { startup };
