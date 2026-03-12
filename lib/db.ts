import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function readJson<T>(filename: string, fallback: T): T {
  ensureDir();
  const filepath = path.join(DATA_DIR, filename);
  if (!fs.existsSync(filepath)) return fallback;
  try {
    return JSON.parse(fs.readFileSync(filepath, "utf-8"));
  } catch {
    return fallback;
  }
}

function writeJson<T>(filename: string, data: T): void {
  ensureDir();
  const filepath = path.join(DATA_DIR, filename);
  fs.writeFileSync(filepath, JSON.stringify(data, null, 2));
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  read: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  publishedAt: string;
  updatedAt: string;
  published: boolean;
}

export function getContacts(): ContactSubmission[] {
  return readJson<ContactSubmission[]>("contacts.json", []);
}

export function addContact(
  data: Omit<ContactSubmission, "id" | "createdAt" | "read">
): ContactSubmission {
  const contacts = getContacts();
  const contact: ContactSubmission = {
    id: crypto.randomUUID(),
    ...data,
    createdAt: new Date().toISOString(),
    read: false,
  };
  contacts.unshift(contact);
  writeJson("contacts.json", contacts);
  return contact;
}

export function markContactRead(id: string): boolean {
  const contacts = getContacts();
  const contact = contacts.find((c) => c.id === id);
  if (!contact) return false;
  contact.read = true;
  writeJson("contacts.json", contacts);
  return true;
}

export function deleteContact(id: string): boolean {
  const contacts = getContacts();
  const index = contacts.findIndex((c) => c.id === id);
  if (index === -1) return false;
  contacts.splice(index, 1);
  writeJson("contacts.json", contacts);
  return true;
}

export function getPosts(): BlogPost[] {
  return readJson<BlogPost[]>("posts.json", []);
}

export function getPublishedPosts(): BlogPost[] {
  return getPosts().filter((p) => p.published);
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return getPosts().find((p) => p.slug === slug);
}

export function addPost(
  data: Omit<BlogPost, "id" | "publishedAt" | "updatedAt">
): BlogPost {
  const posts = getPosts();
  const post: BlogPost = {
    id: crypto.randomUUID(),
    ...data,
    publishedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  posts.unshift(post);
  writeJson("posts.json", posts);
  return post;
}

export function updatePost(
  id: string,
  data: Partial<Omit<BlogPost, "id" | "publishedAt">>
): BlogPost | null {
  const posts = getPosts();
  const index = posts.findIndex((p) => p.id === id);
  if (index === -1) return null;
  posts[index] = {
    ...posts[index],
    ...data,
    updatedAt: new Date().toISOString(),
  };
  writeJson("posts.json", posts);
  return posts[index];
}

export function deletePost(id: string): boolean {
  const posts = getPosts();
  const index = posts.findIndex((p) => p.id === id);
  if (index === -1) return false;
  posts.splice(index, 1);
  writeJson("posts.json", posts);
  return true;
}
