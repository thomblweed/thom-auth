import { Bson, Database, green, yellow } from "../../../deps.ts";
import { EnvVars } from "../../enums/env-vars.enum.ts";
import { RolesService } from "./roles.service.ts";
import { UserService } from "./user.service.ts";

const seedAdminUserData = async (userService: UserService) => {
  if ((await userService.getTotal()) > 0) return;

  console.info(yellow("seeding user data"));
  await userService.addOne({
    _id: new Bson.ObjectId(Deno.env.get(EnvVars.USER_ID)!),
    email: Deno.env.get(EnvVars.USER_NAME)!,
    password: Deno.env.get(EnvVars.USER_PASSWORD)!,
  });
  console.info(green("user data seeded successfully"));
};

const seedRolesData = async (rolesService: RolesService) => {
  if ((await rolesService.getTotal()) > 0) return;

  console.info(yellow("seeding roles data"));
  await rolesService.addMany([
    {
      _id: new Bson.ObjectId(Deno.env.get(EnvVars.ADMIN_ROLE_ID)!),
      name: "admin",
    },
    {
      _id: new Bson.ObjectId(Deno.env.get(EnvVars.USER_ROLE_ID)!),
      name: "user",
    },
  ]);
  console.info(green("roles data seeded successfully"));
};

const seedData = async (authDatabase: Database) => {
  await seedAdminUserData(
    new UserService(authDatabase),
  );
  await seedRolesData(
    new RolesService(authDatabase),
  );
};

export { seedData };
