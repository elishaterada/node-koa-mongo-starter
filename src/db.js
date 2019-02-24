import mongoose from "mongoose";
import MongoMemoryServer from "mongodb-memory-server";

const mongod = new MongoMemoryServer({ debug: true });
const opts = {};

const connect = async () => {
  try {
    const uri = await mongod.getConnectionString();
    return mongoose.connect(uri, opts);
  } catch (e) {
    console.error(e);
  }
};

export { connect };
