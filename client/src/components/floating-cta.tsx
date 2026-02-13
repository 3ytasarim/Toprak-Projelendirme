import { Phone, MapPin } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

export default function FloatingCTA() {
  return (
    <div className="fixed bottom-6 right-4 z-[9998] flex flex-col gap-3" data-testid="floating-cta">
      <a
        href="https://maps.google.com/maps?q=40.8572227,29.2855475"
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-105"
        data-testid="button-cta-location"
        title="Konum"
      >
        <MapPin className="w-5 h-5" />
      </a>
      <a
        href="https://wa.me/905066232636"
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-105"
        data-testid="button-cta-whatsapp"
        title="WhatsApp"
      >
        <SiWhatsapp className="w-5 h-5" />
      </a>
      <a
        href="tel:+905066232636"
        className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg transition-transform hover:scale-105"
        data-testid="button-cta-phone"
        title="Ara"
      >
        <Phone className="w-5 h-5" />
      </a>
    </div>
  );
}
