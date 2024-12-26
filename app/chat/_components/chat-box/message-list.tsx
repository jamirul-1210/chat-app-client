"use client";
import { Message } from "@/interfaces/message";
import { useAppSelector } from "@/redux-store/hooks";
import { MessageListItem } from "./message-list-item";
import { useEffect, useRef } from "react";


export function MessageList() {
  const ref = useRef<HTMLDivElement>(null);
  const messages: Message[] = useAppSelector((state) => state.message.messages);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [messages]); 

  return (
    <div ref={ref} className="flex-1 overflow-y-auto p-4 space-y-2 app-scrollbar">
    {messages.map((message) => (
      <MessageListItem key={message._id} message={message} />
    ))}
  </div>
  );
}