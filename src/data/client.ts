import "https://deno.land/x/dotenv/load.ts";
import { MongoClient } from "https://deno.land/x/mongo@v0.21.2/src/client.ts";
import { green, red } from "https://deno.land/std@0.88.0/fmt/colors.ts";
import { Bson } from "https://deno.land/x/mongo@v0.21.2/deps.ts";
// import { ConnectOptions } from "https://deno.land/x/mongo@v0.21.2/src/types.ts";

import { Seed } from "./seed.ts";
import PasswordManager from "../services/password-manager.ts";

const env = Deno.env.toObject();

const mongoUri: string | undefined = env.MONGO_URI;
const mongoPort: number | undefined = +env.MONGO_PORT;
const jwtKey: string | undefined = env.JWT_KEY;
const userId: string | undefined = env.USER_ID;
const userName: string | undefined = env.USER_NAME;
const userPassword: string | undefined = env.USER_PASSWORD;

if (!mongoUri) throw new Error("MONGO_URI is not defined");
if (!mongoPort) throw new Error("MONGO_PORT is not defined");
if (!jwtKey) throw new Error("JWT_KEY is not defined");
if (!userId) throw new Error("USER_ID is not defined");
if (!userName) throw new Error("USER_NAME is not defined");
if (!userPassword) throw new Error("USER_PASSWORD is not defined");

const mongoClient: MongoClient = new MongoClient();

try {
  // const options: ConnectOptions = {
  //   servers: [{
  //     host: mongoUri,
  //     port: mongoPort,
  //   }],
  //   db: "auth",
  // };
  await mongoClient.connect(`${mongoUri}:${mongoPort}`);
  console.log(
    "connected to boda-auth mongoDb at :>>",
    green(`${mongoUri}:${mongoPort}`),
  );

  const seed: Seed = new Seed(mongoClient);
  const hashPassword: string = await PasswordManager.toHash(userPassword);
  seed.seedAdminData([{
    _id: new Bson.ObjectId(userId),
    email: userName,
    password: hashPassword,
  }]);
} catch (error) {
  console.log(red("mongo connection error :>> "), error);
}

export { mongoClient };
