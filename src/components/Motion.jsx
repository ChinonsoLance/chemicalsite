// Motion.jsx — the site's entire motion vocabulary, which is one thing.
//
// Restraint is the point. The previous version shipped word-by-word headline
// lifts, parallax layers, animated counters and self-drawing rules; stacked
// together they read as decoration rather than design, and they were the bulk
// of the page's frame cost. What is left is a single quiet reveal.

import { useRevealRef } from "../hooks/useScroll";

/**
 * Fades and lifts its children the first time they enter the viewport.
 *
 * `delay` staggers siblings — keep it small (60–120ms steps). Anything longer
 * and the reader is waiting on the page instead of reading it.
 */
export function Reveal({
  as: Tag = "div",
  delay = 0,
  className = "",
  style,
  children,
  ...rest
}) {
  const ref = useRevealRef();

  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`}
      style={delay ? { transitionDelay: `${delay}ms`, ...style } : style}
      {...rest}
    >
      {children}
    </Tag>
  );
}
