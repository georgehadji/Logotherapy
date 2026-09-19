import JsonLd from "@/components/JsonLd";
import { faq } from "@/lib/site";

/**
 * Native disclosure widgets, not a JavaScript accordion: they work without
 * the bundle, announce their state, and the answer is in the HTML for every
 * crawler. The same pairs go out as FAQPage JSON-LD.
 */
export default function Faq() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <section id="erotiseis" className="shell py-16 md:py-24">
      <JsonLd data={schema} />
      <div className="grid gap-10 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-4 md:col-start-9">
          <h2 className="display text-[clamp(1.75rem,2.5vw+0.5rem,2.75rem)]">Πριν καλέσετε</h2>
          <p className="mt-5 leading-relaxed text-ink-2">
            Ό,τι ρωτούν συνήθως οι γονείς στο πρώτο τηλεφώνημα, απαντημένο μία φορά.
          </p>
        </div>

        <div className="border-t border-line md:col-span-7 md:col-start-1 md:row-start-1">
          {faq.map((f) => (
            <details key={f.q} className="group border-b border-line">
              <summary className="press-sm flex cursor-pointer list-none items-baseline justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden">
                <h3 className="display text-xl md:text-2xl">{f.q}</h3>
                <span
                  aria-hidden
                  className="relative mt-1 grid size-8 shrink-0 place-items-center rounded-full border border-line transition-[background-color,border-color] t-quick group-open:border-accent group-open:bg-accent"
                >
                  <span className="absolute h-px w-3 bg-ink transition-colors group-open:bg-paper" />
                  <span className="absolute h-3 w-px bg-ink transition-[transform,background-color] t-base group-open:rotate-90 group-open:bg-paper" />
                </span>
              </summary>
              <p className="max-w-[60ch] pb-6 leading-relaxed text-ink-2">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
