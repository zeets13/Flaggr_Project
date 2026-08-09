import { FaShieldAlt } from "react-icons/fa";
import { motion } from "framer-motion";

export default function EmptyState({ setInput }) {

    const suggestions = [
        "I hate everyone.",
        "You're so stupid.",
        "Have a wonderful day!"
    ];

    return (

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}

            className="
                flex
                flex-col
                items-center
                justify-center
                h-full
                w-full
                px-6
                text-center mt-20
            "
        >

            {/* Logo */}
            <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                    repeat: Infinity,
                    duration: 4
                }}
            >

                <div className="
                    w-20
                    h-20
                    rounded-full
                    bg-red-500/20
                    border
                    border-red-500/30
                    flex
                    items-center
                    justify-center
                    shadow-xl
                ">

                    <FaShieldAlt className="text-white text-4xl" />

                </div>

            </motion.div>


            {/* Heading */}
            <h1 className="
                mt-8
                text-5xl
                font-bold
                text-white
            ">

                Hello, I'm Flaggr

            </h1>


            {/* Subtitle */}
            <p className="
                mt-5
                max-w-xl
                text-gray-300
                leading-8
            ">

                Try sending a message and I will detect it for you.

            </p>


            {/* Suggestions intentionally disabled */}

            {/*
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 w-full max-w-4xl">

                {suggestions.map((item) => (

                    <button
                        key={item}
                        onClick={() => setInput(item)}
                        className="
                            bg-white/5
                            hover:bg-white/10
                            border
                            border-white/10
                            rounded-2xl
                            p-5
                            text-left
                            transition-all
                            duration-300
                            hover:-translate-y-1
                            hover:border-red-500/50
                            backdrop-blur-lg
                        "
                    >

                        <p className="text-gray-200">
                            {item}
                        </p>

                    </button>

                ))}

            </div>
            */}

        </motion.div>
    );
}