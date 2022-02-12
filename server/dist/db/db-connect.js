"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const mongoClient = new mongodb_1.MongoClient(process.env.MONGO_URI);
exports.default = mongoClient;
