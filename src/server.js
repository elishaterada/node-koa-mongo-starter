import Koa from "koa";
import bodyParser from "koa-bodyparser";
import cors from "@koa/cors";
import json from "koa-json";
import passport from "koa-passport";

import { connect } from "./db";
import routes from "./routes";

const app = new Koa();

const port = 3001;

app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get("X-Response-Time");
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

app.use(cors());
app.use(bodyParser());
app.use(json());

require("./passport");
app.use(passport.initialize());

app.use(routes.routes());
app.use(routes.allowedMethods());

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set("X-Response-Time", `${ms}ms`);
});

export const start = async () => {
  try {
    await connect();
    app.listen(port, () => {
      console.log(`REST API on http://localhost:${port}`);
    });
  } catch (e) {
    console.error(e);
  }
};
