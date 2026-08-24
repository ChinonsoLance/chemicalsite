// About.jsx — the story chapter. Opens on the emerald band, then runs on paper.
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Reveal, DrawRule, SplitHeading, Counter } from "./components/Motion";
import Atmosphere from "./components/Atmosphere";
import { PRODUCTS } from "./data";

const values = [
  {
    index: "01",
    title: "Uncompromising purity",
    description:
      "Materials are accepted against specification, not against a promise. Off-spec stock does not enter the warehouse.",
  },
  {
    index: "02",
    title: "Traceable by lot",
    description:
      "Supplier, batch, manufacture date and certificate travel with the product all the way to your goods-in bay.",
  },
  {
    index: "03",
    title: "Responsible handling",
    description:
      "Segregated storage by grade, controlled decanting, and packaging designed to survive Nigerian logistics.",
  },
  {
    index: "04",
    title: "Partnership over transaction",
    description:
      "We plan stock around your production calendar so a lead time never becomes a line stoppage.",
  },
];

const milestones = [
  { year: "2013", event: "Founded in Lagos to supply food-grade raw materials to local manufacturers." },
  { year: "2016", event: "Warehouse expansion and the first industrial-grade chemical lines." },
  { year: "2019", event: "Direct sourcing relationships established with mills and refineries abroad." },
  { year: "2022", event: "Sweetener and vitamin portfolios added for fortification and reformulation work." },
  { year: "2026", event: "34 active lines serving beverage, bakery, pharmaceutical and process industries." },
];

const certifications = [
  "Certificates of Analysis",
  "Grade Segregation",
  "Batch Traceability",
  "Technical Data Sheets",
];

export default function About() {
  return (
    <div className="min-h-screen">
      {/* ---------- Opening — dark band ---------- */}
      <section className="relative z-10 overflow-hidden bg-forest-950 pb-28 pt-[calc(var(--nav-h)+6rem)] md:pb-36 md:pt-[calc(var(--nav-h)+9rem)]">
        <Atmosphere variant="hero" intensity={1} seamBottom />

        <div className="relative z-10 mx-auto max-w-[var(--shell)] px-5 sm:px-8">
          <Reveal variant="fade">
            <div className="flex items-center gap-4">
              <span className="h-px w-12 bg-jade-400/60" />
              <span className="eyebrow">Our story</span>
            </div>
          </Reveal>

          <SplitHeading
            as="h1"
            text={"A supplier built\nfor consistency."}
            className="display mt-8 max-w-4xl text-[clamp(2.6rem,8vw,6.2rem)] text-white"
            stagger={55}
          />

          <div className="mt-12 grid gap-10 lg:grid-cols-12">
            <Reveal variant="up" delay={180} className="lg:col-span-7">
              <p className="max-w-2xl text-base leading-[1.9] text-mist/70">
                CJ-DELUZ (NIG) LTD supplies chemical raw materials to
                manufacturers who cannot afford variation. We hold stock
                locally, buy directly from audited producers, and document every
                lot — so the material that reaches your process behaves the same
                way it did last quarter.
              </p>
            </Reveal>

            <Reveal variant="up" delay={300} className="lg:col-span-5">
              <div className="glass rounded-[26px] p-8">
                <p className="display numeric text-5xl text-shimmer">
                  <Counter value={PRODUCTS.length} suffix="" />
                </p>
                <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-mist/55">
                  Active product lines
                </p>
                <div className="my-7 hairline" />
                <p className="text-sm leading-relaxed text-mist/65">
                  Food grade · Industrial grade · Sweeteners · Vitamins — all
                  warehoused and dispatched from Lagos.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- Mission ---------- */}
      <section className="relative z-10">
        <div className="mx-auto max-w-[var(--shell)] px-5 py-24 sm:px-8 md:py-32">
          <div className="grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Reveal variant="fade">
                <span className="eyebrow-ink">Our mission</span>
              </Reveal>
              <DrawRule className="mt-7 max-w-[180px]" tone="ink" />
            </div>
            <div className="lg:col-span-8">
              <SplitHeading
                text={"Remove every barrier\nbetween a formulation\nand the shelf."}
                className="display text-[clamp(1.9rem,4.4vw,3.4rem)] leading-[1.12] text-bark"
                stagger={55}
              />
              <Reveal variant="up" delay={220}>
                <p className="mt-9 max-w-2xl text-[15px] leading-[1.9] text-moss">
                  That means high-purity chemicals, honest lead times and
                  technical support from people who know the material — not a
                  call centre. When your buyer, your QA lead and your production
                  manager all trust the same delivery, everything downstream
                  gets easier.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Values ---------- */}
      <section className="relative z-10 border-y border-jade-700/12 bg-paper-2/70">
        <div className="mx-auto max-w-[var(--shell)] px-5 py-24 sm:px-8 md:py-32">
          <div className="mb-14">
            <Reveal variant="fade">
              <span className="eyebrow-ink">What we hold to</span>
            </Reveal>
            <SplitHeading
              text={"Four principles."}
              className="display mt-5 text-[clamp(2.1rem,5vw,3.8rem)] text-bark"
            />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {values.map((v, i) => (
              <Reveal key={v.title} variant="up" delay={i * 70}>
                <div className="lift card h-full rounded-[26px] p-8 md:p-10">
                  <span className="numeric text-[10px] font-semibold tracking-[0.3em] text-jade-600">
                    {v.index}
                  </span>
                  <h3 className="display mt-5 text-2xl text-bark md:text-[28px]">
                    {v.title}
                  </h3>
                  <p className="mt-4 text-sm leading-[1.85] text-moss">
                    {v.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Timeline ---------- */}
      <section className="relative z-10">
        <div className="mx-auto max-w-[var(--shell)] px-5 py-24 sm:px-8 md:py-32">
          <div className="mb-16 text-center">
            <Reveal variant="fade">
              <span className="eyebrow-ink">The timeline</span>
            </Reveal>
            <SplitHeading
              text={"Our journey."}
              className="display mt-5 text-[clamp(2.1rem,5vw,3.8rem)] text-bark"
            />
          </div>

          <div className="mx-auto max-w-3xl">
            {milestones.map((m, i) => (
              <Reveal
                key={m.year}
                variant="left"
                delay={i * 60}
                className="group relative flex gap-6 pb-12 last:pb-0 sm:gap-10"
              >
                <div className="w-16 flex-shrink-0 pt-0.5 text-right sm:w-24">
                  <span className="numeric text-sm font-bold tracking-[0.1em] text-jade-700">
                    {m.year}
                  </span>
                </div>

                <div className="relative flex-1 border-l border-jade-700/20 pb-2 pl-7 sm:pl-9">
                  <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-jade-500 shadow-[0_0_14px_rgba(20,199,116,0.7)] transition-transform duration-500 group-hover:scale-150" />
                  <p className="text-[15px] leading-[1.85] text-moss">
                    {m.event}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Assurance — emerald plate on paper ---------- */}
      <section className="relative z-10 mx-auto max-w-[var(--shell)] px-5 pb-24 sm:px-8 md:pb-32">
        <Reveal variant="up" duration={800}>
          <div className="panel-emerald relative overflow-hidden rounded-[32px] px-8 py-14 text-center md:px-16 md:py-20">
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-jade-500/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-jade-700/25 blur-3xl" />

            <span className="eyebrow relative">Assurance</span>
            <SplitHeading
              text={"Built on paperwork\nyou can audit."}
              className="display relative mt-6 text-[clamp(1.9rem,4.4vw,3.2rem)] text-white"
            />
            <Reveal variant="up" delay={200}>
              <p className="relative mx-auto mt-7 max-w-2xl text-sm leading-[1.85] text-mist/70">
                Documentation is issued with each consignment so your quality
                team can verify what arrived without chasing us for it.
              </p>
            </Reveal>

            <Reveal variant="up" delay={300}>
              <div className="relative mt-10 flex flex-wrap justify-center gap-3">
                {certifications.map((c) => (
                  <span
                    key={c}
                    className="rounded-full border border-jade-300/25 bg-white/5 px-6 py-2.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-mist/75"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </Reveal>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="relative z-10 border-t border-jade-700/12 bg-paper-2/60 py-28 md:py-36">
        <div className="mx-auto max-w-2xl px-5 text-center sm:px-8">
          <SplitHeading
            text={"Ready when you are."}
            className="display text-[clamp(2.2rem,6vw,4.4rem)] text-bark"
          />
          <Reveal variant="up" delay={200}>
            <p className="mx-auto mt-7 max-w-md text-[15px] leading-relaxed text-moss">
              Browse the catalogue, or send us a specification and let us come
              back with options.
            </p>
          </Reveal>
          <Reveal variant="up" delay={300}>
            <div className="mt-11 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/products"
                className="btn-primary group inline-flex items-center gap-2.5 rounded-full px-9 py-4 text-[12px] uppercase tracking-[0.18em]"
              >
                Explore Products
                <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
              </Link>
              <Link
                to="/contact"
                className="btn-outline inline-flex items-center gap-2.5 rounded-full px-9 py-4 text-[12px] uppercase tracking-[0.18em]"
              >
                Contact Us
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
