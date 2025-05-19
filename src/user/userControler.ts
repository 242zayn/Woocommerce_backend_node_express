import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import userScheema from "./userModel";
import bcrypt from "bcrypt";
import userModel from "./userModel";
import { sign } from "jsonwebtoken";
import { config } from "../config/config";
import { UserType } from "./userTypes";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    const err = createHttpError(400, "All feild are required ");
    return next(err);
  }

  try {
    const user = await userScheema.findOne({ email: email });
    if (user) {
      const error = createHttpError(400, "User alrady exist");
      return next(error);
    }
  } catch (error) {
    return next(createHttpError(400, "Error while getting user"));
  }

  const hashPassword = await bcrypt.hash(password, 10);
  let newUser: UserType;
  try {
    newUser = await userModel.create({
      name,
      email,
      password: hashPassword,
    });
  } catch (error) {
    return next(createHttpError(400, "Error while creating user"));
  }

  try {
    const token = sign({ sub: newUser._id }, config.jwtsecret as string, {
      expiresIn: "7d",
      algorithm: "HS256",
    });
    res.json({
      jwt: token,
    });
  } catch (error) {
    return next(
      createHttpError(
        400,
        "Error while genrating jwt token hwo u9ouu can handle this project"
      )
    );
  }
};

// ### User login part here

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(createHttpError(400, "All feild are required all"));
  }

  const user = await userModel.findOne({ email });
  try {
    if (!user) {
      return next(createHttpError(400, "User are not exixt"));
    }

    const ismatch = await bcrypt.compare(password, user.password);
    if (!ismatch) {
      return next(createHttpError(400, "User name or password increct"));
    }
  } catch (error) {
    return next(
      createHttpError(440, "Error while matching email and password")
    );
  }

  // create jwt tokent for login

  const token = sign({ sub: user._id }, config.jwtsecret as string, {
    expiresIn: "7d",
    algorithm: "HS256",
  });
  res.json({
    jwt: token,
  });
};

export { createUser, loginUser };

//  useEffect(() => {
//       const timer = setTimeout(() => {
//         router.push('/home');
//       }, 3000);
//       return () => clearTimeout(timer);
//     }, );
