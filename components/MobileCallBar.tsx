"use client";

import { useEffect, useState } from "react";
import { MapPinIcon, PhoneIcon } from "./Icon";
import { location, therapist } from "@/lib/site";

/**
 * On a phone a service page runs several screens long and the nav pill shows
 * only the phone icon at that width. This keeps the full number and the door
 * one thumb away once the reader has scrolled.
 */
export default function MobileCallBar() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setShown(window.scrollY > 600));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      inert={!shown}
      aria-hidden={!shown}
      className={`fixed inset-x-0 bottom-0 z-[var(--z-callbar)] border-t border-line bg-paper-2/95 backdrop-blur transition-transform t-slow md:hidden ${
        shown ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex items-stretch gap-px bg-line">
        <a
          href={`tel:${therapist.phone}`}
          className="press-sm flex min-h-14 flex-1 items-center justify-center gap-2.5 bg-accent font-semibold text-paper"
        >
          <PhoneIcon className="size-4" />
          {therapist.phoneDisplay}
        </a>
        <a
          href={location.mapsLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-14 items-center justify-center gap-2 bg-paper-2 px-5 font-medium text-ink"
        >
          <MapPinIcon className="size-4" />
          Χάρτης
        </a>
      </div>
    </div>
  );
}
