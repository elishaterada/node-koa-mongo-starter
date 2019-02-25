import Router from "koa-router";

import { register, login } from "./auth";
import statusRouter from "./resources/status/status.router";
import userRouter from "./resources/user/user.router";

const router = new Router();

router.use(statusRouter);
router.use(userRouter);
router.post("/auth/register", register);
router.post("/auth/login", login);

export default router;
