import mongoose from "mongoose";

const opts = {
  useNewUrlParser: true
};

const connect = async () => {
  try {
    return mongoose.connect(process.env.MONGODB_URI, opts);
  } catch (e) {
    console.error(e);
  }
};

module.exports = connect;
