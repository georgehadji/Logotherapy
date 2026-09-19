"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/motion";
import { location, signs, therapist } from "@/lib/site";
import { ArrowRightIcon, PhoneIcon } from "@/components/Icon";

/**
 * An asymmetric opening: the promise on the left at a short measure, the
 * practice's mark on the right as a framed plate — the portrait stays on the
 * biography page, where a face reads as a person rather than as a banner.
 * The things parents notice
 * at home used to sit in a bordered card inside the hero, which made the
 * first screen read like a control panel; they now run as a hairline band
 * across the foot of the section, under the fold of the headline.
 */
export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const el = root.current;
    if (!el) return;
    // Until the class is added the copy is simply visible; a failure here costs the animation, never the content.
    const id = requestAnimationFrame(() => el.classList.add("is-intro"));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <section ref={root} className="intro-stage">
      <div className="shell grid items-start gap-10 pb-12 pt-12 md:grid-cols-12 md:gap-12 md:pb-16 md:pt-20 lg:gap-16 lg:pt-28">
        <div className="md:col-span-7 lg:col-span-6">
          <p
            className="intro-item flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-olive"
            style={{ "--i": 0 } as React.CSSProperties}
          >
            <span aria-hidden className="h-px w-8 shrink-0 bg-clay" />
            Λογοθεραπεία
          </p>

          <h1
            className="intro-item display display-hero mt-6 max-w-[16ch] text-[clamp(2.5rem,4.6vw+1rem,4.75rem)]"
            style={{ "--i": 1 } as React.CSSProperties}
          >
            Η επικοινωνία είναι η αρχή.
          </h1>

          <p
            className="intro-item mt-6 max-w-[34rem] text-lg leading-relaxed text-ink-2 md:text-xl"
            style={{ "--i": 2 } as React.CSSProperties}
          >
            Εξατομικευμένη λογοθεραπεία με επιστημονική προσέγγιση και ανθρώπινη
            φροντίδα.
          </p>

          <div
            className="intro-item mt-9 flex flex-wrap items-center gap-x-6 gap-y-4"
            style={{ "--i": 3 } as React.CSSProperties}
          >
            <a
              href={`tel:${therapist.phone}`}
              aria-label={`Κλείστε ραντεβού — τηλέφωνο ${therapist.phoneDisplay}`}
              className="pill max-sm:w-full"
            >
              <PhoneIcon className="size-4" />
              Κλείστε ραντεβού
            </a>
            <Link
              href="/ypiresies"
              className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-accent link-line-on link-line"
            >
              Μάθετε περισσότερα
              <ArrowRightIcon className="size-4" />
            </Link>
          </div>

          {/* The practice's own line: who, where, and the number, kept out of
              the headline so the opening stays quiet but the local signal stays. */}
          <p
            className="intro-item mt-8 border-t border-line pt-5 text-sm leading-relaxed text-ink-3"
            style={{ "--i": 4 } as React.CSSProperties}
          >
            {therapist.name}, {therapist.title}
            <span className="block">
              {location.area}, {location.region}
              <span aria-hidden className="px-2 text-clay">
                ·
              </span>
              <a
                href={`tel:${therapist.phone}`}
                className="font-semibold text-ink-2 link-line-on link-line"
              >
                {therapist.phoneDisplay}
              </a>
            </span>
          </p>
        </div>

        <div
          className="intro-item md:col-span-5 md:col-start-8"
          style={{ "--i": 4 } as React.CSSProperties}
        >
          {/* A tall plate is right beside a column of text and wrong stacked
              under one, where it would push the rest of the page off screen. */}
          <figure className="plate aspect-[3/2] md:aspect-[4/5]">
            <div className="flex h-full items-center justify-center gap-5 p-6 max-md:flex-row md:flex-col md:gap-7 md:p-8 md:text-center">
              <img
                src="/images/logo-mark.png"
                alt=""
                aria-hidden
                width={480}
                height={519}
                fetchPriority="high"
                decoding="async"
                className="plate-mark w-[34%] max-w-[9rem] shrink-0 md:w-[62%] md:max-w-[15rem]"
              />
              <figcaption className="min-w-0">
                <span className="display block text-base text-ink md:text-xl">
                  {therapist.name}
                </span>
                <span className="mt-2 block text-xs uppercase tracking-[0.18em] text-ink-2">
                  {therapist.title}
                </span>
              </figcaption>
            </div>
          </figure>
        </div>
      </div>

      <div className="shell grid gap-5 border-t border-line py-10 md:grid-cols-12 md:gap-12 md:py-12">
        <div className="md:col-span-3">
          <h2 className="text-sm font-semibold text-ink">Σας απασχολεί κάτι από αυτά;</h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-3">
            Κάθε γραμμή οδηγεί στη σελίδα που το εξηγεί. Δεν χρειάζεται παραπομπή.
          </p>
        </div>

        <ul className="grid border-t border-line md:col-span-9 sm:grid-cols-2 sm:gap-x-12">
          {signs.map((s) => (
            <li key={s.slug} className="border-b border-line">
              <Link
                href={`/ypiresies/${s.slug}`}
                className="group flex min-h-12 items-center justify-between gap-4 py-3 text-[0.95rem] leading-snug text-ink-2 transition-colors t-quick hover:text-accent"
              >
                <span>{s.text}</span>
                <ArrowRightIcon className="size-4 shrink-0 text-ink-3 transition-[transform,color] t-base group-hover:translate-x-0.5 group-hover:text-accent" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
