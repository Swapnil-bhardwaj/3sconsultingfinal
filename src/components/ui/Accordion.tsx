import { useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "../../utils/cn";

export default function Accordion({ items }: { items: { question: string; answer: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-ink-200 border-y border-ink-200">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.question}>
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
                className="flex w-full items-center justify-between gap-4 py-5 text-left"
              >
                <span className="text-[15.5px] font-semibold text-ink-950">{item.question}</span>
                <Plus
                  className={cn("h-5 w-5 shrink-0 text-teal-700 transition-transform duration-300", isOpen && "rotate-45")}
                  aria-hidden="true"
                />
              </button>
            </h3>
            <div
              id={`faq-panel-${i}`}
              role="region"
              className={cn("grid transition-all duration-300 ease-out", isOpen ? "grid-rows-[1fr] pb-5 opacity-100" : "grid-rows-[0fr] opacity-0")}
              style={{ overflow: "hidden" }}
            >
              <div className="min-h-0">
                <p className="max-w-2xl text-[15px] leading-relaxed text-ink-600">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
