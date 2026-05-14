import { useState } from "react";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import Products from "./Products";
import Footer from "./components/Footer";

// ---------- Shared Components ----------
import StarRating from "./components/StarRating"; // still used in CartDrawer
import ProductCard from "./components/ProductCard"; // not used directly here, but needed for import consistency

function CartDrawer({ cart, onClose, onRemove, onUpdateQty }) {
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="w-full max-w-md bg-white/95 backdrop-blur-xl flex flex-col shadow-2xl border-l border-stone-100">
        <div className="flex items-center justify-between px-6 py-5 border-b border-stone-100">
          <h2 className="text-lg font-bold text-stone-900" style={{ fontFamily: "'Georgia', serif" }}>
            Cart ({cart.reduce((s, i) => s + i.qty, 0)})
          </h2>
          <button onClick={onClose} className="p-1 text-stone-400 hover:text-stone-700 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <span className="text-5xl mb-4 opacity-30">🛍️</span>
              <p className="text-stone-500 text-sm">Your cart is empty</p>
              <button onClick={onClose} className="mt-4 text-sm font-semibold text-stone-900 underline underline-offset-2">Continue Shopping</button>
            </div>
          ) : cart.map(item => (
            <div key={item.id} className="flex items-center gap-4 py-3 border-b border-stone-50">
              <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-stone-100 shadow-sm">
                <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-stone-800 line-clamp-1">{item.name}</p>
                <p className="text-xs text-stone-400 mt-0.5">{item.category}</p>
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex items-center gap-1 bg-stone-100 rounded-full px-2 py-0.5">
                    <button onClick={() => onUpdateQty(item.id, item.qty - 1)} className="w-5 h-5 flex items-center justify-center text-stone-600 hover:text-stone-900">−</button>
                    <span className="text-xs font-semibold w-4 text-center">{item.qty}</span>
                    <button onClick={() => onUpdateQty(item.id, item.qty + 1)} className="w-5 h-5 flex items-center justify-center text-stone-600 hover:text-stone-900">+</button>
                  </div>
                  <span className="text-sm font-bold text-stone-900">${(item.price * item.qty).toFixed(2)}</span>
                </div>
              </div>
              <button onClick={() => onRemove(item.id)} className="text-stone-300 hover:text-rose-400 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
              </button>
            </div>
          ))}
        </div>

        {cart.length > 0 && (
          <div className="px-6 py-5 border-t border-stone-100 space-y-3">
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
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-stone-900/90 backdrop-blur-md text-white px-5 py-3 rounded-full text-sm font-medium shadow-2xl flex items-center gap-2 animate-fade-in-up">
      <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
      {message}
    </div>
  );
}

// ---------- Navbar (unchanged) ----------
function Navbar() {
  const location = useLocation();
  const linkClass = (path) =>
    `text-sm font-medium tracking-wide transition-colors ${
      location.pathname === path ? "text-stone-900" : "text-stone-600 hover:text-stone-900"
    }`;

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-xl shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <Link
          to="/"
          className="text-xl font-bold tracking-tight text-stone-900"
          style={{ fontFamily: "'Georgia', serif", letterSpacing: "-0.02em" }}
        >
          CHEMERA
        </Link>
        <div className="flex items-center gap-8">
          <Link to="/" className={linkClass("/")}>Home</Link>
          <Link to="/products" className={linkClass("/products")}>Products</Link>
          <Link to="/about" className={linkClass("/about")}>About</Link>
          <Link to="/contact" className={linkClass("/contact")}>Contact</Link>
        </div>
      </div>
    </nav>
  );
}

// ---------- Main App ----------
export default function App() {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState(null);

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