// ProductCard.jsx — one material in the catalogue grid.
//
// Flat and square-shouldered: a plate, a category, a name. No badges, no
// wishlist heart, no hover glow. The catalogue's job is to let a buyer scan 34
// materials quickly, and every ornament added to a card is repeated 34 times.

import { useState } from "react";
import { CATEGORY_META } from "../data";

// "Food Grade Raw Materials" is too long to sit above a card name.
const shortLabel = (category) =>
  CATEGORY_META.find((c) => c.name === category)?.short || category;

export default function ProductCard({ product, index }) {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <article className="card">
      <div className="card-plate">
        {imgFailed ? (
          <div className="flex h-full w-full items-center justify-center">
            <span className="label num">No image</span>
          </div>
        ) : (
          <img
            src={product.img}
            alt={product.name}
            onError={() => setImgFailed(true)}
            loading="lazy"
            decoding="async"
          />
        )}
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="flex items-baseline justify-between gap-3">
          <span className="label">{shortLabel(product.category)}</span>
          {index != null && (
            <span className="label num text-ink-3">
              {String(index).padStart(3, "0")}
            </span>
          )}
        </div>

        <h3 className="display-sm mt-2.5 text-[15px] leading-snug sm:text-base">
          {product.name}
        </h3>
      </div>
    </article>
  );
}
