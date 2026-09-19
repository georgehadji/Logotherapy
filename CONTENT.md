# Content provenance

What on this site is a verified fact, and what was written for the build and
still needs the therapist's approval. Read this before the site goes live.

## Verified

From the client (2026-09-19) and the three public listings in
`therapist.sourceUrls` (`lib/site.ts`):

| Field | Value | Source |
|---|---|---|
| Name | Ευαγγελία (Λίλιαν) Μπατσικώστα | client; listings say «Λίλια» |
| Profession | Λογοθεραπεύτρια | client, all listings |
| Address | Κανάρη 15, Νέα Μηχανιώνα 57004, Θεσσαλονίκη | client (listings show «Καραϊσκάκη Πάροδος» — client's address used) |
| Phone | 23920 36417 | client |
| Practice since | 2009, private centre with interdisciplinary team | rehabcareacademy.gr |
| Education | ΑΤΕΙ Ηπείρου 2008; postgraduate Special Education (ΕΚΠΑ); School Psychology (Aegean) | rehabcareacademy.gr |
| Certifications | Bayley, DTLA-3/4, NDT/Bobath, Baby Bobath, SOFFI, SOS, CAN-EAT, FOCUS, OPT, TEACCH, PECS, Palin PCI, Makaton, ΣΙΜΑΤΑ | rehabcareacademy.gr |
| Methods | NMES, EMG biofeedback, elastic taping | rehabcareacademy.gr, aetoitisygeias.eu |
| Awards | Αετοί της Υγείας 2026; Χρυσή Εταιρεία 2025, 2026 | the two ranking sites |
| Rating | 5/5 from 28 Google reviews | xrysietairia.eu (aetoitisygeias.eu reports 8.5/10 from 12 — the Google figure is the one shown) |

## Needs confirmation before launch

### 1. Hours

No listing publishes opening hours. The site says «με ραντεβού» and nothing
more; there is no open-now logic and no `openingHoursSpecification` in the
JSON-LD. Add real hours to `hours.rows` in `lib/site.ts` once known.

### 2. Name of the centre

`therapist.clinicName` is «Κέντρο Λογοθεραπείας Λίλιαν Μπατσικώστα» — a
descriptive name, not a registered one. Replace with the actual trading name.

### 3. Service pages

`services[].intro`, `.includes`, `.whenNeeded` and `.approach` are general
speech-language information written for this build. They follow mainstream
consensus and promise no outcome, but `approach` describes **how this centre
works** and is published under the therapist's name. Points to check:

- Whether NMES / EMG / taping should be named on the feeding page.
- Whether adults are ever seen (the site says children and adolescents only).
- The age milestones in `signs` and the FAQ.

### 4. Articles

All six articles in `lib/articles.ts` were written for this build and are
attributed to the therapist. They must be reviewed before publication.

### 5. Biography

`components/sections/TherapistIntro.tsx` describes her approach. Only the
specialty, the year, the credentials and the equipment are verified.

### 6. Photography

`public/images/` holds abstract placeholders, not photographs. See
`PROMPTS.md`. `lilian-mpatsikosta-logotherapeftria.png` stands in for a real,
named person — supply a real portrait.

**Current state: `photosReady` is `true` and five generated photographs are
live** — four of the rooms and one portrait, as WebP at 1122×1402. They are
not photographs of this centre and the portrait is not a photograph of
Ευαγγελία Μπατσικώστα; they were produced from the prompts in `PROMPTS.md`.
Visitors read the portrait as her, so it needs her sign-off and, properly, a
real photograph. Replacing them is a straight file swap — same names, same
folder — and `photosReady = false` withholds all of them again in one edit.

`Logo.png` is the practice's mark as supplied; `logo-mark.png` is the same
file trimmed and scaled to 480px for the web. It is composited with
`mix-blend-mode: multiply`, so the white field behind it disappears on any
light ground — if a transparent PNG or an SVG of the mark ever arrives, it can
replace `logo-mark.png` directly.

### 7. Missing from the listings, currently absent from the site

- No email is published on the site itself (`contactEmail` is the inbox the
  form delivers to; FormSubmit must be activated once — README).
- No ΑΦΜ / ΔΟΥ, no registration number with the professional association
  (ΠΣΛ / ΣΕΛΛΕ). Greek practices normally display these in the footer.
- No social profiles, no Google Business Profile URL (`googleMapsSearch` is a
  name search — replace with the real place URL).
- No coordinates: the JSON-LD carries the address but no `geo` block.
- No fees, no insurance / ΕΟΠΥΥ information; `llms.txt` tells answer engines
  not to invent them.

## Placeholder values to change at deploy

| Where | Current | Action |
|---|---|---|
| `SITE_URL` in `lib/site.ts` | `https://logotherapeia-mpatsikosta.gr` | Set to the real domain, or set `NEXT_PUBLIC_SITE_URL` |
| `contactEmail` in `lib/site.ts` | client inbox | Activate FormSubmit, then swap in the alias (README) |
| `hours` in `lib/site.ts` | «με ραντεβού» | Real hours |
| Legal pages | «Σεπτέμβριος 2026» | Update on any revision |
| `CONTENT_UPDATED` in `app/sitemap.ts` | 2026-09-19 | Bump when copy changes |
