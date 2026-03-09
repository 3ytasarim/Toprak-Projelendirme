import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { Phone, MapPin, ChevronRight, Shield, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createPortal } from "react-dom";
import logoImg from "@assets/murat_logo_1770998463808.jpeg";

function AnnouncementBar() {
  return (
    <div className="hidden lg:block bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white" data-testid="announcement-bar">
      <div className="max-w-7xl mx-auto px-6 h-9 flex items-center justify-center gap-2.5">
        <Shield className="w-3.5 h-3.5 text-orange-400 flex-shrink-0" />
        <span className="text-[12px] tracking-wide">
          <span className="font-semibold announcement-shimmer">Toprak Projelendirme</span>, Çevre, Şehircilik ve İklim Değişikliği Bakanlığı tarafından yetkilendirilmiş{" "}
          <span className="font-semibold announcement-shimmer">Riskli Yapı Tespiti (ÇŞB)</span> lisanslı bir mühendislik firmasıdır.
        </span>
      </div>
    </div>
  );
}

function MobileAnnouncementPopup() {
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 600);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => setVisible(false), 300);
  };

  if (!visible) return null;

  return createPortal(
    <div
      className={`lg:hidden fixed inset-0 flex items-end justify-center p-4 transition-all duration-300 ${closing ? "opacity-0" : "opacity-100"}`}
      style={{ zIndex: 200000 }}
      data-testid="mobile-announcement-popup"
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={handleClose} />
      <div
        className={`relative w-full max-w-md rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 ${closing ? "translate-y-full opacity-0" : "translate-y-0 opacity-100"}`}
      >
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            data-testid="button-close-announcement"
          >
            <X className="w-4 h-4 text-white" />
          </button>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-orange-400/20 flex items-center justify-center">
              <Shield className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <p className="text-orange-400 text-[10px] font-semibold tracking-widest uppercase">Yetkili Firma</p>
              <p className="text-white font-bold text-sm">Toprak Projelendirme</p>
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-4" />

          <p className="text-slate-300 text-[13px] leading-relaxed">
            Çevre, Şehircilik ve İklim Değişikliği Bakanlığı tarafından yetkilendirilmiş{" "}
            <span className="font-semibold announcement-shimmer">Riskli Yapı Tespiti (ÇŞB)</span>{" "}
            lisanslı bir mühendislik firmasıdır.
          </p>

          <button
            onClick={handleClose}
            className="mt-5 w-full py-2.5 rounded-lg bg-orange-400 hover:bg-orange-500 text-slate-900 font-semibold text-sm transition-colors"
            data-testid="button-announcement-ok"
          >
            Anladım
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

const leftNav = [
  { title: "Ana Sayfa", path: "/" },
  { title: "Biz Kimiz?", path: "/hakkimizda" },
  { title: "Hizmetlerimiz", path: "/hizmetler" },
];

const rightNav = [
  { title: "Projelerimiz", path: "/projeler" },
  { title: "Blog", path: "/blog" },
  { title: "İletişim", path: "/iletisim" },
];

const allNav = [...leftNav, ...rightNav];

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

function NavLink({ item, location }: { item: { title: string; path: string }; location: string }) {
  const isActive = item.path === "/" ? location === "/" : location.startsWith(item.path);
  return (
    <Link href={item.path}>
      <span
        className={`px-3 xl:px-4 py-1.5 text-[13px] font-medium rounded-full transition-all cursor-pointer whitespace-nowrap ${
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
        {allNav.map((item) => {
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
        <a href="tel:+902167552755" className="flex items-center gap-3 text-sm text-muted-foreground">
          <Phone className="w-4 h-4" />
          +90 (216) 755 27 55
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
      <div className="sticky top-0" style={{ zIndex: 100000 }}>
      <AnnouncementBar />
      <header className="bg-background border-b">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-16">
            <button
              className="lg:hidden p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              data-testid="button-mobile-menu"
            >
              <HamburgerIcon open={mobileOpen} />
            </button>

            <nav className="hidden lg:flex items-center gap-1" data-testid="nav-desktop-left">
              {leftNav.map((item) => (
                <NavLink key={item.path} item={item} location={location} />
              ))}
            </nav>

            <Link href="/" data-testid="link-logo" className="mx-4">
              <img src={logoImg} alt="Toprak Projelendirme" className="w-12 h-12 rounded-full object-cover" />
            </Link>

            <nav className="hidden lg:flex items-center gap-1" data-testid="nav-desktop-right">
              {rightNav.map((item) => (
                <NavLink key={item.path} item={item} location={location} />
              ))}
            </nav>

            <div className="hidden lg:flex items-center ml-4">
              <a href="tel:+902167552755" data-testid="link-phone-header">
                <Button variant="outline" size="sm" className="rounded-full gap-2">
                  <Phone className="w-3.5 h-3.5" />
                  +90 (216) 755 27 55
                </Button>
              </a>
            </div>

            <div className="lg:hidden w-10" />
          </div>
        </div>
      </header>
      </div>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
      <MobileAnnouncementPopup />
    </>
  );
}
