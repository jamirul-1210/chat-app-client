import { useState } from "react";
import { Plus, Search, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { NewChatSuggestions } from "./new-chat-suggestions";
import { useSearchResults } from "./use-search-results";
import { Button } from "@/components/ui/button";

interface NewChatModalProps {
  isOpen:boolean;
  setIsOpen: (setIsOpen:boolean) => void;
}


export function NewChatModal({isOpen,setIsOpen}:NewChatModalProps) {
  const [query, setQuery] = useState("");
  const { results } = useSearchResults(query);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[500px] p-0">
        <DialogHeader className="sm:p-4">
          <DialogTitle>Add a new chat</DialogTitle>
          <DialogDescription>Make new friends</DialogDescription>
        </DialogHeader>
        <div className="px-4 py-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search people..."
              className="pl-9 pr-9"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3 top-2.5"
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            )}
          </div>
        </div>
        <NewChatSuggestions
          results={results}
          setIsOpen={setIsOpen}
          setQuery={setQuery}
        />
      </DialogContent>
    </Dialog>
  );
}
