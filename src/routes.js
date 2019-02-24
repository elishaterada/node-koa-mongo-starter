import Router from "koa-router";

import statusRouter from "./status/status.router";
import userRouter from "./user/user.router";

const router = new Router();

router.use(statusRouter);
router.use(userRouter);

export default router;
