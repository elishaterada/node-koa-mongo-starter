import Koa from "koa";
import koaBody from "koa-body";
import cors from "@koa/cors";
import json from "koa-json";
import passport from "koa-passport";

import routes from "./routes";

const app = new Koa();

const port = process.env.PORT || 3001;

app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get("X-Response-Time");
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

app.use(cors());
app.use(json());

require("./passport");
app.use(passport.initialize());

app.use(koaBody());
app.use(routes.routes());
app.use(routes.allowedMethods());

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set("X-Response-Time", `${ms}ms`);
});

export const start = async () => {
  let connect;
  if (process.env.NODE_ENV === "production") {
    connect = require("./db");
  } else if (process.env.NODE_ENV === "development") {
    connect = require("./db.development");
  }

  try {
    await connect();
    app.listen(port, () => {
      console.log(`REST API on http://localhost:${port}`);
    });
  } catch (e) {
    console.error(e);
  }
};
