import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Chat } from "@/interfaces/chat";
import { BACKEND_BASE_URL } from "@/lib/constants";
import { getInitials } from "@/lib/get-initials";
import { formatTo12HourTime, isOnline } from "@/lib/helper";
import { setSelectedChat } from "@/redux-store/features/chat-slice";
import { useAppDispatch, useAppSelector } from "@/redux-store/hooks";

interface ChatListItemProps {
  chat: Chat;
}

export function ChatListItem({ chat }: ChatListItemProps) {
  const authState = useAppSelector((state) => state.auth);
  const chatState = useAppSelector((state) => state.chat);
  const dispatch = useAppDispatch();
  return (
    <div
      onClick={() => dispatch(setSelectedChat(chat))}
      className={`flex items-start gap-3 p-4 cursor-pointer transition-colors border-b border-border ${
        chatState.selectedChat?._id === chat._id
          ? "bg-muted"
          : "hover:bg-muted/50"
      }`}
    >
      <div className="relative flex-shrink-0">
        <Avatar>
          <AvatarImage
            src={
              chat.members[0]?.avatar
                ? `${BACKEND_BASE_URL}/assets/${chat.members[0]?.avatar}`
                : "#"
            }
            alt="profile image"
          />
          <AvatarFallback>{getInitials(chat.members[0].name)}</AvatarFallback>
        </Avatar>
        {isOnline(new Date(chat.members[0].lastSeen)) && (
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-baseline">
          <h3 className="font-semibold truncate dark:text-gray-200">
            {chat.members[0].name}
          </h3>
          <span
            className={`text-xs ${
              chat.messages &&
              chat.messages?.[0]?.readBy?.find(
                (id) => id === authState.user?.id
              )
                ? "font-semibold dark:text-gray-400 text-gray-700"
                : "text-primary font-bold"
            }`}
          >
            {chat.messages?.[0]?.createdAt
              ? formatTo12HourTime(chat.messages[0].createdAt)
              : ""}
          </span>
        </div>
        <p
          className={`text-sm text-muted-foreground truncate ${
            chat.messages?.[0]?.readBy?.find((id) => id === authState.user?.id)
              ? "dark:text-gray-400"
              : "text-primary font-bold"
          }`}
        >
          {chat.messages && chat.messages?.[0]?.senderId === authState.user?.id
            ? "you : "
            : ""}
          {chat.messages?.[0]?.content ? (
            chat.messages?.[0]?.content
          ) : (
            <span className="dark:text-gray-500 font-normal text-gray-700">
              No messages yet
            </span>
          )}
        </p>
      </div>
    </div>
  );
}
