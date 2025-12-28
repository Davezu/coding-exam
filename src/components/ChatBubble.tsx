import { type Message } from "../types/Message.ts";

interface MessageBubbleProps {
    message: Message;
    isMe: boolean;
}

export default function MessageBubble({ message, isMe }: MessageBubbleProps) {
    return (
        <div className={`flex ${isMe ? "justify-end" : "justify-start"} mb-2`}>
            <div
                className={`max-w-[75%] px-4 py-2 rounded-2xl ${
                    isMe
                        ? " bg-[#F5F1E8] border-2 border-[#C9DBFD] rounded-tr-sm"
                        : "bg-[#e3e5e8] text-gray-900 rounded-tl-sm"
                }`}>
                {message.content ? (
                    
                    <p className="text-base wrap-break-words">
                        <div className="font-bold text-sm">
                            {message.username}
                        </div>
                        {message.content}
                        <span className={`text-xs ml-2 ${isMe ? "text-black/70" : "text-gray-700"}`}>
                            {new Date(message.timestamp).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
                        </span>
                    </p>
                ) : (
                    <span className="text-xs text-gray-400">Empty message</span>
                )}
            </div>
        </div>
    );
}