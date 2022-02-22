import { Document } from "../../deps.ts";
import { RoleName } from "./role.interface.ts";

export interface User {
  _id: Document;
  email: string;
  password: string;
  role: RoleName;
}
