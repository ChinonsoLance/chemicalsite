import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import Products from "./Products";
import Footer from "./components/Footer";

// ---------- Shared Components ----------
import StarRating from "./components/StarRating";
import ProductCard from "./components/ProductCard";

// -------- IMPORT YOUR LOGO HERE ----------
import logo from "./assets/cj-deluz.png";

// ---------- Loading Screen Component ----------
function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-6 animate-pulse">
        {/* Logo with a subtle glow */}
        <div className="relative">
          <img src={logo} alt="CJ-DELUZ" className="h-20 w-auto" />
          <div className="absolute inset-0 bg-green-600/10 blur-2xl rounded-full" />
        </div>
        
        {/* Loading spinner */}
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 border-4 border-gray-100 rounded-full" />
          <div className="absolute inset-0 border-4 border-green-600 rounded-full border-t-transparent animate-spin" />
        </div>
        
        {/* Loading text */}
        <p className="text-xs font-medium tracking-[0.2em] uppercase text-gray-400">
          Loading
        </p>
      </div>
    </div>
  );
}

function CartDrawer({ cart, onClose, onRemove, onUpdateQty }) {
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="w-full max-w-md bg-white/95 backdrop-blur-xl flex flex-col shadow-2xl border-l border-stone-100">
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 border-b border-stone-100">
          <h2 className="text-lg font-bold text-stone-900" style={{ fontFamily: "'Georgia', serif" }}>
            Cart ({cart.reduce((s, i) => s + i.qty, 0)})
          </h2>
          <button onClick={onClose} className="p-1 text-stone-400 hover:text-stone-700 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <span className="text-5xl mb-4 opacity-30">🛍️</span>
              <p className="text-stone-500 text-sm">Your cart is empty</p>
              <button onClick={onClose} className="mt-4 text-sm font-semibold text-stone-900 underline underline-offset-2">Continue Shopping</button>
            </div>
          ) : cart.map(item => (
            <div key={item.id} className="flex items-start gap-3 sm:gap-4 py-3 border-b border-stone-50">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden flex-shrink-0 bg-stone-100 shadow-sm">
                <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-stone-800 line-clamp-1">{item.name}</p>
                <p className="text-xs text-stone-400 mt-0.5">{item.category}</p>
                <div className="flex items-center gap-2 sm:gap-3 mt-2 flex-wrap">
                  <div className="flex items-center gap-1 bg-stone-100 rounded-full px-2 py-0.5">
                    <button onClick={() => onUpdateQty(item.id, item.qty - 1)} className="w-5 h-5 flex items-center justify-center text-stone-600 hover:text-stone-900">−</button>
                    <span className="text-xs font-semibold w-4 text-center">{item.qty}</span>
                    <button onClick={() => onUpdateQty(item.id, item.qty + 1)} className="w-5 h-5 flex items-center justify-center text-stone-600 hover:text-stone-900">+</button>
                  </div>
                  <span className="text-sm font-bold text-stone-900 whitespace-nowrap">${(item.price * item.qty).toFixed(2)}</span>
                  <button onClick={() => onRemove(item.id)} className="text-stone-300 hover:text-rose-400 transition-colors ml-auto sm:ml-0">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {cart.length > 0 && (
          <div className="px-4 sm:px-6 py-5 border-t border-stone-100 space-y-3">
            <div className="flex justify-between text-sm text-stone-500">
              <span>Subtotal</span><span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-stone-500">
              <span>Shipping</span><span className="text-emerald-600 font-medium">Free</span>
            </div>
            <div className="flex justify-between font-bold text-stone-900 text-base pt-2 border-t border-stone-100">
              <span>Total</span><span>${total.toFixed(2)}</span>
            </div>
            <button className="w-full py-3.5 bg-stone-900 text-white font-semibold rounded-full hover:bg-stone-700 transition-all mt-1 text-sm tracking-wide shadow-lg shadow-stone-200">
              Checkout → ${total.toFixed(2)}
            </button>
            <button onClick={onClose} className="w-full py-2.5 text-stone-500 text-sm font-medium hover:text-stone-800 transition-colors">
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Toast({ message }) {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-stone-900/90 backdrop-blur-md text-white px-5 py-3 rounded-full text-sm font-medium shadow-2xl flex items-center gap-2 animate-fade-in-up max-w-[90vw]">
      <svg className="w-4 h-4 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
      <span className="truncate">{message}</span>
    </div>
  );
}

// ---------- Navbar – now with mobile menu ----------
function Navbar() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const linkClass = (path) =>
    `text-sm font-medium tracking-wide transition-colors ${
      location.pathname === path ? "text-stone-900" : "text-stone-600 hover:text-stone-900"
    }`;

  const links = [
    { to: "/", label: "Home" },
    { to: "/products", label: "Products" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-xl shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <Link
          to="/"
          className="flex items-center gap-2"
        >
          {/* -------- LOGO HERE --------- */}
          <img src={logo} alt="CJ-DELUZ" className="h-8 w-auto" />
          <span className="sr-only">CJ-DELUZ</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link key={link.to} to={link.to} className={linkClass(link.to)}>
              {link.label}
            </Link>
          ))}
        </div>

        {/* Hamburger button (mobile) */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-stone-700 hover:text-stone-900 transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-stone-100 shadow-lg">
          <div className="px-4 py-3 space-y-1">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg text-base font-medium transition-colors ${
                  location.pathname === link.to
                    ? "bg-stone-100 text-stone-900"
                    : "text-stone-600 hover:bg-stone-50 hover:text-stone-900"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

// ---------- Main App ----------
export default function App() {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading delay (remove this in production)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Adjust loading time as needed
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
  const toggleWishlist = (id) => {
    setWishlist((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  };

  // Show loading screen while loading
  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <BrowserRouter>
      <Navbar />
      <div className="pt-16">
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
      </div>
      <Footer />

      {/* Global overlays */}
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