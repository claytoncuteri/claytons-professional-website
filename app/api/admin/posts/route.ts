import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getPosts, addPost, updatePost, deletePost } from "@/lib/db";

async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.has("admin_session");
}

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json(getPosts());
}

export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { title, slug, excerpt, content, category, published } = body;

  if (!title || !slug || !content || !category) {
    return NextResponse.json(
      { error: "Title, slug, content, and category are required" },
      { status: 400 }
    );
  }

  const post = addPost({
    title,
    slug,
    excerpt: excerpt || "",
    content,
    category,
    published: published ?? false,
  });

  return NextResponse.json(post, { status: 201 });
}

export async function PATCH(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { id, ...data } = body;

  if (!id) {
    return NextResponse.json({ error: "ID required" }, { status: 400 });
  }

  const post = updatePost(id, data);
  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  return NextResponse.json(post);
}

export async function DELETE(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "ID required" }, { status: 400 });
  }
  const success = deletePost(id);
  return NextResponse.json({ success });
}
