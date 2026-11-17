import { useEffect, useState } from "react";

/**
 * Returns the id of the section currently in view, for highlighting the
 * matching navigation link. Falls back to null when IntersectionObserver is
 * unavailable (e.g. in tests).
 */
export function useActiveSection(ids: readonly string[]): string | null {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const visible = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.set(entry.target.id, entry.intersectionRatio);
          else visible.delete(entry.target.id);
        }
        // The first section (in page order) that is visible wins.
        const current = ids.find((id) => visible.has(id)) ?? null;
        setActive(current);
      },
      // Only the band below the fixed header counts as "in view".
      { rootMargin: "-80px 0px -55% 0px", threshold: [0, 0.01] }
    );

    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
