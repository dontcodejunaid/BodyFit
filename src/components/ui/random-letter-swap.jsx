import React, { useState } from "react";
import { motion, useAnimate } from "framer-motion";
import { cn } from "../../lib/utils";

/**
 * Text that scrambles its letters upward in a random order on hover.
 * Each character renders twice (stacked vertically) inside an overflow-hidden
 * cell, so sliding the pair up swaps the visible glyph seamlessly.
 */
export const RandomLetterSwap = ({
  label,
  as: Component = "span",
  className = "",
  staggerDuration = 0.03,
  transition = { type: "spring", duration: 0.7 },
  onClick,
  ...props
}) => {
  const [scope, animate] = useAnimate();
  const [isHovered, setIsHovered] = useState(false);

  const withDelay = (delay) => ({ ...transition, delay });

  const hoverStart = () => {
    if (isHovered) return;
    setIsHovered(true);

    // Shuffle the character order so the swap ripples unpredictably.
    const shuffled = Array.from({ length: label.length }, (_, i) => i)
      .sort(() => Math.random() - 0.5);

    shuffled.forEach((index, order) => {
      const delay = order * staggerDuration;
      animate(`.letter-${index}`, { y: "-100%" }, withDelay(delay));
      animate(`.letter-secondary-${index}`, { top: "0%" }, withDelay(delay));
    });
  };

  const hoverEnd = () => {
    setIsHovered(false);

    const shuffled = Array.from({ length: label.length }, (_, i) => i)
      .sort(() => Math.random() - 0.5);

    shuffled.forEach((index, order) => {
      const delay = order * staggerDuration;
      animate(`.letter-${index}`, { y: 0 }, withDelay(delay));
      animate(`.letter-secondary-${index}`, { top: "100%" }, withDelay(delay));
    });
  };

  return (
    <Component
      ref={scope}
      onMouseEnter={hoverStart}
      onMouseLeave={hoverEnd}
      onFocus={hoverStart}
      onBlur={hoverEnd}
      onClick={onClick}
      className={cn(
        "relative flex items-center justify-center overflow-hidden",
        className
      )}
      {...props}
    >
      {/* Screen readers get the clean label; the split glyphs are decorative. */}
      <span className="sr-only">{label}</span>

      {label.split("").map((letter, i) => (
        <span
          aria-hidden="true"
          className="relative flex whitespace-pre"
          key={`${letter}-${i}`}
        >
          <motion.span className={`relative letter-${i}`}>{letter}</motion.span>
          <motion.span
            className={`absolute letter-secondary-${i}`}
            style={{ top: "100%" }}
          >
            {letter}
          </motion.span>
        </span>
      ))}
    </Component>
  );
};

export default RandomLetterSwap;
