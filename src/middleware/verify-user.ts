import { Context, Payload } from "../../deps.ts";

import { IUserDTO } from "../interfaces/user.ts";
import { TokenManager } from "../services/token-manager.ts";
import { NotAuthorisedError } from "../handlers/errors/not-authorised-error.ts";

const verifyUser = async (ctx: Context, next: () => Promise<void>) => {
  const jwt: string | undefined = ctx.cookies.get("thom-jwt");
  if (!jwt) throw new NotAuthorisedError();

  let payload: Payload;
  try {
    payload = await TokenManager.verifyToken(jwt);
  } catch (error: any) {
    ctx.cookies.delete("thom-jwt");
    throw new NotAuthorisedError();
  }

  const user: IUserDTO = await JSON.parse(payload.iss!);
  ctx.state = user;

  await next();
};

export { verifyUser };
