"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Phone,
  ChevronDown,
  Search,
  CircleDot,
  CornerDownRight,
  GitFork,
  Minimize2,
  Lock,
  Disc,
  Layers,
  Sparkles,
  Flame,
  Fuel,
  Beaker,
  Ship,
  Droplets,
  Zap,
  Building2,
  Gauge,
  FlaskConical,
  Ruler,
  Download,
  Award,
  Factory,
  ShieldCheck,
  Globe,
  Image as ImageIcon,
  BookOpen,
  PhoneCall,
  ArrowRight,
  Utensils,
  FileText,
} from "lucide-react";
import { NAV_LINKS, COMPANY } from "@/lib/constants";
import SearchPopup from "@/components/ui/SearchPopup";

// Products Mega Menu Column 1: Category Navigation
const PRODUCT_CATEGORIES = [
  { label: "Pipes & Tubes", desc: "Seamless & welded pipes for critical applications", icon: CircleDot, href: "/products/pipes-tubes" },
  { label: "Pipe Fittings", desc: "Precision engineered fittings & components", icon: GitFork, href: "/products/elbows-bends" },
  { label: "Flanges", desc: "High-performance flanges in all standards", icon: Disc, href: "/products/flanges" },
  { label: "Plates & Sheets", desc: "Premium steel plates & sheets", icon: Layers, href: "/products/flat-products" },
  { label: "Special Alloys", desc: "High-performance alloys for extreme environments", icon: Sparkles, href: "/products/special-materials" },
  { label: "Duplex & Super Duplex", desc: "Superior corrosion resistant solutions", icon: ShieldCheck, href: "/products/special-materials" },
];

// Products Mega Menu Column 2: Featured Products
const FEATURED_PRODUCTS = [
  { title: "Stainless Steel Pipes", desc: "Corrosion resistant industrial tubes", image: "/images/products/pipes.jpg", href: "/products/pipes-tubes" },
  { title: "Duplex Steel Flanges", desc: "High strength offshore connectors", image: "/images/products/flanges.jpg", href: "/products/flanges" },
  { title: "Nickel Alloy Fittings", desc: "Extreme environment performance", image: "/images/products/special.jpg", href: "/products/special-materials" },
  { title: "Carbon Steel Elbows", desc: "Forged high-pressure elbows", image: "/images/products/elbows.jpg", href: "/products/elbows-bends" },
];

// Products Mega Menu Column 3: Applications & Industries
const PRODUCT_APPLICATIONS = [
  { label: "Oil & Gas", desc: "Exploration & refinery alloys", icon: Flame, image: "/images/hero/steel-closeup.jpg", href: "/#industries" },
  { label: "Petrochemical", desc: "Boilers & process steam pipes", icon: Fuel, image: "/images/factory/factory-floor-1.jpg", href: "/#industries" },
  { label: "Marine", desc: "Seawater copper-nickel systems", icon: Ship, image: "/images/factory/warehouse-1.jpg", href: "/#industries" },
  { label: "Power Plant", desc: "Reactor tubes & steam fittings", icon: Zap, image: "/images/gallery/testing.jpg", href: "/#industries" },
  { label: "Infrastructure", desc: "Heavy piles & structural columns", icon: Building2, image: "/images/products/pipes.jpg", href: "/#industries" },
  { label: "Chemical Processing", desc: "Corrosive acid transport", icon: Beaker, image: "/images/factory/factory-floor-3.jpg", href: "/#industries" },
];

// Industries Mega Menu Left: Visual cards
const INDUSTRY_CARDS = [
  { label: "Oil & Gas", desc: "Alloy solutions for upstream & downstream.", icon: Flame, image: "/images/hero/steel-closeup.jpg", href: "/#industries" },
  { label: "Petrochemical", desc: "High-temp refinery piping components.", icon: Fuel, image: "/images/factory/factory-floor-1.jpg", href: "/#industries" },
  { label: "Marine", desc: "Saltwater-resistant offshore piping.", icon: Ship, image: "/images/factory/warehouse-1.jpg", href: "/#industries" },
  { label: "Shipbuilding", desc: "Structural tubes & fluid system lines.", icon: ShieldCheck, image: "/images/factory/products-stack.jpg", href: "/#industries" },
  { label: "Power Generation", desc: "Boiler and high-pressure steam pipes.", icon: Zap, image: "/images/gallery/testing.jpg", href: "/#industries" },
  { label: "Water Treatment", desc: "Desalination purification piping.", icon: Droplets, image: "/images/factory/factory-floor-4.jpg", href: "/#industries" },
  { label: "Infrastructure", desc: "Heavy structural structural framing columns.", icon: Building2, image: "/images/products/pipes.jpg", href: "/#industries" },
  { label: "Food Processing", desc: "Hygienic polished stainless tubes.", icon: Utensils, image: "/images/factory/factory-floor-3.jpg", href: "/#industries" },
];

// Technical Data Mega Menu Left: Engineer-focused cards
const TECHNICAL_CARDS = [
  { label: "Material Grades", desc: "Detailed chemistry spec tables.", count: "12+ Charts", icon: Sparkles, href: "/technical-data?tab=pipes" },
  { label: "Standards", desc: "ASTM, ASME, API, DIN, EN.", count: "8+ Formats", icon: FileText, href: "/technical-data?tab=pipes" },
  { label: "Pressure Classes", desc: "Flange ratings (150-2500).", count: "6+ Levels", icon: Gauge, href: "/technical-data?tab=flanges" },
  { label: "Schedules", desc: "Boiler schedules & tolerances.", count: "14+ Sizes", icon: Layers, href: "/technical-data?tab=pipes" },
  { label: "Chemical Composition", desc: "Alloy composition breakdowns.", count: "25+ Grades", icon: FlaskConical, href: "/technical-data?tab=pipes" },
  { label: "Mechanical Properties", desc: "Tensile, yield & hardness.", count: "18+ Specs", icon: Flame, href: "/technical-data?tab=pipes" },
  { label: "Downloads", desc: "Access catalogue PDFs.", count: "12+ Files", icon: Download, href: "/downloads/SRS-Catalogue.pdf", external: true },
  { label: "Certifications", desc: "ISO management & PED lookup.", count: "5+ Forms", icon: Award, href: "/about#certifications" },
  { label: "Data Sheets", desc: "Specific product datasheets.", count: "40+ Files", icon: Layers, href: "/technical-data?tab=pipes" },
];

// About Mega Menu Left: Company discovery cards
const ABOUT_SECTIONS = [
  { label: "Company Profile", desc: "Our 40+ year legacy in Navi Mumbai.", icon: Building2, href: "/about" },
  { label: "Manufacturing Process", desc: "Hot forming, bending, heat treatment.", icon: Factory, href: "/process" },
  { label: "Quality Assurance", desc: "Non-destructive testing & QC labs.", icon: ShieldCheck, href: "/about#qc-lab" },
  { label: "Certifications", desc: "ISO certificates & EU PED guidelines.", icon: Award, href: "/about#certifications" },
  { label: "Supply Network", desc: "Global logistics & dispatch lanes.", icon: Globe, href: "/about" },
  { label: "Product Gallery", desc: "Photos of Kalamboli stockyard.", icon: ImageIcon, href: "/gallery" },
  { label: "Blog & Insights", desc: "Industry news & market forecasts.", icon: BookOpen, href: "/blog" },
  { label: "Contact Us", desc: "Get in touch with head office.", icon: PhoneCall, href: "/contact" },
];

const COMPANY_HIGHLIGHTS = [
  { title: "40+ Years Experience", desc: "Over four decades of industry trade." },
  { title: "ISO Certified Facility", desc: "Fully certified quality control processes." },
  { title: "Global Supply Capability", desc: "Prompt exports to over 25 countries." },
  { title: "Premium Engineering", desc: "Special alloys & custom machining." },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  // Bind global keyboard shortcut (Cmd+K / Ctrl+K and /) for search trigger
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        if (
          e.key === "/" &&
          (document.activeElement?.tagName === "INPUT" ||
            document.activeElement?.tagName === "TEXTAREA" ||
            document.activeElement?.hasAttribute("contenteditable"))
        ) {
          return;
        }
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const toggleMobileExpanded = (label: string) => {
    setMobileExpanded((prev) => (prev === label ? null : label));
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "glass-header shadow-lg shadow-black/20 py-2 sm:py-2.5"
            : "bg-transparent py-4 sm:py-4.5"
        }`}
      >
        {/* Main centered layout container. Added relative class to establish positioning anchor for full-width dropdowns. */}
        <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo Lockup */}
          <Link
            href="/"
            className="relative z-10 flex items-center gap-2.5 group"
            aria-label="Shree Raj Steels Home"
            onClick={() => setIsMobileOpen(false)}
          >
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 bg-white rounded-md overflow-hidden border border-gray-200/50 p-0.5 flex items-center justify-center flex-shrink-0 transition-all duration-300">
              <div className="relative w-full h-full">
                <Image
                  src="/images/logo-emblem.png"
                  alt="SRS Logo"
                  fill
                  className="object-cover object-left"
                  priority
                />
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <div className="text-gold-500 font-[family-name:var(--font-playfair)] text-[15px] sm:text-[17px] font-bold tracking-wider leading-none mb-0.5 uppercase transition-colors group-hover:text-gold-400">
                SHREE RAJ STEELS
              </div>
              <div className="text-gray-400 text-[8px] tracking-[0.2em] uppercase font-semibold leading-none">
                Engineering Excellence
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-2 xl:gap-4.5" aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <div
                key={link.label}
                className="animate-dropdown-trigger"
                onMouseEnter={() => setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={link.href}
                  className="flex items-center gap-1 py-3 text-[13px] font-semibold text-white/95 hover:text-gold-500 transition-colors duration-200 tracking-wide select-none whitespace-nowrap"
                >
                  <span>{link.label}</span>
                  <ChevronDown
                    size={12}
                    className={`transition-transform duration-200 flex-shrink-0 text-white/60 ${
                      activeDropdown === link.label ? "rotate-180" : ""
                    }`}
                  />
                </Link>

                {/* Dropdowns / Mega Menu */}
                <AnimatePresence>
                  {activeDropdown === link.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.99 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.99 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      className={`absolute top-full mt-2.5 rounded-2xl bg-navy-850/98 backdrop-blur-2xl border border-white/10 shadow-2xl p-8 sm:p-10 pb-6 overflow-hidden left-0 right-0 mx-auto ${
                        link.label === "Products"
                          ? "w-[calc(100vw-48px)] max-w-[1392px]"
                          : link.label === "Industries"
                          ? "w-[calc(100vw-48px)] max-w-[1100px]"
                          : "w-[calc(100vw-48px)] max-w-[1100px]"
                      }`}
                    >
                      {/* 1. PRODUCTS MEGA MENU (Mockup-matched 4-column layout) */}
                      {link.label === "Products" && (
                        <div className="grid grid-cols-[20%_25%_22%_33%] gap-6 lg:gap-8">
                          {/* Column 1: Product Categories */}
                          <div className="flex flex-col gap-3">
                            <h4 className="text-[11px] font-bold text-gold-500 uppercase tracking-widest border-b border-white/5 pb-2 mb-1.5">
                              Product Categories
                            </h4>
                            <div className="flex flex-col gap-2">
                              {PRODUCT_CATEGORIES.map((item) => {
                                const IconComp = item.icon;
                                return (
                                  <Link
                                    key={item.label}
                                    href={item.href}
                                    className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-all duration-200"
                                    onClick={() => setActiveDropdown(null)}
                                  >
                                    <div className="w-8 h-8 rounded-full border border-white/10 text-gold-500 group-hover:bg-gold-500 group-hover:text-navy-900 group-hover:border-gold-500 transition-all duration-300 flex-shrink-0 flex items-center justify-center">
                                      <IconComp size={14} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="text-xs font-bold text-white group-hover:text-gold-500 transition-colors flex items-center justify-between">
                                        <span>{item.label}</span>
                                        <span className="text-[9px] text-gray-500 group-hover:text-gold-500 group-hover:translate-x-0.5 transition-all">→</span>
                                      </div>
                                      <p className="text-[10px] text-gray-400 leading-normal mt-0.5 group-hover:text-gray-300">
                                        {item.desc}
                                      </p>
                                    </div>
                                  </Link>
                                );
                              })}
                            </div>
                            <Link
                              href="/products"
                              className="text-[11px] font-bold text-gold-500 hover:text-gold-400 flex items-center gap-1 mt-2.5 pl-2"
                              onClick={() => setActiveDropdown(null)}
                            >
                              <span>View All Categories</span>
                              <span>→</span>
                            </Link>
                          </div>

                          {/* Column 2: Featured Products */}
                          <div className="flex flex-col gap-3">
                            <h4 className="text-[11px] font-bold text-gold-500 uppercase tracking-widest border-b border-white/5 pb-2 mb-1.5">
                              Featured Products
                            </h4>
                            <div className="grid grid-cols-1 gap-2.5">
                              {FEATURED_PRODUCTS.map((prod) => (
                                <Link
                                  key={prod.title}
                                  href={prod.href}
                                  className="group flex items-center justify-between p-2.5 rounded-xl border border-white/5 bg-white/2 hover:bg-white/5 hover:border-gold-500/20 transition-all duration-300"
                                  onClick={() => setActiveDropdown(null)}
                                >
                                  <div className="flex items-center gap-3.5 min-w-0">
                                    <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-white/5 flex-shrink-0 bg-navy-900">
                                      <Image
                                        src={prod.image}
                                        alt={prod.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                      />
                                    </div>
                                    <div className="min-w-0">
                                      <div className="text-[11px] font-bold text-white group-hover:text-gold-500 transition-colors truncate">
                                        {prod.title}
                                      </div>
                                      <p className="text-[9px] text-gray-400 mt-0.5 leading-normal line-clamp-1">
                                        {prod.desc}
                                      </p>
                                    </div>
                                  </div>
                                  <span className="text-[9px] text-gray-500 group-hover:text-gold-500 group-hover:translate-x-0.5 transition-all flex-shrink-0 pr-1">→</span>
                                </Link>
                              ))}
                            </div>

                            <Link
                              href="/products"
                              className="group flex items-center justify-between w-full mt-2.5 px-4 py-2.5 rounded-xl border border-white/10 hover:border-gold-500/30 bg-white/2 hover:bg-white/5 text-xs font-bold text-white transition-all duration-300"
                              onClick={() => setActiveDropdown(null)}
                            >
                              <div className="flex items-center gap-2">
                                <Layers size={13} className="text-gold-500" />
                                <span>View All Products</span>
                              </div>
                              <ArrowRight size={13} className="text-gray-500 group-hover:text-gold-500 group-hover:translate-x-0.5 transition-all" />
                            </Link>
                          </div>

                          {/* Column 3: Applications */}
                          <div className="flex flex-col gap-3">
                            <h4 className="text-[11px] font-bold text-gold-500 uppercase tracking-widest border-b border-white/5 pb-2 mb-1.5">
                              Applications
                            </h4>
                            <div className="grid grid-cols-1 gap-2 max-h-[340px] overflow-y-auto custom-scrollbar pr-1">
                              {PRODUCT_APPLICATIONS.map((app) => {
                                const AppIcon = app.icon;
                                return (
                                  <Link
                                    key={app.label}
                                    href={app.href}
                                    className="group flex items-start gap-3 p-1.5 rounded-xl hover:bg-white/5 transition-all duration-200"
                                    onClick={() => setActiveDropdown(null)}
                                  >
                                    <div className="p-1.5 rounded-lg bg-white/5 text-gray-400 group-hover:text-gold-500 group-hover:bg-gold-500/10 transition-all mt-0.5 flex-shrink-0">
                                      <AppIcon size={12} />
                                    </div>
                                    <div>
                                      <div className="text-[11px] font-bold text-white group-hover:text-gold-500 transition-colors">
                                        {app.label}
                                      </div>
                                      <p className="text-[9px] text-gray-400 group-hover:text-gray-300 leading-normal mt-0.5">
                                        {app.desc}
                                      </p>
                                    </div>
                                  </Link>
                                );
                              })}
                            </div>
                            <Link
                              href="/services"
                              className="text-[11px] font-bold text-gold-500 hover:text-gold-400 flex items-center gap-1 mt-2.5 pl-1.5"
                              onClick={() => setActiveDropdown(null)}
                            >
                              <span>View All Applications</span>
                              <span>→</span>
                            </Link>
                          </div>

                          {/* Column 4: Showcase Highlight & Highlights Strip */}
                          <div className="flex flex-col h-full justify-between">
                            <div>
                              <h4 className="text-[11px] font-bold text-gold-500 uppercase tracking-widest border-b border-white/5 pb-2 mb-3.5">
                                Showcase Highlight
                              </h4>
                              <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-white/10 group/card">
                                <Image
                                  src="/images/hero/steel-closeup.jpg"
                                  alt="Engineering Excellence"
                                  fill
                                  className="object-cover group-hover/card:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-900/50 to-transparent" />
                                <div className="absolute inset-0 p-4 sm:p-5 flex flex-col justify-end">
                                  <span className="text-[8px] font-bold text-gold-500 tracking-[0.2em] uppercase mb-1 block">
                                    — Engineering Excellence
                                  </span>
                                  <h5 className="text-[13px] sm:text-[14px] font-[family-name:var(--font-playfair)] font-bold text-white leading-tight mb-1.5 group-hover/card:text-gold-500 transition-colors">
                                    Precision Engineered Products for Critical Industries
                                  </h5>
                                  <p className="text-[9px] sm:text-[10px] text-gray-300 leading-relaxed mb-3.5">
                                    Premium pipes, fittings, flanges and alloy solutions trusted worldwide for performance and reliability.
                                  </p>
                                  <Link
                                    href="/products"
                                    className="w-fit inline-flex items-center gap-2 px-4 py-2 bg-gold-500 text-navy-900 hover:bg-gold-400 transition-all rounded-[6px] text-[10px] font-bold shadow-md shadow-gold-500/10 group/btn"
                                    onClick={() => setActiveDropdown(null)}
                                  >
                                    <span>Explore Product Range</span>
                                    <ArrowRight size={10} className="group-hover/btn:translate-x-0.5 transition-transform" />
                                  </Link>
                                </div>
                              </div>
                            </div>

                            {/* Trust badges row matching mockup */}
                            <div className="grid grid-cols-3 gap-2 mt-4">
                              <div className="p-2 rounded-xl bg-white/2 border border-white/5 flex flex-col items-center justify-center text-center">
                                <span className="text-[11px] font-extrabold text-gold-500">40+</span>
                                <span className="text-[7.5px] text-gray-400 uppercase font-bold tracking-wider mt-0.5">Years Exp.</span>
                              </div>
                              <div className="p-2 rounded-xl bg-white/2 border border-white/5 flex flex-col items-center justify-center text-center">
                                <span className="text-[11px] font-extrabold text-gold-500">ISO 9001</span>
                                <span className="text-[7.5px] text-gray-400 uppercase font-bold tracking-wider mt-0.5">PED Certified</span>
                              </div>
                              <div className="p-2 rounded-xl bg-white/2 border border-white/5 flex flex-col items-center justify-center text-center">
                                <span className="text-[11px] font-extrabold text-gold-500">Global</span>
                                <span className="text-[7.5px] text-gray-400 uppercase font-bold tracking-wider mt-0.5">Supply Net</span>
                              </div>
                            </div>
                          </div>

                          {/* Aligned Full-width Footer Bar inside grid spans all columns */}
                          <div className="col-span-4 mt-6 pt-5 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <p className="text-[10px] text-gray-400 leading-relaxed max-w-2xl text-left">
                              40+ years of expertise in manufacturing seamless pipes, fittings, flanges & special alloy products. Serving industries worldwide with precision-engineered solutions.
                            </p>
                            <div className="flex items-center gap-3 shrink-0">
                              <Link
                                href="/quote"
                                className="px-4.5 py-2 bg-gold-500 hover:bg-gold-400 text-navy-900 text-[10.5px] font-bold rounded-[6px] transition-colors flex items-center gap-1"
                                onClick={() => setActiveDropdown(null)}
                              >
                                <span>Request a Quote</span>
                                <ArrowRight size={11} />
                              </Link>
                              <Link
                                href="/products"
                                className="px-4.5 py-2 bg-white/5 border border-white/10 hover:border-gold-500/20 text-white hover:text-gold-500 text-[10.5px] font-bold rounded-[6px] transition-colors flex items-center gap-1"
                                onClick={() => setActiveDropdown(null)}
                              >
                                <span>Explore Products</span>
                                <ArrowRight size={11} />
                              </Link>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* 2. INDUSTRIES MEGA MENU */}
                      {link.label === "Industries" && (
                        <div className="grid grid-cols-[70%_30%] gap-6">
                          {/* Column 1: Grid of Visual Cards */}
                          <div>
                            <h4 className="text-[10px] font-bold text-gold-500 uppercase tracking-widest border-b border-white/5 pb-2 mb-3.5">
                              Sectors We Serve
                            </h4>
                            <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                              {INDUSTRY_CARDS.map((ind) => {
                                const IndIcon = ind.icon;
                                return (
                                  <Link
                                    key={ind.label}
                                    href={ind.href}
                                    className="group flex items-center gap-3.5 p-2 rounded-xl bg-white/2 hover:bg-white/5 border border-white/5 hover:border-gold-500/20 transition-all duration-300"
                                    onClick={() => setActiveDropdown(null)}
                                  >
                                    <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-white/5 flex-shrink-0">
                                      <Image
                                        src={ind.image}
                                        alt={ind.label}
                                        fill
                                        className="object-cover opacity-60 group-hover:opacity-100 transition-opacity"
                                      />
                                      <div className="absolute inset-0 bg-navy-950/40" />
                                      <div className="absolute inset-0 flex items-center justify-center text-gold-500 group-hover:scale-110 transition-transform">
                                        <IndIcon size={16} />
                                      </div>
                                    </div>
                                    <div className="min-w-0">
                                      <div className="text-xs font-bold text-white group-hover:text-gold-500 transition-colors">
                                        {ind.label}
                                      </div>
                                      <p className="text-[9px] text-gray-400 mt-0.5 leading-normal line-clamp-1">
                                        {ind.desc}
                                      </p>
                                    </div>
                                  </Link>
                                );
                              })}
                            </div>
                          </div>

                          {/* Column 2: Industry Solutions Showcase */}
                          <div className="flex flex-col h-full justify-between">
                            <div>
                              <h4 className="text-[10px] font-bold text-gold-500 uppercase tracking-widest border-b border-white/5 pb-2 mb-3.5">
                                Solutions Showcase
                              </h4>
                              <div className="relative aspect-[16/11] w-full rounded-xl overflow-hidden border border-white/10 group/card">
                                <Image
                                  src="/images/factory/factory-floor-3.jpg"
                                  alt="Serving Critical Industries"
                                  fill
                                  className="object-cover group-hover/card:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-900/60 to-transparent" />
                                <div className="absolute inset-0 p-4 flex flex-col justify-end">
                                  <h5 className="text-[11px] font-bold text-white mb-0.5 group-hover/card:text-gold-500 transition-colors">
                                    Serving Critical Industries Worldwide
                                  </h5>
                                  <p className="text-[9px] text-gray-300 leading-normal mb-3">
                                    Supplying precision-engineered products to energy, chemical, marine and infrastructure sectors.
                                  </p>
                                  <Link
                                    href="/services"
                                    className="inline-flex items-center gap-1.5 text-[10px] font-bold text-gold-500 hover:text-gold-400 transition-colors group/btn"
                                    onClick={() => setActiveDropdown(null)}
                                  >
                                    <span>Explore Industries</span>
                                    <ArrowRight size={10} className="group-hover/btn:translate-x-0.5 transition-transform" />
                                  </Link>
                                </div>
                              </div>
                            </div>

                            <div className="mt-4 pt-3 border-t border-white/5 text-[9px] text-gray-500 text-center uppercase tracking-wider font-semibold">
                              Worldwide Logistics &amp; Delivery
                            </div>
                          </div>
                        </div>
                      )}

                      {/* 3. TECHNICAL DATA MEGA MENU */}
                      {link.label === "Technical Data" && (
                        <div className="grid grid-cols-[70%_30%] gap-6">
                          {/* Column 1: Grid of Technical Sections */}
                          <div>
                            <h4 className="text-[10px] font-bold text-gold-500 uppercase tracking-widest border-b border-white/5 pb-2 mb-3.5">
                              Technical Resource Cards
                            </h4>
                            <div className="grid grid-cols-3 gap-3">
                              {TECHNICAL_CARDS.map((sec) => {
                                const SecIcon = sec.icon;
                                const isExternal = "external" in sec && sec.external;
                                return (
                                  <Link
                                    key={sec.label}
                                    href={sec.href}
                                    target={isExternal ? "_blank" : undefined}
                                    rel={isExternal ? "noopener noreferrer" : undefined}
                                    className="group flex flex-col p-2.5 rounded-xl border border-white/5 bg-white/2 hover:bg-white/5 hover:border-gold-500/20 transition-all duration-205 text-left"
                                    onClick={() => setActiveDropdown(null)}
                                  >
                                    <div className="flex items-center justify-between gap-2 mb-1.5">
                                      <div className="p-1 rounded bg-gold-500/10 text-gold-500 group-hover:bg-gold-500 group-hover:text-navy-900 transition-all flex-shrink-0">
                                        <SecIcon size={12} />
                                      </div>
                                      <span className="text-[8px] font-bold text-gold-500/80 uppercase tracking-wide bg-gold-500/5 border border-gold-500/10 px-1 rounded select-none">
                                        {sec.count}
                                      </span>
                                    </div>
                                    <div className="text-[11px] font-bold text-white group-hover:text-gold-500 transition-colors">
                                      {sec.label}
                                    </div>
                                    <p className="text-[9px] text-gray-400 leading-normal mt-0.5">
                                      {sec.desc}
                                    </p>
                                  </Link>
                                );
                              })}
                            </div>
                          </div>

                          {/* Column 2: Featured PDF Downloads Card */}
                          <div className="flex flex-col h-full justify-between">
                            <div>
                              <h4 className="text-[10px] font-bold text-gold-500 uppercase tracking-widest border-b border-white/5 pb-2 mb-3.5">
                                Technical Catalogues
                              </h4>
                              <div className="relative aspect-[16/11] w-full rounded-xl overflow-hidden border border-white/10 group/card">
                                <Image
                                  src="/images/factory/warehouse-1.jpg"
                                  alt="Technical Catalogues"
                                  fill
                                  className="object-cover group-hover/card:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-900/60 to-transparent" />
                                <div className="absolute inset-0 p-4 flex flex-col justify-end">
                                  <h5 className="text-[11px] font-bold text-white mb-0.5 group-hover/card:text-gold-500 transition-colors">
                                    Engineering Manual
                                  </h5>
                                  <p className="text-[9px] text-gray-300 leading-normal mb-3">
                                    Download dimension charts, mechanical properties, and pressure tolerances.
                                  </p>
                                  <Link
                                    href="/downloads/SRS-Catalogue.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 text-[10px] font-bold text-gold-500 hover:text-gold-400 transition-colors group/btn"
                                    onClick={() => setActiveDropdown(null)}
                                  >
                                    <span>Download Catalogue</span>
                                    <Download size={10} className="group-hover/btn:scale-110 transition-transform" />
                                  </Link>
                                </div>
                              </div>
                            </div>

                            <div className="mt-4 pt-3 border-t border-white/5 text-[9px] text-gray-500 text-center uppercase tracking-wider font-semibold">
                              Updated for 2026 Standards
                            </div>
                          </div>
                        </div>
                      )}

                      {/* 4. ABOUT COMPANY MEGA MENU */}
                      {link.label === "About" && (
                        <div className="grid grid-cols-[70%_30%] gap-6">
                          {/* Column 1: Grid of About Pages */}
                          <div>
                            <h4 className="text-[10px] font-bold text-gold-500 uppercase tracking-widest border-b border-white/5 pb-2 mb-3.5">
                              Corporate Profile
                            </h4>
                            <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                              {ABOUT_SECTIONS.map((sec) => {
                                const SecIcon = sec.icon;
                                return (
                                  <Link
                                    key={sec.label}
                                    href={sec.href}
                                    className="group flex items-start gap-3 p-2 rounded-xl hover:bg-white/5 transition-all duration-200"
                                    onClick={() => setActiveDropdown(null)}
                                  >
                                    <div className="p-1.5 rounded-lg bg-gold-500/10 border border-gold-500/20 text-gold-500 group-hover:bg-gold-500 group-hover:text-navy-900 group-hover:border-gold-500 transition-all duration-300 mt-0.5 flex-shrink-0">
                                      <SecIcon size={13} />
                                    </div>
                                    <div>
                                      <div className="text-xs font-bold text-white group-hover:text-gold-500 transition-colors">
                                        {sec.label}
                                      </div>
                                      <p className="text-[9px] text-gray-400 leading-normal mt-0.5 group-hover:text-gray-300 font-medium">
                                        {sec.desc}
                                      </p>
                                    </div>
                                  </Link>
                                );
                              })}
                            </div>
                          </div>

                          {/* Column 2: Highlights badging panel */}
                          <div className="flex flex-col h-full justify-between">
                            <div>
                              <h4 className="text-[10px] font-bold text-gold-500 uppercase tracking-widest border-b border-white/5 pb-2 mb-3.5">
                                Highlights &amp; Trust
                              </h4>
                              <div className="flex flex-col gap-2.5">
                                {COMPANY_HIGHLIGHTS.map((high) => (
                                  <div
                                    key={high.title}
                                    className="p-2.5 rounded-xl bg-white/2 border border-white/5 flex flex-col gap-0.5 hover:border-gold-500/20 transition-all duration-300"
                                  >
                                    <div className="text-[10px] font-bold text-gold-500 uppercase tracking-wider">
                                      {high.title}
                                    </div>
                                    <p className="text-[9px] text-gray-350 leading-normal">
                                      {high.desc}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="mt-4 pt-3 border-t border-white/5 text-[9px] text-gray-500 text-center uppercase tracking-wider font-semibold">
                              Est. 2019 • 40+ Years Legacy
                            </div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* Right Section — Search + Phone + CTA */}
          <div className="hidden xl:flex items-center gap-4 xl:gap-5 flex-shrink-0">
            {/* Search Pill Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center justify-between w-48 xl:w-64 h-9 px-3 rounded-full bg-white/5 border border-white/10 hover:border-gold-500/30 text-gray-400 hover:text-gray-300 transition-all duration-300 cursor-pointer shadow-inner hover:shadow-[0_0_15px_rgba(201,168,76,0.15)] group"
              aria-label="Search website"
            >
              <div className="flex items-center gap-2 min-w-0">
                <Search size={13} className="text-gold-500 transition-transform group-hover:scale-115 flex-shrink-0" />
                <span className="text-[11px] font-medium tracking-wide truncate">
                  Search Products, Grades, Standards...
                </span>
              </div>
              <kbd className="hidden lg:inline-flex items-center gap-0.5 border border-white/10 bg-white/10 px-1.5 py-0.5 rounded text-[8px] text-gray-400 font-sans select-none flex-shrink-0">
                ⌘K
              </kbd>
            </button>

            {/* Phone Call */}
            <a
              href={`tel:${COMPANY.phones[0].replace(/\s/g, "")}`}
              className="flex items-center gap-1.5 text-[13px] font-semibold text-white/90 hover:text-gold-500 transition-colors duration-200 whitespace-nowrap"
              aria-label={`Call us at ${COMPANY.phones[0]}`}
            >
              <Phone size={13} className="text-gold-500 flex-shrink-0" />
              <span className="font-semibold">{COMPANY.phones[0]}</span>
            </a>

            {/* Vertical Visual Divider */}
            <div className="w-[1px] h-5 bg-white/15 self-center" />

            {/* Get a Quote CTA */}
            <Link
              href="/quote"
              className="px-5 py-2 bg-gold-500 text-navy-900 text-[13px] font-bold rounded-[6px] hover:bg-gold-400 transition-all duration-200 hover:scale-[1.03] active:scale-95 shadow-md shadow-gold-500/10 hover:shadow-gold-500/25 flex-shrink-0"
            >
              Get a Quote
            </Link>
          </div>

          {/* Mobile Right Actions — Search + Menu */}
          <div className="flex items-center gap-1.5 xl:hidden relative z-10">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="w-9 h-9 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-500 hover:bg-gold-500 hover:text-navy-900 hover:border-gold-500 flex items-center justify-center transition-all duration-300 cursor-pointer"
              aria-label="Search website"
            >
              <Search size={16} />
            </button>
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="p-2 text-white cursor-pointer"
              aria-label={isMobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileOpen}
            >
              {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-navy-900/98 backdrop-blur-md xl:hidden flex flex-col pt-24 px-6 pb-8"
          >
            <nav className="flex flex-col w-full max-h-[75vh] overflow-y-auto py-4 px-2 custom-scrollbar" aria-label="Mobile navigation">
              {NAV_LINKS.map((link) => (
                <div key={link.label} className="w-full border-b border-white/5 py-3">
                  {/* Category Header Button */}
                  <button
                    onClick={() => toggleMobileExpanded(link.label)}
                    className="w-full flex items-center justify-between text-left text-base font-bold text-white hover:text-gold-500 transition-colors uppercase tracking-wider py-1.5 focus:outline-none"
                  >
                    <span>{link.label}</span>
                    <ChevronDown
                      size={18}
                      className={`text-gray-400 transition-transform duration-200 ${
                        mobileExpanded === link.label ? "rotate-180 text-gold-500" : ""
                      }`}
                    />
                  </button>

                  {/* Accordion Content */}
                  <AnimatePresence initial={false}>
                    {mobileExpanded === link.label && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="flex flex-col gap-2.5 pt-3 pb-2 pl-2 border-l border-white/5 ml-1 mt-1">
                          {/* Products specific mobile categories */}
                          {link.label === "Products" && (
                            <>
                              <div className="text-[10px] font-bold text-gold-500/80 uppercase tracking-widest mb-1">
                                Product Categories
                              </div>
                              {PRODUCT_CATEGORIES.map((item) => (
                                <Link
                                  key={item.label}
                                  href={item.href}
                                  onClick={() => {
                                    setIsMobileOpen(false);
                                    setMobileExpanded(null);
                                  }}
                                  className="text-sm text-gray-400 hover:text-gold-500 transition-colors py-0.5 pl-2 flex items-center justify-between"
                                >
                                  <span>{item.label}</span>
                                  <span className="text-xs text-gray-655">→</span>
                                </Link>
                              ))}

                              <div className="text-[10px] font-bold text-gold-500/80 uppercase tracking-widest mt-3 mb-1">
                                Materials
                              </div>
                              {("materials" in link) &&
                                (link.materials as any).map((mat: any) => (
                                  <Link
                                    key={mat.label}
                                    href={mat.href}
                                    onClick={() => {
                                      setIsMobileOpen(false);
                                      setMobileExpanded(null);
                                    }}
                                    className="text-sm text-gray-400 hover:text-gold-500 transition-colors py-0.5 pl-2 flex items-center justify-between"
                                  >
                                    <span>{mat.label}</span>
                                    <span className="text-xs text-gray-655">→</span>
                                  </Link>
                                ))}

                              <div className="text-[10px] font-bold text-gold-500/80 uppercase tracking-widest mt-3 mb-1">
                                Resources
                              </div>
                              {("resources" in link) &&
                                (link.resources as any).map((res: any) => (
                                  <Link
                                    key={res.label}
                                    href={res.href}
                                    onClick={() => {
                                      setIsMobileOpen(false);
                                      setMobileExpanded(null);
                                    }}
                                    className="text-sm text-gray-400 hover:text-gold-500 transition-colors py-0.5 pl-2 flex items-center justify-between"
                                  >
                                    <span>{res.label}</span>
                                    <span className="text-xs text-gray-655">→</span>
                                  </Link>
                                ))}
                            </>
                          )}

                          {/* Industries specific mobile grid */}
                          {link.label === "Industries" &&
                            INDUSTRY_CARDS.map((ind) => (
                              <Link
                                key={ind.label}
                                href={ind.href}
                                onClick={() => {
                                  setIsMobileOpen(false);
                                  setMobileExpanded(null);
                                }}
                                className="text-sm text-gray-400 hover:text-gold-500 transition-colors py-1 flex items-center justify-between"
                              >
                                <span>{ind.label}</span>
                                <span className="text-xs text-gray-650">→</span>
                              </Link>
                            ))}

                          {/* Technical Data mobile list */}
                          {link.label === "Technical Data" &&
                            TECHNICAL_CARDS.map((sec) => (
                              <Link
                                key={sec.label}
                                href={sec.href}
                                onClick={() => {
                                  setIsMobileOpen(false);
                                  setMobileExpanded(null);
                                }}
                                className="text-sm text-gray-400 hover:text-gold-500 transition-colors py-1 flex items-center justify-between"
                              >
                                <span>{sec.label}</span>
                                <span className="text-xs text-gray-650">→</span>
                              </Link>
                            ))}

                          {/* About mobile list */}
                          {link.label === "About" &&
                            ABOUT_SECTIONS.map((sec) => (
                              <Link
                                key={sec.label}
                                href={sec.href}
                                onClick={() => {
                                  setIsMobileOpen(false);
                                  setMobileExpanded(null);
                                }}
                                className="text-sm text-gray-400 hover:text-gold-500 transition-colors py-1 flex items-center justify-between"
                              >
                                <span>{sec.label}</span>
                                <span className="text-xs text-gray-650">→</span>
                              </Link>
                            ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}

              {/* Mobile CTA */}
              <div className="mt-8 flex flex-col items-center gap-4 w-full">
                <Link
                  href="/quote"
                  onClick={() => setIsMobileOpen(false)}
                  className="w-full text-center py-3.5 bg-gold-500 text-navy-900 font-bold rounded-lg text-base shadow-lg shadow-gold-500/10 hover:bg-gold-400 transition-colors"
                >
                  Get a Quote
                </Link>
                <a
                  href={`tel:${COMPANY.phones[0].replace(/\s/g, "")}`}
                  className="flex items-center justify-center gap-2 text-gold-500 text-sm font-semibold hover:text-gold-400 transition-colors"
                >
                  <Phone size={15} />
                  <span>Call Us: {COMPANY.phones[0]}</span>
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Popup Modal */}
      <AnimatePresence>
        {isSearchOpen && <SearchPopup onClose={() => setIsSearchOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
