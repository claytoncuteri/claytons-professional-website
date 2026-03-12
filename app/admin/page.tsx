"use client";

import { useState, useEffect, useCallback } from "react";
import {
  LogOut,
  Mail,
  MailOpen,
  Trash2,
  Plus,
  Edit3,
  Eye,
  EyeOff,
  Save,
  X,
  FileText,
  Users,
  Clock,
} from "lucide-react";

interface Contact {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  read: boolean;
}

interface Post {
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

type Tab = "contacts" | "posts";

function LoginForm({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      onLogin();
    } else {
      setError("Invalid password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F172A] px-4">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center text-white mb-8 font-[family-name:var(--font-heading)]">
          Admin Dashboard
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter admin password"
            className="w-full px-4 py-3 rounded-lg bg-[#1E293B] border border-[#334155] text-white placeholder-gray-500 focus:outline-none focus:border-[#3B82F6]"
            autoFocus
          />
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-[#3B82F6] hover:bg-[#2563EB] text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

function ContactsPanel() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selected, setSelected] = useState<Contact | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchContacts = useCallback(async () => {
    const res = await fetch("/api/admin/contacts");
    if (res.ok) {
      setContacts(await res.json());
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  const markRead = async (id: string) => {
    await fetch("/api/admin/contacts", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchContacts();
  };

  const deleteContact = async (id: string) => {
    await fetch(`/api/admin/contacts?id=${id}`, { method: "DELETE" });
    if (selected?.id === id) setSelected(null);
    fetchContacts();
  };

  const unreadCount = contacts.filter((c) => !c.read).length;

  if (loading) {
    return <div className="text-gray-400 p-8">Loading contacts...</div>;
  }

  return (
    <div className="flex h-[calc(100vh-120px)]">
      {/* Contact list */}
      <div className="w-80 border-r border-[#334155] overflow-y-auto">
        <div className="p-4 border-b border-[#334155]">
          <p className="text-sm text-gray-400">
            {contacts.length} contacts {unreadCount > 0 && `(${unreadCount} unread)`}
          </p>
        </div>
        {contacts.length === 0 ? (
          <p className="text-gray-500 text-sm p-4">No contacts yet</p>
        ) : (
          contacts.map((contact) => (
            <button
              key={contact.id}
              onClick={() => {
                setSelected(contact);
                if (!contact.read) markRead(contact.id);
              }}
              className={`w-full text-left p-4 border-b border-[#334155] hover:bg-[#1E293B] transition-colors ${
                selected?.id === contact.id ? "bg-[#1E293B]" : ""
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                {contact.read ? (
                  <MailOpen size={14} className="text-gray-500" />
                ) : (
                  <Mail size={14} className="text-[#3B82F6]" />
                )}
                <span
                  className={`text-sm font-medium ${
                    contact.read ? "text-gray-400" : "text-white"
                  }`}
                >
                  {contact.name}
                </span>
              </div>
              <p className="text-xs text-gray-500 truncate">{contact.email}</p>
              <p className="text-xs text-gray-600 truncate mt-1">
                {contact.message}
              </p>
              <p className="text-[10px] text-gray-600 mt-1">
                {new Date(contact.createdAt).toLocaleDateString()}
              </p>
            </button>
          ))
        )}
      </div>

      {/* Contact detail */}
      <div className="flex-1 overflow-y-auto">
        {selected ? (
          <div className="p-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-white">{selected.name}</h3>
                <a
                  href={`mailto:${selected.email}`}
                  className="text-[#3B82F6] text-sm hover:underline"
                >
                  {selected.email}
                </a>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(selected.createdAt).toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => deleteContact(selected.id)}
                className="p-2 hover:bg-red-500/10 rounded-lg text-gray-500 hover:text-red-400 transition-colors"
                title="Delete"
              >
                <Trash2 size={18} />
              </button>
            </div>
            <div className="bg-[#1E293B] rounded-lg p-6 border border-[#334155]">
              <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">
                {selected.message}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            <p>Select a contact to view</p>
          </div>
        )}
      </div>
    </div>
  );
}

function PostEditor({
  post,
  onSave,
  onCancel,
}: {
  post?: Post;
  onSave: () => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState({
    title: post?.title || "",
    slug: post?.slug || "",
    excerpt: post?.excerpt || "",
    content: post?.content || "",
    category: post?.category || "AI",
    published: post?.published ?? false,
  });

  const autoSlug = (title: string) =>
    title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .slice(0, 80);

  const handleSave = async () => {
    if (post) {
      await fetch("/api/admin/posts", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: post.id, ...form }),
      });
    } else {
      await fetch("/api/admin/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    }
    onSave();
  };

  return (
    <div className="p-8 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-white">
          {post ? "Edit Post" : "New Post"}
        </h3>
        <div className="flex gap-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-sm"
          >
            <X size={14} />
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!form.title || !form.slug || !form.content}
            className="px-4 py-2 rounded-lg bg-[#3B82F6] hover:bg-[#2563EB] text-white transition-colors flex items-center gap-2 text-sm disabled:opacity-50"
          >
            <Save size={14} />
            Save
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-400 mb-1">Title</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => {
              setForm({
                ...form,
                title: e.target.value,
                slug: post ? form.slug : autoSlug(e.target.value),
              });
            }}
            className="w-full px-4 py-2.5 rounded-lg bg-[#1E293B] border border-[#334155] text-white focus:outline-none focus:border-[#3B82F6]"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Slug</label>
            <input
              type="text"
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg bg-[#1E293B] border border-[#334155] text-white focus:outline-none focus:border-[#3B82F6]"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Category</label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg bg-[#1E293B] border border-[#334155] text-white focus:outline-none focus:border-[#3B82F6]"
            >
              <option value="AI">AI</option>
              <option value="Engineering">Engineering</option>
              <option value="Leadership">Leadership</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1">Excerpt</label>
          <textarea
            value={form.excerpt}
            onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
            rows={2}
            className="w-full px-4 py-2.5 rounded-lg bg-[#1E293B] border border-[#334155] text-white focus:outline-none focus:border-[#3B82F6] resize-none"
            placeholder="Brief summary for card display..."
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1">
            Content (Markdown)
          </label>
          <textarea
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            rows={16}
            className="w-full px-4 py-2.5 rounded-lg bg-[#1E293B] border border-[#334155] text-white focus:outline-none focus:border-[#3B82F6] resize-y font-mono text-sm"
          />
        </div>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={form.published}
            onChange={(e) => setForm({ ...form, published: e.target.checked })}
            className="rounded border-[#334155]"
          />
          <span className="text-sm text-gray-400">Published</span>
        </label>
      </div>
    </div>
  );
}

function PostsPanel() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Post | null | "new">(null);

  const fetchPosts = useCallback(async () => {
    const res = await fetch("/api/admin/posts");
    if (res.ok) {
      setPosts(await res.json());
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const deletePost = async (id: string) => {
    await fetch(`/api/admin/posts?id=${id}`, { method: "DELETE" });
    fetchPosts();
  };

  const togglePublished = async (post: Post) => {
    await fetch("/api/admin/posts", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: post.id, published: !post.published }),
    });
    fetchPosts();
  };

  if (editing) {
    return (
      <PostEditor
        post={editing === "new" ? undefined : editing}
        onSave={() => {
          setEditing(null);
          fetchPosts();
        }}
        onCancel={() => setEditing(null)}
      />
    );
  }

  if (loading) {
    return <div className="text-gray-400 p-8">Loading posts...</div>;
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-gray-400">{posts.length} posts</p>
        <button
          onClick={() => setEditing("new")}
          className="px-4 py-2 rounded-lg bg-[#3B82F6] hover:bg-[#2563EB] text-white transition-colors flex items-center gap-2 text-sm"
        >
          <Plus size={14} />
          New Post
        </button>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          <FileText size={48} className="mx-auto mb-4 opacity-50" />
          <p>No posts yet. Create your first blog post.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <div
              key={post.id}
              className="flex items-center gap-4 p-4 bg-[#1E293B] rounded-lg border border-[#334155]"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-white font-medium truncate">
                    {post.title}
                  </h4>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full ${
                      post.published
                        ? "bg-emerald-500/10 text-emerald-400"
                        : "bg-gray-500/10 text-gray-500"
                    }`}
                  >
                    {post.published ? "Published" : "Draft"}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#3B82F6]/10 text-[#3B82F6]">
                    {post.category}
                  </span>
                </div>
                <p className="text-xs text-gray-500 truncate">{post.excerpt}</p>
                <p className="text-[10px] text-gray-600 mt-1">
                  {new Date(post.updatedAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => togglePublished(post)}
                  className="p-2 hover:bg-[#334155] rounded-lg text-gray-500 hover:text-white transition-colors"
                  title={post.published ? "Unpublish" : "Publish"}
                >
                  {post.published ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
                <button
                  onClick={() => setEditing(post)}
                  className="p-2 hover:bg-[#334155] rounded-lg text-gray-500 hover:text-white transition-colors"
                  title="Edit"
                >
                  <Edit3 size={16} />
                </button>
                <button
                  onClick={() => deletePost(post.id)}
                  className="p-2 hover:bg-red-500/10 rounded-lg text-gray-500 hover:text-red-400 transition-colors"
                  title="Delete"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function AdminDashboard() {
  const [authenticated, setAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);
  const [tab, setTab] = useState<Tab>("contacts");

  useEffect(() => {
    // Check if already authenticated by trying to fetch contacts
    fetch("/api/admin/contacts")
      .then((res) => {
        if (res.ok) setAuthenticated(true);
      })
      .finally(() => setChecking(false));
  }, []);

  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    setAuthenticated(false);
  };

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0F172A]">
        <div className="text-gray-400">Loading...</div>
      </div>
    );
  }

  if (!authenticated) {
    return <LoginForm onLogin={() => setAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-[#0F172A] text-white">
      {/* Header */}
      <div className="border-b border-[#334155] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <h1 className="text-lg font-bold font-[family-name:var(--font-heading)]">
            Admin Dashboard
          </h1>
          <div className="flex gap-1">
            <button
              onClick={() => setTab("contacts")}
              className={`px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors ${
                tab === "contacts"
                  ? "bg-[#1E293B] text-white"
                  : "text-gray-500 hover:text-white"
              }`}
            >
              <Users size={16} />
              Contacts
            </button>
            <button
              onClick={() => setTab("posts")}
              className={`px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors ${
                tab === "posts"
                  ? "bg-[#1E293B] text-white"
                  : "text-gray-500 hover:text-white"
              }`}
            >
              <FileText size={16} />
              Blog Posts
            </button>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="/"
            className="text-sm text-gray-500 hover:text-white transition-colors"
          >
            View Site
          </a>
          <button
            onClick={handleLogout}
            className="p-2 hover:bg-[#1E293B] rounded-lg text-gray-500 hover:text-white transition-colors"
            title="Sign out"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>

      {/* Content */}
      {tab === "contacts" && <ContactsPanel />}
      {tab === "posts" && <PostsPanel />}
    </div>
  );
}
