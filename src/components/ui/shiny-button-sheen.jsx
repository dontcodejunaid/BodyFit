import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

// Adapted from the shadcn/magic-ui "shiny button".
//
// Two deliberate changes from the original source:
//  1. Named ShinySheenButton, not ShinyButton — ui/shiny-button.jsx already
//     exists and is used by Hero.jsx. Overwriting it would restyle the hero.
//  2. hsl(var(--primary)) is replaced with the project's orange. This codebase
//     has no shadcn CSS variables, so --primary resolves to nothing and both
//     the sheen and the border would render invisible.
// The `dark:` prefixes are dropped too: the site is always dark, and without a
// `dark` class on <html> those utilities never apply.

const ORANGE = 'rgb(249,115,22)';

const animationProps = {
  initial: { '--x': '100%', scale: 0.8 },
  animate: { '--x': '-100%', scale: 1 },
  whileTap: { scale: 0.95 },
  transition: {
    repeat: Infinity,
    repeatType: 'loop',
    repeatDelay: 1,
    type: 'spring',
    stiffness: 20,
    damping: 15,
    mass: 2,
    scale: {
      type: 'spring',
      stiffness: 200,
      damping: 5,
      mass: 0.5,
    },
  },
};

const sheenMask =
  `linear-gradient(-75deg,${ORANGE} calc(var(--x) + 20%),` +
  `transparent calc(var(--x) + 30%),${ORANGE} calc(var(--x) + 100%))`;

/**
 * @param {object} props
 * @param {'button'|'a'} [props.as] Render as a link when it needs an href.
 */
export const ShinySheenButton = ({ as = 'button', children, className, ...props }) => {
  const MotionTag = motion[as] || motion.button;

  return (
    <MotionTag
      {...animationProps}
      {...props}
      className={cn(
        'relative rounded-lg px-6 py-2 font-medium backdrop-blur-xl transition-shadow duration-300 ease-in-out',
        'bg-[radial-gradient(circle_at_50%_0%,rgba(249,115,22,0.12)_0%,transparent_60%)]',
        'hover:shadow-[0_0_20px_rgba(249,115,22,0.25)]',
        className
      )}
    >
      <span
        className="relative block size-full text-sm uppercase tracking-wide text-white/90"
        style={{ maskImage: sheenMask, WebkitMaskImage: sheenMask }}
      >
        {children}
      </span>
      <span
        aria-hidden="true"
        className="absolute inset-0 z-10 block rounded-[inherit] bg-[linear-gradient(-75deg,rgba(249,115,22,0.1)_calc(var(--x)+20%),rgba(249,115,22,0.5)_calc(var(--x)+25%),rgba(249,115,22,0.1)_calc(var(--x)+100%))] p-px"
        style={{
          mask: 'linear-gradient(rgb(0,0,0), rgb(0,0,0)) content-box,linear-gradient(rgb(0,0,0), rgb(0,0,0))',
          WebkitMask:
            'linear-gradient(rgb(0,0,0), rgb(0,0,0)) content-box,linear-gradient(rgb(0,0,0), rgb(0,0,0))',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor',
        }}
      />
    </MotionTag>
  );
};

export default ShinySheenButton;
