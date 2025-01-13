import React from "react";
import { motion } from "framer-motion";

export const TweetInputs = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="absolute bottom-56 right-44"
    >
      <div className="w-full bg-[#441752] p-5 rounded-lg">
        <p className="text-white text-5xl font-bold">Inbox</p>
        <div className="text-white text-xl p-5">
          <div className="flex flex-row items-center gap-2">
            <img src="d" />
            <p>0x000</p>
          </div>
          <div className="w-80 line-clamp-4">
            <p>
              I got rugged buying 3 tokens this week I didn’t get on X and call
              anyone a farmer I didn’t bitch or complain I made a choice to
              gamble, I lost money. It happens. Bitching and crying will NOT
              bring the Solana back. 🤒
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
