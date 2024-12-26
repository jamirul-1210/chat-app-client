"use client";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/redux-store/hooks";
import {
  removeFilteredChats,
  setFilteredChats,
} from "@/redux-store/features/chat-slice";

export function SearchBar() {
  const dispatch = useAppDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    if (searchQuery === "") {
      dispatch(removeFilteredChats());
      return;
    }
    dispatch(setFilteredChats(searchQuery));
  }, [searchQuery]);

  return (
    <div className="p-3 border-b border-border">
      <div className="relative">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search conversations..."
          className="pl-9 bg-muted/50"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchQuery(e.target.value)
          }
          value={searchQuery}
        />
      </div>
    </div>
  );
}
