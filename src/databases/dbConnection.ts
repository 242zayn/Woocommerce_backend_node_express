import mongoose from "mongoose";

import { config } from "../config/config";

const connectDb = async () => {
  const OPTION_DB = {
    dbName: config.db_name,
  };
  try {
    mongoose.connection.on("connected", () => {
      console.log("Sucessfully conneted with database");
    });
    mongoose.connection.on("err", (error) => {
      console.log("Error with connection with database", error);
    });
    await mongoose.connect(config.databaseUrl as string, OPTION_DB);
  } catch (error) {
    console.log("Fail to connect with databasee" + error);
    process.exit(1);
  }
};

export default connectDb;
