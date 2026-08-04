import SectionHeader from "./SectionHeader";
import StatsBar from "./StatsBar";
import FeaturedTestimonial from "./FeaturedTestimonial";
import TestimonialsGrid from "./TestimonialsGrid";
import TestimonialsCTA from "./TestimonialsCTA";
import { featuredTestimonial, supportingTestimonials } from "./testimonialsData";

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative overflow-hidden bg-[#090909] py-14 lg:py-20">
      {/* Background Glow */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 h-[450px] w-[450px] -translate-x-1/2 rounded-full bg-orange-500/10 blur-[150px]"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-24 -right-20 h-[280px] w-[280px] rounded-full bg-orange-500/5 blur-[110px]"
      />

      {/* Background Watermark */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <h1
          className="
          select-none
          text-[90px]
          font-black
          uppercase
          tracking-widest
          text-white/[0.02]
          md:text-[150px]
          xl:text-[200px]
          "
        >
          BODYFIT
        </h1>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeader />

        <div className="mt-10">
          <StatsBar />
        </div>

        {featuredTestimonial && (
          <div className="mt-10">
            <FeaturedTestimonial {...featuredTestimonial} />
          </div>
        )}

        <div className="mt-6">
          <TestimonialsGrid testimonials={supportingTestimonials} />
        </div>

        <div className="mt-8">
          <TestimonialsCTA />
        </div>
      </div>
    </section>
  );
}
