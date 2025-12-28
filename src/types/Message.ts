export type Message = {
    type: string;
    user_id: number;
    username: string;
    text: string;
    content: string;
    channel: string;
    timestamp: string;
    sender: "me" | "others";
}
