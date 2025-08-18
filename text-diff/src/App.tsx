import { useState, type JSX, type ReactNode, useMemo } from "react";
import { type TokenDiff } from "./core/diff";
import "./App.css";
import { useDebouncedDiff } from "./hook/useDebounceDiff";

type HtmlTag = keyof JSX.IntrinsicElements;

// Groups consecutive tokens of the same type into a single segment
const groupTokenDiff = (tokens: TokenDiff[]) => {
  const groups: { type: TokenDiff["type"]; text: string[] }[] = [];
  for (const t of tokens) {
    const last = groups[groups.length - 1];
    if (last && last.type === t.type) {
      last.text.push(t.token);
    } else {
      groups.push({ type: t.type, text: [t.token] });
    }
  }
  return groups;
};

const tokenDiffToHTML = (tokenDiff: TokenDiff[]): ReactNode[] => {
  const htmlTagMap: Record<"removed" | "added", HtmlTag> = {
    removed: "del",
    added: "ins",
  };

  const grouped = groupTokenDiff(tokenDiff);

  const nodes: ReactNode[] = [];
  grouped.forEach((group, ind) => {
    if (group.type === "equal") {
      nodes.push(
        <span key={`text-${group.type}-${ind}`}>
          {group.text.join(" ") + " "}
        </span>
      );
    } else {
      const Tag = htmlTagMap[group.type] as HtmlTag;
      nodes.push(
        <Tag
          key={`text-${group.type}-${ind}`}
          className={`text--${group.type}`}
        >
          {group.text.join(" ") + " "}
        </Tag>
      );
    }
  });
  return nodes;
};

function App() {
  const [original, setOriginal] = useState("This is just an example.");
  const [newText, setNewText] = useState("This will be an example.");

  return (
    <>
      <header>
        <h1>Text diff</h1>
      </header>
      <main className="main">
        <section className="text__inputs">
          <div className="text__input">
            <label
              className="text__input--label"
              htmlFor="text__input--original"
            >
              Original
            </label>
            <textarea
              id="text__input--original"
              className="text__input--textarea"
              value={original}
              onChange={(e) => setOriginal(e.target.value)}
            />
          </div>
          <div className="text__input">
            <label className="text__input--label" htmlFor="text__input--new">
              New
            </label>
            <textarea
              id="text__input--new"
              className="text__input--textarea"
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
            />
          </div>
        </section>
        <TextDiff originalText={original} newText={newText} />
      </main>
    </>
  );
}

function TextDiff({
  originalText,
  newText,
}: {
  originalText: string;
  newText: string;
}) {
  const diffResult = useDebouncedDiff(originalText, newText);

  const originalDiffText = useMemo(
    () => tokenDiffToHTML(diffResult.originalDiff),
    [diffResult.originalDiff]
  );
  const newDiffText = useMemo(
    () => tokenDiffToHTML(diffResult.newDiff),
    [diffResult.newDiff]
  );

  return (
    <section className="text__outputs">
      <div className="text__output">
        <h2 className="text__output--label">Original diff</h2>
        <p
          id="text__output--original-diff"
          className="text__output--diff"
          data-testid="original-diff"
        >
          {originalDiffText}
        </p>
      </div>
      <div className="text__output">
        <h2 className="text__output--label">New diff</h2>
        <p
          id="text__output--new-diff"
          className="text__output--diff"
          data-testid="new-diff"
        >
          {newDiffText}
        </p>
      </div>
    </section>
  );
}

export default App;
