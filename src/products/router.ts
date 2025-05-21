import express, { Request, Response } from "express";
import { createProduct, deleteProduct, getProduct } from "./productControler";
import authenticate from "../middleware/Authenticate";
// import { createUser, loginUser } from "./userControler";

const productRouter = express.Router();

productRouter.get("/", (req: Request, res: Response) => {
  res.json({
    message: "This is use all products",
  });
});
productRouter.post("/createproduct", authenticate, createProduct);
productRouter.delete("/deleteproduct/:id", authenticate, deleteProduct);
productRouter.get("/getproducts", getProduct);

export default productRouter;
