import { Context } from "../../deps.ts";

const signout = (ctx: Context) => {
  ctx.cookies.delete("thom-jwt");
  ctx.response.body = {};
};

export { signout };
