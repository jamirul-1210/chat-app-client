import { Metadata } from "next";
import { ChatSidebar } from "./_components/chat-sidebar/chat-sidebar";
import { ChatBox } from "./_components/chat-box/chat-box";
import { SocketProvider } from "@/contexts/socket-ctx";
import { TopNav } from "./_components/chat-sidebar/top-nav";
import { SearchBar } from "./_components/chat-sidebar/search-bar";
import { ChatList } from "./_components/chat-sidebar/chat-list";
import { UserProfileBar } from "./_components/chat-sidebar/user-profile-bar";

export const metadata: Metadata = {
  title: "ChatApp - Chat",
  description: "Chat with friends, family, and colleagues in real-time.",
};

export default function ChatPage() {
  return (
    <SocketProvider>
      <main className="flex h-screen bg-background">
        <ChatSidebar>
            <TopNav />
            <SearchBar />
            <ChatList />
            <UserProfileBar />
        </ChatSidebar>
        <ChatBox />
      </main>
    </SocketProvider>
  );
}
