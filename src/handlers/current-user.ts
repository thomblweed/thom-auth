import { Context } from "https://deno.land/x/oak/mod.ts";

const currentUser = async (ctx: Context) => {
  ctx.response.body = ctx.state;
};

export { currentUser };
