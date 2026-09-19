import { ExternalIcon } from "@/components/Icon";
import { googleMapsSearch, therapist } from "@/lib/site";

/**
 * The public record: two awards, each with its source. The Google rating is
 * deliberately not restated here — a figure copied off a directory listing
 * goes stale silently, and the link sends the reader to the reviews
 * themselves, which belong to the parents who wrote them.
 */
export default function Trust() {
  return (
    <section className="shell py-12 md:py-16">
      <div className="max-w-[38rem] border-t border-line pt-8">
        <h2 className="display text-[clamp(1.75rem,2.5vw+0.5rem,2.75rem)]">
          Τι λένε οι οικογένειες
        </h2>
        <p className="mt-5 leading-relaxed text-ink-2">
          Οι αξιολογήσεις ανήκουν στους γονείς που τις έγραψαν και δεν
          αναπαράγονται εδώ. Διαβάστε τις εκεί όπου γράφτηκαν.
        </p>
        <a
          href={googleMapsSearch}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-accent link-line-on link-line"
        >
          Δείτε τις αξιολογήσεις στο Google
          <ExternalIcon className="size-3.5" />
        </a>
      </div>

      <ul className="mt-10 grid gap-5 sm:grid-cols-2 md:mt-12 md:max-w-[52rem]">
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
