import { motion } from "framer-motion";
import { HiMiniSparkles, HiOutlineShieldCheck } from "react-icons/hi2";

const trustFeatures = ["Certified Trainers", "Modern Equipment", "Personal Coaching"];

export default function SectionHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 45 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
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
        px-5
        py-2
        text-sm
        font-semibold
        text-orange-400
        backdrop-blur-xl
        "
      >
        <HiOutlineShieldCheck className="text-lg" aria-hidden="true" />
        Trusted by 15,000+ Members
        <HiMiniSparkles className="text-base" aria-hidden="true" />
      </div>

      {/* Small Title */}
      <p
        className="
        mt-8
        uppercase
        tracking-[0.35em]
        text-orange-500
        font-bold
        text-sm
        "
      >
        Testimonials
      </p>

      {/* Main Heading */}
      <h2
        className="
        mt-5
        text-4xl
        sm:text-5xl
        lg:text-6xl
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
        mt-8
        max-w-2xl
        text-base
        leading-8
        text-zinc-400
        md:text-lg
        "
      >
        Every transformation starts with a single step. Discover how BodyFit has helped
        members build strength, lose weight, boost confidence, and create healthier
        lifestyles through expert coaching and consistent support.
      </p>

      {/* Trust Features */}
      <ul className="mt-10 flex flex-wrap items-center justify-center gap-4" aria-label="Why members trust BodyFit">
        {trustFeatures.map((item) => (
          <li
            key={item}
            className="
            rounded-full
            border
            border-zinc-800
            bg-zinc-900/60
            px-5
            py-3
            text-sm
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
