import { Server } from "socket.io";
import { SanitizerLevel } from "../db/sanitizer-level-dao";

interface ServerToClientEvents {
  sanitizerLevel: (sanitizerLevel: SanitizerLevel) => void;
}

interface ClientToServerEvents {
  hello: () => void;
}

interface InterServerEvents {
  ping: () => void;
}

interface SocketData {
  name: string;
  age: number;
}

type SocketType = Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>;

let io: SocketType;

const socket = {
  getIo: () => {
    if (io) {
      return io;
    }
    throw Error("IO is not defined");
  },
  setIO: (inputIO: SocketType) => {
    io = inputIO;
  },
};

export default socket;
