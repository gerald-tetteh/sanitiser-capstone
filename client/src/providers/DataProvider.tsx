/**
 * Author: Gerald Addo-Tetteh
 * Ashesi Final Year Capstone
 * AHSM Client - DataProvider.tsx
 */

import React, { createContext, useState } from "react";
import { io, Socket } from "socket.io-client";
import { UserNotification } from "../utils/types";

interface DataContextInterface {
  socket: Socket;
  notifications: UserNotification[];
  setNotifications: React.Dispatch<React.SetStateAction<UserNotification[]>>;
}
type DataStoreProps = {
  children: JSX.Element;
};

export const DataContext = createContext<DataContextInterface | null>(null);

const DataStore = ({ children }: DataStoreProps) => {
  const socket = io("http://localhost:3000");
  const [notifications, setNotifications] = useState<UserNotification[]>([]);
  const data: DataContextInterface = {
    socket,
    notifications,
    setNotifications,
  };
  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};

export default DataStore;
