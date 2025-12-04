import { createContext, useContext, useEffect, useRef } from "react";
import { useAppStore } from "@/store";
import { HOST } from "@/utils/constants";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const socket = useRef;
  const { userInfo } = useAppStore();

  useEffect(() => {
    if (userInfo) {
      socket.current = io(HOST, {
        withCredentials: true,
        query: { userId: userInfo.id },
      });
      socket.current.on("connect", () => {
        console.log("connect to the server");
      });

      const handleReceiveMessage = (message) => {
        const { selectedChatData, selectedChatType, addMessage, addContactlInDMContacts } = useAppStore.getState();
        if (
          selectedChatType !== undefined &&
          (selectedChatData._id === message.sender._id ||
            selectedChatData._id === message.recipient._id)
        ) {
          console.log("message rcv:", message)
          addMessage(message);
        }
        addContactlInDMContacts(message);
      };

      const handleReceiveChannelMessage = (message) => {
        const { selectedChatData, selectedChatType, addMessage, addChannelInChannelList } = useAppStore.getState();
        if (
          selectedChatType !== undefined &&
          (selectedChatData._id === message.channelId)
        ) {
          console.log("message rcv:", message)
          addMessage(message);
        }
        addChannelInChannelList(message)
      };

      
      socket.current.on("receiveChannelMessage", handleReceiveChannelMessage);
      socket.current.on("receiveMessage", handleReceiveMessage);

      return () => {
        console.log("Disconnect to the server");
        socket.current.disconnect();
      };
    }
  }, [userInfo]);
  return (
    <SocketContext.Provider value={socket.current}>
      {children}
    </SocketContext.Provider>
  );
};
