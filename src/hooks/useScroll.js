// useScroll.js — one shared, rAF-throttled scroll loop for the whole site.
// Every parallax layer, progress rail and scrubbed section reads from this,
// so there is exactly one scroll listener no matter how many consumers mount.

import { useEffect, useLayoutEffect, useRef, useState } from "react";

const subscribers = new Set();
let ticking = false;

function flush() {
  ticking = false;
  for (const fn of subscribers) fn();
}

function schedule() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(flush);
}

if (typeof window !== "undefined") {
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule, { passive: true });
}

export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/** Runs `callback` once per animation frame while the page is scrolling. */
export function useScrollTick(callback) {
  const cb = useRef(callback);

  useLayoutEffect(() => {
    cb.current = callback;
  });

  useEffect(() => {
    const fn = () => cb.current();
    subscribers.add(fn);
    // Prime after paint rather than during the effect body.
    const id = requestAnimationFrame(fn);
    return () => {
      cancelAnimationFrame(id);
      subscribers.delete(fn);
    };
  }, []);
}

/** Progress (0 → 1) of an element travelling through the viewport. */
export function useSectionProgress(ref) {
  const [progress, setProgress] = useState(0);

  useScrollTick(() => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const viewport = window.innerHeight;
    const distance = Math.max(rect.height + viewport, 1);
    const raw = (viewport - rect.top) / distance;
    setProgress(Math.min(1, Math.max(0, raw)));
  });

  return progress;
}

/* ---------------- reveal-on-scroll ---------------- */

let observer = null;
const registry = new WeakMap();

function getObserver() {
  if (observer) return observer;
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const opts = registry.get(entry.target);
        if (!opts) continue;
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          if (opts.once) observer.unobserve(entry.target);
        } else if (!opts.once) {
          entry.target.classList.remove("is-in");
        }
      }
    },
    { rootMargin: "0px 0px -12% 0px", threshold: 0.12 }
  );
  return observer;
}

/**
 * Returns a ref. The element it is attached to gains the `is-in` class the
 * first time it scrolls into view (immediately, if motion is reduced).
 */
export function useRevealRef(once = true) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      el.classList.add("is-in");
      return;
    }

    registry.set(el, { once });
    const io = getObserver();
    io.observe(el);
    return () => io.unobserve(el);
  }, [once]);

  return ref;
}
