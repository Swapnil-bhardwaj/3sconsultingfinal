import { cn } from "../../utils/cn";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  light = false,
  className,
  titleClassName,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
  titleClassName?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "mb-3 text-sm font-semibold tracking-[0.14em] uppercase",
            light ? "text-teal-300" : "text-teal-700"
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "text-3xl sm:text-4xl font-bold tracking-tight leading-[1.12]",
          light ? "text-white" : "text-ink-950",
          titleClassName
        )}
      >
        {title}
      </h2>
      {description && (
        <p className={cn("mt-4 text-base sm:text-lg leading-relaxed", light ? "text-ink-200" : "text-ink-600")}>
          {description}
        </p>
      )}
    </div>
  );
}
