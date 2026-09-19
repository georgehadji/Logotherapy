export type LegalSection = {
  h: string;
  p: readonly string[];
  ul?: readonly string[];
};

/** Shared long-form layout for the privacy policy and terms pages: one reading column, a contents line at the top. */
export default function LegalBody({ sections }: { sections: readonly LegalSection[] }) {
  return (
    <section className="shell py-10 md:py-14">
      <div className="max-w-[65ch]">
        <nav aria-label="Περιεχόμενα" className="border-y border-line py-4 text-sm">
          <p className="text-xs uppercase tracking-[0.14em] text-ink-3">Περιεχόμενα</p>
          <ol className="mt-2 gap-x-8 sm:columns-2">
            {sections.map((s) => (
              <li key={s.h}>
                <a
                  href={`#${slugify(s.h)}`}
                  className="inline-flex min-h-9 items-center text-ink-2 transition-colors t-quick hover:text-accent"
                >
                  {s.h}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {sections.map((s) => (
          <section key={s.h} className="mt-6 scroll-mt-8">
            <h2 id={slugify(s.h)} className="head-inline scroll-mt-8">
              {s.h}
            </h2>
            {s.p.map((text) => (
              <p key={text} className="mt-4 text-lg leading-[1.75] text-ink-2">
                {text}
              </p>
            ))}
            {s.ul && (
              <ul className="mt-5 border-t border-line text-lg text-ink-2">
                {s.ul.map((item) => (
                  <li key={item} className="border-b border-line py-3 leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>
    </section>
  );
}

/** Greek-aware anchor ids: strip accents, then keep Latin/Greek letters and digits. */
function slugify(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^\p{Letter}\p{Number}]+/gu, "-")
    .replace(/^-|-$/g, "");
}
