import React from "react";
import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import BlogForm from "@/components/admin/BlogForm";

function getPost(slug: string) {
  try {
    const filePath = path.join(process.cwd(), "src", "data", "blog-posts.json");
    if (!fs.existsSync(filePath)) return null;
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const posts = JSON.parse(fileContent);
    return posts.find((p: any) => p.slug === slug) || null;
  } catch (error) {
    console.error("Error reading blog post for edit page:", error);
    return null;
  }
}

export default async function EditBlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    notFound();
  }

  return <BlogForm initialData={post} isEdit={true} />;
}
