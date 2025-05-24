import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ChatInterface() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!input.trim()) return;

  const now = new Date();
  const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const userMessage = { text: input, sender: "user", time };
  setMessages((prev) => [...prev, userMessage]);
  setIsTyping(true);

  try {
    const response = await fetch("http://localhost:8081/get", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ msg: input })
    });

    const data = await response.text(); // since Flask returns plain text
    const botMessage = { text: data, sender: "bot", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages((prev) => [...prev, botMessage]);
  } catch (error) {
    console.error("Error fetching bot response:", error);
  } finally {
    setIsTyping(false);
    setInput("");
  }
};


  return (

    <div className="min-h-screen flex items-center ">
      
      <div className="w-full max-w-3xl px-4">
           <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              <span className="text-lime-500">OTP</span> Chatbot
            </h1>
            <p className="text-gray-600">Chat with our intelligent assistant</p>
          </div>
        <Card className="flex flex-col h-[32rem] shadow-xl border-2 border-lime-200 rounded-2xl overflow-hidden">
          <div className="flex items-center gap-4 px-6 py-4 rounded-t-2xl">
            <div className="relative">
              <img
                src="/OTPbankalogo.png"
                alt="Oti Avatar"
                className="w-14 h-14 rounded-full border-2 border-gray-100"
              />
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white"></span>
            </div>
            <div>
              <h2 className="font-bold text-lg text-black">Oti the AI Chatbot</h2>
              <p className="text-sm text-gray-500">Ask me anything</p>
            </div>
          </div>

          <CardContent className="flex-1 overflow-y-auto space-y-4 px-6 py-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex items-end ${
                  msg.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.type === "bot" && (
                  <img
                    src="/operator.jpg"
                    alt="Bot"
                    className="w-9 h-9 rounded-full mr-2"
                  />
                )}
                <div
                  className={`px-4 py-2 rounded-lg relative text-sm max-w-[70%] ${
                    msg.type === "user"
                      ? "bg-gray-200 text-black rounded-br-lg"
                      : "bg-green-500 text-white rounded-bl-lg"
                  }`}
                >
                  {msg.text}
                  <span className="absolute text-[10px] text-gray-400 bottom-[-18px] right-0">
                    {msg.time}
                  </span>
                </div>
                {msg.type === "user" && (
                  <img
                    src="/userIcon.png"
                    alt="User"
                    className="w-9 h-9 rounded-full ml-2"
                  />
                )}
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-center items-center w-full px-4 py-2">
                <div className="flex gap-2 items-center">
                  <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-bounce"></div>
                  <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            )}
          </CardContent>

          <form
            onSubmit={handleSubmit}
            className="p-4 rounded-b-2xl flex items-center gap-2"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-white text-black border-lime-200 focus:ring-green-500"
              placeholder="Type your message..."
              required
            />
            <Button
              type="submit"
              className="bg-lime-500 hover:bg-lime-600 p-2 rounded-lg"
            >
              <img
                src="/arrow.png"
                alt="Send"
                className="w-7 h-7"
              />
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
