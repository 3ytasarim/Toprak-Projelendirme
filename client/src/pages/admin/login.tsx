import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import logoImg from "@assets/murat_logo_1770998463808.jpeg";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await apiRequest("POST", "/api/admin/login", { username, password });
      await queryClient.invalidateQueries({ queryKey: ["/api/admin/me"] });
      setLocation("/admin");
    } catch {
      toast({ title: "Giriş başarısız", description: "Kullanıcı adı veya şifre hatalı", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-sm p-8">
        <div className="text-center mb-8">
          <img src={logoImg} alt="Toprak" className="w-16 h-16 rounded-md object-cover mx-auto mb-4" />
          <h1 className="text-xl font-bold" data-testid="text-login-title">Admin Paneli</h1>
          <p className="text-sm text-muted-foreground mt-1">Yönetim paneline giriş yapın</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="username">Kullanıcı Adı</Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              data-testid="input-username"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Şifre</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              data-testid="input-password"
            />
          </div>
          <Button type="submit" disabled={loading} className="w-full" data-testid="button-login">
            {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
          </Button>
        </form>
      </Card>
    </div>
  );
}
