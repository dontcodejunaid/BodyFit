import { motion } from "framer-motion";
import TestimonialCard from "./TestimonialCard";

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function TestimonialsGrid({ testimonials }) {
  return (
    <motion.ul
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={container}
      aria-label="Member testimonials"
      className="grid grid-cols-1 gap-4 md:grid-cols-3"
    >
      {testimonials.map((testimonial) => (
        <motion.li key={testimonial.id} variants={item} className="list-none">
          <TestimonialCard {...testimonial} />
        </motion.li>
      ))}
    </motion.ul>
  );
}
