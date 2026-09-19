"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  alt: string;
  /** Repeated inside the enlargement, where the page's own caption is out of view. */
  caption?: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
};

/**
 * A photograph as a soft plate: hover lifts it, press seats it, click opens
 * it in a native `<dialog>`, mounted only while open. Escape, the top layer,
 * the inert background and focus return are the platform's problem.
 */
export default function Photo({
  src,
  alt,
  caption,
  width = 900,
  height = 1125,
  className,
  priority = false,
}: Props) {
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);

  // State is the source of truth: `close` does not bubble and some engines
  // close the element without dispatching it, so every close path sets state.
  useEffect(() => {
    const el = dialog.current;
    if (!open || !el) return;

    const shut = () => setOpen(false);
    el.addEventListener("close", shut);
    el.addEventListener("cancel", shut);
    if (!el.open) el.showModal();

    return () => {
      el.removeEventListener("close", shut);
      el.removeEventListener("cancel", shut);
      if (el.open) el.close();
    };
  }, [open]);

  const show = () => {
    const el = dialog.current;
    if (el && !el.open) el.showModal();
    else setOpen(true);
  };

  return (
    <>
      <button type="button" onClick={show} aria-label={`Μεγέθυνση: ${alt}`} className={`photo ${className ?? ""}`}>
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
        />
      </button>

      {open && (
        <dialog
          ref={dialog}
          className="lightbox"
          aria-label={alt}
          onClick={(e) => {
            if (e.target === dialog.current) setOpen(false);
          }}
        >
          <img src={src} alt={alt} width={width} height={height} decoding="async" />

          <div className="flex items-center justify-between gap-4 border-t border-line px-4 py-2.5">
            <p className="text-xs uppercase tracking-[0.14em] text-ink-3">{caption ?? alt}</p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="press-sm min-h-11 shrink-0 text-sm font-semibold text-accent link-line-on link-line"
            >
              Κλείσιμο
            </button>
          </div>
        </dialog>
      )}
    </>
  );
}
