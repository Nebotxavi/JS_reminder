import { useEffect, useRef, useState } from "react";

/**
 * Show a spinner only if `loading` lasts longer than `delay`.
 * Once shown, keep it visible for at least `minDuration` to avoid flicker.
 */
export const useSpinDelay = (
  loading: boolean,
  delay: number = 200,
  minDuration: number = 200
) => {
  const [showSpinner, setShowSpinner] = useState(false);
  const hasStartedRef = useRef<boolean>(false);

  useEffect(() => {
    let timeoutId: number;
    let closeTimeoutId: number;
    if (loading) {
      hasStartedRef.current = true;
      timeoutId = setTimeout(() => setShowSpinner(true), delay);
    }
    if (!loading && !hasStartedRef.current) setShowSpinner(false);
    if (!loading && hasStartedRef.current) {
      closeTimeoutId = setTimeout(() => setShowSpinner(false), minDuration);
      hasStartedRef.current = false;
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (closeTimeoutId) clearTimeout(closeTimeoutId);
    };
  }, [loading, hasStartedRef.current]);

  return showSpinner;
};
