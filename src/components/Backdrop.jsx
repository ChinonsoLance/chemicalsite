// Backdrop.jsx — the single fixed atmosphere layer shared by every page.
// It never unmounts on route change, so the dark-green gradient reads as one
// continuous environment from the top of the hero to the bottom of the footer.

import { useScrollTick } from "../hooks/useScroll";
import Particles from "./Particles";

export default function Backdrop() {
  // Publish overall page scroll depth (0 → 1) as a CSS variable so the orbs,
  // grid and beams drift in sync with the story.
  useScrollTick(() => {
    const doc = document.documentElement;
    const max = doc.scrollHeight - window.innerHeight;
    const depth = max > 0 ? window.scrollY / max : 0;
    doc.style.setProperty("--page-depth", depth.toFixed(4));
  });

  return (
    <div className="site-backdrop" aria-hidden="true">
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
