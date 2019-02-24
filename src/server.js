import Koa from "koa";
const app = new Koa();

const port = 3001;

app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get("X-Response-Time");
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set("X-Response-Time", `${ms}ms`);
});

app.use(async ctx => {
  ctx.body = "Hello World";
});

export const start = async () => {
  try {
    app.listen(port, () => {
      console.log(`REST API on http://localhost:${port}`);
    });
  } catch (e) {
    console.error(e);
  }
};
