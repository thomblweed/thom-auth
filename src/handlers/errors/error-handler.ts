import { Context } from "https://deno.land/x/oak@v6.5.0/mod.ts";
import { red, yellow } from "https://deno.land/std@0.88.0/fmt/colors.ts";

import { AuthError } from "./abstract/auth-error.ts";

const errorHandler = async (ctx: Context, next: () => Promise<void>) => {
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
