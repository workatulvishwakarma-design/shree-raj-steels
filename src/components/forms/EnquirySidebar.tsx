"use client";

import { useState } from "react";
import { Mail, Phone, MessageSquare } from "lucide-react";
import { COMPANY } from "@/lib/constants";

export function EnquirySidebar({ productName }: { productName: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <div className="bg-navy-900 rounded-xl overflow-hidden shadow-xl sticky top-28">
      {/* Header */}
      <div className="bg-gold-500 p-6 text-navy-900">
        <h3 className="text-xl font-[family-name:var(--font-playfair)] font-bold mb-2">
          Request a Quote
        </h3>
        <p className="text-sm font-medium opacity-80">
          For {productName}
        </p>
      </div>

      {/* Form Area */}
      <div className="p-6">
        {submitted ? (
          <div className="text-center py-6">
            <div className="w-12 h-12 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center mx-auto mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </div>
            <h4 className="text-white font-bold mb-2">Request Sent!</h4>
            <p className="text-sm text-gray-400 mb-6">We&apos;ll get back to you within 2 hours with a detailed quotation.</p>
            <button 
              onClick={() => setSubmitted(false)}
              className="text-gold-500 text-sm hover:underline"
            >
              Send another enquiry
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input 
                required 
                type="text" 
                placeholder="Your Name *"
                className="w-full bg-navy-800 border border-navy-700 rounded-lg px-4 py-3 text-sm text-white focus:border-gold-500 outline-none transition-colors placeholder:text-gray-500" 
              />
            </div>
            <div>
              <input 
                required 
                type="email" 
                placeholder="Email Address *"
                className="w-full bg-navy-800 border border-navy-700 rounded-lg px-4 py-3 text-sm text-white focus:border-gold-500 outline-none transition-colors placeholder:text-gray-500" 
              />
            </div>
            <div>
              <input 
                required 
                type="tel" 
                placeholder="Phone / WhatsApp *"
                className="w-full bg-navy-800 border border-navy-700 rounded-lg px-4 py-3 text-sm text-white focus:border-gold-500 outline-none transition-colors placeholder:text-gray-500" 
              />
            </div>
            <div>
              <textarea 
                rows={3}
                placeholder="Size, grade, quantity requirements..."
                className="w-full bg-navy-800 border border-navy-700 rounded-lg px-4 py-3 text-sm text-white focus:border-gold-500 outline-none transition-colors placeholder:text-gray-500 resize-none" 
              ></textarea>
            </div>
            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gold-500 hover:bg-gold-400 text-navy-900 font-bold py-3 px-4 rounded-lg transition-colors disabled:opacity-70 mt-2"
            >
              {isSubmitting ? "Sending..." : "Get Quick Quote"}
            </button>
          </form>
        )}
      </div>

      {/* Quick Contact Footer */}
      <div className="bg-navy-800 p-6 border-t border-white/5">
        <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-4">Or contact us directly</p>
        <div className="space-y-3">
          <a href={`tel:${COMPANY.phones[0].replace(/\s/g, "")}`} className="flex items-center gap-3 text-sm text-white hover:text-gold-500 transition-colors">
            <div className="w-8 h-8 rounded-full bg-navy-700 flex items-center justify-center text-gold-500">
              <Phone size={14} />
            </div>
            {COMPANY.phones[0]}
          </a>
          <a href={`https://wa.me/${COMPANY.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-white hover:text-[#25D366] transition-colors">
            <div className="w-8 h-8 rounded-full bg-navy-700 flex items-center justify-center text-[#25D366]">
              <MessageSquare size={14} />
            </div>
            WhatsApp Us
          </a>
        </div>
      </div>
    </div>
  );
}
