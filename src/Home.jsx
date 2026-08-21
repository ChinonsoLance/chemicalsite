import { useState, useEffect, useRef } from "react";
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
import {
  Reveal,
  DrawRule,
  SplitHeading,
  Parallax,
  Counter,
} from "./components/Motion";
import { useScrollMeasure } from "./hooks/useScroll";

/* ============================================================
   Chapter 00 — the cinematic hero
   A tall scroll track with a pinned stage; everything inside is
   scrubbed imperatively so scrolling never re-renders React.
   ============================================================ */
function Hero() {
  const trackRef = useRef(null);
  const stageRef = useRef(null);
  const copyRef = useRef(null);
  const imageRef = useRef(null);
  const veilRef = useRef(null);
  const cueRef = useRef(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(
      () => setActive((i) => (i + 1) % HERO_SLIDES.length),
      6000
    );
    return () => clearInterval(t);
  }, []);

  const lastP = useRef(-1);

  // One measurement in the read pass, all five writes in the write pass.
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
      // Darkness closes over the frame so it hands off to the page background.
      if (veilRef.current) {
        veilRef.current.style.opacity = String(0.35 + p * 0.62);
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
    <section ref={trackRef} className="relative h-[190vh] md:h-[240vh]">
      <div ref={stageRef} className="sticky top-0 h-screen overflow-hidden">
        {/* Plate */}
        <div ref={imageRef} className="absolute inset-0 will-change-transform">
          {HERO_SLIDES.map((s, i) => (
            <div
              key={s.headline}
              className="absolute inset-0 bg-cover bg-center transition-opacity duration-[1800ms] ease-out"
              style={{
                backgroundImage: `url(${s.img})`,
                opacity: i === active ? 1 : 0,
              }}
            />
          ))}
        </div>

        {/* Colour grade — ties the photography into the site-wide green */}
        <div className="absolute inset-0 bg-gradient-to-br from-abyss/95 via-forest-900/85 to-forest-700/70" />
        <div
          ref={veilRef}
          className="absolute inset-0 bg-gradient-to-t from-abyss via-abyss/40 to-transparent"
          style={{ opacity: 0.35 }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_20%_45%,transparent_0%,rgba(2,16,10,0.85)_100%)]" />

        {/* HUD corners */}
        <div className="pointer-events-none absolute inset-x-0 top-[var(--nav-h)] mx-auto hidden max-w-[var(--shell)] justify-between px-12 py-5 font-mono text-[10px] uppercase tracking-[0.3em] text-jade-300/45 md:flex">
          <span>Lat 6.4541° N — Lon 3.3947° E</span>
          <span>Est. 2013 · Lagos, Nigeria</span>
        </div>

        {/* Copy */}
        <div className="relative flex h-full items-center">
          <div
            ref={copyRef}
            className="mx-auto w-full max-w-[var(--shell)] px-5 pt-16 will-change-transform sm:px-8"
          >
            <div className="max-w-3xl">
              <Reveal variant="fade" duration={1200}>
                <div className="mb-7 flex items-center gap-4">
                  <span className="h-px w-12 bg-jade-400/60" />
                  <span className="eyebrow">{slide.label}</span>
                </div>
              </Reveal>

              <SplitHeading
                as="h1"
                key={slide.headline}
                text={slide.headline}
                className="display text-[clamp(3.2rem,11vw,8.5rem)] text-white"
                stagger={90}
              />

              <Reveal variant="up" delay={220} className="mt-8 max-w-xl">
                <p className="text-base leading-relaxed text-mist/70 sm:text-lg">
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
              onClick={() => setActive(i)}
              aria-label={`Show ${s.label}`}
              className="group py-3"
            >
              <span
                className="block h-px rounded-full transition-all duration-700"
                style={{
                  width: i === active ? 48 : 18,
                  background: i === active ? "#34d97f" : "rgba(255,255,255,0.28)",
                  boxShadow: i === active ? "0 0 12px rgba(52,217,127,0.8)" : "none",
                }}
              />
            </button>
          ))}
          <span className="ml-2 font-mono text-[10px] tracking-[0.25em] text-mist/40">
            0{active + 1} / 0{HERO_SLIDES.length}
          </span>
        </div>

        {/* Scroll cue */}
        <div
          ref={cueRef}
          className="scroll-cue absolute bottom-10 right-5 z-10 hidden flex-col items-center gap-3 sm:right-8 md:flex"
        >
          <span />
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-mist/40">
            Scroll
          </span>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Ticker
   ============================================================ */
function Ticker() {
  const row = [...MARQUEE_TERMS, ...MARQUEE_TERMS];
  return (
    <div className="relative overflow-hidden border-y border-white/8 bg-white/[0.02] py-5">
      <div className="marquee">
        {row.map((term, i) => (
          <span
            key={i}
            className="flex items-center gap-8 whitespace-nowrap px-8 font-mono text-[11px] uppercase tracking-[0.28em] text-mist/45"
          >
            {term}
            <span className="h-1 w-1 rounded-full bg-jade-400/70" />
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-abyss to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-abyss to-transparent" />
    </div>
  );
}

/* ============================================================
   Chapter 01 — the manifesto
   ============================================================ */
function Manifesto() {
  return (
    <section className="relative mx-auto max-w-[var(--shell)] px-5 py-28 sm:px-8 md:py-40">
      <div className="grid items-center gap-16 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <Reveal variant="fade">
            <span className="eyebrow">Who we are</span>
          </Reveal>
          <DrawRule className="my-7 max-w-[220px]" />

          <SplitHeading
            text={"Raw materials\nthat hold their\nspecification."}
            className="display text-[clamp(2.4rem,5.6vw,4.6rem)] text-white"
          />

          <Reveal variant="up" delay={160}>
            <p className="mt-9 max-w-lg text-[15px] leading-[1.85] text-mist/65">
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
              className="group mt-10 inline-flex items-center gap-3 text-[12px] uppercase tracking-[0.2em] text-jade-300"
            >
              <span className="border-b border-jade-400/40 pb-1 transition-colors group-hover:border-jade-400">
                Read our story
              </span>
              <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1.5" />
            </Link>
          </Reveal>
        </div>

        {/* Parallax collage */}
        <div className="relative lg:col-span-6">
          <Reveal variant="scale" duration={1400}>
            <Parallax speed={-0.06} className="relative">
              <div className="lux-card glass overflow-hidden rounded-[28px]">
                <img
                  src={PRODUCTS[0].img}
                  alt=""
                  className="h-[380px] w-full object-cover opacity-90 md:h-[520px]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-abyss/85 via-transparent to-transparent" />
                <div className="absolute bottom-7 left-7 right-7">
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-jade-300/80">
                    In stock — Lagos
                  </p>
                  <p className="display mt-2 text-3xl text-white">
                    34 product lines
                  </p>
                </div>
              </div>
            </Parallax>
          </Reveal>

          <Reveal variant="right" delay={220} duration={1400}>
            <Parallax
              speed={0.12}
              className="absolute -bottom-14 -left-4 hidden w-52 sm:block lg:-left-16"
            >
              <div className="lux-card glass-strong overflow-hidden rounded-3xl">
                <img
                  src={PRODUCTS[19].img}
                  alt=""
                  className="h-40 w-full object-cover"
                  loading="lazy"
                />
                <div className="p-4">
                  <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-jade-300/70">
                    Industrial
                  </p>
                  <p className="mt-1 text-sm text-white">Hydrogen Peroxide</p>
                </div>
              </div>
            </Parallax>
          </Reveal>

          <div className="spin-slow pointer-events-none absolute -right-10 -top-10 hidden h-32 w-32 rounded-full border border-dashed border-jade-400/25 lg:block" />
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Stats band
   ============================================================ */
function Stats() {
  return (
    <section className="relative border-y border-white/8 bg-white/[0.015]">
      <div className="mx-auto grid max-w-[var(--shell)] grid-cols-2 gap-px px-5 sm:px-8 lg:grid-cols-4">
        {STATS.map((s, i) => (
          <Reveal
            key={s.label}
            variant="up"
            delay={i * 110}
            className="relative px-4 py-12 text-center lg:py-16"
          >
            <p className="display text-[clamp(2.6rem,5vw,4rem)] text-shimmer">
              <Counter
                value={s.value}
                decimals={s.decimals || 0}
                suffix={s.suffix}
              />
            </p>
            <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.24em] text-mist/45">
              {s.label}
            </p>
            {i < STATS.length - 1 && (
              <span className="absolute right-0 top-1/2 hidden h-14 w-px -translate-y-1/2 bg-white/8 lg:block" />
            )}
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   Chapter 02 — categories
   ============================================================ */
function Categories() {
  return (
    <section className="mx-auto max-w-[var(--shell)] px-5 py-28 sm:px-8 md:py-36">
      <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <Reveal variant="fade">
            <span className="eyebrow">What we supply</span>
          </Reveal>
          <SplitHeading
            text={"Four disciplines."}
            className="display mt-5 text-[clamp(2.2rem,5vw,4rem)] text-white"
          />
        </div>
        <Reveal variant="up" delay={140}>
          <p className="max-w-sm text-sm leading-relaxed text-mist/55">
            Each category is held to its own testing regime and documentation
            trail. Select a discipline to browse the full catalogue.
          </p>
        </Reveal>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {CATEGORY_META.map((cat, i) => {
          const sample = PRODUCTS.find((p) => p.category === cat.name);
          return (
            <Reveal key={cat.name} variant="up" delay={i * 120}>
              <Link
                to="/products"
                className="lux-card glass group flex h-full flex-col overflow-hidden rounded-[26px]"
              >
                <div className="relative h-52 overflow-hidden md:h-64">
                  {sample && (
                    <img
                      src={sample.img}
                      alt=""
                      className="h-full w-full object-cover opacity-60 transition-all duration-[1400ms] ease-out group-hover:scale-110 group-hover:opacity-80"
                      loading="lazy"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/45 to-transparent" />
                  <span className="absolute left-6 top-6 font-mono text-[11px] tracking-[0.3em] text-jade-300/80">
                    {cat.index}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-7">
                  <h3 className="display text-2xl text-white md:text-3xl">
                    {cat.name}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-mist/55">
                    {cat.blurb}
                  </p>
                  <span className="mt-7 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.24em] text-jade-300">
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
   Chapter 03 — selected catalogue
   ============================================================ */
function Selected() {
  const products = PRODUCTS.slice(0, 8);

  return (
    <section className="mx-auto max-w-[var(--shell)] px-5 pb-28 sm:px-8 md:pb-36">
      <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <Reveal variant="fade">
            <span className="eyebrow">Selected stock</span>
          </Reveal>
          <SplitHeading
            text={"Moving now."}
            className="display mt-5 text-[clamp(2.2rem,5vw,4rem)] text-white"
          />
        </div>
        <Reveal variant="up" delay={120}>
          <Link
            to="/products"
            className="btn-ghost inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-[11px] uppercase tracking-[0.2em]"
          >
            All {PRODUCTS.length} products
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </Reveal>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-4">
        {products.map((p, i) => (
          <Reveal key={p.id} variant="up" delay={(i % 4) * 100}>
            <ProductCard product={p} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   Chapter 04 — standards (sticky scrolly list)
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
    <section className="relative border-t border-white/8">
      <div className="mx-auto grid max-w-[var(--shell)] gap-14 px-5 py-28 sm:px-8 md:py-36 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-36">
            <Reveal variant="fade">
              <span className="eyebrow">How we work</span>
            </Reveal>
            <SplitHeading
              text={"The standard\nbeneath every\nshipment."}
              className="display mt-6 text-[clamp(2.2rem,4.8vw,3.8rem)] text-white"
            />
            <Reveal variant="up" delay={180}>
              <p className="mt-7 max-w-md text-[15px] leading-[1.85] text-mist/60">
                Consistency is the product. These four commitments are what make
                a supplier worth keeping.
              </p>
            </Reveal>
            <DrawRule className="mt-10 max-w-[260px]" delay={300} />
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="flex flex-col">
            {STANDARDS.map((s, i) => (
              <Reveal
                key={s.title}
                variant="up"
                delay={60}
                className="group border-b border-white/8 py-9 first:pt-0"
              >
                <div className="flex items-start gap-6">
                  <span className="mt-1 font-mono text-[10px] tracking-[0.28em] text-jade-300/55">
                    0{i + 1}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center gap-4">
                      <s.icon className="h-5 w-5 text-jade-400 transition-transform duration-500 group-hover:scale-110" />
                      <h3 className="text-lg font-medium text-white md:text-xl">
                        {s.title}
                      </h3>
                    </div>
                    <p className="mt-3.5 max-w-xl text-sm leading-relaxed text-mist/55">
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
   Closing chapter — CTA
   ============================================================ */
function Closing() {
  return (
    <section className="relative overflow-hidden border-t border-white/8 py-32 md:py-44">
      <Parallax speed={0.08} className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-jade-600/12 blur-[120px]" />
      </Parallax>

      <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-8">
        <Reveal variant="fade">
          <span className="eyebrow">Start a conversation</span>
        </Reveal>

        <SplitHeading
          text={"Tell us what your\nprocess needs."}
          className="display mt-7 text-[clamp(2.4rem,6.5vw,5rem)] text-white"
          stagger={70}
        />

        <Reveal variant="up" delay={200}>
          <p className="mx-auto mt-8 max-w-lg text-[15px] leading-relaxed text-mist/60">
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
