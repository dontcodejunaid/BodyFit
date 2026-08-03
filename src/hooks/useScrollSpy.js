import { useEffect, useState } from 'react';

/**
 * Track which section is currently under the sticky header, so the navbar can
 * highlight the link the visitor is actually looking at.
 *
 * @param {string[]} sectionIds - ids in document order. Must be a stable
 *   reference (define it at module scope) or the listener re-binds every render.
 * @param {React.RefObject<HTMLElement>} headerRef - sticky header, measured on
 *   each scroll because its height changes between breakpoints.
 * @returns {string|null} id of the active section
 */
export function useScrollSpy(sectionIds, headerRef) {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? null);

  useEffect(() => {
    const handleScroll = () => {
      const offset = headerRef?.current?.getBoundingClientRect().height ?? 0;

      // The last section is often shorter than the viewport, so scrolling to the
      // very bottom can never bring its top edge above the header. Award it the
      // highlight outright once we bottom out.
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;

      if (atBottom) {
        setActiveId(sectionIds[sectionIds.length - 1]);
        return;
      }

      // Walk forward: the last section whose top has passed the header wins.
      let current = sectionIds[0];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top - offset <= 1) current = id;
      }
      setActiveId(current);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [sectionIds, headerRef]);

  return activeId;
}
