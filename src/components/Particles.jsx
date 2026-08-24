// Particles.jsx — a canvas dust field, sized to whichever section hosts it.
// Motes drift upward, sway on a sine, twinkle, and shear with scroll so the
// dark zones read as a volume rather than a flat gradient.
//
// This is the only thing on the site that repaints continuously, so it is
// deliberately kept cheap:
//   * the canvas backing store is 1x, never devicePixelRatio — the motes are
//     soft glows, so a retina buffer costs 4x the pixels for no visible gain;
//   * the field is capped at ~30fps (dust drifting at 0.2px/frame does not
//     need 60), which halves the clear-and-redraw work;
//   * it stops entirely when the tab is hidden, and thins out to a handful of
//     slow motes on the low-power tier rather than disappearing.

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "../hooks/useScroll";

// Particles per square pixel of the host box, clamped below.
const DENSITY = 0.00009;
const MIN_COUNT = 16;
const MAX_COUNT = 110;

// Redraw budget. 33ms ≈ 30fps; the lite tier halves that again.
const FRAME_MS = 33;
const FRAME_MS_LITE = 66;

/**
 * @param {number} intensity  scales count and brightness (1 = default).
 * @param {boolean} interactive  let the pointer push the field around.
 */
export default function Particles({ intensity = 1, interactive = true }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const lite = document.documentElement.classList.contains("perf-lite");
    const reduced = prefersReducedMotion();
    const frameBudget = lite ? FRAME_MS_LITE : FRAME_MS;
    // The lite tier keeps the field, just far thinner.
    const scale = intensity * (lite ? 0.4 : 1);

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
    grad.addColorStop(0.16, "rgba(198,255,224,0.6)");
    grad.addColorStop(0.42, "rgba(47,224,140,0.22)");
    grad.addColorStop(1, "rgba(20,199,116,0)");
    sctx.fillStyle = grad;
    sctx.fillRect(0, 0, SPRITE, SPRITE);

    const makeParticle = () => {
      // depth 0 = far and faint, 1 = near, large and quick
      const depth = Math.pow(Math.random(), 1.6);
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        depth,
        radius: 0.6 + depth * 3.4,
        alpha: 0.12 + depth * 0.48,
        rise: 0.05 + depth * 0.26,
        sway: 6 + Math.random() * 26,
        swaySpeed: 0.0035 + Math.random() * 0.006,
        phase: Math.random() * Math.PI * 2,
        twinkle: 0.4 + Math.random() * 0.6,
      };
    };

    const resize = () => {
      const host = canvas.parentElement;
      // The host is the atmosphere layer; fall back to the viewport if it has
      // not been laid out yet.
      width = host?.clientWidth || window.innerWidth;
      height = host?.clientHeight || window.innerHeight;
      if (width === 0 || height === 0) return;

      // 1x backing store on purpose — see the note at the top of the file.
      canvas.width = Math.floor(width);
      canvas.height = Math.floor(height);
      ctx.setTransform(1, 0, 0, 1, 0, 0);

      const count = Math.round(
        Math.min(Math.max(width * height * DENSITY * scale, MIN_COUNT * scale), MAX_COUNT * scale)
      );
      particles = Array.from({ length: count }, makeParticle);
    };

    const draw = (time) => {
      if (!width || !height) return;
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
        ctx.globalAlpha = Math.max(0, Math.min(1, p.alpha * flicker));
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
      if (time - lastDraw < frameBudget) return;
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

    // The field only runs while its own section is on screen AND the tab is
    // visible. With three dark bands on the homepage this is the difference
    // between one canvas repainting and three.
    let onScreen = false;

    const sync = () => {
      if (reduced) return;
      if (onScreen && !document.hidden) start();
      else stop();
    };

    const onVisibility = sync;

    resize();
    onScroll();

    // The host box can change height without the window resizing — a footer
    // reflowing, or the hero's sticky stage settling after fonts land.
    let ro;
    if (typeof ResizeObserver !== "undefined" && canvas.parentElement) {
      ro = new ResizeObserver(() => {
        resize();
        if (reduced) draw(0);
      });
      ro.observe(canvas.parentElement);
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        sync();
      },
      // A little margin so the field is already moving by the time it is seen.
      { rootMargin: "15% 0px 15% 0px" }
    );
    io.observe(canvas);

    if (reduced) {
      draw(0);
    } else {
      document.addEventListener("visibilitychange", onVisibility);
      if (interactive && window.matchMedia("(pointer: fine)").matches) {
        window.addEventListener("pointermove", onPointerMove, { passive: true });
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      stop();
      io.disconnect();
      ro?.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [intensity, interactive]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
