import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Image, Briefcase, FolderOpen, FileText } from "lucide-react";
import AdminLayout from "./layout";
import type { Slider, Service, Project, BlogPost } from "@shared/schema";

export default function AdminDashboard() {
  const { data: sliders } = useQuery<Slider[]>({ queryKey: ["/api/sliders"] });
  const { data: services } = useQuery<Service[]>({ queryKey: ["/api/services"] });
  const { data: projects } = useQuery<Project[]>({ queryKey: ["/api/projects"] });
  const { data: blogs } = useQuery<BlogPost[]>({ queryKey: ["/api/blog-posts"] });

  const stats = [
    { title: "Slider", count: sliders?.length || 0, icon: Image, color: "bg-blue-500/10 text-blue-600" },
    { title: "Hizmetler", count: services?.length || 0, icon: Briefcase, color: "bg-amber-500/10 text-amber-600" },
    { title: "Projeler", count: projects?.length || 0, icon: FolderOpen, color: "bg-green-500/10 text-green-600" },
    { title: "Blog Yazıları", count: blogs?.length || 0, icon: FileText, color: "bg-purple-500/10 text-purple-600" },
  ];

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold" data-testid="text-dashboard-title">Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">Toprak Projelendirme yönetim paneli</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="p-6">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <p className="text-3xl font-bold mt-1" data-testid={`text-stat-${stat.title.toLowerCase()}`}>
                  {stat.count}
                </p>
              </div>
              <div className={`w-12 h-12 rounded-md flex items-center justify-center ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </AdminLayout>
  );
}
