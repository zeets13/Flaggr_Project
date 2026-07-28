import { motion } from "framer-motion";

export default function FeatureCard({icon,title,description}) {
    return (
        <motion.div
            whileHover={{
                y: -6,
                scale: 1
            }}
            transition={{
                duration: .30
            }}
            className="rounded-2xl sm:rounded-3xl bg-white/10 backdrop-blur-xl border border-white/10 px-5 py-4 sm:px-6 sm:py-5"
        >
            <div className="text-red-400">{icon}</div>
            <h3 className="text-white font-bold text-lg sm:text-xl mt-3 sm:mt-2">
                {title}
            </h3>
            <p className="text-gray-300 text-sm sm:text-base leading-6 sm:leading-7 mt-1">
                {description}
            </p>
        </motion.div>
    );
}