"use strict";
/**
 * Author: Gerald Addo-Tetteh
 * Ashesi Final Year Capstone
 * AHSM Server - app.ts
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const db_connect_1 = __importDefault(require("./db/db-connect"));
const api_1 = __importDefault(require("./routes/api"));
const dashboard_1 = __importDefault(require("./routes/dashboard"));
const socket_1 = __importDefault(require("./utils/socket"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/dashboard", dashboard_1.default);
app.use("/api", api_1.default);
const errorRequest = (error, req, res, next) => {
    res.status(500).json({ message: error.message, error: true });
};
app.use(errorRequest);
const run = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_connect_1.default.connect();
        const server = app.listen(process.env.PORT);
        const io = new socket_io_1.Server(server, {
            cors: {
                origin: "*",
            },
        });
        socket_1.default.setIO(io);
        io.on("connection", () => {
            console.log("Web Sock Connected");
        });
    }
    catch (e) {
        console.log(e);
    }
});
run();
