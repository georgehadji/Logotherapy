"use client";

import { cloneElement, isValidElement, useEffect, useRef, useState } from "react";
import { contactEmail, services, therapist } from "@/lib/site";

/**
 * The site is a static export, so there is no server of ours to post to.
 * FormSubmit relays the submission to `contactEmail` without any backend.
 *
 * Two things to do before this goes live (see README, "Contact form"):
 *  1. Submit the form once — FormSubmit emails an activation link that has to
 *     be clicked, otherwise nothing is delivered.
 *  2. Replace the address in ENDPOINT with the random alias FormSubmit issues,
 *     so the inbox address is not sitting in the public bundle for scrapers.
 */
const ENDPOINT = `https://formsubmit.co/ajax/${contactEmail}`;

type Status = "idle" | "sending" | "sent" | "error";
type Errors = Partial<Record<"name" | "email" | "message" | "consent" | "form", string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Field caps, enforced in JS as well as with maxLength so a script cannot bypass them. */
const LIMITS = { name: 120, email: 180, phone: 40, topic: 120, message: 4000 } as const;

/** A human needs at least a few seconds to fill this in; a bot posts instantly. */
const MIN_FILL_MS = 3_000;
const COOLDOWN_MS = 30_000;
const MAX_PER_SESSION = 3;

/**
 * Drops C0/C1 control characters — the payload shape used for header
 * injection through a mail relay. A code-point filter rather than a regex, so
 * the source carries no escape sequences a toolchain could mangle.
 */
const clean = (v: string, max: number) =>
  Array.from(v)
    .filter((ch) => {
      const c = ch.codePointAt(0) ?? 0;
      return c > 31 && c !== 127 && !(c >= 128 && c <= 159);
    })
    .join("")
    .trim()
    .slice(0, max);

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const mountedAt = useRef(0);
  const lastSentAt = useRef(0);
  const sentCount = useRef(0);
  /*
   * Set on the way in as well as cleared on the way out. A ref that is only
   * ever cleared stays cleared: StrictMode mounts, unmounts and remounts in
   * development, so the cleanup ran once and every later response — sent and
   * failed alike — was dropped on the floor, leaving the reader pressing a
   * button that answered nothing.
   */
  const mounted = useRef(true);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  /*
   * Send the reader with the content. The form unmounts on success, taking
   * the focused submit button with it, so focus falls back to <body> and the
   * next Tab restarts from the top of the document — the one moment the
   * confirmation matters is the moment the keyboard loses its place.
   */
  const sentPanel = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (status === "sent") sentPanel.current?.focus();
  }, [status]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Bot traps: honeypot and minimum fill time. Both fail silently as a
    // success so an automated sender has no signal to adapt to.
    if (String(data.get("_honey") ?? "") !== "" || Date.now() - mountedAt.current < MIN_FILL_MS) {
      setStatus("sent");
      return;
    }

    if (sentCount.current >= MAX_PER_SESSION) {
      setErrors({ form: `Έχετε στείλει ήδη αρκετά μηνύματα. Καλέστε στο ${therapist.phoneDisplay}.` });
      return;
    }
    if (Date.now() - lastSentAt.current < COOLDOWN_MS && lastSentAt.current > 0) {
      setErrors({ form: "Περιμένετε λίγο πριν στείλετε νέο μήνυμα." });
      return;
    }

    const name = clean(String(data.get("name") ?? ""), LIMITS.name);
    const email = clean(String(data.get("email") ?? ""), LIMITS.email);
    const phone = clean(String(data.get("phone") ?? ""), LIMITS.phone);
    const topic = clean(String(data.get("topic") ?? ""), LIMITS.topic);
    const message = clean(String(data.get("message") ?? ""), LIMITS.message);
    const consent = data.get("consent") === "on";

    const next: Errors = {};
    if (name.length < 2) next.name = "Συμπληρώστε το ονοματεπώνυμό σας.";
    if (!EMAIL_RE.test(email) || email.length > LIMITS.email)
      next.email = "Συμπληρώστε έγκυρη διεύθυνση email.";
    if (message.length < 10)
      next.message = "Γράψτε λίγα λόγια για το αίτημά σας (τουλάχιστον 10 χαρακτήρες).";
    if (!consent) next.consent = "Απαιτείται η συγκατάθεσή σας για την επικοινωνία.";

    setErrors(next);
    if (Object.keys(next).length) {
      form.querySelector<HTMLElement>(`[data-field="${Object.keys(next)[0]}"]`)?.focus();
      return;
    }

    setStatus("sending");
    try {
      // An explicit allow-list, not Object.fromEntries: only these five fields
      // ever leave the browser, whatever a tampered DOM adds to the form.
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        referrerPolicy: "no-referrer",
        body: JSON.stringify({
          name,
          email,
          phone,
          topic: topic || "Γενική ερώτηση",
          message,
          // The chosen subject travels in the subject line, so the inbox sorts
          // itself without the message having to be opened first.
          _subject: `Ιστοσελίδα · ${topic || "Γενική ερώτηση"}`,
          _template: "table",
          _captcha: "false",
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      /*
       * The status code is not the answer. FormSubmit replies 200 with
       * `success: "false"` while the address is still unactivated, and on a
       * few other refusals — so trusting `res.ok` alone would tell a parent
       * their message had arrived when nothing was delivered to anyone. The
       * relay has to say so itself.
       */
      const relay = (await res.json().catch(() => null)) as { success?: unknown } | null;
      if (String(relay?.success ?? "") !== "true") throw new Error("relay declined");

      if (!mounted.current) return;

      lastSentAt.current = Date.now();
      sentCount.current += 1;
      setStatus("sent");
      form.reset();
    } catch {
      if (mounted.current) setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div
        ref={sentPanel}
        tabIndex={-1}
        className="hairline pt-10 focus:outline-none"
        role="status"
        aria-live="polite"
      >
        <p className="display text-3xl md:text-4xl">Το μήνυμα στάλθηκε.</p>
        <p className="mt-4 max-w-md text-ink-2">
          Θα λάβετε απάντηση το συντομότερο δυνατό. Αν θέλετε να κλείσετε ραντεβού άμεσα,
          καλέστε στο{" "}
          <a href={`tel:${therapist.phone}`} className="font-semibold text-accent link-line-on link-line">
            {therapist.phoneDisplay}
          </a>
          .
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-8 cursor-pointer text-sm font-semibold text-accent link-line-on link-line"
        >
          Αποστολή νέου μηνύματος
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="relative space-y-8">
      {/* Honeypot: off-screen rather than display:none, so a filler script still sees it. Never focusable, never announced. */}
      <div aria-hidden className="absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden">
        <label htmlFor="_honey">Μην συμπληρώσετε αυτό το πεδίο</label>
        <input id="_honey" type="text" name="_honey" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Field id="name" label="Ονοματεπώνυμο" error={errors.name} required>
          <input id="name" name="name" data-field="name" autoComplete="name" maxLength={LIMITS.name} className={inputClass} />
        </Field>

        <Field id="email" label="Email" error={errors.email} required>
          <input id="email" name="email" type="email" data-field="email" autoComplete="email" maxLength={LIMITS.email} className={inputClass} />
        </Field>

        <Field id="phone" label="Τηλέφωνο (προαιρετικό)">
          <input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" maxLength={LIMITS.phone} className={inputClass} />
        </Field>

        <Field id="topic" label="Θέμα">
          <select id="topic" name="topic" className={`${inputClass} cursor-pointer`} defaultValue="">
            <option value="">Γενική ερώτηση</option>
            {services.map((s) => (
              <option key={s.slug} value={s.title}>
                {s.title}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field id="message" label="Το μήνυμά σας" error={errors.message} required>
        <textarea id="message" name="message" data-field="message" rows={5} maxLength={LIMITS.message} className={`${inputClass} min-h-28 resize-y`} />
      </Field>

      <p className="note px-5 py-4 text-sm leading-relaxed text-ink-2">
        Η φόρμα προορίζεται για γενικά ερωτήματα και στοιχεία επικοινωνίας, όχι για ιατρικό
        ιστορικό, γνωματεύσεις ή βίντεο του παιδιού. Ό,τι αφορά το παιδί σας το συζητάμε στη
        συνάντηση, όπου ανήκει.
      </p>

      <div>
        {/* The one control that does not go through <Field>, so its wiring is
            done by hand: without it the reader is told the form failed, is
            moved to this checkbox, and never hears why. */}
        <label className="flex cursor-pointer items-start gap-3 text-sm text-ink-2">
          <input
            type="checkbox"
            name="consent"
            data-field="consent"
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? "consent-error" : undefined}
            className="mt-1 size-4 shrink-0 cursor-pointer accent-[var(--color-accent)]"
          />
          <span>
            Συναινώ στην επεξεργασία των στοιχείων μου με μοναδικό σκοπό την απάντηση στο
            αίτημά μου, σύμφωνα με την{" "}
            <a href="/politiki-aporritou" className="text-accent link-line-on link-line">
              Πολιτική Απορρήτου
            </a>
            .
          </span>
        </label>
        <p id="consent-error" role="alert" className={errClass}>
          {errors.consent}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-6">
        <button
          type="submit"
          disabled={status === "sending"}
          className={`pill cursor-pointer disabled:cursor-wait disabled:opacity-60 ${status === "sending" ? "sending" : ""}`}
        >
          {status === "sending" ? "Αποστολή…" : "Αποστολή μηνύματος"}
        </button>

        {/* A failure that only says "try again" leaves the reader with nothing
            to do; the number is the route that always works. */}
        {status === "error" && (
          <p className="text-sm text-destructive" role="alert">
            Η αποστολή απέτυχε. Δοκιμάστε ξανά ή καλέστε στο{" "}
            <a href={`tel:${therapist.phone}`} className="font-semibold text-destructive link-line-on link-line">
              {therapist.phoneDisplay}
            </a>
            .
          </p>
        )}

        {errors.form && (
          <p className="text-sm text-destructive" role="alert">
            {errors.form}
          </p>
        )}
      </div>
    </form>
  );
}

/* One base height for every control and for the submit pill (3rem). The border stays 1px in every state. */
const inputClass = "field w-full min-h-12 border border-ink-3/60 bg-paper-2 px-3.5 py-2.5 text-ink";

/* Always rendered, always one line tall: the slot is reserved, the text is not. */
const errClass = "mt-1.5 min-h-5 text-xs font-medium text-destructive";

/** Label above the control, helper slot below it — never a placeholder standing in for a label. */
function Field({
  id,
  label,
  error,
  required,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  const control = isValidElement(children)
    ? cloneElement(children as React.ReactElement<Record<string, unknown>>, {
        "aria-invalid": error ? true : undefined,
        // Only while there is something to describe. The slot below is always
        // in the layout so the field never jumps, but pointing every clean
        // input at an empty node advertises a description that is not there.
        "aria-describedby": error ? `${id}-error` : undefined,
        "aria-required": required ? true : undefined,
        required: required || undefined,
      })
    : children;

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink-2">
        {label}
        {required && <span aria-hidden className="text-accent"> *</span>}
      </label>
      {control}
      <p id={`${id}-error`} className={errClass} role="alert">
        {error}
      </p>
    </div>
  );
}
