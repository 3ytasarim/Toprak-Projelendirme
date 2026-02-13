import { Link } from "wouter";
import { Phone, MapPin, Clock } from "lucide-react";
import { motion } from "framer-motion";
import logoImg from "@assets/murat_logo_1770998463808.jpeg";
import logo3y from "@assets/3y-logo1_1771001624496.png";

export default function PublicFooter() {
  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="mb-6">
              <img src={logoImg} alt="Toprak Projelendirme Logo" className="w-16 h-16 rounded-full object-cover" />
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
                  <p className="opacity-90">Pazartesi - Cuma</p>
                  <p className="opacity-60">09:00 - 18:30</p>
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
              <a href="tel:+905066232636" className="flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity" data-testid="footer-link-phone">
                <Phone className="w-4 h-4" />
                <span>0 (506) 623 26 36</span>
              </a>
              <div className="flex items-start gap-2 opacity-70">
                <MapPin className="w-4 h-4 mt-0.5" />
                <span>Güzelyalı Mah. Bağdat Cad. No:95/7 Pendik / İstanbul</span>
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
          <motion.p
            className="text-xs text-orange-400"
            animate={{ scale: [1, 1.05, 1, 1.05, 1] }}
            transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 2 }}
          >
            <motion.img
              src={logo3y}
              alt="3Y Tasarım"
              className="w-5 h-5 inline-block mr-1.5 align-middle"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
            Design By  |  <a href="https://3ytasarim.com" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:underline transition-opacity" data-testid="link-designer">3Y Tasarım Web & Yazılım Ajansı</a>
          </motion.p>
        </div>
      </div>
    </footer>
  );
}
