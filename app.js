import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import config from "./utils/config.js";
import productsRouter from "./controllers/products.js";
import logger from "./utils/logger.js";
import middleware from "./utils/middleware.js";

const app = express();

mongoose.set("strictQuery", false);

logger.info("Connecting to", config.DATABASE_URL);

mongoose
  .connect(config.DATABASE_URL)
  .then(() => {
    logger.info("Connected to MongoDB");
  })
  .catch((error) => {
    logger.info("Error connecting to MongoDB:", error.message);
  });

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/products", productsRouter);

// handler of requests with unknown endpoint
app.use(middleware.unknownEndpoint);
// This has to be the last loaded middleware.
app.use(middleware.errorHandler);

export default app;