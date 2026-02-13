import { Link, useLocation } from "wouter";
import { useState } from "react";
import { Menu, X, Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import logoImg from "@assets/murat_logo_1770998463808.jpeg";

const navItems = [
  { title: "Ana Sayfa", path: "/" },
  { title: "Hizmetlerimiz", path: "/hizmetler" },
  { title: "Projelerimiz", path: "/projeler" },
  { title: "Blog", path: "/blog" },
  { title: "İletişim", path: "/iletisim" },
];

export default function PublicHeader() {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <div className="bg-foreground text-background text-sm hidden md:block">
        <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-6 flex-wrap">
            <a href="tel:+905066232636" className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity" data-testid="link-phone-top">
              <Phone className="w-3.5 h-3.5" />
              <span>0 (506) 623 26 36</span>
            </a>
          </div>
          <div className="flex items-center gap-2 opacity-80">
            <MapPin className="w-3.5 h-3.5" />
            <span>Güzelyalı Mah. Bağdat Cad. No:95/7 Pendik / İstanbul</span>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
          <Link href="/" data-testid="link-logo">
            <div className="flex items-center gap-3">
              <img src={logoImg} alt="Toprak Projelendirme Logo" className="w-10 h-10 rounded-full object-cover" />
              <div>
                <h1 className="font-bold text-lg leading-tight tracking-tight">TOPRAK</h1>
                <p className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase">Projelendirme</p>
              </div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1" data-testid="nav-desktop">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path}>
                <Button
                  variant={location === item.path ? "secondary" : "ghost"}
                  size="sm"
                  data-testid={`nav-${item.path.replace("/", "") || "home"}`}
                >
                  {item.title}
                </Button>
              </Link>
            ))}
          </nav>

          <Button
            size="icon"
            variant="ghost"
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileOpen ? <X /> : <Menu />}
          </Button>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden border-t"
            >
              <nav className="flex flex-col p-4 gap-1" data-testid="nav-mobile">
                {navItems.map((item) => (
                  <Link key={item.path} href={item.path} onClick={() => setMobileOpen(false)}>
                    <Button
                      variant={location === item.path ? "secondary" : "ghost"}
                      className="w-full justify-start"
                      data-testid={`nav-mobile-${item.path.replace("/", "") || "home"}`}
                    >
                      {item.title}
                    </Button>
                  </Link>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
