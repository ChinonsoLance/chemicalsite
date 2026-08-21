// Backdrop.jsx — the single fixed atmosphere layer shared by every page.
// It never unmounts on route change, so the dark-green gradient reads as one
// continuous environment from the top of the hero to the bottom of the footer.

import { useRef } from "react";
import { useScrollTick } from "../hooks/useScroll";
import Particles from "./Particles";

export default function Backdrop() {
  const rootRef = useRef(null);
  const last = useRef(-1);

  // Publish overall page scroll depth (0 → 1) as a CSS variable so the orbs
  // and grid drift in sync with the story.
  //
  // The variable goes on this element rather than <html>: a custom property on
  // the root invalidates style for every node that could inherit it, i.e. the
  // whole tree, on every frame. Only the four layers below actually read it.
  useScrollTick((m) => {
    const el = rootRef.current;
    if (!el) return;
    const depth = Math.round(m.depth * 1000) / 1000;
    if (depth === last.current) return;
    last.current = depth;
    el.style.setProperty("--page-depth", depth);
  });

  return (
    <div ref={rootRef} className="site-backdrop" aria-hidden="true">
      <div className="backdrop-grid" />
      <div className="backdrop-orb backdrop-orb--a" />
      <div className="backdrop-orb backdrop-orb--b" />
      <div className="backdrop-orb backdrop-orb--c" />
      <div className="backdrop-beams" />
      <Particles />
      <div className="backdrop-vignette" />
      <div className="backdrop-grain" />
    </div>
  );
}
