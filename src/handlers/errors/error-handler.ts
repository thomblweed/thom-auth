import { Context, Middleware, red, State, yellow } from "../../../deps.ts";

import { AuthError } from "./abstract/auth-error.ts";

const errorHandler: Middleware<State, Context<State, Record<string, any>>> =
  async (ctx: Context, next: () => Promise<unknown>) => {
    try {
      await next();
    } catch (error) {
      console.log(red("error :>> "), yellow(`${error}`));

      if (error instanceof AuthError) {
        ctx.response.status = error.statusCode;
        ctx.response.body = error.mapErrors();
        return;
      }

      ctx.response.status = 500;
      ctx.response.body = {
        errors: [
          {
            message: "There has been an internal auth server error",
          },
        ],
      };
    }
  };

export { errorHandler };
