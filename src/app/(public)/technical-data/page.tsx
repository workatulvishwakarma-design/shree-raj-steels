"use client";

import { useState } from "react";
import { Download, ChevronDown, Table as TableIcon } from "lucide-react";
import Breadcrumb from "@/components/ui/Breadcrumb";

// Mock data for pipe schedules
const pipeSchedules = [
  { nps: "1/2\"", od: "21.3", sch10: "2.11", sch40: "2.77", sch80: "3.73", sch160: "4.78", xxs: "7.47" },
  { nps: "3/4\"", od: "26.7", sch10: "2.11", sch40: "2.87", sch80: "3.91", sch160: "5.56", xxs: "7.82" },
  { nps: "1\"", od: "33.4", sch10: "2.77", sch40: "3.38", sch80: "4.55", sch160: "6.35", xxs: "9.09" },
  { nps: "1 1/2\"", od: "48.3", sch10: "2.77", sch40: "3.68", sch80: "5.08", sch160: "7.14", xxs: "10.15" },
  { nps: "2\"", od: "60.3", sch10: "2.77", sch40: "3.91", sch80: "5.54", sch160: "8.74", xxs: "11.07" },
  { nps: "3\"", od: "88.9", sch10: "3.05", sch40: "5.49", sch80: "7.62", sch160: "11.13", xxs: "15.24" },
  { nps: "4\"", od: "114.3", sch10: "3.05", sch40: "6.02", sch80: "8.56", sch160: "13.49", xxs: "17.12" },
  { nps: "6\"", od: "168.3", sch10: "3.40", sch40: "7.11", sch80: "10.97", sch160: "18.26", xxs: "21.95" },
  { nps: "8\"", od: "219.1", sch10: "3.76", sch40: "8.18", sch80: "12.70", sch160: "23.01", xxs: "22.23" },
  { nps: "10\"", od: "273.0", sch10: "4.19", sch40: "9.27", sch80: "15.09", sch160: "28.58", xxs: "25.40" },
];

export default function TechnicalDataPage() {
  const [activeTab, setActiveTab] = useState("pipes");

  return (
    <>
      <section className="relative py-20 bg-navy-800">
        <div className="absolute inset-0 bg-grid-texture opacity-20"></div>
        <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Technical Data" }]} />
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mt-6">
            <div>
              <h1 className="text-4xl sm:text-5xl font-[family-name:var(--font-playfair)] font-bold text-white mb-4">
                Technical Data
              </h1>
              <p className="text-gray-300 max-w-2xl text-lg">
                Dimensions, weights, and specifications for standard pipes, fittings, and flanges.
              </p>
            </div>
            <a 
              href="/downloads/SRS-Catalogue.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gold-500 text-navy-900 font-bold rounded-lg hover:bg-gold-400 transition-colors shrink-0"
            >
              <Download size={18} />
              Download Full Catalogue
            </a>
          </div>
        </div>
      </section>

      <section className="py-12 bg-off-white min-h-[60vh]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            <button 
              onClick={() => setActiveTab("pipes")}
              className={`px-6 py-3 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${activeTab === "pipes" ? "bg-navy-900 text-white shadow-md" : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"}`}
            >
              <TableIcon size={16} /> Pipe Dimensions (ASME B36.10/19)
            </button>
            <button 
              onClick={() => setActiveTab("flanges")}
              className={`px-6 py-3 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${activeTab === "flanges" ? "bg-navy-900 text-white shadow-md" : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"}`}
            >
              <TableIcon size={16} /> Flange Dimensions (ASME B16.5)
            </button>
            <button 
              onClick={() => setActiveTab("fittings")}
              className={`px-6 py-3 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${activeTab === "fittings" ? "bg-navy-900 text-white shadow-md" : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"}`}
            >
              <TableIcon size={16} /> Butt-Weld Fittings (ASME B16.9)
            </button>
          </div>

          {/* Table Area */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {activeTab === "pipes" && (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-navy-900 text-white">
                      <th className="p-4 text-sm font-semibold border-b border-navy-800 whitespace-nowrap">NPS (Inch)</th>
                      <th className="p-4 text-sm font-semibold border-b border-navy-800 whitespace-nowrap">O.D. (mm)</th>
                      <th className="p-4 text-sm font-semibold border-b border-navy-800 whitespace-nowrap">Sch 10S (mm)</th>
                      <th className="p-4 text-sm font-semibold border-b border-navy-800 whitespace-nowrap">Sch 40 (mm)</th>
                      <th className="p-4 text-sm font-semibold border-b border-navy-800 whitespace-nowrap">Sch 80 (mm)</th>
                      <th className="p-4 text-sm font-semibold border-b border-navy-800 whitespace-nowrap">Sch 160 (mm)</th>
                      <th className="p-4 text-sm font-semibold border-b border-navy-800 whitespace-nowrap">XXS (mm)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 font-[family-name:var(--font-jetbrains)] text-sm">
                    {pipeSchedules.map((row, i) => (
                      <tr key={row.nps} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="p-4 font-bold text-navy-900">{row.nps}</td>
                        <td className="p-4 text-gray-600">{row.od}</td>
                        <td className="p-4 text-gray-600">{row.sch10}</td>
                        <td className="p-4 text-gray-600">{row.sch40}</td>
                        <td className="p-4 text-gray-600">{row.sch80}</td>
                        <td className="p-4 text-gray-600">{row.sch160}</td>
                        <td className="p-4 text-gray-600">{row.xxs}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            
            {(activeTab === "flanges" || activeTab === "fittings") && (
              <div className="p-16 text-center">
                <div className="w-16 h-16 bg-navy-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TableIcon className="text-navy-300 w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-navy-900 mb-2">Detailed Tables Available in PDF</h3>
                <p className="text-gray-500 mb-6 max-w-md mx-auto">
                  Due to the extensive number of dimensional parameters for {activeTab}, please refer to our comprehensive technical catalogue.
                </p>
                <a 
                  href="/downloads/SRS-Catalogue.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-navy-900 text-white font-semibold rounded-lg hover:bg-navy-800 transition-colors"
                >
                  <Download size={16} /> Download {activeTab === "flanges" ? "Flange" : "Fittings"} Data
                </a>
              </div>
            )}
          </div>
          
          <p className="text-sm text-gray-400 mt-6 text-center">
            * All dimensions are in millimeters (mm) unless otherwise specified. Information is provided for reference only.
          </p>
        </div>
      </section>
    </>
  );
}
