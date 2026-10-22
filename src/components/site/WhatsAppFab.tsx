import { MessageCircle, Phone } from "lucide-react";
import { track } from "@/lib/track";

const DEFAULT_WHATSAPP = "919313967971";
const DEFAULT_PHONE = "+919313967971";
const DEFAULT_WA_TEXT = "Hello Rise Advisory, I would like to discuss fractional leadership and business growth support. Please let me know the next steps.";

export function getWhatsAppUrl(customText?: string, customNumber?: string) {
  const number = customNumber || DEFAULT_WHATSAPP;
  const text = customText || DEFAULT_WA_TEXT;
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}

function openWhatsApp(e: React.MouseEvent<HTMLAnchorElement>, customText?: string) {
  e.preventDefault();
  const url = getWhatsAppUrl(customText);
  track("whatsapp_click", { number: DEFAULT_WHATSAPP, location: "fab" });
  const win = window.open(url, "_blank", "noopener,noreferrer");
  if (!win) window.location.href = url;
}

export function WhatsAppFab() {
  const waUrl = getWhatsAppUrl();

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3 print:hidden">
      <a
        href={`tel:${DEFAULT_PHONE}`}
        aria-label="Call Rise Advisory"
        onClick={() => track("phone_click", { number: DEFAULT_PHONE, location: "fab" })}
        className="group inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#0B1F3B] text-white shadow-elegant ring-2 ring-[#D4A238]/40 transition-transform hover:-translate-y-0.5 hover:bg-[#D4A238] hover:text-[#0F1E2F] md:h-14 md:w-14"
      >
        <Phone className="h-5 w-5 md:h-6 md:w-6" />
        <span className="sr-only">Call {DEFAULT_PHONE}</span>
      </a>
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Rise Advisory on WhatsApp"
        onClick={(e) => openWhatsApp(e)}
        className="group inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-elegant ring-2 ring-white/40 transition-transform hover:-translate-y-0.5 hover:bg-[#1ebe5d] md:px-5 md:py-3.5"
      >
        <MessageCircle className="h-5 w-5" />
        <span className="hidden sm:inline">WhatsApp</span>
        <span className="sr-only">WhatsApp {DEFAULT_WHATSAPP}</span>
      </a>
    </div>
  );
}
