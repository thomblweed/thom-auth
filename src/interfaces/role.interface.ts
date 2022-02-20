import { Document } from "../../deps.ts";

export type RoleName = "admin" | "user";

export interface Role {
  _id: Document;
  name: RoleName;
}
