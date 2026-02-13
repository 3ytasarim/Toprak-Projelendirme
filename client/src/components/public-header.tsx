import { Link, useLocation } from "wouter";
import { useState } from "react";
import { Menu, X, Phone, MapPin } from "lucide-react";
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
      <div className="bg-foreground text-background text-xs hidden md:block">
        <div className="max-w-7xl mx-auto px-6 py-1.5 flex items-center justify-between gap-4 flex-wrap">
          <a href="tel:+905066232636" className="flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity" data-testid="link-phone-top">
            <Phone className="w-3 h-3" />
            <span>0 (506) 623 26 36</span>
          </a>
          <div className="flex items-center gap-2 opacity-70">
            <MapPin className="w-3 h-3" />
            <span>Güzelyalı Mah. Bağdat Cad. No:95/7 Pendik / İstanbul</span>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b">
        <div className="max-w-7xl mx-auto px-6 py-2.5 flex items-center justify-between gap-4">
          <Link href="/" data-testid="link-logo">
            <div className="flex items-center gap-3">
              <img src={logoImg} alt="Toprak Projelendirme Logo" className="w-9 h-9 rounded-full object-cover" />
              <div className="leading-none">
                <h1 className="font-bold text-base tracking-tight">TOPRAK</h1>
                <p className="text-[9px] tracking-[0.2em] text-muted-foreground uppercase mt-0.5">Projelendirme</p>
              </div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-0.5" data-testid="nav-desktop">
            {navItems.map((item) => {
              const isActive = item.path === "/" ? location === "/" : location.startsWith(item.path);
              return (
                <Link key={item.path} href={item.path}>
                  <span
                    className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors cursor-pointer ${
                      isActive
                        ? "text-foreground bg-muted"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    data-testid={`nav-${item.path.replace("/", "") || "home"}`}
                  >
                    {item.title}
                  </span>
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:block">
            <a href="tel:+905066232636">
              <Button size="sm" data-testid="button-header-call">
                <Phone className="w-3.5 h-3.5 mr-1.5" />
                Bizi Arayın
              </Button>
            </a>
          </div>

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
                {navItems.map((item) => {
                  const isActive = item.path === "/" ? location === "/" : location.startsWith(item.path);
                  return (
                    <Link key={item.path} href={item.path} onClick={() => setMobileOpen(false)}>
                      <Button
                        variant={isActive ? "secondary" : "ghost"}
                        className="w-full justify-start"
                        data-testid={`nav-mobile-${item.path.replace("/", "") || "home"}`}
                      >
                        {item.title}
                      </Button>
                    </Link>
                  );
                })}
                <div className="pt-2 border-t mt-2">
                  <a href="tel:+905066232636" className="flex items-center gap-2 text-sm text-muted-foreground px-4 py-2">
                    <Phone className="w-4 h-4" />
                    0 (506) 623 26 36
                  </a>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground px-4 py-2">
                    <MapPin className="w-4 h-4 shrink-0" />
                    <span>Güzelyalı Mah. Bağdat Cad. No:95/7 Pendik / İstanbul</span>
                  </div>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
