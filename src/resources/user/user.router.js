import Router from "koa-router";
import passport from "koa-passport";

import { deleteMe, getMe } from "./user.controllers";

const router = new Router();

router.get("/me", passport.authenticate("jwt", { session: false }), getMe);
router.delete(
  "/me",
  passport.authenticate("jwt", { session: false }),
  deleteMe
);

export default router.routes();
