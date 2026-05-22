import { useState } from "react";
import StarRating from "./StarRating";

export default function ProductCard({ product, onAddToCart, onWishlistToggle, isWishlisted }) {
  const badgeText = product.badge;
  const [imgError, setImgError] = useState(false);

  return (
    <div className="group relative bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden border border-gray-100/80 shadow-sm hover:shadow-2xl hover:shadow-green-500/20 hover:border-green-500 transition-all duration-500">
      {/* Badge */}
      {badgeText && (
        <div
          className={`absolute top-3 left-3 z-10 px-3 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase shadow-lg backdrop-blur-sm ${
            badgeText === "Sale"
              ? "bg-rose-500/90 text-white"
              : badgeText === "New"
              ? "bg-green-600/90 text-white"
              : "bg-amber-400/90 text-amber-900"
          }`}
        >
          {badgeText}
        </div>
      )}

      {/* Wishlist */}
      <button
        onClick={() => onWishlistToggle(product.id)}
        className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/90 shadow-sm backdrop-blur-sm flex items-center justify-center transition-all hover:scale-110 opacity-0 group-hover:opacity-100"
      >
        <svg
          className={`w-4 h-4 ${isWishlisted ? "fill-rose-500 text-rose-500" : "text-gray-400"}`}
          fill={isWishlisted ? "currentColor" : "none"}
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </button>

      {/* Image */}
      <div className="relative h-56 overflow-hidden bg-gray-50">
        <img
          src={imgError ? "https://picsum.photos/seed/fallback/400/400" : product.img}
          alt={product.name}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Info (no price) */}
      <div className="p-4">
        <h3 className="text-sm font-semibold text-gray-800 mb-2 line-clamp-1 group-hover:text-black transition-colors">
          {product.name}
        </h3>
        
        {/* Add to Cart button */}
        <div className="flex justify-end">
          <button
            onClick={() => onAddToCart(product)}
            className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-all hover:scale-110 active:scale-95 shadow-md shadow-black/10"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}