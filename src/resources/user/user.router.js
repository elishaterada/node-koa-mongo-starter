import Router from "koa-router";
import passport from "koa-passport";

import { getMe } from "./user.controllers";

const router = new Router();

router.get("/me", passport.authenticate("jwt", { session: false }), getMe);

export default router.routes();
