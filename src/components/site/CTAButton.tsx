import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { track } from "@/lib/track";

interface Props {
  label?: string;
  variant?: "primary" | "gold" | "ghost";
  className?: string;
  to?: string;
  search?: Record<string, string>;
  trackEvent?: string;
  trackParams?: Record<string, unknown>;
}

export function CTAButton({
  label = "Book Your AI Strategy Call",
  variant = "primary",
  className,
  to = "/contact",
  search,
  trackEvent,
  trackParams,
}: Props) {
  const base =
    "group inline-flex items-center gap-2 rounded-md px-6 py-3.5 text-sm font-semibold tracking-wide uppercase transition-all duration-300 border-2";
  const styles = {
    primary:
      "bg-primary text-primary-foreground border-primary hover:bg-accent hover:text-accent-foreground hover:border-accent shadow-elegant",
    gold:
      "bg-accent text-accent-foreground border-accent hover:bg-primary hover:text-primary-foreground hover:border-primary shadow-gold",
    ghost:
      "bg-transparent text-primary border-primary/20 hover:border-accent hover:text-accent",
  }[variant];

  const handleClick = () => {
    if (trackEvent) track(trackEvent, { label, to, ...(trackParams ?? {}) });
    else track("cta_click", { label, to, ...(trackParams ?? {}) });
  };

  return (
    <Link
      to={to}
      search={search as never}
      onClick={handleClick}
      className={cn(base, styles, className)}
    >
      {label}
      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </Link>
  );
}
