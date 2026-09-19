import Link from "next/link";
import { ArrowRightIcon, ExternalIcon } from "@/components/Icon";
import { hours, location, therapist } from "@/lib/site";

/** Phone, address and the map. The form lives on /epikoinonia. */
export default function ContactBlock({ withForm = false }: { withForm?: boolean }) {
  return (
    <section id="epikoinonia" className="bg-paper-2 py-16 md:py-24">
      <div className="shell grid gap-10 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-5">
          <h2 className="display text-[clamp(1.75rem,2.5vw+0.5rem,2.75rem)]">
            Το πρώτο βήμα είναι ένα τηλεφώνημα
          </h2>
          <p className="mt-5 leading-relaxed text-ink-2">
            Πείτε μας με δικά σας λόγια τι σας απασχολεί. Κλείνουμε την πρώτη συνάντηση
            και σας λέμε τι να φέρετε.
          </p>
          <a
            href={`tel:${therapist.phone}`}
            className="display mt-6 inline-block text-[clamp(1.75rem,3vw,2.5rem)] text-ink transition-colors t-quick hover:text-accent"
          >
            {therapist.phoneDisplay}
          </a>

          <dl className="mt-6 max-w-sm border-t border-line">
            {hours.rows.map((r) => (
              <div key={r.days} className="flex flex-wrap justify-between gap-x-6 border-b border-line py-2.5 text-sm">
                <dt className="text-ink">{r.days}</dt>
                <dd className="text-ink-2">{r.times}</dd>
              </div>
            ))}
          </dl>

          {!withForm && (
            <Link
              href="/epikoinonia"
              className="mt-6 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-accent link-line-on link-line"
            >
              Φόρμα επικοινωνίας
              <ArrowRightIcon className="size-4" />
            </Link>
          )}
        </div>

        <div className="md:col-span-7">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-t border-line pt-4">
            <address className="not-italic leading-relaxed text-ink">
              <span className="font-semibold">{therapist.clinicName}</span>
              <br />
              {location.line}
            </address>
            <a
              href={location.mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-1.5 whitespace-nowrap text-sm font-semibold text-accent link-line-on link-line"
            >
              Οδηγίες πρόσβασης
              <ExternalIcon className="size-3.5" />
            </a>
          </div>

          <div className="mt-5 aspect-[4/3] w-full overflow-hidden rounded-[var(--radius-card)] border border-line bg-paper md:aspect-[3/2]">
            <iframe
              src={location.mapsEmbed}
              title={`Χάρτης: ${location.line}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen={false}
              className="size-full grayscale-[0.35] contrast-[1.05]"
            />
          </div>
          <p className="mt-2 text-xs text-ink-3">Χάρτης Google · φορτώνεται μόνο όταν εμφανιστεί στην οθόνη.</p>
        </div>
      </div>
    </section>
  );
}
