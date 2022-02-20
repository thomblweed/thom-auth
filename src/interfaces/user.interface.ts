import { Document } from "../../deps.ts";

export interface User {
  _id: Document;
  email: string;
  password: string;
}
