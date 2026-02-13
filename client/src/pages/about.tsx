import { Link } from "wouter";
import { motion } from "framer-motion";
import { CheckCircle, Building2, ShieldCheck, Award, Users, Target } from "lucide-react";
import { Card } from "@/components/ui/card";
import PublicLayout from "@/components/public-layout";
import logoImg from "@assets/murat_logo_1770998463808.jpeg";

const hizmetler = [
  {
    title: "Deprem Performans Analizi (TBDY 2018)",
    items: [
      "Mevcut Betonarme Binaların Deprem Performans Analizi",
      "Doğrusal ve Doğrusal Olmayan (Pushover) Analizler",
      "DD-1, DD-2, DD-3 Deprem Düzeylerinde Performans Kontrolleri",
      "Hastane, Spor Salonu, Yurt, Okul ve Kamu Yapıları Analizi",
      "Riskli Bina Teknik Değerlendirme Raporları",
    ],
  },
  {
    title: "Güçlendirme Projelendirme Hizmetleri",
    items: [
      "Betonarme Mantolama Projeleri",
      "Perde İlavesi Tasarımı",
      "CFRP / Karbon Fiber Güçlendirme Projeleri",
      "TRM / FRCM Sistem Tasarımları",
      "Çelik Güçlendirme ve Çapraz Sistemler",
      "Üniversite Onay Süreç Yönetimi",
    ],
  },
  {
    title: "Hızlı Tarama ve Risk Analizi",
    items: [
      "AFAD ve Bakanlık Formatında Hızlı Tarama",
      "Yerinde Donatı Tespiti",
      "Karot Numunesi Alımı ve Değerlendirilmesi",
      "Beton Test Çekici Ölçümleri",
      "Yapısal Risk Sınıflandırması",
    ],
  },
  {
    title: "Zemin ve Temel Mühendisliği",
    items: [
      "Zemin Etüdü Koordinasyonu",
      "Temel Muayene Çukuru İncelemesi",
      "Radye Temel Analizi",
      "Temel Güçlendirme Tasarımı",
    ],
  },
  {
    title: "Endüstriyel ve Özel Yapı Analizleri",
    items: [
      "Fabrika ve Depo Performans Analizi",
      "Çelik + Betonarme Karma Sistem Analizleri",
      "Lojistik Depo Yapıları",
      "Organize Sanayi Bölgesi Yapıları",
    ],
  },
  {
    title: "Tarihi ve Yığma Yapı Güçlendirme",
    items: [
      "Yığma Yapı Performans Analizi",
      "Tarihi Yapılarda Deprem Risk Değerlendirmesi",
      "TRM / FRCM Güçlendirme Projeleri",
      "Taş Duvar Sistem İncelemesi",
    ],
  },
];

const nedenBiz = [
  { icon: ShieldCheck, text: "TBDY 2018 Uzmanlığı" },
  { icon: Building2, text: "Kamu Projelerinde Deneyim" },
  { icon: Target, text: "300.000 m² Üzeri Analiz Tecrübesi" },
  { icon: Award, text: "Üniversite Onay Süreç Yönetimi" },
  { icon: Users, text: "Saha + Ofis Entegre Çalışma Modeli" },
];

const referanslar = [
  "Balıkesir İl Sağlık Müdürlüğü – 200 Yapı Deprem Hızlı Tarama",
  "Konya Gençlik ve Spor İl Müdürlüğü – 32 Performans ve Güçlendirme Projesi",
  "Kastamonu İl Sağlık Müdürlüğü – Hızlı Tarama Çalışmaları",
  "Tuzla OSB Endüstriyel Tesis Performans Analizleri",
  "Kıyı Emniyeti Genel Müdürlüğü – Fenerbahçe Feneri Güçlendirme ve Analiz",
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

export default function About() {
  return (
    <PublicLayout>
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-background" />
        <div className="relative max-w-7xl mx-auto px-6">
          <h1 className="text-3xl md:text-5xl font-bold mb-4" data-testid="text-about-title">
            Biz Kimiz?
          </h1>
          <div className="flex items-center gap-2 text-muted-foreground text-sm flex-wrap">
            <Link href="/" className="hover:text-foreground transition-colors">Ana Sayfa</Link>
            <span>/</span>
            <span className="text-foreground">Biz Kimiz?</span>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl md:text-3xl font-bold mb-6" data-testid="text-about-heading">
                  Deprem Güvenliğinde Mühendislik Çözümleri
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Türkiye'nin deprem gerçeği doğrultusunda, mevcut yapıların güvenliğinin bilimsel ve yönetmelik esaslı yöntemlerle değerlendirilmesi büyük önem taşımaktadır.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Toprak Projelendirme Mimarlık Mühendislik, TBDY 2018 esaslarına uygun olarak; deprem performans analizi, güçlendirme projelendirme ve yapısal risk değerlendirme alanlarında uzmanlaşmış mühendislik ofisidir.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Kamu yapıları, hastaneler, spor salonları, endüstriyel tesisler, lojistik depolar ve tarihi yapılar başta olmak üzere, yüzlerce yapının teknik analiz ve değerlendirme süreci tarafımızca yürütülmüştür.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-10"
              >
                <h3 className="text-xl font-bold mb-4">Bilimsel Analiz. Saha Deneyimi. Gerçek Mühendislik.</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Yapılar yalnızca hesap programlarıyla değil, saha gözlemleri, malzeme testleri ve mühendislik tecrübesi ile değerlendirilir.
                </p>
                <div className="flex flex-col gap-3">
                  {[
                    "Yerinde donatı tespiti ve karot değerlendirmesi yapılır",
                    "Doğrusal ve doğrusal olmayan analizler gerçekleştirilir",
                    "Performans hedefleri yönetmelik sınırlarına göre kontrol edilir",
                    "Güçlendirme ihtiyacı teknik verilerle belirlenir",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground text-sm">{item}</span>
                    </div>
                  ))}
                </div>
                <p className="text-muted-foreground leading-relaxed mt-4 font-medium">
                  Amacımız; yapının güvenliğini net ve teknik verilerle ortaya koymaktır.
                </p>
              </motion.div>
            </div>

            <div className="lg:col-span-2">
              <Card className="p-6 sticky top-24">
                <div className="flex items-center gap-4 mb-6">
                  <img src={logoImg} alt="Toprak Projelendirme" className="w-14 h-14 rounded-full object-cover" />
                  <div>
                    <h3 className="font-bold text-lg">Toprak Projelendirme</h3>
                    <p className="text-xs text-muted-foreground">Mimarlık Mühendislik</p>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  {nedenBiz.map((item, i) => (
                    <motion.div
                      key={i}
                      custom={i}
                      variants={fadeUp}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-5 h-5 text-primary" />
                      </div>
                      <span className="text-sm font-medium">{item.text}</span>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-muted/30">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-3" data-testid="text-services-heading">Hizmet Alanlarımız</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Deprem mühendisliği alanında kapsamlı hizmetler sunuyoruz
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hizmetler.map((hizmet, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <Card className="p-6 h-full">
                  <h3 className="font-bold mb-4 text-sm">{hizmet.title}</h3>
                  <div className="flex flex-col gap-2">
                    {hizmet.items.map((item, j) => (
                      <div key={j} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-xs text-muted-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-3" data-testid="text-references-heading">Referanslarımız</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Kamu ve özel sektörde tamamladığımız başlıca projeler
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {referanslar.map((ref, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <Card className="p-5 flex items-start gap-3">
                  <Award className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{ref}</span>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
