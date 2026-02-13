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
import type { Service } from "@shared/schema";

export default function AdminServices() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Service | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [sortOrder, setSortOrder] = useState("0");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const { toast } = useToast();

  const { data: services, isLoading } = useQuery<Service[]>({ queryKey: ["/api/services"] });

  const resetForm = () => {
    setTitle(""); setDescription(""); setSortOrder("0"); setImageFile(null); setEditing(null);
  };

  const openCreate = () => { resetForm(); setDialogOpen(true); };
  const openEdit = (s: Service) => {
    setEditing(s); setTitle(s.title); setDescription(s.description); setSortOrder(String(s.sortOrder)); setImageFile(null); setDialogOpen(true);
  };

  const saveMutation = useMutation({
    mutationFn: async () => {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("sortOrder", sortOrder);
      if (imageFile) formData.append("image", imageFile);
      const url = editing ? `/api/admin/services/${editing.id}` : "/api/admin/services";
      const method = editing ? "PUT" : "POST";
      const res = await fetch(url, { method, body: formData, credentials: "include" });
      if (!res.ok) throw new Error(await res.text());
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/services"] });
      setDialogOpen(false); resetForm();
      toast({ title: editing ? "Hizmet güncellendi" : "Hizmet eklendi" });
    },
    onError: () => toast({ title: "Hata oluştu", variant: "destructive" }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => apiRequest("DELETE", `/api/admin/services/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/services"] });
      toast({ title: "Hizmet silindi" });
    },
  });

  return (
    <AdminLayout>
      <div className="flex items-center justify-between gap-4 flex-wrap mb-8">
        <div>
          <h1 className="text-2xl font-bold" data-testid="text-services-admin-title">Hizmet Yönetimi</h1>
          <p className="text-muted-foreground text-sm mt-1">Hizmetlerinizi yönetin</p>
        </div>
        <Button onClick={openCreate} data-testid="button-add-service">
          <Plus className="w-4 h-4 mr-2" /> Yeni Hizmet
        </Button>
      </div>

      {isLoading ? (
        <p className="text-muted-foreground">Yükleniyor...</p>
      ) : !services?.length ? (
        <Card className="p-12 text-center"><p className="text-muted-foreground">Henüz hizmet eklenmemiş</p></Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Card key={service.id} className="overflow-visible">
              <div className="overflow-hidden rounded-t-md">
                <img src={service.coverImage} alt={service.title} className="w-full h-40 object-cover" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-sm mb-1 line-clamp-1">{service.title}</h3>
                <p className="text-muted-foreground text-xs line-clamp-2 mb-3">{service.description}</p>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => openEdit(service)} data-testid={`button-edit-service-${service.id}`}>
                    <Edit className="w-3.5 h-3.5 mr-1" /> Düzenle
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => deleteMutation.mutate(service.id)} data-testid={`button-delete-service-${service.id}`}>
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
            <DialogTitle>{editing ? "Hizmet Düzenle" : "Yeni Hizmet"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={(e) => { e.preventDefault(); saveMutation.mutate(); }} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label>Başlık</Label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} required data-testid="input-service-title" />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Açıklama</Label>
              <Textarea value={description} onChange={(e) => setDescription(e.target.value)} required rows={5} data-testid="input-service-description" />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Sıra</Label>
              <Input type="number" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} data-testid="input-service-order" />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Kapak Görseli {editing ? "(boş bırakırsanız mevcut kalır)" : ""}</Label>
              <Input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} data-testid="input-service-image" />
            </div>
            <Button type="submit" disabled={saveMutation.isPending} data-testid="button-save-service">
              {saveMutation.isPending ? "Kaydediliyor..." : "Kaydet"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
