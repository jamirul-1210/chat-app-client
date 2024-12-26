import { createSlice } from '@reduxjs/toolkit';
import { Chat } from '@/interfaces/chat';

interface ChatState {
    chats: Chat[];
    selectedChat: Chat | null;
    filteredChats: Chat[] | null;

}

const initialState: ChatState = {
    chats: [],
    selectedChat: null,
    filteredChats: null
};

export function moveChatToIndexZero(chats: Chat[], id: string): Chat[] {
    const index = chats.findIndex(chat => chat._id === id);

    if (index === -1) {
        console.warn(`Chat with id ${id} not found in the array.`);
        return chats;
    }

    // Remove the chat from its current position
    const [chat] = chats.splice(index, 1);

    // Add it to the beginning of the array
    chats.unshift(chat);

    return chats;
}


export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setChats: (state, action) => {
            state.chats = action.payload;
        },
        addOneChat: (state, action) => {
            const isexist = state.chats.find(chat => chat._id === action.payload._id);
            if (!isexist) {
                state.chats = [...state.chats, action.payload];
            }
        },
        updateOneChat: (state, action) => {
            const chat = state.chats.find(chat => chat.members[0]._id = action.payload._id);
            if (chat && chat.members) {
                chat.members[0].lastSeen = action.payload.lastSeen;
            }
        },
        removeAllChats: (state) => {
            state.chats = [];
        },
        changeLatesMessage: (state, action) => {
            const chat = state.chats.find(chat => chat._id === action.payload.chatId);
            if (chat && chat?.messages?.[0]) {
                chat.messages[0] = action.payload;
            } else {
                chat?.messages?.push(action.payload)
            }
            state.chats = moveChatToIndexZero(state.chats, action.payload.chatId);
        },
        changeLatesMessageRead: (state, action) => {
            const chat = state.chats.find(chat => chat._id === action.payload.chatId);
            if (chat?.messages && chat.messages[0].readBy) {
                chat.messages[0] = action.payload;
            }
        },
        setSelectedChat: (state, action) => {
            state.selectedChat = action.payload;
        },
        updateSelectedChatLastSeen: (state, action) => {
            if (state.selectedChat) {
                state.selectedChat.members[0].lastSeen = action.payload.lastSeen;
            }
        },
        setFilteredChats: (state, action) => {
            const isExistChats = state.chats.filter(chat => chat.members[0].name.toLowerCase().includes(action.payload)) ;
            if (isExistChats) {
                state.filteredChats = isExistChats;
            }
        },
        removeFilteredChats: (state) => {
            state.filteredChats = null;
        },
    },
});

export const { setChats, setSelectedChat, removeAllChats, changeLatesMessage, updateOneChat, updateSelectedChatLastSeen, addOneChat, changeLatesMessageRead, setFilteredChats, removeFilteredChats } = chatSlice.actions;

export default chatSlice.reducer;