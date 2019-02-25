import { User } from "./user.model";

const getMe = async ctx => {
  if (!ctx.state.user) {
    ctx.status = 400;
    return;
  }

  try {
    const user = await User.findById(ctx.state.user.id)
      .lean()
      .exec();

    ctx.body = {
      id: user._id,
      email: user.email
    };
    ctx.status = 200;
  } catch (e) {
    console.error(e);
    ctx.status = 404;
  }
};

export { getMe };
