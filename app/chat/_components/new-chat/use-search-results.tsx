import { AUTH_TOKEN_KEY_NAME, BACKEND_BASE_URL } from "@/lib/constants";
import axios from "axios";
import { useState, useEffect } from "react";

export interface SearchItemType {
  _id: string;
  name: string;
  username: string;
  email: string;
}


export function useSearchResults(query: string) {
  const [results, setResults] = useState<SearchItemType[]>([]);


  // handle search
  useEffect(() => {
    if (query == "") return;
    const token = localStorage.getItem(AUTH_TOKEN_KEY_NAME);
    if(!token) return ;
    axios
      .get(`${BACKEND_BASE_URL}/api/users/search/${query}`,{
        headers:{
          Authorization: `Bearer ${token}`,
        }
      })
      .then((res) => {
        const users: SearchItemType[] = res.data;
        setResults(users);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [query]);

  return { results };
}
