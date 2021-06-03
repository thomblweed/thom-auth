import { Context } from "https://deno.land/x/oak@v6.5.0/mod.ts";

const signout = async (ctx: Context) => {
  ctx.cookies.delete("thom-jwt");
  ctx.response.body = {};
};

export { signout };
