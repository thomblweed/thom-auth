import { Collection, Database, MongoClient } from "../../deps.ts";

import { IUser } from "../interfaces/user.ts";

class Seed {
  private _database: Database;

  constructor(mongoClient: MongoClient) {
    this._database = mongoClient.database("auth");
  }

  async seedAdminData(users: IUser[]): Promise<void> {
    const usersCollection: Collection<IUser> = this._database.collection<IUser>(
      "users",
    );
    const numberUsers: number = await usersCollection.count();
    if (numberUsers > 0) {
      return;
    }

    await usersCollection.insertMany(users);
  }
}

export { Seed };
