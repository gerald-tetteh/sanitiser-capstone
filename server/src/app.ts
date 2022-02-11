import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoClient from "./db/db_connect";

const app = express();

app.use(cors());

const run = async () => {
  try {
    await mongoClient.connect();
    app.listen(process.env.PORT);
  } catch (e) {
    console.log(e);
  }
};

run();
