import { Database } from "../../deps.ts";

import { mongoClient } from "./client.ts";

class AuthDatabase {
  private static INSTANCE: AuthDatabase;
  private _database: Database;

  private constructor() {
    this._database = mongoClient.database("auth");
  }

  public static getInstance(): AuthDatabase {
    if (!this.INSTANCE) this.INSTANCE = new AuthDatabase();

    return this.INSTANCE;
  }

  public get value(): Database {
    return this._database;
  }
}

export { AuthDatabase };
