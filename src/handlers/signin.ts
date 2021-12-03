import { BodyJson, Context } from "../../deps.ts";

import { Client } from "../data/client.ts";
import { UserService } from "../data/user-service.ts";
import { IUser, IUserDTO } from "../interfaces/user.ts";
import { AUTH_DATABASE } from "../services/consts.ts";
import PasswordManager from "../services/password-manager.ts";
import { TokenManager } from "../services/token-manager.ts";
import { BadRequestError } from "./errors/bad-request-error.ts";

const signin = async (ctx: Context) => {
  const body: BodyJson = ctx.request.body({ type: "json" });
  const user: IUser = await body.value;

  const authDatabase = Client.getInstance().getMongoDatabase(AUTH_DATABASE);
  const userService = new UserService(authDatabase);

  const existingUser: IUser | undefined = await userService
    .findUserByEmail(user.email);
  if (!existingUser) {
    throw new BadRequestError(
      `User with email '${user.email}' does not exist`,
    );
  }

  const passwordsMatch: boolean = await PasswordManager.compare(
    existingUser.password,
    user.password,
  );
  if (!passwordsMatch) {
    throw new BadRequestError(
      `Invalid Password provided`,
    );
  }

  const existingUserDTO: IUserDTO = {
    id: existingUser._id,
    email: existingUser.email,
  };
  const tokenmanager = await TokenManager.getInstanceAsync();
  const token: string = await tokenmanager.createTokenForUserDTO(
    existingUserDTO,
  );

  //TODO: make this cookie secure when over https
  ctx.cookies.set("thom-jwt", token);

  ctx.response.status = 200;
  ctx.response.body = existingUserDTO;
};

export { signin };
