import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import { WooCommerce } from "../utils/woocommerce";
import { config } from "../config/config";

const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const testProduct = req.body;
  // console.log(testProduct);
  const token = req.header("Authorization");
  // console.log("this is token", token);
  // const testProduct = {
  //   name: "Premium Gray T-Shirt by sarvesh",
  //   description: "High quality cotton t-shirt",
  //   regular_price: "19.99",
  //   images: [
  //     {
  //       src: "https://m.media-amazon.com/images/I/71ihH2Tnt1L._AC_UL480_FMwebp_QL65_.jpg",
  //       name: "gry T-Shirt",
  //       alt: "gry Cotton T-Shirt Front View",
  //     },
  //   ],
  // };

  WooCommerce.post("products", testProduct, {
    auth: {
      username: config.WOOCOMMERCE_CONSUMER_KEY,
      password: config.WOOCOMMERCE_CONSUMER_KEY, // use real one
      // password: "ck_aa1c641e55792023f64805d0ba1893a8b81a4481", // use real one
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token?.split(" ")[1]}`, // Optional
    },
  })
    .then((response) => {
      console.log("product created");
      return res.status(201).json({
        message: "Product created successfully",
        product: response.data,
      });
    })
    .catch((error) => {
      next(createHttpError(400, "Full Error", error));
    });
};

const getProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Test connection first
    // const ping = await WooCommerce.get("");
    // console.log("API Connection Test:", ping.data);

    // Get products with pagination
    const { data } = await WooCommerce.get("products", {
      per_page: 10,
      page: 1,
      status: "publish",
    });

    if (!Array.isArray(data)) {
      throw createHttpError(502, "Invalid products data format");
    }

    res.status(200).json({
      success: true,
      count: data.length,
      products: data,
    });
  } catch (error: any) {
    const status = error.response?.status || 500;
    const message = error.response?.data?.message || "WooCommerce API Error";

    next(createHttpError(status, message));
  }
};

const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const productId = req.params.id;
  console.log("Received product ID:", productId); // Check this log

  if (!productId) {
    return next(createHttpError(400, "Product ID is required."));
  }

  try {
    const response = await WooCommerce.delete(`products/${productId}`, {
      force: true,
    });
    console.log("Product deleted successfully.");

    return res.status(200).json({
      message: "Product deleted successfully.",
      data: response.data,
    });
  } catch (error) {
    console.log("Delete Error:");
    return next(createHttpError(400, "Failed to delete product."));
  }
};

export { createProduct, getProduct, deleteProduct };

// ck_aa1c641e55792023f64805d0ba1893a8b81a4481
// ck_aa1c641e55792023f64805d0ba1893a8b81a4481
