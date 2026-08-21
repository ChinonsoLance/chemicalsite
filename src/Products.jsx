import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";

import { PRODUCTS, CATEGORIES, CATEGORY_META } from "./data";
import { CONTACT } from "./site";
import ProductCard from "./components/ProductCard";
import { Reveal } from "./components/Motion";
import { Masthead, CallToAction } from "./components/Layout";

const shortLabel = (name) =>
  name === "General"
    ? "All"
    : CATEGORY_META.find((c) => c.name === name)?.short || name;

export default function Products() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("General");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PRODUCTS.filter((p) => {
      const matchCat = category === "General" || p.category === category;
      const matchText =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q);
      return matchCat && matchText;
    });
  }, [query, category]);

  return (
    <>
      <Masthead
        index="01"
        label="The catalogue"
        title={
          <>
            Every material
            <br />
            we carry.
          </>
        }
        lede={`${PRODUCTS.length} lines across food-grade, industrial, sweetener and vitamin disciplines — held in stock and documented lot by lot.`}
      />

      {/* Filter bar. Opaque rather than translucent: it sits over a scrolling
          grid, and a blurred backdrop there costs a full sample-and-blur of
          everything behind it on every frame. */}
      <div className="sticky top-[var(--nav-h)] z-30 border-y border-rule bg-paper">
        <div className="wrap flex flex-col gap-3 py-3 lg:flex-row lg:items-center lg:gap-6">
          <div className="flex items-center gap-3 rounded-[var(--r-pill)] border border-rule px-4 py-1.5 lg:w-72">
            <Search className="h-4 w-4 shrink-0 text-ink-3" />
            <input
              className="w-full bg-transparent py-1 text-sm outline-none placeholder:text-ink-3"
              placeholder="Search materials…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search materials"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="text-ink-3 transition-colors hover:text-ink"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="scrollbar-none -mx-1 flex items-center gap-1 overflow-x-auto px-1">
            {CATEGORIES.map((cat) => {
              const active = category === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  aria-pressed={active}
                  className="label chip"
                >
                  {shortLabel(cat)}
                </button>
              );
            })}
          </div>

          <span className="label num hidden lg:ml-auto lg:block">
            {String(filtered.length).padStart(2, "0")} / {PRODUCTS.length}
          </span>
        </div>
      </div>

      <section className="wrap relative z-10 py-14 md:py-20">
        {filtered.length === 0 ? (
          <div className="panel px-6 py-20 text-center">
            <p className="display-sm text-xl">No match</p>
            <p className="prose-body mx-auto mt-3 max-w-sm text-[14px]">
              Nothing in the catalogue matches “{query}”. We source beyond this
              list — tell us what you need.
            </p>
            <button
              onClick={() => {
                setQuery("");
                setCategory("General");
              }}
              className="btn btn-outline mt-8"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {filtered.map((p, i) => (
              <Reveal key={p.id} delay={(i % 4) * 50}>
                <ProductCard product={p} index={p.id} />
              </Reveal>
            ))}
          </div>
        )}
      </section>

      <CallToAction
        title="Not on the list?"
        body="The catalogue is what we hold in stock, not the limit of what we source. Send a specification and we will come back with options."
        primary={{ to: "/contact", label: "Send a specification" }}
        secondary={{ href: CONTACT.whatsappHref, label: "WhatsApp" }}
      />
    </>
  );
}
