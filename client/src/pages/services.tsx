import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import PublicLayout from "@/components/public-layout";
import type { Service } from "@shared/schema";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function Services() {
  const { data: services, isLoading } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

  return (
    <PublicLayout>
      <section className="relative py-20 md:py-28 overflow-hidden">
        <img src="/images/slider-3.png" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative max-w-7xl mx-auto px-6">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4" data-testid="text-page-title">Hizmetlerimiz</h1>
          <div className="flex items-center gap-2 text-white/60 text-sm">
            <Link href="/" className="hover:text-white transition-colors">Ana Sayfa</Link>
            <span>/</span>
            <span className="text-white">Hizmetlerimiz</span>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {isLoading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="h-80 rounded-md" />
                ))
              : services?.map((service) => (
                  <motion.div key={service.id} variants={fadeUp}>
                    <Link href={`/hizmetler/${service.slug}`}>
                      <Card className="group overflow-visible hover-elevate cursor-pointer h-full">
                        <div className="relative overflow-hidden rounded-t-md">
                          <img
                            src={service.coverImage}
                            alt={service.title}
                            className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
                            data-testid={`img-service-${service.id}`}
                          />
                        </div>
                        <div className="p-6">
                          <h3 className="font-semibold text-base mb-2" data-testid={`text-service-title-${service.id}`}>
                            {service.title}
                          </h3>
                          <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed mb-4">
                            {service.description}
                          </p>
                          <span className="text-primary text-sm font-medium flex items-center gap-2">
                            Detaylı Bilgi <ArrowRight className="w-4 h-4" />
                          </span>
                        </div>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
          </motion.div>
        </div>
      </section>
    </PublicLayout>
  );
}
