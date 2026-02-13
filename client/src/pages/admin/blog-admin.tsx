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
import type { BlogPost } from "@shared/schema";

export default function AdminBlog() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const { toast } = useToast();

  const { data: posts, isLoading } = useQuery<BlogPost[]>({ queryKey: ["/api/blog-posts"] });

  const resetForm = () => { setTitle(""); setContent(""); setImageFile(null); setEditing(null); };
  const openCreate = () => { resetForm(); setDialogOpen(true); };
  const openEdit = (p: BlogPost) => {
    setEditing(p); setTitle(p.title); setContent(p.content); setImageFile(null); setDialogOpen(true);
  };

  const saveMutation = useMutation({
    mutationFn: async () => {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      if (imageFile) formData.append("image", imageFile);
      const url = editing ? `/api/admin/blog-posts/${editing.id}` : "/api/admin/blog-posts";
      const method = editing ? "PUT" : "POST";
      const res = await fetch(url, { method, body: formData, credentials: "include" });
      if (!res.ok) throw new Error(await res.text());
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/blog-posts"] });
      setDialogOpen(false); resetForm();
      toast({ title: editing ? "Yazı güncellendi" : "Yazı eklendi" });
    },
    onError: () => toast({ title: "Hata oluştu", variant: "destructive" }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => apiRequest("DELETE", `/api/admin/blog-posts/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/blog-posts"] });
      toast({ title: "Yazı silindi" });
    },
  });

  return (
    <AdminLayout>
      <div className="flex items-center justify-between gap-4 flex-wrap mb-8">
        <div>
          <h1 className="text-2xl font-bold" data-testid="text-blog-admin-title">Blog Yönetimi</h1>
          <p className="text-muted-foreground text-sm mt-1">Blog yazılarınızı yönetin</p>
        </div>
        <Button onClick={openCreate} data-testid="button-add-blog">
          <Plus className="w-4 h-4 mr-2" /> Yeni Yazı
        </Button>
      </div>

      {isLoading ? (
        <p className="text-muted-foreground">Yükleniyor...</p>
      ) : !posts?.length ? (
        <Card className="p-12 text-center"><p className="text-muted-foreground">Henüz yazı eklenmemiş</p></Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Card key={post.id} className="overflow-visible">
              <div className="overflow-hidden rounded-t-md">
                <img src={post.coverImage} alt={post.title} className="w-full h-40 object-cover" />
              </div>
              <div className="p-4">
                <p className="text-xs text-muted-foreground mb-1">
                  {new Date(post.createdAt).toLocaleDateString("tr-TR")}
                </p>
                <h3 className="font-semibold text-sm mb-1 line-clamp-1">{post.title}</h3>
                <p className="text-muted-foreground text-xs line-clamp-2 mb-3">{post.content}</p>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => openEdit(post)} data-testid={`button-edit-blog-${post.id}`}>
                    <Edit className="w-3.5 h-3.5 mr-1" /> Düzenle
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => deleteMutation.mutate(post.id)} data-testid={`button-delete-blog-${post.id}`}>
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
            <DialogTitle>{editing ? "Yazı Düzenle" : "Yeni Yazı"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={(e) => { e.preventDefault(); saveMutation.mutate(); }} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label>Başlık</Label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} required data-testid="input-blog-title" />
            </div>
            <div className="flex flex-col gap-2">
              <Label>İçerik</Label>
              <Textarea value={content} onChange={(e) => setContent(e.target.value)} required rows={8} data-testid="input-blog-content" />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Kapak Görseli {editing ? "(boş bırakırsanız mevcut kalır)" : ""}</Label>
              <Input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} data-testid="input-blog-image" />
            </div>
            <Button type="submit" disabled={saveMutation.isPending} data-testid="button-save-blog">
              {saveMutation.isPending ? "Kaydediliyor..." : "Kaydet"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
