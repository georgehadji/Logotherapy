"use client";

import { useEffect, useRef, useState } from "react";
import { location } from "@/lib/site";
import { MapPinIcon } from "./Icon";

/**
 * The map, loaded when it is asked for.
 *
 * `ContactBlock` closes the homepage and every content page, so an embedded
 * frame here is a Google frame on eleven pages — cookies, scripts and a
 * request to a third party for every reader, nearly all of whom came to read
 * about their child's speech and will never look at the map. Lazy loading
 * only delays that; it does not decline it.
 *
 * So the ground stands in for the map until someone wants one: the address in
 * the practice's own type, and one press to bring Google in. Not a picture of
 * a map — a photograph of a map that isn't the map is worse than saying what
 * this is. Directions stay a plain link above, which never needed the frame.
 */
export default function MapEmbed() {
  const [show, setShow] = useState(false);

  /*
   * The press unmounts the button it came from, so focus would land back on
   * <body> and the next Tab would restart at the top of the page — having
   * just asked for the map, the keyboard reader would be sent away from it.
   */
  const loaded = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (show) loaded.current?.focus();
  }, [show]);

  const frame =
    "mt-5 aspect-[4/3] w-full overflow-hidden rounded-[var(--radius-card)] border border-line md:aspect-[3/2]";

  if (show) {
    return (
      <div
        ref={loaded}
        tabIndex={-1}
        role="group"
        aria-label={`Χάρτης: ${location.line}`}
        className={`${frame} bg-paper focus:outline-none`}
      >
        <iframe
          src={location.mapsEmbed}
          title={`Χάρτης: ${location.line}`}
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen={false}
          className="size-full grayscale-[0.35] contrast-[1.05]"
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setShow(true)}
      className={`${frame} press-sm group flex cursor-pointer flex-col items-center justify-center gap-4 bg-blush p-6 text-center transition-colors t-quick hover:border-accent-2`}
    >
      <MapPinIcon className="size-7 shrink-0 text-accent" />
      <span className="display text-lg text-ink md:text-xl">{location.line}</span>
      <span className="pill min-h-11 px-5 text-sm">Εμφάνιση χάρτη</span>
    </button>
  );
}
