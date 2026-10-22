import { Link } from "@tanstack/react-router";
import logoImg from "@/assets/logo.png";
import logoWhiteImg from "@/assets/logo-white.png";

interface LogoProps {
  className?: string;
  imgClassName?: string;
  variant?: "header" | "footer" | "standalone";
}

export function Logo({ variant = "header", className = "", imgClassName = "" }: LogoProps) {
  const isDark = variant === "footer";

  return (
    <Link
      to="/"
      className={`inline-flex items-center justify-center shrink-0 cursor-pointer transition-opacity hover:opacity-95 focus-visible:outline-none ${className}`}
      aria-label="Rise Advisory home"
      title="Rise Advisory — Return to Homepage"
    >
      <img
        src={isDark ? logoWhiteImg : logoImg}
        alt="Rise Advisory"
        className={`w-auto object-contain transition-transform duration-200 hover:scale-[1.02] ${
          imgClassName || (variant === "footer" ? "h-11 sm:h-12" : "h-9 sm:h-10 xl:h-[42px]")
        }`}
      />
    </Link>
  );
}
