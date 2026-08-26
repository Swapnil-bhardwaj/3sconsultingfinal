import { cn } from "../../utils/cn";

export default function Logo({
  light = false,
  className,
  showTagline = false,
}: {
  light?: boolean;
  className?: string;
  showTagline?: boolean;
}) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <img
        src="/images/logo.png"
        alt="3Sconsulting"
        className="h-10 w-10 sm:h-11 sm:w-11 shrink-0 rounded-full object-contain drop-shadow-xs transition-transform duration-200 hover:scale-105"
      />
      <div className="flex flex-col">
        <span
          className={cn(
            "font-bold tracking-tight text-[19px] leading-tight",
            light ? "text-white" : "text-ink-950"
          )}
        >
          3S<span className={light ? "text-teal-300" : "text-teal-700"}>consulting</span>
        </span>
        {showTagline ? (
          <span
            className={cn(
              "text-[10px] font-medium tracking-wide uppercase",
              light ? "text-ink-300" : "text-ink-500"
            )}
          >
            Safety · Security · Sustainability
          </span>
        ) : null}
      </div>
    </div>
  );
}
