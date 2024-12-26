import { ReactNode } from "react";

interface ChatSidebarProps {
  children?: ReactNode;
}

export function ChatSidebar({ children }: ChatSidebarProps) {
  return (
    <div className="w-96 h-screen border-r border-border bg-card flex flex-col relative">
      {children}
    </div>
  );
}
