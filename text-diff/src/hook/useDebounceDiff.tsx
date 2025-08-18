import { useEffect, useState } from "react";
import diff from "../core/diff";

export function useDebouncedDiff(
  originalText: string,
  newText: string,
  delay: number = 100
) {
  const [diffResult, setDiffResult] = useState<ReturnType<typeof diff>>(() =>
    diff(originalText, newText)
  );

  useEffect(() => {
    const id = setTimeout(() => {
      setDiffResult(diff(originalText, newText));
    }, delay);
    return () => clearTimeout(id);
  }, [originalText, newText, delay]);

  return diffResult;
}
