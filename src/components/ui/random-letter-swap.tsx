"use client";

import { motion, type Transition } from "motion/react";
import * as React from "react";

import { cn } from "@/lib/utils";

interface RandomLetterSwapProps
  extends Omit<React.ComponentProps<"span">, "children"> {
  /** The text to render. Each character animates independently. */
  label: string;
  /** Swap the letters downward instead of upward. */
  reverse?: boolean;
  /** Seconds between each letter's start. The order is reshuffled on every hover. */
  staggerDuration?: number;
  /** Motion transition applied to every letter. */
  transition?: Transition;
}

/** Fisher-Yates shuffle: each letter gets a random position in the stagger queue. */
function randomizeDelays(length: number, staggerDuration: number) {
  const order = Array.from({ length }, (_, i) => i);

  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }

  const delays = new Array<number>(length);
  order.forEach((letterIndex, position) => {
    delays[letterIndex] = position * staggerDuration;
  });

  return delays;
}

function RandomLetterSwap({
  label,
  reverse = false,
  staggerDuration = 0.03,
  transition = { type: "spring", duration: 0.7, bounce: 0 },
  className,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  ...props
}: RandomLetterSwapProps) {
  const [isActive, setIsActive] = React.useState(false);
  const letters = React.useMemo(() => Array.from(label), [label]);

  // Deterministic on first paint (no hydration mismatch), reshuffled on each enter.
  const [delays, setDelays] = React.useState<number[]>(() =>
    letters.map((_, i) => i * staggerDuration)
  );
  const resolvedDelays =
    delays.length === letters.length
      ? delays
      : letters.map((_, i) => i * staggerDuration);

  const direction = reverse ? 1 : -1;

  const activate = () => {
    setDelays(randomizeDelays(letters.length, staggerDuration));
    setIsActive(true);
  };

  return (
    <span
      className={cn("relative inline-block select-none whitespace-nowrap", className)}
      onBlur={(e) => {
        setIsActive(false);
        onBlur?.(e);
      }}
      onFocus={(e) => {
        activate();
        onFocus?.(e);
      }}
      onMouseEnter={(e) => {
        activate();
        onMouseEnter?.(e);
      }}
      onMouseLeave={(e) => {
        setIsActive(false);
        onMouseLeave?.(e);
      }}
      {...props}
    >
      {/* Screen readers read the label once; the letter stacks are decorative. */}
      <span className="sr-only">{label}</span>

      {letters.map((letter, index) => {
        const character = letter === " " ? "\u00A0" : letter; // inline-block collapses real spaces
        const letterTransition = {
          ...transition,
          delay: resolvedDelays[index],
        };

        return (
          <span
            aria-hidden="true"
            className="relative inline-block overflow-hidden"
            // biome-ignore lint/suspicious/noArrayIndexKey: characters are not unique
            key={`${letter}-${index}`}
          >
            <motion.span
              animate={{ y: isActive ? `${direction * 100}%` : "0%" }}
              className="inline-block"
              transition={letterTransition}
            >
              {character}
            </motion.span>
            <motion.span
              animate={{ y: isActive ? "0%" : `${direction * -100}%` }}
              className="absolute top-0 left-0 inline-block"
              transition={letterTransition}
            >
              {character}
            </motion.span>
          </span>
        );
      })}
    </span>
  );
}

export { RandomLetterSwap, type RandomLetterSwapProps };
