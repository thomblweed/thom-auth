import { Router } from "../../deps.ts";

import { signup } from "../handlers/signup.ts";
import { signin } from "../handlers/signin.ts";
import { signout } from "../handlers/signout.ts";
import { verifyUser } from "../middleware/verify-user.ts";
import { currentUser } from "../handlers/current-user.ts";

const router = new Router();
router.prefix("/api/users");

router
  .post("/signup", signup)
  .post("/signin", signin)
  .post("/signout", signout)
  .get("/currentuser", verifyUser, currentUser);

export default router;
