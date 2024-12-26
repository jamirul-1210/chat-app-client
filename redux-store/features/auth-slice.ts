import { createSlice } from '@reduxjs/toolkit';
import { User } from '@/interfaces/user';

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  user: null,
  isLoggedIn: false,
};


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    setUserImage: (state, action) => {
      if (state.user) {
        state.user.imagrUrl = action.payload;
      }
    },
    removeUser: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },
  },
});

export const { setUser, removeUser, setUserImage } = authSlice.actions;

export default authSlice.reducer;