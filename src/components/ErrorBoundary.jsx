// ErrorBoundary.jsx
//
// React's default behaviour when a component throws during render or in an
// effect is to unmount the entire tree, which leaves the visitor looking at a
// blank page with no explanation. This catches that and shows something useful
// instead: real contact routes for a customer, and the actual error for whoever
// is building the site.
//
// It deliberately does NOT swallow the error — it is re-logged to the console
// so the stack trace is still there to debug with.

import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    // Keep the full trace available rather than hiding it behind the fallback.
    console.error("Unhandled error in React tree:", error, info?.componentStack);
  }

  render() {
    const { error } = this.state;
    if (!error) return this.props.children;

    return (
      <div className="wrap flex min-h-[70vh] flex-col justify-center py-24">
        <p className="label label-accent">Error</p>

        <h1 className="display mt-6 text-[clamp(1.8rem,4.5vw,3rem)]">
          Something on this page failed to load.
        </h1>

        <p className="lede mt-6 max-w-xl">
          Sorry — this is a fault on our side, not yours. You can still reach us
          directly, and reloading the page will usually clear it.
        </p>

        <div className="mt-9 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="btn btn-solid"
          >
            Reload the page
          </button>
          <a href="/contact" className="btn btn-outline">
            Contact us
          </a>
        </div>

        {import.meta.env.DEV && (
          <pre className="mt-12 max-w-full overflow-x-auto rounded-[var(--r-md)] border border-rule bg-surface p-5 text-[12px] leading-relaxed text-ink-2">
            {String(error?.stack || error)}
          </pre>
        )}
      </div>
    );
  }
}
