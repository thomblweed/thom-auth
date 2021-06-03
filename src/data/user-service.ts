import { Collection, Database, Document } from "../../deps.ts";

import { IUser } from "../interfaces/user.ts";
import PasswordManager from "../services/password-manager.ts";

class UserService {
  private users: Collection<IUser>;

  constructor(database: Database) {
    this.users = database.collection<IUser>("users");
  }

  async findUserByEmail(email: string): Promise<IUser | undefined> {
    return await this.users.findOne({ email: email });
  }

  async findUserById(id: Document): Promise<IUser | undefined> {
    return await this.users.findOne({ _id: id });
  }

  async addUser(user: IUser): Promise<IUser | undefined> {
    user.password = await PasswordManager.toHash(user.password);
    const userDocument: Document = await this.users.insertOne(user);

    return await this.users.findOne({ _id: userDocument });
  }
}

export { UserService };
