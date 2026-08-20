import { useState } from "react";

export default function ProductCard({ product, onWishlistToggle, isWishlisted }) {
  const [imgError, setImgError] = useState(false);

  return (
    <article className="lux-card glass group h-full rounded-[22px]">
      {product.badge && (
        <span
          className={`absolute left-4 top-4 z-10 rounded-full px-3 py-1 font-mono text-[9px] uppercase tracking-[0.2em] ${
            product.badge === "Sale"
              ? "bg-rose-500/85 text-white"
              : "bg-jade-500/90 text-abyss"
          }`}
        >
          {product.badge}
        </span>
      )}

      {onWishlistToggle && (
        <button
          onClick={() => onWishlistToggle(product.id)}
          aria-label="Save product"
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/12 bg-abyss/80 opacity-0 transition-all duration-500 hover:scale-110 hover:border-jade-400/50 group-hover:opacity-100"
        >
          <svg
            className={`h-4 w-4 ${isWishlisted ? "fill-jade-400 text-jade-400" : "text-mist/70"}`}
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
      <div className="relative aspect-square overflow-hidden bg-forest-950/60">
        <img
          src={imgError ? "https://picsum.photos/seed/cjdeluz/600/600" : product.img}
          alt={product.name}
          onError={() => setImgError(true)}
          className="h-full w-full object-cover opacity-85 transition-all duration-[1200ms] ease-out group-hover:scale-[1.08] group-hover:opacity-100"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950/90 via-forest-950/10 to-transparent" />
        <div className="absolute inset-0 bg-jade-600/0 mix-blend-overlay transition-colors duration-700 group-hover:bg-jade-600/15" />
      </div>

      {/* Label */}
      <div className="relative p-4 sm:p-5">
        <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-jade-300/60">
          {product.category}
        </p>
        <h3 className="mt-2 line-clamp-2 text-sm leading-snug text-white/90 transition-colors group-hover:text-white sm:text-[15px]">
          {product.name}
        </h3>
      </div>
    </article>
  );
}
