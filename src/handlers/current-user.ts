import { Context } from "../../deps.ts";

const currentUser = async (ctx: Context) => {
  ctx.response.body = ctx.state;
};

export { currentUser };
