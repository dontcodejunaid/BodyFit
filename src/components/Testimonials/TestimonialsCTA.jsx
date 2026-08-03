import { motion } from "framer-motion";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoFitnessOutline } from "react-icons/io5";

export default function TestimonialsCTA() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      aria-label="Join BodyFit call to action"
      className="
      relative
      overflow-hidden
      rounded-[36px]
      border
      border-orange-500/20
      bg-gradient-to-br
      from-orange-500
      via-orange-600
      to-orange-700
      p-8
      shadow-[0_25px_80px_rgba(249,115,22,.35)]
      md:p-12
      lg:p-14
      "
    >
      {/* Background Glow */}
      <div aria-hidden="true" className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      <div aria-hidden="true" className="absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-black/10 blur-3xl" />

      <div className="relative z-10 flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
        {/* Left Side */}
        <div className="max-w-2xl">
          <div
            className="
            inline-flex
            items-center
            gap-2
            rounded-full
            bg-white/15
            backdrop-blur-md
            px-5
            py-2
            text-sm
            font-semibold
            text-white
            "
          >
            <IoFitnessOutline className="text-lg" aria-hidden="true" />
            Start Your Fitness Journey
          </div>

          <h2 className="mt-6 text-4xl font-black leading-tight text-white md:text-5xl">
            Your Success Story
            <br />
            Starts Today.
          </h2>

          <p className="mt-5 max-w-xl text-base leading-8 text-white/90 md:text-lg">
            Join thousands of members who transformed their bodies, improved their
            confidence, and built healthier lifestyles with BodyFit.
          </p>
        </div>

        {/* Right Side */}
        <div className="flex flex-col gap-5">
          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className="
            group
            inline-flex
            items-center
            justify-center
            gap-3
            rounded-full
            bg-white
            px-8
            py-4
            text-lg
            font-bold
            text-orange-600
            transition-all
            duration-300
            hover:shadow-2xl
            focus-visible:outline
            focus-visible:outline-2
            focus-visible:outline-offset-2
            focus-visible:outline-white
            "
          >
            Join Now
            <FaArrowRightLong
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </motion.button>

          <p className="text-center text-sm text-white/80">
            No Joining Fee &bull; Free Trial Available
          </p>
        </div>
      </div>
    </motion.section>
  );
}
