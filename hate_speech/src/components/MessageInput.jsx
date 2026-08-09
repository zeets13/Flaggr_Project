export default function MessageInput({
  input,
  setInput,
  sendMessage,
}) {

  return (

    <div className="sticky bottom-0 w-full px-4 sm:px-6 lg:px-8 pb-5 pt-3 bg] via-[#120b10]/95 to-transparent backdrop-blur-xl">

      <div className="mx-auto w-full max-w-5xl mb-6">

        <div
          className="
            flex
            items-center
            gap-4
            rounded-2xl
            border
            border-white/10
            bg-black/60
            backdrop-blur-xl
            px-6
            py-4
            shadow-2xl
          "
        >

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
            placeholder="Type your message..."
            className="
              flex-1
              bg-transparent
              text-white
              placeholder:text-gray-400
              outline-none
            "
          />

          <button
            onClick={sendMessage}
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-full
              bg-gradient-to-r
              from-red-700
              to-red-900
              text-white
              transition-all
              duration-300
              hover:scale-105
              hover:shadow-lg
              active:scale-95
            "
          >

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12 3.269 3.125A59.769 59.769 0 0121.485 12 59.768 59.768 0 013.27 20.875L6 12Zm0 0h7.5"
              />
            </svg>

          </button>

        </div>

      </div>

    </div>

  );

}