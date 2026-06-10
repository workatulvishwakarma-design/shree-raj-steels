"use client";

import React, { useState, useRef } from "react";
import {
  Heading2,
  Heading3,
  Bold,
  Italic,
  Quote,
  List,
  Link as LinkIcon,
  Image as ImageIcon,
  Eye,
  Edit,
} from "lucide-react";

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function MarkdownEditor({ value, onChange }: MarkdownEditorProps) {
  const [activeTab, setActiveTab] = useState<"edit" | "preview" | "split">("split");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!file.type.startsWith("image/")) {
        alert("Only image files are allowed.");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB.");
        return;
      }

      setUploading(true);
      const formData = new FormData();
      formData.append("file", file);

      try {
        const res = await fetch("/api/admin/upload", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        if (data.success) {
          const altText = file.name.split(".")[0] || "image";
          insertImageMarkdown(`![${altText}](${data.url})`);
        } else {
          alert(data.message || "Failed to upload image.");
        }
      } catch (err) {
        console.error("MarkdownEditor image upload error:", err);
        alert("An error occurred while uploading the image.");
      } finally {
        setUploading(false);
        e.target.value = "";
      }
    }
  };

  const insertImageMarkdown = (mdImage: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;

    const newValue = text.substring(0, start) + mdImage + text.substring(end);
    onChange(newValue);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + mdImage.length, start + mdImage.length);
    }, 0);
  };

  // Custom parser to convert markdown to basic HTML for preview
  const parseMarkdown = (md: string) => {
    if (!md) return "";

    let html = md;
    
    // Escape HTML tags to prevent XSS
    html = html
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    // Re-allow headings (since they are added by parser)
    html = html.replace(/^### (.*$)/gim, '<h3 class="text-base font-bold text-[#C9A84C] mt-4 mb-2 font-[family-name:var(--font-montserrat)]">$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2 class="text-lg font-bold text-white mt-6 mb-3 border-b border-slate-800 pb-1 font-[family-name:var(--font-playfair)]">$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1 class="text-xl font-bold text-white mt-8 mb-4 font-[family-name:var(--font-playfair)]">$1</h1>');

    // Bold (**text** or __text__)
    html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    html = html.replace(/__(.*?)__/g, "<strong>$1</strong>");

    // Italic (*text* or _text_)
    html = html.replace(/\*(.*?)\*/g, "<em>$1</em>");
    html = html.replace(/_(.*?)_/g, "<em>$1</em>");

    // Blockquotes
    html = html.replace(/^&gt; (.*$)/gim, '<blockquote class="border-l-4 border-[#C9A84C] pl-4 italic text-slate-400 my-4 bg-slate-900/40 py-2 rounded-r">$1</blockquote>');

    // Images (![alt](url))
    html = html.replace(/\!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" class="rounded-lg max-h-80 object-cover my-4 border border-slate-800" />');

    // Links ([text](url))
    html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" class="text-[#C9A84C] hover:underline">$1</a>');

    // Bullet lists
    const lines = html.split("\n");
    let inList = false;
    const processedLines = lines.map((line) => {
      const trimmed = line.trim();
      if (trimmed.startsWith("- ")) {
        const content = trimmed.substring(2);
        if (!inList) {
          inList = true;
          return `<ul class="list-disc pl-5 my-2 space-y-1 text-slate-350"><li>${content}</li>`;
        }
        return `<li>${content}</li>`;
      } else {
        if (inList) {
          inList = false;
          return `</ul>\n${line}`;
        }
        return line;
      }
    });
    if (inList) {
      processedLines.push("</ul>");
    }
    html = processedLines.join("\n");

    // Convert double newlines to paragraphs
    const paragraphs = html.split(/\n\n+/);
    return paragraphs
      .map((p) => {
        const trimmed = p.trim();
        if (
          trimmed.startsWith("<h") ||
          trimmed.startsWith("<blockquote") ||
          trimmed.startsWith("<img") ||
          trimmed.startsWith("<ul") ||
          trimmed.startsWith("</ul") ||
          trimmed.startsWith("<li")
        ) {
          return p;
        }
        return `<p class="text-slate-300 leading-relaxed text-sm my-3">${p.replace(/\n/g, "<br/>")}</p>`;
      })
      .join("\n");
  };

  const insertText = (prefix: string, suffix: string = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selectedText = text.substring(start, end);
    const replacement = prefix + selectedText + suffix;

    const newValue = text.substring(0, start) + replacement + text.substring(end);
    onChange(newValue);

    // Reposition cursor after render
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + prefix.length,
        start + prefix.length + selectedText.length
      );
    }, 0);
  };

  return (
    <div className="border border-slate-800 rounded-xl overflow-hidden bg-[#09111e]">
      {/* Editor Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-[#0d1624] border-b border-slate-800 px-4 py-2.5">
        <div className="flex items-center gap-1.5 border-r border-slate-800 pr-3 mr-1">
          <button
            type="button"
            onClick={() => insertText("## ")}
            title="Heading 2"
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors"
          >
            <Heading2 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertText("### ")}
            title="Heading 3"
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors"
          >
            <Heading3 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertText("**", "**")}
            title="Bold"
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors"
          >
            <Bold className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertText("*", "*")}
            title="Italic"
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors"
          >
            <Italic className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertText("> ")}
            title="Blockquote"
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors"
          >
            <Quote className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertText("- ")}
            title="Bullet List"
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors"
          >
            <List className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertText("[", "](url)")}
            title="Add Link"
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors"
          >
            <LinkIcon className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            title="Upload & Insert Image"
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors disabled:opacity-45"
          >
            {uploading ? (
              <span className="w-4 h-4 border-2 border-[#C9A84C]/80 border-t-transparent rounded-full animate-spin inline-block" />
            ) : (
              <ImageIcon className="w-4 h-4" />
            )}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>

        {/* View mode tabs */}
        <div className="flex items-center gap-1 bg-[#070d17] p-1 rounded-lg border border-slate-850">
          <button
            type="button"
            onClick={() => setActiveTab("edit")}
            className={`flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
              activeTab === "edit"
                ? "bg-[#C9A84C] text-[#09111e]"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Edit className="w-3 h-3" />
            Write
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("preview")}
            className={`flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
              activeTab === "preview"
                ? "bg-[#C9A84C] text-[#09111e]"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Eye className="w-3 h-3" />
            Preview
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("split")}
            className={`hidden md:flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
              activeTab === "split"
                ? "bg-[#C9A84C] text-[#09111e]"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Split
          </button>
        </div>
      </div>

      {/* Editor Content Area */}
      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-800 min-h-[350px]">
        {/* Input Textarea */}
        <div
          className={`${
            activeTab === "preview" ? "hidden" : "block"
          } ${activeTab === "split" ? "md:block" : "w-full"}`}
        >
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Write blog content in Markdown format..."
            className="w-full h-full min-h-[350px] p-4 bg-transparent text-slate-200 placeholder-slate-650 resize-y outline-none font-mono text-sm leading-relaxed border-none focus:ring-0 focus:outline-none focus:border-none"
          />
        </div>

        {/* Live Preview */}
        <div
          className={`${
            activeTab === "edit" ? "hidden" : "block"
          } ${activeTab === "split" ? "md:block" : "w-full"} p-6 bg-slate-900/20 max-h-[500px] overflow-y-auto`}
        >
          {value ? (
            <div
              className="prose prose-invert max-w-none prose-sm"
              dangerouslySetInnerHTML={{ __html: parseMarkdown(value) }}
            />
          ) : (
            <span className="text-sm text-slate-600 italic">Preview is empty. Write something to see formatting!</span>
          )}
        </div>
      </div>
    </div>
  );
}
