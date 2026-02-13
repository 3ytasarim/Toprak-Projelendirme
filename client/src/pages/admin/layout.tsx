import { Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Image, FileText, Briefcase, FolderOpen, LogOut, LayoutDashboard } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import logoImg from "@assets/murat_logo_1770998463808.jpeg";

const adminNav = [
  { title: "Dashboard", path: "/admin", icon: LayoutDashboard },
  { title: "Slider", path: "/admin/sliders", icon: Image },
  { title: "Hizmetler", path: "/admin/hizmetler", icon: Briefcase },
  { title: "Projeler", path: "/admin/projeler", icon: FolderOpen },
  { title: "Blog", path: "/admin/blog", icon: FileText },
];

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [location, setLocation] = useLocation();
  const { data: user, isLoading } = useQuery({
    queryKey: ["/api/admin/me"],
    queryFn: async () => {
      const res = await fetch("/api/admin/me", { credentials: "include" });
      if (res.status === 401) return null;
      if (!res.ok) throw new Error("Failed");
      return res.json();
    },
    retry: false,
  });

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Yükleniyor...</div>;
  }

  if (!user) {
    setLocation("/admin/login");
    return null;
  }

  const handleLogout = async () => {
    await apiRequest("POST", "/api/admin/logout");
    queryClient.invalidateQueries({ queryKey: ["/api/admin/me"] });
    setLocation("/admin/login");
  };

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="w-60 border-r bg-card flex flex-col flex-shrink-0 hidden md:flex">
        <div className="p-5 border-b">
          <Link href="/">
            <div className="flex items-center gap-3">
              <img src={logoImg} alt="Toprak" className="w-10 h-10 rounded-md object-cover" />
              <div>
                <h1 className="font-bold text-sm leading-tight">TOPRAK</h1>
                <p className="text-[9px] tracking-[0.15em] text-muted-foreground uppercase">Admin Panel</p>
              </div>
            </div>
          </Link>
        </div>

        <nav className="flex-1 p-3 flex flex-col gap-1">
          {adminNav.map((item) => (
            <Link key={item.path} href={item.path}>
              <Button
                variant={location === item.path ? "secondary" : "ghost"}
                className="w-full justify-start gap-3"
                size="sm"
                data-testid={`admin-nav-${item.path.split("/").pop()}`}
              >
                <item.icon className="w-4 h-4" />
                {item.title}
              </Button>
            </Link>
          ))}
        </nav>

        <div className="p-3 border-t">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3"
            size="sm"
            onClick={handleLogout}
            data-testid="button-logout"
          >
            <LogOut className="w-4 h-4" />
            Çıkış Yap
          </Button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="border-b bg-card p-4 flex items-center justify-between gap-4 md:hidden">
          <Link href="/">
            <div className="flex items-center gap-2">
              <img src={logoImg} alt="Toprak" className="w-9 h-9 rounded-md object-cover" />
              <span className="font-bold text-sm">Admin</span>
            </div>
          </Link>
          <Button variant="ghost" size="sm" onClick={handleLogout} data-testid="button-logout-mobile">
            <LogOut className="w-4 h-4" />
          </Button>
        </header>

        <div className="md:hidden border-b bg-card overflow-x-auto">
          <div className="flex p-2 gap-1">
            {adminNav.map((item) => (
              <Link key={item.path} href={item.path}>
                <Button
                  variant={location === item.path ? "secondary" : "ghost"}
                  size="sm"
                  className="whitespace-nowrap gap-2"
                >
                  <item.icon className="w-3.5 h-3.5" />
                  {item.title}
                </Button>
              </Link>
            ))}
          </div>
        </div>

        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
