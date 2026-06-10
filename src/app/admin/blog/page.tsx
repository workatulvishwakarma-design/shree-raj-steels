"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Edit, Trash2, Plus, Calendar, User } from "lucide-react";
import DataTable, { Column } from "@/components/admin/DataTable";
import Image from "next/image";

interface BlogPost {
  slug: string;
  title: string;
  category: string;
  author: string;
  publishDate: string;
  featuredImage: string;
}

export default function BlogListPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingSlug, setDeletingSlug] = useState<string | null>(null);

  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/admin/blog");
      const data = await res.json();
      setPosts(data);
    } catch (error) {
      console.error("Failed to fetch blog posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (slug: string) => {
    if (!confirm("Are you sure you want to delete this blog post? This action cannot be undone.")) return;
    setDeletingSlug(slug);

    try {
      const res = await fetch(`/api/admin/blog?slug=${slug}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setPosts((prev) => prev.filter((p) => p.slug !== slug));
      } else {
        alert(data.message || "Failed to delete post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setDeletingSlug(null);
    }
  };

  const columns: Column<BlogPost>[] = [
    {
      header: "Post Details",
      accessor: (row) => (
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-16 rounded overflow-hidden bg-slate-900/80 border border-slate-800 flex-shrink-0">
            <Image
              src={row.featuredImage || "/images/placeholder.jpg"}
              alt={row.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="min-w-0">
            <div className="font-semibold text-white truncate max-w-md group-hover:text-[#C9A84C] transition-colors">
              {row.title}
            </div>
            <div className="text-xs text-slate-500 truncate max-w-md">
              /blog/{row.slug}
            </div>
          </div>
        </div>
      ),
    },
    {
      header: "Category",
      accessor: (row) => (
        <span className="px-2.5 py-1 text-xs font-semibold rounded-md bg-slate-900 border border-slate-800 text-slate-300">
          {row.category}
        </span>
      ),
    },
    {
      header: "Metadata",
      accessor: (row) => (
        <div className="space-y-0.5 text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-slate-500" />
            <span>{row.author}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            <span>
              {new Date(row.publishDate).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>
        </div>
      ),
    },
  ];

  const searchFilter = (item: BlogPost, query: string) => {
    return (
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase()) ||
      item.slug.toLowerCase().includes(query.toLowerCase())
    );
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#C9A84C] border-t-transparent" />
        <span className="text-sm text-slate-500 font-medium">Loading blog database...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight font-[family-name:var(--font-playfair)]">
            Blog Post Directory
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Write, edit, and coordinate corporate insights.
          </p>
        </div>

        <Link
          href="/admin/blog/new"
          className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold bg-[#C9A84C] hover:bg-[#b0913f] text-[#09111e] rounded-lg transition-all shadow-lg shadow-[#C9A84C]/10 hover:shadow-[#C9A84C]/25"
        >
          <Plus className="w-4 h-4" />
          Create Article
        </Link>
      </div>

      {/* Main Table */}
      <DataTable
        columns={columns}
        data={posts}
        searchPlaceholder="Filter posts by title or category..."
        searchFilter={searchFilter}
        emptyMessage="No articles found. Click 'Create Article' to write your first post!"
        actions={(row) => (
          <div className="flex items-center justify-end gap-2">
            <Link
              href={`/admin/blog/${row.slug}`}
              className="p-1.5 rounded-lg border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800/40 transition-colors"
              title="Edit Post"
            >
              <Edit className="w-4 h-4" />
            </Link>
            <button
              onClick={() => handleDelete(row.slug)}
              disabled={deletingSlug === row.slug}
              className="p-1.5 rounded-lg border border-slate-800 text-slate-400 hover:text-red-400 hover:bg-red-500/5 transition-colors disabled:opacity-30"
              title="Delete Post"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      />
    </div>
  );
}
