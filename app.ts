import { Application, oakCors, yellow } from "./deps.ts";
import { EnvVars } from "./src/enums/env-vars.enum.ts";

import { errorHandler } from "./src/handlers/errors/error-handler.ts";
import router from "./src/router/router.ts";
import { startup } from "./src/startup.ts";
import { validate } from "./src/validation/validate.ts";

const app: Application = new Application();
const PORT = 3001;

validate();

app.use(
  oakCors({
    origin: Deno.env.get(EnvVars.CORS_ORIGIN) ?? "*",
    credentials: true,
  }),
);
app.use(errorHandler);
app.use(router.routes());
app.use(router.allowedMethods());

startup();

console.log("Listening on port: " + yellow(`${PORT}`));
await app.listen({ port: PORT });
