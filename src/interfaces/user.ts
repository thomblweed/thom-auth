import { Document } from "https://deno.land/x/mongo@v0.21.2/src/types.ts";

interface IUser {
  _id: Document;
  email: string;
  password: string;
}

interface IUserDTO {
  id: Document;
  email: string;
}

export type { IUser, IUserDTO };
