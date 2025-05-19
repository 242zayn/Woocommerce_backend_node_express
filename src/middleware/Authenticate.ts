import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { verify } from "jsonwebtoken";
import { config } from "../config/config";

export interface authRequest extends Request {
  userId: string;
}

const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const tokent = req.header("Authorization");

  if (!tokent) {
    return next(createHttpError(401, "Authorization tokent is required."));
  }

  //   console.log(parsedToken);

  try {
    const parsedToken = tokent.split(" ")[1];
    const decode = verify(parsedToken, config.jwtsecret as string);
    // console.log(decode.sub);

    const _req = req as authRequest;
    _req.userId = decode.sub as string;
    next();
  } catch (error) {
    return next(createHttpError(401, "Token is expreired"));
  }
};

export default authenticate;
