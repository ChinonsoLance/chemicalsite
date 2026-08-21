// Theme.jsx — light/dark switching.
//
// Three states, deliberately:
//   • no stored choice  → follow the operating system, and keep following it if
//     the visitor changes it mid-visit. No data-theme attribute is written.
//   • "light" / "dark"  → an explicit choice, stored, and it wins over the OS.
//
// The initial attribute is applied by the inline script in index.html, before
// first paint, so there is no flash of the wrong ground colour.
//
// Note on structure: the DOM write lives in an effect, not inside the state
// updater. Updaters must be pure — React replays them (twice in StrictMode),
// so a setAttribute in there fires an unpredictable number of times and the
// toggle stops tracking the state.

import { useCallback, useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const STORAGE_KEY = "cjd-theme";

function readStored() {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return v === "light" || v === "dark" ? v : null;
  } catch {
    return null; // private mode
  }
}

function systemTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export default function ThemeToggle({ className = "" }) {
  const [stored] = useState(readStored);
  // Has the visitor made a choice this session (or a previous one)?
  const [explicit, setExplicit] = useState(() => stored !== null);
  // What is actually on screen right now.
  const [theme, setTheme] = useState(() => stored ?? systemTheme());

  // Follow the OS for as long as no explicit choice has been made.
  useEffect(() => {
    if (explicit) return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e) => setTheme(e.matches ? "dark" : "light");
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [explicit]);

  // Push the choice out to the document and to storage.
  useEffect(() => {
    if (!explicit) return;
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* private mode — the choice just will not persist */
    }
  }, [theme, explicit]);

  const toggle = useCallback(() => {
    setExplicit(true);
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }, []);

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      className={`btn-icon ${className}`}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Light theme" : "Dark theme"}
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}
