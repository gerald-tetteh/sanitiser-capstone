/**
 * Author: Gerald Addo-Tetteh
 * Ashesi Final Year Capstone
 * AHSM Server - app.ts
 */

import "dotenv/config";
import express, { ErrorRequestHandler } from "express";
import cors from "cors";
import mongoClient from "./db/db-connect";
import apiRoutes from "./routes/api";
import dashboardRoutes from "./routes/dashboard";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/dashboard", dashboardRoutes);
app.use("/api", apiRoutes);

const errorRequest: ErrorRequestHandler = (error, req, res, next) => {
  res.status(500).json({ message: error.message, error: true });
};
app.use(errorRequest);

const run = async () => {
  try {
    await mongoClient.connect();
    app.listen(process.env.PORT);
  } catch (e) {
    console.log(e);
  }
};

run();
