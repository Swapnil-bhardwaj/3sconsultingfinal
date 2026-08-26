import { forwardRef } from "react";
import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { cn } from "../../utils/cn";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "outline-light";
type Size = "md" | "lg" | "sm";

const base =
  "group/btn inline-flex items-center justify-center gap-2 font-semibold tracking-tight transition-all duration-300 rounded-full whitespace-nowrap select-none disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary: "bg-teal-800 text-white hover:bg-teal-900 shadow-soft hover:shadow-lift",
  secondary: "bg-transparent text-ink-900 border border-ink-300 hover:border-teal-700 hover:text-teal-800",
  outline: "bg-transparent text-ink-900 border border-ink-300 hover:border-teal-700 hover:text-teal-800",
  ghost: "bg-transparent text-teal-800 hover:bg-teal-50",
  "outline-light": "bg-transparent text-white border border-white/40 hover:border-white hover:bg-white/10",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-6 text-[15px]",
  lg: "h-14 px-8 text-base",
};

type Props = {
  variant?: Variant;
  size?: Size;
  withArrow?: boolean;
  className?: string;
  children: ReactNode;
  to?: string;
  href?: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement> & AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "href">;

const Button = forwardRef<HTMLElement, Props>(
  ({ variant = "primary", size = "md", withArrow = false, className, children, to, href, ...rest }, ref) => {
    const classes = cn(base, variants[variant], sizes[size], className);
    const content = (
      <>
        <span>{children}</span>
        {withArrow && (
          <ArrowRight
            className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1"
            aria-hidden="true"
          />
        )}
      </>
    );

    if (to) {
      return (
        <Link to={to} className={classes} ref={ref as React.Ref<HTMLAnchorElement>}>
          {content}
        </Link>
      );
    }

    if (href) {
      return (
        <a
          href={href}
          className={classes}
          ref={ref as React.Ref<HTMLAnchorElement>}
          {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {content}
        </a>
      );
    }

    return (
      <button
        className={classes}
        ref={ref as React.Ref<HTMLButtonElement>}
        {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
