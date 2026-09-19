import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import {
  SITE_URL,
  hours,
  location,
  serviceAreas,
  services,
  therapist,
} from "@/lib/site";
import ScrollProgress from "@/components/ScrollProgress";
import MobileCallBar from "@/components/MobileCallBar";
import JsonLd from "@/components/JsonLd";
import "./globals.css";

/*
 * One variable face, one file. Manrope carries both the headlines (at 650–750)
 * and the paragraphs (at 400): a geometric-humanist sans with a Greek drawn as
 * a first language. `weight` is omitted on purpose — that is what selects the
 * variable font, so the whole 200–800 range arrives in a single request.
 * next/font downloads it at build time and serves it from this origin; no
 * request ever leaves for Google.
 */
const manrope = Manrope({
  subsets: ["greek", "latin"],
  variable: "--font-manrope",
  display: "swap",
});

const title = `${therapist.name} — Λογοθεραπεύτρια Νέα Μηχανιώνα Θεσσαλονίκης`;
const description = `Λογοθεραπεία για βρέφη, παιδιά και εφήβους στη Νέα Μηχανιώνα Θεσσαλονίκης. Αξιολόγηση, καθυστέρηση λόγου, άρθρωση, τραυλισμός, θεραπεία σίτισης και κατάποσης, νευροαποκατάσταση Bobath, αυτισμός, μαθησιακές δυσκολίες. ${hours.short}.`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  keywords: [
    "λογοθεραπεία Νέα Μηχανιώνα",
    "λογοθεραπευτής Νέα Μηχανιώνα",
    "λογοθεραπεία Επανομή",
    "λογοθεραπεία Περαία",
    "λογοθεραπεία Θεσσαλονίκη",
    "παιδική λογοθεραπεία",
    "καθυστέρηση λόγου",
    "θεραπεία σίτισης παιδιών",
    "δυσφαγία παιδιά",
    "τραυλισμός παιδιά",
    "Bobath λογοθεραπεία",
    therapist.name,
  ],
  authors: [{ name: therapist.name }],
  openGraph: {
    type: "website",
    locale: "el_GR",
    title,
    description,
    siteName: therapist.brand,
  },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#faf6f2",
  width: "device-width",
  initialScale: 1,
};

/**
 * One graph, three nodes, stable ids: the therapist, the practice and the
 * website. Every other page points at these ids instead of minting anonymous
 * stubs, so search and answer engines see one entity.
 *
 * No `geo` block: the address has not been resolved to verified coordinates.
 * No `aggregateRating`: the practice's Google rating is not republished on
 * the site, so it is not claimed in the graph either. No opening hours: none
 * are published — see CONTENT.md.
 */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#therapist`,
      name: therapist.formalName,
      alternateName: therapist.name,
      jobTitle: therapist.title,
      description: `${therapist.specialty}, ${location.area} Θεσσαλονίκης.`,
      url: `${SITE_URL}/logotherapeftria`,
      image: `${SITE_URL}/opengraph-image.png`,
      worksFor: { "@id": `${SITE_URL}/#practice` },
      knowsAbout: services.map((s) => s.title),
      hasCredential: therapist.credentials.map((c) => ({
        "@type": "EducationalOccupationalCredential",
        name: c.label,
        description: c.detail,
      })),
      sameAs: Object.values(therapist.sourceUrls),
    },
    {
      "@type": ["MedicalBusiness", "LocalBusiness"],
      "@id": `${SITE_URL}/#practice`,
      name: therapist.clinicName,
      alternateName: therapist.brand,
      url: SITE_URL,
      image: `${SITE_URL}/opengraph-image.png`,
      description,
      telephone: therapist.phone,
      foundingDate: String(therapist.since),
      founder: { "@id": `${SITE_URL}/#therapist` },
      employee: { "@id": `${SITE_URL}/#therapist` },
      address: {
        "@type": "PostalAddress",
        streetAddress: location.street,
        addressLocality: location.area,
        addressRegion: location.region,
        postalCode: location.postal,
        addressCountry: "GR",
      },
      hasMap: location.mapsLink,
      areaServed: serviceAreas.map((name) => ({ "@type": "City", name })),
      sameAs: Object.values(therapist.sourceUrls),
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Υπηρεσίες λογοθεραπείας",
        itemListElement: services.map((s) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: s.title,
            description: s.text,
            url: `${SITE_URL}/ypiresies/${s.slug}`,
          },
        })),
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: therapist.brand,
      inLanguage: "el",
      publisher: { "@id": `${SITE_URL}/#practice` },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="el" className={manrope.variable}>
      <body className="antialiased">
        <JsonLd data={jsonLd} />

        {/* First thing in the tab order: keyboard and screen-reader users skip the navigation. */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[var(--z-skip)] focus:rounded-full focus:bg-accent focus:px-5 focus:py-3 focus:font-semibold focus:text-paper"
        >
          Μετάβαση στο περιεχόμενο
        </a>
        <ScrollProgress />
        {children}
        <MobileCallBar />
      </body>
    </html>
  );
}
