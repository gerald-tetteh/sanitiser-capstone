/**
 * Author: Gerald Addo-Tetteh
 * Ashesi Final Year Capstone
 * AHSM Server - app.ts
 */

import "dotenv/config";
import express, { ErrorRequestHandler } from "express";
import { Server } from "socket.io";
import cors from "cors";
import mongoClient from "./db/db-connect";
import apiRoutes from "./routes/api";
import dashboardRoutes from "./routes/dashboard";
import socket from "./utils/socket";

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
    const server = app.listen(process.env.PORT);
    const io = new Server(server, {
      cors: {
        origin: "*",
      },
    });
    socket.setIO(io);
    io.on("connection", () => {
      console.log("Web Sock Connected");
    });
  } catch (e) {
    console.log(e);
  }
};

run();
