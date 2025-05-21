import mongoose from "mongoose";

import { config } from "../config/config";

const connectDb = async () => {
  const OPTION_DB = {
    dbName: config.db_name,
  };
  try {
    mongoose.connection.on("connected", () => {
      console.log("✅ Sucessfully conneted with database");
    });
    mongoose.connection.on("err", (error) => {
      console.log("Error with connection with database", error);
    });
    await mongoose.connect(config.databaseUrl as string, OPTION_DB);
  } catch (error) {
    console.log("Fail to connect with databasee " + error);
    process.exit(1);
  }
};

export default connectDb;

// db/connectDb.ts

// import mongoose from "mongoose";

// const connectDb = async () => {
//   const MONGO_URI =
//     "mongodb+srv://sarveshsharmanci:wQd1KS0pJ8HQVGgX@cluster0.tp0bgqk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

//   try {
//     await mongoose.connect(MONGO_URI);
//     console.log("✅ Connected to MongoDB successfully");
//   } catch (error) {
//     console.error("❌ Failed to connect to MongoDB:", error);
//     process.exit(1);
//   }
// };

// export default connectDb;

// // wQd1KS0pJ8HQVGgX
