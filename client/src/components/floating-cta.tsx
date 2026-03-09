import { Phone, MapPin } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

export default function FloatingCTA() {
  return (
    <div
      className="fixed right-0 top-1/2 -translate-y-1/2 z-[9998] flex flex-col items-center gap-0 rounded-l-xl overflow-hidden shadow-lg"
      data-testid="floating-cta"
    >
      <a
        href="https://maps.google.com/maps?q=40.8572227,29.2855475"
        target="_blank"
        rel="noopener noreferrer"
        className="w-11 h-11 bg-blue-600 text-white flex items-center justify-center transition-opacity hover:opacity-90"
        data-testid="button-cta-location"
        title="Konum"
      >
        <MapPin className="w-5 h-5" />
      </a>
      <a
        href="https://wa.me/905066232636"
        target="_blank"
        rel="noopener noreferrer"
        className="w-11 h-11 bg-green-500 text-white flex items-center justify-center transition-opacity hover:opacity-90"
        data-testid="button-cta-whatsapp"
        title="WhatsApp"
      >
        <SiWhatsapp className="w-5 h-5" />
      </a>
      <a
        href="tel:+902167552755"
        className="w-11 h-11 bg-primary text-primary-foreground flex items-center justify-center transition-opacity hover:opacity-90"
        data-testid="button-cta-phone"
        title="Ara"
      >
        <Phone className="w-5 h-5" />
      </a>
    </div>
  );
}
