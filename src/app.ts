import express, { json } from "express";

import userRouter from "./user/router";
import bookrouter from "./book/router";
import cors from "cors";
import bodyparser from "body-parser";
import { config } from "./config/config";
import globalErrorHandler from "./middleware/GlobleErrorHandler";
const app = express();

app.use(
  cors({
    origin: config.frontend_domen,
  })
);
app.use(express.json());

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.use(json());
app.use("/api/users", userRouter);
app.use("/api/books", bookrouter);
app.use(globalErrorHandler);

app.get("/", (req, res) => {
  res.json({
    message: "something went worng",
  });
});

export default app;
