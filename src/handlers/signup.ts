import { BodyJson, Context } from "../../deps.ts";

import { UserService } from "../data/user-service.ts";
import { IUser, IUserDTO } from "../interfaces/user.ts";
import { BadRequestError } from "./errors/bad-request-error.ts";
import { TokenManager } from "../services/token-manager.ts";
import { Client } from "../data/client.ts";
import { AUTH_DATABASE } from "../services/consts.ts";

const signup = async (ctx: Context) => {
  const body: BodyJson = ctx.request.body({ type: "json" });
  const requestedUser: IUser = await body.value;

  const authDatabase = Client.getInstance().getMongoDatabase(AUTH_DATABASE);
  const userService = new UserService(authDatabase);

  const existingUser: IUser | undefined = await userService
    .findUserByEmail(requestedUser.email);
  if (existingUser) {
    throw new BadRequestError(`email ${requestedUser.email} already in use`);
  }

  const newUser: IUser | undefined = await userService.addUser(requestedUser);
  if (!newUser) {
    throw new Error(
      `Error creating new user with email :>> ${requestedUser.email}`,
    );
  }

  const newUserDTO: IUserDTO = { id: newUser._id, email: newUser.email };
  const token: string = await TokenManager.createTokenForUserDTO(newUserDTO);

  //TODO: make this cookie secure when over https
  ctx.cookies.set("thom-jwt", token);

  ctx.response.status = 201;
  ctx.response.body = newUserDTO;
};

export { signup };
