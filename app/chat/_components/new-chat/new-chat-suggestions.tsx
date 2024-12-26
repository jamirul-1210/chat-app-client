import { User } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SearchItemType } from "./use-search-results";
import { AUTH_TOKEN_KEY_NAME, BACKEND_BASE_URL } from "@/lib/constants";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "@/redux-store/hooks";
import { addOneChat, setSelectedChat } from "@/redux-store/features/chat-slice";
import { Chat } from "@/interfaces/chat";

interface SearchSuggestionsProps {
  results: SearchItemType[];
  setIsOpen:(isOpen:boolean)=>void;
  setQuery:(value:string)=>void;

}

export function NewChatSuggestions({
  results,
  setIsOpen,
  setQuery
}: SearchSuggestionsProps) {
  const dispatch = useAppDispatch();
  const chatState = useAppSelector((state) => state.chat);


  const handleOnSelect = async (item: SearchItemType) => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY_NAME);
    if (!token) return;
    try {
      const res = await axios.post(
        `${BACKEND_BASE_URL}/api/chats/${item._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200 || res.status === 201) {
        dispatch(setSelectedChat(res.data.chat as Chat));
        dispatch(addOneChat(res.data.chat as Chat));
        setQuery('');
        setIsOpen(false);
      }
    } catch (error: any) {
      console.log(error);
    }
  };
  return (
    <ScrollArea className="max-h-[300px] py-2 px-4">
      {results.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-muted-foreground">Results</h3>
          <div className="space-y-2">
            {results.map((item) => (
              <SearchItem
                key={item._id}
                item={item}
                onSelect={handleOnSelect}
              />
            ))}
          </div>
        </div>
      )}

      {results.length === 0 && (
        <div className="text-center py-6 text-muted-foreground">
          No results found
        </div>
      )}
    </ScrollArea>
  );
}

function SearchItem({
  item,
  onSelect,
}: {
  item: SearchItemType;
  onSelect: (item: SearchItemType) => void;
}) {
  return (
    <button
      className="w-full flex items-center gap-3 p-2 rounded-md hover:bg-muted text-left"
      onClick={() => onSelect(item)}
    >
      <div className="flex-shrink-0">
        <User className="h-6 w-6 text-muted-foreground" />
      </div>
      <div>
        <p className="font-medium">{item.name}</p>
        <p className="text-sm text-muted-foreground capitalize">
          {item.username}
        </p>
      </div>
    </button>
  );
}
