import SectionHeader from "./SectionHeader";
import StatsBar from "./StatsBar";
import FeaturedTestimonial from "./FeaturedTestimonial";
import TestimonialsGrid from "./TestimonialsGrid";
import TestimonialsCTA from "./TestimonialsCTA";
import { featuredTestimonial, supportingTestimonials } from "./testimonialsData";

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative overflow-hidden bg-[#090909] py-24 lg:py-32">
      {/* Background Glow */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 h-[650px] w-[650px] -translate-x-1/2 rounded-full bg-orange-500/10 blur-[170px]"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-32 -right-20 h-[350px] w-[350px] rounded-full bg-orange-500/5 blur-[130px]"
      />

      {/* Background Watermark */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <h1
          className="
          select-none
          text-[120px]
          font-black
          uppercase
          tracking-widest
          text-white/[0.02]
          md:text-[200px]
          xl:text-[260px]
          "
        >
          BODYFIT
        </h1>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeader />

        <div className="mt-20">
          <StatsBar />
        </div>

        {featuredTestimonial && (
          <div className="mt-20">
            <FeaturedTestimonial {...featuredTestimonial} />
          </div>
        )}

        <div className="mt-8">
          <TestimonialsGrid testimonials={supportingTestimonials} />
        </div>

        <div className="mt-16">
          <TestimonialsCTA />
        </div>
      </div>
    </section>
  );
}
