"use client";
import { ChatBoxHeader } from "./chat-box-header";
import { MessageList } from "./message-list";
import { MessageInput } from "./message-input";
import { ChatBoxPlaceholder } from "./chat-box-placeholder";
import { useAppDispatch } from "@/redux-store/hooks";
import { useAppSelector } from "@/redux-store/hooks";
import { useContext, useEffect } from "react";
import {
  addMessage,
  removeAllMessages,
  setMessages,
} from "@/redux-store/features/message-slice";
import { useRouter } from "next/navigation";
import axios from "axios";
import { AUTH_TOKEN_KEY_NAME, BACKEND_BASE_URL } from "@/lib/constants";
import { Message } from "@/interfaces/message";
import SocketContext from "@/contexts/socket-ctx";
import { NEW_MESSAGE_RECEIVED, READ_MESSAGE } from "@/lib/events";

// get message from server function
const getMessages = async (chatId: string) => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY_NAME);
  if (!token) return;
  try {
    const res = await axios.get(
      `${BACKEND_BASE_URL}/api/messages/chat/${chatId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data as Message[];
  } catch (err) {
    console.log(err);
  }
};

export function ChatBox() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const selectedChat = useAppSelector((state) => state.chat.selectedChat);
  const authState = useAppSelector((state) => state.auth);
  const chatState = useAppSelector((state) => state.chat);
  const { socket } = useContext(SocketContext);

  // handle message fetch
  useEffect(() => {
    // chat is not selected return
    if (!selectedChat) return;

    // Get token from local storage
    const token = localStorage.getItem(AUTH_TOKEN_KEY_NAME);
    // redirect to login if token is not present
    if (!token) return;

    // Fetch chats from the server using the chatState and axios
    getMessages(selectedChat._id).then((messages) => {
      if (messages!.length > 0) {
        dispatch(setMessages(messages));
      }
    });

    // cleanup function all messages on component unmount
    return () => {
      dispatch(removeAllMessages());
    };
  }, [selectedChat]);

  // handle socket events
  useEffect(() => {
    if (!selectedChat?._id) return;
    if (!socket) return;

    // listen for new messages
    socket.on(NEW_MESSAGE_RECEIVED, (message: Message) => {
      if (chatState.selectedChat?._id === message.chatId) {
        dispatch(addMessage(message));
        // emit message to read the current recievd message
        if (
          authState.user?.id &&
          !message.readBy?.includes(authState.user.id)
        ) {
          socket.emit(READ_MESSAGE, message._id);
        }
      }
    });

    return () => {
      socket.off(NEW_MESSAGE_RECEIVED);
    };
  }, [socket, selectedChat]);

  // if chat is not selected show placeholder
  if (!selectedChat) {
    return <ChatBoxPlaceholder />;
  }
  return (
    <div className="flex-1">
      <div className="flex flex-col h-screen">
        <ChatBoxHeader />
        <MessageList />
        <MessageInput />
      </div>
    </div>
  );
}
