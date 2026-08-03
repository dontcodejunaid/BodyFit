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
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7 }}
      className="
      relative
      overflow-hidden
      rounded-[36px]
      border
      border-orange-500/25
      bg-gradient-to-br
      from-zinc-900/90
      via-zinc-900/70
      to-zinc-950/90
      backdrop-blur-2xl
      p-8
      sm:p-12
      lg:p-16
      shadow-[0_30px_90px_rgba(0,0,0,.55)]
      "
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="absolute -top-24 -left-16 h-72 w-72 rounded-full bg-orange-500/20 blur-[130px]"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-24 -right-10 h-64 w-64 rounded-full bg-orange-600/10 blur-[120px]"
      />

      <div className="relative z-10 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
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
            px-5
            py-2
            text-sm
            font-semibold
            text-orange-400
            "
          >
            <HiMiniSparkles aria-hidden="true" />
            Member Spotlight
          </span>

          <BsQuote
            aria-hidden="true"
            className="mt-8 text-6xl text-orange-500/25"
          />

          <p
            className="
            mt-4
            text-2xl
            sm:text-3xl
            lg:text-[2.15rem]
            font-semibold
            leading-[1.4]
            tracking-tight
            text-white
            "
          >
            &ldquo;{review}&rdquo;
          </p>

          <div className="mt-10 flex items-center gap-4">
            <div
              aria-hidden="true"
              className={`
              flex
              h-16
              w-16
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-gradient-to-br
              ${accent || "from-orange-500 to-orange-600"}
              text-lg
              font-bold
              text-white
              ring-4
              ring-orange-500/10
              `}
            >
              {initials}
            </div>

            <div>
              <h3 className="text-white text-xl font-bold tracking-wide">{name}</h3>
              <p className="mt-1 text-zinc-400 text-sm">{role}</p>
            </div>

            <div
              className="ml-auto hidden sm:flex gap-1 text-amber-400"
              role="img"
              aria-label={label}
            >
              {stars.map((type, index) => {
                const StarIcon = starIconMap[type];
                return <StarIcon key={index} aria-hidden="true" />;
              })}
            </div>
          </div>
        </div>

        {/* Right: Result panel */}
        <div
          className="
          relative
          overflow-hidden
          rounded-3xl
          border
          border-orange-500/20
          bg-black/40
          p-8
          text-center
          lg:p-10
          "
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-b from-orange-500/10 via-transparent to-transparent"
          />

          <div className="relative z-10">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-500">
              The Result
            </p>

            <p
              className="
              mt-6
              bg-gradient-to-r
              from-orange-400
              via-orange-500
              to-orange-600
              bg-clip-text
              text-5xl
              font-black
              leading-none
              text-transparent
              sm:text-6xl
              "
            >
              {result}
            </p>

            <p className="mt-4 text-zinc-400">
              in just <span className="font-semibold text-white">{duration}</span>
            </p>

            <div className="mt-8 flex sm:hidden justify-center gap-1 text-amber-400" role="img" aria-label={label}>
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
