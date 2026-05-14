import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PRODUCTS, CATEGORIES, HERO_SLIDES } from "./data";
import ProductCard from "./components/ProductCard";

// ---------- StarRating (import if needed elsewhere, but ProductCard already uses it) ----------
import StarRating from "./components/StarRating"; // Not needed here directly, but we keep the import for future

// ---------- Hero (same as before) ----------
function Hero({ slide, onNext, onPrev, index }) {
  // … (exactly the same as in previous code, no changes needed)
  // I'll include the full Hero component for completeness
  return (
    <div className="relative min-h-[520px] md:min-h-[620px] flex items-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out"
        style={{ backgroundImage: `url(${slide.img})` }}
      />
      <div className={`absolute inset-0 bg-gradient-to-br ${slide.bg} opacity-90`} />
      <div
        className="absolute -right-32 -top-32 w-[600px] h-[600px] rounded-full blur-3xl opacity-20"
        style={{ background: slide.accent }}
      />
      <div
        className="absolute right-32 bottom-0 w-80 h-80 rounded-full blur-xl opacity-10"
        style={{ background: slide.accent }}
      />

      <div className="max-w-7xl mx-auto px-6 py-24 w-full relative z-10">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-4" style={{ color: slide.accent }}>
            New Reagents 2026
          </p>
          <h1
            className="text-5xl md:text-7xl font-bold text-white leading-none mb-6 whitespace-pre-line drop-shadow-2xl"
            style={{ fontFamily: "'Georgia', serif", letterSpacing: "-0.03em" }}
          >
            {slide.headline}
          </h1>
          <p className="text-stone-200 text-lg mb-10 max-w-md leading-relaxed">{slide.sub}</p>
          <div className="flex items-center gap-4">
            {/* <button
              className="px-8 py-3.5 font-semibold text-sm rounded-full text-stone-900 shadow-xl shadow-black/20 hover:scale-105 active:scale-100 transition-all"
              style={{ background: slide.accent }}
            >
              {slide.cta} →
            </button> */}
            <button className="px-8 py-3.5 font-semibold text-sm rounded-full border border-white/20 text-white hover:bg-white/5 hover:border-white/40 transition-all">
              View Catalog
            </button>
          </div>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-6 flex items-center gap-3 z-10">
        {HERO_SLIDES.map((_, i) => (
          <div
            key={i}
            className="h-0.5 rounded-full transition-all duration-500"
            style={{
              width: i === index ? 32 : 12,
              background: i === index ? slide.accent : "rgba(255,255,255,0.3)",
            }}
          />
        ))}
      </div>
      <button
        onClick={onPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all z-10 backdrop-blur-sm"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={onNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all z-10 backdrop-blur-sm"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}

// ---------- Home Header (search, cart, wishlist) – unchanged ----------
function HomeHeader({ cartCount, wishlistCount, onCartOpen, searchQuery, setSearchQuery }) {
  return (
    <div className="bg-white/80 backdrop-blur-lg border-b border-stone-100 sticky top-16 z-30">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-4">
        {/* Search bar */}
        <div className="flex-1 flex items-center bg-stone-100/80 rounded-full px-4 py-2 gap-2 border border-stone-200/60 max-w-md">
          <svg className="w-4 h-4 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            className="bg-transparent text-sm outline-none flex-1 text-stone-700 placeholder-stone-400"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3">
          <button className="relative p-2 text-stone-600 hover:text-stone-900 transition-colors group">
            <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            {wishlistCount > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white">
                {wishlistCount}
              </span>
            )}
          </button>
          <button
            className="relative p-2 text-stone-600 hover:text-stone-900 transition-colors group"
            onClick={onCartOpen}
          >
            <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-stone-900 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// PromoBar
function PromoBar() {
  const msgs = ["Free shipping on orders over $150", "Lab-grade purity guaranteed", "Bulk discounts available"];
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % msgs.length), 3000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="bg-stone-900 text-white text-[11px] font-medium tracking-widest uppercase py-2 text-center">
      {msgs[i]}
    </div>
  );
}

// ---------- Main Home Component ----------
export default function Home({
  cart,
  wishlist,
  addToCart,
  toggleWishlist,
  setCartOpen,
}) {
  const [category, setCategory] = useState("All");
  const [heroIdx, setHeroIdx] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");

  // Auto-cycle hero
  useEffect(() => {
    const t = setInterval(() => setHeroIdx((i) => (i + 1) % HERO_SLIDES.length), 5000);
    return () => clearInterval(t);
  }, []);

  let filtered = PRODUCTS.filter((p) => {
    const matchCat = category === "All" || p.category === category;
    const matchSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  if (sortBy === "price-asc") filtered = [...filtered].sort((a, b) => a.price - b.price);
  else if (sortBy === "price-desc") filtered = [...filtered].sort((a, b) => b.price - a.price);
  else if (sortBy === "rating") filtered = [...filtered].sort((a, b) => b.rating - a.rating);
  else if (sortBy === "newest")
    filtered = [...filtered]
      .filter((p) => p.badge === "New")
      .concat(filtered.filter((p) => p.badge !== "New"));

  const displayedProducts = filtered.slice(0, 8);

  return (
    <div>
      <PromoBar />
      <Hero
        slide={HERO_SLIDES[heroIdx]}
        index={heroIdx}
        onNext={() => setHeroIdx((i) => (i + 1) % HERO_SLIDES.length)}
        onPrev={() => setHeroIdx((i) => (i - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
      />
      {/* <HomeHeader
        cartCount={cart.reduce((s, i) => s + i.qty, 0)}
        wishlistCount={wishlist.length}
        onCartOpen={() => setCartOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      /> */}

      {/* Category pills */}
      <div className="bg-white/80 backdrop-blur-lg border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-3 overflow-x-auto scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                category === cat
                  ? "bg-stone-900 text-white shadow-lg shadow-stone-300"
                  : "bg-stone-100 text-stone-600 hover:bg-stone-200 hover:text-stone-900"
              }`}
            >
              {cat}
            </button>
          ))}
          <div className="ml-auto flex-shrink-0">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm text-stone-600 bg-transparent border border-stone-200 rounded-full px-3 py-2 outline-none cursor-pointer focus:border-stone-400 transition-colors"
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products grid (max 8) */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        {displayedProducts.length === 0 ? (
          <div className="text-center py-24">
            <span className="text-5xl mb-4 block opacity-30">🔍</span>
            <p className="text-stone-500">No products found for "{searchQuery}"</p>
            <button
              onClick={() => setSearchQuery("")}
              className="mt-3 text-sm font-semibold text-stone-900 underline underline-offset-2"
            >
              Clear search
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-stone-500">
                {filtered.length} product{filtered.length !== 1 ? "s" : ""} – showing first 8
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {displayedProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onAddToCart={addToCart}
                  onWishlistToggle={toggleWishlist}
                  isWishlisted={wishlist.includes(p.id)}
                />
              ))}
            </div>
            {filtered.length > 8 && (
              <div className="flex justify-center mt-10">
                <Link
                  to="/products"
                  className="px-8 py-3.5 bg-stone-900 text-white font-semibold rounded-full hover:bg-stone-700 transition-all text-sm tracking-wide shadow-lg shadow-stone-200"
                >
                  See More Products →
                </Link>
              </div>
            )}
          </>
        )}
      </div>

      {/* Features strip */}
      <div className="bg-white/70 backdrop-blur-lg border-y border-stone-100 py-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: "🚚", title: "Fast Delivery", desc: "On orders over $150" },
            { icon: "✅", title: "Quality Guarantee", desc: "Lab-grade purity" },
            { icon: "🔒", title: "Secure Checkout", desc: "Encrypted transactions" },
            { icon: "💬", title: "Expert Support", desc: "Chemists ready to help" },
          ].map((f) => (
            <div key={f.title} className="flex items-start gap-3 group">
              <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                {f.icon}
              </span>
              <div>
                <p className="text-sm font-bold text-stone-800">{f.title}</p>
                <p className="text-xs text-stone-400 mt-0.5">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter */}
      <div className="bg-stone-900 py-16 px-6">
        <div className="max-w-xl mx-auto text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-amber-400 mb-3">
            Stay in the loop
          </p>
          <h2 className="text-3xl font-bold text-white mb-3" style={{ fontFamily: "'Georgia', serif" }}>
            Join the CHEMERA community
          </h2>
          <p className="text-stone-400 text-sm mb-8">
            Get early access to new chemical releases, exclusive offers, and lab insights.
          </p>
          <div className="flex gap-2 max-w-sm mx-auto">
            <input
              className="flex-1 bg-white/10 border border-white/20 rounded-full px-4 py-3 text-sm text-white placeholder-stone-500 outline-none focus:border-amber-400 transition-colors"
              placeholder="your@email.com"
            />
            <button className="px-5 py-3 bg-amber-400 text-amber-900 font-semibold rounded-full text-sm hover:bg-amber-300 transition-all whitespace-nowrap shadow-lg shadow-amber-400/20">
              Subscribe
            </button>
          </div>
        </div>
      </div>      
    </div>
  );
}