import { Server } from "socket.io";
import { DailyUsage } from "../db/daily-usage-dao";
import { SanitizerLevel } from "../db/sanitizer-level-dao";

interface ServerToClientEvents {
  sanitizerLevel: (sanitizerLevel: SanitizerLevel) => void;
  usageCount: (count: DailyUsage) => void;
}
interface ClientToServerEvents {
  hello: () => void;
}
interface InterServerEvents {
  ping: () => void;
}

type SocketType = Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents
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
