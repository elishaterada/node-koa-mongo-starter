import Router from "koa-router";

const router = new Router();

router.get("/status", ctx => {
  ctx.body = { message: "success" };
  ctx.status = 200;
});

export default router.routes();
