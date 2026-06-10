"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { Search, X, CornerDownLeft, FileText, Package, Layout } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { SUB_PRODUCTS } from "@/data/sub-products";
import { BLOG_POSTS } from "@/data/blog-posts";

interface SearchItem {
  title: string;
  category: "Page" | "Product Category" | "Product" | "Article" | "Download";
  href: string;
  keywords: string[];
  description: string;
}

interface SearchPopupProps {
  onClose: () => void;
}

// Popular product recommendations at the bottom of search
const POPULAR_RECOMMENDATIONS = [
  { title: "Seamless Steel Pipes", desc: "1/2\" to 24\" high pressure carbon & stainless tubes.", href: "/products/pipes-tubes" },
  { title: "Butt-Weld Elbows & Bends", desc: "45°/90°/180° fittings in WP304, WP316, WPB.", href: "/products/elbows-bends" },
  { title: "Forged Slip-on Flanges", desc: "Class 150 to 2500 raw forged connection flanges.", href: "/products/flanges" },
];

// Helper to dynamically match product images to search result types
const getSearchItemImage = (category: string, title: string, href: string): string => {
  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes("pipe") || lowerTitle.includes("tube")) return "/images/products/pipes.jpg";
  if (lowerTitle.includes("elbow") || lowerTitle.includes("bend")) return "/images/products/elbows.jpg";
  if (lowerTitle.includes("tee")) return "/images/products/tees.jpg";
  if (lowerTitle.includes("reducer")) return "/images/products/reducers.jpg";
  if (lowerTitle.includes("cap")) return "/images/products/caps.jpg";
  if (lowerTitle.includes("flange")) return "/images/products/flanges.jpg";
  if (lowerTitle.includes("flat") || lowerTitle.includes("sheet") || lowerTitle.includes("plate")) return "/images/products/flat.jpg";
  if (lowerTitle.includes("special") || lowerTitle.includes("alloy") || lowerTitle.includes("duplex")) return "/images/products/special.jpg";
  return "/images/factory/factory-floor-1.jpg"; // Fallback visual
};

export default function SearchPopup({ onClose }: SearchPopupProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Compile the global search index once
  const searchIndex: SearchItem[] = useMemo(() => {
    const items: SearchItem[] = [];

    // 1. Static Pages
    items.push(
      {
        title: "Request a Quote (RFQ)",
        category: "Page",
        href: "/quote",
        keywords: ["rfq", "price", "enquiry", "estimate", "cost", "bulk", "quote"],
        description: "Submit a quote request form for pipe fittings, flanges, and alloy components.",
      },
      {
        title: "Contact Us",
        category: "Page",
        href: "/contact",
        keywords: ["phone", "email", "address", "location", "office", "map", "contact", "support"],
        description: "Get in touch with Shree Raj Steels sales and head office in Kharghar & Kalamboli.",
      },
      {
        title: "About Shree Raj Steels",
        category: "Page",
        href: "/about",
        keywords: ["story", "history", "experience", "mission", "vision", "quality", "iso", "ped", "about"],
        description: "Learn about our 40+ years of piping manufacturing history and certified laboratories.",
      },
      {
        title: "Technical Data & Charts",
        category: "Page",
        href: "/technical-data",
        keywords: ["thickness", "dimensions", "weight", "chart", "schedule", "standard", "specs"],
        description: "Browse detailed pipe size ranges, schedule thickness charts, and weight formulas.",
      },
      {
        title: "Manufacturing Process & QC",
        category: "Page",
        href: "/process",
        keywords: ["factory", "testing", "machinery", "mill", "production", "quality", "bending", "qa"],
        description: "Explore our ISO certified hot bending, heat treatment, and non-destructive testing labs.",
      },
      {
        title: "Photo & Facility Gallery",
        category: "Page",
        href: "/gallery",
        keywords: ["photos", "warehouse", "stock", "images", "lab", "gallery"],
        description: "View high-resolution stockist yard photos, raw materials, and precision machinery.",
      },
      {
        title: "Our Services",
        category: "Page",
        href: "/services",
        keywords: ["customization", "packaging", "export", "logistics", "third party inspection", "tpi"],
        description: "Third-party inspections, export customized packaging, and global logistics options.",
      },
      {
        title: "Product Catalogue (PDF)",
        category: "Download",
        href: "/downloads/SRS-Catalogue.pdf",
        keywords: ["pdf", "download", "brochure", "catalogue", "specs", "flyer"],
        description: "Download the complete Shree Raj Steels product catalogue PDF for offline access.",
      }
    );

    // 2. Product Categories
    PRODUCTS.forEach((p) => {
      items.push({
        title: p.name,
        category: "Product Category",
        href: `/products/${p.slug}`,
        keywords: [p.slug, "category", "shop", "range", p.sizeRange],
        description: p.description || `View our complete range of ${p.name}. Size range: ${p.sizeRange}.`,
      });
    });

    // 3. Sub-Products
    SUB_PRODUCTS.forEach((sp) => {
      items.push({
        title: sp.name,
        category: "Product",
        href: `/products/${sp.parentSlug}/${sp.slug}`,
        keywords: [sp.slug, sp.parentSlug, "fitting", "steel", ...(sp.standards || []), ...(sp.applications || [])],
        description: sp.description.substring(0, 100) + "...",
      });
    });

    // 4. Blog Posts
    BLOG_POSTS.forEach((b) => {
      items.push({
        title: b.title,
        category: "Article",
        href: `/blog/${b.slug}`,
        keywords: [b.slug, b.category, ...(b.tags || [])],
        description: b.excerpt,
      });
    });

    return items;
  }, []);

  // Filter items in real time
  const filteredResults = useMemo(() => {
    if (!query.trim()) return [];

    const queryWords = query.toLowerCase().trim().split(/\s+/);
    return searchIndex.filter((item) => {
      const searchBlob = `${item.title} ${item.category} ${item.description} ${item.keywords.join(" ")}`.toLowerCase();
      return queryWords.every((word) => searchBlob.includes(word));
    });
  }, [query, searchIndex]);

  // Adjust scroll position to keep focused item visible
  useEffect(() => {
    if (scrollContainerRef.current) {
      const activeElement = scrollContainerRef.current.querySelector(
        "[data-active='true']"
      ) as HTMLElement;

      if (activeElement) {
        const container = scrollContainerRef.current;
        const containerTop = container.scrollTop;
        const containerBottom = containerTop + container.clientHeight;
        const elemTop = activeElement.offsetTop;
        const elemBottom = elemTop + activeElement.clientHeight;

        if (elemTop < containerTop) {
          container.scrollTop = elemTop;
        } else if (elemBottom > containerBottom) {
          container.scrollTop = elemBottom - container.clientHeight;
        }
      }
    }
  }, [selectedIndex]);

  // Reset index when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Keyboard navigation & Close listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          filteredResults.length > 0 ? (prev + 1) % filteredResults.length : 0
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          filteredResults.length > 0
            ? (prev - 1 + filteredResults.length) % filteredResults.length
            : 0
        );
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredResults.length > 0 && filteredResults[selectedIndex]) {
          handleNavigation(filteredResults[selectedIndex].href);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [filteredResults, selectedIndex]);

  // Prevent scroll propagation to main body
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleNavigation = (href: string) => {
    if (href.startsWith("/downloads")) {
      window.open(href, "_blank", "noopener,noreferrer");
    } else {
      router.push(href);
    }
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[100] bg-[#020B1A]/95 backdrop-blur-md flex items-start justify-center pt-20 sm:pt-28 select-none px-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="bg-navy-800 border border-white/10 rounded-2xl max-w-3xl w-full p-5 sm:p-6 shadow-2xl flex flex-col max-h-[75vh] focus:outline-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search products, materials, specifications, standards..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-12 text-white placeholder-gray-400 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 text-[15px] sm:text-base transition-colors"
            autoFocus
            aria-label="Search inputs"
          />
          {query ? (
            <button
              onClick={() => setQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors p-1"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="absolute right-4 top-1/2 -translate-y-1/2 hidden sm:inline-flex items-center gap-1 border border-white/10 bg-white/5 px-2 py-0.5 rounded text-[10px] text-gray-400 font-mono select-none">
              ESC
            </kbd>
          )}
        </div>

        {/* Scrollable Results / Suggestions */}
        <div
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto pr-1 flex flex-col gap-2 custom-scrollbar max-h-[55vh]"
        >
          {query.trim() === "" ? (
            /* Premium Visual Navigation Platform Default View */
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-2 overflow-y-auto max-h-[50vh] pr-1 custom-scrollbar">
              {/* Left Column: Recent Searches & Metallurgy */}
              <div className="flex flex-col gap-4">
                <div>
                  <h3 className="text-[10px] font-bold text-gold-500 uppercase tracking-widest mb-2.5 pb-1 border-b border-white/5">
                    Recent Searches
                  </h3>
                  <div className="flex flex-col gap-2">
                    {["Seamless Pipes", "ASME B16.9 Elbows", "Slip-on Flanges"].map((item) => (
                      <button
                        key={item}
                        onClick={() => setQuery(item)}
                        className="flex items-center gap-2 text-left text-xs text-gray-300 hover:text-gold-500 transition-colors py-0.5 cursor-pointer"
                      >
                        <Search size={11} className="text-gray-500" />
                        <span>{item}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-[10px] font-bold text-gold-500 uppercase tracking-widest mb-2.5 pb-1 border-b border-white/5">
                    Popular Metallurgy
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {["Carbon Steel", "Stainless Steel", "Duplex Steel", "Nickel Alloy"].map((grade) => (
                      <button
                        key={grade}
                        onClick={() => setQuery(grade)}
                        className="px-2 py-1 bg-white/5 border border-white/10 hover:border-gold-500/30 text-white hover:text-gold-500 rounded text-[9px] font-medium transition-all cursor-pointer"
                      >
                        {grade}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Center Column: Sectors & Specs */}
              <div className="flex flex-col gap-4">
                <div>
                  <h3 className="text-[10px] font-bold text-gold-500 uppercase tracking-widest mb-2.5 pb-1 border-b border-white/5">
                    Industries Served
                  </h3>
                  <div className="flex flex-col gap-2">
                    {[
                      { label: "Oil & Gas Refineries", href: "/#industries" },
                      { label: "Chemical Processing", href: "/#industries" },
                      { label: "Marine & Offshore Bends", href: "/#industries" },
                    ].map((item) => (
                      <button
                        key={item.label}
                        onClick={() => handleNavigation(item.href)}
                        className="flex items-center justify-between text-left text-xs text-gray-300 hover:text-gold-500 transition-colors py-0.5 cursor-pointer group"
                      >
                        <span>{item.label}</span>
                        <span className="text-[10px] text-gray-500 group-hover:text-gold-500 transition-colors">→</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-[10px] font-bold text-gold-500 uppercase tracking-widest mb-2.5 pb-1 border-b border-white/5">
                    Technical Specifications
                  </h3>
                  <div className="flex flex-col gap-2">
                    {[
                      { label: "Pipe Dimension Schedule", href: "/technical-data?tab=pipes" },
                      { label: "Flange ASME B16.5 Dimensions", href: "/technical-data?tab=flanges" },
                      { label: "Butt-Weld Tolerances B16.9", href: "/technical-data?tab=fittings" },
                    ].map((item) => (
                      <button
                        key={item.label}
                        onClick={() => handleNavigation(item.href)}
                        className="flex items-center justify-between text-left text-xs text-gray-300 hover:text-gold-500 transition-colors py-0.5 cursor-pointer group"
                      >
                        <span>{item.label}</span>
                        <span className="text-[10px] text-gray-500 group-hover:text-gold-500 transition-colors">→</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Quick Links */}
              <div className="flex flex-col gap-4">
                <div>
                  <h3 className="text-[10px] font-bold text-gold-500 uppercase tracking-widest mb-2.5 pb-1 border-b border-white/5">
                    Quick Links
                  </h3>
                  <div className="flex flex-col gap-2">
                    {[
                      { label: "Request a Quote (RFQ)", href: "/quote" },
                      { label: "Manufacturing Processes", href: "/process" },
                      { label: "Factory & Stock Gallery", href: "/gallery" },
                      { label: "Download Catalogue PDF", href: "/downloads/SRS-Catalogue.pdf" },
                    ].map((item) => (
                      <button
                        key={item.label}
                        onClick={() => handleNavigation(item.href)}
                        className="flex items-center justify-between text-left text-xs text-gray-300 hover:text-gold-500 transition-colors py-0.5 cursor-pointer group"
                      >
                        <span>{item.label}</span>
                        <span className="text-[10px] text-gray-500 group-hover:text-gold-500 transition-colors">→</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom: Featured Product Cards (Popular recommendations) */}
              <div className="md:col-span-3 mt-4 pt-4 border-t border-white/5">
                <h3 className="text-[10px] font-bold text-gold-500 uppercase tracking-widest mb-3.5">
                  Featured Product Recommendations
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {POPULAR_RECOMMENDATIONS.map((rec) => {
                    const thumb = getSearchItemImage("Product", rec.title, rec.href);
                    return (
                      <button
                        key={rec.title}
                        onClick={() => handleNavigation(rec.href)}
                        className="group flex items-center gap-3.5 p-2.5 rounded-xl border border-white/5 bg-white/2 hover:bg-white/5 hover:border-gold-500/20 text-left transition-all duration-300 cursor-pointer"
                      >
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-white/5 flex-shrink-0">
                          <Image
                            src={thumb}
                            alt={rec.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-white group-hover:text-gold-500 transition-colors truncate">
                            {rec.title}
                          </div>
                          <p className="text-[9px] text-gray-405 mt-0.5 leading-normal line-clamp-1">
                            {rec.desc}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : filteredResults.length > 0 ? (
            /* Results list view styled as visual product recommendations */
            filteredResults.map((item, idx) => {
              const isActive = idx === selectedIndex;
              const thumb = getSearchItemImage(item.category, item.title, item.href);
              return (
                <button
                  key={item.href + item.title + idx}
                  onClick={() => handleNavigation(item.href)}
                  data-active={isActive}
                  className={`w-full text-left p-3 rounded-xl border flex items-center gap-4 transition-all group cursor-pointer ${
                    isActive
                      ? "bg-white/5 border-gold-500/40 shadow-lg shadow-black/20"
                      : "bg-transparent border-transparent hover:bg-white/2 hover:border-white/5"
                  }`}
                >
                  {/* Image Thumbnail */}
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-white/10 flex-shrink-0 bg-navy-900">
                    <Image
                      src={thumb}
                      alt={item.title}
                      fill
                      className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                  </div>

                  {/* Title & Description */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h4
                        className={`font-bold text-sm truncate transition-colors ${
                          isActive ? "text-gold-500" : "text-white"
                        }`}
                      >
                        {item.title}
                      </h4>
                      <span className="text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 bg-white/10 rounded text-gray-400 select-none flex-shrink-0">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-[10px] text-gray-400 line-clamp-1 leading-normal">
                      {item.description}
                    </p>
                  </div>

                  {/* Keyboard enter helper */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {isActive ? (
                      <div className="hidden sm:flex items-center gap-1.5 text-[9px] text-gray-400 font-medium">
                        <span>Select</span>
                        <CornerDownLeft className="w-3.5 h-3.5 text-gold-500" />
                      </div>
                    ) : (
                      <span className="text-xs text-gray-600 group-hover:text-gold-500 transition-colors">→</span>
                    )}
                  </div>
                </button>
              );
            })
          ) : (
            /* Empty State */
            <div className="text-center py-10 bg-white/2 border border-white/5 rounded-xl">
              <p className="text-sm text-gray-400 mb-2 font-medium">
                No matching results found for &ldquo;{query}&rdquo;
              </p>
              <p className="text-xs text-gray-500">
                Check spelling or try using one of the categories above.
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
