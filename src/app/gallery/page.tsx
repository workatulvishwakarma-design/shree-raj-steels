"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import Breadcrumb from "@/components/ui/Breadcrumb";

const galleryImages = [
  { id: 1, src: '/images/factory/factory-floor-1.jpg', alt: 'Factory floor with pipe fittings production', category: 'Factory & Facility' },
  { id: 2, src: '/images/factory/factory-floor-2.jpg', alt: 'Large pipe fittings in manufacturing facility', category: 'Factory & Facility' },
  { id: 3, src: '/images/factory/factory-floor-3.jpg', alt: 'Industrial pipe bending equipment', category: 'Factory & Facility' },
  { id: 4, src: '/images/factory/factory-floor-4.jpg', alt: 'Factory equipment and machinery', category: 'Factory & Facility' },
  { id: 5, src: '/images/products/elbows.jpg', alt: 'Steel elbows stacked in warehouse', category: 'Products' },
  { id: 6, src: '/images/products/flanges.jpg', alt: 'Precision machined steel flanges', category: 'Products' },
  { id: 7, src: '/images/products/pipes.jpg', alt: 'Seamless steel pipes in storage', category: 'Products' },
  { id: 8, src: '/images/products/tees.jpg', alt: 'Steel tee fittings', category: 'Products' },
  { id: 9, src: '/images/products/reducers.jpg', alt: 'Concentric and eccentric reducers', category: 'Products' },
  { id: 10, src: '/images/products/special.jpg', alt: 'Special alloy pipe fittings', category: 'Products' },
  { id: 11, src: '/images/products/warehouse.jpg', alt: 'SRS warehouse with product inventory', category: 'Stock & Warehouse' },
  { id: 12, src: '/images/factory/warehouse-1.jpg', alt: 'Steel products storage area', category: 'Stock & Warehouse' },
  { id: 13, src: '/images/factory/products-stack.jpg', alt: 'Stacked pipe fittings ready for dispatch', category: 'Stock & Warehouse' },
];

const categories = ['All', 'Factory & Facility', 'Products', 'Stock & Warehouse'];

export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState('All');
  const [filteredImages, setFilteredImages] = useState(galleryImages);
  
  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (activeTab === 'All') {
      setFilteredImages(galleryImages);
    } else {
      setFilteredImages(galleryImages.filter(img => img.category === activeTab));
    }
  }, [activeTab]);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "";
  };

  const showNext = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredImages.length);
  };

  const showPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, filteredImages.length]);

  return (
    <>
      <section className="relative h-[30vh] min-h-[300px] flex items-center justify-center bg-navy-800">
        <div className="absolute inset-0 bg-[url('/images/hero/aerial-factory.png')] bg-cover bg-center opacity-30 mix-blend-overlay"></div>
        <div className="relative z-10 text-center px-4 w-full max-w-[1440px] mx-auto">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Gallery" }]} />
          <h1 className="text-4xl sm:text-5xl font-[family-name:var(--font-playfair)] font-bold text-white mt-4">
            Facility & Gallery
          </h1>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Filters */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveTab(category)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-colors duration-200 ${
                  activeTab === category
                    ? "bg-gold-500 text-navy-900 shadow-md"
                    : "bg-navy-700 text-gray-300 hover:bg-navy-600"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Grid */}
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredImages.map((image, index) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  key={image.id}
                  className="relative group aspect-w-4 aspect-h-3 rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all"
                  onClick={() => openLightbox(index)}
                >
                  <div className="relative w-full pb-[75%]">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-navy-900/0 group-hover:bg-navy-900/40 transition-colors duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-300 bg-gold-500 text-navy-900 p-3 rounded-full">
                        <Maximize2 size={24} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Top Bar */}
            <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center text-white z-10 bg-gradient-to-b from-black/80 to-transparent">
              <div className="text-sm font-medium tracking-widest text-gold-500">
                {currentIndex + 1} / {filteredImages.length}
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
                className="p-2 bg-white/10 hover:bg-gold-500 hover:text-navy-900 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Prev Button */}
            <button
              onClick={(e) => { e.stopPropagation(); showPrev(); }}
              className="absolute left-4 p-3 bg-white/10 hover:bg-gold-500 hover:text-navy-900 rounded-full transition-colors text-white z-10"
            >
              <ChevronLeft size={32} />
            </button>

            {/* Main Image */}
            <div className="relative w-full max-w-5xl h-[80vh] px-16" onClick={(e) => e.stopPropagation()}>
              <Image
                src={filteredImages[currentIndex].src}
                alt={filteredImages[currentIndex].alt}
                fill
                className="object-contain"
                quality={100}
              />
              <div className="absolute bottom-[-40px] left-0 right-0 text-center text-gray-300 text-sm">
                {filteredImages[currentIndex].alt}
              </div>
            </div>

            {/* Next Button */}
            <button
              onClick={(e) => { e.stopPropagation(); showNext(); }}
              className="absolute right-4 p-3 bg-white/10 hover:bg-gold-500 hover:text-navy-900 rounded-full transition-colors text-white z-10"
            >
              <ChevronRight size={32} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
