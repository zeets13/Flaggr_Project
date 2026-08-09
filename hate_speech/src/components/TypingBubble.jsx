import { FaRobot } from "react-icons/fa";
import { motion } from "framer-motion";

export default function TypingBubble() {
  return (
    <div className="flex mb-6 gap-3 justify-start">

      <div className="h-14 w-14 rounded-full bg-[#4D1424] flex items-center justify-center">
                <FaRobot size={30} className="text-white" />
            </div>

      <div className=" bg-black backdrop-blur-lg rounded-2xl px-5 py-4 text-white shadow-lg">

        <div className="flex gap-2">

          {[0,1,2].map((i) => (
            <motion.span
              key={i}
              className="w-2 h-2 bg-white rounded-full"
              animate={{
                y: [0,-5,0],
                opacity: [0.4,1,0.4]
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}

        </div>

      </div>

    </div>
  );
}