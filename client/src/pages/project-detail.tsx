import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "wouter";
import { useState, useCallback, useEffect } from "react";
import { MapPin, Calendar, Tag, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import PublicLayout from "@/components/public-layout";
import type { Project, ProjectImage } from "@shared/schema";
import { AnimatePresence, motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";

export default function ProjectDetail() {
  const params = useParams<{ slug: string }>();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi]);

  const { data: project, isLoading } = useQuery<Project & { images: ProjectImage[] }>({
    queryKey: ["/api/projects", params.slug],
  });

  if (isLoading) {
    return (
      <PublicLayout>
        <Skeleton className="w-full h-64 rounded-none" />
        <div className="max-w-6xl mx-auto px-6 py-12">
          <Skeleton className="h-10 w-64 mb-6" />
          <Skeleton className="h-96 w-full rounded-md" />
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
              {allImages.length > 0 && (
                <div className="mb-10">
                  <div className="relative rounded-md overflow-hidden">
                    <div ref={emblaRef} className="overflow-hidden">
                      <div className="flex">
                        {allImages.map((img, index) => (
                          <div
                            key={img.id}
                            className="flex-[0_0_100%] min-w-0 cursor-pointer"
                            onClick={() => setLightboxIndex(index)}
                            data-testid={`project-slider-image-${index}`}
                          >
                            <img
                              src={img.imageUrl}
                              alt={`${project.title} - ${index + 1}`}
                              className="w-full h-72 sm:h-96 md:h-[28rem] object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    {allImages.length > 1 && (
                      <>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 text-white hover:bg-black/60"
                          onClick={scrollPrev}
                          data-testid="button-project-slider-prev"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 text-white hover:bg-black/60"
                          onClick={scrollNext}
                          data-testid="button-project-slider-next"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </Button>
                      </>
                    )}
                  </div>

                  {allImages.length > 1 && (
                    <div className="flex justify-center gap-2 mt-4">
                      {allImages.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => emblaApi?.scrollTo(i)}
                          className={`w-2.5 h-2.5 rounded-full transition-all ${
                            i === selectedIndex ? "bg-primary w-7" : "bg-muted-foreground/30"
                          }`}
                          data-testid={`project-slider-dot-${i}`}
                        />
                      ))}
                    </div>
                  )}

                  <p className="text-sm text-muted-foreground mt-3 text-center">
                    {selectedIndex + 1} / {allImages.length} - {project.title}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mb-10">
                {allImages.map((img, index) => (
                  <div
                    key={img.id}
                    className={`cursor-pointer rounded-md overflow-hidden border-2 transition-all ${
                      index === selectedIndex ? "border-primary" : "border-transparent"
                    }`}
                    onClick={() => {
                      emblaApi?.scrollTo(index);
                      setSelectedIndex(index);
                    }}
                    data-testid={`project-thumbnail-${index}`}
                  >
                    <img
                      src={img.imageUrl}
                      alt={`${project.title} - ${index + 1}`}
                      className="w-full h-20 sm:h-24 object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>

              <div>
                <h2 className="text-xl font-bold mb-4">Proje Hakkında</h2>
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
            {allImages.length > 1 && (
              <>
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-white/10"
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex((prev) => (prev! > 0 ? prev! - 1 : allImages.length - 1));
                  }}
                  data-testid="button-lightbox-prev"
                >
                  <ChevronLeft />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-white/10"
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex((prev) => (prev! < allImages.length - 1 ? prev! + 1 : 0));
                  }}
                  data-testid="button-lightbox-next"
                >
                  <ChevronRight />
                </Button>
              </>
            )}
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