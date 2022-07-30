import { Bson, Database, green, yellow } from "../../../deps.ts";
import { EnvVars } from "../../enums/env-vars.enum.ts";
import { UserService } from "./user.service.ts";

const seedAdminUserData = async (userService: UserService) => {
  if ((await userService.getTotal()) > 0) return;

  console.info(yellow("seeding user data"));
  await userService.addOne({
    _id: new Bson.ObjectId(Deno.env.get(EnvVars.USER_ID)!),
    username: Deno.env.get(EnvVars.USER_NAME)!,
    password: Deno.env.get(EnvVars.USER_PASSWORD)!,
    role: "admin",
  });
  console.info(green("user data seeded successfully"));
};

const seedData = async (authDatabase: Database) => {
  await seedAdminUserData(
    new UserService(authDatabase),
  );
};

export { seedData };
