import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import multer from "multer";
import path from "path";
import fs from "fs";
import session from "express-session";
import slugify from "slugify";

const uploadDir = path.join(process.cwd(), "client", "public", "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const multerStorage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: multerStorage, limits: { fileSize: 10 * 1024 * 1024 } });

function makeSlug(text: string): string {
  return slugify(text, { lower: true, strict: true, locale: "tr" });
}

function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if (!(req.session as any).userId) {
    return res.status(401).json({ message: "Yetkisiz erişim" });
  }
  next();
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.use(
    session({
      secret: process.env.SESSION_SECRET!,
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 },
    })
  );

  // Public API
  app.get("/api/sliders", async (_req, res) => {
    const data = await storage.getSliders();
    res.json(data);
  });

  app.get("/api/services", async (_req, res) => {
    const data = await storage.getServices();
    res.json(data);
  });

  app.get("/api/services/:slug", async (req, res) => {
    const service = await storage.getServiceBySlug(req.params.slug);
    if (!service) return res.status(404).json({ message: "Not found" });
    res.json(service);
  });

  app.get("/api/projects", async (_req, res) => {
    const data = await storage.getProjects();
    res.json(data);
  });

  app.get("/api/projects/:slug", async (req, res) => {
    const project = await storage.getProjectBySlug(req.params.slug);
    if (!project) return res.status(404).json({ message: "Not found" });
    const images = await storage.getProjectImages(project.id);
    res.json({ ...project, images });
  });

  app.get("/api/blog-posts", async (_req, res) => {
    const data = await storage.getBlogPosts();
    res.json(data);
  });

  app.get("/api/blog-posts/:slug", async (req, res) => {
    const post = await storage.getBlogPostBySlug(req.params.slug);
    if (!post) return res.status(404).json({ message: "Not found" });
    res.json(post);
  });

  // Contact form
  app.post("/api/contact", async (req, res) => {
    const { name, phone, email, subject, message } = req.body;
    if (!name || !phone || !message) {
      return res.status(400).json({ message: "Gerekli alanları doldurun" });
    }
    console.log("Yeni iletişim formu:", { name, phone, email, subject, message });
    res.json({ success: true });
  });

  // Admin Auth
  app.post("/api/admin/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await storage.getUserByUsername(username);
    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Hatalı kullanıcı adı veya şifre" });
    }
    (req.session as any).userId = user.id;
    res.json({ id: user.id, username: user.username });
  });

  app.post("/api/admin/logout", (req, res) => {
    req.session.destroy(() => {});
    res.json({ ok: true });
  });

  app.get("/api/admin/me", async (req, res) => {
    const userId = (req.session as any).userId;
    if (!userId) return res.status(401).json({ message: "Not authenticated" });
    const user = await storage.getUser(userId);
    if (!user) return res.status(401).json({ message: "Not found" });
    res.json({ id: user.id, username: user.username });
  });

  // Admin Sliders
  app.post("/api/admin/sliders", requireAdmin, upload.single("image"), async (req, res) => {
    if (!req.file) return res.status(400).json({ message: "Görsel gerekli" });
    const slider = await storage.createSlider({
      topText: req.body.topText || null,
      title: req.body.title,
      description: req.body.description,
      bottomText: req.body.bottomText || null,
      imageUrl: `/uploads/${req.file.filename}`,
      sortOrder: parseInt(req.body.sortOrder || "0"),
    });
    res.json(slider);
  });

  app.put("/api/admin/sliders/:id", requireAdmin, upload.single("image"), async (req, res) => {
    const data: any = {
      topText: req.body.topText || null,
      title: req.body.title,
      description: req.body.description,
      bottomText: req.body.bottomText || null,
      sortOrder: parseInt(req.body.sortOrder || "0"),
    };
    if (req.file) data.imageUrl = `/uploads/${req.file.filename}`;
    const slider = await storage.updateSlider(parseInt(req.params.id), data);
    res.json(slider);
  });

  app.delete("/api/admin/sliders/:id", requireAdmin, async (req, res) => {
    await storage.deleteSlider(parseInt(req.params.id));
    res.json({ ok: true });
  });

  // Admin Services
  app.post("/api/admin/services", requireAdmin, upload.single("image"), async (req, res) => {
    if (!req.file) return res.status(400).json({ message: "Görsel gerekli" });
    const service = await storage.createService({
      title: req.body.title,
      description: req.body.description,
      coverImage: `/uploads/${req.file.filename}`,
      slug: makeSlug(req.body.title),
      sortOrder: parseInt(req.body.sortOrder || "0"),
    });
    res.json(service);
  });

  app.put("/api/admin/services/:id", requireAdmin, upload.single("image"), async (req, res) => {
    const data: any = {
      title: req.body.title,
      description: req.body.description,
      slug: makeSlug(req.body.title),
      sortOrder: parseInt(req.body.sortOrder || "0"),
    };
    if (req.file) data.coverImage = `/uploads/${req.file.filename}`;
    const service = await storage.updateService(parseInt(req.params.id), data);
    res.json(service);
  });

  app.delete("/api/admin/services/:id", requireAdmin, async (req, res) => {
    await storage.deleteService(parseInt(req.params.id));
    res.json({ ok: true });
  });

  // Admin Projects
  app.post("/api/admin/projects", requireAdmin, upload.single("image"), async (req, res) => {
    if (!req.file) return res.status(400).json({ message: "Görsel gerekli" });
    const project = await storage.createProject({
      title: req.body.title,
      description: req.body.description,
      coverImage: `/uploads/${req.file.filename}`,
      slug: makeSlug(req.body.title),
      location: req.body.location || null,
      category: req.body.category || null,
      date: req.body.date || null,
      sortOrder: parseInt(req.body.sortOrder || "0"),
    });
    res.json(project);
  });

  app.put("/api/admin/projects/:id", requireAdmin, upload.single("image"), async (req, res) => {
    const data: any = {
      title: req.body.title,
      description: req.body.description,
      slug: makeSlug(req.body.title),
      location: req.body.location || null,
      category: req.body.category || null,
      date: req.body.date || null,
      sortOrder: parseInt(req.body.sortOrder || "0"),
    };
    if (req.file) data.coverImage = `/uploads/${req.file.filename}`;
    const project = await storage.updateProject(parseInt(req.params.id), data);
    res.json(project);
  });

  app.delete("/api/admin/projects/:id", requireAdmin, async (req, res) => {
    await storage.deleteProject(parseInt(req.params.id));
    res.json({ ok: true });
  });

  app.post("/api/admin/projects/:id/images", requireAdmin, upload.array("images", 20), async (req, res) => {
    const files = req.files as Express.Multer.File[];
    if (!files?.length) return res.status(400).json({ message: "Görseller gerekli" });
    const projectId = parseInt(req.params.id);
    const images = [];
    for (let i = 0; i < files.length; i++) {
      const img = await storage.createProjectImage({
        projectId,
        imageUrl: `/uploads/${files[i].filename}`,
        sortOrder: i,
      });
      images.push(img);
    }
    res.json(images);
  });

  app.delete("/api/admin/project-images/:id", requireAdmin, async (req, res) => {
    await storage.deleteProjectImage(parseInt(req.params.id));
    res.json({ ok: true });
  });

  // Admin Blog
  app.post("/api/admin/blog-posts", requireAdmin, upload.single("image"), async (req, res) => {
    if (!req.file) return res.status(400).json({ message: "Görsel gerekli" });
    const post = await storage.createBlogPost({
      title: req.body.title,
      content: req.body.content,
      coverImage: `/uploads/${req.file.filename}`,
      slug: makeSlug(req.body.title),
    });
    res.json(post);
  });

  app.put("/api/admin/blog-posts/:id", requireAdmin, upload.single("image"), async (req, res) => {
    const data: any = {
      title: req.body.title,
      content: req.body.content,
      slug: makeSlug(req.body.title),
    };
    if (req.file) data.coverImage = `/uploads/${req.file.filename}`;
    const post = await storage.updateBlogPost(parseInt(req.params.id), data);
    res.json(post);
  });

  app.delete("/api/admin/blog-posts/:id", requireAdmin, async (req, res) => {
    await storage.deleteBlogPost(parseInt(req.params.id));
    res.json({ ok: true });
  });

  return httpServer;
}
