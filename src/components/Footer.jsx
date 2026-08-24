// src/components/Footer.jsx — the closing dark band. It carries the same
// emerald atmosphere as the hero, so the site opens and closes on the same
// note with the paper zone held in between.
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Reveal, DrawRule } from "./Motion";
import Atmosphere from "./Atmosphere";
import logo from "../assets/cj-deluz.png";

const columns = [
  {
    title: "Catalogue",
    links: [
      { label: "All Products", to: "/products" },
      { label: "Food Grade Raw Materials", to: "/products" },
      { label: "Industrial Grade", to: "/products" },
      { label: "Sweeteners", to: "/products" },
      { label: "Vitamins", to: "/products" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", to: "/about" },
      { label: "Contact Us", to: "/contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative z-10 overflow-hidden bg-forest-950">
      <Atmosphere variant="band" intensity={0.85} />

      <div className="relative z-10 mx-auto max-w-[var(--shell)] px-5 pb-10 pt-20 sm:px-8 md:pt-28">
        {/* Wordmark */}
        <Reveal variant="up">
          <p className="display text-[clamp(2.6rem,11vw,8rem)] leading-none text-jade-300/10">
            CJ-DELUZ
          </p>
        </Reveal>

        <DrawRule className="mt-10" />

        <div className="mt-14 grid gap-12 md:grid-cols-12">
          {/* Identity */}
          <Reveal variant="up" className="md:col-span-5">
            <div className="flex items-center gap-3">
              <img src={logo} alt="CJ-DELUZ" className="h-12 w-auto" />
              <span className="flex flex-col leading-none">
                <span className="display text-xl text-white">CJ-DELUZ</span>
                <span className="text-[9px] font-semibold uppercase tracking-[0.28em] text-jade-300/70">
                  Nig. Ltd
                </span>
              </span>
            </div>
            <p className="mt-6 max-w-sm text-sm leading-[1.85] text-mist/60">
              Chemical raw materials for food, beverage, pharmaceutical and
              industrial manufacturing — held in stock in Lagos and documented
              lot by lot.
            </p>
            <a
              href="https://wa.me/2347047535828"
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-jade-300"
            >
              +234 704 753 5828
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </Reveal>

          {/* Link columns */}
          {columns.map((col, ci) => (
            <Reveal
              key={col.title}
              variant="up"
              delay={80 + ci * 60}
              className="md:col-span-3"
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-mist/45">
                {col.title}
              </p>
              <ul className="mt-6 space-y-3.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      to={l.to}
                      className="text-sm text-mist/65 transition-colors duration-300 hover:text-jade-300"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}

          {/* Back to top */}
          <Reveal variant="up" delay={300} className="md:col-span-1">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-jade-300/25 text-mist/70 transition-all duration-500 hover:border-jade-400/60 hover:bg-jade-500/10 hover:text-white"
              aria-label="Back to top"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 15l7-7 7 7" />
              </svg>
            </button>
          </Reveal>
        </div>

        <div className="mt-20 flex flex-col items-center justify-between gap-4 border-t border-jade-300/12 pt-8 sm:flex-row">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-mist/40">
            © {new Date().getFullYear()} CJ-DELUZ (NIG) LTD
          </p>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-mist/40">
            Lagos, Nigeria
          </p>
        </div>
      </div>
    </footer>
  );
}
