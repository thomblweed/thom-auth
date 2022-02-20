import { Bson, green, red, yellow } from "../deps.ts";

import { Client } from "./data/client.ts";
import { UserService } from "./data/user-service.ts";
import { AUTH_DATABASE, EnvVars } from "./services/consts.ts";
import {
  validateEnvironmentVariables,
  ValidationMessage,
} from "./services/validate-environment.ts";

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
    await client.connectMongo(host, port, AUTH_DATABASE);
    console.log(green("successfully connected to mongodb"));

    Deno.env.get(EnvVars.SEED)
      ? seedAdminUserData(client)
      : console.log(yellow("seed env var not set, data not seeded"));
  } catch (error) {
    console.log(red("startup error :>> "), error);

    throw new Error("throwing startup error for retry");
  }
};

const seedAdminUserData = async (client: Client) => {
  const userService = new UserService(client.getMongoDatabase(AUTH_DATABASE));
  if ((await userService.getNumberOfUsers()) > 0) return;

  console.log(yellow("seeding user data"));
  await userService.addUser({
    _id: new Bson.ObjectId(Deno.env.get(EnvVars.USER_ID)!),
    email: Deno.env.get(EnvVars.USER_NAME)!,
    password: Deno.env.get(EnvVars.USER_PASSWORD)!,
  });
  console.log(green("user data seeded successfully"));
};

export { startup };
