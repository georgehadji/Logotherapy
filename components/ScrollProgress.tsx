"use client";

import { useEffect, useRef } from "react";

const R = 20;
const C = 2 * Math.PI * R;

/** Bottom-right progress arc that doubles as back-to-top once you are past the fold. */
export default function ScrollProgress() {
  const arc = useRef<SVGCircleElement>(null);
  const btn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let frame = 0;
    // scrollHeight is a layout read; recompute it when the page resizes, not on
    // every scroll frame.
    let max = document.documentElement.scrollHeight - window.innerHeight;
    const measure = () => {
      max = document.documentElement.scrollHeight - window.innerHeight;
    };
    const ro = new ResizeObserver(measure);
    ro.observe(document.documentElement);

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
        arc.current?.style.setProperty("stroke-dashoffset", `${C * (1 - p)}`);

        /*
         * `inert` as well as opacity. `pointer-events: none` stops the mouse
         * and nothing else: a faded-out button keeps its place in the tab
         * order, so the first Tab on any page landed on a control nobody
         * could see, announced as "back to top", with the focus ring drawn on
         * empty paper. Invisible has to mean unreachable.
         */
        const past = window.scrollY > 600;
        const el = btn.current;
        if (!el) return;
        el.style.setProperty("opacity", past ? "1" : "0");
        el.toggleAttribute("inert", !past);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      ro.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  /*
   * The platform's own smooth scroll, which already honours reduced motion and
   * already stops the moment the visitor touches the wheel. A scripted 1.4s
   * journey did neither.
   */
  const toTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <button
      ref={btn}
      onClick={toTop}
      aria-label="Επιστροφή στην κορυφή"
      inert
      style={{ opacity: 0 }}
      // One hover signal, one pixel: a lift, not a zoom.
      className="press fixed bottom-24 right-6 z-[var(--z-sticky)] grid size-12 cursor-pointer place-items-center rounded-full bg-paper-2/80 backdrop-blur transition-[opacity,transform] t-quick hover:-translate-y-0.5 md:bottom-10 md:right-10"
    >
      {/* Both graphics are decoration: the button's aria-label is the name. */}
      <svg viewBox="0 0 48 48" aria-hidden className="absolute inset-0 size-full -rotate-90">
        <circle cx="24" cy="24" r={R} fill="none" stroke="var(--color-line)" strokeWidth="1.5" />
        <circle
          ref={arc}
          cx="24"
          cy="24"
          r={R}
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray={C}
          strokeDashoffset={C}
        />
      </svg>
      <svg viewBox="0 0 24 24" aria-hidden className="size-4 stroke-ink" fill="none" strokeWidth="1.5">
        <path d="M12 19V5M5 12l7-7 7 7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
