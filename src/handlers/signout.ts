import { Context } from "https://deno.land/x/oak/mod.ts";

const signout = async (ctx: Context) => {
  ctx.cookies.delete("thom-jwt");
  ctx.response.body = {};
};

export { signout };
