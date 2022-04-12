/**
 * Author: Gerald Addo-Tetteh
 * Ashesi Final Year Capstone
 * AHSM Client - DataProvider.tsx
 */

import React, { createContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { UserNotification } from "../utils/types";

interface DataContextInterface {
  socket: Socket | null;
  notifications: UserNotification[];
  setNotifications: React.Dispatch<React.SetStateAction<UserNotification[]>>;
}
type DataStoreProps = {
  children: JSX.Element;
};

export const DataContext = createContext<DataContextInterface | null>(null);

const DataStore = ({ children }: DataStoreProps) => {
  let [socket, setSocket] = useState<Socket | null>(null);
  const [notifications, setNotifications] = useState<UserNotification[]>([]);
  const data: DataContextInterface = {
    socket,
    notifications,
    setNotifications,
  };
  useEffect(() => {
    setSocket(io(process.env.REACT_APP_SERVER as string));
  }, []);
  useEffect(() => {
    socket?.on("notification", (data: UserNotification) => {
      setNotifications((notifications) => {
        const updatedNotifications = [...notifications];
        updatedNotifications.push(data);
        return updatedNotifications;
      });
    });
  }, [socket]);
  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};

export default DataStore;
