"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let io;
const socket = {
    getIo: () => {
        if (io) {
            return io;
        }
        throw Error("IO is not defined");
    },
    setIO: (inputIO) => {
        io = inputIO;
    },
};
exports.default = socket;
