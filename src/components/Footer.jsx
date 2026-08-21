import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

import { CATEGORY_META } from "../data";
import { COMPANY, CONTACT, NAV_LINKS } from "../site";
import logo from "../assets/cj-deluz.png";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-rule">
      <div className="wrap py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          {/* Identity */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5">
              <img src={logo} alt="" className="h-9 w-auto" />
              <span className="flex flex-col leading-none">
                <span className="display-sm text-base">{COMPANY.name}</span>
                <span className="label mt-0.5 text-[9px]">
                  {COMPANY.suffix}
                </span>
              </span>
            </div>

            <p className="prose-body mt-6 max-w-sm text-[14px]">
              {COMPANY.summary}
            </p>

            <a
              href={CONTACT.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="link-rule mt-8"
            >
              {CONTACT.phoneDisplay}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>

          {/* Catalogue */}
          <div className="md:col-span-4">
            <p className="label">Catalogue</p>
            <ul className="mt-6 space-y-3">
              {CATEGORY_META.map((c) => (
                <li key={c.name}>
                  <Link
                    to="/products"
                    className="flex items-baseline justify-between gap-4 text-[14px] text-ink-2 transition-colors hover:text-ink"
                  >
                    <span>{c.name}</span>
                    <span className="label num">{c.count}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Pages */}
          <div className="md:col-span-3">
            <p className="label">Pages</p>
            <ul className="mt-6 space-y-3">
              {NAV_LINKS.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-[14px] text-ink-2 transition-colors hover:text-ink"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-rule pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="label">
            © {new Date().getFullYear()} {COMPANY.legalName}
          </p>
          <p className="label">
            {COMPANY.city}, {COMPANY.country}
          </p>
        </div>
      </div>
    </footer>
  );
}
