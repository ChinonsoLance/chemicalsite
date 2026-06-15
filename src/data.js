// All images sourced from Wikimedia Commons (public domain / CC licensed).
// URLs use the standard upload.wikimedia.org CDN — they render correctly in
// any browser (Wikimedia only blocks non-browser bot traffic at the server level).

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
    img: "/Liquid-Glucose-Pharma.jpg"
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
    img: "/Vitamin-A-Acetate.jpg"
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
  "All",
  "Food Grade Raw Materials",
  "Industrial Grade",
  "Sweeteners",
  "Vitamins",
];


export const HERO_SLIDES = [
  {
    headline: "Precision Chemicals,\nFor Your Lab",
    sub: "High-purity reagents and solvents for accurate research",
    cta: "Shop Reagents",
    bg: "from-stone-900 via-stone-800 to-amber-950",
    accent: "#e9c46a",
    img: "https://images.unsplash.com/photo-1581093458791-9d4248b5a7a6?auto=format&fit=crop&w=1200&h=800&q=80",
  },
  {
    headline: "Sale Up\nTo 40% Off",
    sub: "Limited time on selected laboratory supplies",
    cta: "Shop Sale",
    bg: "from-slate-900 via-blue-950 to-slate-800",
    accent: "#90e0ef",
    img: "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&w=1200&h=800&q=80",
  },
  {
    headline: "New Arrivals\nThis Week",
    sub: "Latest glassware, equipment, and safety gear",
    cta: "Explore New In",
    bg: "from-rose-950 via-stone-900 to-stone-800",
    accent: "#ffb4a2",
    img: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&h=800&q=80",
  },
];