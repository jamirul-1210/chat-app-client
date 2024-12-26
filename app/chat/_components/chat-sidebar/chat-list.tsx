"use client";
import { ChatListItem } from "./chat-list-item";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AUTH_TOKEN_KEY_NAME, BACKEND_BASE_URL } from "@/lib/constants";
import { useAppDispatch, useAppSelector } from "@/redux-store/hooks";
import { useRouter } from "next/navigation";
import {
  changeLatesMessage,
  changeLatesMessageRead,
  removeAllChats,
  setChats,
  updateOneChat,
  updateSelectedChatLastSeen,
} from "@/redux-store/features/chat-slice";
import { Chat, Memeber } from "@/interfaces/chat";
import { EmptySidebar } from "./chat-sidebar-placeholder";
import SocketContext from "@/contexts/socket-ctx";
import { Message } from "@/interfaces/message";
import {
  JOIN_ROOM,
  LEAVE_ROOM,
  MESSAGE_READ_RECEIVED,
  NEW_MESSAGE_RECEIVED,
  USER_LAST_SEEN_STATUS_UPDATE,
  USER_LAST_SEEN_UPDATE_RECEIVED,
} from "@/lib/events";
import { NewChatModal } from "../new-chat/new-chat-modal";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ChatListItemSkeleton } from "./chat-list-item-skeleton";

const fetchChats = async (token: string) => {
  return await axios.get(`${BACKEND_BASE_URL}/api/chats`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const readMessage = async (token: string, messageId: string) => {
  return await axios.post(
    `${BACKEND_BASE_URL}/api/messages/mark-read/${messageId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export function ChatList() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const chatState = useAppSelector((state) => state.chat);
  const authState = useAppSelector((state) => state.auth);
  const { socket } = useContext(SocketContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isloading, setIsloading] = useState(true);


  // handle fetch chats
  useEffect(() => {
    // Get token from local storage
    const token = localStorage.getItem(AUTH_TOKEN_KEY_NAME);
    if (!token) {
      // redirect to login
      return router.push("/login");
    }

    // Fetch chats from the server using the chatState and axios
    fetchChats(token)
      .then((res) => {
        if (res.status === 200 && res.data.length > 0) {
          const chats = res.data as Chat[];
          dispatch(setChats(chats));
          setIsloading(false)
        } else {
        }
      })
      .catch((err) => {
        setIsloading(false)
        console.log(err);
      });
    return () => {
      dispatch(removeAllChats());
    };
  }, []);

  // handle join room
  useEffect(() => {
    if (!socket) return;
    if (!authState.user?.id) return;
    // join the chat room
    socket.emit(JOIN_ROOM, authState.user.id);

    //clean up
    return () => {
      socket.emit(LEAVE_ROOM, authState.user?.id);
    };
  }, [socket, authState.user?.id]);

  // handle socket events
  useEffect(() => {
    if (!socket) return;
    if (!authState.user?.id) return;

    // listen for new messages
    socket.on(NEW_MESSAGE_RECEIVED, (message: Message) => {
      dispatch(changeLatesMessage(message));
    });

    //  listen for messages read event
    socket.on(MESSAGE_READ_RECEIVED, (message: Message) => {
      dispatch(changeLatesMessageRead(message));
    });

    socket.on(USER_LAST_SEEN_UPDATE_RECEIVED, (user: Memeber) => {
      dispatch(updateOneChat(user));
      //also update if the user in selected chat
      if (chatState.selectedChat?._id === user._id) {
        updateSelectedChatLastSeen(user);
      }
    });

    //clean up
    return () => {
      socket.off(NEW_MESSAGE_RECEIVED);
      socket.off(MESSAGE_READ_RECEIVED);
      socket.off(USER_LAST_SEEN_UPDATE_RECEIVED);
    };
  }, [socket, authState.user?.id,chatState.selectedChat]);

  // handle message read
  useEffect(() => {
    if (!chatState.selectedChat) return;
    // Get token from local storage
    const token = localStorage.getItem(AUTH_TOKEN_KEY_NAME);
    if (!token) return;

    const messages = chatState.selectedChat.messages;
    if (!messages || messages.length === 0) return;

    const messageId = messages[0]._id;
    if (!messageId) return;

    if (
      authState.user?.id &&
      chatState.selectedChat.messages?.[0]?.readBy &&
      !chatState.selectedChat.messages[0].readBy.includes(authState.user.id)
    ) {
      readMessage(token, messageId);
    }
  }, [chatState.selectedChat]);

  // handle laste seen update
  useEffect(() => {
    if (!socket) return;
    if (!authState.user?.id) return;
    // emit userevent to server
    const interval = setInterval(() => {
      socket.emit(USER_LAST_SEEN_STATUS_UPDATE, authState.user?.id);
    }, 2 * 60 * 1000); // 2 minutes in milliseconds
    //clean up
    return () => {
      clearInterval(interval);
    };
  }, [socket, authState.user?.id]);

  // chats are empty display empty sidebar placeholder
  if (!isloading && !(chatState.chats.length > 0)) return <EmptySidebar />;

  return (
    <>
      <div className="overflow-y-auto flex-1 app-scrollbar relative">
        {!isloading &&
          chatState.filteredChats === null &&
          chatState.chats.length > 0 && 
          chatState.chats.map((chat) => (
            <ChatListItem key={chat._id} chat={chat} />
          ))}
          {!isloading &&
          chatState.filteredChats !== null &&
          chatState.filteredChats.length > 0 && 
          chatState.filteredChats.map((chat) => (
            <ChatListItem key={chat._id} chat={chat} />
          ))}
          {/* loading sreen */}
        {isloading && (
          <>
            <ChatListItemSkeleton />
            <ChatListItemSkeleton />
            <ChatListItemSkeleton />
            <ChatListItemSkeleton />
            <ChatListItemSkeleton />
            <ChatListItemSkeleton />
          </>
        )}
      </div>
      <div className="absolute bottom-20 right-2 ">
        <Button
          variant="secondary"
          size="icon"
          className="rounded-full shadow-md"
          onClick={() => setIsOpen(true)}
        >
          <Plus className="h-5 w-5" />
          <span className="sr-only">New Chat</span>
        </Button>
      </div>
      <NewChatModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}
