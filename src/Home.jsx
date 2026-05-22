import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Search, 
  Heart, 
  ShoppingBag, 
  Truck, 
  CheckCircle, 
  Lock, 
  MessageCircle 
} from "lucide-react";
import { PRODUCTS, CATEGORIES, HERO_SLIDES } from "./data";
import ProductCard from "./components/ProductCard";

// ---------- Hero (responsive, no arrows) ----------
function Hero({ slide, index }) {
  return (
    <div className="relative min-h-[400px] md:min-h-[580px] flex items-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out"
        style={{ backgroundImage: `url(${slide.img})` }}
      />
      {/* Changed gradient to black -> green */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-green-950 to-green-800 opacity-90" />
      {/* Decorative blobs – green accent */}
      <div
        className="absolute -right-32 -top-32 w-[600px] h-[600px] rounded-full blur-3xl opacity-20 hidden md:block"
        style={{ background: "#0d9e4e" }}
      />
      <div
        className="absolute right-32 bottom-0 w-80 h-80 rounded-full blur-xl opacity-10 hidden md:block"
        style={{ background: "#0d9e4e" }}
      />

      <div className="max-w-7xl mx-auto px-6 py-12 md:py-24 w-full relative z-10">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-4 text-green-400">
            New Reagents 2026
          </p>
          <h1
            className="text-3xl sm:text-5xl md:text-7xl font-bold text-white leading-none mb-6 whitespace-pre-line drop-shadow-2xl"
            style={{ fontFamily: "'Georgia', serif", letterSpacing: "-0.03em" }}
          >
            {slide.headline}
          </h1>
          <p className="text-gray-200 text-base md:text-lg mb-6 md:mb-10 max-w-md leading-relaxed">
            {slide.sub}
          </p>
          <div className="flex items-center gap-4">
            <button className="px-8 py-3.5 font-semibold text-sm rounded-full border border-white/20 text-white hover:bg-white/5 hover:border-white/40 transition-all">
              View Catalog
            </button>
          </div>
        </div>
      </div>

      {/* Slide indicators – green accent */}
      <div className="absolute bottom-6 left-6 flex items-center gap-3 z-10">
        {HERO_SLIDES.map((_, i) => (
          <div
            key={i}
            className="h-0.5 rounded-full transition-all duration-500"
            style={{
              width: i === index ? 32 : 12,
              background: i === index ? "#0d9e4e" : "rgba(255,255,255,0.3)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ---------- HomeHeader (unchanged, still available) ----------
function HomeHeader({ cartCount, wishlistCount, onCartOpen, searchQuery, setSearchQuery }) {
  return (
    <div className="bg-white/80 backdrop-blur-lg border-b border-gray-200 sticky top-16 z-30">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-4">
        <div className="flex-1 flex items-center bg-gray-100/80 rounded-full px-4 py-2 gap-2 border border-gray-200/60 max-w-md">
          <Search className="w-4 h-4 text-gray-400" />
          <input
            className="bg-transparent text-sm outline-none flex-1 text-gray-700 placeholder-gray-400"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3">
          <button className="relative p-2 text-gray-600 hover:text-black transition-colors group">
            <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
            {wishlistCount > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-green-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white">
                {wishlistCount}
              </span>
            )}
          </button>
          <button
            className="relative p-2 text-gray-600 hover:text-black transition-colors group"
            onClick={onCartOpen}
          >
            <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-black text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

function PromoBar() {
  const msgs = ["Free shipping on orders over $150", "Lab-grade purity guaranteed", "Bulk discounts available"];
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % msgs.length), 3000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="bg-black text-white text-[11px] font-medium tracking-widest uppercase py-2 text-center">
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
      {/* Hero – now without onNext/onPrev props */}
      <Hero slide={HERO_SLIDES[heroIdx]} index={heroIdx} />

      {/* Category pills – scrollable on small screens */}
      <div className="bg-white/80 backdrop-blur-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-3 overflow-x-auto scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                category === cat
                  ? "bg-black text-white shadow-lg shadow-gray-300"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-black"
              }`}
            >
              {cat}
            </button>
          ))}
          <div className="ml-auto flex-shrink-0">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm text-gray-600 bg-transparent border border-gray-200 rounded-full px-3 py-2 outline-none cursor-pointer focus:border-green-600 transition-colors"
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
            <p className="text-gray-500">No products found for "{searchQuery}"</p>
            <button
              onClick={() => setSearchQuery("")}
              className="mt-3 text-sm font-semibold text-black underline underline-offset-2"
            >
              Clear search
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-gray-500">
                {filtered.length} product{filtered.length !== 1 ? "s" : ""} – showing first 8
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
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
                  className="px-8 py-3.5 bg-black text-white font-semibold rounded-full hover:bg-gray-800 transition-all text-sm tracking-wide shadow-lg shadow-gray-200"
                >
                  See More Products →
                </Link>
              </div>
            )}
          </>
        )}
      </div>

      {/* Features strip – now stacks on smallest screens */}
      <div className="bg-white/70 backdrop-blur-lg border-y border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: Truck, title: "Fast Delivery", desc: "On orders over $150" },
            { icon: CheckCircle, title: "Quality Guarantee", desc: "Lab-grade purity" },
            { icon: Lock, title: "Secure Checkout", desc: "Encrypted transactions" },
            { icon: MessageCircle, title: "Expert Support", desc: "Chemists ready to help" },
          ].map((f, idx) => (
            <div key={f.title} className="flex items-start gap-3 group">
              <div className="text-green-600 group-hover:text-green-700 transition-colors">
                <f.icon className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div>
                <p className="text-sm font-bold text-black">{f.title}</p>
                <p className="text-xs text-gray-400 mt-0.5">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter – input & button stack vertically on small screens */}
      <div className="bg-black py-16 px-6">
        <div className="max-w-xl mx-auto text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-green-400 mb-3">
            Stay in the loop
          </p>
          <h2 className="text-3xl font-bold text-white mb-3" style={{ fontFamily: "'Georgia', serif" }}>
            Join the CJ Delux community
          </h2>
          <p className="text-gray-400 text-sm mb-8">
            Get early access to new chemical releases, exclusive offers, and lab insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto">
            <input
              className="flex-1 bg-white/10 border border-white/20 rounded-full px-4 py-3 text-sm text-white placeholder-gray-500 outline-none focus:border-green-400 transition-colors"
              placeholder="your@email.com"
            />
            <button className="px-5 py-3 bg-green-600 text-white font-semibold rounded-full text-sm hover:bg-green-500 transition-all whitespace-nowrap shadow-lg shadow-green-600/20">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}