import { create, Payload, verify } from "../../deps.ts";
import { EnvVars } from "../enums/env-vars.enum.ts";
import { UserDTO } from "../interfaces/user-dto.interface.ts";

export class TokenManager {
  private static _instance: TokenManager | undefined;
  private _key: CryptoKey;

  private constructor(key: CryptoKey) {
    this._key = key;
  }

  static async getInstanceAsync(): Promise<TokenManager> {
    if (this._instance) {
      return this._instance;
    }
    const key = await this.getTokenAsync(Deno.env.get(EnvVars.JWT_KEY)!);
    return new TokenManager(key);
  }

  async createTokenForUserDTO(userDTO: UserDTO): Promise<string> {
    const payload: Payload = { iss: JSON.stringify(userDTO) };

    return await create(
      { alg: "HS512", typ: "JWT" },
      payload,
      this._key,
    );
  }

  async verifyToken(jwt: string): Promise<Payload> {
    return await verify(jwt, this._key);
  }

  private static async getTokenAsync(secret: string): Promise<CryptoKey> {
    const encoder = new TextEncoder();
    const keyBuf = encoder.encode(secret);
    return await crypto.subtle.importKey(
      "raw",
      keyBuf,
      { name: "HMAC", hash: "SHA-512" },
      true,
      ["sign", "verify"],
    );
  }
}
