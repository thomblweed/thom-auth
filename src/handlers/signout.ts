import { Context } from "../../deps.ts";

const signout = async (ctx: Context) => {
  ctx.cookies.delete("thom-jwt");
  ctx.response.body = {};
};

export { signout };
