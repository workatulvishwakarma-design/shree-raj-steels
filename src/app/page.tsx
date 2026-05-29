"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  Phone,
  Mail,
  Shield,
  Download,
  FlaskRound,
  Atom,
  Fuel,
  Flame,
  Ship,
  UtensilsCrossed,
  Droplets,
  Beaker,
} from "lucide-react";
import { COMPANY, STATS, INDUSTRIES } from "@/lib/constants";
import { PRODUCTS } from "@/data/products";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import SectionHeader from "@/components/ui/SectionHeader";
import Preloader from "@/components/ui/Preloader";

// WhatsApp icon
function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

// Industry icon mapping
const iconMap: Record<string, React.ReactNode> = {
  Flask: <FlaskRound size={32} />,
  Atom: <Atom size={32} />,
  Fuel: <Fuel size={32} />,
  Flame: <Flame size={32} />,
  Ship: <Ship size={32} />,
  UtensilsCrossed: <UtensilsCrossed size={32} />,
  Droplets: <Droplets size={32} />,
  Beaker: <Beaker size={32} />,
};

// Animation variants
const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={staggerContainer}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function HomePage() {
  const certLogos = [
    { src: "/images/certifications/bureau-veritas.svg", alt: "Bureau Veritas" },
    { src: "/images/certifications/tuv-rheinland.png", alt: "TÜV Rheinland" },
    { src: "/images/certifications/tuv-nord.webp", alt: "TÜV Nord" },
    { src: "/images/certifications/dnv.png", alt: "DNV" },
    { src: "/images/certifications/sgs.png", alt: "SGS" },
    { src: "/images/certifications/intertek.png", alt: "Intertek" },
    { src: "/images/certifications/toyo.png", alt: "Toyo Engineering" },
  ];

  return (
    <>
      <Preloader />
      {/* ==========================================
          SECTION 1: HERO BANNER
          ========================================== */}
      <section className="relative h-screen min-h-[600px] max-h-[1000px] flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero/steel-closeup.jpg"
            alt="Industrial steel manufacturing facility"
            fill
            className="object-cover"
            priority
            quality={85}
          />
          <div className="overlay-navy absolute inset-0" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl"
          >
            {/* Certification label */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold-500/30 bg-gold-500/10 mb-6"
            >
              <Shield size={14} className="text-gold-500" />
              <span className="text-xs font-semibold text-gold-500 tracking-[0.15em] uppercase">
                ISO 9001 + PED Certified Manufacturer
              </span>
            </motion.div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-[family-name:var(--font-playfair)] font-bold text-white leading-[1.1] mb-6">
              Engineering{" "}
              <span className="text-gold-gradient">Excellence</span>
              <br />
              in Every Fitting
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-8 max-w-xl">
              40+ years of expertise in manufacturing seamless pipes, fittings, flanges & special
              alloy products. Serving industries worldwide with precision-engineered solutions.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <Link
                href="/quote"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gold-500 text-navy-900 font-semibold rounded-lg hover:bg-gold-400 transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg shadow-gold-500/25 text-sm sm:text-base"
              >
                Request a Quote
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-lg hover:border-gold-500 hover:text-gold-500 transition-all duration-200 text-sm sm:text-base"
              >
                Explore Products
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Bottom certification strip */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-gold-500/20">
          <div className="bg-navy-900/60 backdrop-blur-sm py-4">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-center gap-8 sm:gap-12 overflow-x-auto">
                {certLogos.slice(0, 5).map((logo) => (
                  <div key={logo.alt} className="relative w-16 h-8 sm:w-20 sm:h-10 flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0">
                    <Image src={logo.src} alt={logo.alt} fill className="object-contain brightness-200" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 2: PRODUCT CATEGORIES
          ========================================== */}
      <section className="py-20 sm:py-28 bg-white" id="products">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <motion.div variants={fadeUpVariant}>
              <SectionHeader
                label="OUR PRODUCTS"
                title="Complete Range of Pipe, Fittings & Flanges"
                subtitle="From standard carbon steel to exotic alloys — we manufacture and supply the full spectrum of piping components for critical applications."
              />
            </motion.div>
          </AnimatedSection>

          <AnimatedSection>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {PRODUCTS.map((product, index) => (
                <motion.div key={product.slug} variants={fadeUpVariant}>
                  <Link
                    href={`/products/${product.slug}`}
                    className="group block bg-navy-700 rounded-xl overflow-hidden card-hover border border-transparent hover:border-b-gold-500 hover:border-b-[3px]"
                  >
                    {/* Product Image */}
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={product.cardImage}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-700 via-transparent to-transparent" />
                    </div>

                    {/* Product Info */}
                    <div className="p-5">
                      <h3 className="text-white font-semibold text-base mb-2 group-hover:text-gold-500 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                        {product.sizeRange}
                      </p>
                      <span className="inline-flex items-center gap-1 text-gold-500 text-sm font-medium group-hover:gap-2 transition-all">
                        View Specifications
                        <ArrowRight size={14} />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ==========================================
          SECTION 3: STATS COUNTER BAR
          ========================================== */}
      <section className="py-20 bg-navy-800 bg-grid-texture">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
            {STATS.map((stat) => (
              <AnimatedCounter
                key={stat.label}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 4: ABOUT SNAPSHOT
          ========================================== */}
      <section className="py-20 sm:py-28 bg-off-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center">
              {/* Text Column (3/5) */}
              <motion.div variants={fadeUpVariant} className="lg:col-span-3">
                <span className="text-xs font-semibold text-gold-500 tracking-[0.2em] uppercase mb-4 block">
                  ABOUT SRS
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-[family-name:var(--font-playfair)] font-bold text-gray-900 mb-6 leading-tight">
                  A Legacy of Quality.
                  <br />
                  <span className="text-gold-500">A Future of Innovation.</span>
                </h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  SHREE RAJ STEELS, founded in August 2019, comes with more than 40 years of
                  experience in the Pipes & Fittings industry. Registered under the trademark
                  &lsquo;SRS&rsquo;, the company manufactures all grades of materials and specifications of
                  seamless pipes, elbows, tees, reducers, stub ends, pipe caps, flanges, and
                  special fittings.
                </p>
                <p className="text-gray-600 leading-relaxed mb-8">
                  SRS specialises in special steel including nickel alloy, hard alloy, super
                  austenitic, and super duplex — achieving industry-leading technical maturity. The
                  company has established ISO 9001, ISO 14001, ISO 45001, CE-PED, and AD2000
                  certifications, and serves as a qualified supplier for BHEL, ONGC, Techniche,
                  Toyo Engineering, and Reliance.
                </p>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-gold-500 font-semibold hover:gap-3 transition-all duration-200 group"
                >
                  Learn More About Us
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>

              {/* Image Column (2/5) */}
              <motion.div variants={fadeUpVariant} className="lg:col-span-2">
                <div className="relative border-l-2 border-gold-500 pl-0">
                  <div className="relative h-[400px] sm:h-[500px] rounded-xl overflow-hidden shadow-2xl">
                    <Image
                      src="/images/factory/factory-floor-1.jpg"
                      alt="SRS factory floor with pipe fittings"
                      fill
                      className="object-cover"
                    />
                  </div>
                  {/* Floating stat badge */}
                  <div className="absolute -bottom-6 -left-6 bg-gold-500 text-navy-900 px-6 py-4 rounded-xl shadow-lg">
                    <div className="text-3xl font-[family-name:var(--font-playfair)] font-bold">40+</div>
                    <div className="text-xs font-semibold uppercase tracking-wider">Years Experience</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ==========================================
          SECTION 5: CERTIFICATION LOGOS MARQUEE
          ========================================== */}
      <section className="py-12 bg-white">
        <div className="border-y border-gold-300/30">
          <div className="py-8 overflow-hidden">
            <div className="flex animate-marquee">
              {[...certLogos, ...certLogos].map((logo, i) => (
                <div
                  key={`${logo.alt}-${i}`}
                  className="flex-shrink-0 mx-8 sm:mx-12 relative w-24 h-12 grayscale hover:grayscale-0 opacity-50 hover:opacity-100 transition-all duration-300"
                >
                  <Image src={logo.src} alt={logo.alt} fill className="object-contain" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 6: INDUSTRIES SERVED
          ========================================== */}
      <section className="py-20 sm:py-28 bg-navy-700">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <motion.div variants={fadeUpVariant}>
              <SectionHeader
                label="INDUSTRIES WE SERVE"
                title="Trusted Across Critical Sectors Worldwide"
                light={false}
              />
            </motion.div>
          </AnimatedSection>

          <AnimatedSection>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {INDUSTRIES.map((industry, index) => (
                <motion.div
                  key={industry.name}
                  variants={fadeUpVariant}
                  className="group p-6 rounded-xl bg-white/5 border border-white/10 hover:border-gold-500/30 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="text-gold-500 mb-4">
                    {iconMap[industry.icon] || <Shield size={32} />}
                  </div>
                  <h3 className="text-white font-semibold text-base mb-2">{industry.name}</h3>
                  <p className="text-gray-400 text-sm">{industry.description}</p>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ==========================================
          SECTION 7: CTA BANNER
          ========================================== */}
      <section className="py-16 sm:py-20 bg-gold-gradient">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-[family-name:var(--font-playfair)] font-bold text-navy-900 mb-3">
            Need a Custom Quote? Our Team Responds Within 2 Hours.
          </h2>
          <p className="text-navy-700 mb-8">Available Monday to Saturday, 9 AM – 7 PM IST</p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={`tel:${COMPANY.phones[0].replace(/\s/g, "")}`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-navy-900 text-white font-semibold rounded-lg hover:bg-navy-800 transition-colors text-sm"
            >
              <Phone size={18} />
              Call Now: {COMPANY.phones[0]}
            </a>
            <a
              href={`mailto:${COMPANY.email}`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-navy-900 text-white font-semibold rounded-lg hover:bg-navy-800 transition-colors text-sm"
            >
              <Mail size={18} />
              Email Us
            </a>
            <a
              href={`https://wa.me/${COMPANY.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] text-white font-semibold rounded-lg hover:bg-[#20BD5A] transition-colors text-sm"
            >
              <WhatsAppIcon size={18} />
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Download Catalogue floating bar */}
      <section className="py-6 bg-navy-900 border-t border-gold-500/20">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center gap-4">
          <Download size={20} className="text-gold-500" />
          <span className="text-white text-sm">Download our complete product catalogue</span>
          <a
            href="/downloads/SRS-Catalogue.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 bg-gold-500 text-navy-900 text-sm font-semibold rounded-lg hover:bg-gold-400 transition-colors"
          >
            Download PDF
          </a>
        </div>
      </section>
    </>
  );
}
