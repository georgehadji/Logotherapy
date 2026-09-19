import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHero, { breadcrumbJsonLd, type Crumb } from "@/components/PageHero";
import JsonLd from "@/components/JsonLd";
import Photo from "@/components/Photo";
import Steps from "@/components/sections/Steps";
import ContactBlock from "@/components/sections/ContactBlock";
import { SITE_URL, location, pageMetadata, photosReady, spaceImages, therapist } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Το Κέντρο | Κέντρο Λογοθεραπείας Νέα Μηχανιώνα Θεσσαλονίκης",
  description: `Ιδιωτικό κέντρο λογοθεραπείας στη Νέα Μηχανιώνα, ${location.line}. Αίθουσες θεραπείας φτιαγμένες για παιδιά, χώρος θεραπείας σίτισης, διεπιστημονική ομάδα. Από το ${therapist.since}.`,
  path: "/to-kentro",
});

const crumbs: Crumb[] = [{ label: "Το Κέντρο", href: "/to-kentro" }];

export default function ToKentroPage() {
  return (
    <>
      <Nav />
      <main id="main">
        <JsonLd data={breadcrumbJsonLd(crumbs, SITE_URL)} />

        <PageHero
          title="Το κέντρο"
          dateline={location.line}
          lead="Ένας χώρος φτιαγμένος στα μέτρα ενός παιδιού: χαμηλά τραπέζια, μαλακό φως, παιχνίδια που έχουν δουλειά να κάνουν, και ένας χώρος για τους γονείς δίπλα, όχι απέναντι."
          crumbs={crumbs}
        />

        <section className="shell py-10 md:py-14">
          <div className="max-w-[65ch] space-y-5 text-lg leading-relaxed text-ink-2">
            <p>
              Το κέντρο λειτουργεί από το {therapist.since} στη Νέα Μηχανιώνα, με
              διεπιστημονική ομάδα, ώστε ένα παιδί που χρειάζεται λογοθεραπεία και
              εργοθεραπεία, ή λογοθεραπεία και ψυχολογική υποστήριξη, να τα βρίσκει στον
              ίδιο χώρο, από ανθρώπους που μιλούν μεταξύ τους.
            </p>
            <p>
              Οι αίθουσες είναι μικρές επίτηδες. Ένα παιδί που δυσκολεύεται να
              συγκεντρωθεί ή να ρυθμίσει τις αισθήσεις του δουλεύει καλύτερα σε έναν χώρο
              που δεν το κατακλύζει. Ο χώρος σίτισης έχει καρεκλάκι, τραπέζι στο σωστό ύψος
              και ό,τι χρειάζεται για να μοιάζει το γεύμα με γεύμα και όχι με εξέταση.
            </p>
          </div>

          {/* Reading width, not full bleed: the photographs are inline with the page, like plates in a book. */}
          {photosReady && (
          <ul className="mt-10 grid max-w-[60rem] gap-6 sm:grid-cols-2">
            {spaceImages.map((img, i) => (
              <li key={img.src} className={i === 0 ? "min-w-0 sm:col-span-2" : "min-w-0"}>
                <figure>
                  <Photo
                    src={img.src}
                    alt={img.alt}
                    caption={img.caption}
                    priority={i === 0}
                    className={`w-full ${i === 0 ? "aspect-[16/10]" : "aspect-[4/5]"}`}
                  />
                  <figcaption className="mt-3 text-sm text-ink-2">
                    <span className="numeral text-xs text-ink-3">{String(i + 1).padStart(2, "0")}</span>{" "}
                    {img.caption}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
          )}
        </section>

        <Steps />
        <ContactBlock />
      </main>
      <Footer />
    </>
  );
}
