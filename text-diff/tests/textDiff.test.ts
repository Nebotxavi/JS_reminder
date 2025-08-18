import diff from "../src/core/diff";

describe("TextDiff", () => {
  it("should return equal tokens given equal text", () => {
    const originalText = "a b c";
    const newText = "a b c";
    const result = diff(originalText, newText);

    expect(result).toEqual({
      originalDiff: [
        { type: "equal", token: "a" },
        { type: "equal", token: "b" },
        { type: "equal", token: "c" },
      ],
      newDiff: [
        { type: "equal", token: "a" },
        { type: "equal", token: "b" },
        { type: "equal", token: "c" },
      ],
    });
  });

  it("should return equal tokens for those in the same position (case: position 0)", () => {
    const originalText = "a b c";
    const newText = "a d e";
    const result = diff(originalText, newText);

    expect(result).toEqual({
      originalDiff: [
        { type: "equal", token: "a" },
        { type: "removed", token: "b" },
        { type: "removed", token: "c" },
      ],
      newDiff: [
        { type: "equal", token: "a" },
        { type: "added", token: "d" },
        { type: "added", token: "e" },
      ],
    });
  });

  it("should return equal tokens for those in the same position (case: random position)", () => {
    const originalText = "a b c";
    const newText = "d b e";
    const result = diff(originalText, newText);

    expect(result).toEqual({
      originalDiff: [
        { type: "removed", token: "a" },
        { type: "equal", token: "b" },
        { type: "removed", token: "c" },
      ],
      newDiff: [
        { type: "added", token: "d" },
        { type: "equal", token: "b" },
        { type: "added", token: "e" },
      ],
    });
  });

  it("should return equal tokens for those that appear in the same relative order", () => {
    const originalText = "a b c";
    const newText = "c a e b";
    const result = diff(originalText, newText);

    expect(result).toEqual({
      originalDiff: [
        { type: "equal", token: "a" },
        { type: "equal", token: "b" },
        { type: "removed", token: "c" },
      ],
      newDiff: [
        { type: "added", token: "c" },
        { type: "equal", token: "a" },
        { type: "added", token: "e" },
        { type: "equal", token: "b" },
      ],
    });
  });

  it("should return added/removed for those that appearn in different relative order", () => {
    const originalText = "a b c";
    const newText = "c b a";
    const result = diff(originalText, newText);

    expect(result).toEqual({
      originalDiff: [
        { type: "removed", token: "a" },
        { type: "removed", token: "b" },
        { type: "equal", token: "c" },
      ],
      newDiff: [
        { type: "equal", token: "c" },
        { type: "added", token: "b" },
        { type: "added", token: "a" },
      ],
    });
  });

  it("should return removed/added tokens for those that are not present", () => {
    const originalText = "a b c";
    const newText = "d b f";
    const result = diff(originalText, newText);

    expect(result).toEqual({
      originalDiff: [
        { type: "removed", token: "a" },
        { type: "equal", token: "b" },
        { type: "removed", token: "c" },
      ],
      newDiff: [
        { type: "added", token: "d" },
        { type: "equal", token: "b" },
        { type: "added", token: "f" },
      ],
    });
  });

  it("should return equal for those in a sequence that matches in both texts for at least two tokens", () => {
    const originalText = "a b c";
    const newText = "d b c z";
    const result = diff(originalText, newText);

    expect(result).toEqual({
      originalDiff: [
        { type: "removed", token: "a" },
        { type: "equal", token: "b" },
        { type: "equal", token: "c" },
      ],
      newDiff: [
        { type: "added", token: "d" },
        { type: "equal", token: "b" },
        { type: "equal", token: "c" },
        { type: "added", token: "z" },
      ],
    });
  });

  it("should return equal for the last token if matches in both cases although not in the the same position", () => {
    const originalText = "a b c z";
    const newText = "d e z";
    const result = diff(originalText, newText);

    expect(result).toEqual({
      originalDiff: [
        { type: "removed", token: "a" },
        { type: "removed", token: "b" },
        { type: "removed", token: "c" },
        { type: "equal", token: "z" },
      ],
      newDiff: [
        { type: "added", token: "d" },
        { type: "added", token: "e" },
        { type: "equal", token: "z" },
      ],
    });
  });

  // Edge cases
  it("should return added/removed for repeated sequences in only one text", () => {
    const originalText = "a b c d";
    const newText = "z b c y b c";
    const result = diff(originalText, newText);

    expect(result).toEqual({
      originalDiff: [
        { type: "removed", token: "a" },
        { type: "equal", token: "b" },
        { type: "equal", token: "c" },
        { type: "removed", token: "d" },
      ],
      newDiff: [
        { type: "added", token: "z" },
        { type: "equal", token: "b" },
        { type: "equal", token: "c" },
        { type: "added", token: "y" },
        { type: "added", token: "b" },
        { type: "added", token: "c" },
      ],
    });
  });
});
