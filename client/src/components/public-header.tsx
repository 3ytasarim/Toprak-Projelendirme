import { Link, useLocation } from "wouter";
import { useState } from "react";
import { Phone, MapPin, ChevronRight } from "lucide-react";
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

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <div className="w-6 h-5 flex flex-col justify-between cursor-pointer">
      <motion.span
        animate={open ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.3 }}
        className="block h-[2px] w-6 bg-foreground origin-center"
      />
      <motion.span
        animate={open ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
        transition={{ duration: 0.2 }}
        className="block h-[2px] w-6 bg-foreground"
      />
      <motion.span
        animate={open ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.3 }}
        className="block h-[2px] w-6 bg-foreground origin-center"
      />
    </div>
  );
}

export default function PublicHeader() {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="relative flex items-center justify-between h-16 gap-6">
          <nav className="hidden lg:flex items-center gap-1" data-testid="nav-desktop">
            {navItems.map((item) => {
              const isActive = item.path === "/" ? location === "/" : location.startsWith(item.path);
              return (
                <Link key={item.path} href={item.path}>
                  <span
                    className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all cursor-pointer ${
                      isActive
                        ? "border border-foreground text-foreground"
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

          <Link href="/" data-testid="link-logo" className="absolute left-1/2 -translate-x-1/2">
            <img src={logoImg} alt="Toprak Projelendirme" className="w-14 h-14 rounded-full object-cover" />
          </Link>

          <div className="hidden lg:flex items-center ml-auto">
            <a href="tel:+905066232636" data-testid="link-phone-header">
              <Button variant="outline" size="sm" className="rounded-full gap-2">
                <Phone className="w-3.5 h-3.5" />
                0 (506) 623 26 36
              </Button>
            </a>
          </div>

          <button
            className="lg:hidden ml-auto p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            data-testid="button-mobile-menu"
          >
            <HamburgerIcon open={mobileOpen} />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div
          className="fixed inset-0 top-16 lg:hidden flex flex-col"
          style={{ zIndex: 9999, backgroundColor: "#ffffff" }}
        >
          <nav className="flex flex-col p-5 gap-1 flex-1" data-testid="nav-mobile">
            {navItems.map((item) => {
              const isActive = item.path === "/" ? location === "/" : location.startsWith(item.path);
              return (
                <Link key={item.path} href={item.path} onClick={() => setMobileOpen(false)}>
                  <div
                    className={`flex items-center justify-between py-3 px-3 rounded-md transition-colors ${
                      isActive ? "bg-muted text-foreground" : "text-muted-foreground"
                    }`}
                    data-testid={`nav-mobile-${item.path.replace("/", "") || "home"}`}
                  >
                    <span className="text-sm font-medium">{item.title}</span>
                    <ChevronRight className="w-4 h-4 opacity-40" />
                  </div>
                </Link>
              );
            })}
          </nav>

          <div className="p-5 border-t flex flex-col gap-3">
            <a href="tel:+905066232636" className="flex items-center gap-3 text-sm text-muted-foreground">
              <Phone className="w-4 h-4" />
              0 (506) 623 26 36
            </a>
            <div className="flex items-start gap-3 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
              <span>Güzelyalı Mah. Bağdat Cad. No:95/7 Pendik / İstanbul</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
