import { storage } from "./storage";
import { db } from "./db";
import { users, sliders, services, projects, projectImages, blogPosts } from "@shared/schema";

export async function seed() {
  const existingUsers = await db.select().from(users);
  if (existingUsers.length > 0) return;

  await storage.createUser({ username: "admin", password: "admin123" });

  await storage.createSlider({
    topText: "Profesyonel Mühendislik Hizmetleri",
    title: "Yapılarınızın güvenliği ve dayanıklılığı için profesyonel çözümler",
    description: "Uzman mühendis kadromuz, konut ve ticari yapılar için deprem yönetmeliğine uygun taşıyıcı sistem tasarımı ve güçlendirme çözümleri hazırlayarak güvenli yaşam alanları oluşturuyor.",
    bottomText: "Statik Proje | Güçlendirme | Deprem Analizi",
    imageUrl: "/images/slider-1.png",
    sortOrder: 0,
  });

  await storage.createSlider({
    topText: "Enerji Verimliliği Çözümleri",
    title: "Binalarınızın enerji verimliliğini artırmak için yanınızdayız",
    description: "Enerji kimlik belgeleri ve teknik raporlarımız ile İstanbul'daki tüm konut ve ticari yapılar için güvenli, sürdürülebilir ve mevzuata uygun çözümler sağlıyoruz.",
    bottomText: "Enerji Kimlik Belgesi | Teknik Raporlama",
    imageUrl: "/images/slider-2.png",
    sortOrder: 1,
  });

  await storage.createSlider({
    topText: "Modern Mimari Tasarım",
    title: "Modern mimari projeler ile yaşam alanlarını tasarlıyoruz",
    description: "Konut, ofis ve ticari alanlarda 3D modelleme, avan proje ve uygulama çizimleri ile kullanıcı ihtiyaçlarına uygun modern ve fonksiyonel mekanlar sunuyoruz.",
    bottomText: "3D Modelleme | Mimari Proje | İç Mekan Tasarımı",
    imageUrl: "/images/slider-3.png",
    sortOrder: 2,
  });

  const s1 = await storage.createService({
    title: "Statik Proje Hizmeti",
    description: "Yapılarınızın taşıyıcı sistemlerinin deprem yönetmeliğine uygun şekilde tasarlanması ve projelendirilmesi hizmetini sunuyoruz. Uzman mühendis kadromuz, mevcut yapıların güçlendirme projeleri ile yeni yapıların taşıyıcı sistem tasarımlarını en güncel yönetmeliklere uygun olarak hazırlamaktadır.\n\nStatik proje hizmetimiz kapsamında betonarme, çelik ve ahşap taşıyıcı sistemlerin analizi ve tasarımı yapılmaktadır. Deprem performansı değerlendirmesi ve güçlendirme projeleri, yapıların mevcut durumlarının detaylı incelenmesiyle hazırlanmaktadır.",
    coverImage: "/images/service-1.png",
    slug: "statik-proje-hizmeti",
    sortOrder: 0,
  });

  const s2 = await storage.createService({
    title: "Kentsel Dönüşüm Projeleri",
    description: "Kentsel dönüşüm kapsamında riskli yapıların tespit edilmesi, yıkım ve yeniden yapım süreçlerinin yönetilmesi hizmetlerini sunuyoruz. Belediye ve ilgili kurumlarla koordineli çalışarak sürecin sorunsuz ilerlemesini sağlıyoruz.\n\nKentsel dönüşüm projelerinde hak sahipliği süreçleri, ruhsat başvuruları ve imar planı uyumluluğu konularında profesyonel danışmanlık hizmeti veriyoruz.",
    coverImage: "/images/service-2.png",
    slug: "kentsel-donusum-projeleri",
    sortOrder: 1,
  });

  const s3 = await storage.createService({
    title: "Mimari Proje Hizmeti",
    description: "Modern ve fonksiyonel yaşam alanları tasarlamak için mimari proje hizmetleri sunuyoruz. 3D modelleme, avan proje ve uygulama çizimleri ile kullanıcı ihtiyaçlarına uygun mekanlar oluşturuyoruz.\n\nKonut, ofis, ticari ve endüstriyel yapılarda iç ve dış mekan tasarımı, peyzaj düzenlemesi ve kentsel tasarım projeleri hazırlıyoruz.",
    coverImage: "/images/service-3.png",
    slug: "mimari-proje-hizmeti",
    sortOrder: 2,
  });

  const s4 = await storage.createService({
    title: "Enerji Kimlik Belgesi",
    description: "Yapıların enerji performansının belirlenmesi ve yasal gerekliliklerin yerine getirilmesi için enerji kimlik belgesi düzenleme hizmeti sunuyoruz. Binalarda enerji verimliliği ölçümleri ve raporlaması yapıyoruz.\n\nEnerji kimlik belgesi, binanın yalıtım durumu, ısıtma-soğutma sistemleri ve aydınlatma verileri dikkate alınarak hazırlanmaktadır.",
    coverImage: "/images/service-4.png",
    slug: "enerji-kimlik-belgesi",
    sortOrder: 3,
  });

  const p1 = await storage.createProject({
    title: "Çatı Katı Yükseltme ve Tadilat (Bakırköy)",
    description: "Mevcut yapının çatı katı yükseltme ve tadilat çalışması kapsamında statik analiz, güçlendirme projelendirmesi ve uygulama süreçleri tarafımızca yönetilmiştir.\n\nÇatı katı yükseltme çalışmalarında, yapının taşıyıcı sistemi detaylı olarak incelenmiş; gerekli güçlendirme ve iyileştirmeler yapılarak güvenli ve uzun ömürlü çözümler üretilmiştir. Isı ve su yalıtımı, çatı kaplama sistemleri, iç mekan düzenlemeleri ve mimari detaylar, estetik ve fonksiyonellik gözetilerek modern standartlara uygun biçimde uygulanmıştır.",
    coverImage: "/images/project-2.png",
    slug: "cati-kati-yukseltme-ve-tadilat-bakirkoy",
    location: "Bakırköy / İstanbul",
    category: "Tamamlanan Projeler",
    date: "01-03-2023",
    sortOrder: 0,
  });

  const p2 = await storage.createProject({
    title: "Banyo Tadilat (Sarıyer)",
    description: "Sarıyer ilçesinde konut banyosu komple tadilat projesi gerçekleştirilmiştir. Modern ve fonksiyonel bir banyo tasarımı oluşturulmuş, su tesisatı yenilenmiş ve yüksek kaliteli malzemeler kullanılmıştır.\n\nProjede seramik döşeme, duş sistemi kurulumu, aydınlatma düzenlemesi ve dolap montajı işlemleri profesyonel ekibimiz tarafından tamamlanmıştır.",
    coverImage: "/images/project-1.png",
    slug: "banyo-tadilat-sariyer",
    location: "Sarıyer / İstanbul",
    category: "Tamamlanan Projeler",
    date: "15-06-2023",
    sortOrder: 1,
  });

  const p3 = await storage.createProject({
    title: "Konut Tadilatı (Başakşehir)",
    description: "Başakşehir'de kapsamlı konut tadilat projesi gerçekleştirilmiştir. Salon, mutfak ve yatak odaları modern standartlara uygun olarak yenilenmiştir.\n\nElektrik ve tesisat altyapısı güncellenerek, enerji verimli sistemler kurulmuştur. İç mekan tasarımı müşteri beklentilerine uygun olarak profesyonel ekibimiz tarafından tamamlanmıştır.",
    coverImage: "/images/project-3.png",
    slug: "konut-tadilati-basaksehir",
    location: "Başakşehir / İstanbul",
    category: "Tamamlanan Projeler",
    date: "20-09-2023",
    sortOrder: 2,
  });

  await storage.createBlogPost({
    title: "İstanbul'da Kentsel Dönüşüm Süreci ve Dikkat Edilmesi Gerekenler",
    content: "İstanbul'da kentsel dönüşüm süreci, yapıların deprem güvenliği açısından değerlendirilmesi ile başlamaktadır. Riskli yapı tespiti yaptırmak isteyen bina sahipleri, lisanslı kuruluşlara başvurarak yapılarının detaylı incelemesini yaptırabilirler.\n\nKentsel dönüşüm sürecinde dikkat edilmesi gereken en önemli konular arasında hak sahipliği belgeleri, imar durumu, ruhsat süreçleri ve müteahhit seçimi yer almaktadır. Her aşamada profesyonel mühendislik desteği almak, sürecin sorunsuz ilerlemesi için kritik öneme sahiptir.\n\nToprak Projelendirme olarak, kentsel dönüşüm sürecinin her aşamasında yanınızdayız. Riskli yapı tespitinden yeni yapının projelendirilmesine kadar tüm süreçleri profesyonel ekibimizle yönetiyoruz.",
    coverImage: "/images/service-2.png",
    slug: "istanbul-da-kentsel-donusum-sureci",
  });

  await storage.createBlogPost({
    title: "Deprem Yönetmeliğine Uygun Yapı Tasarımının Önemi",
    content: "Türkiye deprem kuşağında yer alan bir ülke olarak, yapıların deprem yönetmeliğine uygun tasarlanması büyük önem taşımaktadır. Güncel deprem yönetmeliği, yapıların taşıyıcı sistemlerinin belirli standartlara uygun olmasını zorunlu kılmaktadır.\n\nDeprem yönetmeliğine uygun yapı tasarımı, betonarme, çelik veya karma taşıyıcı sistemlerin doğru hesaplanması ve uygulanmasını kapsamaktadır. Bu süreçte zemin etüdü, yapısal analiz ve performans değerlendirmesi gibi aşamalar titizlikle yürütülmelidir.\n\nToprak Projelendirme olarak, mevcut yapıların güçlendirme projeleri ile yeni yapıların deprem yönetmeliğine uygun tasarımlarını uzman mühendis kadromuzla hazırlıyoruz.",
    coverImage: "/images/service-1.png",
    slug: "deprem-yonetmeligine-uygun-yapi-tasarimi",
  });

  await storage.createBlogPost({
    title: "Enerji Kimlik Belgesi Nedir ve Neden Gereklidir?",
    content: "Enerji Kimlik Belgesi (EKB), bir binanın enerji tüketim miktarını ve karbon emisyon seviyesini gösteren resmi bir belgedir. Türkiye'de 2020 yılından itibaren satış ve kiralama işlemlerinde enerji kimlik belgesi zorunlu hale getirilmiştir.\n\nEnerji kimlik belgesi, binanın yalıtım durumu, pencere ve cam özellikleri, ısıtma ve soğutma sistemleri, sıcak su üretim yöntemi ve aydınlatma verileri dikkate alınarak düzenlenmektedir.\n\nToprak Projelendirme olarak, konut ve ticari yapılar için enerji kimlik belgesi düzenleme hizmeti sunuyoruz. Uzman ekibimiz, binanızın enerji performansını en doğru şekilde değerlendirerek belgenizi en kısa sürede hazırlamaktadır.",
    coverImage: "/images/service-4.png",
    slug: "enerji-kimlik-belgesi-nedir",
  });

  await storage.createSlider({
    topText: "Toprak Projelendirme",
    title: "Güvenilir mühendislik çözümleri ile projelerinizi hayata geçiriyoruz",
    description: "Pendik merkezli ofisimizden İstanbul genelinde konut, ticari ve endüstriyel yapılar için kapsamlı mühendislik ve projelendirme hizmetleri sunuyoruz.",
    bottomText: "Statik Proje | Mimari Proje | Enerji Kimlik Belgesi",
    imageUrl: "/uploads/building-office.webp",
    sortOrder: 3,
  });

  console.log("Seed data inserted successfully");
}
