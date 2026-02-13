import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "wouter";
import { useState } from "react";
import { MapPin, Calendar, Tag, X } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import PublicLayout from "@/components/public-layout";
import type { Project, ProjectImage } from "@shared/schema";
import { AnimatePresence, motion } from "framer-motion";

export default function ProjectDetail() {
  const params = useParams<{ slug: string }>();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const { data: project, isLoading } = useQuery<Project & { images: ProjectImage[] }>({
    queryKey: ["/api/projects", params.slug],
  });

  if (isLoading) {
    return (
      <PublicLayout>
        <Skeleton className="w-full h-64 rounded-none" />
        <div className="max-w-6xl mx-auto px-6 py-12">
          <Skeleton className="h-10 w-64 mb-6" />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-48 rounded-md" />
            ))}
          </div>
        </div>
      </PublicLayout>
    );
  }

  if (!project) {
    return (
      <PublicLayout>
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Proje bulunamadı</h1>
          <Link href="/projeler" className="text-primary">Projelere dön</Link>
        </div>
      </PublicLayout>
    );
  }

  const allImages = [
    { id: 0, imageUrl: project.coverImage, sortOrder: -1, projectId: project.id },
    ...(project.images || []),
  ];

  return (
    <PublicLayout>
      <section className="relative py-20 md:py-28 overflow-hidden">
        <img src={project.coverImage} alt={project.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative max-w-7xl mx-auto px-6">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4" data-testid="text-project-detail-title">
            {project.title}
          </h1>
          <div className="flex items-center gap-2 text-white/60 text-sm flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">Ana Sayfa</Link>
            <span>/</span>
            <Link href="/projeler" className="hover:text-white transition-colors">Projelerimiz</Link>
            <span>/</span>
            <span className="text-white">{project.title}</span>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-10">
                {allImages.map((img, index) => (
                  <div
                    key={img.id}
                    className="cursor-pointer rounded-md overflow-hidden"
                    onClick={() => setLightboxIndex(index)}
                    data-testid={`project-gallery-image-${index}`}
                  >
                    <img
                      src={img.imageUrl}
                      alt={`${project.title} - ${index + 1}`}
                      className="w-full h-36 sm:h-44 object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>

              <div>
                <h2 className="text-xl font-bold mb-4">Açıklama</h2>
                <div className="text-muted-foreground leading-relaxed" data-testid="text-project-description">
                  {project.description.split("\n").map((p, i) => (
                    <p key={i} className="mb-3">{p}</p>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <div className="bg-card rounded-md p-6 border border-card-border sticky top-24">
                <h3 className="font-semibold mb-6 text-lg">Proje Bilgileri</h3>
                <div className="flex flex-col gap-5">
                  <div className="flex items-start gap-3">
                    <Tag className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground mb-0.5">Proje Adı</p>
                      <p className="font-medium text-sm">{project.title}</p>
                    </div>
                  </div>
                  {project.location && (
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-muted-foreground mb-0.5">Proje Yeri</p>
                        <p className="font-medium text-sm">{project.location}</p>
                      </div>
                    </div>
                  )}
                  {project.category && (
                    <div className="flex items-start gap-3">
                      <Tag className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-muted-foreground mb-0.5">Kategori</p>
                        <p className="font-medium text-sm">{project.category}</p>
                      </div>
                    </div>
                  )}
                  {project.date && (
                    <div className="flex items-start gap-3">
                      <Calendar className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-muted-foreground mb-0.5">Proje Tarihi</p>
                        <p className="font-medium text-sm">{project.date}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
            onClick={() => setLightboxIndex(null)}
            data-testid="lightbox-overlay"
          >
            <Button
              size="icon"
              variant="ghost"
              className="absolute top-4 right-4 text-white bg-white/10"
              onClick={() => setLightboxIndex(null)}
              data-testid="button-lightbox-close"
            >
              <X />
            </Button>
            <img
              src={allImages[lightboxIndex]?.imageUrl}
              alt=""
              className="max-w-full max-h-[85vh] object-contain rounded-md"
              onClick={(e) => e.stopPropagation()}
              data-testid="lightbox-image"
            />
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {allImages.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex(i);
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === lightboxIndex ? "bg-white w-6" : "bg-white/40"
                  }`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </PublicLayout>
  );
}
