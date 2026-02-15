import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Building2, Shield, FileText, Zap, Award, Users, CheckCircle, Landmark, Factory } from "lucide-react";
import kamuCevreLogo from "@assets/bakanliklogo_(1)_1771147459131.png";
import kamuGenclikLogo from "@assets/Genclik-ve-Spor_1771147472888.png";
const kamuKiyiLogo = "/images/kamu-kiyi-emniyeti.png";
import kamuSaglikLogo from "@assets/turkiye-cumhuriyeti-saglik-bakanligi-logo-png_seeklogo-345239_1771147509708.png";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import PublicLayout from "@/components/public-layout";
import HeroSlider from "@/components/hero-slider";
import type { Slider, Service, Project, BlogPost } from "@shared/schema";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } },
};

const serviceIcons = [Shield, Building2, FileText, Zap, Factory, Landmark];

export default function Home() {
  const { data: sliders, isLoading: slidersLoading } = useQuery<Slider[]>({
    queryKey: ["/api/sliders"],
  });

  const { data: services, isLoading: servicesLoading } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

  const { data: projects, isLoading: projectsLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  const { data: blogs, isLoading: blogsLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog-posts"],
  });

  return (
    <PublicLayout>
      {slidersLoading ? (
        <div className="px-3 md:px-5 pt-5 pb-2">
          <Skeleton className="w-full h-[55vh] md:h-[75vh] rounded-3xl" />
        </div>
      ) : (
        <HeroSlider slides={sliders || []} />
      )}

      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <motion.div variants={fadeUp}>
              <span className="text-primary font-medium text-sm tracking-widest uppercase mb-3 block">
                Deprem Güvenliğinde Mühendislik Çözümleri
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight" data-testid="text-about-title">
                Bilimsel Analiz. Saha Deneyimi. Gerçek Mühendislik.
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Toprak Projelendirme Mimarlık Mühendislik, TBDY 2018 esaslarına uygun olarak; deprem performans analizi, güçlendirme projelendirme ve yapısal risk değerlendirme alanlarında uzmanlaşmış mühendislik ofisidir.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Kamu yapıları, hastaneler, spor salonları, endüstriyel tesisler, lojistik depolar ve tarihi yapılar başta olmak üzere, yüzlerce yapının teknik analiz ve değerlendirme süreci tarafımızca yürütülmüştür.
              </p>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Award className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold" data-testid="text-experience">300.000+</p>
                    <p className="text-sm text-muted-foreground">m² Analiz Tecrübesi</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold" data-testid="text-customers">200+</p>
                    <p className="text-sm text-muted-foreground">Yapı Analizi</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                {[
                  "TBDY 2018 esaslarına uygun deprem performans analizi",
                  "Kamu projelerinde deneyim ve üniversite onay süreç yönetimi",
                  "Saha + ofis entegre çalışma modeli",
                  "Yerinde donatı tespiti ve karot değerlendirmesi",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={fadeUp}>
              <div className="relative">
                <div className="rounded-md overflow-hidden">
                  <img
                    src="/images/slider-2.png"
                    alt="Toprak Projelendirme"
                    className="w-full h-[400px] md:h-[500px] object-cover"
                    data-testid="img-about"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground p-6 rounded-md hidden md:block">
                  <p className="text-3xl font-bold">15+</p>
                  <p className="text-sm opacity-80">Yıllık Tecrübe</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-card">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="text-center mb-16">
              <span className="text-primary font-medium text-sm tracking-widest uppercase mb-3 block">
                Hizmetlerimiz
              </span>
              <h2 className="text-3xl md:text-4xl font-bold" data-testid="text-services-title">
                Sizin İçin En İyi Hizmetlerimiz
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {servicesLoading
                ? Array.from({ length: 6 }).map((_, i) => (
                    <Skeleton key={i} className="h-80 rounded-md" />
                  ))
                : services?.slice(0, 6).map((service, i) => {
                    const Icon = serviceIcons[i % serviceIcons.length];
                    return (
                      <motion.div key={service.id} variants={fadeUp}>
                        <Link href={`/hizmetler/${service.slug}`}>
                          <Card className="group overflow-visible hover-elevate cursor-pointer h-full">
                            <div className="relative overflow-hidden rounded-t-md">
                              <img
                                src={service.coverImage}
                                alt={service.title}
                                className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                                data-testid={`img-service-${service.id}`}
                              />
                            </div>
                            <div className="p-5">
                              <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center mb-3 -mt-10 relative bg-card border border-card-border">
                                <Icon className="w-5 h-5 text-primary" />
                              </div>
                              <h3 className="font-semibold mb-2 text-sm" data-testid={`text-service-title-${service.id}`}>
                                {service.title}
                              </h3>
                              <p className="text-muted-foreground text-xs line-clamp-2 leading-relaxed">
                                {service.description}
                              </p>
                            </div>
                          </Card>
                        </Link>
                      </motion.div>
                    );
                  })}
            </div>

            <motion.div variants={fadeUp} className="text-center mt-10">
              <Link href="/hizmetler">
                <Button variant="outline" data-testid="button-all-services">
                  Tüm Hizmetler <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="text-center mb-16">
              <span className="text-orange-400 font-medium text-sm tracking-widest uppercase mb-3 block">
                Referanslarımız
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white" data-testid="text-kamu-title">
                Hizmet Verdiğimiz Kamu Kurumları
              </h2>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 items-center justify-items-center"
            >
              {[
                { src: kamuCevreLogo, alt: "T.C. Çevre, Şehircilik ve İklim Değişikliği Bakanlığı" },
                { src: kamuGenclikLogo, alt: "T.C. Gençlik ve Spor Bakanlığı" },
                { src: kamuKiyiLogo, alt: "Kıyı Emniyeti Genel Müdürlüğü" },
                { src: kamuSaglikLogo, alt: "T.C. Sağlık Bakanlığı" },
              ].map((logo, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="flex items-center justify-center p-6 w-full"
                  data-testid={`img-kamu-logo-${i}`}
                >
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="w-32 h-32 md:w-40 md:h-40 object-contain opacity-90 hover:opacity-100 transition-opacity duration-300"
                    title={logo.alt}
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="text-center mb-16">
              <span className="text-primary font-medium text-sm tracking-widest uppercase mb-3 block">
                Projelerimiz
              </span>
              <h2 className="text-3xl md:text-4xl font-bold" data-testid="text-projects-title">
                Projelerimizden Bazıları
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projectsLoading
                ? Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} className="h-72 rounded-md" />
                  ))
                : projects?.slice(0, 6).map((project) => (
                    <motion.div key={project.id} variants={fadeUp}>
                      <Link href={`/projeler/${project.slug}`}>
                        <Card className="group overflow-visible hover-elevate cursor-pointer">
                          <div className="relative overflow-hidden rounded-t-md">
                            <img
                              src={project.coverImage}
                              alt={project.title}
                              className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-105"
                              data-testid={`img-project-${project.id}`}
                            />
                            {project.category && (
                              <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs px-3 py-1 rounded-md">
                                {project.category}
                              </span>
                            )}
                          </div>
                          <div className="p-5">
                            <h3 className="font-semibold text-sm" data-testid={`text-project-title-${project.id}`}>
                              {project.title}
                            </h3>
                            {project.location && (
                              <p className="text-muted-foreground text-xs mt-1">{project.location}</p>
                            )}
                          </div>
                        </Card>
                      </Link>
                    </motion.div>
                  ))}
            </div>

            <motion.div variants={fadeUp} className="text-center mt-10">
              <Link href="/projeler">
                <Button variant="outline" data-testid="button-all-projects">
                  Tüm Projeler <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-card">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="text-center mb-16">
              <span className="text-primary font-medium text-sm tracking-widest uppercase mb-3 block">
                Blog
              </span>
              <h2 className="text-3xl md:text-4xl font-bold" data-testid="text-blog-title">
                Son Eklenen Yazılar
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogsLoading
                ? Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} className="h-72 rounded-md" />
                  ))
                : blogs?.slice(0, 3).map((post) => (
                    <motion.div key={post.id} variants={fadeUp}>
                      <Link href={`/blog/${post.slug}`}>
                        <Card className="group overflow-visible hover-elevate cursor-pointer">
                          <div className="relative overflow-hidden rounded-t-md">
                            <img
                              src={post.coverImage}
                              alt={post.title}
                              className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                              data-testid={`img-blog-${post.id}`}
                            />
                          </div>
                          <div className="p-5">
                            <p className="text-xs text-muted-foreground mb-2">
                              {new Date(post.createdAt).toLocaleDateString("tr-TR", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </p>
                            <h3 className="font-semibold text-sm line-clamp-2" data-testid={`text-blog-title-${post.id}`}>
                              {post.title}
                            </h3>
                          </div>
                        </Card>
                      </Link>
                    </motion.div>
                  ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative py-20 md:py-28 overflow-hidden">
        <img
          src="/images/slider-1.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-4xl font-bold text-white mb-4"
            >
              En Kısa Sürede Yanınızdayız
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/70 mb-8 max-w-2xl mx-auto">
              Deneyimli ekibimiz, işlerinizin güvenli olmasını sağlayarak 
              güvenilir içgörüler ve stratejiler sunar.
            </motion.p>
            <motion.div variants={fadeUp}>
              <a href="tel:+905066232636">
                <Button className="bg-primary border-primary-border" data-testid="button-cta-call">
                  Hemen Arayın: 0 (506) 623 26 36
                </Button>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </PublicLayout>
  );
}
