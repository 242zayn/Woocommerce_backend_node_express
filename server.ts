import app from "./src/app";
import { config } from "./src/config/config";
import connectDb from "./src/databases/dbConnection";

const StartServer = async () => {
  const port = config.port || 3000;

  await connectDb();

  app.listen(port, () => {
    console.log(` Server are runing on port ${port} `);
  });
};

StartServer();
