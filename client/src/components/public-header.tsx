import { Link, useLocation } from "wouter";
import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
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
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 gap-6">
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

          <Link href="/" data-testid="link-logo" className="lg:absolute lg:left-1/2 lg:-translate-x-1/2">
            <img src={logoImg} alt="Toprak Projelendirme" className="w-11 h-11 rounded-full object-cover" />
          </Link>

          <div className="hidden lg:flex items-center">
            <a href="tel:+905066232636" data-testid="link-phone-header">
              <Button variant="outline" size="sm" className="rounded-full gap-2">
                <Phone className="w-3.5 h-3.5" />
                0 (506) 623 26 36
              </Button>
            </a>
          </div>

          <Button
            size="icon"
            variant="ghost"
            className="lg:hidden ml-auto"
            onClick={() => setMobileOpen(!mobileOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden overflow-hidden border-t"
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
              <div className="pt-3 mt-2 border-t flex flex-col gap-2">
                <a href="tel:+905066232636">
                  <Button variant="outline" className="w-full rounded-full gap-2">
                    <Phone className="w-4 h-4" />
                    0 (506) 623 26 36
                  </Button>
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
