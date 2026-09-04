import * as dotenv from "dotenv";
import path from "node:path";
dotenv.config({});
import express from "express";
import authController from "./modules/auth/auth.controller.js";
import connectDB from "./DB/connection.db.js";
import cors from "cors";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import { globalErrorHandling } from "./utils/response.js";

const bootstrap = async () => {
  const app = express();
  const port = process.env.PORT || 3016;

  app.use(cors());
  app.use(helmet());
  //db
  await connectDB();
  /////////////////////////////////
  //rate limit
  const limiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    limit: 10,
    message: { error: "BAS BAAAAA Too Many request 😒" },
    handler: (req, res, next, options) => {
      return res.status(options.statusCode).json(options.message);
    },
    // legacyHeaders:false
    standardHeaders: "draft-8",
  });
  app.use(limiter);

  //multer static access
  app.use("/uploads", express.static(path.resolve("./src/uploads")));
  //convert json buffer data
  app.use(express.json());
  app.get("/", (req, res) => {
    res.json({ message: "Welcome to Tickets Backend API❤️" });
  });

  //routing application
  app.use("/auth", authController);

  app.all("{/*dummy}", (req, res) => {
    return res.status(404).json({ message: "In-valid routing" });
  });
  //error handling middleware
  app.use(globalErrorHandling);

  return app.listen(port, () =>
    console.log(`example app listen on server ${port}`),
  );
};
export default bootstrap;
