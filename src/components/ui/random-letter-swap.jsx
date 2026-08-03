"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function RandomLetterSwap({
  label,
  className = "",
  staggerDuration = 0.025,
  transition = { duration: 0.6, type: "spring" },
  onClick,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const letters = label.split("");

  return (
    <motion.span
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className={cn("relative inline-flex overflow-hidden py-1 select-none", className)}
    >
      {letters.map((char, i) => {
        if (char === " ") {
          return (
            <span key={i} className="whitespace-pre">
              &nbsp;
            </span>
          );
        }

        return (
          <span key={i} className="relative inline-block overflow-hidden">
            <motion.span
              initial={{ y: 0 }}
              animate={{ y: isHovered ? "-100%" : 0 }}
              transition={{
                ...transition,
                delay: i * staggerDuration,
              }}
              className="inline-block"
            >
              {char}
            </motion.span>

            <motion.span
              initial={{ y: "100%" }}
              animate={{ y: isHovered ? 0 : "100%" }}
              transition={{
                ...transition,
                delay: i * staggerDuration,
              }}
              className="absolute left-0 top-0 inline-block text-orange-400 font-semibold"
            >
              {char}
            </motion.span>
          </span>
        );
      })}
    </motion.span>
  );
}

export default RandomLetterSwap;
