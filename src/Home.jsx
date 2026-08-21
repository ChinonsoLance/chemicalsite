import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { PRODUCTS, CATEGORY_META, PRACTICES } from "./data";
import { CONTACT, COMPANY } from "./site";
import ProductCard from "./components/ProductCard";
import { Reveal } from "./components/Motion";
import { Band, IndexRow, CallToAction } from "./components/Layout";

/* ---------------------------------------------------------------
   Masthead — set as type, not as a slideshow.

   The old hero was a 240vh scroll track pinning a stock photo, three rotating
   headlines and a scrubbed dolly zoom. It took four screens of scrolling before
   a visitor learned what the company sells. This says it in one screen.
   --------------------------------------------------------------- */
function Masthead() {
  const facts = [
    { k: "Materials in catalogue", v: String(PRODUCTS.length) },
    { k: "Disciplines", v: String(CATEGORY_META.length) },
    { k: "Stock held", v: `${COMPANY.city}, ${COMPANY.country}` },
    { k: "Enquiries", v: CONTACT.phoneDisplay },
  ];

  return (
    <header className="wrap relative z-10 pb-14 pt-[calc(var(--nav-h)+3.5rem)] md:pb-20 md:pt-[calc(var(--nav-h)+5.5rem)]">
      <Reveal className="flex items-baseline gap-3">
        <span className="label num label-accent">00</span>
        <span className="label">{COMPANY.legalName}</span>
      </Reveal>

      <Reveal delay={60}>
        <h1 className="display mt-7 text-[clamp(2.1rem,6.2vw,4.25rem)]">
          Raw materials
          <br />
          that hold their
          <br />
          <span className="text-accent">specification.</span>
        </h1>
      </Reveal>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
        <Reveal delay={120}>
          <p className="lede max-w-xl">
            We supply food, beverage, pharmaceutical and industrial
            manufacturers with chemical raw materials — the same grade, the same
            assay, shipment after shipment. Stock is held in {COMPANY.city}, so
            your line does not wait on a vessel.
          </p>
        </Reveal>

        <Reveal delay={180} className="flex flex-wrap gap-3">
          <Link to="/products" className="btn btn-solid">
            View materials
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <a
            href={CONTACT.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
          >
            WhatsApp
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </Reveal>
      </div>

      {/* At a glance — real figures only, three of the four derived from the
          catalogue itself so they cannot drift out of date. */}
      <Reveal delay={240}>
        <dl className="grid-box mt-14 sm:grid-cols-2 lg:grid-cols-4">
          {facts.map((f) => (
            <div key={f.k} className="px-5 py-5">
              <dt className="label">{f.k}</dt>
              <dd className="display-sm mt-1.5 text-[15px] md:text-base">{f.v}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </header>
  );
}

/* ---------------------------------------------------------------
   01 — What we supply
   --------------------------------------------------------------- */
function Disciplines() {
  return (
    <Band
      index="01"
      label="What we supply"
      title="Four disciplines, held to separate testing and storage regimes."
    >
      <div className="mt-12">
        {CATEGORY_META.map((cat, i) => (
          <IndexRow
            key={cat.name}
            index={cat.index}
            title={cat.name}
            body={cat.blurb}
            meta={`${cat.count} materials`}
            to="/products"
            delay={i * 60}
          />
        ))}
      </div>
    </Band>
  );
}

/* ---------------------------------------------------------------
   02 — Selected materials
   --------------------------------------------------------------- */
function Selected() {
  // Two from each discipline rather than the first eight in the file, which
  // would all be food grade and make the range look narrower than it is.
  const shown = CATEGORY_META.flatMap((c) =>
    PRODUCTS.filter((p) => p.category === c.name).slice(0, 2)
  );

  return (
    <Band index="02" label="Selected" title="A sample of what is on the floor.">
      <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {shown.map((p, i) => (
          <Reveal key={p.id} delay={(i % 4) * 60}>
            <ProductCard product={p} index={p.id} />
          </Reveal>
        ))}
      </div>

      <Reveal delay={120} className="mt-10">
        <Link to="/products" className="link-rule">
          All {PRODUCTS.length} materials
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </Reveal>
    </Band>
  );
}

/* ---------------------------------------------------------------
   03 — How we work
   --------------------------------------------------------------- */
function Practice() {
  return (
    <Band
      index="03"
      label="How we work"
      title="Consistency is the product."
      intro="Four commitments that decide whether a supplier is worth keeping."
    >
      <div className="mt-12">
        {PRACTICES.map((p, i) => (
          <IndexRow
            key={p.title}
            index={p.index}
            title={p.title}
            body={p.body}
            delay={i * 60}
          />
        ))}
      </div>
    </Band>
  );
}

export default function Home() {
  return (
    <>
      <Masthead />
      <Disciplines />
      <Selected />
      <Practice />
      <CallToAction
        secondary={{ href: CONTACT.whatsappHref, label: "WhatsApp" }}
      />
    </>
  );
}
