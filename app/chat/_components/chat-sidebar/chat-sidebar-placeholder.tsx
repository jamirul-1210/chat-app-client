import { Users } from "lucide-react";

export function EmptySidebar() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-6">
      <div className="relative">
        <div className="absolute inset-0 bg-primary/5 blur-2xl rounded-full" />
        <div className="relative bg-muted p-4 rounded-full">
          <Users className="w-12 h-12 text-primary/70" />
        </div>
      </div>
      <div className="space-y-2">
        <h3 className="font-semibold">No Conversations Yet</h3>
        <p className="text-sm text-muted-foreground">
          Start chatting with friends and colleagues
        </p>
      </div>
    </div>
  );
}
