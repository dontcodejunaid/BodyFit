/**
 * Scroll a section into view, offset by the sticky header.
 *
 * A bare `href="#id"` jump puts the section's top edge at viewport top, which
 * on this site parks it *underneath* the ~190px sticky header. Passing the
 * measured header height keeps the heading visible.
 *
 * @param {string} sectionId - id of the target section, without the '#'
 * @param {number} [offset=0] - pixels to leave clear at the top
 * @returns {boolean} false when no such section exists (caller can fall back)
 */
export function scrollToSection(sectionId, offset = 0) {
  const target = document.getElementById(sectionId);
  if (!target) return false;

  const top = target.getBoundingClientRect().top + window.scrollY - offset;

  window.scrollTo({
    top: Math.max(top, 0),
    behavior: prefersReducedMotion() ? 'auto' : 'smooth'
  });

  return true;
}

/** Visitors who ask for less motion get an instant jump instead of a glide. */
export function prefersReducedMotion() {
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
}
