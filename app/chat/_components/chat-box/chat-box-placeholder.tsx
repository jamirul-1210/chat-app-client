import { MessageSquare } from "lucide-react";

export function ChatBoxPlaceholder() {
  return (
    <div className="flex-1">
      <div className="h-full flex flex-col items-center justify-center p-8 bg-gradient-to-b from-background to-background/50">
        <div className="space-y-8">
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full" />
              <div className="relative bg-background p-6 rounded-full">
                <MessageSquare className="w-16 h-16 text-primary/70" />
              </div>
            </div>
          </div>
          <div className="text-center space-y-2 max-w-md">
            <h2 className="text-2xl font-semibold text-foreground">
              {"Welcome to ChatApp"}
            </h2>
            <p className="text-muted-foreground">
              {
                "Select a conversation from the sidebar to start chatting or search for someone specific."
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
