import { SendHorizontal } from "lucide-react";
import { FaPaperPlane } from "react-icons/fa";

export default function MessageInput({input,setInput,sendMessage}) {
  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-center p-5 backdrop-blur-lg">

      <div className="w-full max-w-5xl  bg-black rounded-xl flex items-center px-6 py-5">

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 bg-transparent outline-none text-white placeholder:text-gray-400"
        />

        <button className="cursor-pointer" onClick={sendMessage}>

          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-white">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
        </svg>

        

        </button>

      </div>

    </div>
  );
}