# Fonts

| File | Used by | Why it is here |
|---|---|---|
| `manrope-400.ttf`, `manrope-700.ttf` | `lib/og.tsx` | Satori reads fonts from disk |
| `libertinus-serif-700.ttf` | `lib/og.tsx` | the card headline, same face as the page |
| `libertinus-serif-700.woff2` | `app/layout.tsx` | the headings, through `next/font/local` |

Satori has no fallback that can draw Greek glyphs and the build must not depend
on network access, so the TTFs are committed rather than fetched. It resolves a
single weight per registered family and cannot read WOFF2.

Manrope comes from `next/font/google` for the pages. Libertinus Serif does not:
Next's Google font metadata still lists this family as Latin, 400 only, so the
loader refuses both the Greek and the bold. The files here are Google's own
bold, subsetted and compressed locally.

## Replacing Libertinus

Google serves the format the caller's user agent admits to supporting; for this
family it returns TrueType to everyone, since it is not yet subsetted upstream:

```
https://fonts.googleapis.com/css2?family=Libertinus+Serif:wght@700
```

The stylesheet names one `.ttf` (440 KB, the whole character set). Cut it down
to what the site sets — Latin, Greek, the punctuation the copy uses — and write
both formats:

```
python -m fontTools.subset libertinus-full.ttf \
  --output-file=libertinus-serif-700.woff2 --flavor=woff2 --layout-features='*' \
  --unicodes=U+0020-007E,U+00A0-00FF,U+0100-017F,U+0370-03FF,U+2010-2027,U+2030-205E,U+20AC,U+2122,U+2190-2193
```

Repeat without `--flavor` for the TTF the OG cards read. Check the first four
bytes are `00010000` before committing: a wrong user agent returns a blob that
is not an sfnt at all, and Satori draws blank boxes rather than failing.

Manrope — Mikhail Sharanda. Libertinus — Philipp H. Poll and the Libertinus
authors, the OFL continuation of Linux Libertine. Both SIL Open Font License
1.1, which permits redistribution.
