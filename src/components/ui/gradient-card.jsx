import * as React from "react";
import { cva } from "class-variance-authority";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "../../lib/utils";

// Converted from gradient-card.tsx — this project is JavaScript, with no
// typescript dependency and no tsconfig, so the .tsx file compiled with its
// types stripped and never type-checked. Keeping it as .jsx matches every
// other component here. The VariantProps/GradientCardProps types are dropped;
// the props themselves are unchanged.

// Compact variant with sleek orange glow for desktop viewports
const cardVariants = cva(
  "relative flex flex-col justify-between h-full w-full overflow-hidden rounded-2xl p-5 sm:p-6 shadow-md transition-all duration-300 hover:shadow-2xl shadow-orange-500/10 hover:shadow-orange-500/25 border border-slate-800/80 hover:border-orange-500/50 backdrop-blur-md",
  {
    variants: {
      gradient: {
        orange: "bg-gradient-to-br from-orange-950/90 via-slate-900 to-amber-950/70 text-slate-100 shadow-orange-500/20 border-orange-500/40",
        gray: "bg-gradient-to-br from-slate-900 via-slate-900/95 to-slate-950 text-slate-100",
        purple: "bg-gradient-to-br from-purple-950/80 via-slate-900 to-indigo-950/70 text-slate-100",
        green: "bg-gradient-to-br from-emerald-950/80 via-slate-900 to-teal-950/70 text-slate-100",
      },
    },
    defaultVariants: {
      gradient: "gray",
    },
  }
);

const GradientCard = React.forwardRef(
  ({ className, gradient, badgeText, badgeColor, title, description, ctaText, ctaHref, onCtaClick, imageUrl, children, ...props }, ref) => {

    const cardAnimation = {
      rest: { scale: 1, y: 0 },
      hover: { scale: 1.02, y: -3 },
    };

    const imageAnimation = {
      rest: { scale: 1, rotate: 0 },
      hover: { scale: 1.08, rotate: 2 },
    };

    return (
      <motion.div
        variants={cardAnimation}
        initial="rest"
        whileHover="hover"
        animate="rest"
        className="h-full"
        ref={ref}
      >
        <div
          className={cn(cardVariants({ gradient }), className)}
          {...props}
        >
          {/* Decorative background image with animation */}
          {imageUrl && (
            <motion.img
              src={imageUrl}
              alt=""
              aria-hidden="true"
              variants={imageAnimation}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="absolute -right-1/4 -bottom-1/4 w-3/4 opacity-20 pointer-events-none mix-blend-luminosity"
            />
          )}

          {/* Card Content */}
          <div className="z-10 flex flex-col h-full justify-between">
            <div>
              {/* Badge */}
              <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-slate-950/80 border border-slate-700/60 px-2.5 py-0.5 text-[11px] font-bold text-slate-200 backdrop-blur-md w-fit shadow-sm">
                <span
                  className="h-2 w-2 rounded-full shadow-[0_0_8px_currentColor]"
                  style={{ backgroundColor: badgeColor }}
                />
                {badgeText}
              </div>

              {/* Title and Description */}
              <div className="mb-3">
                <h3 className="text-xl font-extrabold text-white mb-1 tracking-tight">{title}</h3>
                <p className="text-slate-300 text-xs leading-relaxed">{description}</p>
              </div>

              {children}
            </div>

            {/* Call to Action Button */}
            {(ctaText || ctaHref) && (
              <div className="mt-4 pt-3 border-t border-slate-800/60">
                {ctaHref ? (
                  <a
                    href={ctaHref}
                    onClick={onCtaClick}
                    className="group inline-flex items-center gap-1.5 text-xs font-extrabold text-orange-400 hover:text-orange-300 transition-colors"
                  >
                    {ctaText}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={onCtaClick}
                    className="group w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-extrabold text-xs transition-all shadow-md shadow-orange-600/30"
                  >
                    {ctaText}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    );
  }
);
GradientCard.displayName = "GradientCard";

export { GradientCard, cardVariants };
