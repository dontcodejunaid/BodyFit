import { motion } from "framer-motion";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import { BsQuote } from "react-icons/bs";
import { HiMiniSparkles } from "react-icons/hi2";
import { getRatingStars } from "../utils/getRatingStars";

const starIconMap = {
  full: FaStar,
  half: FaStarHalfAlt,
  empty: FaRegStar,
};

export default function FeaturedTestimonial({ name, role, review, result, duration, rating, initials, accent }) {
  const { stars, label } = getRatingStars(rating);

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      className="
      relative
      overflow-hidden
      rounded-[28px]
      border
      border-orange-500/25
      bg-gradient-to-br
      from-zinc-900/90
      via-zinc-900/70
      to-zinc-950/90
      backdrop-blur-2xl
      p-5
      sm:p-6
      lg:p-8
      shadow-[0_20px_60px_rgba(0,0,0,.5)]
      "
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="absolute -top-20 -left-14 h-56 w-56 rounded-full bg-orange-500/20 blur-[110px]"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-20 -right-8 h-48 w-48 rounded-full bg-orange-600/10 blur-[100px]"
      />

      <div className="relative z-10 grid gap-6 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
        {/* Left: Quote */}
        <div>
          <span
            className="
            inline-flex
            items-center
            gap-2
            rounded-full
            border
            border-orange-500/30
            bg-orange-500/10
            px-4
            py-1.5
            text-xs
            font-semibold
            text-orange-400
            "
          >
            <HiMiniSparkles aria-hidden="true" />
            Member Spotlight
          </span>

          <BsQuote
            aria-hidden="true"
            className="mt-3 text-3xl opacity-20 text-orange-500/20"
          />

          <p
            className="
            mt-3
            text-xl
            sm:text-2xl
            lg:text-[1.55rem]
            font-semibold
            leading-[1.4]
            tracking-tight
            text-white
            "
          >
            &ldquo;{review}&rdquo;
          </p>

          <div className="mt-5 flex items-center gap-4">
            <div
              aria-hidden="true"
              className={`
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-gradient-to-br
              ${accent || "from-orange-500 to-orange-600"}
              text-sm
              font-bold
              text-white
              ring-4
              ring-orange-500/10
              `}
            >
              {initials}
            </div>

            <div>
              <h3 className="text-white text-lg font-bold tracking-wide">{name}</h3>
              <p className="mt-0.5 text-zinc-400 text-xs">{role}</p>
            </div>

            <div
              className="ml-auto hidden sm:flex gap-1 text-amber-400"
              role="img"
              aria-label={label}
            >
              {stars.map((type, index) => {
                const StarIcon = starIconMap[type];
                return <StarIcon key={index} className="text-sm" aria-hidden="true" />;
              })}
            </div>
          </div>
        </div>

        {/* Right: Result panel */}
        <div
          className="
          relative
          overflow-hidden
          rounded-2xl
          border
          border-orange-500/20
          bg-black/40
          p-5
          text-center
          lg:p-6
          "
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-b from-orange-500/10 via-transparent to-transparent"
          />

          <div className="relative z-10">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-orange-500">
              The Result
            </p>

            <p
              className="
              mt-3
              bg-gradient-to-r
              from-orange-400
              via-orange-500
              to-orange-600
              bg-clip-text
              text-3xl
              font-black
              leading-none
              text-transparent
              sm:text-4xl
              "
            >
              {result}
            </p>

            <p className="mt-3 text-sm text-zinc-400">
              in just <span className="font-semibold text-white">{duration}</span>
            </p>

            <div className="mt-5 flex sm:hidden justify-center gap-1 text-amber-400" role="img" aria-label={label}>
              {stars.map((type, index) => {
                const StarIcon = starIconMap[type];
                return <StarIcon key={index} aria-hidden="true" />;
              })}
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
