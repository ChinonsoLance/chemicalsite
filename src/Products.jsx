import { useState } from "react";
import { PRODUCTS, CATEGORIES } from "./data";
import ProductCard from "./components/ProductCard";

export default function Products({
  cart,
  wishlist,
  addToCart,
  toggleWishlist,
  setCartOpen,
}) {
  const [category, setCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");

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

  return (
    <div className="min-h-screen bg-stone-50 pt-20">
      {/* PromoBar? We can reuse it, but for simplicity we'll just do a top section */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <h1 className="text-3xl font-bold text-stone-900 mb-2" style={{ fontFamily: "'Georgia', serif" }}>
          All Products
        </h1>
        <p className="text-stone-500 text-sm mb-6">
          Browse our complete catalogue of high‑purity chemicals and lab supplies.
        </p>

        {/* Search bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex items-center bg-white rounded-full px-4 py-2 gap-2 border border-stone-200 max-w-md flex-1">
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
          
        </div>

        {/* Category pills */}
        {/* <div className="flex items-center gap-3 overflow-x-auto scrollbar-none mb-6">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                category === cat
                  ? "bg-stone-900 text-white shadow-md"
                  : "bg-stone-100 text-stone-600 hover:bg-stone-200"
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
        </div> */}

        {/* Product grid – no limit */}
        {filtered.length === 0 ? (
          <div className="text-center py-16">
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
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filtered.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onAddToCart={addToCart}
                onWishlistToggle={toggleWishlist}
                isWishlisted={wishlist.includes(p.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}