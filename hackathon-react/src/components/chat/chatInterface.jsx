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
    const hour = now.getHours();
    const minute = now.getMinutes();
    const time = `${hour}:${minute}`;

    const userMessage = {
      text: input,
      sender: "user",
      time,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch("http://localhost:8081/get", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ msg: input }),
      });

      const data = await response.text();
      const botTime = new Date();
      const botHour = botTime.getHours();
      const botMinute = botTime.getMinutes();

      const botMessage = {
        text: data,
        sender: "bot",
        time: `${botHour}:${botMinute}`,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error fetching bot response:", error);
      const errorMessage = {
        text: "Sorry, I'm having trouble connecting. Please try again.",
        sender: "bot",
        time: `${new Date().getHours()}:${new Date().getMinutes()}`,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-3xl px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            <span className="text-lime-500">OTP</span> Chatbot
          </h1>
          <p className="text-gray-600">Chat with our intelligent assistant</p>
        </div>

        <Card className="flex flex-col h-[32rem] shadow-xl border-2 border-lime-200 rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center gap-4 px-6 py-4 bg-gradient-to-r from-lime-50 to-green-50 rounded-t-2xl border-b -mt-6">
            <div className="relative">
              <img
                src="/OTPbankalogo.png"
                alt="Oti Avatar"
                className="w-14 h-14 rounded-full border-2 border-white shadow-md"
              />
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white"></span>
            </div>
            <div>
              <h2 className="font-bold text-lg text-black">
                Oti the AI Chatbot
              </h2>
              <p className="text-sm text-gray-600">
                Chat with our intelligent assistant
              </p>
            </div>
          </div>

          {/* Messages */}
          <CardContent className="flex-1 overflow-y-auto space-y-4 px-6 py-4 bg-white">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex items-end gap-2 ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.sender === "bot" && (
                  <img
                    src="/operator.jpg"
                    alt="Bot"
                    className="w-9 h-9 rounded-full border-2 border-white shadow-sm"
                  />
                )}

                <div className="relative max-w-[70%]">
                  <div
                    className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-lime-500 text-white rounded-br-md"
                        : "bg-white text-gray-800 border border-gray-200 rounded-bl-md shadow-sm"
                    }`}
                    dangerouslySetInnerHTML={{ __html: msg.text }}
                  />
                  <span
                    className={`absolute text-xs text-gray-400 mt-1 ${
                      msg.sender === "user" ? "right-0" : "left-0"
                    }`}
                  >
                    {msg.time}
                  </span>
                </div>

                {msg.sender === "user" && (
                  <img
                    src="/userIcon.png"
                    alt="User"
                    className="w-9 h-9 rounded-full border-2 border-white shadow-sm"
                  />
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start items-end gap-2">
                <img
                  src="/operator.jpg"
                  alt="Bot"
                  className="w-9 h-9 rounded-full border-2 border-white shadow-sm"
                />
                <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>

          {/* Input Form */}
          <form
            onSubmit={handleSubmit}
            className="p-4 bg-white border-t border-gray-200 rounded-b-2xl flex items-center gap-3"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-gray-50 text-black border-gray-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-lime-500 focus:border-transparent"
              placeholder="Type your message..."
              required
              disabled={isTyping}
            />
            <Button
              type="submit"
              disabled={isTyping || !input.trim()}
              className="bg-lime-500 hover:bg-lime-600 disabled:bg-gray-300 p-3 rounded-xl shadow-md transition-all duration-200"
            >
              <img src="/arrow.png" alt="Send" className="w-5 h-5" />
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
