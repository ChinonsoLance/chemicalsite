import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  NavLink,
  useLocation,
} from "react-router-dom";

import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import Products from "./Products";
import Footer from "./components/Footer";
import ThemeToggle from "./components/Theme";
import ErrorBoundary from "./components/ErrorBoundary";
import { useScrolledPast } from "./hooks/useScroll";
import { COMPANY, NAV_LINKS } from "./site";

import logo from "./assets/cj-deluz.png";

/* ---------------------------------------------------------------
   Nav
   --------------------------------------------------------------- */
function Navbar() {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const scrolled = useScrolledPast(8);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-ink"
      >
        Skip to content
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 bg-paper transition-[border-color] duration-300 ${
          scrolled ? "border-b border-rule" : "border-b border-transparent"
        }`}
      >
        <nav className="wrap flex h-[var(--nav-h)] items-center justify-between gap-6">
          <Link
            to="/"
            className="flex items-center gap-2.5"
            aria-label={`${COMPANY.name} home`}
          >
            <img src={logo} alt="" className="h-8 w-auto" />
            <span className="flex flex-col leading-none">
              <span className="display-sm text-[15px] tracking-tight">
                {COMPANY.name}
              </span>
              <span className="label mt-0.5 text-[9px]">{COMPANY.suffix}</span>
            </span>
          </Link>

          <div className="hidden items-center gap-9 md:flex">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                data-active={pathname === link.to}
                className="nav-link"
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-2.5">
            <ThemeToggle />

            <Link to="/contact" className="btn btn-solid hidden md:inline-flex">
              Enquire
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              className="btn-icon text-ink md:hidden"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              <span className="relative block h-2.5 w-4">
                <span
                  className={`absolute left-0 block h-px w-full bg-current transition-all duration-300 ${
                    menuOpen ? "top-1 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 block h-px w-full bg-current transition-all duration-300 ${
                    menuOpen ? "top-1 -rotate-45" : "top-2.5"
                  }`}
                />
              </span>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile sheet */}
      <div
        className={`fixed inset-0 z-40 bg-paper transition-opacity duration-300 md:hidden ${
          menuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <div className="wrap flex h-full flex-col justify-center">
          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className="row-item flex items-baseline gap-5"
            >
              <span className="label num label-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className={`display text-[1.9rem] ${
                  pathname === link.to ? "text-accent" : ""
                }`}
              >
                {link.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();

  // Block body, not a concise arrow. `useEffect(() => window.scrollTo(0, 0))`
  // implicitly returns whatever scrollTo returns, and React treats an effect's
  // return value as its cleanup function. That is normally undefined and
  // harmless -- but browser extensions routinely wrap window methods, and if
  // one makes scrollTo return anything else, React calls it on unmount, throws
  // "destroy is not a function", and unmounts the whole tree to a blank page.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

/* ---------------------------------------------------------------
   App
   --------------------------------------------------------------- */
export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />

      <main id="main" className="relative z-10">
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </ErrorBoundary>
      </main>

      <Footer />
    </BrowserRouter>
  );
}
