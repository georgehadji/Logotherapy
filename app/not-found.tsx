import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { nav, therapist } from "@/lib/site";

/** The page is a list of where to go instead. */
export default function NotFound() {
  const links = [{ label: "Αρχική", href: "/" }, ...nav];

  return (
    <>
      <Nav />
      <main id="main" className="min-h-[60svh] pb-16">
        <PageHero
          index
          title="Η σελίδα δεν βρέθηκε"
          dateline="Σφάλμα 404"
          lead="Ο σύνδεσμος που ακολουθήσατε ίσως άλλαξε ή δεν υπάρχει πλέον. Η λίστα παρακάτω οδηγεί εκεί που θέλατε να πάτε."
        />

        <section className="shell py-10">
          <ul className="max-w-[40rem] border-t border-line">
            {links.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="row-link press-sm display flex min-h-14 items-center border-b border-line text-xl transition-colors t-quick hover:bg-paper-2 hover:text-accent"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <p className="mt-8 text-sm text-ink-2">
            Ή καλέστε απευθείας στο{" "}
            <a href={`tel:${therapist.phone}`} className="font-semibold text-accent link-line-on link-line">
              {therapist.phoneDisplay}
            </a>
            .
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
