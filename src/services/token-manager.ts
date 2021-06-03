import { create, Payload, verify } from "../../deps.ts";

import { IUserDTO } from "../interfaces/user.ts";

class TokenManager {
  static async createTokenForUserDTO(userDTO: IUserDTO): Promise<string> {
    const payload: Payload = { iss: JSON.stringify(userDTO) };

    return await create(
      { alg: "HS512", typ: "JWT" },
      payload,
      Deno.env.get("JWT_KEY")!,
    );
  }

  static async verifyToken(jwt: string): Promise<Payload> {
    return await verify(jwt, Deno.env.get("JWT_KEY")!, "HS512");
  }
}

export { TokenManager };
