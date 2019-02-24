import Router from "koa-router";

import { getOne, createOne } from "./user.controllers";

const router = new Router();

router.get("/users/:id", getOne);
router.post("/users", createOne);

export default router.routes();
