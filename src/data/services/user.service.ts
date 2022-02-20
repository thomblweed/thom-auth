import { Collection, Database, Document } from "../../../deps.ts";
import { User } from "../../interfaces/user.interface.ts";
import { Collections } from "../data.enum.ts";
import { PasswordManager } from "../../managers/password.manager.ts";

export class UserService {
  private users: Collection<User>;

  constructor(database: Database) {
    this.users = database.collection<User>(Collections.USERS);
  }

  async findUserByEmail(email: string): Promise<User | undefined> {
    return await this.users.findOne({ email: email });
  }

  async findUserById(id: Document): Promise<User | undefined> {
    return await this.users.findOne({ _id: id });
  }

  async addUser(user: User): Promise<User | undefined> {
    user.password = await PasswordManager.toHash(user.password);
    const userDocument: Document = await this.users.insertOne(user);

    return await this.users.findOne({ _id: userDocument });
  }

  async addUsers(users: User[]): Promise<void> {
    await this.users.insertMany(users);
  }

  async getNumberOfUsers(): Promise<number> {
    return await this.users.countDocuments();
  }
}
