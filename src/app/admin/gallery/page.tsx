"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Upload, Trash2, X, Plus, AlertCircle, Loader2, Tag, Info } from "lucide-react";

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category: string;
}

export default function GalleryManagerPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("All");

  // Upload state
  const [uploading, setUploading] = useState(false);
  const [uploadUrl, setUploadUrl] = useState("");
  const [altText, setAltText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Products");
  const [uploadError, setUploadError] = useState("");

  const categories = ["Factory & Facility", "Products", "Stock & Warehouse"];

  const fetchImages = async () => {
    try {
      const res = await fetch("/api/admin/gallery");
      const data = await res.json();
      setImages(data);
    } catch (err) {
      console.error("Failed to load gallery images:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadError("");
    setUploadUrl("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        setUploadUrl(data.url);
        // Pre-fill alt text with filename (cleaned)
        const cleanName = file.name
          .split(".")
          .slice(0, -1)
          .join(".")
          .replace(/[-_]/g, " ");
        setAltText(cleanName.charAt(0).toUpperCase() + cleanName.slice(1));
      } else {
        setUploadError(data.message || "Failed to upload file");
      }
    } catch (err) {
      console.error("Upload error:", err);
      setUploadError("Server error during upload.");
    } finally {
      setUploading(false);
    }
  };

  const handleAddImage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadUrl || !altText || !selectedCategory) return;

    try {
      const res = await fetch("/api/admin/gallery", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          src: uploadUrl,
          alt: altText,
          category: selectedCategory,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setImages((prev) => [...prev, data.image]);
        // Reset states
        setUploadUrl("");
        setAltText("");
        setUploadError("");
      } else {
        setUploadError(data.message || "Failed to add image to gallery list");
      }
    } catch (err) {
      console.error("Error adding gallery image:", err);
      setUploadError("Could not update gallery database.");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this image? If it was uploaded from this dashboard, the actual file will be deleted too.")) return;

    try {
      const res = await fetch(`/api/admin/gallery?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.success) {
        setImages((prev) => prev.filter((img) => img.id !== id));
      } else {
        alert(data.message || "Failed to delete image");
      }
    } catch (err) {
      console.error("Error deleting image:", err);
      alert("Error occurred deleting image.");
    }
  };

  // Filter logic
  const filteredImages = React.useMemo(() => {
    if (activeTab === "All") return images;
    return images.filter((img) => img.category === activeTab);
  }, [images, activeTab]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#C9A84C] border-t-transparent" />
        <span className="text-sm text-slate-500 font-medium">Loading media archive...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-16">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight font-[family-name:var(--font-playfair)]">
          Media Gallery Assets
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Upload and organize corporate photography, factory views, and products.
        </p>
      </div>

      {/* Main Grid: Upload panel + Gallery Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* Upload Panel */}
        <div className="bg-[#0f1b2d]/50 border border-slate-800/80 rounded-2xl p-6 shadow-xl h-fit">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 border-b border-slate-850 pb-3 mb-4 flex items-center gap-2">
            <Upload className="w-4 h-4 text-[#C9A84C]" />
            Upload New Asset
          </h3>

          {!uploadUrl ? (
            <div className="space-y-4">
              {/* File Dropzone */}
              <div className="relative border-2 border-dashed border-slate-800 hover:border-[#C9A84C]/50 rounded-xl p-8 transition-colors flex flex-col items-center justify-center text-center bg-[#070d17]/50 group">
                <input
                  type="file"
                  onChange={handleFileUpload}
                  accept="image/*"
                  disabled={uploading}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                />
                
                {uploading ? (
                  <div className="flex flex-col items-center gap-2">
                    <Loader2 className="w-8 h-8 text-[#C9A84C] animate-spin" />
                    <span className="text-xs text-slate-400 font-semibold">Uploading to server...</span>
                  </div>
                ) : (
                  <>
                    <Upload className="w-8 h-8 text-slate-600 group-hover:text-[#C9A84C] transition-colors mb-2" />
                    <span className="text-xs font-bold text-slate-300 block">Select Image File</span>
                    <span className="text-[10px] text-slate-500 mt-1">PNG, JPG, WEBP up to 5MB</span>
                  </>
                )}
              </div>
              
              {uploadError && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs p-3 rounded-lg flex items-start gap-1.5 font-medium">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{uploadError}</span>
                </div>
              )}
            </div>
          ) : (
            /* Upload Metadata form */
            <form onSubmit={handleAddImage} className="space-y-4">
              <div className="relative aspect-video w-full rounded-lg overflow-hidden border border-slate-800 bg-[#070d17] mb-4">
                <img src={uploadUrl} alt="Uploaded preview" className="object-cover h-full w-full" />
                <button
                  type="button"
                  onClick={() => setUploadUrl("")}
                  className="absolute top-2 right-2 p-1 bg-black/60 hover:bg-black text-slate-350 hover:text-white rounded-full transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">
                  Alt / Description
                </label>
                <input
                  type="text"
                  value={altText}
                  onChange={(e) => setAltText(e.target.value)}
                  placeholder="e.g. Stainless Steel Pipe Fittings"
                  required
                  className="w-full px-3 py-2 bg-[#070d17] border border-slate-850 focus:border-[#C9A84C] text-sm text-white rounded-lg outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">
                  Gallery Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-[#070d17] border border-slate-850 focus:border-[#C9A84C] text-sm text-slate-200 rounded-lg outline-none transition-colors"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-[#C9A84C] hover:bg-[#b0913f] text-[#09111e] font-semibold py-2 px-3 rounded-lg text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                Add to Gallery
              </button>
            </form>
          )}
        </div>

        {/* Gallery Grid Display */}
        <div className="xl:col-span-3 space-y-6">
          {/* Categories Tab navigation */}
          <div className="flex flex-wrap items-center gap-2 border-b border-slate-850 pb-4">
            {["All", ...categories].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                  activeTab === tab
                    ? "bg-[#C9A84C]/15 border-[#C9A84C]/40 text-[#C9A84C]"
                    : "bg-slate-900/40 border-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Grid list */}
          {filteredImages.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredImages.map((img) => (
                <div
                  key={img.id}
                  className="group relative bg-[#0f1b2d]/50 border border-slate-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all hover:border-slate-750"
                >
                  {/* Aspect Ratio container */}
                  <div className="relative aspect-video w-full bg-slate-950/20">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                    />

                    {/* Delete overlay button */}
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <button
                        onClick={() => handleDelete(img.id)}
                        className="p-1.5 bg-black/60 hover:bg-red-650/80 text-white rounded-lg transition-colors"
                        title="Delete Image"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Info card details */}
                  <div className="p-4 space-y-2">
                    <div className="flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-[#C9A84C]" />
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                        {img.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-350 font-medium line-clamp-2" title={img.alt}>
                      {img.alt}
                    </p>
                    <div className="text-[10px] text-slate-500 truncate" title={img.src}>
                      {img.src}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center border border-dashed border-slate-800 rounded-2xl py-20 bg-slate-900/5">
              <Info className="w-8 h-8 text-slate-600 mb-2" />
              <span className="text-sm text-slate-500 font-medium">No assets registered in this category.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
