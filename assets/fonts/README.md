# Fonts

Static TrueType instances of Manrope (400 and 700), committed because
`lib/og.tsx` reads them from disk at build time — Satori has no fallback that
can draw Greek glyphs, and the build must not depend on network access.

Satori resolves a single weight per registered family and cannot read WOFF2.
Fetch a replacement with a plain `Mozilla/5.0` user agent, which is what makes
the Google Fonts API serve `format('truetype')` with the full glyph set.

Manrope — Mikhail Sharanda, SIL Open Font License 1.1, which permits
redistribution.

The web pages themselves do not use these files; `next/font` self-hosts its own
optimised copies.
