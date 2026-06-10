"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Quote, Target, Shield, Award, Factory, Globe, Package, Truck, Activity } from "lucide-react";
import { CERTIFICATIONS } from "@/lib/constants";
import SectionHeader from "@/components/ui/SectionHeader";
import Breadcrumb from "@/components/ui/Breadcrumb";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <motion.div ref={ref} initial="hidden" animate={isInView ? "visible" : "hidden"} variants={stagger} className={className}>
      {children}
    </motion.div>
  );
}

export function AboutContent() {
  return (
    <>
      {/* Page Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center bg-navy-800">
        <div className="absolute inset-0 bg-[url('/images/factory/factory-floor-2.jpg')] bg-cover bg-center opacity-30 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-transparent to-transparent"></div>
        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "About Us" }]} />
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mt-6 max-w-2xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-[family-name:var(--font-playfair)] font-bold text-white mb-4">
              The SRS Story: 40+ Years of Piping Excellence
            </h1>
            <p className="text-lg text-gray-300">
              From local expertise to global ambition — building a national brand on the world stage.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Company Brief */}
      <section className="py-20 sm:py-28 bg-off-white">
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <motion.div variants={fadeUp} className="prose prose-lg max-w-none text-gray-600">
              <p className="first-letter:text-6xl first-letter:font-bold first-letter:text-gold-500 first-letter:mr-3 first-letter:float-left first-letter:leading-none">
                SHREE RAJ STEELS, founded in August 2019, comes with more than 40 years of experience in the Pipes & Fittings industry, and is registered under the trademark &quot;SRS&quot;. The company mainly manufactures all grades of materials, specifications of seamless pipes, elbows, tees, reducers, stub ends, pipe caps, flanges, special fittings — especially in special steel such as nickel alloy steel, hard alloy steel, super austenitic steel, and super duplex steel — and has reached a very mature technical level, being in an industry-leading position.
              </p>
              <p className="mt-6">
                The company pays attention to talent recruitment and training, attaches great importance to technology research and development and scientific innovation, and has achieved many successes in material research and process innovation.
              </p>
              <p className="mt-6">
                In addition, SRS has provided qualified supplies for BHEL, ONGC, Techniche, Toyo Engineering, Reliance and more. The company has successfully launched all kinds of high-grade, high-performance, high-standard special steel pipe accessories series. Products are widely used in oil, chemical, LNG, nuclear power, shipbuilding, marine engineering, power plant boilers, papermaking, water treatment, semiconductor, and many other fields.
              </p>
              <p className="mt-6 text-xl font-medium text-navy-900 border-l-4 border-gold-500 pl-6 italic py-2">
                SHREE RAJ STEELS has become a multi-functional enterprise integrating research and development, manufacturing, sales, and service.
              </p>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-navy-800 bg-grid-texture relative">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-900 to-transparent opacity-50"></div>
        <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div variants={fadeUp} className="bg-navy-700 border border-white/10 rounded-2xl p-10 hover:border-gold-500/50 transition-colors group">
              <Quote className="w-12 h-12 text-gold-500 mb-6 opacity-80 group-hover:opacity-100 transition-opacity" />
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-500 mb-4">Our Mission</h2>
              <p className="text-3xl font-[family-name:var(--font-playfair)] text-white leading-tight">
                &quot;Doing a good job of every piece of pipe & fittings.&quot;
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="bg-navy-700 border border-white/10 rounded-2xl p-10 hover:border-gold-500/50 transition-colors group">
              <Target className="w-12 h-12 text-gold-500 mb-6 opacity-80 group-hover:opacity-100 transition-opacity" />
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-500 mb-4">Our Vision</h2>
              <p className="text-3xl font-[family-name:var(--font-playfair)] text-white leading-tight">
                &quot;Being the best pipe, fittings and flanges supplier in the world.&quot;
              </p>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 sm:py-28 bg-off-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <motion.div variants={fadeUp}>
              <SectionHeader label="ADVANTAGES" title="Why Choose SRS?" light={true} />
            </motion.div>
          </AnimatedSection>

          <AnimatedSection className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Shield, title: "Quality System", desc: "Comprehensive ISO 9001, 14001, 45001 and PED certified management systems." },
              { icon: Award, title: "Industry Experience", desc: "Over 40 years of profound technical expertise in the steel & pipe fittings industry." },
              { icon: Factory, title: "Management Systems", desc: "Internal ERP software for complete production tracking and quality assurance." },
              { icon: Package, title: "Finished Inventory", desc: "More than 1,500 tons of finished products ready for immediate dispatch." },
              { icon: Truck, title: "Raw Materials", desc: "Over 400 tons of raw materials always in stock to guarantee fast production times." },
              { icon: Globe, title: "Global Delivery", desc: "Efficient logistics for Pan-India and worldwide shipments to critical projects." }
            ].map((feature, i) => (
              <motion.div key={i} variants={fadeUp} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 rounded-full bg-gold-500/10 flex items-center justify-center mb-6">
                  <feature.icon className="text-gold-500 w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-navy-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </AnimatedSection>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 bg-white" id="certifications">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <motion.div variants={fadeUp}>
              <SectionHeader label="CERTIFICATIONS" title="Our Commitment to Quality" light={true} />
            </motion.div>
          </AnimatedSection>

          <AnimatedSection className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CERTIFICATIONS.map((cert, i) => (
              <motion.div key={i} variants={fadeUp} className="border border-gray-200 p-8 rounded-xl bg-gray-50/50 hover:bg-white hover:border-gold-500/50 hover:shadow-lg transition-all relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Shield size={120} />
                </div>
                <div className="relative z-10">
                  <Shield className="text-gold-500 w-8 h-8 mb-4" />
                  <h3 className="text-2xl font-[family-name:var(--font-playfair)] font-bold text-navy-900 mb-1">{cert.name}</h3>
                  <p className="text-sm font-semibold text-gray-500 mb-6">{cert.fullName}</p>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    {cert.certNo && (
                      <div className="flex justify-between border-b border-gray-200 pb-2">
                        <span className="font-medium text-gray-400">Certificate No.</span>
                        <span className="font-[family-name:var(--font-jetbrains)]">{cert.certNo}</span>
                      </div>
                    )}
                    {cert.validTill && (
                      <div className="flex justify-between border-b border-gray-200 pb-2">
                        <span className="font-medium text-gray-400">Valid Until</span>
                        <span>{cert.validTill}</span>
                      </div>
                    )}
                    {cert.issuedBy && (
                      <div className="flex justify-between pt-1">
                        <span className="font-medium text-gray-400">Issued By</span>
                        <span className="text-right max-w-[60%]">{cert.issuedBy}</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatedSection>
        </div>
      </section>

      {/* QC Lab */}
      <section className="py-20 sm:py-28 bg-navy-800 text-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-16">
            <motion.div variants={fadeUp} className="max-w-3xl">
              <span className="text-xs font-semibold text-gold-500 tracking-[0.2em] uppercase mb-4 block">R&D AND TESTING</span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-[family-name:var(--font-playfair)] font-bold mb-6">
                State-of-the-Art Testing & Quality Control
              </h2>
              <p className="text-gray-300 text-lg">
                Our in-house R&D center and testing laboratory ensure every product meets the strictest international standards. We employ advanced non-destructive and destructive testing methodologies.
              </p>
            </motion.div>
          </AnimatedSection>

          <AnimatedSection className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              "Charpy Impact Test", "Metalloscope Analysis", "Spectrometer Testing", 
              "Dimensional Inspection", "Acid-Pickling Test", "Hardness Testing", 
              "PMI Spectrometer", "Ultrasonic Thickness", "Liquid Penetrant Test", "Tensile Strength Test"
            ].map((test, i) => (
              <motion.div key={i} variants={fadeUp} className="bg-navy-700/50 border border-white/5 p-4 rounded-lg flex items-center gap-3 hover:bg-navy-700 transition-colors">
                <Activity className="text-gold-500 w-5 h-5 flex-shrink-0" />
                <span className="text-sm font-medium">{test}</span>
              </motion.div>
            ))}
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
