import { BodyJson, Context } from "../../deps.ts";

import { Client } from "../data/client.ts";
import { Databases } from "../data/data.enum.ts";
import { UserService } from "../data/services/user.service.ts";
import { UserDTO } from "../interfaces/user-dto.interface.ts";
import { User } from "../interfaces/user.interface.ts";
import { PasswordManager } from "../managers/password.manager.ts";
import { TokenManager } from "../managers/token.manager.ts";
import { BadRequestError } from "./errors/bad-request-error.ts";

const signin = async (ctx: Context) => {
  const body: BodyJson = ctx.request.body({ type: "json" });
  const user: User = await body.value;

  const authDatabase = Client.getInstance().getMongoDatabase(Databases.AUTH);
  const userService = new UserService(authDatabase);

  const existingUser: User | undefined = await userService
    .findByEmail(user.email);
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

  const existingUserDTO: UserDTO = {
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
