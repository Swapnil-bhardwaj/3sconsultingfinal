import React from "react";

interface RichBlogContentProps {
  content: string;
}

export default function RichBlogContent({ content }: RichBlogContentProps) {
  if (!content) return null;

  // Split content by lines to parse blocks cleanly
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let currentList: string[] = [];
  let isNumberedList = false;
  let blockIndex = 0;

  const flushList = () => {
    if (currentList.length > 0) {
      if (isNumberedList) {
        elements.push(
          <ol key={`ol-${blockIndex++}`} className="my-5 ml-6 list-decimal space-y-2.5 text-[16.5px] leading-relaxed text-ink-800">
            {currentList.map((item, i) => (
              <li key={i} dangerouslySetInnerHTML={{ __html: formatInline(item) }} />
            ))}
          </ol>
        );
      } else {
        elements.push(
          <ul key={`ul-${blockIndex++}`} className="my-5 ml-6 list-disc space-y-2.5 text-[16.5px] leading-relaxed text-ink-800">
            {currentList.map((item, i) => (
              <li key={i} dangerouslySetInnerHTML={{ __html: formatInline(item) }} />
            ))}
          </ul>
        );
      }
      currentList = [];
      isNumberedList = false;
    }
  };

  const formatInline = (text: string): string => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-ink-950">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic text-ink-900">$1</em>')
      .replace(/`([^`]+)`/g, '<code class="rounded bg-teal-50 px-1.5 py-0.5 font-mono text-xs font-semibold text-teal-800">$1</code>');
  };

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();

    if (!trimmed) {
      flushList();
      continue;
    }

    // Heading 2 (## )
    if (trimmed.startsWith("## ")) {
      flushList();
      const text = trimmed.replace(/^##\s+/, "");
      elements.push(
        <div key={`h2-${blockIndex++}`} className="mt-12 mb-5 border-b border-ink-200 pb-3">
          <h2 className="text-2xl font-bold tracking-tight text-ink-950 sm:text-3xl">
            {text}
          </h2>
        </div>
      );
      continue;
    }

    // Heading 3 (### )
    if (trimmed.startsWith("### ")) {
      flushList();
      const text = trimmed.replace(/^###\s+/, "");
      elements.push(
        <h3 key={`h3-${blockIndex++}`} className="mt-8 mb-3 text-xl font-bold tracking-tight text-teal-950">
          {text}
        </h3>
      );
      continue;
    }

    // Blockquote (> )
    if (trimmed.startsWith("> ")) {
      flushList();
      const quoteText = trimmed.replace(/^>\s+/, "");
      elements.push(
        <blockquote
          key={`quote-${blockIndex++}`}
          className="my-6 rounded-r-2xl border-l-4 border-teal-700 bg-teal-50/70 p-5 italic text-ink-800 text-[16.5px] leading-relaxed shadow-xs"
          dangerouslySetInnerHTML={{ __html: formatInline(quoteText) }}
        />
      );
      continue;
    }

    // Unordered List items (- or *)
    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      if (isNumberedList) flushList();
      isNumberedList = false;
      currentList.push(trimmed.replace(/^[-*]\s+/, ""));
      continue;
    }

    // Numbered List items (1. 2. etc)
    const numMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);
    if (numMatch) {
      if (!isNumberedList && currentList.length > 0) flushList();
      isNumberedList = true;
      currentList.push(numMatch[2]);
      continue;
    }

    // Regular paragraph
    flushList();
    elements.push(
      <p
        key={`p-${blockIndex++}`}
        className="mb-5 text-[16.5px] leading-[1.85] text-ink-800"
        dangerouslySetInnerHTML={{ __html: formatInline(trimmed) }}
      />
    );
  }

  flushList();

  return <div className="rich-blog-content">{elements}</div>;
}
