import { Collection, Database, Document } from "../../../deps.ts";
import { User } from "../../interfaces/user.interface.ts";
import { Collections } from "../data.enum.ts";
import { PasswordManager } from "../../managers/password.manager.ts";
import { DataService } from "../data.service.interface.ts";

export class UserService implements DataService<User, Document> {
  private users: Collection<User>;

  constructor(database: Database) {
    this.users = database.collection<User>(Collections.USERS);
  }

  async getTotal(): Promise<number> {
    return await this.users.countDocuments();
  }

  async addMany(data: User[]): Promise<void> {
    await this.users.insertMany(data);
  }

  async addOne(data: User): Promise<Document | undefined> {
    data.password = await PasswordManager.toHash(data.password);
    return await this.users.insertOne(data);
  }

  async findById(id: Document): Promise<User | undefined> {
    return await this.users.findOne({ _id: id });
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return await this.users.findOne({ email: email });
  }
}
