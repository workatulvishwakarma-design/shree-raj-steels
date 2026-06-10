import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Settings, ShieldCheck, PenTool, Truck, ArrowRight, Phone } from 'lucide-react';
import Breadcrumb from '@/components/ui/Breadcrumb';

export const metadata: Metadata = {
  title: 'Value-Added Services | Shree Raj Steels',
  description: 'Explore our comprehensive range of value-added services including custom machining, protective coating, testing, and logistics.',
  alternates: {
    canonical: '/services',
  },
};

const SERVICES_DATA = [
  {
    id: 'custom-machining',
    title: 'Custom Machining & Fabrication',
    description: 'We offer precision custom machining services to modify standard flanges, fittings, and pipes to meet your exact project specifications. From special bore sizes to custom facing and tapering.',
    icon: <Settings className="w-6 h-6 text-gold-500" />,
    image: '/images/factory/factory-floor-3.jpg'
  },
  {
    id: 'coating-galvanizing',
    title: 'Protective Coating & Galvanizing',
    description: 'Protect your piping systems from harsh environments. We provide Hot Dip Galvanizing, 3LPE (Three Layer Polyethylene), Epoxy Coating, and specialized anti-rust treatments.',
    icon: <PenTool className="w-6 h-6 text-gold-500" />,
    image: '/images/factory/factory-floor-1.jpg'
  },
  {
    id: 'testing-inspection',
    title: 'Testing & Third-Party Inspection',
    description: 'We facilitate comprehensive Non-Destructive Testing (NDT), Hydrostatic testing, and coordinate with all major Third-Party Inspection (TPI) agencies like SGS, TUV, and DNV.',
    icon: <ShieldCheck className="w-6 h-6 text-gold-500" />,
    image: '/images/gallery/testing.jpg'
  },
  {
    id: 'logistics',
    title: 'Global Logistics & Packaging',
    description: 'From standard seaworthy wooden cases to specialized export packaging, our logistics team ensures your critical materials arrive safely and on time, anywhere in the world.',
    icon: <Truck className="w-6 h-6 text-gold-500" />,
    image: '/images/factory/warehouse-1.jpg'
  }
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-navy-900 pt-28 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-grid-texture"></div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-navy-800 to-transparent"></div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="flex justify-center mb-6">
            <Breadcrumb 
              items={[
                { label: "Home", href: "/" }, 
                { label: "Services" }
              ]} 
            />
          </div>
          
          <div className="inline-block px-4 py-1.5 bg-gold-500/10 border border-gold-500/20 text-gold-500 text-xs font-bold tracking-wider uppercase rounded-full mb-6">
            Value-Added Solutions
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-[family-name:var(--font-playfair)] font-bold text-white leading-tight mb-8">
            Comprehensive Engineering Services
          </h1>
          <p className="text-lg text-gray-300 leading-relaxed max-w-2xl mx-auto">
            Beyond supplying premium steel products, Shree Raj Steels provides end-to-end value-added services to ensure your piping components are ready for immediate installation.
          </p>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="py-24 bg-[#F8F6F0]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            {SERVICES_DATA.map((service, idx) => (
              <div key={service.id} className="group bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-2xl hover:border-gold-500/30 transition-all duration-500">
                {/* Image Container */}
                <div className="aspect-[16/9] relative overflow-hidden bg-navy-800">
                  <Image 
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80" />
                  
                  {/* Icon Badge */}
                  <div className="absolute bottom-6 left-6 w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-lg transform group-hover:-translate-y-2 transition-transform duration-500">
                    {service.icon}
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-8 lg:p-10">
                  <h2 className="text-2xl font-[family-name:var(--font-playfair)] font-bold text-navy-900 mb-4 group-hover:text-gold-600 transition-colors">
                    {service.title}
                  </h2>
                  <p className="text-gray-600 leading-relaxed mb-8">
                    {service.description}
                  </p>
                  
                  <Link 
                    href="/contact" 
                    className="inline-flex items-center gap-2 text-sm font-bold tracking-wider uppercase text-navy-900 group-hover:text-gold-600 transition-colors"
                  >
                    Enquire Now <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-navy-900" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(201,168,76,0.5) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </div>
        
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="w-16 h-16 bg-gold-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-gold-500/20">
            <Phone className="w-8 h-8 text-gold-500" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-[family-name:var(--font-playfair)] font-bold text-white mb-6">
            Need a Custom Service?
          </h2>
          <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">
            If you have specialized requirements that aren't listed above, our engineering team is ready to discuss custom solutions tailored to your project.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/contact" 
              className="px-8 py-4 bg-gold-500 text-navy-900 font-bold rounded-lg hover:bg-gold-400 transition-colors shadow-[0_0_20px_rgba(201,168,76,0.3)] hover:shadow-[0_0_30px_rgba(201,168,76,0.5)]"
            >
              Discuss Your Project
            </Link>
            <Link 
              href="/quote" 
              className="px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-lg hover:bg-white/10 transition-colors"
            >
              Request a Quote
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
