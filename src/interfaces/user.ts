import { Document } from "../../deps.ts";

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
