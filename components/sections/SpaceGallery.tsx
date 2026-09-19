import Link from "next/link";
import Photo from "@/components/Photo";
import { photosReady, spaceImages } from "@/lib/site";
import { ArrowRightIcon } from "@/components/Icon";

/**
 * The rooms, as a strip across the width of the page.
 *
 * Stacked rather than split on purpose. The two sections above this one — the
 * services grid and the therapist — both set a head in a narrow column with
 * the content beside it, and a third in a row would turn the middle of the
 * homepage into one repeating shape. The head sits at a reading measure and
 * the rooms run underneath it, all four of them: a gallery that shows half of
 * a small space reads as a space with something to hide.
 *
 * A gallery with nothing real in it is worse than no gallery, so until the
 * photographs arrive the section stands down and the nav carries the route.
 */
export default function SpaceGallery() {
  if (!photosReady) return null;

  return (
    <section id="to-kentro" className="shell py-16 md:py-24">
      <div className="max-w-[34rem]">
        <h2 className="display text-[clamp(1.75rem,2.5vw+0.5rem,2.75rem)]">
          Ένας χώρος φτιαγμένος για παιδιά
        </h2>
        <p className="mt-5 leading-relaxed text-ink-2">
          Χαμηλά τραπέζια, μαλακό φως, παιχνίδια που έχουν δουλειά να κάνουν. Οι
          γονείς περιμένουν δίπλα, όχι απέναντι.
        </p>
        <Link
          href="/to-kentro"
          className="mt-6 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-accent link-line-on link-line"
        >
          Ο χώρος και η ομάδα
          <ArrowRightIcon className="size-4" />
        </Link>
      </div>

      {/* Two across on a phone rather than one: four full-width portraits are
          four screens of scrolling between the therapist and the articles. */}
      <ul className="mt-12 grid grid-cols-2 gap-4 md:mt-16 md:grid-cols-4 md:gap-6">
        {spaceImages.map((img) => (
          <li key={img.src} className="min-w-0">
            <figure>
              <Photo
                src={img.src}
                alt={img.alt}
                caption={img.caption}
                className="aspect-[4/5] w-full"
                sizes="(min-width: 768px) 17rem, 45vw"
              />
              <figcaption className="mt-3 text-sm text-ink-2">{img.caption}</figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}
