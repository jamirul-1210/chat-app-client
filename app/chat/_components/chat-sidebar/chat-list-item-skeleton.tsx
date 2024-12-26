import { Skeleton } from "@/components/ui/skeleton";

export function ChatListItemSkeleton() {
  return (
    <div className="flex items-start gap-3 p-4">
      <Skeleton className="h-8 w-8 rounded-full flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="flex justify-between items-baseline">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-12" />
        </div>
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  );
}