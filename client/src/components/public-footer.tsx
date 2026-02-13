import logoImg from "@assets/murat_logo_1770998463808.jpeg";

export default function PublicFooter() {
  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col items-center gap-4">
        <div className="flex items-center gap-4">
          <img src={logoImg} alt="Toprak Projelendirme Logo" className="w-16 h-16 rounded-full object-cover" />
          <div>
            <h3 className="font-bold text-xl leading-tight">TOPRAK</h3>
            <p className="text-xs tracking-[0.25em] opacity-60 uppercase">Projelendirme</p>
          </div>
        </div>
      </div>

      <div className="border-t border-background/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-center">
          <p className="text-xs opacity-50">
            &copy; {new Date().getFullYear()} Toprak Projelendirme - Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  );
}
