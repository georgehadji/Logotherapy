import { steps } from "@/lib/site";

/**
 * The spine of the homepage: five real stages, joined by a rail. A worried
 * parent wants to know what will happen before it happens — this is the
 * section that tells them, in order, from the first phone call to the last
 * session.
 *
 * Stacked, not split: the band is the one place on the page where the reading
 * runs straight down the page instead of across two columns.
 */
export default function Steps() {
  return (
    <section id="poreia" className="bg-blush py-16 md:py-24">
      <div className="shell">
        <div className="max-w-[34rem]">
          <h2 className="display text-[clamp(1.75rem,2.5vw+0.5rem,2.75rem)]">
            Τι θα συμβεί, βήμα βήμα
          </h2>
          <p className="mt-5 leading-relaxed text-ink-2">
            Το άγνωστο είναι που κουράζει. Πέντε βήματα, από το πρώτο τηλεφώνημα μέχρι
            την ολοκλήρωση, ώστε να ξέρετε τι έρχεται πριν έρθει.
          </p>
        </div>

        {/* Capped, not full-bleed: a measure the eye can run down without
            losing the rail, and the empty right half reads as chosen. */}
        <ol className="rail reveal mt-12 max-w-[46rem] md:mt-16">
          {steps.map((s) => (
            <li
              key={s.n}
              className="relative grid grid-cols-[2.75rem_minmax(0,1fr)] gap-5 py-5 first:pt-0 last:pb-0 md:gap-7"
            >
              {/* The numeral sits on the rail: a filled disc, paper text, so the line passes behind it. */}
              <span className="numeral relative z-[var(--z-raised)] grid size-11 place-items-center rounded-full bg-accent text-base font-bold text-paper">
                {s.n}
              </span>
              <div className="pt-1.5">
                <h3 className="display text-xl md:text-2xl">{s.title}</h3>
                <p className="mt-2 max-w-[56ch] leading-relaxed text-ink-2">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
