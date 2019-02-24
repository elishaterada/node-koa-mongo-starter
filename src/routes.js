import Router from "koa-router";

import statusRouter from "./status/routes";

const router = new Router();

router.use(statusRouter);

export default router;
