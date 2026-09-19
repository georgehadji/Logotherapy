import { ExternalIcon } from "@/components/Icon";
import { googleMapsSearch, therapist } from "@/lib/site";

const STAR = "M10 1.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8-5.3-2.8-5.3 2.8 1-5.8L1.5 7.7l5.9-.9z";

/**
 * The public record: the rating at its source's figure, with a link, and the
 * two awards as cards. Never restated as schema — see lib/site.ts.
 */
export default function Trust() {
  const ratingText = therapist.rating.value.toFixed(1).replace(".", ",");

  return (
    <section className="shell grid gap-10 py-12 md:grid-cols-12 md:gap-12 md:py-16">
      <div className="md:col-span-5">
        <h2 className="display text-[clamp(1.75rem,2.5vw+0.5rem,2.75rem)]">
          Τι λένε οι οικογένειες
        </h2>

        <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 leading-relaxed text-ink-2">
          <span className="flex gap-0.5" role="img" aria-label={`${ratingText} στα 5 αστέρια`}>
            {Array.from({ length: 5 }).map((_, i) => {
              const fill = Math.max(0, Math.min(1, therapist.rating.value - i));
              return (
                <span key={i} className="relative block size-4">
                  <svg viewBox="0 0 20 20" className="absolute inset-0 size-4 fill-line" aria-hidden>
                    <path d={STAR} />
                  </svg>
                  <span className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
                    <svg viewBox="0 0 20 20" className="size-4 fill-accent" aria-hidden>
                      <path d={STAR} />
                    </svg>
                  </span>
                </span>
              );
            })}
          </span>
          <span>
            <strong className="font-semibold text-ink">{ratingText}</strong> από{" "}
            {therapist.rating.count} αξιολογήσεις στο {therapist.rating.source}.
          </span>
        </p>
        <p className="mt-3 text-sm leading-relaxed text-ink-3">
          Όπως καταγράφονται από τη {therapist.rating.reportedBy}. Οι αξιολογήσεις
          ανήκουν στους γονείς που τις έγραψαν και δεν αναπαράγονται εδώ.
        </p>
        <a
          href={googleMapsSearch}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-accent link-line-on link-line"
        >
          Δείτε τις αξιολογήσεις στο Google
          <ExternalIcon className="size-3.5" />
        </a>
      </div>

      <ul className="grid gap-5 sm:grid-cols-2 md:col-span-6 md:col-start-7">
        {therapist.awards.map((a) => (
          <li key={a.label} className="card flex flex-col p-6">
            <p className="display text-xl md:text-2xl">{a.label}</p>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-2">{a.detail}</p>
            <a
              href={a.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex min-h-11 items-center gap-1.5 self-start whitespace-nowrap text-sm font-semibold text-accent link-line-on link-line"
            >
              Το προφίλ
              <ExternalIcon className="size-3.5" />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
