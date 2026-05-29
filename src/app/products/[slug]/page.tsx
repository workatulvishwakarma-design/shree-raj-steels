import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { 
  ChevronRight, 
  Download, 
  CheckCircle2, 
  Factory, 
  ArrowRight, 
  Shield, 
  Award, 
  Globe,
  Layers,
  Check
} from "lucide-react";
import { PRODUCTS, PRODUCT_MAP, PRODUCT_SLUGS } from "@/data/products";
import { getSubProductsByParent } from "@/data/sub-products";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { EnquirySidebar } from "@/components/forms/EnquirySidebar";

// Generate static params for all product slugs
export function generateStaticParams() {
  return PRODUCT_SLUGS.map((slug) => ({ slug }));
}

// Dynamic metadata based on product
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = PRODUCT_MAP[slug];
  
  if (!product) {
    return { title: "Product Not Found" };
  }
  
  return {
    title: `${product.name} Manufacturer, Stockist & Supplier | SRS`,
    description: product.description,
    alternates: {
      canonical: `/products/${product.slug}`,
    },
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = PRODUCT_MAP[slug];

  if (!product) {
    notFound();
  }

  const subProducts = getSubProductsByParent(product.slug);

  // Schema.org Product markup
  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.name,
    image: `https://www.shreerajsteels.com${product.heroImage}`,
    description: product.description,
    brand: {
      "@type": "Brand",
      name: "Shree Raj Steels",
    },
    manufacturer: {
      "@type": "Organization",
      name: "Shree Raj Steels",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      {/* Product Hero */}
      <section className="bg-navy-900 pt-28 pb-20 relative overflow-hidden">
        {/* Background Texture & Glowing accents */}
        <div className="absolute inset-0 opacity-5 bg-grid-texture animate-pulse"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(201,168,76,0.15),rgba(10,22,40,0))]"></div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-navy-800/30 to-transparent"></div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Breadcrumb 
            items={[
              { label: "Home", href: "/" }, 
              { label: "Products", href: "/products" },
              { label: product.shortName }
            ]} 
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mt-8 items-center">
            {/* Left: Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold-500/10 border border-gold-500/20 text-gold-500 text-xs font-bold tracking-wider uppercase rounded-full mb-6">
                <Shield size={12} className="text-gold-500" />
                ISO 9001:2015 & PED Certified Manufacturer
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-[family-name:var(--font-playfair)] font-bold text-white leading-tight mb-6">
                {product.name}
              </h1>
              <p className="text-lg text-gray-300 leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Key Specs Micro-badges */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-white/5 border border-white/10 rounded-xl p-3.5">
                  <div className="text-xs text-gray-400 uppercase tracking-wider mb-1 font-semibold">Size Range</div>
                  <div className="text-sm font-bold text-white font-[family-name:var(--font-jetbrains)]">{product.sizeRange}</div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-3.5">
                  <div className="text-xs text-gray-400 uppercase tracking-wider mb-1 font-semibold">Compliance</div>
                  <div className="text-sm font-bold text-white font-[family-name:var(--font-jetbrains)]">API, ASME, EN</div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-3.5">
                  <div className="text-xs text-gray-400 uppercase tracking-wider mb-1 font-semibold">Origin</div>
                  <div className="text-sm font-bold text-white font-[family-name:var(--font-jetbrains)]">India (Mumbai)</div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <a 
                  href="#types"
                  className="px-6 py-3.5 bg-gold-500 text-navy-900 font-bold rounded-lg hover:bg-gold-400 transition-colors flex items-center gap-2"
                >
                  Explore Product Types
                  <ArrowRight size={16} />
                </a>
                <a 
                  href="/downloads/SRS-Catalogue.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors flex items-center gap-2"
                >
                  <Download size={18} />
                  Download Catalogue
                </a>
              </div>
            </div>

            {/* Right: Image */}
            <div className="relative">
              <div className="aspect-[4/3] relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <Image 
                  src={product.heroImage} 
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              
              {/* Highlight badge */}
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl max-w-[260px] border border-gray-100 hidden sm:block">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-gold-500/10 flex items-center justify-center">
                    <Factory className="text-gold-500 w-5 h-5" />
                  </div>
                  <div className="font-bold text-navy-900 text-base leading-tight">In-House Production</div>
                </div>
                <p className="text-xs text-gray-500">Equipped with 10,000 Ton forming press and state-of-the-art QC testing lab.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Sub-Products Visual Showroom */}
      {subProducts.length > 0 && (
        <section className="py-24 bg-white" id="types">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="text-gold-500 text-xs font-bold uppercase tracking-widest mb-3">Product Portfolio</div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-[family-name:var(--font-playfair)] font-bold text-navy-900 mb-4">
                Explore Available Types & Styles
              </h2>
              <p className="text-gray-600">
                Select a product classification below to view extensive technical parameters, available material grades, dimensions, and custom requests.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {subProducts.map((sp) => (
                <div 
                  key={sp.slug}
                  className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-gold-500/30 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col h-full"
                >
                  {/* Thumbnail Image */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-navy-900">
                    <Image 
                      src={sp.heroImage || product.heroImage}
                      alt={sp.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/40 to-transparent" />
                  </div>

                  {/* Body */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-[family-name:var(--font-playfair)] font-bold text-navy-900 group-hover:text-gold-600 transition-colors mb-2">
                      {sp.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-4 line-clamp-3">
                      {sp.description.split(". ")[0]}. {sp.description.split(". ")[1]}.
                    </p>
                    
                    <div className="mt-auto space-y-3">
                      {/* Specifications Summary row */}
                      <div className="flex items-center justify-between text-xs border-t border-gray-50 pt-3">
                        <span className="text-gray-400 font-semibold">Size Range:</span>
                        <span className="text-navy-900 font-bold font-[family-name:var(--font-jetbrains)]">{sp.sizeRange}</span>
                      </div>
                      
                      {/* Standards Preview */}
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {sp.standards.slice(0, 3).map((std) => (
                          <span key={std} className="text-[10px] px-2 py-0.5 rounded-full bg-navy-50 text-navy-700 font-medium font-[family-name:var(--font-jetbrains)]">
                            {std}
                          </span>
                        ))}
                        {sp.standards.length > 3 && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-gold-500/10 text-gold-600 font-medium">
                            +{sp.standards.length - 3} more
                          </span>
                        )}
                      </div>

                      <Link
                        href={`/products/${product.slug}/${sp.slug}`}
                        className="inline-flex items-center gap-1.5 text-gold-500 font-bold hover:text-gold-600 transition-colors text-sm mt-3 pt-3 border-t border-gray-100 w-full"
                      >
                        Explore Technical Specs
                        <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Material Grades Matrix */}
      <section className="py-24 bg-[#F8F6F0]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="text-gold-500 text-xs font-bold uppercase tracking-widest mb-3">Metallurgical Grades</div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-[family-name:var(--font-playfair)] font-bold text-navy-900 mb-4">
              Available Material Standards
            </h2>
            <p className="text-gray-600">
              Shree Raj Steels manufactures products in all major piping materials, certified with full chemical and mechanical reports, trace codes, and corrosion testing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {product.grades.carbonSteel && (
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200/60 border-l-4 border-l-navy-900 flex flex-col">
                <h3 className="text-lg font-bold text-navy-900 mb-4 flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-navy-900" />
                  Carbon Steel
                </h3>
                <ul className="space-y-2 flex-grow">
                  {product.grades.carbonSteel.slice(0, 10).map(grade => (
                    <li key={grade} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-gold-500 flex-shrink-0 mt-1" />
                      <span className="text-gray-700 text-sm font-medium">{grade}</span>
                    </li>
                  ))}
                  {product.grades.carbonSteel.length > 10 && (
                    <li className="text-xs text-gold-600 font-semibold pl-6 mt-1">
                      + {product.grades.carbonSteel.length - 10} more grades
                    </li>
                  )}
                </ul>
              </div>
            )}
            {product.grades.alloySteel && (
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200/60 border-l-4 border-l-gold-500 flex flex-col">
                <h3 className="text-lg font-bold text-navy-900 mb-4 flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-gold-500" />
                  Alloy Steel
                </h3>
                <ul className="space-y-2 flex-grow">
                  {product.grades.alloySteel.slice(0, 10).map(grade => (
                    <li key={grade} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-gold-500 flex-shrink-0 mt-1" />
                      <span className="text-gray-700 text-sm font-medium">{grade}</span>
                    </li>
                  ))}
                  {product.grades.alloySteel.length > 10 && (
                    <li className="text-xs text-gold-600 font-semibold pl-6 mt-1">
                      + {product.grades.alloySteel.length - 10} more grades
                    </li>
                  )}
                </ul>
              </div>
            )}
            {product.grades.stainlessSteel && (
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200/60 border-l-4 border-l-navy-600 flex flex-col">
                <h3 className="text-lg font-bold text-navy-900 mb-4 flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-navy-600" />
                  Stainless Steel
                </h3>
                <ul className="space-y-2 flex-grow">
                  {product.grades.stainlessSteel.slice(0, 8).map(grade => (
                    <li key={grade} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-gold-500 flex-shrink-0 mt-1" />
                      <span className="text-gray-700 text-sm font-medium">{grade}</span>
                    </li>
                  ))}
                  {product.grades.stainlessSteel.length > 8 && (
                    <li className="text-xs text-gold-600 font-semibold pl-6 mt-1">
                      + {product.grades.stainlessSteel.length - 8} more grades
                    </li>
                  )}
                </ul>
              </div>
            )}
            {product.grades.exotic && (
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200/60 border-l-4 border-l-gold-400 flex flex-col">
                <h3 className="text-lg font-bold text-navy-900 mb-4 flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-gold-400" />
                  Exotic & Alloys
                </h3>
                <ul className="space-y-2 flex-grow">
                  {product.grades.exotic.slice(0, 8).map(grade => (
                    <li key={grade} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-gold-500 flex-shrink-0 mt-1" />
                      <span className="text-gray-700 text-sm font-medium">{grade}</span>
                    </li>
                  ))}
                  {product.grades.exotic.length > 8 && (
                    <li className="text-xs text-gold-600 font-semibold pl-6 mt-1">
                      + {product.grades.exotic.length - 8} more alloys
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Specifications & Standards */}
      <section className="py-24 bg-white" id="specifications">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            
            {/* Left: Spec Table */}
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h2 className="text-3xl font-[family-name:var(--font-playfair)] font-bold text-navy-900 mb-8 border-b border-gray-200 pb-4 flex items-center gap-3">
                  <Layers className="text-gold-500" />
                  Technical Specifications
                </h2>
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                  <table className="w-full text-left">
                    <tbody className="divide-y divide-gray-100">
                      {product.specifications.map((spec, i) => (
                        <tr key={spec.parameter} className={i % 2 === 0 ? "bg-gray-50/50" : "bg-white"}>
                          <th className="py-4 px-6 text-sm font-semibold text-navy-900 w-1/3 bg-gray-50 border-r border-gray-100 align-top font-[family-name:var(--font-montserrat)]">
                            {spec.parameter}
                          </th>
                          <td className="py-4 px-6 text-sm text-gray-700 font-[family-name:var(--font-jetbrains)] whitespace-pre-wrap">
                            {spec.detail}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {/* Surface finish & Types if applicable */}
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {product.types && product.types.length > 0 && (
                    <div className="bg-navy-50 p-6 rounded-xl border border-navy-100 shadow-sm border-l-4 border-l-navy-700">
                      <h4 className="font-bold text-navy-900 mb-3 text-sm uppercase tracking-wider">Product Scope</h4>
                      <div className="flex flex-wrap gap-2">
                        {product.types.map(t => (
                          <span key={t} className="px-3 py-1 bg-white text-navy-800 text-xs font-semibold rounded-full border border-navy-100">{t}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {product.surfaceFinish.length > 0 && (
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm border-l-4 border-l-gold-500">
                      <h4 className="font-bold text-navy-900 mb-3 text-sm uppercase tracking-wider">Surface Coatings</h4>
                      <div className="flex flex-wrap gap-2">
                        {product.surfaceFinish.map(f => (
                          <span key={f} className="px-3 py-1 bg-gold-55 text-gold-75 text-xs font-semibold rounded-full border border-gold-100">{f}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right: Standards & Trust */}
            <div className="lg:col-span-1 space-y-8">
              <div>
                <h3 className="text-xl font-bold text-navy-900 mb-6 flex items-center gap-2.5">
                  <Globe className="text-gold-500 w-5 h-5" />
                  Manufacturing Standards
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {product.standards.slice(0, 10).map((standard) => (
                    <div 
                      key={standard} 
                      className="px-3 py-2.5 bg-white border border-gray-200 rounded-lg shadow-sm font-[family-name:var(--font-jetbrains)] text-xs font-bold text-navy-800 text-center hover:border-gold-500 transition-colors"
                    >
                      {standard}
                    </div>
                  ))}
                  {product.standards.length > 10 && (
                    <div className="col-span-2 text-center text-xs text-gold-600 font-semibold mt-1">
                      + Conforming to {product.standards.length - 10} additional standards
                    </div>
                  )}
                </div>
              </div>

              {/* Quality & Third-Party Inspection */}
              <div className="bg-navy-900 text-white rounded-2xl p-6 border border-white/5 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gold-500/5 rounded-full translate-x-8 -translate-y-8" />
                <h3 className="text-lg font-bold text-gold-500 mb-4 flex items-center gap-2">
                  <Shield size={18} />
                  Inspection & Quality
                </h3>
                <p className="text-xs text-gray-300 leading-relaxed mb-4">
                  We welcome all leading Third-Party Inspection (TPI) agencies including **SGS, TUV, LLOYDS, Bureau Veritas (BV), DNV, EIL, IRS, and IRS**.
                </p>
                <div className="space-y-2 border-t border-white/10 pt-4">
                  <div className="flex items-center gap-2 text-xs font-medium text-gray-200">
                    <CheckCircle2 size={14} className="text-gold-500 flex-shrink-0" /> Standard: EN 10204 3.1 & 3.2 MTC
                  </div>
                  <div className="flex items-center gap-2 text-xs font-medium text-gray-200">
                    <CheckCircle2 size={14} className="text-gold-500 flex-shrink-0" /> NACE MR0175 / ISO 15156 Compliant
                  </div>
                  <div className="flex items-center gap-2 text-xs font-medium text-gray-200">
                    <CheckCircle2 size={14} className="text-gold-500 flex-shrink-0" /> 100% PMI and Radiography Tested
                  </div>
                </div>
              </div>

              {/* Download catalog shortcut */}
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
                <h4 className="font-bold text-navy-900 mb-2 text-base">Dimensions & Weights</h4>
                <p className="text-xs text-gray-600 mb-4">Need standard chart sheets with dimensions, schedules, wall thicknesses and weights?</p>
                <Link href="/technical-data" className="inline-flex items-center gap-1.5 text-gold-500 text-sm font-bold hover:underline">
                  View Technical Sheets
                  <ChevronRight size={16} />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Enquiry Form Split Section */}
      <section className="py-24 bg-[#F8F6F0] border-t border-gray-200/50">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
            
            {/* Why buy from SRS Column (Left 2/3) */}
            <div className="lg:col-span-2 space-y-12">
              <div>
                <span className="text-xs uppercase font-bold tracking-widest text-gold-500">Shree Raj Steels Advantage</span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-[family-name:var(--font-playfair)] font-bold text-navy-900 mt-2 mb-6">
                  Industrial Supply Experts Since 2019
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  Backed by over 40 years of collective industry experience in pipes and fittings, Shree Raj Steels (SRS) delivers reliable pipeline solutions worldwide. From standard oil-gas networks to complex chemical processes, our products withstand the test of extreme pressures and high corrosion.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-navy-900 flex items-center justify-center text-gold-500 flex-shrink-0">
                    <Award size={22} />
                  </div>
                  <div>
                    <h4 className="font-bold text-navy-900 mb-1.5">PED 2014/68/EU Certified</h4>
                    <p className="text-sm text-gray-500">Fully certified for pressure equipment systems, conforming to European safety guidelines.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-navy-900 flex items-center justify-center text-gold-500 flex-shrink-0">
                    <Layers size={22} />
                  </div>
                  <div>
                    <h4 className="font-bold text-navy-900 mb-1.5">1500+ Tons Ready Stock</h4>
                    <p className="text-sm text-gray-500">Substantial raw materials (400+ tons) and finished product inventory ready for immediate shipment.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-navy-900 flex items-center justify-center text-gold-500 flex-shrink-0">
                    <Globe size={22} />
                  </div>
                  <div>
                    <h4 className="font-bold text-navy-900 mb-1.5">Pan-India & Global Delivery</h4>
                    <p className="text-sm text-gray-500">Fast transport logistics from our Navi Mumbai hub directly to ports and industrial sites.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-navy-900 flex items-center justify-center text-gold-500 flex-shrink-0">
                    <Shield size={22} />
                  </div>
                  <div>
                    <h4 className="font-bold text-navy-900 mb-1.5">100% Traceability</h4>
                    <p className="text-sm text-gray-500">Every single fitting is laser marked and traceable back to the raw material heat charge.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sticky Sidebar Form Column (Right 1/3) */}
            <div className="lg:col-span-1 lg:sticky lg:top-28">
              <EnquirySidebar productName={product.name} />
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
