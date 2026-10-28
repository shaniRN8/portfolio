import { useEffect, useRef } from "react";

/**
 * Returns a ref whose current value is always the latest version of `value`,
 * avoiding stale closures in event handlers and GSAP callbacks.
 */
export function useLatest(value) {
  const ref = useRef(value);
  useEffect(() => {
    ref.current = value;
  });
  return ref;
}

/**
 * Returns true if the user has requested reduced motion via the OS setting.
 */
export function usePrefersReducedMotion() {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  return query.matches;
}
