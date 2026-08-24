import { useState } from "react";

// Lives in the light zone: a white plate with a soft green-cast shadow, an
// emerald wash that warms the photo on hover, and the name set in Montserrat.
export default function ProductCard({ product, onWishlistToggle, isWishlisted }) {
  const [imgError, setImgError] = useState(false);

  return (
    <article className="lift card group flex h-full flex-col rounded-[22px]">
      {product.badge && (
        <span
          className={`absolute left-4 top-4 z-10 rounded-full px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.2em] ${
            product.badge === "Sale"
              ? "bg-rose-500 text-white"
              : "bg-jade-600 text-white"
          }`}
        >
          {product.badge}
        </span>
      )}

      {onWishlistToggle && (
        <button
          onClick={() => onWishlistToggle(product.id)}
          aria-label="Save product"
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-edge bg-white/90 opacity-0 shadow-sm transition-all duration-500 hover:scale-110 hover:border-jade-500/60 group-hover:opacity-100"
        >
          <svg
            className={`h-4 w-4 ${isWishlisted ? "fill-jade-600 text-jade-600" : "text-sage"}`}
            fill={isWishlisted ? "currentColor" : "none"}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      )}

      {/* Plate */}
      <div className="relative aspect-square overflow-hidden bg-paper-2">
        <img
          src={imgError ? "https://picsum.photos/seed/cjdeluz/600/600" : product.img}
          alt={product.name}
          onError={() => setImgError(true)}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bark/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-jade-500/0 transition-colors duration-700 group-hover:bg-jade-500/12" />
      </div>

      {/* Label */}
      <div className="relative flex flex-1 flex-col p-4 sm:p-5">
        <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-jade-700">
          {product.category}
        </p>
        <h3 className="mt-2 line-clamp-2 text-sm font-semibold leading-snug text-bark sm:text-[15px]">
          {product.name}
        </h3>
        <span className="mt-3 inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-sage transition-colors duration-500 group-hover:text-jade-700">
          <span className="h-1 w-1 rounded-full bg-jade-500" />
          In stock
        </span>
      </div>
    </article>
  );
}
