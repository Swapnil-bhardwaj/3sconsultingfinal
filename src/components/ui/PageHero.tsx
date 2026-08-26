import type { ReactNode } from "react";
import Container from "./Container";
import { cn } from "../../utils/cn";

export default function PageHero({
  eyebrow,
  title,
  description,
  children,
  className,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("border-b border-ink-200 bg-teal-950 py-20 lg:py-28", className)}>
      <Container>
        <p className="mb-4 text-sm font-bold uppercase tracking-[0.16em] text-teal-300">{eyebrow}</p>
        <h1 className="max-w-3xl text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-200">{description}</p>
        )}
        {children}
      </Container>
    </section>
  );
}
