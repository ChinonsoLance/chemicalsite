import { useState, useEffect, useRef } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
  NavLink,
} from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import Products from "./Products";
import Footer from "./components/Footer";
import Backdrop from "./components/Backdrop";
import { useScrollTick } from "./hooks/useScroll";

// -------- IMPORT YOUR LOGO HERE ----------
import logo from "./assets/cj-deluz.png";

// Centred nav links; "Contact" is pinned to the right rail on desktop.
const CENTER_LINKS = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/about", label: "About" },
];
const CONTACT_LINK = { to: "/contact", label: "Contact Us" };

// ---------- Loading Screen ----------
function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-abyss">
      <div className="absolute inset-0 opacity-70">
        <div className="backdrop-orb backdrop-orb--a" />
        <div className="backdrop-orb backdrop-orb--c" />
      </div>

      <div className="relative flex flex-col items-center gap-8">
        <div className="relative">
          <div className="absolute -inset-10 rounded-full bg-jade-500/20 blur-3xl" />
          <img
            src={logo}
            alt="CJ-DELUZ"
            className="relative h-20 w-auto float-slow drop-shadow-[0_10px_30px_rgba(0,0,0,0.6)]"
          />
        </div>

        <div className="h-px w-56 overflow-hidden bg-white/10">
          <div className="loader-sweep h-full w-1/3 bg-gradient-to-r from-transparent via-jade-400 to-transparent" />
        </div>

        <p className="eyebrow">Calibrating</p>
      </div>
    </div>
  );
}

// ---------- Reading-progress rail ----------
function ScrollProgress() {
  const barRef = useRef(null);

  // Written straight to the DOM — a progress rail should not re-render React
  // on every animation frame.
  useScrollTick(() => {
    const bar = barRef.current;
    if (!bar) return;
    const doc = document.documentElement;
    const max = doc.scrollHeight - window.innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
  });

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-50 h-px bg-white/5">
      <div
        ref={barRef}
        className="h-full origin-left bg-gradient-to-r from-jade-600 via-jade-300 to-jade-500 shadow-[0_0_14px_rgba(52,217,127,0.8)]"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function CartDrawer({ cart, onClose, onRemove, onUpdateQty }) {
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  return (
    <div className="fixed inset-0 z-[60] flex">
      <div className="flex-1 bg-abyss/70 backdrop-blur-sm" onClick={onClose} />
      <div className="glass-strong flex w-full max-w-md flex-col shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-5 sm:px-7">
          <h2 className="display text-2xl text-white">
            Cart <span className="text-jade-400">({cart.reduce((s, i) => s + i.qty, 0)})</span>
          </h2>
          <button
            onClick={onClose}
            className="p-1 text-haze transition-colors hover:text-white"
            aria-label="Close cart"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto px-5 py-5 sm:px-7">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/5">
                <svg className="h-6 w-6 text-jade-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <p className="text-sm text-haze">Your cart is empty</p>
              <button onClick={onClose} className="mt-4 text-sm font-medium text-jade-300 underline underline-offset-4">
                Continue browsing
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex items-start gap-4 border-b border-white/5 py-3">
                <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl border border-white/10 bg-white/5">
                  <img src={item.img} alt={item.name} className="h-full w-full object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-1 text-sm font-medium text-white">{item.name}</p>
                  <p className="mt-0.5 text-xs text-haze">{item.category}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2 py-0.5">
                      <button onClick={() => onUpdateQty(item.id, item.qty - 1)} className="h-5 w-5 text-haze hover:text-white">−</button>
                      <span className="w-4 text-center text-xs font-medium text-white">{item.qty}</span>
                      <button onClick={() => onUpdateQty(item.id, item.qty + 1)} className="h-5 w-5 text-haze hover:text-white">+</button>
                    </div>
                    <button onClick={() => onRemove(item.id)} className="ml-auto text-haze transition-colors hover:text-rose-400">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="space-y-3 border-t border-white/10 px-5 py-6 sm:px-7">
            <div className="flex justify-between text-sm text-haze">
              <span>Subtotal</span>
              <span className="font-mono">${total.toFixed(2)}</span>
            </div>
            <button className="btn-primary mt-1 w-full rounded-full py-3.5 text-sm">
              Request Quote
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Toast({ message }) {
  return (
    <div className="glass-strong fade-in-up fixed bottom-8 left-1/2 z-[70] flex max-w-[90vw] items-center gap-2.5 rounded-full px-5 py-3 text-sm text-white shadow-2xl">
      <svg className="h-4 w-4 flex-shrink-0 text-jade-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
      <span className="truncate">{message}</span>
    </div>
  );
}

// ---------- Navbar ----------
function Navbar() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useScrollTick(() => setScrolled(window.scrollY > 24));

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <ScrollProgress />

      <header
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-700 ${
          scrolled
            ? "border-b border-white/10 bg-abyss/72 backdrop-blur-2xl backdrop-saturate-150"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <nav className="relative mx-auto flex h-[var(--nav-h)] max-w-[var(--shell)] items-center justify-between px-5 sm:px-8">
          {/* Left — mark */}
          <Link to="/" className="group flex items-center gap-3" aria-label="CJ-DELUZ home">
            <span className="relative">
              <span className="absolute -inset-3 rounded-full bg-jade-500/0 blur-xl transition-all duration-500 group-hover:bg-jade-500/25" />
              <img src={logo} alt="CJ-DELUZ" className="relative h-11 w-auto sm:h-12" />
            </span>
            <span className="hidden flex-col leading-none sm:flex">
              <span className="display text-lg text-white">CJ-DELUZ</span>
              <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-jade-300/70">
                Nig. Ltd
              </span>
            </span>
          </Link>

          {/* Centre — primary links, optically centred on the page itself */}
          <div className="pointer-events-none absolute left-1/2 hidden -translate-x-1/2 items-center gap-11 md:flex">
            <div className="pointer-events-auto flex items-center gap-11">
            {CENTER_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                data-active={isActive(link.to)}
                className="nav-link text-[13px] font-medium uppercase tracking-[0.16em]"
              >
                {link.label}
              </NavLink>
            ))}
            </div>
          </div>

          {/* Right — Contact, pinned to the far edge */}
          <div className="flex items-center justify-end gap-3">
            <Link
              to={CONTACT_LINK.to}
              className={`hidden rounded-full px-6 py-2.5 text-[12px] font-semibold uppercase tracking-[0.16em] transition-all duration-500 md:inline-flex ${
                isActive(CONTACT_LINK.to)
                  ? "btn-primary"
                  : "btn-ghost"
              }`}
            >
              {CONTACT_LINK.label}
            </Link>

            <button
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/5 text-white backdrop-blur-md transition-colors hover:border-jade-400/50 md:hidden"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              <span className="relative block h-3 w-5">
                <span
                  className={`absolute left-0 block h-px w-full bg-current transition-all duration-500 ${
                    mobileMenuOpen ? "top-1.5 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 block h-px w-full bg-current transition-all duration-500 ${
                    mobileMenuOpen ? "top-1.5 -rotate-45" : "top-3"
                  }`}
                />
              </span>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile overlay menu */}
      <div
        className={`fixed inset-0 z-[45] md:hidden ${
          mobileMenuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div
          className={`absolute inset-0 bg-abyss/92 backdrop-blur-2xl transition-opacity duration-500 ${
            mobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMobileMenuOpen(false)}
        />
        <div className="relative flex h-full flex-col justify-center px-8">
          {[...CENTER_LINKS, CONTACT_LINK].map((link, i) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileMenuOpen(false)}
              className="group border-b border-white/8 py-5"
              style={{
                transform: mobileMenuOpen ? "translateY(0)" : "translateY(28px)",
                opacity: mobileMenuOpen ? 1 : 0,
                transition: `transform .8s var(--ease-out-expo) ${i * 70}ms, opacity .8s var(--ease-out-expo) ${i * 70}ms`,
              }}
            >
              <span className="font-mono text-[10px] tracking-[0.3em] text-jade-300/60">
                0{i + 1}
              </span>
              <span
                className={`display mt-1 block text-4xl transition-colors ${
                  isActive(link.to) ? "text-jade-300" : "text-white"
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

// ---------- Main App ----------
export default function App() {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const addToCart = (product, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) return prev.map((i) => (i.id === product.id ? { ...i, qty: i.qty + qty } : i));
      return [...prev, { ...product, qty }];
    });
    showToast(`${product.name} added to cart`);
  };

  const removeFromCart = (id) => setCart((prev) => prev.filter((i) => i.id !== id));

  const updateQty = (id, qty) => {
    if (qty < 1) {
      removeFromCart(id);
      return;
    }
    setCart((prev) => prev.map((i) => (i.id === id ? { ...i, qty } : i)));
  };

  const toggleWishlist = (id) =>
    setWishlist((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));

  if (isLoading) return <LoadingScreen />;

  return (
    <BrowserRouter>
      {/* One atmosphere for the entire site — never remounts between routes */}
      <Backdrop />
      <ScrollToTop />
      <Navbar />

      <main className="relative z-10">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                cart={cart}
                wishlist={wishlist}
                addToCart={addToCart}
                toggleWishlist={toggleWishlist}
                setCartOpen={setCartOpen}
              />
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/products"
            element={
              <Products
                cart={cart}
                wishlist={wishlist}
                addToCart={addToCart}
                toggleWishlist={toggleWishlist}
                setCartOpen={setCartOpen}
              />
            }
          />
        </Routes>
      </main>

      <Footer />

      {cartOpen && (
        <CartDrawer
          cart={cart}
          onClose={() => setCartOpen(false)}
          onRemove={removeFromCart}
          onUpdateQty={updateQty}
        />
      )}
      {toast && <Toast message={toast} />}
    </BrowserRouter>
  );
}
