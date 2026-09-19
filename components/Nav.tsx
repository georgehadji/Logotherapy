"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav, therapist } from "@/lib/site";
import { MarkIcon, PhoneIcon } from "./Icon";

/**
 * N5 floating pill. A rounded bar detached from the page edges, with a blur
 * backdrop, that stays with the reader: the phone number is one tap away on
 * every scroll position without a second fixed element on desktop. Below `lg`
 * the link row folds into a full-screen panel behind a "Μενού" button.
 */
export default function Nav() {
  const [menu, setMenu] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  useEffect(() => setMenu(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";

    // Everything behind the panel goes inert while it is open, so tabbing past
    // the last link never lands focus somewhere the reader cannot see.
    const behind = [document.getElementById("main"), document.querySelector("footer")].filter(
      Boolean
    ) as HTMLElement[];
    behind.forEach((el) => el.toggleAttribute("inert", menu));

    if (!menu) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenu(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = "";
      behind.forEach((el) => el.removeAttribute("inert"));
      document.removeEventListener("keydown", onKey);
    };
  }, [menu]);

  return (
    <>
      {/* Sticky, not fixed: it occupies its own row at the top so nothing hides under it. */}
      <header className="sticky top-0 z-[var(--z-nav)] px-3 pt-3 [view-transition-name:nav] md:px-4 md:pt-4">
        {/*
         * 60rem, not 52: the wordmark, six Greek labels and the phone pill
         * measure 886px, and three nowrap flex children cannot shrink below
         * their content, so a 52rem cap did not compress them — it let the
         * phone pill hang 70px outside the bar's own rounded border, on every
         * page. The bar has to be able to hold what it carries.
         */}
        <div className="mx-auto flex w-full max-w-[60rem] items-center justify-between gap-3 rounded-full border border-line bg-paper-2/85 py-1.5 pl-4 pr-1.5 shadow-[var(--shadow-pill)] backdrop-blur-md backdrop-saturate-150">
          <Link
            href="/"
            className="flex min-h-11 items-center gap-2 whitespace-nowrap font-semibold tracking-[-0.01em] text-ink"
          >
            <MarkIcon className="size-6 shrink-0" />
            {/* Below 26rem the mark alone is the wordmark; sr-only keeps the accessible name. */}
            <span className="max-[26rem]:sr-only">{therapist.brand}</span>
          </Link>

          <nav aria-label="Κύριο μενού" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {nav.map((item) => {
                const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`inline-flex min-h-10 items-center whitespace-nowrap rounded-full px-2.5 text-sm font-medium transition-colors t-quick ${
                        active ? "bg-blush text-accent" : "text-ink-2 hover:bg-paper hover:text-ink"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-1.5">
            <a
              href={`tel:${therapist.phone}`}
              // 44px, not 40: on a phone this pill and the menu button beside
              // it are the whole of the navigation, and they are the one
              // control a parent reaches for. The desktop link row stays at 40
              // — it is a mouse target, not a thumb target.
              className="pill min-h-11 px-4 text-sm max-sm:px-3"
              aria-label={`Καλέστε ${therapist.phoneDisplay}`}
            >
              <PhoneIcon className="size-4" />
              <span className="max-sm:hidden">{therapist.phoneDisplay}</span>
            </a>
            <button
              ref={toggleRef}
              onClick={() => setMenu((v) => !v)}
              aria-expanded={menu}
              aria-controls="mobile-menu"
              className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full px-3 text-sm font-medium text-ink lg:hidden"
            >
              <span className="relative block h-3 w-4" aria-hidden>
                <span
                  className={`absolute left-0 h-px w-full bg-ink transition-transform t-base ${menu ? "top-1.5 rotate-45" : "top-0"}`}
                />
                <span
                  className={`absolute left-0 h-px w-full bg-ink transition-transform t-base ${menu ? "top-1.5 -rotate-45" : "top-3"}`}
                />
              </span>
              {menu ? "Κλείσιμο" : "Μενού"}
            </button>
          </div>
        </div>
      </header>

      {/* Phone / tablet panel */}
      <div
        id="mobile-menu"
        aria-hidden={!menu}
        inert={!menu}
        className={`fixed inset-0 z-[var(--z-overlay)] flex flex-col justify-center bg-paper px-[clamp(1.5rem,6vw,5rem)] pb-20 pt-28 transition-[opacity,visibility] t-slow lg:hidden ${
          menu ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <nav aria-label="Μενού">
          <ul className="space-y-1">
            {nav.map((item, i) => (
              <li key={item.href} className="overflow-hidden">
                <Link
                  href={item.href}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className="display block py-2 text-[clamp(1.9rem,8vw,3rem)] transition-transform t-slow aria-[current=page]:text-accent"
                  style={{
                    transform: menu ? "translateY(0)" : "translateY(110%)",
                    transitionDelay: `${menu ? 120 + i * 60 : 0}ms`,
                  }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <p className="mt-10 text-sm text-ink-2">
          {therapist.title} · Νέα Μηχανιώνα
          <br />
          <a href={`tel:${therapist.phone}`} className="mt-1 inline-flex min-h-11 items-center font-semibold text-accent">
            {therapist.phoneDisplay}
          </a>
        </p>
      </div>
    </>
  );
}
