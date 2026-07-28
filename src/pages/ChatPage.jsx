import Navbar from "../components/Navbar";
import ChatWindow from "../components/ChatWindow";
import MessageInput from "../components/MessageInput";

import { useState } from "react";
import api from "../api/api";

export default function ChatPage() {

  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello! I'm Flaggr AI. Paste a message below and I'll analyze it for harmful language."
    }
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {

    if (!input.trim()) return;

    const userMessage = input;

    setMessages(prev => [
      ...prev,
      {
        sender: "user",
        text: userMessage
      }
    ]);

    setInput("");

    setLoading(true);

    try {

      const response = await api.post("/predict", {
        text: userMessage
      });

      await new Promise(resolve => setTimeout(resolve, 1200));

      setMessages(prev => [
        ...prev,
        {
          sender: "bot",
          text: response.data.message
        }
      ]);

    }

    catch {

      setMessages(prev => [
        ...prev,
        {
          sender: "bot",
          text: "Sorry, something went wrong."
        }
      ]);

    }

    finally {

      setLoading(false);

    }

  };

  return (

    <section className="h-screen bg-gradient-to-br from-[#120b10] via-[#1d1717] to-[#2d0b17] flex flex-col">

      <Navbar />

      {/* Chat Area */}

      <div className="flex-1 flex flex-col overflow-hidden">

        <ChatWindow

          messages={messages}
          loading={loading}

        />

        <MessageInput

          input={input}
          setInput={setInput}
          sendMessage={sendMessage}

        />

      </div>

    </section>

  );

}