import { Application } from "https://deno.land/x/oak@v6.5.0/mod.ts";
import { oakCors } from "https://deno.land/x/cors@v1.2.1/mod.ts";
import { yellow } from "https://deno.land/std@0.88.0/fmt/colors.ts";

import { errorHandler } from "./src/handlers/errors/error-handler.ts";
import router from "./src/router/router.ts";

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

console.log("Listening on port: " + yellow(`${PORT}`));
await app.listen({ port: PORT });
