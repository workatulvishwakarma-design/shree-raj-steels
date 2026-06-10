import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { isAuthenticated } from "@/lib/auth";

// Helper to get file path
const getFilePath = () => path.join(process.cwd(), "src", "data", "blog-posts.json");

// Helper to read posts
const readPosts = (): any[] => {
  try {
    const filePath = getFilePath();
    if (!fs.existsSync(filePath)) return [];
    const fileContent = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(fileContent);
  } catch (error) {
    console.error("Error reading blog posts:", error);
    return [];
  }
};

// Helper to write posts
const writePosts = (posts: any[]): boolean => {
  try {
    const filePath = getFilePath();
    fs.writeFileSync(filePath, JSON.stringify(posts, null, 2), "utf-8");
    return true;
  } catch (error) {
    console.error("Error writing blog posts:", error);
    return false;
  }
};

export async function GET(request: NextRequest) {
  // Fresh JSON fetch for dashboard listings
  const posts = readPosts();
  return NextResponse.json(posts);
}

export async function POST(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const postData = await request.json();
    const posts = readPosts();

    // Check if slug already exists
    if (posts.some((p) => p.slug === postData.slug)) {
      return NextResponse.json(
        { success: false, message: "A post with this slug already exists" },
        { status: 400 }
      );
    }

    posts.push(postData);
    writePosts(posts);

    return NextResponse.json({ success: true, post: postData });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create post" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const postData = await request.json();
    const { slug } = postData;

    if (!slug) {
      return NextResponse.json({ success: false, message: "Slug is required" }, { status: 400 });
    }

    const posts = readPosts();
    const index = posts.findIndex((p) => p.slug === slug);

    if (index === -1) {
      return NextResponse.json({ success: false, message: "Post not found" }, { status: 404 });
    }

    posts[index] = { ...posts[index], ...postData };
    writePosts(posts);

    return NextResponse.json({ success: true, post: posts[index] });
  } catch (error) {
    console.error("Error updating post:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update post" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      return NextResponse.json({ success: false, message: "Slug is required" }, { status: 400 });
    }

    const posts = readPosts();
    const filtered = posts.filter((p) => p.slug !== slug);

    if (posts.length === filtered.length) {
      return NextResponse.json({ success: false, message: "Post not found" }, { status: 404 });
    }

    writePosts(filtered);
    return NextResponse.json({ success: true, message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete post" },
      { status: 500 }
    );
  }
}
