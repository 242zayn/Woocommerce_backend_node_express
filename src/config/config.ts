import { config as conf } from "dotenv";

conf();

const _config = {
  port: process.env.PORT,
  databaseUrl: process.env.MONGO_CONNECTION_STRING,
  db_name: process.env.OPTION_DB,
  env: process.env.NODE_ENV,
  jwtsecret: process.env.JWT_SECRET,
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.API_SECRET,
  frontend_domen: process.env.FRONTEND_DOMEN,
};

export const config = Object.freeze(_config);
