import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import PublicLayout from "@/components/public-layout";

export default function Contact() {
  return (
    <PublicLayout>
      <section className="relative py-20 md:py-28 overflow-hidden">
        <img src="/images/slider-3.png" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative max-w-7xl mx-auto px-6">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4" data-testid="text-page-title">İletişim</h1>
          <div className="flex items-center gap-2 text-white/60 text-sm">
            <Link href="/" className="hover:text-white transition-colors">Ana Sayfa</Link>
            <span>/</span>
            <span className="text-white">İletişim</span>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 text-center">
              <div className="w-14 h-14 rounded-md bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Telefon</h3>
              <a href="tel:+905551234567" className="text-muted-foreground text-sm hover:text-primary transition-colors" data-testid="link-contact-phone">
                0555 123 45 67
              </a>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-14 h-14 rounded-md bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">E-posta</h3>
              <a href="mailto:info@toprakprojelendirme.com" className="text-muted-foreground text-sm hover:text-primary transition-colors" data-testid="link-contact-email">
                info@toprakprojelendirme.com
              </a>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-14 h-14 rounded-md bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Adres</h3>
              <p className="text-muted-foreground text-sm">
                İstanbul, Türkiye
              </p>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-14 h-14 rounded-md bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Çalışma Saatleri</h3>
              <p className="text-muted-foreground text-sm">
                Hafta İçi: 09:00 - 18:00
              </p>
              <p className="text-muted-foreground text-sm">
                Cumartesi: 09:00 - 14:00
              </p>
            </Card>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
