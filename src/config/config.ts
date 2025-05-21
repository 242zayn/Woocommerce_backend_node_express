import { config as conf } from "dotenv";

conf();

const _config = {
  port: process.env.PORT,
  databaseUrl: process.env.MONGO_CONNECTION_STRING,
  db_name: process.env.OPTION_DB,
  NODE_ENV: process.env.NODE_ENV,
  jwtsecret: process.env.JWT_SECRET,
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.API_SECRET,
  frontend_domen: process.env.FRONTEND_DOMEN,
  WOOCOMMERCE_STORE_URL: process.env.WOOCOMMERCE_STORE_URL,
  WOOCOMMERCE_CONSUMER_KEY: process.env.WOOCOMMERCE_CONSUMER_KEY,
  WOOCOMMERCE_CONSUMER_SECRET: process.env.WOOCOMMERCE_CONSUMER_SECRET,
};

export const config = Object.freeze(_config);

// WOOCOMMERCE_STORE_URL=https://yourstore.com
// WOOCOMMERCE_CONSUMER_KEY=ck_your_key_here
// WOOCOMMERCE_CONSUMER_SECRET=cs_your_secret_here
