import { Document } from "../../deps.ts";
import { RoleName } from "./role.interface.ts";

export interface UserDTO {
  id: Document;
  email: string;
  role: RoleName;
}
