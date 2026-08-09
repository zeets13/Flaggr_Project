import { FaRobot } from "react-icons/fa";
import UserBubble from "./UserBubble";
import BotBubble from "./BotBubble";
import { motion } from "framer-motion";

export default function ChatBubble({ sender, message }) {
  const isUser = sender === "user";

  if (sender === "user") {
    return (
      <motion.div
    initial={{
        opacity: 0,
        y: 12,
        scale: 0.98
    }}
    animate={{
        opacity: 1,
        y: 0,
        scale: 1
    }}
    transition={{
        duration: 0.50,
        ease: "easeOut"
    }}
    className="flex mb-6 justify-end"
    >
        <UserBubble message={message} />
    </motion.div>
        )
      
      }

  return (
      <div
    className= "flex mb-6 justify-start"
>

    
    <BotBubble>
      {message}
    </BotBubble>
    </div>
  );
}