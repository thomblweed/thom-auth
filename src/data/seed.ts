import { Collection, Database, MongoClient } from "../../deps.ts";

import { IUser } from "../interfaces/user.ts";
import { UserService } from "./user-service.ts";

class Seed {
  private _database: Database;
  private _userService: UserService;

  constructor(mongoClient: MongoClient) {
    this._database = mongoClient.database("auth");
    this._userService = new UserService(this._database);
  }

  async seedAdminData(users: IUser[]): Promise<void> {
    const numberUsers: number = await this._userService.getNumberOfUsers();
    if (numberUsers > 0) return;

    await this._userService.addUsers(users);
  }
}

export { Seed };
