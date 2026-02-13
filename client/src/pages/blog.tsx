import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import PublicLayout from "@/components/public-layout";
import type { BlogPost } from "@shared/schema";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function Blog() {
  const { data: posts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog-posts"],
  });

  return (
    <PublicLayout>
      <section className="relative py-20 md:py-28 overflow-hidden">
        <img src="/images/slider-2.png" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative max-w-7xl mx-auto px-6">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4" data-testid="text-page-title">Blog</h1>
          <div className="flex items-center gap-2 text-white/60 text-sm">
            <Link href="/" className="hover:text-white transition-colors">Ana Sayfa</Link>
            <span>/</span>
            <span className="text-white">Blog</span>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {isLoading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="h-80 rounded-md" />
                ))
              : posts?.map((post) => (
                  <motion.div key={post.id} variants={fadeUp}>
                    <Link href={`/blog/${post.slug}`}>
                      <Card className="group overflow-visible hover-elevate cursor-pointer h-full">
                        <div className="relative overflow-hidden rounded-t-md">
                          <img
                            src={post.coverImage}
                            alt={post.title}
                            className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-105"
                            data-testid={`img-blog-${post.id}`}
                          />
                        </div>
                        <div className="p-6">
                          <p className="text-xs text-muted-foreground mb-2">
                            {new Date(post.createdAt).toLocaleDateString("tr-TR", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </p>
                          <h3 className="font-semibold text-base line-clamp-2 mb-2" data-testid={`text-blog-title-${post.id}`}>
                            {post.title}
                          </h3>
                          <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed">
                            {post.content.substring(0, 150)}...
                          </p>
                        </div>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
          </motion.div>
        </div>
      </section>
    </PublicLayout>
  );
}
