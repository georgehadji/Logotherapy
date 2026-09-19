import Link from "next/link";
import Year from "./Year";
import { legalNav, location, nav, therapist } from "@/lib/site";
import { MarkIcon } from "./Icon";

/**
 * Ft5 statement. One closing sentence in display type, then the practical
 * record beneath it in small type: wordmark, links, address, phone, the
 * disclaimer last. It closes the page like the last line of a letter, not
 * like a sitemap.
 */
export default function Footer() {
  const year = new Date().getFullYear();
  const links = [...nav, ...legalNav];

  return (
    <footer className="mt-8 border-t border-line">
      {/* max-md:pb-36 clears the fixed mobile call bar. */}
      <div className="shell pb-16 pt-14 max-md:pb-36 md:pt-20">
        <p className="display max-w-[38ch] text-[clamp(1.75rem,3vw+0.5rem,3rem)]">
          Κάθε παιδί βρίσκει τη φωνή του με τον δικό του ρυθμό. Η δουλειά μας είναι
          να τον ακούσουμε.
        </p>

        <div className="mt-12 grid gap-8 border-t border-line pt-8 text-sm leading-relaxed text-ink-2 sm:grid-cols-2 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="flex items-center gap-2 font-semibold text-ink">
              <MarkIcon className="size-5 shrink-0" />
              {therapist.name}
            </p>
            <p className="mt-1">{therapist.specialty}</p>
            <p className="mt-3">
              Ιδιωτικό κέντρο λογοθεραπείας στη Νέα Μηχανιώνα από το {therapist.since}.
            </p>
          </div>

          <address className="not-italic">
            <span className="font-semibold text-ink">Το κέντρο</span>
            <br />
            {location.street}
            <br />
            {location.area} {location.postal}, {location.region}
            <br />
            <a
              href={`tel:${therapist.phone}`}
              className="mt-1 inline-flex min-h-11 items-center font-semibold text-accent link-line-on link-line"
            >
              {therapist.phoneDisplay}
            </a>
          </address>

          <nav aria-label="Υποσέλιδο">
            <ul className="grid gap-x-6 sm:grid-cols-1">
              {links.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex min-h-9 items-center whitespace-nowrap text-ink-2 transition-colors t-quick hover:text-ink link-line"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <p className="mt-10 text-sm text-ink-3">
          © <Year built={year} /> {therapist.clinicName}. Με επιφύλαξη παντός δικαιώματος.
        </p>
        <p className="mt-2 max-w-[65ch] text-sm leading-relaxed text-ink-3">
          Το περιεχόμενο της ιστοσελίδας έχει ενημερωτικό χαρακτήρα και δεν υποκαθιστά
          τη λογοθεραπευτική αξιολόγηση ή τη συμβουλή του παιδιάτρου σας.
        </p>
      </div>
    </footer>
  );
}
