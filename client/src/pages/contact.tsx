import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import PublicLayout from "@/components/public-layout";
import officeImg from "@assets/Ofis_Foto_007_1771000897847.webp";

export default function Contact() {
  const { toast } = useToast();
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.message) {
      toast({ title: "Lütfen gerekli alanları doldurun", variant: "destructive" });
      return;
    }
    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        toast({ title: "Mesajınız gönderildi", description: "En kısa sürede size dönüş yapacağız." });
        setForm({ name: "", email: "", phone: "", subject: "", message: "" });
      } else {
        toast({ title: "Bir hata oluştu", variant: "destructive" });
      }
    } catch {
      toast({ title: "Bir hata oluştu", variant: "destructive" });
    } finally {
      setSending(false);
    }
  };

  return (
    <PublicLayout>
      <section className="relative py-28 md:py-36 overflow-hidden">
        <img src={officeImg} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative max-w-7xl mx-auto px-6">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4" data-testid="text-page-title">İletişim</h1>
          <div className="flex items-center gap-2 text-white/60 text-sm">
            <Link href="/" className="hover:text-white transition-colors">Ana Sayfa</Link>
            <span>/</span>
            <span className="text-white">İletişim</span>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <Card className="p-6 text-center">
              <div className="w-14 h-14 rounded-md bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Telefon</h3>
              <a href="tel:+905066232636" className="text-muted-foreground text-sm hover:text-primary transition-colors" data-testid="link-contact-phone">
                0 (506) 623 26 36
              </a>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-14 h-14 rounded-md bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">E-Posta</h3>
              <a href="mailto:info@toprakprojelendirme.com" className="text-muted-foreground text-sm hover:text-primary transition-colors" data-testid="link-contact-email">
                info@toprakprojelendirme.com
              </a>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-14 h-14 rounded-md bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Adres</h3>
              <p className="text-muted-foreground text-sm">
                Güzelyalı Mah. Bağdat Cad. No:95/7<br />Pendik / İstanbul
              </p>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-14 h-14 rounded-md bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Çalışma Saatleri</h3>
              <p className="text-muted-foreground text-sm">
                Pazartesi - Cuma: 09:00 - 18:30
              </p>
              <p className="text-muted-foreground text-sm">
                Cumartesi: 09:00 - 14:00
              </p>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
              <h2 className="text-2xl font-bold mb-2" data-testid="text-form-title">Bize Ulaşın</h2>
              <p className="text-muted-foreground mb-6">Projeleriniz hakkında bilgi almak veya teklif talep etmek için formu doldurun.</p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4" data-testid="form-contact">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="name">Ad Soyad *</Label>
                    <Input
                      id="name"
                      placeholder="Adınız Soyadınız"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      data-testid="input-name"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="email">E-Posta</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="ornek@email.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      data-testid="input-email"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="phone">Telefon *</Label>
                    <Input
                      id="phone"
                      placeholder="0 (5XX) XXX XX XX"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      data-testid="input-phone"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="subject">Konu</Label>
                    <Input
                      id="subject"
                      placeholder="Konu başlığı"
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      data-testid="input-subject"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="message">Mesajınız *</Label>
                  <Textarea
                    id="message"
                    placeholder="Mesajınızı yazın..."
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    data-testid="input-message"
                  />
                </div>
                <Button type="submit" disabled={sending} className="gap-2 self-start" data-testid="button-submit-contact">
                  <Send className="w-4 h-4" />
                  {sending ? "Gönderiliyor..." : "Mesaj Gönder"}
                </Button>
              </form>
            </div>

            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-bold mb-2" data-testid="text-map-title">Konumumuz</h2>
              <div className="rounded-md overflow-hidden border flex-1 min-h-[400px]">
                <iframe
                  src="https://maps.google.com/maps?q=40.8572227,29.2855475&hl=tr&z=16&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: 400 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Toprak Projelendirme Konum"
                  data-testid="map-iframe"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
