// Particles.jsx — a canvas dust field that lives inside the fixed backdrop.
// Motes drift upward, sway on a sine, twinkle, and shear with scroll depth so
// the background reads as a volume rather than a flat gradient.
//
// This is the only thing on the site that repaints continuously, so it is
// deliberately kept cheap:
//   * the canvas backing store is 1x, never devicePixelRatio — the motes are
//     soft glows, so a retina buffer costs 4x the pixels for no visible gain;
//   * the field is capped at ~30fps (dust drifting at 0.2px/frame does not
//     need 60), which halves the clear-and-redraw work;
//   * it stops entirely when the tab is hidden, when the pointer has been
//     still, and it never mounts at all on the low-power tier.

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "../hooks/useScroll";

// Particles per square pixel of viewport, clamped below.
const DENSITY = 0.00006;
const MIN_COUNT = 18;
const MAX_COUNT = 70;

// Redraw budget. 33ms ≈ 30fps.
const FRAME_MS = 33;

export default function Particles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // The low-power tier skips the dust field completely.
    if (document.documentElement.classList.contains("perf-lite")) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced = prefersReducedMotion();

    let width = 0;
    let height = 0;
    let particles = [];
    let frame = 0;
    let lastDraw = 0;
    let scrollShift = 0;
    let pointerX = 0;
    let pointerY = 0;
    let pointerTargetX = 0;
    let pointerTargetY = 0;

    /* ---- pre-rendered glow sprite (far cheaper than shadowBlur) ---- */
    const SPRITE = 64;
    const sprite = document.createElement("canvas");
    sprite.width = SPRITE;
    sprite.height = SPRITE;
    const sctx = sprite.getContext("2d");
    const grad = sctx.createRadialGradient(
      SPRITE / 2, SPRITE / 2, 0,
      SPRITE / 2, SPRITE / 2, SPRITE / 2
    );
    grad.addColorStop(0, "rgba(255,255,255,0.95)");
    grad.addColorStop(0.18, "rgba(206,255,228,0.55)");
    grad.addColorStop(0.45, "rgba(82,226,150,0.18)");
    grad.addColorStop(1, "rgba(52,217,127,0)");
    sctx.fillStyle = grad;
    sctx.fillRect(0, 0, SPRITE, SPRITE);

    const makeParticle = () => {
      // depth 0 = far and faint, 1 = near, large and quick
      const depth = Math.pow(Math.random(), 1.6);
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        depth,
        radius: 0.7 + depth * 3.1,
        alpha: 0.1 + depth * 0.42,
        rise: 0.05 + depth * 0.22,
        sway: 6 + Math.random() * 22,
        swaySpeed: 0.0035 + Math.random() * 0.006,
        phase: Math.random() * Math.PI * 2,
        twinkle: 0.4 + Math.random() * 0.6,
      };
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      // 1x backing store on purpose — see the note at the top of the file.
      canvas.width = Math.floor(width);
      canvas.height = Math.floor(height);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);

      const count = Math.round(
        Math.min(Math.max(width * height * DENSITY, MIN_COUNT), MAX_COUNT)
      );
      particles = Array.from({ length: count }, makeParticle);
    };

    const draw = (time) => {
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";

      // Ease the pointer influence so it glides instead of snapping.
      pointerX += (pointerTargetX - pointerX) * 0.09;
      pointerY += (pointerTargetY - pointerY) * 0.09;

      const span = height + 80;

      for (const p of particles) {
        if (!reduced) {
          // Advance by two frames' worth, since we draw at half rate.
          p.y -= p.rise * 2;
          p.phase += p.swaySpeed * 2;
          // Recycle below the fold once a mote leaves the top.
          if (p.y < -40) {
            p.y = height + 40;
            p.x = Math.random() * width;
          }
        }

        // Scroll shear + pointer drift, both scaled by depth.
        const offsetY = ((p.y - scrollShift * p.depth) % span + span) % span - 40;
        const offsetX =
          p.x + Math.sin(p.phase) * p.sway + pointerX * p.depth * 26;

        const flicker = reduced
          ? 1
          : 0.72 + Math.sin(time * 0.0012 + p.phase * 3) * 0.28 * p.twinkle;

        const size = p.radius * 7;
        ctx.globalAlpha = Math.max(0, p.alpha * flicker);
        ctx.drawImage(
          sprite,
          offsetX - size / 2,
          offsetY + pointerY * p.depth * 18 - size / 2,
          size,
          size
        );
      }

      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
    };

    const loop = (time) => {
      frame = requestAnimationFrame(loop);
      // Cap the field's own frame rate; the rAF callback itself is nearly free,
      // the clear-and-redraw is not.
      if (time - lastDraw < FRAME_MS) return;
      lastDraw = time;
      draw(time);
    };

    const start = () => {
      if (frame) return;
      lastDraw = 0;
      frame = requestAnimationFrame(loop);
    };

    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    const onScroll = () => {
      scrollShift = window.scrollY * 0.22;
      if (reduced) draw(0);
    };

    const onPointerMove = (e) => {
      pointerTargetX = (e.clientX / window.innerWidth) * 2 - 1;
      pointerTargetY = (e.clientY / window.innerHeight) * 2 - 1;
    };

    const onVisibility = () => {
      if (document.hidden) stop();
      else if (!reduced) start();
    };

    const onResize = () => {
      resize();
      if (reduced) draw(0);
    };

    resize();
    onScroll();

    if (reduced) {
      draw(0);
    } else {
      start();
      document.addEventListener("visibilitychange", onVisibility);
      if (window.matchMedia("(pointer: fine)").matches) {
        window.addEventListener("pointermove", onPointerMove, { passive: true });
      }
    }

    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      stop();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
