import React, { useState, useRef, useEffect } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ChatPage = () => {
  const userName = useSelector((state) => state.user.userName); // ✅ string directly
  const [messages, setMessages] = useState([
    {
      userName: "System",
      text: "Welcome to the chat room 🎉",
      type: "system",
    },
    {
      avatar:
        "https://tse2.mm.bing.net/th/id/OIP.sznKTawHmg0kF5VJPFpE5AHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
      text: "catWelcome to the chat room...",
      userName: "cat",
      type: "other",
    },
    {
      avatar:
        "https://tse2.mm.bing.net/th/id/OIP.sznKTawHmg0kF5VJPFpE5AHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
      userName: "dog",
      text: "Hi there!",
      type: "other",
    },
    {
      userName: "You",
      avatar:
        "https://tse2.mm.bing.net/th/id/OIP.sznKTawHmg0kF5VJPFpE5AHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
      text: "Hey! how are you cat",
      type: "user",
      status: "sending",
    },
  ]);
  const [input, setInput] = useState("");
  const textareaRef = useRef(null);
  const messagesEndRef = useRef(null);

  const sendMessage = () => {
    if (input.trim() === "") return;
    console.log(userName);
    setMessages((prev) => [
      ...prev,
      {
        userName: userName.userName ?? "Anonymous",
        text: input,
        type: "user",
        status: "sending",
        avatar:
          "https://tse2.mm.bing.net/th/id/OIP.sznKTawHmg0kF5VJPFpE5AHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
      },
    ]);
    setInput("");
  };

  // 🔹 Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 🔹 Handle Enter key
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Chat Header */}
      <div className="bg-white/10 backdrop-blur-xl p-4 border-b border-white/20 fixed top-0 w-full z-10 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/">
            <BiArrowBack className="text-3xl text-white mr-4 cursor-pointer" />
          </Link>
          <h2 className="text-2xl font-bold text-white">🌐 General Chat</h2>
        </div>
        <h3 className="text-sm text-white">Online: 13</h3>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 mb-28 mt-16 min-h-[70vh] w-full mx-auto lg:w-9/12">
        {messages.map((msg, index) => (
          <div key={index}>
            <div
              className={`p-3 rounded-2xl w-fit max-w-md flex gap-4 ${
                msg.type === "system"
                  ? "mx-auto text-center text-gray-400 text-sm"
                  : msg.type === "user"
                  ? "ml-auto bg-red-500/20 flex-row-reverse justify-between text-white"
                  : "mr-auto bg-white/10 text-white"
              }`}
            >
              {msg.avatar && (
                <div className="flex-shrink-0">
                  <img
                    src={msg.avatar}
                    alt="avatar"
                    className="h-9 w-9 lg:h-12 lg:w-12 rounded-full"
                  />
                </div>
              )}
              <div>
                {msg.type !== "system" && (
                  <span className="block text-xs text-gray-300 mb-1">
                    {msg.userName ?? "Anonymous"}
                  </span>
                )}
                <span className="whitespace-pre-line">{msg.text}</span>
                {msg.status && (
                  <span className="block text-xs text-gray-400 mt-1 italic">
                    {msg.status}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-white/20 bg-white/10 backdrop-blur-xl fixed bottom-0 w-full">
        <div className="flex gap-3 items-end max-w-4xl mx-auto">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="flex-1 px-4 py-4 rounded-xl bg-white/20 text-white placeholder-gray-400 focus:outline-none resize-none max-h-45 overflow-y"
            rows="1"
          />
          <button
            onClick={sendMessage}
            className="px-8 py-4 bg-red-500/80 hover:bg-orange-600 text-white rounded-full transition-colors"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
