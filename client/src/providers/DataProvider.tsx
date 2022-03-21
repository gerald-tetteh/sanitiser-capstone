/**
 * Author: Gerald Addo-Tetteh
 * Ashesi Final Year Capstone
 * AHSM Client - DataProvider.tsx
 */

import { createContext } from "react";
import { io, Socket } from "socket.io-client";

interface DataContextInterface {
  socket: Socket;
  notifications: Notification[];
}
type DataStoreProps = {
  children: JSX.Element;
};

export const DataContext = createContext<DataContextInterface | null>(null);

const DataStore = ({ children }: DataStoreProps) => {
  const socket = io("http://localhost:3000");
  let notifications: Notification[] = [];
  const data: DataContextInterface = {
    socket,
    notifications,
  };
  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};

export default DataStore;
