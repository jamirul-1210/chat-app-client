import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { AUTH_TOKEN_KEY_NAME, BACKEND_BASE_URL } from "@/lib/constants";
import { useAppSelector } from "@/redux-store/hooks";
import axios from "axios";

const sendMessage = async ({
  message,
  token,
  chatId,
}: {
  message: string;
  token: string;
  chatId: string;
}) => {
  try {
    const res = await axios.post(
      `${BACKEND_BASE_URL}/api/messages`,
      { content:message, chatId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res;
  } catch (err:any) {
    console.log(err.message);
  }
};

export function MessageInput() {
  const [message, setMessage] = useState("");
  const selectedChat = useAppSelector((state) => state.chat.selectedChat);

  // handle form submit event
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // get token from local storage
    const token = localStorage.getItem(AUTH_TOKEN_KEY_NAME);
    // if token is not present return to login
    if (!token) return;

    // send message to the server
    const res = await sendMessage({
      message,
      token,
      chatId: selectedChat!._id,
    });

    if (res && res.status === 201) {
    }
    setMessage("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border-t border-border p-4 bg-card"
    >
      <div className="flex gap-2">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 dark:text-gray-300"
        />
        <Button type="submit" size="icon" disabled={!message.trim()}>
          <Send className="h-4 w-6" />
        </Button>
      </div>
    </form>
  );
}
