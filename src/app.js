import express, { Router } from "express";
import { errorHandler } from "./middleware/error-handler.js";
import { router } from "./routes/places.js";
import { logger } from "./middleware/logger.js";
import cors from "cors";

export const app = express();
app.use(express.json());

/** 
 * Global exception handler middleware
 */
app.use(errorHandler);

/**
 * Logger middleware comes here
 */
app.use(logger);

/**
 * Enable all CORS
 */
app.use(cors());

/**
 * Places routes
 */
app.use("/v1/places", router);
