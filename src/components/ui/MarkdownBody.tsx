import { Fragment } from "react";

/**
 * Minimal markdown renderer for guide contentBody.
 * Handles: ## headings, **bold**, `inline code`, ``` code blocks,
 * - list items, blank-line paragraphs.
 */
export function MarkdownBody({ content }: { content: string }) {
  const blocks = parseBlocks(content);

  return (
    <div className="prose-torvi">
      {blocks.map((block, i) => {
        if (block.type === "h2") {
          return (
            <h2 key={i} className="text-base font-semibold text-[#16181D] mt-8 mb-3 tracking-tight">
              {block.text}
            </h2>
          );
        }
        if (block.type === "h3") {
          return (
            <h3 key={i} className="text-sm font-semibold text-[#23262D] mt-6 mb-2">
              {block.text}
            </h3>
          );
        }
        if (block.type === "code") {
          return (
            <pre key={i} className="bg-[#F7F8FA] border border-[#EEF1F4] rounded-lg p-4 text-xs text-[#23262D] overflow-x-auto my-4 font-mono leading-relaxed">
              {block.text}
            </pre>
          );
        }
        if (block.type === "list") {
          return (
            <ul key={i} className="my-3 space-y-1.5 pl-0">
              {block.items!.map((item, j) => (
                <li key={j} className="flex gap-2.5 text-sm text-[#4A4F59] leading-relaxed">
                  <span className="mt-[0.4em] flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#C8CDD5]" />
                  <span>{renderInline(item)}</span>
                </li>
              ))}
            </ul>
          );
        }
        if (block.type === "numlist") {
          return (
            <ol key={i} className="my-3 space-y-1.5 pl-0 counter-reset-list">
              {block.items!.map((item, j) => (
                <li key={j} className="flex gap-3 text-sm text-[#4A4F59] leading-relaxed">
                  <span className="flex-shrink-0 text-xs font-semibold text-[#7B8391] w-4 text-right mt-[0.2em]">
                    {j + 1}.
                  </span>
                  <span>{renderInline(item)}</span>
                </li>
              ))}
            </ol>
          );
        }
        if (block.type === "blockquote") {
          return (
            <blockquote key={i} className="border-l-2 border-[#DDE1E7] pl-4 my-4 text-sm text-[#4A4F59] italic leading-relaxed">
              {renderInline(block.text!)}
            </blockquote>
          );
        }
        // paragraph
        return (
          <p key={i} className="text-sm text-[#4A4F59] leading-[1.75] my-3">
            {renderInline(block.text!)}
          </p>
        );
      })}
    </div>
  );
}

// ─── Inline rendering ────────────────────────────────────────────────────────

function renderInline(text: string) {
  // Split on **bold**, `code`, and newlines
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return (
    <Fragment>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={i} className="font-semibold text-[#16181D]">{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith("`") && part.endsWith("`")) {
          return <code key={i} className="font-mono text-xs bg-[#EEF1F4] px-1.5 py-0.5 rounded text-[#23262D]">{part.slice(1, -1)}</code>;
        }
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </Fragment>
  );
}

// ─── Block parser ─────────────────────────────────────────────────────────────

type Block =
  | { type: "h2" | "h3" | "paragraph" | "code" | "blockquote"; text: string; items?: never }
  | { type: "list" | "numlist"; items: string[]; text?: never };

function parseBlocks(content: string): Block[] {
  const lines = content.split("\n");
  const blocks: Block[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Fenced code block
    if (line.startsWith("```")) {
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      blocks.push({ type: "code", text: codeLines.join("\n") });
      i++;
      continue;
    }

    // Headings
    if (line.startsWith("## ")) {
      blocks.push({ type: "h2", text: line.slice(3) });
      i++;
      continue;
    }
    if (line.startsWith("### ")) {
      blocks.push({ type: "h3", text: line.slice(4) });
      i++;
      continue;
    }

    // Blockquote
    if (line.startsWith("> ")) {
      blocks.push({ type: "blockquote", text: line.slice(2) });
      i++;
      continue;
    }

    // Unordered list — collect consecutive items
    if (line.startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length && lines[i].startsWith("- ")) {
        items.push(lines[i].slice(2));
        i++;
      }
      blocks.push({ type: "list", items });
      continue;
    }

    // Numbered list — collect consecutive items
    if (/^\d+\.\s/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\.\s/, ""));
        i++;
      }
      blocks.push({ type: "numlist", items });
      continue;
    }

    // Blank line — skip
    if (line.trim() === "") {
      i++;
      continue;
    }

    // Paragraph — collect until blank line or special block
    const paraLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !lines[i].startsWith("## ") &&
      !lines[i].startsWith("### ") &&
      !lines[i].startsWith("- ") &&
      !lines[i].startsWith("```") &&
      !lines[i].startsWith("> ") &&
      !/^\d+\.\s/.test(lines[i])
    ) {
      paraLines.push(lines[i]);
      i++;
    }
    if (paraLines.length > 0) {
      blocks.push({ type: "paragraph", text: paraLines.join(" ") });
    }
  }

  return blocks;
}
