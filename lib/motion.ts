/**
 * The two questions any interaction has to ask before it moves anything.
 *
 * Both are functions, not constants, because both answers change while the
 * page is open: a visitor can switch the OS reduced-motion setting, and a
 * tablet can have a stylus attached mid-session.
 */

/** Honour the OS setting everywhere instead of re-checking in each component. */
export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** A mouse or trackpad. False on touch, where hover does not exist at all. */
export const isFinePointer = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(hover: hover) and (pointer: fine)").matches;
