import { MongoClient } from "https://deno.land/x/mongo@v0.21.2/src/client.ts";
import { Database } from "https://deno.land/x/mongo@v0.21.2/src/database.ts";
import { Collection } from "https://deno.land/x/mongo@v0.21.2/src/collection/collection.ts";

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
