// Backdrop.jsx — the fixed paper backdrop for the light zone. It never
// unmounts on route change, so the soft green wash reads as one continuous
// sheet of paper behind every page. The dark sections paint over it with
// their own opaque <Atmosphere />.

import { useRef } from "react";
import { useScrollTick } from "../hooks/useScroll";

export default function Backdrop() {
  const rootRef = useRef(null);
  const last = useRef(-1);
  // On the low-power tier the wash simply sits still. It is a soft gradient
  // behind everything — nobody misses the 70px of drift, and it buys back a
  // style recalculation on every scroll frame.
  const frozen =
    typeof document !== "undefined" &&
    document.documentElement.classList.contains("perf-lite");

  // Publish overall page scroll depth (0 → 1) as a CSS variable so the washes
  // and the grid drift in sync with the page.
  //
  // The variable goes on this element rather than <html>: a custom property on
  // the root invalidates style for every node that could inherit it, i.e. the
  // whole tree, on every frame. Only the layers below actually read it.
  useScrollTick((m) => {
    const el = rootRef.current;
    if (!el || frozen) return;
    const depth = Math.round(m.depth * 1000) / 1000;
    if (depth === last.current) return;
    last.current = depth;
    el.style.setProperty("--page-depth", depth);
  });

  return (
    <div ref={rootRef} className="paper-backdrop" aria-hidden="true">
      <div className="paper-wash paper-wash--a" />
      <div className="paper-wash paper-wash--b" />
      <div className="paper-grid" />
    </div>
  );
}
