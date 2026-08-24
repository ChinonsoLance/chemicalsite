// Atmosphere.jsx — the deep-emerald environment used by the dark zones
// (hero, closing CTA, footer). Unlike the old site-wide backdrop this is
// section-scoped: drop it as the first child of any `relative` dark section
// and it fills that section only, so the light zone in between stays light.
//
// It publishes its own `--page-depth` (its progress through the viewport)
// rather than reading the document's, so every dark band parallaxes against
// its own travel instead of against the length of the page.

import { useRef } from "react";
import { useScrollMeasure, useIdleWhenOffscreen } from "../hooks/useScroll";
import Particles from "./Particles";

/**
 * @param {"hero"|"band"} variant  hero gets the full scene; band is calmer.
 * @param {boolean} particles     render the drifting dust field.
 * @param {number}  intensity     particle density multiplier.
 * @param {boolean} seamBottom    fade the bottom edge into the paper zone.
 * @param {boolean} seamTop       fade the top edge into the paper zone.
 */
export default function Atmosphere({
  variant = "band",
  particles = true,
  intensity = 1,
  seamBottom = false,
  seamTop = false,
  className = "",
}) {
  const isHero = variant === "hero";
  // Off-screen bands stop animating entirely. `.is-idle` pauses the orb drift,
  // the aurora and the grain, so a homepage with three dark bands only ever
  // pays for the one you are looking at.
  const rootRef = useIdleWhenOffscreen();
  const last = useRef(-1);

  useScrollMeasure(
    (m) => {
      const el = rootRef.current;
      // Nothing to measure while the band is off-screen — this skips the
      // getBoundingClientRect entirely rather than doing it and discarding it.
      if (!el || el.classList.contains("is-idle")) return null;
      const rect = el.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > m.viewportH) return null;
      const distance = Math.max(rect.height + m.viewportH, 1);
      return Math.round(
        Math.min(1, Math.max(0, (m.viewportH - rect.top) / distance)) * 1000
      ) / 1000;
    },
    (depth) => {
      const el = rootRef.current;
      if (!el || depth === null || depth === last.current) return;
      last.current = depth;
      el.style.setProperty("--page-depth", depth);
    }
  );

  return (
    <div ref={rootRef} className={`atmos ${className}`} aria-hidden="true">
      <div className="atmos-grid" />
      <div className="atmos-orb atmos-orb--a" />
      <div className="atmos-orb atmos-orb--b" />
      {isHero && <div className="atmos-orb atmos-orb--c" />}
      <div className="atmos-aurora" />
      {isHero && <div className="atmos-beams" />}
      {particles && <Particles intensity={intensity} interactive={isHero} />}
      <div className="atmos-vignette" />
      {isHero && <div className="atmos-grain" />}
      {seamTop && <div className="seam-from-paper" />}
      {seamBottom && <div className="seam-to-paper" />}
    </div>
  );
}
