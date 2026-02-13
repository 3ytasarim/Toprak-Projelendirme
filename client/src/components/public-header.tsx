import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { Phone, MapPin, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createPortal } from "react-dom";
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
    <div className="w-6 h-5 relative cursor-pointer">
      <span
        className={`absolute left-0 h-[2px] w-6 bg-foreground transition-all duration-300 ${
          open ? "top-[9px] rotate-45" : "top-0 rotate-0"
        }`}
      />
      <span
        className={`absolute left-0 top-[9px] h-[2px] w-6 bg-foreground transition-all duration-200 ${
          open ? "opacity-0 -translate-x-2" : "opacity-100 translate-x-0"
        }`}
      />
      <span
        className={`absolute left-0 h-[2px] w-6 bg-foreground transition-all duration-300 ${
          open ? "top-[9px] -rotate-45" : "top-[18px] rotate-0"
        }`}
      />
    </div>
  );
}

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [location] = useLocation();

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  return createPortal(
    <div
      style={{
        position: "fixed",
        top: 64,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 99999,
        backgroundColor: "hsl(var(--background))",
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
      }}
    >
      <nav className="flex flex-col p-5 gap-1 flex-1" data-testid="nav-mobile">
        {navItems.map((item) => {
          const isActive = item.path === "/" ? location === "/" : location.startsWith(item.path);
          return (
            <Link key={item.path} href={item.path} onClick={onClose}>
              <div
                className={`flex items-center justify-between py-3.5 px-4 rounded-md transition-colors ${
                  isActive ? "bg-muted text-foreground" : "text-muted-foreground"
                }`}
                data-testid={`nav-mobile-${item.path.replace("/", "") || "home"}`}
              >
                <span className="text-base font-medium">{item.title}</span>
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
    </div>,
    document.body
  );
}

export default function PublicHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();

  return (
    <>
      <header className="sticky top-0 bg-background border-b" style={{ zIndex: 100000 }}>
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
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
