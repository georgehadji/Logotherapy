import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHero, { breadcrumbJsonLd, type Crumb } from "@/components/PageHero";
import JsonLd from "@/components/JsonLd";
import TherapistIntro from "@/components/sections/TherapistIntro";
import Steps from "@/components/sections/Steps";
import ContactBlock from "@/components/sections/ContactBlock";
import { SITE_URL, pageMetadata, therapist } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: `Η Λογοθεραπεύτρια — ${therapist.name} | Λογοθεραπεία Νέα Μηχανιώνα`,
  description: `${therapist.name}, λογοθεραπεύτρια με εξειδίκευση στην παιδιατρική λογοθεραπεία, τη θεραπεία σίτισης και τη νευροαποκατάσταση Bobath. Ιδιωτικό κέντρο στη Νέα Μηχανιώνα Θεσσαλονίκης από το ${therapist.since}.`,
  path: "/logotherapeftria",
});

const crumbs: Crumb[] = [{ label: "Η Λογοθεραπεύτρια", href: "/logotherapeftria" }];

export default function LogotherapeftriaPage() {
  return (
    <>
      <Nav />
      <main id="main">
        <JsonLd data={breadcrumbJsonLd(crumbs, SITE_URL)} />
        <PageHero
          title="Η λογοθεραπεύτρια"
          dateline={`${therapist.title} · Νέα Μηχανιώνα · από το ${therapist.since}`}
          lead="Παιδιατρική λογοθεραπεία και θεραπεία σίτισης, με τους γονείς στο κέντρο της δουλειάς και μια μέθοδο για κάθε παιδί, όχι μία μέθοδο για όλα."
          crumbs={crumbs}
        />
        <TherapistIntro full />
        <Steps />
        <ContactBlock />
      </main>
      <Footer />
    </>
  );
}
