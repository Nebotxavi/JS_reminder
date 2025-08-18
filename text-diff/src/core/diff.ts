export interface TokenDiff {
  type: "removed" | "equal" | "added";
  token: string;
}

interface DiffResult {
  originalDiff: TokenDiff[];
  newDiff: TokenDiff[];
}

const tokenize = (s: string): string[] =>
  s.trim().length ? s.trim().split(/\s+/) : [];

/**
 * Produces a minimal edit script via LCS DP and then maps it to DiffResult.
 * Complexity: O(n*m) time, O(n*m) space.
 */
function diff(originalText: string, newText: string): DiffResult {
  const A = tokenize(originalText);
  const B = tokenize(newText);
  const n = A.length;
  const m = B.length;

  // LCS length table dp[i][j] = LCS length of A[i:] and B[j:]
  const dp: number[][] = Array.from({ length: n + 1 }, () =>
    new Array(m + 1).fill(0)
  );

  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      dp[i][j] =
        A[i] === B[j]
          ? dp[i + 1][j + 1] + 1
          : Math.max(dp[i + 1][j], dp[i][j + 1]);
    }
  }

  // Backtrack to build edit script
  type Op =
    | { kind: "equal"; token: string }
    | { kind: "removed"; token: string }
    | { kind: "added"; token: string };

  const ops: Op[] = [];
  let i = 0,
    j = 0;

  while (i < n && j < m) {
    if (A[i] === B[j]) {
      ops.push({ kind: "equal", token: A[i] });
      i++;
      j++;
    } else if (dp[i + 1][j] >= dp[i][j + 1]) {
      ops.push({ kind: "removed", token: A[i] });
      i++;
    } else {
      ops.push({ kind: "added", token: B[j] });
      j++;
    }
  }
  while (i < n) {
    ops.push({ kind: "removed", token: A[i++] });
  }
  while (j < m) {
    ops.push({ kind: "added", token: B[j++] });
  }

  // Map into TokenDiff for both outputs
  const originalDiff: TokenDiff[] = [];
  const newDiff: TokenDiff[] = [];

  for (const op of ops) {
    if (op.kind === "equal") {
      originalDiff.push({ type: "equal", token: op.token });
      newDiff.push({ type: "equal", token: op.token });
    } else if (op.kind === "removed") {
      originalDiff.push({ type: "removed", token: op.token });
      // not present in newDiff
    } else {
      // added
      newDiff.push({ type: "added", token: op.token });
      // not present in originalDiff
    }
  }

  return { originalDiff, newDiff };
}

export default diff;
