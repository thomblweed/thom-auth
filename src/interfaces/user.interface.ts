import { Document } from "../../deps.ts";
import { RoleName } from "./role.interface.ts";

export interface User {
  _id: Document;
  username: string;
  password: string;
  role: RoleName;
}
