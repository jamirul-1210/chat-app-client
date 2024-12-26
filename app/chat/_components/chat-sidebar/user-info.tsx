import { Skeleton } from "@/components/ui/skeleton";

interface UserInfoProps {
  name?: string;
  userName?: string;
}

export function UserInfo({ name, userName }: UserInfoProps) {
  if (!name && !userName) {
    return (
      <div className="flex-1 min-w-0">
        <div className="space-y-2">
          <Skeleton className="h-2 w-full" />
          <Skeleton className="h-2 w-1/2" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 min-w-0">
      <p className="text-sm capitalize font-semibold truncate text-primary">{name}</p>
      <p className="text-xs text-muted-foreground truncate font-bold">@{userName}</p>
    </div>
  );
}
