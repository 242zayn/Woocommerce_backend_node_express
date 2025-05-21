// src/config/woocommerce.ts
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
// import { config } from "../config/config";

// // Debug output to verify configuration
// console.log("Active WooCommerce Config:", {
//   url: config.WOOCOMMERCE_STORE_URL,
//   key: config.WOOCOMMERCE_CONSUMER_KEY?.substring(0, 5) + "...",
//   secret: config.WOOCOMMERCE_CONSUMER_SECRET?.substring(0, 5) + "...",
// });

// export const WooCommerce = new WooCommerceRestApi({
//   url: config.WOOCOMMERCE_STORE_URL as string,
//   consumerKey: config.WOOCOMMERCE_CONSUMER_KEY as string,
//   consumerSecret: config.WOOCOMMERCE_CONSUMER_SECRET as string,
//   version: "wc/v3",
//   queryStringAuth: false, // Set to true if behind HTTPS
//   axiosConfig: {
//     timeout: 10000,
//     headers: {
//       "User-Agent": "My-WooCommerce-API/1.0",
//     },
//   },
// });


export const WooCommerce = new WooCommerceRestApi({
  url: "http://localhost/wordpress", // No trailing slash!
  consumerKey: "ck_aa1c641e55792023f64805d0ba1893a8b81a4481", // Use newly generated key
  consumerSecret: "cs_8a56d5df1854fb0a88db651c211752090f5ca3b5",
  version: "wc/v3",
  queryStringAuth: true, // ← Critical for local development
  axiosConfig: {
    timeout: 10000
  }
});
