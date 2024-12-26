import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './features/chat-slice';
import messageSlice  from './features/message-slice';
import authSlice from './features/auth-slice';

export const store = configureStore({
  reducer: {
    chat: chatReducer,
    message: messageSlice,
    auth: authSlice,
  },
})


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState =  ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch