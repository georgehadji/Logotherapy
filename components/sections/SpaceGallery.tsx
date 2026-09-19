import Link from "next/link";
import Photo from "@/components/Photo";
import { photosReady, spaceImages } from "@/lib/site";
import { ArrowRightIcon } from "@/components/Icon";

/**
 * Two rooms on the homepage; the rest of the space lives on /to-kentro. A
 * gallery with nothing real in it is worse than no gallery, so until the
 * photographs arrive the section stands down and the nav carries the route.
 */
export default function SpaceGallery() {
  if (!photosReady) return null;
  const pair = spaceImages.slice(0, 2);

  return (
    <section id="to-kentro" className="shell grid gap-10 py-16 md:grid-cols-12 md:gap-12 md:py-24">
      <div className="md:col-span-4">
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

      <ul className="grid gap-5 sm:grid-cols-2 md:col-span-8 md:gap-6">
        {pair.map((img) => (
          <li key={img.src} className="min-w-0">
            <figure>
              <Photo src={img.src} alt={img.alt} caption={img.caption} className="aspect-[4/5] w-full" />
              <figcaption className="mt-3 text-sm text-ink-2">{img.caption}</figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}
