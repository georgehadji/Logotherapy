import Link from "next/link";
import Photo from "@/components/Photo";
import { photosReady, therapist, therapistImage } from "@/lib/site";
import { ArrowRightIcon } from "@/components/Icon";

/**
 * Portrait on the left, the therapist's way of working on the right, then the
 * credentials as a key/value record. `full` adds the paragraphs that only
 * belong on her own page and the complete credentials list.
 */
export default function TherapistIntro({ full = false }: { full?: boolean }) {
  const credentials = full ? therapist.credentials : therapist.credentials.slice(0, 3);

  return (
    <section
      id="logotherapeftria"
      className="shell grid gap-10 pb-16 pt-8 md:grid-cols-12 md:gap-12 md:pb-24 md:pt-12"
    >
      {photosReady && (
        <div className="md:col-span-5">
          <Photo
            src={therapistImage.src}
            alt={therapistImage.alt}
            caption={therapist.name}
            className="aspect-[4/5] w-full"
            priority={full}
          />
        </div>
      )}

      <div className={photosReady ? "md:col-span-6 md:col-start-7" : "md:col-span-7"}>
        <p className="eyebrow">{therapist.title}</p>
        <h2 className="display mt-3 text-[clamp(1.75rem,2.5vw+0.5rem,2.75rem)]">{therapist.name}</h2>

        <div className="mt-6 space-y-5 text-lg leading-relaxed text-ink-2">
          <p>
            Λογοθεραπεύτρια με εξειδίκευση στην παιδιατρική λογοθεραπεία και στη
            θεραπεία σίτισης και κατάποσης. Από το {therapist.since} διευθύνει το δικό
            της κέντρο στη Νέα Μηχανιώνα, με διεπιστημονική ομάδα, όπου υποδέχεται
            βρέφη, παιδιά και εφήβους από όλη την ανατολική Θεσσαλονίκη.
          </p>
          <p>
            Η δουλειά της ξεκινά από μια πεποίθηση: οι γονείς ξέρουν το παιδί τους
            καλύτερα από κάθε εργαλείο. Γι&apos; αυτό η αξιολόγηση γίνεται μαζί τους, το
            πλάνο εξηγείται με απλά λόγια και κάθε συνεδρία κλείνει με κάτι συγκεκριμένο
            για το σπίτι.
          </p>
          {full && (
            <>
              <p>
                Στα νευρολογικά περιστατικά και στις δυσκολίες σίτισης εφαρμόζει τη
                νευροεξελικτική μέθοδο NDT/Bobath και το Baby Bobath, ώστε η υποστήριξη
                να ξεκινά από τις πρώτες εβδομάδες ζωής. Το κέντρο διαθέτει σύγχρονο
                διαγνωστικό εξοπλισμό και μεθόδους όπως η νευρομυϊκή ηλεκτροδιέγερση, η
                ηλεκτρομυογραφική ανατροφοδότηση και η ελαστική περίδεση, όπου η κλινική
                εικόνα το επιβάλλει.
              </p>
              <p>
                Η συνεχής επιμόρφωση δεν είναι διακόσμηση στο βιογραφικό· είναι ο τρόπος
                να φτάνει στο παιδί η μέθοδος που του ταιριάζει, όχι η μία μέθοδος για
                όλα.
              </p>
            </>
          )}
        </div>

        {/* Key/value rows, not stat tiles: credentials are a record, not a scoreboard. */}
        <dl className="mt-8 border-t border-line">
          {credentials.map((c) => (
            <div
              key={c.label}
              className="grid gap-1 border-b border-line py-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] sm:gap-6"
            >
              <dt className="text-sm font-semibold text-ink">{c.label}</dt>
              <dd className="text-sm leading-relaxed text-ink-2">{c.detail}</dd>
            </div>
          ))}
        </dl>

        {!full && (
          <Link
            href="/logotherapeftria"
            className="mt-6 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-accent link-line-on link-line"
          >
            Περισσότερα για τη λογοθεραπεύτρια
            <ArrowRightIcon className="size-4" />
          </Link>
        )}
      </div>
    </section>
  );
}
