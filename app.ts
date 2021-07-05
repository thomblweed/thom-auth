import { Application, oakCors, yellow } from "./deps.ts";

import { errorHandler } from "./src/handlers/errors/error-handler.ts";
import router from "./src/router/router.ts";
import { startup } from "./src/startup.ts";

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

startup();

console.log("Listening on port: " + yellow(`${PORT}`));
await app.listen({ port: PORT });
