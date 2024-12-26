export interface Message {
    _id: string;
    senderId: string;
    chatId: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    sendByMe?: boolean;
    readBy?: string[];
}

