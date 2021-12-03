import {
  ConnectOptions,
  Credential,
  Database,
  MongoClient,
  Server,
} from "../../deps.ts";

class Client {
  private static INSTANCE: Client;
  private mongoClient: MongoClient;
  private credential: Credential | undefined;

  private constructor() {
    this.mongoClient = new MongoClient();
  }

  public static getInstance(): Client {
    if (!this.INSTANCE) this.INSTANCE = new Client();
    return this.INSTANCE;
  }

  async connectMongo(
    host: string,
    port: number,
    database: string,
  ): Promise<Database> {
    const server: Server = {
      host,
      port,
    };
    const options: ConnectOptions = {
      db: database,
      servers: [server],
      ...(this.credential && { credential: this.credential }),
    };
    return await this.mongoClient.connect(options);
  }

  setCredential(credential: Credential): void {
    this.credential = credential;
  }

  getMongoClient(): MongoClient {
    return this.mongoClient;
  }

  getMongoDatabase(name: string): Database {
    return this.mongoClient.database(name);
  }
}

export { Client };
