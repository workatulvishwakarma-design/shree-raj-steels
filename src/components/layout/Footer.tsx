import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Globe, Play } from "lucide-react";
import { COMPANY, LOCATIONS, SOCIAL_LINKS, NAV_LINKS, BUSINESS_HOURS } from "@/lib/constants";

const productLinks = NAV_LINKS.find((l) => l.label === "Products");

const quickLinks = [
  { label: "About Us", href: "/about" },
  { label: "Certifications", href: "/about#certifications" },
  { label: "Technical Data", href: "/technical-data" },
  { label: "Process", href: "/process" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
  { label: "Request a Quote", href: "/quote" },
];

export function Footer() {
  return (
    <footer className="relative bg-navy-900 text-white" role="contentinfo">
      {/* Gold top border */}
      <div className="h-[2px] bg-gold-500" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Column 1 — Company */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-6" aria-label="Shree Raj Steels Home">
              <div className="relative w-10 h-10 bg-white rounded-lg overflow-hidden border border-white/10 p-1 flex items-center justify-center">
                <div className="relative w-full h-full">
                  <Image 
                    src="/images/logo-emblem.png" 
                    alt="SRS Logo" 
                    fill 
                    className="object-cover object-left" 
                  />
                </div>
              </div>
              <div>
                <div className="text-gold-500 font-[family-name:var(--font-playfair)] text-lg font-bold tracking-tight">
                  SHREE RAJ STEELS
                </div>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              A multi-functional enterprise integrating R&D, manufacturing, sales and service in premium pipe fittings, flanges & special alloy products.
            </p>
            <div className="flex items-center gap-3">
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-gold-500/20 flex items-center justify-center text-gray-400 hover:text-gold-500 transition-all duration-200"
                aria-label="LinkedIn"
              >
                <Globe size={18} />
              </a>
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-gold-500/20 flex items-center justify-center text-gray-400 hover:text-gold-500 transition-all duration-200"
                aria-label="Instagram"
              >
                <Globe size={18} />
              </a>
              <a
                href={SOCIAL_LINKS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-gold-500/20 flex items-center justify-center text-gray-400 hover:text-gold-500 transition-all duration-200"
                aria-label="Facebook"
              >
                <Globe size={18} />
              </a>
              <a
                href={SOCIAL_LINKS.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-gold-500/20 flex items-center justify-center text-gray-400 hover:text-gold-500 transition-all duration-200"
                aria-label="YouTube"
              >
                <Play size={18} />
              </a>
            </div>
          </div>

          {/* Column 2 — Products */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-gold-500 mb-6">
              Products
            </h3>
            <ul className="space-y-3">
              {"children" in (productLinks ?? {}) &&
                (productLinks as any).children.map((product: any) => (
                  <li key={product.href}>
                    <Link
                      href={product.href}
                      className="text-sm text-gray-400 hover:text-gold-500 transition-colors duration-200"
                    >
                      {product.label}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          {/* Column 3 — Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-gold-500 mb-6">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-gold-500 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-gold-500 mb-6">
              Contact Us
            </h3>
            <div className="space-y-4">
              {/* Head Office */}
              <div className="flex gap-3">
                <MapPin size={18} className="text-gold-500 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs text-gold-300 font-medium mb-1">Head Office</div>
                  <p className="text-sm text-gray-400 leading-relaxed">{LOCATIONS.headOffice.full}</p>
                </div>
              </div>

              {/* Factory */}
              <div className="flex gap-3">
                <MapPin size={18} className="text-gold-500 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs text-gold-300 font-medium mb-1">Factory / Warehouse</div>
                  <p className="text-sm text-gray-400 leading-relaxed">{LOCATIONS.factory.full}</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-3 items-center">
                <Phone size={18} className="text-gold-500 flex-shrink-0" />
                <div className="space-y-1">
                  {COMPANY.phones.map((phone) => (
                    <a
                      key={phone}
                      href={`tel:${phone.replace(/\s/g, "")}`}
                      className="block text-sm text-gray-400 hover:text-gold-500 transition-colors"
                    >
                      {phone}
                    </a>
                  ))}
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-3 items-center">
                <Mail size={18} className="text-gold-500 flex-shrink-0" />
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="text-sm text-gray-400 hover:text-gold-500 transition-colors"
                >
                  {COMPANY.email}
                </a>
              </div>

              {/* Business Hours */}
              <p className="text-xs text-gray-500 mt-2">{BUSINESS_HOURS}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Shree Raj Steels. All Rights Reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-gray-500">
            <Link href="/privacy" className="hover:text-gold-500 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gold-500 transition-colors">Terms</Link>
            <Link href="/sitemap.xml" className="hover:text-gold-500 transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
