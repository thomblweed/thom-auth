import { BodyJson, Context, Document } from "../../deps.ts";

import { BadRequestError } from "./errors/bad-request-error.ts";
import { Client } from "../data/client.ts";
import { User } from "../interfaces/user.interface.ts";
import { UserService } from "../data/services/user.service.ts";
import { UserDTO } from "../interfaces/user-dto.interface.ts";
import { TokenManager } from "../managers/token.manager.ts";
import { Databases } from "../data/data.enum.ts";

const signup = async (ctx: Context) => {
  const body: BodyJson = ctx.request.body({ type: "json" });
  const requestedUser: User = await body.value;

  const authDatabase = Client.getInstance().getMongoDatabase(Databases.AUTH);
  const userService = new UserService(authDatabase);

  const existingUser: User | undefined = await userService
    .findByEmail(requestedUser.email);
  if (existingUser) {
    throw new BadRequestError(`email ${requestedUser.email} already in use`);
  }

  const userId: Document | undefined = await userService.addOne(requestedUser);
  if (!userId) {
    throw new Error(
      `Error creating new user with email :>> ${requestedUser.email}`,
    );
  }
  const newUser: User | undefined = await userService.findById(userId);
  if (!newUser) {
    throw new Error(
      `Error creating new user with email :>> ${requestedUser.email}`,
    );
  }

  const newUserDTO: UserDTO = { id: newUser._id, email: newUser.email };
  const tokenManager = await TokenManager.getInstanceAsync();
  const token: string = await tokenManager.createTokenForUserDTO(newUserDTO);

  //TODO: make this cookie secure when over https
  ctx.cookies.set("thom-jwt", token);

  ctx.response.status = 201;
  ctx.response.body = newUserDTO;
};

export { signup };
