import { EnvVars } from "./consts.ts";
import { Application, Bson, oakCors, red, yellow } from "./deps.ts";
import { Client } from "./src/data/client.ts";
import { Seed } from "./src/data/seed.ts";

import { errorHandler } from "./src/handlers/errors/error-handler.ts";
import router from "./src/router/router.ts";
import PasswordManager from "./src/services/password-manager.ts";
import {
  validateEnvironmentVariables,
  ValidationMessage,
} from "./src/services/validate-environment.ts";

const app: Application = new Application();
const PORT: number = 3001;

app.use(
  oakCors({
    origin: "http://localhost:1234",
    credentials: true,
  }),
);
app.use(errorHandler);
app.use(router.routes());
app.use(router.allowedMethods());

try {
  const validationMessages: ValidationMessage[] = validateEnvironmentVariables(
    Deno.env.toObject(),
  );
  if (validationMessages.length > 0) {
    throw new Error(validationMessages.toString());
  }

  const client: Client = Client.getInstance();
  await client.connect("localhost", +Deno.env.get(EnvVars.MONGO_PORT)!, "auth");

  const seed: Seed = new Seed(client.getClient());
  const hashPassword: string = await PasswordManager.toHash(
    Deno.env.get(EnvVars.USER_PASSWORD)!,
  );
  seed.seedAdminData([{
    _id: new Bson.ObjectId(Deno.env.get(EnvVars.USER_ID)!),
    email: Deno.env.get(EnvVars.USER_NAME)!,
    password: hashPassword,
  }]);

  console.log("Listening on port: " + yellow(`${PORT}`));
  await app.listen({ port: PORT });
} catch (error) {
  console.log(red("mongo connection error :>> "), error);
}
