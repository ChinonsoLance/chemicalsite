// useScroll.js — one shared, rAF-throttled scroll loop, and the reveal
// observers. Every consumer on the site reads from here, so there is exactly
// one scroll listener no matter how many components subscribe.
//
// Page metrics are measured once per frame and handed to subscribers. Reading
// `documentElement.scrollHeight` forces a synchronous layout of the whole
// document, so it is cached and refreshed by the observers below rather than
// read on every frame.

import { useEffect, useLayoutEffect, useRef, useState } from "react";

/* ---------------- shared frame loop ---------------- */

const subscribers = new Set();
let ticking = false;

export const metrics = {
  scrollY: 0,
  viewportH: 0,
  maxScroll: 0,
  /** 0 → 1 through the whole document */
  depth: 0,
};

let docHeight = 0;
let heightDirty = true;

function refreshMetrics() {
  if (heightDirty) {
    docHeight = document.documentElement.scrollHeight;
    heightDirty = false;
  }
  metrics.scrollY = window.scrollY;
  metrics.viewportH = window.innerHeight;
  metrics.maxScroll = Math.max(docHeight - metrics.viewportH, 0);
  metrics.depth = metrics.maxScroll > 0 ? metrics.scrollY / metrics.maxScroll : 0;
}

function flush() {
  ticking = false;
  refreshMetrics();
  for (const fn of subscribers) fn(metrics);
}

function schedule() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(flush);
}

/** Marks the cached page height stale. */
export function invalidateScrollMetrics() {
  heightDirty = true;
  schedule();
}

if (typeof window !== "undefined") {
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", invalidateScrollMetrics, { passive: true });

  // Content growing or shrinking (route change, filtered grid, image load)
  // changes page height without firing scroll or resize.
  if (typeof ResizeObserver !== "undefined") {
    const ro = new ResizeObserver(invalidateScrollMetrics);
    if (document.body) ro.observe(document.body);
    else
      document.addEventListener(
        "DOMContentLoaded",
        () => ro.observe(document.body),
        { once: true }
      );
  }
}

/** Runs `callback(metrics)` at most once per frame while scrolling. */
export function useScrollTick(callback) {
  const cb = useRef(callback);

  useLayoutEffect(() => {
    cb.current = callback;
  });

  useEffect(() => {
    const fn = (m) => cb.current(m);
    subscribers.add(fn);
    invalidateScrollMetrics();
    return () => subscribers.delete(fn);
  }, []);
}

/** True once the page has scrolled past `offset`. Re-renders only on the crossing. */
export function useScrolledPast(offset = 8) {
  const [past, setPast] = useState(false);
  const current = useRef(false);

  useScrollTick((m) => {
    const next = m.scrollY > offset;
    if (next === current.current) return;
    current.current = next;
    setPast(next);
  });

  return past;
}

/* ---------------- reduced motion ---------------- */

// matchMedia() allocates a MediaQueryList on every call, so the query is made
// once and reused.
let motionQuery = null;
export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  if (!motionQuery)
    motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  return motionQuery.matches;
}

/* ---------------- reveal on scroll ---------------- */

let revealObserver = null;
let armObserver = null;

/**
 * Fires well before the reveal does, and hands the element a compositor layer
 * only for the short window where it is about to animate. A permanent
 * `will-change` on every reveal on a page exhausts layer memory on mobile GPUs
 * and drops the compositor into software rendering.
 */
function getArmObserver() {
  if (armObserver) return armObserver;
  armObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        entry.target.classList.toggle("is-armed", entry.isIntersecting);
        if (entry.target.classList.contains("is-in"))
          armObserver.unobserve(entry.target);
      }
    },
    { rootMargin: "50% 0px 50% 0px" }
  );
  return armObserver;
}

function getRevealObserver() {
  if (revealObserver) return revealObserver;
  revealObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-in");
        revealObserver.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
  );
  return revealObserver;
}

/**
 * Returns a ref. The element it is attached to gains the `is-in` class the
 * first time it scrolls into view — immediately, if motion is reduced.
 */
export function useRevealRef() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      el.classList.add("is-in");
      return;
    }

    const io = getRevealObserver();
    const arm = getArmObserver();
    io.observe(el);
    arm.observe(el);
    return () => {
      io.unobserve(el);
      arm.unobserve(el);
    };
  }, []);

  return ref;
}
