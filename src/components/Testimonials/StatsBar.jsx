import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { HiOutlineUsers, HiOutlineTrophy } from "react-icons/hi2";
import { IoBarbellOutline } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import useCountUp from "../hooks/useCountUp";
import { stats } from "./testimonialsData";

const iconMap = {
  users: HiOutlineUsers,
  trophy: HiOutlineTrophy,
  fire: IoBarbellOutline,
  star: FaStar,
};

function StatCard({ item, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });
  const animatedValue = useCountUp(item.value, isInView);
  const Icon = iconMap[item.icon];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 45 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      whileHover={{ y: -8 }}
      className="
      group
      relative
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
      hover:shadow-[0_0_40px_rgba(249,115,22,.25)]
      "
    >
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

      <div className="relative z-10">
        <div
          className="
          w-16
          h-16
          rounded-2xl
          bg-gradient-to-br
          from-orange-500
          to-orange-600
          flex
          items-center
          justify-center
          text-white
          text-3xl
          shadow-lg
          shadow-orange-500/30
          "
        >
          <Icon aria-hidden="true" />
        </div>

        <h3
          className="
          mt-6
          text-3xl
          md:text-4xl
          font-extrabold
          text-white
          tracking-tight
          tabular-nums
          "
        >
          {animatedValue}
        </h3>

        <p className="mt-2 text-sm md:text-base text-zinc-400 leading-relaxed">
          {item.label}
        </p>
      </div>
    </motion.div>
  );
}

export default function StatsBar() {
  return (
    <section className="w-full" aria-label="BodyFit membership statistics">
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-5">
        {stats.map((item, index) => (
          <StatCard key={item.id} item={item} index={index} />
        ))}
      </div>
    </section>
  );
}
