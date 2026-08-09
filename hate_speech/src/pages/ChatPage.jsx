import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";
import MessageInput from "../components/MessageInput";

import api from "../api/api";

export default function ChatPage() {

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [violationCount, setViolationCount] = useState(0);

  useEffect(() => {

    const loadUser = async () => {

        try {

            const response = await api.get("/current-user");

            if (!response.data.logged_in) {

                window.location.href = "/login";
                return;

            }

            setUsername(response.data.username);

            setViolationCount(
                response.data.violation_count
            );

        } catch (error) {

            console.error("Failed to load user:", error);

        }

    };

    loadUser();

}, []);
  


  const sendMessage = async () => {

    if (!input.trim()) return;

    const userMessage = input;

    setMessages(prev => [
        ...prev,
        {
            sender: "user",
            text: userMessage,
        },
    ]);

    setInput("");
    setLoading(true);

    try {

        const response = await api.post("/predict", {
            message: userMessage
        });

        await new Promise(
            resolve => setTimeout(resolve, 1200)
        );

        setMessages(prev => [
            ...prev,
            {
                sender: "bot",
                data: response.data,
            },
        ]);

        // Update violation count
        if (response.data.violations !== undefined) {

            setViolationCount(
                response.data.violations
            );

        }

    } catch (error) {

        console.error(error);

        setMessages(prev => [
            ...prev,
            {
                sender: "bot",
                text: "Sorry, something went wrong.",
            },
        ]);

    } finally {

        setLoading(false);

    }
};
{/*bg-gradient-to-br from-[#120b10] via-[#1d1717] to-[#2d0b17]*/}

  return (

    <section className="h-screen flex bg-black/95 overflow-hidden">

     {/*<Sidebar
    open={sidebarOpen}
    setOpen={setSidebarOpen}
/>*/}
      {/* Right Side */}
      <div className="flex-1 flex flex-col">

       <Navbar setSidebarOpen={setSidebarOpen} />

        {/* Chat */}
        <ChatWindow
          messages={messages}
          loading={loading}
          setInput={setInput}
        />

        {/* Input */}
        <MessageInput
          input={input}
          setInput={setInput}
          sendMessage={sendMessage}
        />

      </div>

    </section>

  );

}