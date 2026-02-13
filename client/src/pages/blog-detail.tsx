import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";
import PublicLayout from "@/components/public-layout";
import type { BlogPost } from "@shared/schema";

export default function BlogDetail() {
  const params = useParams<{ slug: string }>();
  const { data: post, isLoading } = useQuery<BlogPost>({
    queryKey: ["/api/blog-posts", params.slug],
  });

  if (isLoading) {
    return (
      <PublicLayout>
        <Skeleton className="w-full h-64 rounded-none" />
        <div className="max-w-4xl mx-auto px-6 py-12">
          <Skeleton className="h-10 w-64 mb-4" />
          <Skeleton className="h-6 w-full mb-2" />
          <Skeleton className="h-6 w-3/4" />
        </div>
      </PublicLayout>
    );
  }

  if (!post) {
    return (
      <PublicLayout>
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Yazı bulunamadı</h1>
          <Link href="/blog" className="text-primary">Blog'a dön</Link>
        </div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <section className="relative py-20 md:py-28 overflow-hidden">
        <img src={post.coverImage} alt={post.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative max-w-7xl mx-auto px-6">
          <p className="text-white/60 text-sm mb-3">
            {new Date(post.createdAt).toLocaleDateString("tr-TR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4" data-testid="text-blog-detail-title">
            {post.title}
          </h1>
          <div className="flex items-center gap-2 text-white/60 text-sm flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">Ana Sayfa</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-white">{post.title}</span>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="prose prose-lg max-w-none" data-testid="text-blog-content">
            {post.content.split("\n").map((paragraph, i) => (
              <p key={i} className="text-muted-foreground leading-relaxed mb-4">{paragraph}</p>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
