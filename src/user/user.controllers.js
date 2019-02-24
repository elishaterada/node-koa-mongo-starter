import { User } from "./user.model";

const getOne = async ctx => {
  const { id } = ctx.params;

  if (!id) {
    ctx.status = 400;
    return;
  }

  try {
    const doc = await User.findOne({ _id: id })
      .lean()
      .exec();

    ctx.body = doc;
    ctx.status = 200;
  } catch (e) {
    console.error(e);
    ctx.status = 404;
  }
};

const createOne = async ctx => {
  try {
    const doc = await User.create({
      ...ctx.request.body
    });
    ctx.body = { doc };
  } catch (e) {
    console.error(e);
    ctx.status = 400;
  }
};

export { getOne, createOne };
