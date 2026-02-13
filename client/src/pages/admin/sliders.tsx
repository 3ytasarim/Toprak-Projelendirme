import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Plus, Trash2, Edit } from "lucide-react";
import AdminLayout from "./layout";
import type { Slider } from "@shared/schema";

export default function AdminSliders() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Slider | null>(null);
  const [topText, setTopText] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [bottomText, setBottomText] = useState("");
  const [sortOrder, setSortOrder] = useState("0");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const { toast } = useToast();

  const { data: sliders, isLoading } = useQuery<Slider[]>({ queryKey: ["/api/sliders"] });

  const resetForm = () => {
    setTopText("");
    setTitle("");
    setDescription("");
    setBottomText("");
    setSortOrder("0");
    setImageFile(null);
    setEditing(null);
  };

  const openCreate = () => {
    resetForm();
    setDialogOpen(true);
  };

  const openEdit = (slider: Slider) => {
    setEditing(slider);
    setTopText(slider.topText || "");
    setTitle(slider.title);
    setDescription(slider.description);
    setBottomText(slider.bottomText || "");
    setSortOrder(String(slider.sortOrder));
    setImageFile(null);
    setDialogOpen(true);
  };

  const saveMutation = useMutation({
    mutationFn: async () => {
      const formData = new FormData();
      formData.append("topText", topText);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("bottomText", bottomText);
      formData.append("sortOrder", sortOrder);
      if (imageFile) formData.append("image", imageFile);

      const url = editing ? `/api/admin/sliders/${editing.id}` : "/api/admin/sliders";
      const method = editing ? "PUT" : "POST";
      const res = await fetch(url, { method, body: formData, credentials: "include" });
      if (!res.ok) throw new Error(await res.text());
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/sliders"] });
      setDialogOpen(false);
      resetForm();
      toast({ title: editing ? "Slider güncellendi" : "Slider eklendi" });
    },
    onError: () => toast({ title: "Hata oluştu", variant: "destructive" }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => apiRequest("DELETE", `/api/admin/sliders/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/sliders"] });
      toast({ title: "Slider silindi" });
    },
  });

  return (
    <AdminLayout>
      <div className="flex items-center justify-between gap-4 flex-wrap mb-8">
        <div>
          <h1 className="text-2xl font-bold" data-testid="text-sliders-title">Slider Yönetimi</h1>
          <p className="text-muted-foreground text-sm mt-1">Ana sayfa slider görsellerini yönetin</p>
        </div>
        <Button onClick={openCreate} data-testid="button-add-slider">
          <Plus className="w-4 h-4 mr-2" /> Yeni Slider
        </Button>
      </div>

      {isLoading ? (
        <p className="text-muted-foreground">Yükleniyor...</p>
      ) : !sliders?.length ? (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground">Henüz slider eklenmemiş</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sliders.map((slider) => (
            <Card key={slider.id} className="overflow-visible">
              <div className="overflow-hidden rounded-t-md">
                <img src={slider.imageUrl} alt={slider.title} className="w-full h-40 object-cover" data-testid={`img-slider-admin-${slider.id}`} />
              </div>
              <div className="p-4">
                {slider.topText && <p className="text-xs text-muted-foreground mb-1">{slider.topText}</p>}
                <h3 className="font-semibold text-sm mb-1 line-clamp-1" data-testid={`text-slider-title-${slider.id}`}>{slider.title}</h3>
                <p className="text-muted-foreground text-xs line-clamp-2 mb-1">{slider.description}</p>
                {slider.bottomText && <p className="text-xs text-primary mb-2">{slider.bottomText}</p>}
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => openEdit(slider)} data-testid={`button-edit-slider-${slider.id}`}>
                    <Edit className="w-3.5 h-3.5 mr-1" /> Düzenle
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => deleteMutation.mutate(slider.id)} data-testid={`button-delete-slider-${slider.id}`}>
                    <Trash2 className="w-3.5 h-3.5 mr-1" /> Sil
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editing ? "Slider Düzenle" : "Yeni Slider"}</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              saveMutation.mutate();
            }}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-col gap-2">
              <Label>Üst Yazı (opsiyonel)</Label>
              <Input value={topText} onChange={(e) => setTopText(e.target.value)} placeholder="Ör: Profesyonel Mühendislik" data-testid="input-slider-top-text" />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Başlık</Label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} required data-testid="input-slider-title" />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Açıklama</Label>
              <Textarea value={description} onChange={(e) => setDescription(e.target.value)} required data-testid="input-slider-description" />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Alt Yazı (opsiyonel)</Label>
              <Input value={bottomText} onChange={(e) => setBottomText(e.target.value)} placeholder="Ör: Statik Proje | Güçlendirme" data-testid="input-slider-bottom-text" />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Sıra</Label>
              <Input type="number" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} data-testid="input-slider-order" />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Görsel {editing ? "(boş bırakırsanız mevcut görsel kalır)" : ""}</Label>
              <Input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} data-testid="input-slider-image" />
            </div>
            <Button type="submit" disabled={saveMutation.isPending} data-testid="button-save-slider">
              {saveMutation.isPending ? "Kaydediliyor..." : "Kaydet"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
