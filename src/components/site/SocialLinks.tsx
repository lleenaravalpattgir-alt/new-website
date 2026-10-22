import type { ReactNode } from "react";
import { Linkedin, Instagram } from "lucide-react";

export function XIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function PinterestIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.668.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z" />
    </svg>
  );
}

export interface SocialLinkItem {
  id: string;
  name: string;
  href: string;
  displayUrl: string;
  handle: string;
  icon: (props: { className?: string }) => ReactNode;
}

export const OFFICIAL_SOCIAL_LINKS: SocialLinkItem[] = [
  {
    id: "linkedin",
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/ryzeadvisoryofficial/",
    displayUrl: "linkedin.com/company/ryzeadvisoryofficial",
    handle: "ryzeadvisoryofficial",
    icon: ({ className = "h-4 w-4" }) => <Linkedin className={className} />,
  },
  {
    id: "x",
    name: "X (Twitter)",
    href: "https://x.com/RyzeAdvisoryHQ",
    displayUrl: "x.com/RyzeAdvisoryHQ",
    handle: "@RyzeAdvisoryHQ",
    icon: ({ className = "h-4 w-4" }) => <XIcon className={className} />,
  },
  {
    id: "instagram",
    name: "Instagram",
    href: "https://www.instagram.com/ryzeadvisory",
    displayUrl: "instagram.com/ryzeadvisory",
    handle: "@ryzeadvisory",
    icon: ({ className = "h-4 w-4" }) => <Instagram className={className} />,
  },
  {
    id: "pinterest",
    name: "Pinterest",
    href: "https://in.pinterest.com/lleenaravalpattgir2/",
    displayUrl: "pinterest.com/lleenaravalpattgir2",
    handle: "lleenaravalpattgir2",
    icon: ({ className = "h-4 w-4" }) => <PinterestIcon className={className} />,
  },
];

interface SocialLinksProps {
  variant?: "footer-icons" | "footer-list" | "badges" | "horizontal";
  className?: string;
  showLabels?: boolean;
}

export function SocialLinks({
  variant = "footer-icons",
  className = "",
  showLabels = false,
}: SocialLinksProps) {
  if (variant === "footer-list") {
    return (
      <div className={`space-y-2 ${className}`}>
        {OFFICIAL_SOCIAL_LINKS.map((item) => {
          const IconComp = item.icon;
          return (
            <div key={item.id} className="flex items-center gap-2">
              <span className="text-[#D4A238] shrink-0">
                <IconComp className="h-4 w-4" />
              </span>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#D4A238] transition-colors truncate text-xs text-[#D1D7DF]/85 hover:underline"
                aria-label={`Rise Advisory on ${item.name}`}
              >
                {item.displayUrl}
              </a>
            </div>
          );
        })}
      </div>
    );
  }

  if (variant === "badges") {
    return (
      <div className={`flex flex-wrap items-center gap-2.5 ${className}`}>
        {OFFICIAL_SOCIAL_LINKS.map((item) => {
          const IconComp = item.icon;
          return (
            <a
              key={item.id}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-[#EEF4FA] border border-[#E2E8F0] px-3.5 py-2 text-xs font-semibold text-[#0F1E2F] hover:border-[#D4A238] hover:text-[#B8860B] hover:bg-white shadow-xs transition-all"
              aria-label={`Rise Advisory on ${item.name}`}
            >
              <IconComp className="h-4 w-4 text-[#0B1F3B]" />
              <span>{item.name}</span>
            </a>
          );
        })}
      </div>
    );
  }

  // Default: interactive icon buttons (useful in footers and headers)
  return (
    <div className={`flex items-center gap-2.5 ${className}`} role="list" aria-label="Social media channels">
      {OFFICIAL_SOCIAL_LINKS.map((item) => {
        const IconComp = item.icon;
        return (
          <a
            key={item.id}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Rise Advisory on ${item.name}`}
            title={`Rise Advisory on ${item.name}`}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#132F55] border border-[#E2E8F0]/15 text-[#EEF4FA] transition-all hover:bg-[#D4A238] hover:text-[#0B1F3B] hover:border-[#D4A238] shadow-xs group"
          >
            <IconComp className="h-4 w-4 transition-transform duration-150 group-hover:scale-110" />
            {showLabels && <span className="sr-only">{item.name}</span>}
          </a>
        );
      })}
    </div>
  );
}
