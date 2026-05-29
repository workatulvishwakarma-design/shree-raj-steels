import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Download, CheckCircle2, Factory, ArrowRight, Shield } from "lucide-react";
import { PRODUCT_MAP } from "@/data/products";
import { SUB_PRODUCT_MAP, SUB_PRODUCT_PARAMS } from "@/data/sub-products";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { EnquirySidebar } from "@/components/forms/EnquirySidebar";

// Generate static params for all sub-product slugs
export function generateStaticParams() {
  return SUB_PRODUCT_PARAMS;
}

// Dynamic metadata
export async function generateMetadata({ params }: { params: Promise<{ slug: string; subSlug: string }> }) {
  const { slug, subSlug } = await params;
  const key = `${slug}/${subSlug}`;
  const subProduct = SUB_PRODUCT_MAP[key];

  if (!subProduct) {
    return { title: "Product Not Found" };
  }

  return {
    title: subProduct.seoTitle,
    description: subProduct.seoDescription,
    alternates: {
      canonical: `/products/${slug}/${subSlug}`,
    },
  };
}

export default async function SubProductDetailPage({ params }: { params: Promise<{ slug: string; subSlug: string }> }) {
  const { slug, subSlug } = await params;
  const key = `${slug}/${subSlug}`;
  const subProduct = SUB_PRODUCT_MAP[key];
  const parentProduct = PRODUCT_MAP[slug];

  if (!subProduct || !parentProduct) {
    notFound();
  }

  // Schema.org Product markup
  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: subProduct.name,
    image: `https://www.shreerajsteels.com${subProduct.heroImage}`,
    description: subProduct.description,
    brand: {
      "@type": "Brand",
      name: "Shree Raj Steels",
    },
    manufacturer: {
      "@type": "Organization",
      name: "Shree Raj Steels",
    },
    category: parentProduct.name,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      {/* Hero Section */}
      <section className="bg-navy-900 pt-28 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(201,168,76,0.3) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-navy-800 to-transparent" />

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Products", href: "/products" },
              { label: parentProduct.shortName, href: `/products/${slug}` },
              { label: subProduct.name },
            ]}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mt-8 items-center">
            {/* Left: Content */}
            <div>
              <div className="inline-block px-3 py-1 bg-gold-500/10 border border-gold-500/20 text-gold-500 text-xs font-bold tracking-wider uppercase rounded-full mb-4">
                {parentProduct.name}
              </div>
              <h1 className="text-4xl sm:text-5xl font-[family-name:var(--font-playfair)] font-bold text-white leading-tight mb-6">
                {subProduct.name}
              </h1>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                {subProduct.description}
              </p>

              {/* Quick info badges */}
              <div className="flex flex-wrap gap-3 mb-8">
                <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300">
                  <span className="text-gold-500 font-semibold">Size:</span> {subProduct.sizeRange}
                </span>
                <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300">
                  <span className="text-gold-500 font-semibold">Standards:</span> {subProduct.standards.slice(0, 3).join(", ")}
                </span>
              </div>

              <div className="flex flex-wrap gap-4">
                <a
                  href="#specifications"
                  className="px-6 py-3 bg-gold-500 text-navy-900 font-semibold rounded-lg hover:bg-gold-400 transition-colors"
                >
                  View Specifications
                </a>
                <Link
                  href="/quote"
                  className="px-6 py-3 border border-gold-500/30 text-gold-500 font-semibold rounded-lg hover:bg-gold-500/10 transition-colors flex items-center gap-2"
                >
                  Get a Quote <ArrowRight size={18} />
                </Link>
              </div>
            </div>

            {/* Right: Image */}
            <div className="relative">
              <div className="aspect-[4/3] relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <Image
                  src={subProduct.heroImage}
                  alt={subProduct.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-5 rounded-xl shadow-xl max-w-[220px]">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-full bg-gold-500/10 flex items-center justify-center">
                    <Shield className="text-gold-500 w-4 h-4" />
                  </div>
                  <div className="font-bold text-navy-900 text-sm leading-tight">ISO Certified Quality</div>
                </div>
                <p className="text-xs text-gray-500">Full material traceability & mill test certificates.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-20 bg-[#F8F6F0]" id="specifications">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* Left Column */}
            <div className="lg:col-span-2 space-y-16">

              {/* Technical Specifications */}
              <div>
                <h2 className="text-3xl font-[family-name:var(--font-playfair)] font-bold text-navy-900 mb-8 border-b border-gray-200 pb-4">
                  Technical Specifications
                </h2>
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                  <table className="w-full text-left">
                    <tbody className="divide-y divide-gray-100">
                      {subProduct.specifications.map((spec, i) => (
                        <tr key={spec.parameter} className={i % 2 === 0 ? "bg-gray-50/50" : "bg-white"}>
                          <th className="py-4 px-6 text-sm font-semibold text-gray-700 w-1/3 bg-gray-50 border-r border-gray-100 align-top">
                            {spec.parameter}
                          </th>
                          <td className="py-4 px-6 text-sm text-gray-600 font-[family-name:var(--font-jetbrains)]">
                            {spec.detail}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Surface Finish */}
                <div className="mt-6 bg-white p-6 rounded-xl border border-gray-200 shadow-sm border-l-4 border-l-gold-500">
                  <h3 className="font-bold text-navy-900 mb-3">Surface Finish / Coating</h3>
                  <div className="flex flex-wrap gap-2">
                    {subProduct.surfaceFinish.map(f => (
                      <span key={f} className="px-3 py-1 bg-gold-50 text-gold-700 text-xs rounded-full border border-gold-100">{f}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Material Grades */}
              <div>
                <h2 className="text-3xl font-[family-name:var(--font-playfair)] font-bold text-navy-900 mb-8 border-b border-gray-200 pb-4">
                  Available Grades
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {subProduct.grades.carbonSteel && (
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                      <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4 flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-navy-700" />
                        Carbon Steel
                      </h3>
                      <ul className="space-y-2">
                        {subProduct.grades.carbonSteel.map(grade => (
                          <li key={grade} className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-gold-500 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700 text-sm">{grade}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {subProduct.grades.alloySteel && (
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                      <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4 flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-navy-700" />
                        Alloy Steel
                      </h3>
                      <ul className="space-y-2">
                        {subProduct.grades.alloySteel.map(grade => (
                          <li key={grade} className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-gold-500 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700 text-sm">{grade}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {subProduct.grades.stainlessSteel && (
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                      <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4 flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-navy-700" />
                        Stainless Steel
                      </h3>
                      <ul className="space-y-2">
                        {subProduct.grades.stainlessSteel.map(grade => (
                          <li key={grade} className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-gold-500 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700 text-sm">{grade}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {subProduct.grades.exotic && (
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                      <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4 flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-gold-500" />
                        Exotic / Special Alloys
                      </h3>
                      <ul className="space-y-2">
                        {subProduct.grades.exotic.map(grade => (
                          <li key={grade} className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-gold-500 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700 text-sm">{grade}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Applications */}
              <div>
                <h2 className="text-3xl font-[family-name:var(--font-playfair)] font-bold text-navy-900 mb-8 border-b border-gray-200 pb-4">
                  Applications
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {subProduct.applications.map((app) => (
                    <div
                      key={app}
                      className="flex items-center gap-3 bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:border-gold-500/30 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-lg bg-gold-500/10 flex items-center justify-center flex-shrink-0">
                        <Factory className="w-5 h-5 text-gold-500" />
                      </div>
                      <span className="text-gray-700 font-medium text-sm">{app}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Features */}
              <div>
                <h2 className="text-3xl font-[family-name:var(--font-playfair)] font-bold text-navy-900 mb-8 border-b border-gray-200 pb-4">
                  Key Features
                </h2>
                <div className="bg-navy-800 rounded-2xl p-8">
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {subProduct.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-gold-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-200 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Manufacturing Standards */}
              <div>
                <h2 className="text-3xl font-[family-name:var(--font-playfair)] font-bold text-navy-900 mb-6 border-b border-gray-200 pb-4">
                  Manufacturing Standards
                </h2>
                <div className="flex flex-wrap gap-3">
                  {subProduct.standards.map((standard) => (
                    <div key={standard} className="px-4 py-3 bg-white border border-gray-200 rounded-lg shadow-sm font-[family-name:var(--font-jetbrains)] text-sm font-semibold text-navy-700 flex items-center gap-2 hover:border-gold-500 transition-colors">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                      {standard}
                    </div>
                  ))}
                </div>
                <div className="mt-8 bg-navy-50 rounded-xl p-6 border border-navy-100">
                  <h3 className="font-bold text-navy-900 mb-2">Looking for detailed dimensions?</h3>
                  <p className="text-sm text-gray-600 mb-4">We provide comprehensive weight and dimension tables for all our products conforming to ASME, DIN, and JIS standards.</p>
                  <Link href="/technical-data" className="inline-flex items-center gap-2 text-gold-500 font-bold hover:underline">
                    View Technical Data Tables <ChevronRight size={16} />
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Column: Sticky Sidebar */}
            <div className="lg:col-span-1">
              <EnquirySidebar productName={subProduct.name} />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#C9A84C] via-[#D4B766] to-[#C9A84C]" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(10,22,40,0.3) 1px, transparent 0)', backgroundSize: '30px 30px' }} />
        </div>
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-3xl sm:text-4xl font-[family-name:var(--font-playfair)] font-bold text-navy-900 mb-4">
            Ready to Order {subProduct.name}?
          </h2>
          <p className="text-lg text-navy-800/80 mb-8 max-w-2xl mx-auto">
            Get competitive pricing, fast delivery, and complete material certification from Shree Raj Steels.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/quote"
              className="px-8 py-4 bg-navy-900 text-white font-semibold rounded-lg hover:bg-navy-800 transition-colors"
            >
              Request a Quote
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 bg-white/90 text-navy-900 font-semibold rounded-lg hover:bg-white transition-colors"
            >
              Contact Us
            </Link>
            <a
              href="/downloads/SRS-Catalogue.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 border-2 border-navy-900/20 text-navy-900 font-semibold rounded-lg hover:border-navy-900/40 transition-colors flex items-center gap-2"
            >
              <Download size={18} />
              Download Catalogue
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
