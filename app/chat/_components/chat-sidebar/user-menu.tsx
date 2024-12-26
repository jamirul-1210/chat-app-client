"use client";
import { Monitor, Moon, Settings, Sun, Image as ImageIcon,LogOutIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

interface UserMenuProps {
  onUpdateImage: () => void;
  onLogout: () => void;
}

export function UserMenu({
  onUpdateImage,
  onLogout,
}: UserMenuProps) {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon">
          <Settings className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={onUpdateImage}>
          <ImageIcon className="h-4 w-4 mr-1" />
          Update Profile Image
        </DropdownMenuItem>
        {/* sub menu for theme */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <span className="text-secondary-foreground">Toggle theme</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem onClick={() => setTheme("light")}>
                <Sun className="h-4 w-4 mr-2" />
                <span>Light</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                <Moon className="h-4 w-4 mr-2" />
                <span>Dark</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                <Monitor className="h-4 w-4 mr-2" />
                <span>System</span>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        {/* logout action */}
        <DropdownMenuItem onClick={onLogout} className="text-red-500">
          <LogOutIcon className="h-4 w-4 mr-1"/>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
