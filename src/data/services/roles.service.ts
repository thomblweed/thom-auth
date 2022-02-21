import { Collection, Database, Document } from "../../../deps.ts";
import { Role, RoleName } from "../../interfaces/role.interface.ts";
import { Collections } from "../data.enum.ts";
import { DataService } from "../data.service.abstract.ts";

export class RolesService implements DataService<Role, Document> {
  private roles: Collection<Role>;

  constructor(database: Database) {
    this.roles = database.collection<Role>(Collections.ROLES);
  }

  async getTotal(): Promise<number> {
    return await this.roles.countDocuments();
  }

  async addMany(data: Role[]): Promise<void> {
    await this.roles.insertMany(data);
  }

  async addOne(data: Role): Promise<Document | undefined> {
    return await this.roles.insertOne(data);
  }

  async findById(id: Document): Promise<Role | undefined> {
    return await this.roles.findOne({ _id: id });
  }

  async findByName(name: RoleName): Promise<Role | undefined> {
    return await this.roles.findOne({ name });
  }
}
