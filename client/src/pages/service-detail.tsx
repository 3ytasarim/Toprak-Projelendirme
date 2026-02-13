import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";
import PublicLayout from "@/components/public-layout";
import type { Service } from "@shared/schema";

export default function ServiceDetail() {
  const params = useParams<{ slug: string }>();
  const { data: service, isLoading } = useQuery<Service>({
    queryKey: ["/api/services", params.slug],
  });

  if (isLoading) {
    return (
      <PublicLayout>
        <Skeleton className="w-full h-64 rounded-none" />
        <div className="max-w-4xl mx-auto px-6 py-12">
          <Skeleton className="h-10 w-64 mb-4" />
          <Skeleton className="h-6 w-full mb-2" />
          <Skeleton className="h-6 w-3/4" />
        </div>
      </PublicLayout>
    );
  }

  if (!service) {
    return (
      <PublicLayout>
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Hizmet bulunamadı</h1>
          <Link href="/hizmetler" className="text-primary">Hizmetlere dön</Link>
        </div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <section className="relative py-20 md:py-28 overflow-hidden">
        <img src={service.coverImage} alt={service.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative max-w-7xl mx-auto px-6">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4" data-testid="text-service-detail-title">
            {service.title}
          </h1>
          <div className="flex items-center gap-2 text-white/60 text-sm flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">Ana Sayfa</Link>
            <span>/</span>
            <Link href="/hizmetler" className="hover:text-white transition-colors">Hizmetlerimiz</Link>
            <span>/</span>
            <span className="text-white">{service.title}</span>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="prose prose-lg max-w-none" data-testid="text-service-content">
            {service.description.split("\n").map((paragraph, i) => (
              <p key={i} className="text-muted-foreground leading-relaxed mb-4">{paragraph}</p>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
