import { Collection, Database } from "../../../deps.ts";
import { Role, RoleName } from "../../interfaces/role.interface.ts";
import { Collections } from "../data.enum.ts";

export class RolesService {
  private roles: Collection<Role>;

  constructor(database: Database) {
    this.roles = database.collection<Role>(Collections.ROLES);
  }

  async findUserByName(name: RoleName): Promise<Role | undefined> {
    return await this.roles.findOne({ name });
  }

  async addRoles(roles: Role[]): Promise<void> {
    await this.roles.insertMany(roles);
  }

  async getNumberOfRoles(): Promise<number> {
    return await this.roles.countDocuments();
  }
}
