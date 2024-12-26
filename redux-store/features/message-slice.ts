import { createSlice } from '@reduxjs/toolkit';
import { Message } from '@/interfaces/message';

interface MessageState {
  messages: Message[];
}

const initialState: MessageState = {
  messages: [],
};

export const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    removeAllMessages: (state) => {
      state.messages = [];
    }
  },
});

export const { setMessages, addMessage,removeAllMessages } = messageSlice.actions;

export default messageSlice.reducer;