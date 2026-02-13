import { Link } from "wouter";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import logoImg from "@assets/murat_logo_1770998463808.jpeg";

export default function PublicFooter() {
  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <img src={logoImg} alt="Toprak Projelendirme Logo" className="w-10 h-10 rounded-full object-cover" />
              <div>
                <h3 className="font-bold text-lg leading-tight">TOPRAK</h3>
                <p className="text-[10px] tracking-[0.2em] opacity-60 uppercase">Projelendirme</p>
              </div>
            </div>
            <p className="opacity-70 text-sm leading-relaxed">
              Toprak Projelendirme olarak, yapılarınızın güvenliği ve 
              değerini artırmak için profesyonel mühendislik hizmetleri sunuyoruz.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Hızlı Bağlantılar</h4>
            <div className="flex flex-col gap-2">
              <Link href="/" className="opacity-70 hover:opacity-100 transition-opacity text-sm" data-testid="footer-link-home">Ana Sayfa</Link>
              <Link href="/hizmetler" className="opacity-70 hover:opacity-100 transition-opacity text-sm" data-testid="footer-link-services">Hizmetlerimiz</Link>
              <Link href="/projeler" className="opacity-70 hover:opacity-100 transition-opacity text-sm" data-testid="footer-link-projects">Projelerimiz</Link>
              <Link href="/blog" className="opacity-70 hover:opacity-100 transition-opacity text-sm" data-testid="footer-link-blog">Blog</Link>
              <Link href="/iletisim" className="opacity-70 hover:opacity-100 transition-opacity text-sm" data-testid="footer-link-contact">İletişim</Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Çalışma Saatleri</h4>
            <div className="flex flex-col gap-3 text-sm">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 mt-0.5 opacity-60" />
                <div>
                  <p className="opacity-90">Hafta İçi</p>
                  <p className="opacity-60">09:00 - 18:00</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 mt-0.5 opacity-60" />
                <div>
                  <p className="opacity-90">Cumartesi</p>
                  <p className="opacity-60">09:00 - 14:00</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 mt-0.5 opacity-60" />
                <div>
                  <p className="opacity-90">Pazar</p>
                  <p className="opacity-60">Kapalı</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">İletişim</h4>
            <div className="flex flex-col gap-3 text-sm">
              <a href="tel:+905551234567" className="flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity" data-testid="footer-link-phone">
                <Phone className="w-4 h-4" />
                <span>0555 123 45 67</span>
              </a>
              <a href="mailto:info@toprakprojelendirme.com" className="flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity" data-testid="footer-link-email">
                <Mail className="w-4 h-4" />
                <span>info@toprakprojelendirme.com</span>
              </a>
              <div className="flex items-start gap-2 opacity-70">
                <MapPin className="w-4 h-4 mt-0.5" />
                <span>İstanbul, Türkiye</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-background/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4 flex-wrap">
          <p className="text-xs opacity-50">
            &copy; {new Date().getFullYear()} Toprak Projelendirme - Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  );
}
