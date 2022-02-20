import { Bson, Database, green, yellow } from "../../../deps.ts";
import { EnvVars } from "../../enums/env-vars.enum.ts";
import { RolesService } from "./roles.service.ts";
import { UserService } from "./user.service.ts";

const seedAdminUserData = async (userService: UserService) => {
  if ((await userService.getNumberOfUsers()) > 0) return;

  console.log(yellow("seeding user data"));
  await userService.addUser({
    _id: new Bson.ObjectId(Deno.env.get(EnvVars.USER_ID)!),
    email: Deno.env.get(EnvVars.USER_NAME)!,
    password: Deno.env.get(EnvVars.USER_PASSWORD)!,
  });
  console.log(green("user data seeded successfully"));
};

const seedRolesData = async (rolesService: RolesService) => {
  if ((await rolesService.getNumberOfRoles()) > 0) return;

  console.log(yellow("seeding roles data"));
  await rolesService.addRoles([
    {
      _id: new Bson.ObjectId(Deno.env.get(EnvVars.ADMIN_ROLE_ID)!),
      name: "admin",
    },
    {
      _id: new Bson.ObjectId(Deno.env.get(EnvVars.USER_ROLE_ID)!),
      name: "user",
    },
  ]);
  console.log(green("roles data seeded successfully"));
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
