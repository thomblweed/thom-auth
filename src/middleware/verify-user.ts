import { Context, Middleware, Payload, State } from "../../deps.ts";

import { UserDTO } from "../interfaces/user-dto.interface.ts";
import { TokenManager } from "../managers/token.manager.ts";
import { NotAuthorisedError } from "../handlers/errors/not-authorised-error.ts";

const verifyUser: Middleware<State, Context<State, Record<string, unknown>>> =
  async (ctx: Context, next: () => Promise<unknown>) => {
    const jwt: string | undefined = await ctx.cookies.get("thom-jwt");
    if (!jwt) throw new NotAuthorisedError();

    let payload: Payload;
    try {
      const tokenManager = await TokenManager.getInstanceAsync();
      payload = await tokenManager.verifyToken(jwt);
    } catch (_error) {
      ctx.cookies.delete("thom-jwt");
      throw new NotAuthorisedError();
    }

    const user: UserDTO = await JSON.parse(payload.iss!);
    ctx.state = user;

    await next();
  };

export { verifyUser };
