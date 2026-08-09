import { FaRobot } from "react-icons/fa";

export default function BotBubble({ children }) {
    return (
        <div className="flex items-start gap-3 mb-6">

            <div className="h-12 w-12 rounded-full bg-[#4D1424] flex items-center justify-center">
                <FaRobot size={25} className="text-white" />
            </div>

            <div className=" bg-black  backdrop-blur-lg rounded-2xl px-5 py-4 text-white max-w-xl shadow-lg">
                {children}
            </div>

        </div>
    );
}