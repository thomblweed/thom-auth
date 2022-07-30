import { Document } from "../../deps.ts";
import { RoleName } from "./role.interface.ts";

export interface UserDTO {
  id: Document;
  username: string;
  role: RoleName;
}
