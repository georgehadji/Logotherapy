# Fonts

Static TrueType instances of Manrope (400 and 700) and of Noto Serif Display
(700), committed because `lib/og.tsx` reads them from disk at build time —
Satori has no fallback that can draw Greek glyphs, and the build must not
depend on network access.

Satori resolves a single weight per registered family and cannot read WOFF2.
Google serves the format its caller's user agent admits to supporting, so a
modern UA returns WOFF2 and a very old one returns TrueType:

```
https://fonts.googleapis.com/css2?family=Noto+Serif+Display:wght@700&subset=greek,latin
User-Agent: Mozilla/5.0 (Linux; U; Android 2.3; en-us) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1
```

The stylesheet that comes back names one `.ttf`; fetch it with the same UA.
Check the first four bytes are `00010000` before committing — a wrong UA
returns a subset blob that is not an sfnt at all, and Satori draws blank
boxes rather than failing.

Manrope — Mikhail Sharanda; Noto Serif Display — Google. Both SIL Open Font
License 1.1, which permits redistribution.

The web pages themselves do not use these files; `next/font` self-hosts its own
optimised copies.
