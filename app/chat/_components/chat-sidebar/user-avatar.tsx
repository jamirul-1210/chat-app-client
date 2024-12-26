import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { BACKEND_BASE_URL } from "@/lib/constants";
import { getInitials } from "@/lib/get-initials";
export function UserAvatar({
  imageUrl,
  name,
}: {
  imageUrl?: string;
  name?: string;
}) {
  const initials = getInitials(name ? name : "");
  return (
    <Avatar className="h-10 w-10 dark:text-gray-400">
      <AvatarImage src={ imageUrl ? `${BACKEND_BASE_URL}/assets/${imageUrl}` : "#"} alt={name ? name : "profile image"} />
      <AvatarFallback>{name ? initials : "AV"}</AvatarFallback>
    </Avatar>
  );
}
