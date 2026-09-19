# Image prompts

Τα πέντε αρχεία στο `public/images/` είναι placeholders. Όσο ο διακόπτης
`photosReady` στο `lib/site.ts` είναι `false`, **δεν δημοσιεύεται κανένα από
αυτά**: το hero δείχνει το σήμα του κέντρου, και η γκαλερί, το πορτρέτο και οι
φωτογραφίες των αιθουσών μένουν εκτός. Μόλις μπουν οι πραγματικές φωτογραφίες
με τα ίδια ονόματα αρχείων, γυρίστε τον διακόπτη σε `true`.

Τα prompts γράφονται στα αγγλικά — τα μοντέλα εικόνας χάνουν λεπτομέρεια στη
μετάφραση.

## Art direction

Η κατεύθυνση είναι **premium editorial ιδιωτικού ιατρείου**, όχι παιδότοπος
και όχι stock υγείας. Παλέτα από το `design.md` και από το σήμα: ζεστό
off-white `#faf6f2`, άμμος `#e5d9c9`, ελιά `#657267`, απαλός πηλός `#cfa98b`,
ζεστό ανθρακί `#291f19`, μία τερακότα `#9c4535`. Τίποτα κορεσμένο, τίποτα ψυχρό.

**House style — προσθέστε το σε κάθε prompt:**

> Editorial interior photography, natural soft daylight from one side, warm
> off-white walls, shallow depth of field, calm and uncluttered, muted warm
> palette of ivory, sand, olive-sage and pale oak with a single terracotta
> accent, Mediterranean light, photorealistic, 35mm lens look, gentle
> contrast, no text, no logos, no watermarks, no brand names.

**Negative prompt — προσθέστε το παντού:**

> no white medical coats, no stethoscopes, no clinical equipment, no hospital
> look, no primary-colour plastic toys, no cartoon characters, no alphabet
> posters, no balloons, no rainbow colours, no kindergarten aesthetic, no
> staged stock-photo smiles, no gradients, no HDR, no text.

**Παιδιά.** Όπου εμφανίζεται παιδί, χαλαρό και απασχολημένο: χωρίς κλάματα,
χωρίς συγκράτηση, χωρίς εξοπλισμό. Πρόσωπο γονέα ποτέ αναγνωρίσιμο. Προτιμήστε
χέρια, πλάτες, ή αίθουσες χωρίς ανθρώπους.

---

## `lilian-mpatsikosta-logotherapeftria.png` — πορτρέτο

Μπαίνει στο hero (4:5 σε desktop, 3:2 σε κινητό, `object-fit: cover`) και στη
σελίδα `/logotherapeftria`. **Τραβήξτε το με αέρα γύρω από το πρόσωπο** και το
βλέμμα ελαφρώς εκτός κέντρου, ώστε να αντέχει και τα δύο crops.

> Editorial portrait of a Greek woman in her early forties, a speech-language
> therapist, calm and composed, quiet confident expression rather than a broad
> smile, looking just past the camera. Wearing a well-cut knit or linen top in
> oatmeal or deep olive — no uniform, no white coat. Standing or seated near a
> window in a bright, spare room with a warm off-white wall and a single
> shelf out of focus behind her. Soft directional daylight, 85mm, f/2, gentle
> film grain, generous negative space on one side. Vertical 4:5.

> **Προσοχή.** Είναι πορτρέτο υπαρκτού, επώνυμου προσώπου: ό,τι μπει εδώ
> παρουσιάζεται στους επισκέπτες ως η ίδια. Μόνο πραγματική φωτογραφία είναι
> ακριβής. Μέχρι τότε, αν χρειαστεί κάτι ενδιάμεσο, προτιμήστε μη
> αναγνωρίσιμη εικόνα (χέρια με κάρτες, τον χώρο) αντί για παραγόμενο πρόσωπο.

## `kentro-logotherapeias-aithousa.png` — η αίθουσα θεραπείας · 4:5

> A small, bright speech-therapy room for children, seen from the doorway. A
> low round table in pale oak with two child-sized chairs, a wall mirror at
> child height in a thin wooden frame, open shelves holding wooden toys,
> picture cards and a few books arranged sparsely, a flat-woven rug in sand
> and olive. Daylight from a window on the left. No people. Vertical.

## `kentro-logotherapeias-ypodochi.png` — η υποδοχή · 4:5

> The waiting area of a small private practice: a pale oak desk with a closed
> laptop and a single ceramic vase with olive branches, two upholstered chairs
> in warm linen for parents, a low basket of picture books, coat hooks at
> child height on an off-white wall. Quiet, adult, uncluttered. No people.
> Vertical.

## `kentro-logotherapeias-sitisi.png` — ο χώρος σίτισης · 4:5

> A quiet feeding-therapy corner: a wooden high chair with a footrest pulled
> up to a small table, a divided plate with a few pieces of fruit and
> vegetables, a small cup, a folded linen cloth, one terracotta ceramic bowl.
> Soft daylight across the table, off-white wall. Domestic, not clinical. No
> people. Vertical.

## `kentro-logotherapeias-eisodos.png` — η είσοδος · 4:5

> The entrance of a small therapy practice on a quiet street in a Greek
> seaside town. Pale plaster façade, a glass door in a slim wooden frame, a
> low planter with lavender or an olive shrub beside two stone steps, a hint
> of sea-blue sky at the top edge. Late afternoon light, long soft shadows.
> Shot straight on from the pavement. Vertical.

---

## Αφού μπουν τα αρχεία

1. Ίδια ονόματα αρχείων — τα paths ζουν στο `lib/site.ts`.
2. Μέγεθος ~1600px στη μεγάλη πλευρά· μετατροπή σε WebP (quality 82) και
   αλλαγή των καταλήξεων σε `spaceImages` / `therapistImage` από `.png` σε
   `.webp`.
3. `photosReady = true` στο `lib/site.ts`.
4. `npm run build` και έλεγχος σε κάθε σελίδα.

Για να ξαναφτιαχτούν οι placeholders: `npm run placeholders`.
