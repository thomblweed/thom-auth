import { Context } from "../../deps.ts";

const currentUser = (ctx: Context) => {
  ctx.response.body = ctx.state;
};

export { currentUser };
