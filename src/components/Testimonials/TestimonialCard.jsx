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
      whileHover={{ y: -10 }}
      className="
      group
      relative
      h-full
      overflow-hidden
      rounded-3xl
      border
      border-orange-500/15
      bg-zinc-900/70
      backdrop-blur-xl
      p-7
      transition-all
      duration-500
      hover:border-orange-500
      hover:shadow-[0_0_45px_rgba(249,115,22,.30)]
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
          w-14
          h-14
          rounded-2xl
          flex
          items-center
          justify-center
          bg-orange-500/15
          text-orange-500
          text-3xl
          "
        >
          <BsQuote />
        </div>

        <div className="flex gap-1 text-amber-400" role="img" aria-label={label}>
          {stars.map((type, index) => {
            const StarIcon = starIconMap[type];
            return <StarIcon key={index} className="text-sm" aria-hidden="true" />;
          })}
        </div>
      </div>

      {/* Review */}
      <p className="relative z-10 mt-7 text-zinc-300 leading-8 text-[15px] md:text-base">
        &ldquo;{review}&rdquo;
      </p>

      {/* Divider */}
      <div className="relative z-10 my-7 border-t border-zinc-800" />

      {/* Identity */}
      <div className="relative z-10 flex items-center gap-4">
        <div
          aria-hidden="true"
          className={`
          flex
          h-12
          w-12
          shrink-0
          items-center
          justify-center
          rounded-full
          bg-gradient-to-br
          ${accent || "from-orange-500 to-orange-600"}
          text-sm
          font-bold
          text-white
          `}
        >
          {initials}
        </div>

        <div>
          <h3 className="text-white text-lg font-bold tracking-wide">{name}</h3>
          <p className="mt-0.5 text-zinc-400 text-sm">{role}</p>
        </div>
      </div>

      {/* Achievement */}
      <div className="relative z-10 mt-7 flex flex-wrap gap-3">
        <span
          className="
          inline-flex
          items-center
          gap-2
          rounded-full
          bg-orange-500/15
          px-4
          py-2
          text-sm
          font-semibold
          text-orange-400
          "
        >
          <HiMiniSparkles aria-hidden="true" />
          {result}
        </span>

        <span className="rounded-full border border-zinc-700 px-4 py-2 text-sm text-zinc-400">
          {duration}
        </span>
      </div>

      {/* Decorative Accent */}
      <div
        aria-hidden="true"
        className="
        absolute
        -right-12
        -bottom-12
        h-40
        w-40
        rounded-full
        bg-orange-500/10
        blur-3xl
        transition-all
        duration-500
        group-hover:bg-orange-500/20
        "
      />
    </motion.article>
  );
}
