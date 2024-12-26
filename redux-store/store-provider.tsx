"use client";
import { Provider } from "react-redux";
import { store } from "@/redux-store/store";
import { useEffect } from "react";
import { setUser } from "./features/auth-slice";
import { AUTH_USER_KEY_NAME } from "@/lib/constants";


export function StoreProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {

  useEffect(() => {
    // fetch the user from localStorage
    const storedUser = localStorage.getItem(AUTH_USER_KEY_NAME);
    if (storedUser) {
      const user = JSON.parse(storedUser);
      store.dispatch(setUser(user));
    }
  }, []);
  return <Provider store={store}>{children}</Provider>;
}
