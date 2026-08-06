import { useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

export default function StarRating({
  value = 5,
  onChange,
  total = 5,
}) {
  const [hovered, setHovered] = useState(0);

  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }).map((_, index) => {
        const rating = index + 1;
        const active = hovered ? rating <= hovered : rating <= value;

        return (
          <motion.button
            key={rating}
            type="button"
            whileHover={{
              scale: 1.18,
              rotate: -8,
            }}
            whileTap={{
              scale: 0.92,
            }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 15,
            }}
            onMouseEnter={() => setHovered(rating)}
            onMouseLeave={() => setHovered(0)}
            onClick={() => onChange?.(rating)}
            className="group focus:outline-none"
            aria-label={`Rate ${rating} star${rating > 1 ? "s" : ""}`}
          >
            <motion.div
              animate={{
                scale: active ? 1.08 : 1,
              }}
              transition={{
                duration: 0.2,
              }}
            >
              <Star
                size={34}
                strokeWidth={2}
                className={`transition-all duration-300 ${
                  active
                    ? "fill-orange-500 text-orange-500 drop-shadow-[0_0_10px_rgba(249,115,22,.45)]"
                    : "text-slate-600 group-hover:text-orange-400"
                }`}
              />
            </motion.div>
          </motion.button>
        );
      })}

      <motion.span
        key={hovered || value}
        initial={{
          opacity: 0,
          x: 8,
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        className="ml-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-3 py-1 text-xs font-bold text-orange-400"
      >
        {hovered || value} / {total}
      </motion.span>
    </div>
  );
}