import {
  type User, type InsertUser,
  type Slider, type InsertSlider,
  type Service, type InsertService,
  type Project, type InsertProject,
  type ProjectImage, type InsertProjectImage,
  type BlogPost, type InsertBlogPost,
  users, sliders, services, projects, projectImages, blogPosts,
} from "@shared/schema";
import { db } from "./db";
import { eq, asc, desc } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  getSliders(): Promise<Slider[]>;
  getSlider(id: number): Promise<Slider | undefined>;
  createSlider(slider: InsertSlider): Promise<Slider>;
  updateSlider(id: number, slider: Partial<InsertSlider>): Promise<Slider | undefined>;
  deleteSlider(id: number): Promise<void>;

  getServices(): Promise<Service[]>;
  getService(id: number): Promise<Service | undefined>;
  getServiceBySlug(slug: string): Promise<Service | undefined>;
  createService(service: InsertService): Promise<Service>;
  updateService(id: number, service: Partial<InsertService>): Promise<Service | undefined>;
  deleteService(id: number): Promise<void>;

  getProjects(): Promise<Project[]>;
  getProject(id: number): Promise<Project | undefined>;
  getProjectBySlug(slug: string): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: number, project: Partial<InsertProject>): Promise<Project | undefined>;
  deleteProject(id: number): Promise<void>;

  getProjectImages(projectId: number): Promise<ProjectImage[]>;
  createProjectImage(image: InsertProjectImage): Promise<ProjectImage>;
  deleteProjectImage(id: number): Promise<void>;

  getBlogPosts(): Promise<BlogPost[]>;
  getBlogPost(id: number): Promise<BlogPost | undefined>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: number, post: Partial<InsertBlogPost>): Promise<BlogPost | undefined>;
  deleteBlogPost(id: number): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number) {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string) {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(user: InsertUser) {
    const [created] = await db.insert(users).values(user).returning();
    return created;
  }

  async getSliders() {
    return db.select().from(sliders).orderBy(asc(sliders.sortOrder));
  }

  async getSlider(id: number) {
    const [slider] = await db.select().from(sliders).where(eq(sliders.id, id));
    return slider;
  }

  async createSlider(slider: InsertSlider) {
    const [created] = await db.insert(sliders).values(slider).returning();
    return created;
  }

  async updateSlider(id: number, data: Partial<InsertSlider>) {
    const [updated] = await db.update(sliders).set(data).where(eq(sliders.id, id)).returning();
    return updated;
  }

  async deleteSlider(id: number) {
    await db.delete(sliders).where(eq(sliders.id, id));
  }

  async getServices() {
    return db.select().from(services).orderBy(asc(services.sortOrder));
  }

  async getService(id: number) {
    const [service] = await db.select().from(services).where(eq(services.id, id));
    return service;
  }

  async getServiceBySlug(slug: string) {
    const [service] = await db.select().from(services).where(eq(services.slug, slug));
    return service;
  }

  async createService(service: InsertService) {
    const [created] = await db.insert(services).values(service).returning();
    return created;
  }

  async updateService(id: number, data: Partial<InsertService>) {
    const [updated] = await db.update(services).set(data).where(eq(services.id, id)).returning();
    return updated;
  }

  async deleteService(id: number) {
    await db.delete(services).where(eq(services.id, id));
  }

  async getProjects() {
    return db.select().from(projects).orderBy(asc(projects.sortOrder));
  }

  async getProject(id: number) {
    const [project] = await db.select().from(projects).where(eq(projects.id, id));
    return project;
  }

  async getProjectBySlug(slug: string) {
    const [project] = await db.select().from(projects).where(eq(projects.slug, slug));
    return project;
  }

  async createProject(project: InsertProject) {
    const [created] = await db.insert(projects).values(project).returning();
    return created;
  }

  async updateProject(id: number, data: Partial<InsertProject>) {
    const [updated] = await db.update(projects).set(data).where(eq(projects.id, id)).returning();
    return updated;
  }

  async deleteProject(id: number) {
    await db.delete(projectImages).where(eq(projectImages.projectId, id));
    await db.delete(projects).where(eq(projects.id, id));
  }

  async getProjectImages(projectId: number) {
    return db.select().from(projectImages).where(eq(projectImages.projectId, projectId)).orderBy(asc(projectImages.sortOrder));
  }

  async createProjectImage(image: InsertProjectImage) {
    const [created] = await db.insert(projectImages).values(image).returning();
    return created;
  }

  async deleteProjectImage(id: number) {
    await db.delete(projectImages).where(eq(projectImages.id, id));
  }

  async getBlogPosts() {
    return db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt));
  }

  async getBlogPost(id: number) {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.id, id));
    return post;
  }

  async getBlogPostBySlug(slug: string) {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
    return post;
  }

  async createBlogPost(post: InsertBlogPost) {
    const [created] = await db.insert(blogPosts).values(post).returning();
    return created;
  }

  async updateBlogPost(id: number, data: Partial<InsertBlogPost>) {
    const [updated] = await db.update(blogPosts).set(data).where(eq(blogPosts.id, id)).returning();
    return updated;
  }

  async deleteBlogPost(id: number) {
    await db.delete(blogPosts).where(eq(blogPosts.id, id));
  }
}

export const storage = new DatabaseStorage();
