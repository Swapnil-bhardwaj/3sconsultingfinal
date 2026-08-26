import { cn } from "../../utils/cn";

export default function Badge({
  children,
  tone = "teal",
  className,
}: {
  children: React.ReactNode;
  tone?: "teal" | "green" | "neutral";
  className?: string;
}) {
  const tones = {
    teal: "bg-teal-50 text-teal-800 border-teal-200",
    green: "bg-green-50 text-green-800 border-green-200",
    neutral: "bg-ink-100 text-ink-700 border-ink-200",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold tracking-wide uppercase",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
