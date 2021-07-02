import { Application, Bson, oakCors, red, yellow } from "./deps.ts";
import { Client } from "./src/data/client.ts";
import { Seed } from "./src/data/seed.ts";

import { errorHandler } from "./src/handlers/errors/error-handler.ts";
import router from "./src/router/router.ts";
import PasswordManager from "./src/services/password-manager.ts";

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

const client: Client = Client.getInstance();
try {
  const database = await client.connect("localhost", 27017, "auth");
  console.log(`database`, database.name);

  const seed: Seed = new Seed(client.getClient());
  const hashPassword: string = await PasswordManager.toHash("w^f8vDyv6Fo5");
  seed.seedAdminData([{
    _id: new Bson.ObjectId("7a34386ce0c6d5ac08d85bc4"),
    email: "thomblweed@gmail.com",
    password: hashPassword,
  }]);

  console.log("Listening on port: " + yellow(`${PORT}`));
  await app.listen({ port: PORT });
} catch (error) {
  console.log(red("mongo connection error :>> "), error);
}
