// import { Request, Response } from "express";
// import { HttpError } from "http-errors";
// import { config } from "../config/config";

// const globalErrorHandler = (err: HttpError, req: Request, res: Response) => {
//   // Ensure statusCode is always valid
//   const statusCode = err.status || err.statusCode || 500;

//   // Log error properly for debugging
//   console.error(`[Error]: ${err.message}`);

//   return res.status(statusCode).json({
//     success: false, // Helps frontend identify failure
//     message: err.message || "Something went wrong",
//     errorStack: config.env === "development" ? err.stack : undefined, // Hide stack in production
//   });
// };

// export default globalErrorHandler;

import { Request, Response, NextFunction } from "express";
import { HttpError } from "http-errors";
import { config } from "../config/config";

const globalErrorHandler = (
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.status || 500;

  res.status(statusCode).json({
    status: "error",
    statusCode,
    message: err.message || "Something went wrong",
    stack: config.NODE_ENV === "development" ? err.stack : undefined,
  });
};

export default globalErrorHandler;
