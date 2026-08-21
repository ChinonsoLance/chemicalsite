import { PRODUCTS, CATEGORY_META, PRACTICES, DOCUMENTATION } from "./data";
import { COMPANY, CONTACT } from "./site";
import { Reveal } from "./components/Motion";
import { Masthead, Band, IndexRow, CallToAction } from "./components/Layout";

export default function About() {
  return (
    <>
      <Masthead
        index="01"
        label="About"
        title={
          <>
            A supplier built
            <br />
            for consistency.
          </>
        }
        lede={`${COMPANY.legalName} supplies chemical raw materials to manufacturers who cannot afford variation. We hold stock locally and document every lot, so the material that reaches your process behaves the way it did last quarter.`}
      />

      {/* 02 — what we actually do, in plain terms */}
      <Band index="02" label="What we do">
        <div className="grid gap-10 md:grid-cols-2">
          <Reveal>
            <p className="prose-body">
              We buy chemical raw materials in bulk, hold them in{" "}
              {COMPANY.city}, and sell them on to the people who put them into
              food, drink, medicine and industrial process. That is the whole
              business.
            </p>
          </Reveal>
          <Reveal delay={60}>
            <p className="prose-body">
              What makes it worth doing well is the boring part: keeping grades
              apart, keeping paperwork with the pallet, and keeping enough on
              the floor that a buyer can order on Tuesday and run on Thursday.
            </p>
          </Reveal>
        </div>

        {/* The catalogue, summarised — every figure derived, none asserted. */}
        <Reveal delay={120}>
          <dl className="grid-box mt-12 sm:grid-cols-2 lg:grid-cols-4">
            {CATEGORY_META.map((c) => (
              <div key={c.name} className="px-5 py-5">
                <dt className="label">{c.short}</dt>
                <dd className="display-sm mt-1.5 text-xl">
                  <span className="num">{c.count}</span>
                  <span className="ml-2 text-sm font-normal text-ink-3">
                    lines
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Band>

      {/* 03 — how we work */}
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

      {/* 04 — the paperwork */}
      <Band
        index="04"
        label="Documentation"
        title="What arrives with the pallet."
        intro="Issued with each consignment, so your quality team can verify what landed without chasing us for it."
      >
        <Reveal delay={120}>
          <ul className="grid-box mt-10 sm:grid-cols-2">
            {DOCUMENTATION.map((d, i) => (
              <li
                key={d}
                className="flex items-baseline gap-4 px-5 py-5"
              >
                <span className="label num label-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="display-sm text-[14px]">{d}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </Band>

      <CallToAction
        title="Ready when you are."
        body={`Browse the ${PRODUCTS.length} materials we hold, or send a specification and let us come back with options.`}
        primary={{ to: "/products", label: "View materials" }}
        secondary={{ href: CONTACT.whatsappHref, label: "WhatsApp" }}
      />
    </>
  );
}
