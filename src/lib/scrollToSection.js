export function scrollToSection(sectionId, offset = 0, block = 'start') {
  const target = document.getElementById(sectionId);
  if (!target) return false;

  if (block === 'center') {
    target.scrollIntoView({
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
      block: 'center'
    });
    return true;
  }

  const top = target.getBoundingClientRect().top + window.scrollY - offset;

  window.scrollTo({
    top: Math.max(top, 0),
    behavior: prefersReducedMotion() ? 'auto' : 'smooth'
  });

  return true;
}

export function prefersReducedMotion() {
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
}
