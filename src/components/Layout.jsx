// Layout.jsx — the structural pieces every page is built from.
//
// The site has one layout idea, used everywhere: a labelled band. A mono index
// and label sit in a narrow left column, the content fills the rest. It is how
// a parts catalogue or a spec sheet is set, and repeating it is what makes four
// separate pages read as one document.

import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Reveal } from "./Motion";

/** Page-opening block: oversized title, optional standfirst, optional aside. */
export function Masthead({ index, label, title, lede, children }) {
  return (
    <header className="wrap relative z-10 pb-14 pt-[calc(var(--nav-h)+3.5rem)] md:pb-20 md:pt-[calc(var(--nav-h)+5.5rem)]">
      <Reveal className="flex items-baseline gap-3">
        <span className="label num">{index}</span>
        <span className="label">{label}</span>
      </Reveal>

      <Reveal delay={60}>
        <h1 className="display mt-7 text-[clamp(2rem,5.8vw,3.9rem)]">{title}</h1>
      </Reveal>

      {lede && (
        <Reveal delay={120}>
          <p className="lede mt-7 max-w-2xl">{lede}</p>
        </Reveal>
      )}

      {children}
    </header>
  );
}

/** A labelled band. `title` is the section heading; children are its content. */
export function Band({ index, label, title, intro, children, className = "" }) {
  return (
    <section className={`band relative z-10 ${className}`}>
      <div className="wrap band-grid">
        <div className="band-label">
          <span className="label num label-accent">{index}</span>
          <span className="label">{label}</span>
        </div>

        <div>
          {title && (
            <Reveal>
              <h2 className="display-sm max-w-3xl text-[clamp(1.35rem,2.6vw,1.95rem)]">
                {title}
              </h2>
            </Reveal>
          )}
          {intro && (
            <Reveal delay={60}>
              <p className="prose-body mt-6 max-w-2xl">{intro}</p>
            </Reveal>
          )}
          {children}
        </div>
      </div>
    </section>
  );
}

/**
 * One row of an index list — a number, a name, supporting text and a count.
 * Renders as a link when `to` is given, otherwise as a plain row.
 */
export function IndexRow({ index, title, body, meta, to, delay = 0 }) {
  const inner = (
    <div className="grid gap-x-8 gap-y-3 sm:grid-cols-[3rem_1fr_auto] sm:items-baseline">
      <span className="label num label-accent">{index}</span>

      <div>
        <h3 className="display-sm text-base md:text-lg">{title}</h3>
        {body && <p className="prose-body mt-1.5 max-w-xl text-[14px]">{body}</p>}
      </div>

      <div className="flex items-center gap-5 sm:justify-end">
        {meta && <span className="label num whitespace-nowrap">{meta}</span>}
        {to && <ArrowRight className="row-arrow h-4 w-4 text-accent" />}
      </div>
    </div>
  );

  if (to) {
    return (
      <Reveal delay={delay}>
        <Link to={to} className="row-item">
          {inner}
        </Link>
      </Reveal>
    );
  }

  return (
    <Reveal delay={delay} className="row-item">
      {inner}
    </Reveal>
  );
}

/** The closing call to action. Inverted so it anchors the foot of every page. */
export function CallToAction({
  title = "Tell us what your process needs.",
  body = "Send a material, a grade and a volume. We come back with options, documentation and a landed price.",
  primary = { to: "/contact", label: "Start an enquiry" },
  secondary,
}) {
  return (
    <section className="inverse relative z-10">
      <div className="wrap py-20 md:py-28">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <Reveal>
              <h2 className="display max-w-2xl text-[clamp(1.5rem,3.4vw,2.4rem)]">
                {title}
              </h2>
            </Reveal>
            <Reveal delay={60}>
              <p className="mt-5 max-w-xl text-[14px] leading-relaxed opacity-70">
                {body}
              </p>
            </Reveal>
          </div>

          <Reveal delay={120} className="flex flex-wrap gap-3">
            <Link to={primary.to} className="btn btn-solid">
              {primary.label}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            {secondary && (
              <a
                href={secondary.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                {secondary.label}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
