import { useState, useMemo } from "react";
import { Search, X } from "lucide-react";
import { PRODUCTS, CATEGORIES } from "./data";
import ProductCard from "./components/ProductCard";
import { Reveal, DrawRule, SplitHeading, Parallax } from "./components/Motion";

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
      {/* Chapter header */}
      <section className="relative overflow-hidden pb-16 pt-[calc(var(--nav-h)+5rem)] md:pb-20 md:pt-[calc(var(--nav-h)+8rem)]">
        <Parallax speed={0.1} className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-jade-600/10 blur-[130px]" />
        </Parallax>

        <div className="relative mx-auto max-w-[var(--shell)] px-5 sm:px-8">
          <Reveal variant="fade">
            <span className="eyebrow">The catalogue</span>
          </Reveal>

          <SplitHeading
            text={"Every material\nwe carry."}
            as="h1"
            className="display mt-6 text-[clamp(2.6rem,8vw,6rem)] text-white"
            stagger={80}
          />

          <Reveal variant="up" delay={200}>
            <p className="mt-8 max-w-xl text-[15px] leading-relaxed text-mist/60">
              {PRODUCTS.length} lines across food-grade, industrial, sweetener
              and vitamin disciplines — held in stock and documented lot by lot.
            </p>
          </Reveal>

          <DrawRule className="mt-14" delay={260} />
        </div>
      </section>

      {/* Controls */}
      <section className="sticky top-[var(--nav-h)] z-30 border-y border-white/8 bg-abyss/70 backdrop-blur-2xl">
        <div className="mx-auto max-w-[var(--shell)] px-5 py-4 sm:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            <div className="flex flex-1 items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-5 py-2.5 transition-colors focus-within:border-jade-400/50 lg:max-w-sm">
              <Search className="h-4 w-4 flex-shrink-0 text-jade-300/70" />
              <input
                className="w-full bg-transparent text-sm text-white placeholder-mist/35 outline-none"
                placeholder="Search materials…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-mist/40 transition-colors hover:text-white"
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
                  className={`flex-shrink-0 rounded-full px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.16em] transition-all duration-500 ${
                    category === cat
                      ? "bg-jade-500 text-abyss shadow-[0_10px_30px_-12px_rgba(22,184,98,0.9)]"
                      : "border border-white/10 text-mist/60 hover:border-jade-400/40 hover:text-white"
                  }`}
                >
                  {cat === "General" ? "All" : cat}
                </button>
              ))}
            </div>

            <span className="hidden font-mono text-[10px] uppercase tracking-[0.22em] text-mist/35 lg:ml-auto lg:block">
              {String(filtered.length).padStart(2, "0")} results
            </span>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="mx-auto max-w-[var(--shell)] px-5 py-16 sm:px-8 md:py-24">
        {filtered.length === 0 ? (
          <div className="py-28 text-center">
            <p className="display text-4xl text-white/80">Nothing here yet</p>
            <p className="mt-4 text-sm text-mist/50">
              No material matches “{searchQuery}”.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setCategory("General");
              }}
              className="btn-ghost mt-8 rounded-full px-7 py-3 text-[11px] uppercase tracking-[0.2em]"
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
                delay={(i % 4) * 90}
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
