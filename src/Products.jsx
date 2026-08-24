import { useState, useMemo } from "react";
import { Search, X } from "lucide-react";
import { PRODUCTS, CATEGORIES } from "./data";
import ProductCard from "./components/ProductCard";
import Atmosphere from "./components/Atmosphere";
import { Reveal, DrawRule, SplitHeading } from "./components/Motion";

export default function Products({ wishlist = [], toggleWishlist }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("General");

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return PRODUCTS.filter((p) => {
      const matchCat = category === "General" || p.category === category;
      const matchSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [searchQuery, category]);

  return (
    <div className="min-h-screen">
      {/* ---------- Chapter header — the dark band every page opens on ---------- */}
      <section className="relative z-10 overflow-hidden bg-forest-950 pb-24 pt-[calc(var(--nav-h)+5rem)] md:pb-32 md:pt-[calc(var(--nav-h)+8rem)]">
        <Atmosphere variant="hero" intensity={1} seamBottom />

        <div className="relative z-10 mx-auto max-w-[var(--shell)] px-5 sm:px-8">
          <Reveal variant="fade">
            <div className="flex items-center gap-4">
              <span className="h-px w-12 bg-jade-400/60" />
              <span className="eyebrow">The catalogue</span>
            </div>
          </Reveal>

          <SplitHeading
            text={"Every material\nwe carry."}
            as="h1"
            className="display mt-8 text-[clamp(2.6rem,8vw,6rem)] text-white"
            stagger={55}
          />

          <Reveal variant="up" delay={200}>
            <p className="mt-8 max-w-xl text-[15px] leading-relaxed text-mist/70">
              {PRODUCTS.length} lines across food-grade, industrial, sweetener
              and vitamin disciplines — held in stock and documented lot by lot.
            </p>
          </Reveal>

          <DrawRule className="mt-14" delay={260} />
        </div>
      </section>

      {/* ---------- Controls — a rail that pins under the nav ----------
          Opaque rather than blurred on purpose: this bar is sticky over a
          scrolling grid, so a backdrop-filter here would re-sample and re-blur
          the whole viewport behind it on every frame of every scroll. */}
      <section className="sticky top-[var(--nav-h)] z-30 border-b border-jade-700/15 bg-paper shadow-[0_10px_30px_-24px_rgba(6,48,30,0.5)]">
        <div className="mx-auto max-w-[var(--shell)] px-5 py-4 sm:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            <div className="flex flex-1 items-center gap-3 rounded-full border border-edge bg-paper px-5 py-2.5 transition-colors focus-within:border-jade-500/60 lg:max-w-sm">
              <Search className="h-4 w-4 flex-shrink-0 text-jade-700" />
              <input
                className="w-full bg-transparent text-sm text-bark placeholder-sage outline-none"
                placeholder="Search materials…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-sage transition-colors hover:text-bark"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <div className="scrollbar-none flex items-center gap-2 overflow-x-auto">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`flex-shrink-0 rounded-full px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.16em] transition-all duration-500 ${
                    category === cat
                      ? "bg-gradient-to-br from-jade-600 to-jade-800 text-white shadow-[0_12px_28px_-14px_rgba(9,128,75,0.9)]"
                      : "border border-edge bg-white text-moss hover:border-jade-500/50 hover:text-jade-700"
                  }`}
                >
                  {cat === "General" ? "All" : cat}
                </button>
              ))}
            </div>

            <span className="numeric hidden text-[10px] font-semibold uppercase tracking-[0.22em] text-sage lg:ml-auto lg:block">
              {String(filtered.length).padStart(2, "0")} results
            </span>
          </div>
        </div>
      </section>

      {/* ---------- Grid ---------- */}
      <section className="relative z-10 mx-auto max-w-[var(--shell)] px-5 py-16 sm:px-8 md:py-24">
        {filtered.length === 0 ? (
          <div className="py-28 text-center">
            <p className="display text-4xl text-bark">Nothing here yet</p>
            <p className="mt-4 text-sm text-moss">
              No material matches “{searchQuery}”.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setCategory("General");
              }}
              className="btn-outline mt-8 rounded-full px-7 py-3 text-[11px] uppercase tracking-[0.2em]"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-4">
            {filtered.map((p, i) => (
              <Reveal
                key={p.id}
                variant="up"
                delay={(i % 4) * 55}
                className="h-full"
              >
                <ProductCard
                  product={p}
                  onWishlistToggle={toggleWishlist}
                  isWishlisted={wishlist.includes(p.id)}
                />
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
