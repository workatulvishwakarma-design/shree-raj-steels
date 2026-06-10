"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, UploadCloud, CheckCircle } from "lucide-react";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { PRODUCTS } from "@/data/products";

export default function QuotePage() {
  const [products, setProducts] = useState([
    { id: 1, type: "", grade: "", size: "", schedule: "", quantity: "", standard: "" }
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const addProduct = () => {
    setProducts([...products, { id: Date.now(), type: "", grade: "", size: "", schedule: "", quantity: "", standard: "" }]);
  };

  const removeProduct = (id: number) => {
    if (products.length > 1) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const updateProduct = (id: number, field: string, value: string) => {
    setProducts(products.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      const contactDetails = {
        name: formData.get("name") as string,
        company: formData.get("company") as string,
        email: formData.get("email") as string,
        phone: formData.get("phone") as string,
        country: formData.get("country") as string,
      };

      const payload = {
        contactDetails,
        items: products,
        notes: formData.get("notes") as string,
        deliveryDetails: {
          destination: formData.get("destination") as string,
          deliveryDate: formData.get("deliveryDate") as string,
        },
        inspection: formData.getAll("inspection") as string[],
      };

      const { submitQuoteForm } = await import("@/lib/actions");
      const result = await submitQuoteForm(payload);

      if (result.success) {
        setSubmitted(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        alert(result.message || "Failed to submit request.");
      }
    } catch (err) {
      console.error("Submit quote failed:", err);
      alert("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen pt-32 pb-20 bg-off-white flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl mx-auto bg-white p-12 rounded-2xl shadow-xl text-center border border-gray-100"
        >
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
          <h2 className="text-3xl font-[family-name:var(--font-playfair)] font-bold text-navy-900 mb-4">
            Quote Request Received
          </h2>
          <p className="text-gray-600 mb-8">
            Thank you for your interest in Shree Raj Steels. Our sales team is reviewing your requirements and will get back to you with a detailed quotation within 2 hours.
          </p>
          <button 
            onClick={() => { setSubmitted(false); setProducts([{ id: 1, type: "", grade: "", size: "", schedule: "", quantity: "", standard: "" }]); }}
            className="px-8 py-3 bg-navy-900 text-white rounded-lg hover:bg-navy-800 transition-colors font-medium"
          >
            Submit Another Request
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      <section className="relative h-[30vh] min-h-[300px] flex items-center justify-center bg-navy-800">
        <div className="absolute inset-0 bg-[url('/images/hero/steel-closeup.jpg')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
        <div className="relative z-10 text-center px-4 w-full max-w-[1440px] mx-auto">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Request Quote" }]} />
          <h1 className="text-4xl sm:text-5xl font-[family-name:var(--font-playfair)] font-bold text-white mt-4">
            Request a Quote
          </h1>
        </div>
      </section>

      <section className="py-20 bg-off-white">
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSubmit} className="space-y-12">
            
            {/* Company Info */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-navy-900 mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-gold-500 text-navy-900 flex items-center justify-center text-sm">1</span>
                Company Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name *</label>
                  <input required name="name" type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-colors bg-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Company Name *</label>
                  <input required name="company" type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-colors bg-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address *</label>
                  <input required name="email" type="email" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-colors bg-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone / WhatsApp *</label>
                  <input required name="phone" type="tel" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-colors bg-white" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Country *</label>
                  <select required name="country" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-colors bg-white">
                    <option value="">Select Country</option>
                    <option value="India">India</option>
                    <option value="UAE">United Arab Emirates</option>
                    <option value="Saudi Arabia">Saudi Arabia</option>
                    <option value="USA">United States</option>
                    <option value="UK">United Kingdom</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-navy-900 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-gold-500 text-navy-900 flex items-center justify-center text-sm">2</span>
                  Product Requirements
                </h2>
              </div>

              <div className="space-y-6">
                <AnimatePresence>
                  {products.map((product, index) => (
                    <motion.div 
                      key={product.id}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="p-6 bg-gray-50 rounded-xl border border-gray-200 relative"
                    >
                      {products.length > 1 && (
                        <button 
                          type="button" 
                          onClick={() => removeProduct(product.id)}
                          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <X size={20} />
                        </button>
                      )}
                      
                      <div className="mb-4">
                        <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Item #{index + 1}</span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="lg:col-span-2">
                          <label className="block text-xs font-medium text-gray-700 mb-1">Product Type *</label>
                          <select 
                            required
                            value={product.type}
                            onChange={(e) => updateProduct(product.id, "type", e.target.value)}
                            className="w-full border border-gray-300 rounded bg-white px-3 py-2 text-sm focus:border-gold-500 outline-none"
                          >
                            <option value="">Select Product...</option>
                            {PRODUCTS.map(p => <option key={p.slug} value={p.name}>{p.name}</option>)}
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Material Grade *</label>
                          <input 
                            required
                            type="text" 
                            placeholder="e.g. ASTM A106 Gr.B"
                            value={product.grade}
                            onChange={(e) => updateProduct(product.id, "grade", e.target.value)}
                            className="w-full border border-gray-300 rounded bg-white px-3 py-2 text-sm focus:border-gold-500 outline-none" 
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Size / DN *</label>
                          <input 
                            required
                            type="text" 
                            placeholder="e.g. 2 inch"
                            value={product.size}
                            onChange={(e) => updateProduct(product.id, "size", e.target.value)}
                            className="w-full border border-gray-300 rounded bg-white px-3 py-2 text-sm focus:border-gold-500 outline-none" 
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Schedule / Thickness</label>
                          <input 
                            type="text" 
                            placeholder="e.g. SCH 40"
                            value={product.schedule}
                            onChange={(e) => updateProduct(product.id, "schedule", e.target.value)}
                            className="w-full border border-gray-300 rounded bg-white px-3 py-2 text-sm focus:border-gold-500 outline-none" 
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Quantity *</label>
                          <input 
                            required
                            type="text" 
                            placeholder="e.g. 100 pcs"
                            value={product.quantity}
                            onChange={(e) => updateProduct(product.id, "quantity", e.target.value)}
                            className="w-full border border-gray-300 rounded bg-white px-3 py-2 text-sm focus:border-gold-500 outline-none" 
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                <button 
                  type="button" 
                  onClick={addProduct}
                  className="flex items-center gap-2 text-gold-500 font-semibold hover:text-gold-400 transition-colors py-2"
                >
                  <Plus size={18} />
                  Add Another Product
                </button>
              </div>

              {/* Special Requirements */}
              <div className="mt-8">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Special Requirements / Notes</label>
                <textarea 
                  name="notes"
                  rows={3} 
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-colors bg-white resize-none"
                  placeholder="Any specific surface finish, coating, or testing requirements..."
                ></textarea>
              </div>

              {/* File Upload */}
              <div className="mt-6 border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer">
                <UploadCloud className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                <p className="text-sm text-gray-600 font-medium mb-1">Drag & drop files or click to browse</p>
                <p className="text-xs text-gray-400">Upload BOQ, drawings, or specifications (PDF, Excel, DWG up to 10MB)</p>
                <input type="file" className="hidden" multiple />
              </div>
            </div>

            {/* Delivery & Inspection */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-navy-900 mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-gold-500 text-navy-900 flex items-center justify-center text-sm">3</span>
                Delivery & Inspection
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Delivery Destination *</label>
                  <input required name="destination" type="text" placeholder="City, Country or Port" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:border-gold-500 outline-none bg-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Required Delivery Date</label>
                  <input name="deliveryDate" type="date" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:border-gold-500 outline-none bg-white" />
                </div>
              </div>

              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">Inspection Requirements</label>
                <div className="flex flex-wrap gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input name="inspection" value="Third Party Inspection (TPI)" type="checkbox" className="w-4 h-4 text-gold-500 rounded border-gray-300 focus:ring-gold-500" />
                    <span className="text-sm text-gray-700">Third Party Inspection (TPI)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input name="inspection" value="EN 10204 3.1 Certification" type="checkbox" className="w-4 h-4 text-gold-500 rounded border-gray-300 focus:ring-gold-500" />
                    <span className="text-sm text-gray-700">EN 10204 3.1 Certification</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input name="inspection" value="EN 10204 3.2 Certification" type="checkbox" className="w-4 h-4 text-gold-500 rounded border-gray-300 focus:ring-gold-500" />
                    <span className="text-sm text-gray-700">EN 10204 3.2 Certification</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="text-center">
              <button 
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center min-w-[240px] px-8 py-4 bg-gold-500 text-navy-900 text-lg font-bold rounded-lg shadow-xl shadow-gold-500/20 hover:bg-gold-400 transition-all hover:scale-105 active:scale-95 disabled:opacity-70 disabled:hover:scale-100"
              >
                {isSubmitting ? "Submitting Request..." : "Submit Quote Request"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
