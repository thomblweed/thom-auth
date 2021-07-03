import { ConnectOptions, Database, MongoClient, Server } from "../../deps.ts";

class Client {
  private static INSTANCE: Client;
  private mongoClient: MongoClient;

  private constructor() {
    this.mongoClient = new MongoClient();
  }

  public static getInstance(): Client {
    if (!this.INSTANCE) this.INSTANCE = new Client();
    return this.INSTANCE;
  }

  async connect(
    host: string,
    port: number,
    database: string,
  ): Promise<Database> {
    const server: Server = {
      host: host,
      port: port,
    };
    const options: ConnectOptions = {
      db: database,
      servers: [server],
    };
    return await this.mongoClient.connect(options);
  }

  getClient(): MongoClient {
    return this.mongoClient;
  }

  getDatabase(name: string): Database {
    return this.mongoClient.database(name);
  }
}

export { Client };
