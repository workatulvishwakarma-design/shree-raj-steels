"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import SectionHeader from "@/components/ui/SectionHeader";
import Breadcrumb from "@/components/ui/Breadcrumb";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export default function ProductsPage() {
  const gridRef = useRef(null);
  const isGridInView = useInView(gridRef, { once: true, margin: "-80px" });

  return (
    <>
      {/* Page Hero */}
      <section className="relative h-[50vh] min-h-[350px] flex items-end bg-navy-800 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/factory/products-stack.jpg"
            alt="SRS product inventory"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-800 via-navy-800/80 to-navy-800/40" />
        </div>
        <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 w-full pb-12">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Products" }]} />
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-[family-name:var(--font-playfair)] font-bold text-white mt-4 mb-3">
            Our Products
          </h1>
          <p className="text-gray-300 text-base sm:text-lg max-w-2xl">
            Complete range of pipe, fittings & flanges — from standard carbon steel to exotic alloys, all manufactured to international standards.
          </p>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={gridRef}
            initial="hidden"
            animate={isGridInView ? "visible" : "hidden"}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            {PRODUCTS.map((product) => (
              <motion.div key={product.slug} variants={fadeUp}>
                <Link
                  href={`/products/${product.slug}`}
                  className="group block bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-gold-500/50 card-hover shadow-sm hover:shadow-xl"
                >
                  {/* Image */}
                  <div className="relative h-52 overflow-hidden bg-navy-700">
                    <Image
                      src={product.cardImage}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-800/60 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h2 className="text-lg font-semibold text-gray-900 group-hover:text-gold-500 transition-colors mb-2 font-[family-name:var(--font-playfair)]">
                      {product.name}
                    </h2>
                    <p className="text-sm text-gray-500 mb-3 line-clamp-2">{product.description}</p>

                    {/* Size Range */}
                    <div className="text-xs text-gray-400 mb-4 font-[family-name:var(--font-jetbrains)]">
                      {product.sizeRange}
                    </div>

                    {/* Standards preview */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {product.standards.slice(0, 3).map((std) => (
                        <span key={std} className="text-[10px] px-2 py-0.5 rounded-full bg-navy-700/10 text-navy-700 font-medium">
                          {std}
                        </span>
                      ))}
                      {product.standards.length > 3 && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-gold-500/10 text-gold-500 font-medium">
                          +{product.standards.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* Link */}
                    <span className="inline-flex items-center gap-1.5 text-gold-500 text-sm font-semibold group-hover:gap-3 transition-all">
                      View Details
                      <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Download catalogue CTA */}
      <section className="py-12 bg-navy-800">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-white text-xl font-[family-name:var(--font-playfair)] font-bold mb-1">
              Need the complete specifications?
            </h3>
            <p className="text-gray-400 text-sm">
              Download our detailed product catalogue with all dimensions, weights, and chemical compositions.
            </p>
          </div>
          <a
            href="/downloads/SRS-Catalogue.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gold-500 text-navy-900 font-semibold rounded-lg hover:bg-gold-400 transition-colors flex-shrink-0"
          >
            <Download size={18} />
            Download Catalogue (PDF)
          </a>
        </div>
      </section>
    </>
  );
}
