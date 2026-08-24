import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, FlaskConical, Truck, Headset, ArrowRight } from "lucide-react";
import {
  PRODUCTS,
  HERO_SLIDES,
  CATEGORY_META,
  STATS,
  MARQUEE_TERMS,
} from "./data";
import ProductCard from "./components/ProductCard";
import Atmosphere from "./components/Atmosphere";
import {
  Reveal,
  DrawRule,
  SplitHeading,
  Parallax,
  Counter,
} from "./components/Motion";
import { useScrollMeasure, useIdleWhenOffscreen } from "./hooks/useScroll";

/* ============================================================
   Chapter 00 — the hero
   A tall scroll track with a pinned stage. Everything inside is
   scrubbed imperatively so scrolling never re-renders React.
   The deepest, greenest part of the site.
   ============================================================ */
function Hero() {
  const trackRef = useRef(null);
  const stageRef = useRef(null);
  const copyRef = useRef(null);
  const imageRef = useRef(null);
  const veilRef = useRef(null);
  const cueRef = useRef(null);
  const [active, setActive] = useState(0);
  // Only the visible plate — plus the one queued behind it — is ever fetched.
  // All three used to download before first paint, which is ~3 full-width
  // photographs competing with the fonts and the bundle for the connection.
  const [primed, setPrimed] = useState(() => new Set([0]));
  const activeRef = useRef(0);

  // Advancing and pre-fetching happen together, so the plate behind the one
  // you are looking at is always already in cache by the time it crossfades.
  const goTo = useCallback((i) => {
    activeRef.current = i;
    setActive(i);
    setPrimed((prev) => {
      const next = (i + 1) % HERO_SLIDES.length;
      if (prev.has(i) && prev.has(next)) return prev;
      const s = new Set(prev);
      s.add(i);
      s.add(next);
      return s;
    });
  }, []);

  useEffect(() => {
    const t = setInterval(
      () => goTo((activeRef.current + 1) % HERO_SLIDES.length),
      6000
    );
    return () => clearInterval(t);
  }, [goTo]);

  // Slide two is fetched a beat after the page settles rather than during the
  // initial load, so it is ready for the first transition without ever
  // competing with first paint.
  useEffect(() => {
    const t = setTimeout(
      () => setPrimed((prev) => (prev.has(1) ? prev : new Set(prev).add(1))),
      2000
    );
    return () => clearTimeout(t);
  }, []);

  const lastP = useRef(-1);

  // One measurement in the read pass, all the writes in the write pass.
  useScrollMeasure(
    (m) => {
      const track = trackRef.current;
      if (!track) return null;
      const rect = track.getBoundingClientRect();
      const distance = Math.max(rect.height - m.viewportH, 1);
      // Once the hero has scrolled past, stop writing entirely.
      if (rect.bottom < 0) return null;
      return Math.min(1, Math.max(0, -rect.top / distance));
    },
    (raw) => {
      if (raw === null) return;
      const p = Math.round(raw * 1000) / 1000;
      if (p === lastP.current) return;
      lastP.current = p;

      // Copy lifts away and dissolves through the first two thirds.
      // Opacity + transform only: a per-frame `filter: blur()` here meant the
      // whole headline block was re-rasterised on every frame of the scroll.
      if (copyRef.current) {
        copyRef.current.style.transform = `translate3d(0, ${-p * 120}px, 0)`;
        copyRef.current.style.opacity = String(Math.max(0, 1 - p * 1.7));
      }
      // Plate pushes in slowly — the "dolly" move.
      if (imageRef.current) {
        imageRef.current.style.transform = `scale(${1.06 + p * 0.18}) translate3d(0, ${p * 60}px, 0)`;
      }
      // Darkness closes over the frame so it hands off to the page below.
      if (veilRef.current) {
        veilRef.current.style.opacity = String(0.4 + p * 0.55);
      }
      if (cueRef.current) {
        cueRef.current.style.opacity = String(Math.max(0, 1 - p * 3));
      }
      if (stageRef.current) {
        stageRef.current.style.setProperty("--hero-p", p);
      }
    }
  );

  const slide = HERO_SLIDES[active];

  return (
    <section
      ref={trackRef}
      className="relative z-10 h-[150vh] bg-forest-950 md:h-[180vh]"
    >
      <div ref={stageRef} className="sticky top-0 h-screen overflow-hidden">
        {/* The emerald environment: orbs, aurora, grid, beams, dust, grain */}
        <Atmosphere variant="hero" intensity={1.35} />

        {/* Photographic plate, tucked under the atmosphere's colour grade.
            No mix-blend-mode here: a full-screen blended layer cannot be
            composited independently, so the dolly transform below forced the
            whole stage to re-composite every frame. The gradients above do the
            colour grading instead. */}
        <div
          ref={imageRef}
          className="absolute inset-0 z-[1] opacity-40 will-change-transform"
        >
          {HERO_SLIDES.map((s, i) => (
            <div
              key={s.headline}
              className="absolute inset-0 bg-cover bg-center transition-opacity duration-[1800ms] ease-out"
              style={{
                backgroundImage: primed.has(i) ? `url(${s.img})` : undefined,
                opacity: i === active ? 1 : 0,
              }}
            />
          ))}
        </div>

        {/* Colour grade — pulls the photography into the emerald */}
        <div className="absolute inset-0 z-[2] bg-gradient-to-br from-forest-950/95 via-forest-900/75 to-forest-700/55" />
        <div
          ref={veilRef}
          className="absolute inset-0 z-[2] bg-gradient-to-t from-abyss via-abyss/45 to-transparent"
          style={{ opacity: 0.4 }}
        />
        <div className="absolute inset-0 z-[2] bg-[radial-gradient(75%_65%_at_18%_45%,transparent_0%,rgba(3,26,16,0.88)_100%)]" />

        {/* HUD corners */}
        <div className="pointer-events-none absolute inset-x-0 top-[var(--nav-h)] z-10 mx-auto hidden max-w-[var(--shell)] justify-between px-12 py-5 text-[10px] font-semibold uppercase tracking-[0.3em] text-jade-300/55 md:flex">
          <span>Lat 6.4541° N — Lon 3.3947° E</span>
          <span>Est. 2013 · Lagos, Nigeria</span>
        </div>

        {/* Copy */}
        <div className="relative z-10 flex h-full items-center">
          <div
            ref={copyRef}
            className="mx-auto w-full max-w-[var(--shell)] px-5 pt-16 will-change-transform sm:px-8"
          >
            <div className="max-w-3xl">
              <Reveal variant="fade" duration={800}>
                <div className="mb-7 flex items-center gap-4">
                  <span className="relative flex h-2 w-2">
                    <span className="pulse-ring absolute inline-flex h-full w-full rounded-full bg-jade-400" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-jade-400" />
                  </span>
                  <span className="h-px w-10 bg-jade-400/60" />
                  <span className="eyebrow">{slide.label}</span>
                </div>
              </Reveal>

              <SplitHeading
                as="h1"
                key={slide.headline}
                text={slide.headline}
                className="display text-[clamp(3.2rem,11vw,8.5rem)] text-white [text-shadow:0_18px_60px_rgba(3,26,16,0.55)]"
                stagger={55}
              />

              <Reveal variant="up" delay={220} className="mt-8 max-w-xl">
                <p className="text-base leading-relaxed text-mist/75 sm:text-lg">
                  {slide.sub}
                </p>
              </Reveal>

              <Reveal variant="up" delay={340}>
                <div className="mt-11 flex flex-wrap items-center gap-4">
                  <Link
                    to="/products"
                    className="btn-primary group inline-flex items-center gap-2.5 rounded-full px-8 py-4 text-[12px] uppercase tracking-[0.18em]"
                  >
                    View Catalogue
                    <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
                  </Link>
                  <Link
                    to="/contact"
                    className="btn-ghost inline-flex items-center gap-2 rounded-full px-8 py-4 text-[12px] uppercase tracking-[0.18em]"
                  >
                    Request a Quote
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </div>

        {/* Chapter indicators */}
        <div className="absolute bottom-10 left-5 z-10 flex items-center gap-4 sm:left-8">
          {HERO_SLIDES.map((s, i) => (
            <button
              key={s.headline}
              onClick={() => goTo(i)}
              aria-label={`Show ${s.label}`}
              className="group py-3"
            >
              <span
                className="block h-px rounded-full transition-all duration-700"
                style={{
                  width: i === active ? 48 : 18,
                  background: i === active ? "#2fe08c" : "rgba(255,255,255,0.28)",
                  boxShadow: i === active ? "0 0 14px rgba(47,224,140,0.9)" : "none",
                }}
              />
            </button>
          ))}
          <span className="numeric ml-2 text-[10px] font-semibold tracking-[0.25em] text-mist/45">
            0{active + 1} / 0{HERO_SLIDES.length}
          </span>
        </div>

        {/* Scroll cue */}
        <div
          ref={cueRef}
          className="scroll-cue absolute bottom-10 right-5 z-10 hidden flex-col items-center gap-3 sm:right-8 md:flex"
        >
          <span />
          <span className="text-[9px] font-semibold uppercase tracking-[0.3em] text-mist/45">
            Scroll
          </span>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Ticker — the seam between the emerald hero and the paper below
   ============================================================ */
function Ticker() {
  const row = [...MARQUEE_TERMS, ...MARQUEE_TERMS];
  // The marquee loops forever; parked while it is off screen.
  const ref = useIdleWhenOffscreen();
  return (
    <div
      ref={ref}
      className="relative z-10 overflow-hidden border-y border-jade-700/15 bg-white/70 py-5"
    >
      <div className="marquee">
        {row.map((term, i) => (
          <span
            key={i}
            className="flex items-center gap-8 whitespace-nowrap px-8 text-[11px] font-semibold uppercase tracking-[0.28em] text-moss/70"
          >
            {term}
            <span className="h-1 w-1 rounded-full bg-jade-500" />
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-paper to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-paper to-transparent" />
    </div>
  );
}

/* ============================================================
   Chapter 01 — the manifesto  (light)
   ============================================================ */
function Manifesto() {
  return (
    <section className="relative z-10 mx-auto max-w-[var(--shell)] px-5 py-24 sm:px-8 md:py-36">
      <div className="grid items-center gap-16 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <Reveal variant="fade">
            <span className="eyebrow-ink">Who we are</span>
          </Reveal>
          <DrawRule className="my-7 max-w-[220px]" tone="ink" />

          <SplitHeading
            text={"Raw materials\nthat hold their\nspecification."}
            className="display text-[clamp(2.4rem,5.6vw,4.6rem)] text-bark"
          />

          <Reveal variant="up" delay={160}>
            <p className="mt-9 max-w-lg text-[15px] leading-[1.9] text-moss">
              CJ-DELUZ supplies the food, beverage, pharmaceutical and industrial
              sectors with chemical raw materials that arrive exactly as
              specified — the same grade, the same assay, shipment after
              shipment. We hold stock locally, so your line does not wait on a
              vessel.
            </p>
          </Reveal>

          <Reveal variant="up" delay={260}>
            <Link
              to="/about"
              className="group mt-10 inline-flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.2em] text-jade-700"
            >
              <span className="border-b border-jade-600/40 pb-1 transition-colors group-hover:border-jade-600">
                Read our story
              </span>
              <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1.5" />
            </Link>
          </Reveal>
        </div>

        {/* Parallax collage */}
        <div className="relative lg:col-span-6">
          <Reveal variant="scale" duration={900}>
            <Parallax speed={-0.06} className="relative">
              <div className="lift card overflow-hidden rounded-[28px]">
                <img
                  src={PRODUCTS[0].img}
                  alt=""
                  className="h-[380px] w-full object-cover md:h-[520px]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bark/90 via-bark/15 to-transparent" />
                <div className="absolute bottom-7 left-7 right-7">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-jade-300">
                    In stock — Lagos
                  </p>
                  <p className="display mt-2 text-3xl text-white">
                    {PRODUCTS.length} product lines
                  </p>
                </div>
              </div>
            </Parallax>
          </Reveal>

          <Reveal variant="right" delay={220} duration={900}>
            <Parallax
              speed={0.12}
              className="absolute -bottom-14 -left-4 z-10 hidden w-52 sm:block lg:-left-16"
            >
              <div className="lift card overflow-hidden rounded-3xl">
                <img
                  src={PRODUCTS[19].img}
                  alt=""
                  className="h-40 w-full object-cover"
                  loading="lazy"
                />
                <div className="p-4">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-jade-700">
                    Industrial
                  </p>
                  <p className="mt-1 text-sm font-semibold text-bark">
                    Hydrogen Peroxide
                  </p>
                </div>
              </div>
            </Parallax>
          </Reveal>

          <div className="spin-slow pointer-events-none absolute -right-10 -top-10 hidden h-32 w-32 rounded-full border border-dashed border-jade-600/25 lg:block" />
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Stats band — a single emerald plate floating on the paper
   ============================================================ */
function Stats() {
  return (
    <section className="relative z-10 mx-auto max-w-[var(--shell)] px-5 sm:px-8">
      <Reveal variant="up" duration={800}>
        <div className="panel-emerald relative overflow-hidden rounded-[32px]">
          <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-jade-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-28 right-0 h-72 w-72 rounded-full bg-jade-700/25 blur-3xl" />

          <div className="relative grid grid-cols-2 lg:grid-cols-4">
            {STATS.map((s, i) => (
              <Reveal
                key={s.label}
                variant="up"
                delay={i * 70}
                className="relative px-5 py-11 text-center lg:py-14"
              >
                <p className="display numeric text-[clamp(2.4rem,4.6vw,3.6rem)] text-shimmer">
                  <Counter
                    value={s.value}
                    decimals={s.decimals || 0}
                    suffix={s.suffix}
                  />
                </p>
                <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-mist/55">
                  {s.label}
                </p>
                {i < STATS.length - 1 && (
                  <span className="absolute right-0 top-1/2 hidden h-14 w-px -translate-y-1/2 bg-jade-300/15 lg:block" />
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ============================================================
   Chapter 02 — categories  (light)
   ============================================================ */
function Categories() {
  return (
    <section className="relative z-10 mx-auto max-w-[var(--shell)] px-5 py-24 sm:px-8 md:py-32">
      <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <Reveal variant="fade">
            <span className="eyebrow-ink">What we supply</span>
          </Reveal>
          <SplitHeading
            text={"Four disciplines."}
            className="display mt-5 text-[clamp(2.2rem,5vw,4rem)] text-bark"
          />
        </div>
        <Reveal variant="up" delay={140}>
          <p className="max-w-sm text-sm leading-relaxed text-moss">
            Each category is held to its own testing regime and documentation
            trail. Select a discipline to browse the full catalogue.
          </p>
        </Reveal>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {CATEGORY_META.map((cat, i) => {
          const sample = PRODUCTS.find((p) => p.category === cat.name);
          return (
            <Reveal key={cat.name} variant="up" delay={i * 70}>
              <Link
                to="/products"
                className="lift card group flex h-full flex-col overflow-hidden rounded-[26px]"
              >
                <div className="relative h-52 overflow-hidden md:h-64">
                  {sample && (
                    <img
                      src={sample.img}
                      alt=""
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      loading="lazy"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-bark/85 via-bark/25 to-transparent" />
                  <span className="absolute left-6 top-6 rounded-full border border-jade-300/30 bg-forest-950/60 px-3 py-1 text-[10px] font-semibold tracking-[0.3em] text-jade-300">
                    {cat.index}
                  </span>
                  <h3 className="display absolute bottom-5 left-6 right-6 text-2xl text-white md:text-3xl">
                    {cat.name}
                  </h3>
                </div>

                <div className="flex flex-1 flex-col p-7">
                  <p className="flex-1 text-sm leading-relaxed text-moss">
                    {cat.blurb}
                  </p>
                  <span className="mt-7 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-jade-700">
                    Browse
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1.5" />
                  </span>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

/* ============================================================
   Chapter 03 — selected catalogue  (light)
   ============================================================ */
function Selected() {
  const products = PRODUCTS.slice(0, 8);

  return (
    <section className="relative z-10 mx-auto max-w-[var(--shell)] px-5 pb-24 sm:px-8 md:pb-32">
      <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <Reveal variant="fade">
            <span className="eyebrow-ink">Selected stock</span>
          </Reveal>
          <SplitHeading
            text={"Moving now."}
            className="display mt-5 text-[clamp(2.2rem,5vw,4rem)] text-bark"
          />
        </div>
        <Reveal variant="up" delay={120}>
          <Link
            to="/products"
            className="btn-outline inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-[11px] uppercase tracking-[0.2em]"
          >
            All {PRODUCTS.length} products
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </Reveal>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-4">
        {products.map((p, i) => (
          <Reveal key={p.id} variant="up" delay={(i % 4) * 60} className="h-full">
            <ProductCard product={p} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   Chapter 04 — standards (sticky scrolly list, light)
   ============================================================ */
const STANDARDS = [
  {
    icon: ShieldCheck,
    title: "Documented on arrival",
    body: "Every consignment ships with a certificate of analysis, batch number and manufacture date, matched to the lot in your store.",
  },
  {
    icon: FlaskConical,
    title: "Grade-correct, always",
    body: "Food, pharma and industrial grades are stored and handled separately. What you specify is what reaches your process.",
  },
  {
    icon: Truck,
    title: "Local stock, national reach",
    body: "Warehoused in Lagos with dispatch to any state — trial drums through to full container loads.",
  },
  {
    icon: Headset,
    title: "Technical people on the line",
    body: "Speak to someone who knows the material: substitutions, handling, storage and dosage guidance included.",
  },
];

function Standards() {
  return (
    <section className="relative z-10 border-t border-jade-700/12 bg-paper-2/70">
      <div className="mx-auto grid max-w-[var(--shell)] gap-14 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-36">
            <Reveal variant="fade">
              <span className="eyebrow-ink">How we work</span>
            </Reveal>
            <SplitHeading
              text={"The standard\nbeneath every\nshipment."}
              className="display mt-6 text-[clamp(2.2rem,4.8vw,3.8rem)] text-bark"
            />
            <Reveal variant="up" delay={180}>
              <p className="mt-7 max-w-md text-[15px] leading-[1.9] text-moss">
                Consistency is the product. These four commitments are what make
                a supplier worth keeping.
              </p>
            </Reveal>
            <DrawRule className="mt-10 max-w-[260px]" delay={300} tone="ink" />
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="flex flex-col gap-4">
            {STANDARDS.map((s, i) => (
              <Reveal key={s.title} variant="up" delay={60}>
                <div className="lift card group flex items-start gap-6 rounded-[24px] p-7 md:p-8">
                  <span className="numeric mt-1 text-[10px] font-semibold tracking-[0.28em] text-jade-600">
                    0{i + 1}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center gap-4">
                      <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-jade-500/12 text-jade-700 transition-transform duration-500 group-hover:scale-110">
                        <s.icon className="h-5 w-5" />
                      </span>
                      <h3 className="display-sm text-lg text-bark md:text-xl">
                        {s.title}
                      </h3>
                    </div>
                    <p className="mt-3.5 max-w-xl text-sm leading-relaxed text-moss">
                      {s.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Closing chapter — CTA. Back to emerald, leading into the footer.
   ============================================================ */
function Closing() {
  return (
    <section className="relative z-10 overflow-hidden bg-forest-950 py-32 md:py-44">
      <Atmosphere variant="band" intensity={0.9} seamTop />

      <div className="relative z-10 mx-auto max-w-3xl px-5 text-center sm:px-8">
        <Reveal variant="fade">
          <span className="eyebrow">Start a conversation</span>
        </Reveal>

        <SplitHeading
          text={"Tell us what your\nprocess needs."}
          className="display mt-7 text-[clamp(2.4rem,6.5vw,5rem)] text-white"
          stagger={50}
        />

        <Reveal variant="up" delay={200}>
          <p className="mx-auto mt-8 max-w-lg text-[15px] leading-relaxed text-mist/70">
            Send us a specification, a volume and a timeline. We will come back
            with grade options, documentation and a landed price.
          </p>
        </Reveal>

        <Reveal variant="up" delay={320}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contact"
              className="btn-primary group inline-flex items-center gap-2.5 rounded-full px-9 py-4 text-[12px] uppercase tracking-[0.18em]"
            >
              Request a Quote
              <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
            </Link>
            <a
              href="https://wa.me/2347047535828"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost inline-flex items-center gap-2.5 rounded-full px-9 py-4 text-[12px] uppercase tracking-[0.18em]"
            >
              WhatsApp Us
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================================================
   Page
   ============================================================ */
export default function Home() {
  return (
    <div>
      <Hero />
      <Ticker />
      <Manifesto />
      <Stats />
      <Categories />
      <Selected />
      <Standards />
      <Closing />
    </div>
  );
}
