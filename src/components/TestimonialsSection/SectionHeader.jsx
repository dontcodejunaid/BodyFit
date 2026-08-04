import { motion } from "framer-motion";
import { HiMiniSparkles, HiOutlineShieldCheck } from "react-icons/hi2";

const trustFeatures = ["Certified Trainers", "Modern Equipment", "Personal Coaching"];

export default function SectionHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mx-auto max-w-3xl text-center"
    >
      {/* Premium Badge */}
      <div
        className="
        inline-flex
        items-center
        gap-2
        rounded-full
        border
        border-orange-500/20
        bg-orange-500/10
        px-4
        py-1.5
        text-xs
        font-semibold
        text-orange-400
        backdrop-blur-xl
        "
      >
        <HiOutlineShieldCheck className="text-base" aria-hidden="true" />
        Trusted by 15,000+ Members
        <HiMiniSparkles className="text-sm" aria-hidden="true" />
      </div>

      {/* Small Title */}
      <p
        className="
        mt-4
        uppercase
        tracking-[0.35em]
        text-orange-500
        font-bold
        text-xs
        "
      >
        Testimonials
      </p>

      {/* Main Heading */}
      <h2
        className="
        mt-3
        text-3xl
        sm:text-4xl
        lg:text-5xl
        font-black
        leading-tight
        tracking-tight
        text-white
        "
      >
        Real People.
        <span
          className="
          block
          bg-gradient-to-r
          from-orange-400
          via-orange-500
          to-orange-600
          bg-clip-text
          text-transparent
          "
        >
          Real Results.
        </span>
      </h2>

      {/* Description */}
      <p
        className="
        mx-auto
        mt-4
        max-w-2xl
        text-sm
        leading-7
        text-zinc-400
        md:text-base
        "
      >
        Every transformation starts with a single step. Discover how BodyFit has helped
        members build strength, lose weight, boost confidence, and create healthier
        lifestyles through expert coaching and consistent support.
      </p>

      {/* Trust Features */}
      <ul className="mt-6 flex flex-wrap items-center justify-center gap-3" aria-label="Why members trust BodyFit">
        {trustFeatures.map((item) => (
          <li
            key={item}
            className="
            rounded-full
            border
            border-zinc-800
            bg-zinc-900/60
            px-4
            py-2
            text-xs
            text-zinc-300
            backdrop-blur-md
            transition-all
            duration-300
            hover:border-orange-500/30
            hover:text-orange-400
            "
          >
            {item}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
