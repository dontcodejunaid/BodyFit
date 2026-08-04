import { motion } from "framer-motion";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import { HiMiniSparkles } from "react-icons/hi2";
import { BsQuote } from "react-icons/bs";
import { getRatingStars } from "../utils/getRatingStars";

const starIconMap = {
  full: FaStar,
  half: FaStarHalfAlt,
  empty: FaRegStar,
};

export default function TestimonialCard({ name, role, review, result, duration, rating, initials, accent }) {
  const { stars, label } = getRatingStars(rating);

  return (
    <motion.article
      whileHover={{ y: -6 }}
      className="
      group
      relative
      h-full
      overflow-hidden
      rounded-2xl
      border
      border-orange-500/15
      bg-zinc-900/70
      backdrop-blur-xl
      p-5
      transition-all
      duration-500
      hover:border-orange-500
      hover:shadow-[0_0_30px_rgba(249,115,22,.25)]
      "
    >
      {/* Hover Glow */}
      <div
        aria-hidden="true"
        className="
        absolute
        inset-0
        opacity-0
        group-hover:opacity-100
        transition-opacity
        duration-500
        bg-gradient-to-br
        from-orange-500/10
        via-transparent
        to-transparent
        "
      />

      <div className="relative z-10 flex items-center justify-between">
        <div
          aria-hidden="true"
          className="
          w-10
          h-10
          rounded-xl
          flex
          items-center
          justify-center
          bg-orange-500/15
          text-orange-500
          text-xl
          "
        >
          <BsQuote />
        </div>

        <div className="flex gap-0.5 text-amber-400" role="img" aria-label={label}>
          {stars.map((type, index) => {
            const StarIcon = starIconMap[type];
            return <StarIcon key={index} className="text-xs" aria-hidden="true" />;
          })}
        </div>
      </div>

      {/* Review */}
      <p className="relative z-10 mt-4 line-clamp-4 text-zinc-300 leading-6 text-sm">
        &ldquo;{review}&rdquo;
      </p>

      {/* Divider */}
      <div className="relative z-10 my-4 border-t border-zinc-800" />

      {/* Identity */}
      <div className="relative z-10 flex items-center gap-3">
        <div
          aria-hidden="true"
          className={`
          flex
          h-10
          w-10
          shrink-0
          items-center
          justify-center
          rounded-full
          bg-gradient-to-br
          ${accent || "from-orange-500 to-orange-600"}
          text-xs
          font-bold
          text-white
          `}
        >
          {initials}
        </div>

        <div>
          <h3 className="text-white text-sm font-bold tracking-wide">{name}</h3>
          <p className="mt-0.5 text-zinc-400 text-xs">{role}</p>
        </div>
      </div>

      {/* Achievement */}
      <div className="relative z-10 mt-4 flex flex-wrap gap-2">
        <span
          className="
          inline-flex
          items-center
          gap-1.5
          rounded-full
          bg-orange-500/15
          px-3
          py-1.5
          text-xs
          font-semibold
          text-orange-400
          "
        >
          <HiMiniSparkles className="text-[11px]" aria-hidden="true" />
          {result}
        </span>

        <span className="rounded-full border border-zinc-700 px-3 py-1.5 text-xs text-zinc-400">
          {duration}
        </span>
      </div>

      {/* Decorative Accent */}
      <div
        aria-hidden="true"
        className="
        absolute
        -right-10
        -bottom-10
        h-28
        w-28
        rounded-full
        bg-orange-500/10
        blur-2xl
        transition-all
        duration-500
        group-hover:bg-orange-500/20
        "
      />
    </motion.article>
  );
}
