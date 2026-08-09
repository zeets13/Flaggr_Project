import ChatBubble from "./ChatBubble";
import ResultCard from "./ResultCard";
import { useEffect, useRef } from "react";
import TypingBubble from "./TypingBubble";
import EmptyState from "./EmptyState";

{/*export default function ChatWindow({messages, loading}) {
  const chatRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <main ref={chatRef} className="flex-1 overflow-y-auto px-8 py-8 pb-40">

      
            {messages.map((msg, index) => (

                <ChatBubble
                    key={index}
                    sender={msg.sender}
                    message={msg.text}
                    
                />

            ))}
            {loading && <TypingBubble />}

    

    </main>
  );
}
*/}



export default function ChatWindow({

    messages,

    loading, setInput

}) {

    const bottomRef = useRef(null);

    useEffect(() => {

        bottomRef.current?.scrollIntoView({

            behavior: "smooth"

        });

    }, [messages, loading]);

    return (

    <main
        className="
            flex-1
            overflow-y-auto
            scrollbar-thin
            scrollbar-thumb-transparent
        "
    >

        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

            {messages.length === 0 ? (

                <EmptyState setInput={setInput} />

            ) : (

                <>
                    {messages.map((msg, index) => (

                            msg.sender === "user"

                            ? (

                                <ChatBubble
                                    key={index}
                                    sender="user"
                                    message={msg.text}
                                />

                            )

                            : (

                                <ResultCard
                                    key={index}
                                    result={msg.data}
                                />

                            )

                        ))}

                    {loading && <TypingBubble />}

                    <div ref={bottomRef}></div>
                </>

            )}

        </div>

    </main>

);
}