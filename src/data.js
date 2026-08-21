// data.js — the product catalogue.
//
// Images are local files served from /public. Company facts, contact details
// and navigation live in site.js.

export const PRODUCTS = [
  // ── Food Grade Raw Materials ─────────────────────────────────────────────

  {
    id: 1,
    name: "Corn Starch",
    category: "Food Grade Raw Materials",
    img: "/corn-starch.jpg"
  },
  {
    id: 2,
    name: "Glycerine",
    category: "Food Grade Raw Materials",
    img: "/Glycerin.jpg"
  },
  {
    id: 3,
    name: "Liquid Glucose (Pharma Grade)",
    category: "Food Grade Raw Materials",
    img: "/LIquid-Glucose-Pharma.jpg"
  },
  {
    id: 4,
    name: "Liquid Glucose (Confectionery Grade)",
    category: "Food Grade Raw Materials",
    img: "/Liquid-Glucose-(Confectionery-Grade).jpg"
  },
  {
    id: 5,
    name: "Sodium Bicarbonate",
    category: "Food Grade Raw Materials",
    img: "/Sodium-Bicarbonate.jpg"
  },
  {
    id: 6,
    name: "Ammonium Bicarbonate",
    category: "Food Grade Raw Materials",
    img: "/Ammonium-Bicarbonate.jpg"
  },
  {
    id: 7,
    name: "Dextrose Anhydrous",
    category: "Food Grade Raw Materials",
    img: "/Dextrose-Anhydrous.jpg"
  },
  {
    id: 8,
    name: "Dextrose Monohydrate",
    category: "Food Grade Raw Materials",
    img: "/Dextrose-Monohydrate.jpg"
  },
  {
    id: 9,
    name: "Maltodextrin (15-20 DE)",
    category: "Food Grade Raw Materials",
    img: "/Maltodextrin-(15-20-DE).jpg"
  },
  {
    id: 10,
    name: "Maltodextrin (20-25 DE)",
    category: "Food Grade Raw Materials",
    img: "/Maltodextrin-(20-25-DE).jpg"
  },
  {
    id: 11,
    name: "Citric Acid Monohydrate",
    category: "Food Grade Raw Materials",
    img: "/Citric-Acid-Monohydrate.jpg"
  },
  {
    id: 12,
    name: "Citric Acid Anhydrous",
    category: "Food Grade Raw Materials",
    img: "/Citric-Acid-Anhydrous.jpg"
  },
  {
    id: 13,
    name: "Cocoa Powder (Natural)",
    category: "Food Grade Raw Materials",
    img: "/Cocoa-Powder-(Natural).jpg"
  },
  {
    id: 14,
    name: "Cocoa Powder (Alkalized)",
    category: "Food Grade Raw Materials",
    img: "/Cocoa-Powder-(Alkalized).jpg"
  },
  {
    id: 15,
    name: "Soya Fiber",
    category: "Food Grade Raw Materials",
    img: "/Soya-Fiber.jpg"
  },
  {
    id: 16,
    name: "Soya Lecithin",
    category: "Food Grade Raw Materials",
    img: "/Soya-Lecithin.jpg"
  },
  {
    id: 17,
    name: "Sorbitol",
    category: "Food Grade Raw Materials",
    img: "/Sorbitol.jpg"
  },
  {
    id: 18,
    name: "Whey Powder",
    category: "Food Grade Raw Materials",
    img: "/Whey-Powder.jpg"
  },
  {
    id: 19,
    name: "Trisodium Citrate",
    category: "Food Grade Raw Materials",
    img: "/Trisodium-Citrate.png"
  },

  // ── Industrial Grade ─────────────────────────────────────────────────────

  {
    id: 20,
    name: "Hydrogen Peroxide",
    category: "Industrial Grade",
    img: "/Hydrogen-Peroxide.jpg"
  },
  {
    id: 21,
    name: "Hydrochloric Acid",
    category: "Industrial Grade",
    img: "/Hydrochloric-Acid.jpg"
  },
  {
    id: 22,
    name: "Ethyl Acetate",
    category: "Industrial Grade",
    img: "/Ethyl-Acetate.png"
  },
  {
    id: 23,
    name: "Caustic Soda Pearls",
    category: "Industrial Grade",
    img: "/Caustic-Soda-Pearls.jpg"
  },
  {
    id: 24,
    name: "Caustic Soda Flakes",
    category: "Industrial Grade",
    img: "/Caustic-Soda-Flakes.jpg"
  },
  {
    id: 25,
    name: "Hydrated Lime",
    category: "Industrial Grade",
    img: "/Hydrated-Lime.jpg"
  },

  // ── Sweeteners ───────────────────────────────────────────────────────────

  {
    id: 26,
    name: "Acesulfame K",
    category: "Sweeteners",
    img: "/Acesulfame-K.jpg"
  },
  {
    id: 27,
    name: "Sucralose",
    category: "Sweeteners",
    img: "/Sucralose.jpg"
  },
  {
    id: 28,
    name: "Aspartame",
    category: "Sweeteners",
    img: "/Aspartame.jpg"
  },

  // ── Vitamins ─────────────────────────────────────────────────────────────

  {
    id: 29,
    name: "Vitamin A Palmitate 250 SD CWS/S",
    category: "Vitamins",
    img: "/Vitamin-A-Palmitate-250-SD.jpg"
  },
  {
    id: 30,
    name: "Vitamin A Acetate 325 SD CWS/S",
    category: "Vitamins",
    img: "/vitamin-a-acetate-325-cws-retinyl-acetate.jpg"
  },
  {
    id: 31,
    name: "Ascorbic Acid (Vitamin C)",
    category: "Vitamins",
    img: "/Ascorbic-Acid.jpg"
  },
  {
    id: 32,
    name: "Nicotinamide",
    category: "Vitamins",
    img: "/Nicotinamide.jpg"
  },
  {
    id: 33,
    name: "Vitamin E",
    category: "Vitamins",
    img: "/Vitamin-E.jpg"
  },
  {
    id: 34,
    name: "Vitamin B3",
    category: "Vitamins",
    img: "/Vitamin-B3.jpg"
  }
];

export const CATEGORIES = [
  "General",
  "Food Grade Raw Materials",
  "Industrial Grade",
  "Sweeteners",
  "Vitamins",
];

/**
 * The four disciplines, as shown on the homepage index.
 *
 * `count` is derived from PRODUCTS rather than written down, so the figure on
 * the page can never drift out of step with the catalogue.
 */
export const CATEGORY_META = [
  {
    name: "Food Grade Raw Materials",
    short: "Food Grade",
    index: "01",
    blurb:
      "Starches, glucose syrups, acidulants and emulsifiers for beverage, bakery and confectionery lines.",
  },
  {
    name: "Industrial Grade",
    short: "Industrial",
    index: "02",
    blurb:
      "Caustics, acids and solvents for treatment, manufacturing and process chemistry.",
  },
  {
    name: "Sweeteners",
    short: "Sweeteners",
    index: "03",
    blurb:
      "High-intensity sweeteners for consistent sweetness at a lower cost in use.",
  },
  {
    name: "Vitamins",
    short: "Vitamins",
    index: "04",
    blurb:
      "Vitamin actives and fortification-ready grades for premix and reformulation work.",
  },
].map((c) => ({
  ...c,
  count: PRODUCTS.filter((p) => p.category === c.name).length,
}));

/** How we work. Four commitments, no numbers we cannot stand behind. */
export const PRACTICES = [
  {
    index: "01",
    title: "Documented on arrival",
    body: "Every consignment ships with a certificate of analysis, batch number and manufacture date, matched to the lot in your store.",
  },
  {
    index: "02",
    title: "Grade-correct, always",
    body: "Food, pharmaceutical and industrial grades are stored and handled separately. What you specify is what reaches your process.",
  },
  {
    index: "03",
    title: "Held in stock locally",
    body: "Warehoused in Lagos and dispatched nationwide — trial quantities through to full container loads, without waiting on a vessel.",
  },
  {
    index: "04",
    title: "Technical people on the line",
    body: "Speak to someone who knows the material: substitutions, handling, storage and dosage guidance included.",
  },
];

/** Paperwork issued with each consignment. */
export const DOCUMENTATION = [
  "Certificate of Analysis",
  "Technical Data Sheet",
  "Safety Data Sheet",
  "Batch & manufacture date",
];
