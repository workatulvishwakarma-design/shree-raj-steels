"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Loader2, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import MarkdownEditor from "./MarkdownEditor";

interface Section {
  heading: string;
  level: "h2" | "h3";
  content: string;
}

interface BlogPost {
  slug: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  excerpt: string;
  author: string;
  publishDate: string;
  readingTime: string;
  featuredImage: string;
  category: "Pipes" | "Tubes" | "Industry Insights" | "Manufacturing";
  tags: string[];
  sections: Section[];
  pullQuotes: string[];
}

interface BlogFormProps {
  initialData?: BlogPost;
  isEdit?: boolean;
}

export default function BlogForm({ initialData, isEdit = false }: BlogFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Form states
  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [seoTitle, setSeoTitle] = useState(initialData?.seoTitle || "");
  const [seoDescription, setSeoDescription] = useState(initialData?.seoDescription || "");
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || "");
  const [author, setAuthor] = useState(initialData?.author || "Admin");
  const [category, setCategory] = useState<BlogPost["category"]>(
    initialData?.category || "Industry Insights"
  );
  const [tagsInput, setTagsInput] = useState(initialData?.tags.join(", ") || "");
  const [featuredImage, setFeaturedImage] = useState(initialData?.featuredImage || "");
  const [pullQuoteInput, setPullQuoteInput] = useState(
    initialData?.pullQuotes.join("\n") || ""
  );

  // Drag and drop & upload states
  const [uploadingImage, setUploadingImage] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await uploadFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      await uploadFile(e.target.files[0]);
    }
  };

  const uploadFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Only image files are allowed.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("File size must be less than 5MB.");
      return;
    }

    setUploadingImage(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        setFeaturedImage(data.url);
      } else {
        setError(data.message || "Failed to upload image.");
      }
    } catch (err) {
      console.error("Upload error:", err);
      setError("An error occurred during file upload.");
    } finally {
      setUploadingImage(false);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  // Markdown content
  const [markdown, setMarkdown] = useState("");

  // Reconstruct Markdown from sections on mount/edit
  useEffect(() => {
    if (initialData?.sections) {
      const reconstructed = initialData.sections
        .map((sec) => {
          const prefix = sec.level === "h2" ? "## " : "### ";
          return `${prefix}${sec.heading}\n\n${sec.content}`;
        })
        .join("\n\n");
      setMarkdown(reconstructed);
    }
  }, [initialData]);

  // Slugify title automatically
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    if (!isEdit) {
      const generatedSlug = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      setSlug(generatedSlug);
      setSeoTitle(`${val} | Shree Raj Steels`);
    }
  };

  // Helper to parse Markdown to sections structure
  const parseMarkdownToSections = (md: string): Section[] => {
    const lines = md.split("\n");
    const sections: Section[] = [];

    let currentHeading = "";
    let currentLevel: "h2" | "h3" = "h2";
    let currentContentLines: string[] = [];

    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith("## ") || trimmed.startsWith("### ")) {
        // Save previous section if we gathered anything
        if (currentHeading || currentContentLines.length > 0) {
          sections.push({
            heading: currentHeading || "Introduction",
            level: currentLevel,
            content: currentContentLines.join("\n").trim(),
          });
        }

        // Start new section
        if (trimmed.startsWith("## ")) {
          currentHeading = trimmed.substring(3).trim();
          currentLevel = "h2";
        } else {
          currentHeading = trimmed.substring(4).trim();
          currentLevel = "h3";
        }
        currentContentLines = [];
      } else {
        currentContentLines.push(line);
      }
    }

    // Push the final section
    if (currentHeading || currentContentLines.length > 0) {
      sections.push({
        heading: currentHeading || "Introduction",
        level: currentLevel,
        content: currentContentLines.join("\n").trim(),
      });
    }

    return sections;
  };

  // Estimate reading time from markdown
  const calculateReadingTime = (text: string): string => {
    const words = text.trim().split(/\s+/).length;
    const minutes = Math.max(1, Math.round(words / 200));
    return `${minutes} min read`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const sections = parseMarkdownToSections(markdown);
    const readingTime = calculateReadingTime(markdown);
    const tags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);
    const pullQuotes = pullQuoteInput
      .split("\n")
      .map((q) => q.trim())
      .filter((q) => q.length > 0);

    const payload: BlogPost = {
      slug,
      title,
      seoTitle,
      seoDescription,
      excerpt,
      author,
      publishDate: initialData?.publishDate || new Date().toISOString(),
      readingTime,
      featuredImage: featuredImage || "/images/factory/warehouse-1.jpg",
      category,
      tags,
      sections,
      pullQuotes,
    };

    try {
      const url = "/api/admin/blog";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        router.push("/admin/blog");
        router.refresh();
      } else {
        setError(data.message || "Failed to save blog post");
      }
    } catch (err) {
      console.error("Save request failed:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 animate-in fade-in duration-500 pb-16">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/blog"
            className="p-2 rounded-lg border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800/40 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight font-[family-name:var(--font-playfair)]">
              {isEdit ? "Edit Blog Post" : "Create New Post"}
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              {isEdit ? `Editing /blog/${slug}` : "Add a new industry insight or news piece."}
            </p>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-bold bg-[#C9A84C] hover:bg-[#b0913f] text-[#09111e] rounded-lg transition-all shadow-lg shadow-[#C9A84C]/10 disabled:opacity-50 cursor-pointer"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Saving Post...
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              Save Article
            </>
          )}
        </button>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-lg flex items-center gap-2">
          <span>⚠️</span>
          <span>{error}</span>
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Post Settings */}
        <div className="space-y-6 bg-[#0f1b2d]/50 border border-slate-800/80 rounded-2xl p-6 shadow-xl h-fit">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 border-b border-slate-850 pb-3 mb-4">
            Metadata Details
          </h3>

          <div className="space-y-4">
            {/* Title */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
                Article Title
              </label>
              <input
                type="text"
                value={title}
                onChange={handleTitleChange}
                placeholder="e.g. The Future of Stainless Steel"
                required
                className="w-full px-3 py-2 bg-[#070d17] border border-slate-800 focus:border-[#C9A84C] text-sm text-white rounded-lg outline-none transition-colors"
              />
            </div>

            {/* Slug */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
                Post URL Slug
              </label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="e.g. future-of-stainless-steel"
                required
                disabled={isEdit}
                className="w-full px-3 py-2 bg-[#070d17] border border-slate-800 focus:border-[#C9A84C] text-sm text-white rounded-lg outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            {/* Author */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
                Author Name
              </label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Admin"
                required
                className="w-full px-3 py-2 bg-[#070d17] border border-slate-800 focus:border-[#C9A84C] text-sm text-white rounded-lg outline-none transition-colors"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as BlogPost["category"])}
                className="w-full px-3 py-2 bg-[#070d17] border border-slate-800 focus:border-[#C9A84C] text-sm text-slate-200 rounded-lg outline-none transition-colors"
              >
                <option value="Pipes">Pipes</option>
                <option value="Tubes">Tubes</option>
                <option value="Industry Insights">Industry Insights</option>
                <option value="Manufacturing">Manufacturing</option>
              </select>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
                Tags (comma separated)
              </label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="Steel, Pipes, ASTM"
                className="w-full px-3 py-2 bg-[#070d17] border border-slate-800 focus:border-[#C9A84C] text-sm text-white rounded-lg outline-none transition-colors"
              />
            </div>

            {/* Featured Image */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
                Featured Image
              </label>
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
              <div className="space-y-2">
                {featuredImage ? (
                  <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-[#070d17]/50 group shadow-md">
                    <img
                      src={featuredImage}
                      alt="Featured Preview"
                      className="w-full h-32 object-cover"
                    />
                    <div className="absolute inset-0 bg-[#09111e]/90 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center gap-2 p-4">
                      <button
                        type="button"
                        onClick={triggerFileSelect}
                        disabled={uploadingImage}
                        className="px-3 py-1.5 text-[11px] font-bold bg-[#C9A84C] hover:bg-[#b0913f] text-[#09111e] rounded-lg transition-colors cursor-pointer"
                      >
                        Replace Image
                      </button>
                      <button
                        type="button"
                        onClick={() => setFeaturedImage("")}
                        className="px-3 py-1.5 text-[11px] font-bold bg-red-600/20 hover:bg-red-600/40 text-red-400 border border-red-500/30 rounded-lg transition-colors cursor-pointer"
                      >
                        Delete Image
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    onDragEnter={handleDrag}
                    onDragOver={handleDrag}
                    onDragLeave={handleDrag}
                    onDrop={handleDrop}
                    onClick={triggerFileSelect}
                    className={`w-full min-h-[128px] rounded-xl border-2 border-dashed flex flex-col items-center justify-center p-4 text-center cursor-pointer transition-all duration-200 ${
                      dragActive
                        ? "border-[#C9A84C] bg-[#C9A84C]/5 text-white"
                        : "border-slate-800 bg-[#070d17] hover:border-[#C9A84C]/60 text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {uploadingImage ? (
                      <div className="flex flex-col items-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin text-[#C9A84C]" />
                        <span className="text-[11px] font-semibold text-slate-350">Uploading Image...</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2">
                        <ImageIcon className="w-6 h-6 text-[#C9A84C]/70" />
                        <p className="text-[11px] font-semibold">
                          Drag & drop featured image here, or <span className="text-[#C9A84C] underline">browse</span>
                        </p>
                        <p className="text-[9px] text-slate-500">Supports PNG, JPG, WEBP (Max 5MB)</p>
                      </div>
                    )}
                  </div>
                )}
                
                {/* Fallback text input so they can still manually set an image url if they want */}
                <input
                  type="text"
                  value={featuredImage}
                  onChange={(e) => setFeaturedImage(e.target.value)}
                  placeholder="Or enter image URL manually..."
                  className="w-full px-3 py-1.5 bg-[#070d17] border border-slate-800 focus:border-[#C9A84C] text-[11px] text-slate-400 placeholder-slate-650 rounded-lg outline-none transition-colors"
                />
              </div>
            </div>

            {/* Pull Quote */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
                Pull Quote (one per line)
              </label>
              <textarea
                value={pullQuoteInput}
                onChange={(e) => setPullQuoteInput(e.target.value)}
                placeholder="Highlight message displayed inside post..."
                rows={2}
                className="w-full px-3 py-2 bg-[#070d17] border border-slate-800 focus:border-[#C9A84C] text-sm text-white rounded-lg outline-none transition-colors resize-none"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Content & SEO */}
        <div className="lg:col-span-2 space-y-6">
          {/* SEO Block */}
          <div className="bg-[#0f1b2d]/50 border border-slate-800/80 rounded-2xl p-6 shadow-xl">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 border-b border-slate-850 pb-3 mb-4">
              SEO Optimization
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
                  SEO Meta Title
                </label>
                <input
                  type="text"
                  value={seoTitle}
                  onChange={(e) => setSeoTitle(e.target.value)}
                  placeholder="Seo Page Title"
                  required
                  className="w-full px-3 py-2 bg-[#070d17] border border-slate-800 focus:border-[#C9A84C] text-sm text-white rounded-lg outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
                  Excerpt (SEO Description)
                </label>
                <input
                  type="text"
                  value={seoDescription}
                  onChange={(e) => setSeoDescription(e.target.value)}
                  placeholder="Compelling meta description under 160 chars."
                  required
                  className="w-full px-3 py-2 bg-[#070d17] border border-slate-800 focus:border-[#C9A84C] text-sm text-white rounded-lg outline-none transition-colors"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
                Article Intro Excerpt
              </label>
              <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="A strong opening hook that summarizes the post in detail."
                required
                rows={2}
                className="w-full px-3 py-2 bg-[#070d17] border border-slate-800 focus:border-[#C9A84C] text-sm text-white rounded-lg outline-none transition-colors"
              />
            </div>
          </div>

          {/* Editor Block */}
          <div className="bg-[#0f1b2d]/50 border border-slate-800/80 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-850 pb-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                Article Content (Markdown Editor)
              </h3>
              <span className="text-[10px] text-slate-500 font-medium font-mono">
                Use ## for Section Titles, ### for Subheadings
              </span>
            </div>

            <MarkdownEditor value={markdown} onChange={setMarkdown} />
          </div>
        </div>
      </div>
    </form>
  );
}
