import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Features from "../pages/Features";
import {Brain,ShieldAlert,Sparkles}from "lucide-react";

export default function Hero() {
    const navigate = useNavigate();
    return (
        <section className="flex flex-col justify-between px-4 sm:px-6 lg:px-10">
            <div className="flex flex-col items-center text-center">

                <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ repeat: Infinity, duration: 4 }}
                    className="mt-8"
                >
                    <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full bg-red-500/20 backdrop-blur-xl flex items-center justify-center border border-red-500/30">
                        <ShieldCheck
                            size={40}
                            className="text-red-400 sm:size-12 lg:size-14"
                        />
                    </div>
                </motion.div>
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white mt-5">
                    Welcome to <span className="text-red-400"> Flaggr</span>    
                </h1>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl text-white mt-3 font-semibold">
                    We listen. We judge.
                </h2>
                <div className="flex gap-5 mt-8">
                    <button
                        onClick={() =>navigate("/chat")}
                        className="px-6 sm:px-8 py-3 rounded-full bg-red-500 hover:bg-red-600 transition font-semibold text-white"
                    >
                        Try Flaggr
                    </button>
                </div>

            </div>
           <Features/>
        </section>
    );
}