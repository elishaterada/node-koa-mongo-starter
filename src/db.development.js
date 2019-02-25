import mongoose from "mongoose";
import MongoMemoryServer from "mongodb-memory-server";

const mongod = new MongoMemoryServer();
const opts = {
  useNewUrlParser: true
};

const connect = async () => {
  try {
    const uri = await mongod.getConnectionString();
    return mongoose.connect(uri, opts);
  } catch (e) {
    console.error(e);
  }
};

module.exports = connect;
