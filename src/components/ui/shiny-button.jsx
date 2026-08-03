import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

const animationProps = {
  initial: { "--x": "100%", scale: 0.98 },
  animate: { "--x": "-100%", scale: 1 },
  whileTap: { scale: 0.95 },
  transition: {
    repeat: Infinity,
    repeatType: "loop",
    repeatDelay: 0.2,
    type: "spring",
    stiffness: 35,
    damping: 15,
    mass: 1,
    scale: {
      type: "spring",
      stiffness: 200,
      damping: 5,
      mass: 0.5,
    },
  },
};

export const ShinyButton = ({
  children,
  className = "",
  onClick,
  ...props
}) => {
  return (
    <motion.button
      {...animationProps}
      {...props}
      onClick={onClick}
      className={cn(
        "relative rounded-2xl px-8 py-4 font-black transition-all duration-300 ease-in-out hover:shadow-[0_0_35px_rgba(251,146,60,0.5)] active:scale-95 cursor-pointer flex items-center justify-center gap-3 overflow-hidden group border border-white/20",
        className
      )}
    >
      {/* High-intensity continuous light sheen beam */}
      <span
        aria-hidden="true"
        className="absolute inset-0 z-10 block pointer-events-none"
        style={{
          background:
            "linear-gradient(-75deg, transparent 20%, rgba(255,255,255,0.95) 50%, transparent 80%)",
          transform: "translateX(var(--x))",
          mixBlendMode: "overlay",
        }}
      />

      {/* Outer border sheen glow */}
      <span
        style={{
          mask: "linear-gradient(#000, #000) content-box, linear-gradient(#000, #000)",
          WebkitMask: "linear-gradient(#000, #000) content-box, linear-gradient(#000, #000)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
        }}
        className="absolute inset-0 z-20 block rounded-[inherit] bg-[linear-gradient(-75deg,rgba(255,255,255,0.2)_calc(var(--x)+10%),rgba(255,255,255,0.95)_calc(var(--x)+25%),rgba(255,255,255,0.2)_calc(var(--x)+40%))] p-[1.5px] pointer-events-none"
      />

      {/* Button Text & Icons Content */}
      <span className="relative z-30 flex items-center justify-center gap-3 text-base uppercase tracking-wider text-white font-black drop-shadow-md">
        {children}
      </span>
    </motion.button>
  );
};

export default ShinyButton;
