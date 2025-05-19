import express, { Request, Response } from "express";
import { createUser, loginUser } from "./userControler";

const userRouter = express.Router();

userRouter.get("/register", (req: Request, res: Response) => {
  res.json({
    message: "User Seccesfully Ragisterd",
  });
});
userRouter.post("/register", createUser);
userRouter.post("/login", loginUser);

export default userRouter;
