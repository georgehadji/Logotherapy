"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/motion";
import { signs, therapist } from "@/lib/site";
import { ArrowRightIcon, PhoneIcon } from "@/components/Icon";

/**
 * Two columns: the promise on the left, the reason someone is here on the
 * right. For a parent the proof is not a screenshot — it is the list of
 * things they have been noticing at home, each one leading to the page that
 * explains it.
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
    <section
      ref={root}
      className="intro-stage shell grid gap-12 pb-16 pt-12 md:grid-cols-12 md:gap-10 md:pb-24 md:pt-20"
    >
      <div className="md:col-span-6">
        <p className="intro-item eyebrow" style={{ "--i": 0 } as React.CSSProperties}>
          Λογοθεραπεία · Νέα Μηχανιώνα Θεσσαλονίκης
        </p>
        <h1
          className="intro-item display display-hero mt-4 text-[clamp(2.4rem,4.2vw+1rem,4.5rem)]"
          style={{ "--i": 1 } as React.CSSProperties}
        >
          Όταν οι λέξεις αργούν, υπάρχει δρόμος.
        </h1>

        <p
          className="intro-item mt-7 max-w-[32rem] text-lg leading-relaxed text-ink-2 md:text-xl"
          style={{ "--i": 2 } as React.CSSProperties}
        >
          Λογοθεραπεία και θεραπεία σίτισης για βρέφη, παιδιά και εφήβους, από τη{" "}
          {therapist.name}, με ήρεμη αξιολόγηση, ξεκάθαρο πλάνο και τους γονείς στο
          κέντρο της δουλειάς.
        </p>

        <div
          className="intro-item mt-9 flex flex-wrap items-center gap-x-6 gap-y-4"
          style={{ "--i": 3 } as React.CSSProperties}
        >
          <a href={`tel:${therapist.phone}`} className="pill max-sm:w-full">
            <PhoneIcon className="size-4" />
            Καλέστε {therapist.phoneDisplay}
          </a>
          <Link
            href="/ypiresies"
            className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-accent link-line-on link-line"
          >
            Οι υπηρεσίες
            <ArrowRightIcon className="size-4" />
          </Link>
        </div>
      </div>

      <div
        className="intro-item card p-6 md:col-span-5 md:col-start-8 md:p-8"
        style={{ "--i": 4 } as React.CSSProperties}
      >
        <h2 className="text-base font-semibold text-ink">Σας απασχολεί κάτι από αυτά;</h2>
        <p className="mt-1 text-sm text-ink-2">Κάθε γραμμή οδηγεί στη σελίδα που το εξηγεί.</p>
        <ul className="mt-5 divide-y divide-line">
          {signs.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/ypiresies/${s.slug}`}
                className="group flex min-h-12 items-center justify-between gap-4 py-3 text-[0.95rem] leading-snug text-ink transition-colors t-quick hover:text-accent"
              >
                <span>{s.text}</span>
                <ArrowRightIcon className="size-4 shrink-0 text-ink-3 transition-[transform,color] t-base group-hover:translate-x-0.5 group-hover:text-accent" />
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-5 text-sm leading-relaxed text-ink-3">
          Δεν χρειάζεται παραπομπή. Ένα τηλεφώνημα αρκεί για να ξεκινήσουμε.
        </p>
      </div>
    </section>
  );
}
