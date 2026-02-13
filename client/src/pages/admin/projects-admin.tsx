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
import { Plus, Trash2, Edit, ImagePlus } from "lucide-react";
import AdminLayout from "./layout";
import type { Project, ProjectImage } from "@shared/schema";

export default function AdminProjects() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [imagesDialogOpen, setImagesDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [selectedProject, setSelectedProject] = useState<(Project & { images?: ProjectImage[] }) | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [sortOrder, setSortOrder] = useState("0");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [galleryFiles, setGalleryFiles] = useState<FileList | null>(null);
  const { toast } = useToast();

  const { data: projects, isLoading } = useQuery<Project[]>({ queryKey: ["/api/projects"] });

  const resetForm = () => {
    setTitle(""); setDescription(""); setLocation(""); setCategory(""); setDate(""); setSortOrder("0"); setImageFile(null); setEditing(null);
  };

  const openCreate = () => { resetForm(); setDialogOpen(true); };
  const openEdit = (p: Project) => {
    setEditing(p); setTitle(p.title); setDescription(p.description); setLocation(p.location || "");
    setCategory(p.category || ""); setDate(p.date || ""); setSortOrder(String(p.sortOrder));
    setImageFile(null); setDialogOpen(true);
  };

  const openImages = async (project: Project) => {
    const res = await fetch(`/api/projects/${project.slug}`, { credentials: "include" });
    const data = await res.json();
    setSelectedProject(data);
    setGalleryFiles(null);
    setImagesDialogOpen(true);
  };

  const saveMutation = useMutation({
    mutationFn: async () => {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("location", location);
      formData.append("category", category);
      formData.append("date", date);
      formData.append("sortOrder", sortOrder);
      if (imageFile) formData.append("image", imageFile);
      const url = editing ? `/api/admin/projects/${editing.id}` : "/api/admin/projects";
      const method = editing ? "PUT" : "POST";
      const res = await fetch(url, { method, body: formData, credentials: "include" });
      if (!res.ok) throw new Error(await res.text());
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      setDialogOpen(false); resetForm();
      toast({ title: editing ? "Proje güncellendi" : "Proje eklendi" });
    },
    onError: () => toast({ title: "Hata oluştu", variant: "destructive" }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => apiRequest("DELETE", `/api/admin/projects/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      toast({ title: "Proje silindi" });
    },
  });

  const uploadGalleryMutation = useMutation({
    mutationFn: async () => {
      if (!selectedProject || !galleryFiles?.length) return;
      const formData = new FormData();
      Array.from(galleryFiles).forEach((f) => formData.append("images", f));
      const res = await fetch(`/api/admin/projects/${selectedProject.id}/images`, {
        method: "POST", body: formData, credentials: "include",
      });
      if (!res.ok) throw new Error(await res.text());
      return res.json();
    },
    onSuccess: async () => {
      if (selectedProject) {
        const res = await fetch(`/api/projects/${selectedProject.slug}`, { credentials: "include" });
        const data = await res.json();
        setSelectedProject(data);
      }
      setGalleryFiles(null);
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      toast({ title: "Görseller yüklendi" });
    },
    onError: () => toast({ title: "Hata oluştu", variant: "destructive" }),
  });

  const deleteImageMutation = useMutation({
    mutationFn: async (imageId: number) => {
      await apiRequest("DELETE", `/api/admin/project-images/${imageId}`);
    },
    onSuccess: async () => {
      if (selectedProject) {
        const res = await fetch(`/api/projects/${selectedProject.slug}`, { credentials: "include" });
        const data = await res.json();
        setSelectedProject(data);
      }
      toast({ title: "Görsel silindi" });
    },
  });

  return (
    <AdminLayout>
      <div className="flex items-center justify-between gap-4 flex-wrap mb-8">
        <div>
          <h1 className="text-2xl font-bold" data-testid="text-projects-admin-title">Proje Yönetimi</h1>
          <p className="text-muted-foreground text-sm mt-1">Projelerinizi yönetin</p>
        </div>
        <Button onClick={openCreate} data-testid="button-add-project">
          <Plus className="w-4 h-4 mr-2" /> Yeni Proje
        </Button>
      </div>

      {isLoading ? (
        <p className="text-muted-foreground">Yükleniyor...</p>
      ) : !projects?.length ? (
        <Card className="p-12 text-center"><p className="text-muted-foreground">Henüz proje eklenmemiş</p></Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="overflow-visible">
              <div className="overflow-hidden rounded-t-md">
                <img src={project.coverImage} alt={project.title} className="w-full h-40 object-cover" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-sm mb-1 line-clamp-1">{project.title}</h3>
                <p className="text-muted-foreground text-xs mb-3">{project.location}</p>
                <div className="flex gap-2 flex-wrap">
                  <Button size="sm" variant="outline" onClick={() => openEdit(project)} data-testid={`button-edit-project-${project.id}`}>
                    <Edit className="w-3.5 h-3.5 mr-1" /> Düzenle
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => openImages(project)} data-testid={`button-images-project-${project.id}`}>
                    <ImagePlus className="w-3.5 h-3.5 mr-1" /> Görseller
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => deleteMutation.mutate(project.id)} data-testid={`button-delete-project-${project.id}`}>
                    <Trash2 className="w-3.5 h-3.5 mr-1" /> Sil
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing ? "Proje Düzenle" : "Yeni Proje"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={(e) => { e.preventDefault(); saveMutation.mutate(); }} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label>Proje Adı</Label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} required data-testid="input-project-title" />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Açıklama</Label>
              <Textarea value={description} onChange={(e) => setDescription(e.target.value)} required rows={5} data-testid="input-project-description" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label>Konum</Label>
                <Input value={location} onChange={(e) => setLocation(e.target.value)} data-testid="input-project-location" />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Kategori</Label>
                <Input value={category} onChange={(e) => setCategory(e.target.value)} data-testid="input-project-category" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label>Tarih</Label>
                <Input value={date} onChange={(e) => setDate(e.target.value)} placeholder="örn: 01-03-2023" data-testid="input-project-date" />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Sıra</Label>
                <Input type="number" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} data-testid="input-project-order" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label>Kapak Görseli {editing ? "(boş bırakırsanız mevcut kalır)" : ""}</Label>
              <Input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} data-testid="input-project-image" />
            </div>
            <Button type="submit" disabled={saveMutation.isPending} data-testid="button-save-project">
              {saveMutation.isPending ? "Kaydediliyor..." : "Kaydet"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={imagesDialogOpen} onOpenChange={setImagesDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Proje Görselleri - {selectedProject?.title}</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 flex-wrap">
              <Input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => setGalleryFiles(e.target.files)}
                className="flex-1"
                data-testid="input-gallery-images"
              />
              <Button
                onClick={() => uploadGalleryMutation.mutate()}
                disabled={!galleryFiles?.length || uploadGalleryMutation.isPending}
                data-testid="button-upload-gallery"
              >
                {uploadGalleryMutation.isPending ? "Yükleniyor..." : "Yükle"}
              </Button>
            </div>

            {selectedProject?.images?.length ? (
              <div className="grid grid-cols-3 gap-3">
                {selectedProject.images.map((img) => (
                  <div key={img.id} className="relative group rounded-md overflow-hidden">
                    <img src={img.imageUrl} alt="" className="w-full h-28 object-cover" />
                    <button
                      onClick={() => deleteImageMutation.mutate(img.id)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-md p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ visibility: "visible" }}
                      data-testid={`button-delete-image-${img.id}`}
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm text-center py-6">Henüz görsel eklenmemiş</p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
