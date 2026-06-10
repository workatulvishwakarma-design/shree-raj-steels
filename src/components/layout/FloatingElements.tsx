"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, Phone } from "lucide-react";
import { COMPANY } from "@/lib/constants";

import CookieConsent from "@/components/ui/CookieConsent";
import AIChatWidget from "@/components/ui/AIChatWidget";

// WhatsApp SVG Icon
function WhatsAppIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export function FloatingElements() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 500);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="floating-elements fixed inset-x-0 bottom-0 z-40 no-print pointer-events-none">
      {/* WhatsApp Button on Bottom-Left */}
      <div className="fixed bottom-6 left-6 z-50 pointer-events-auto flex items-center">
        <a
          href={`https://wa.me/${COMPANY.whatsapp}?text=Hi%20SRS%2C%20I%27d%20like%20to%20enquire%20about%20your%20products.`}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          className="relative w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 hover:scale-110 transition-transform duration-200"
          aria-label="Chat on WhatsApp"
        >
          <WhatsAppIcon size={28} />
          {/* Pulsing visual indicator */}
          <span className="absolute inset-0 rounded-full bg-[#25D366] animate-pulse-ring opacity-30 pointer-events-none" />
        </a>

        {/* Hover Label */}
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="ml-3 px-3 py-1.5 bg-slate-900 border border-slate-800 text-[11px] text-white font-semibold rounded-lg shadow-xl"
            >
              Chat on WhatsApp
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* AI Support Chatbot Widget on Bottom-Right */}
      <div className="pointer-events-auto">
        <AIChatWidget />
      </div>

      {/* Back to Top - Shifted Up to clear the AI Chat widget icon */}
      <div className="pointer-events-auto">
        <AnimatePresence>
          {showBackToTop && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              onClick={scrollToTop}
              className="fixed bottom-24 right-7 w-11 h-11 bg-navy-800 text-gold-500 border border-gold-500/30 rounded-full flex items-center justify-center shadow-lg hover:bg-gold-500 hover:text-navy-900 transition-colors duration-200 z-50 cursor-pointer"
              aria-label="Back to top"
            >
              <ArrowUp size={20} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Sticky CTA Bar */}
      <div className="fixed bottom-0 left-0 right-0 lg:hidden bg-navy-900/95 backdrop-blur-md border-t border-gold-500/20 p-3 flex gap-3 z-30 pointer-events-auto">
        <a
          href={`tel:${COMPANY.phones[0].replace(/\s/g, "")}`}
          className="flex-1 flex items-center justify-center gap-2 py-3 bg-navy-700 text-white text-sm font-semibold rounded-lg"
        >
          <Phone size={16} />
          Call Now
        </a>
        <a
          href="/quote"
          className="flex-1 flex items-center justify-center gap-2 py-3 bg-gold-500 text-navy-900 text-sm font-semibold rounded-lg"
        >
          Get Quote
        </a>
      </div>

      {/* Cookie Consent Popup */}
      <div className="pointer-events-auto">
        <CookieConsent />
      </div>
    </div>
  );
}
