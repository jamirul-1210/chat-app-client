"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { setSelectedChat } from "@/redux-store/features/chat-slice";
import { useAppDispatch } from "@/redux-store/hooks";
import { useAppSelector } from "@/redux-store/hooks";
import { isOnline, lastSeenFormat } from "@/lib/helper";
import { BACKEND_BASE_URL } from "@/lib/constants";
import { getInitials } from "@/lib/get-initials";

export function ChatBoxHeader() {
  const dispatch = useAppDispatch();
  const selectedChat = useAppSelector((state) => state.chat.selectedChat);
  return (
    <div className="px-4 py-2 flex border-b border-border items-center gap-3 bg-card h-16 ">
      <div className="relative flex-shrink-0">
        <Avatar>
          <AvatarImage
            src={selectedChat?.members[0].avatar ? `${BACKEND_BASE_URL}/assets/${selectedChat?.members[0].avatar}`:'#'}
            alt={`profile image of ${selectedChat?.members[0].name}`}
          />
          <AvatarFallback>{getInitials(selectedChat?.members[0].name || '')}</AvatarFallback>
        </Avatar>
        {selectedChat?.members[0].lastSeen &&
          isOnline(new Date(selectedChat.members[0].lastSeen)) && (
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full" />
          )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-baseline">
          {/* TODO: add sckeleton for name empty */}
          <h3 className="font-semibold truncate dark:text-gray-200">
            {selectedChat?.members[0].name}
          </h3>
        </div>
        {/* for online user */}
        <p className="text-sm text-muted-foreground truncate dark:text-gray-500">
        {selectedChat?.members[0].lastSeen &&
          isOnline(new Date(selectedChat.members[0].lastSeen)) && (
              'online'
          )}
        {/* for offline user */}
        {selectedChat?.members[0].lastSeen && !isOnline(new Date(selectedChat.members[0].lastSeen)) && (
          `active ${lastSeenFormat(new Date(selectedChat.members[0].lastSeen))}`
        )}


            </p>
      </div>
      <Button variant="secondary" onClick={() => dispatch(setSelectedChat(""))}>
        <X />
      </Button>
    </div>
  );
}
