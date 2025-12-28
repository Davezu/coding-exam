import { useRef, useState } from "react";   
import ChatBubble from "../components/ChatBubble.tsx";
import { type Message } from "../types/Message.ts";

export default function ChatPage() {
    const [username, setUsername] = useState("testKabaw");
    const [channel, setChannel] = useState("general");
    const [userId, setUserId] = useState<number | null>(null);
    const [isConnected, setConnected] = useState(false);
    const [userMessage, setUserMessage] = useState("");
    const [message, setMessage] = useState<Message[]>([]);
    const wsRef = useRef<WebSocket | null>(null);

    const sendMessage = () => {
        if (wsRef.current && userMessage.trim()) {
            const msg = {
                type: "message",
                content: userMessage,
                channel: channel,
            };
            wsRef.current.send(JSON.stringify(msg));
            setUserMessage("");
        }
    };
    
    const connect = () => {
        const wsUrl = `ws://localhost:8080/ws?username=${encodeURIComponent(username)}&channel=${encodeURIComponent(channel)}`;
        wsRef.current = new WebSocket(wsUrl);

        wsRef.current.onopen = () => {
        console.log("Connected");
        setConnected(true);
        };

        wsRef.current.onmessage = (e) => {
        console.log("Message:", e.data);
        const msg: Message = JSON.parse(e.data);

        if (msg.type === "user_connected" && msg.user_id != null){
            setUserId(msg.user_id);
        }
        setMessage((prevMessages) => [...prevMessages, msg]);
    };

        wsRef.current.onclose = () => {
        console.log("Disconnected");
        setConnected(false);
        setMessage([]);
        setUserId(null);
    };

        wsRef.current.onerror = (error) => {
        console.error("WebSocket error:", error);
        setConnected(false);
        };
    };
        const disconnect = () => {
        if (wsRef.current) {
            wsRef.current.close();
            wsRef.current = null;
            setConnected(false);
        }
    };

    return( 
        <div className="bg-gray-100 px-4 py-6 sm:py-12 min-h-screen">
            <div className="max-w-4xl mx-auto">
                <div className="border-0 rounded-lg shadow-lg bg-white p-4 sm:p-6 md:p-10">
                    <div className="mb-8">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                            Kabaw Discord Test Client
                        </h1>
                        <p className="mt-2 text-sm sm:text-base md:text-lg font-semibold text-gray-700">
                            Running on port 6969 - Testing cross-origin WebSocket to port 8080
                        </p>
                    </div>
                    <div className="bg-gray-200 px-4 sm:px-6 md:px-8 py-4 sm:py-6 rounded-md">
                        <h2 className="text-xl sm:text-2xl font-bold mb-4">
                            Connection Setting
                        </h2>
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                            className="w-full sm:w-auto flex-1 px-3 py-1.5 h-10 border bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                        />
                        <input
                            type="text"
                            value={channel}
                            onChange={(e) => setChannel(e.target.value)}
                            placeholder="Channel"
                            className="w-full sm:w-auto flex-1 px-3 py-1.5 h-10 border bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                        />
                        <button
                            onClick={connect}
                            disabled={isConnected}
                            className="w-full sm:w-auto px-3 py-1.5 rounded-lg h-10 bg-[#007bff] hover:bg-[#0056b3] text-white cursor-pointer disabled:bg-[#6c757d] disabled:cursor-not-allowed"
                        >
                            Connect
                        </button>
                        <button
                            onClick={disconnect}
                            disabled={!isConnected}
                            className="w-full sm:w-auto px-3 py-1.5 rounded-lg h-10 bg-[#007bff] hover:bg-[#0056b3] text-white cursor-pointer disabled:bg-[#6c757d] disabled:cursor-not-allowed"
                        >   
                            Disconnect
                        </button>
                        </div>
                    </div>
                    {isConnected ? (
                    <div className="bg-[#d4edda] text-green-800 px-4 py-4 rounded mt-3 p-2.5 my-2.5 font-bold">
                        Connected
                    </div>
                    ) : (
                    <div className="bg-[#f8d7da] text-red-800 px-4 py-4  mt-3 p-2.5 my-2.5 rounded font-bold">
                        Disconnected
                    </div>
                    )}
                    <div className="border border-gray-300 rounded-md h-100 overflow-y-auto p-2.5 mb-2.5 bg-gray-50 mt-3">
                        {isConnected ?(
                        <div>
                            <div className="text-center bg-[#fff3cd] italic text-black px-4 py-1 rounded mt-3 p-2.5 my-2.5 mb-3">
                                Connected as {username} to channel {channel} 
                            </div>
                            <div className="text-center bg-[#fff3cd] italic text-black px-4 py-1 rounded mt-3 p-2.5 my-2.5 mb-3">   
                                Your UserID is {userId}
                            </div>
                        </div>
                        ) : null}
                        {message.map((messages, index) => (
                        <ChatBubble
                            key={index}
                            message={messages}
                            isMe={messages.username === username}
                        />
                        ))}
                    </div>
                    <div className="flex gap-2">
                        <input
                            value={userMessage}
                            onChange={(e) => setUserMessage(e.target.value)}
                            disabled={!isConnected}
                            className="flex-1 px-2 py-2 border border-gray-300 rounded disabled:cursor-not-allowed" 
                            placeholder="Type a message..."
                        />
                        <button
                            onClick={sendMessage}
                            disabled={!isConnected}
                            className="px-4 py-2 bg-[#28a745] hover:bg-[#218838] text-white rounded cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-400">
                                Send
                        </button>
                    </div>
                    <div className="mt-5">
                        <h3 className="text-lg font-semibold mb-2">Instructions:</h3>
                        <ol className="list-decimal list-inside mb-4 space-y-1">
                            <li>Enter your username and channel name</li>
                            <li>Click "Connect" to establish WebSocket connection</li>
                            <li>Start typing messages in the input field</li>
                            <li>Open multiple tabs to test multi-user chat</li>
                        </ol>

                        <p className="font-semibold mb-2">Server endpoints (on port 8080):</p>
                        <ul className="list-disc list-inside mb-4 space-y-1">
                            <li> 
                                WebSocket: <code className="bg-gray-100 px-1 rounded">ws://localhost:8080/ws</code>
                            </li>
                            <li> Health: 
                                <a  
                                    href="http://localhost:8080/health" 
                                    target="_blank"
                                    className="text-blue-600 hover:underline"
                                > 
                                    http://localhost:8080/health
                                </a>
                            </li>
                            <li> Stats: 
                            <a 
                                href="http://localhost:8080/stats" 
                                target="_blank" 
                                className="text-blue-600 hover:underline"
                            >
                                http://localhost:8080/stats
                            </a>
                            </li>
                        </ul>

                        <p className="font-semibold">
                            This client is served from port 6969 to test cross-origin WebSocket connections.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}