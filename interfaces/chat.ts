import { Message } from "./message";

export interface Chat {
  _id: string;
  members:Memeber[];
  isGroupChat: boolean;
  groupName?: string;
  messages?: Message[];
  createdAt: string;
  updatedAt: string;
}

export type Memeber = {
  _id: string;
  name: string;
  username: string;
  gender: string;
  __v: number;
  avatar?:string;
  lastSeen: string;
};