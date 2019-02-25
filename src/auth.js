import jwt from "jsonwebtoken";

import { User } from "./resources/user/user.model";

const newToken = user =>
  jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: 30
  });

const register = async ctx => {
  const { email, password } = ctx.request.body;

  if (!email || !password) {
    ctx.status = 400;
    ctx.body = { message: "Email and password are required" };
    return;
  }

  try {
    const user = await User.findOne({ email });

    if (user) {
      ctx.status = 400;
      ctx.body = { message: "User already exists" };
      return;
    }
  } catch (e) {
    ctx.status = 500;
  }

  try {
    const user = await User.create({
      email,
      password
    });

    const token = newToken(user);
    ctx.status = 201;
    ctx.body = { token };
  } catch (e) {
    console.error(e);
    ctx.status = 500;
  }
};

const login = async ctx => {
  const { email, password } = ctx.request.body;

  if (!email || !password) {
    ctx.status = 400;
    ctx.body = { message: "Email and password are required" };
    return;
  }

  const invalidMessage = { message: "Invalid email or password" };

  try {
    const user = await User.findOne({ email })
      .select("email password")
      .exec();

    if (!user) {
      ctx.status = 401;
      ctx.body = invalidMessage;
      return;
    }

    const match = await user.checkPassword(password);

    if (!match) {
      ctx.status = 401;
      ctx.body = invalidMessage;
      return;
    }

    const token = newToken(user);

    ctx.status = 201;
    ctx.body = { token };
  } catch (e) {
    console.error(e);
    ctx.status = 500;
  }
};

export { register, login };
