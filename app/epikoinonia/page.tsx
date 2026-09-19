import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHero, { breadcrumbJsonLd, type Crumb } from "@/components/PageHero";
import JsonLd from "@/components/JsonLd";
import ContactForm from "@/components/ContactForm";
import ContactBlock from "@/components/sections/ContactBlock";
import { SITE_URL, hours, location, pageMetadata, therapist } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Επικοινωνία | Λογοθεραπεία Νέα Μηχανιώνα Θεσσαλονίκης",
  description: `Κέντρο λογοθεραπείας, ${location.line}. Τηλέφωνο ${therapist.phoneDisplay}. ${hours.short}.`,
  path: "/epikoinonia",
});

const crumbs: Crumb[] = [{ label: "Επικοινωνία", href: "/epikoinonia" }];

export default function EpikoinoniaPage() {
  const contactPage = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    url: `${SITE_URL}/epikoinonia`,
    inLanguage: "el",
    mainEntity: { "@id": `${SITE_URL}/#practice` },
  };

  return (
    <>
      <Nav />
      <main id="main">
        <JsonLd data={breadcrumbJsonLd(crumbs, SITE_URL)} />
        <JsonLd data={contactPage} />

        <PageHero
          title="Επικοινωνία"
          dateline={`${therapist.phoneDisplay} · ${hours.note}`}
          lead="Για ραντεβού καλέστε μας, είναι ο πιο γρήγορος δρόμος. Η φόρμα εξυπηρετεί γενικά ερωτήματα και θα λάβετε απάντηση το συντομότερο δυνατό."
          crumbs={crumbs}
        />

        <section className="shell py-10 md:py-14">
          <div className="max-w-[65ch]">
            <h2 className="head-inline">Φόρμα επικοινωνίας</h2>
            <p className="mt-3 leading-relaxed text-ink-2">
              Συμπληρώστε τα στοιχεία σας και λίγα λόγια για το τι σας απασχολεί. Τα
              πεδία με αστερίσκο είναι υποχρεωτικά. Για ραντεβού καλέστε στο{" "}
              <a href={`tel:${therapist.phone}`} className="font-semibold text-accent link-line-on link-line">
                {therapist.phoneDisplay}
              </a>
              .
            </p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>
        </section>

        <ContactBlock withForm />
      </main>
      <Footer />
    </>
  );
}
