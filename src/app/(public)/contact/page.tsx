"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Globe, Play } from "lucide-react";
import { COMPANY, LOCATIONS, SOCIAL_LINKS, BUSINESS_HOURS } from "@/lib/constants";
import { PRODUCTS } from "@/data/products";
import Breadcrumb from "@/components/ui/Breadcrumb";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    country: "",
    productInterest: [] as string[],
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("company", formData.company);
      data.append("email", formData.email);
      data.append("phone", formData.phone);
      data.append("country", formData.country);
      formData.productInterest.forEach((p) => data.append("productInterest", p));
      data.append("message", formData.message);

      const { submitContactForm } = await import("@/lib/actions");
      const result = await submitContactForm(data);

      if (result.success) {
        setSubmitted(true);
        setFormData({ name: "", company: "", email: "", phone: "", country: "", productInterest: [], message: "" });
      } else {
        alert(result.message || "Failed to submit enquiry.");
      }
    } catch (err) {
      console.error("Submit contact failed:", err);
      alert("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleProductChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value && !formData.productInterest.includes(value)) {
      setFormData({ ...formData, productInterest: [...formData.productInterest, value] });
    }
  };

  const removeProduct = (product: string) => {
    setFormData({
      ...formData,
      productInterest: formData.productInterest.filter((p) => p !== product),
    });
  };

  return (
    <>
      {/* Page Hero */}
      <section className="relative h-[30vh] min-h-[300px] flex items-center justify-center bg-navy-800">
        <div className="absolute inset-0 bg-[url('/images/hero/steel-closeup.jpg')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
        <div className="relative z-10 text-center px-4 w-full max-w-[1440px] mx-auto">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Contact Us" }]} />
          <h1 className="text-4xl sm:text-5xl font-[family-name:var(--font-playfair)] font-bold text-white mt-4">
            Get In Touch
          </h1>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Form Section */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-[family-name:var(--font-playfair)] font-bold text-navy-900 mb-6">
                Send an Enquiry
              </h2>
              <p className="text-gray-600 mb-8">
                Fill out the form below and our sales team will get back to you within 2 hours.
              </p>

              {submitted ? (
                <div className="bg-green-50 border border-green-200 text-green-800 p-6 rounded-lg text-center">
                  <h3 className="font-semibold text-lg mb-2">Thank you for your enquiry!</h3>
                  <p>We have received your message and will be in touch shortly.</p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">Full Name *</label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1.5">Company Name</label>
                      <input
                        type="text"
                        id="company"
                        value={formData.company}
                        onChange={(e) => setFormData({...formData, company: e.target.value})}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">Email Address *</label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number *</label>
                      <input
                        type="tel"
                        id="phone"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1.5">Country</label>
                    <select
                      id="country"
                      value={formData.country}
                      onChange={(e) => setFormData({...formData, country: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-colors bg-white"
                    >
                      <option value="">Select Country</option>
                      <option value="India">India</option>
                      <option value="UAE">United Arab Emirates</option>
                      <option value="Saudi Arabia">Saudi Arabia</option>
                      <option value="USA">United States</option>
                      <option value="UK">United Kingdom</option>
                      <option value="Singapore">Singapore</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="productInterest" className="block text-sm font-medium text-gray-700 mb-1.5">Product Interest</label>
                    <select
                      id="productInterest"
                      onChange={handleProductChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-colors bg-white"
                    >
                      <option value="">Select products...</option>
                      {PRODUCTS.map(p => (
                        <option key={p.slug} value={p.name}>{p.name}</option>
                      ))}
                    </select>
                    {formData.productInterest.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {formData.productInterest.map(p => (
                          <span key={p} className="inline-flex items-center gap-1 px-3 py-1 bg-navy-50 text-navy-700 text-sm rounded-full border border-navy-100">
                            {p}
                            <button type="button" onClick={() => removeProduct(p)} className="text-navy-400 hover:text-red-500">
                              &times;
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1.5">Message / Requirements</label>
                    <textarea
                      id="message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-colors resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gold-500 hover:bg-gold-400 text-navy-900 font-bold py-4 px-8 rounded-lg shadow-lg hover:shadow-gold-500/30 transition-all duration-200 disabled:opacity-70 flex justify-center items-center"
                  >
                    {isSubmitting ? "Sending..." : "Send Enquiry"}
                  </button>
                </form>
              )}
            </motion.div>

            {/* Info & Maps Section */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-10"
            >
              <div>
                <h2 className="text-3xl font-[family-name:var(--font-playfair)] font-bold text-navy-900 mb-6">
                  Contact Information
                </h2>
                <div className="grid gap-6">
                  {/* Head Office Card */}
                  <div className="bg-off-white p-6 rounded-xl border border-gray-100">
                    <h3 className="text-lg font-bold text-navy-900 mb-4 flex items-center gap-2">
                      <MapPin className="text-gold-500" />
                      {LOCATIONS.headOffice.label}
                    </h3>
                    <p className="text-gray-600 mb-4">{LOCATIONS.headOffice.full}</p>
                    <div className="w-full h-48 rounded-lg overflow-hidden border border-gray-200">
                      <iframe 
                        src={LOCATIONS.headOffice.mapUrl} 
                        width="100%" 
                        height="100%" 
                        style={{ border: 0 }} 
                        allowFullScreen 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Head Office Map"
                      ></iframe>
                    </div>
                  </div>

                  {/* Factory Card */}
                  <div className="bg-off-white p-6 rounded-xl border border-gray-100">
                    <h3 className="text-lg font-bold text-navy-900 mb-4 flex items-center gap-2">
                      <MapPin className="text-gold-500" />
                      {LOCATIONS.factory.label}
                    </h3>
                    <p className="text-gray-600 mb-4">{LOCATIONS.factory.full}</p>
                    <div className="w-full h-48 rounded-lg overflow-hidden border border-gray-200">
                      <iframe 
                        src={LOCATIONS.factory.mapUrl} 
                        width="100%" 
                        height="100%" 
                        style={{ border: 0 }} 
                        allowFullScreen 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Factory Map"
                      ></iframe>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Contacts */}
              <div className="bg-navy-900 text-white p-8 rounded-xl shadow-xl">
                <h3 className="text-xl font-[family-name:var(--font-playfair)] font-bold text-gold-500 mb-6">
                  Direct Contact
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <Phone className="text-gold-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Sales & Support</p>
                      {COMPANY.phones.map(phone => (
                        <a key={phone} href={`tel:${phone.replace(/\s/g, "")}`} className="block text-lg hover:text-gold-500 transition-colors">
                          {phone}
                        </a>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Mail className="text-gold-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Email Us</p>
                      <a href={`mailto:${COMPANY.email}`} className="text-lg hover:text-gold-500 transition-colors">
                        {COMPANY.email}
                      </a>
                    </div>
                  </div>
                  <div className="pt-6 mt-6 border-t border-white/10">
                    <p className="text-sm text-gray-400 mb-2">Business Hours</p>
                    <p className="font-medium">{BUSINESS_HOURS}</p>
                  </div>
                  <div className="pt-6 mt-6 border-t border-white/10">
                    <p className="text-sm text-gray-400 mb-4">Follow Us</p>
                    <div className="flex gap-4">
                      <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 rounded-full hover:bg-gold-500 hover:text-navy-900 transition-colors"><Globe size={20} /></a>
                      <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 rounded-full hover:bg-gold-500 hover:text-navy-900 transition-colors"><Globe size={20} /></a>
                      <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 rounded-full hover:bg-gold-500 hover:text-navy-900 transition-colors"><Globe size={20} /></a>
                      <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 rounded-full hover:bg-gold-500 hover:text-navy-900 transition-colors"><Play size={20} /></a>
                    </div>
                  </div>
                </div>
              </div>

            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
