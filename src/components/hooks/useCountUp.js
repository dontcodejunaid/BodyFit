import { useEffect, useRef, useState } from "react";

/**
 * Animates a numeric value from 0 up to the numeric portion of `rawValue`
 * once `start` becomes true. Handles mixed strings like "15K+", "1M+",
 * "500+", or "4.9/5" by extracting the leading number (and decimal
 * precision) and preserving any prefix/suffix characters untouched.
 *
 * @param {string|number} rawValue - the target display value, e.g. "15K+"
 * @param {boolean} start - when true (and not yet run), begins the count
 * @param {number} duration - animation duration in ms
 * @returns {string} the current formatted value for this frame
 */
export default function useCountUp(rawValue, start, duration = 1600) {
  const { prefix, target, decimals, suffix } = parseValue(rawValue);
  const [display, setDisplay] = useState(prefix + (decimals ? "0.0" : "0") + suffix);
  const hasRun = useRef(false);
  const frameRef = useRef(null);

  useEffect(() => {
    if (!start || hasRun.current) return;
    hasRun.current = true;

    const startTime = performance.now();

    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutCubic for a natural deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;

      const formatted = decimals ? current.toFixed(decimals) : Math.round(current).toString();
      setDisplay(prefix + formatted + suffix);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      }
    };

    frameRef.current = requestAnimationFrame(tick);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start]);

  return display;
}

function parseValue(rawValue) {
  const str = String(rawValue).trim();
  const match = str.match(/^([^\d]*)(\d+(?:\.\d+)?)(.*)$/);

  if (!match) {
    return { prefix: "", target: 0, decimals: 0, suffix: str };
  }

  const [, prefix, numberPart, suffix] = match;
  const decimals = numberPart.includes(".") ? numberPart.split(".")[1].length : 0;

  return {
    prefix,
    target: parseFloat(numberPart),
    decimals,
    suffix,
  };
}
