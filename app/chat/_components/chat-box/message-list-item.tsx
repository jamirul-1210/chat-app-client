"use client";
import { Message } from "@/interfaces/message"
import { formatTo12HourTime } from "@/lib/helper";
import { useAppSelector } from "@/redux-store/hooks";

interface ChatMessageProps {
  message: Message;
}

export function MessageListItem({ message }: ChatMessageProps) {
  const authState = useAppSelector(state => state.auth); // get from auth state

  return (
    <div className={`flex ${message.sendByMe ? 'justify-end' : 'justify-start'} `}>
      <div
        className={`max-w-[70%] min-w-28 rounded-3xl px-5 pb-5 pt-2 relative ${
          (message.senderId === authState.user?.id)
            ? 'bg-primary text-primary-foreground ml-auto rounded-br-none'
            : 'bg-muted dark:text-gray-400 rounded-bl-none'
        }`}
      >
        <p className={`text-sm`}>{message.content}</p>
        <span className={`text-xs opacity-70 mt-1 ${ (message.senderId === authState.user?.id) ?'dark:text-gray-800 right-5' :'dark:text-gray-300 left-5' } absolute bottom-1 `}>
          {formatTo12HourTime(message.createdAt)}
        </span>
      </div>

    </div>
  );
}