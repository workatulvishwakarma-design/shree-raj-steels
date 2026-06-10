"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Settings2, ShieldCheck, Truck, Droplet, Flame, Scissors, Hammer } from "lucide-react";
import Breadcrumb from "@/components/ui/Breadcrumb";
import SectionHeader from "@/components/ui/SectionHeader";

const processes = {
  seamless: {
    title: "Seamless Steel Pipe Manufacturing Process",
    steps: [
      "Billet Piercing", "Heating", "Piercing", "Elongating", "Sizing", 
      "Cooling", "Straightening", "Cutting", "Visual Inspection", 
      "NDT (Non-Destructive Testing)", "Hydrostatic Testing", "Dimensional Check", 
      "Beveling", "Marking", "Coating/Oiling", "Final Inspection", 
      "Packaging", "Dispatch"
    ]
  },
  erw: {
    title: "ERW Steel Pipe Manufacturing Process",
    steps: [
      "Uncoiling", "Leveling", "Shearing & Butt Welding", "Accumulator", 
      "Edge Milling", "Forming", "High Frequency Welding", "Inner/Outer Burr Removal", 
      "Seam Annealing", "Cooling", "Sizing", "Cutting", "End Facing/Beveling", 
      "Hydrostatic Testing", "Ultrasonic Testing", "Visual & Dimensional Inspection", 
      "Weighing & Measuring", "Marking", "Coating", "Packaging & Dispatch"
    ]
  },
  fittings: {
    title: "Butt Weld Fittings Manufacturing Process",
    steps: [
      "Raw Material Inspection", "Cutting", "Heating", "Forming (Hot/Cold Extrusion)", 
      "Sizing", "Heat Treatment", "Shot Blasting", "Machining/Beveling", 
      "Surface Treatment", "NDT & Destructive Testing", "Dimensional Inspection", 
      "Marking", "Packaging", "Dispatch"
    ]
  }
};

type ProcessType = keyof typeof processes;

// Get appropriate icon for step
const getStepIcon = (stepName: string) => {
  const lower = stepName.toLowerCase();
  if (lower.includes("inspect") || lower.includes("test") || lower.includes("ndt") || lower.includes("check")) return <ShieldCheck size={20} />;
  if (lower.includes("pack") || lower.includes("dispatch")) return <Truck size={20} />;
  if (lower.includes("heat") || lower.includes("anneal") || lower.includes("weld")) return <Flame size={20} />;
  if (lower.includes("cut") || lower.includes("shear") || lower.includes("mill") || lower.includes("bevel")) return <Scissors size={20} />;
  if (lower.includes("form") || lower.includes("size") || lower.includes("straight") || lower.includes("pierce")) return <Hammer size={20} />;
  if (lower.includes("cool") || lower.includes("hydro") || lower.includes("oil") || lower.includes("coat")) return <Droplet size={20} />;
  return <Settings2 size={20} />;
};

export default function ProcessPage() {
  const [activeProcess, setActiveProcess] = useState<ProcessType>("seamless");
  const [activeStep, setActiveStep] = useState(0);

  const currentProcess = processes[activeProcess];

  return (
    <>
      <section className="relative h-[30vh] min-h-[300px] flex items-center justify-center bg-navy-800">
        <div className="absolute inset-0 bg-[url('/images/hero/factory-hero.jpg')] bg-cover bg-center opacity-30 mix-blend-overlay"></div>
        <div className="relative z-10 text-center px-4 w-full max-w-[1440px] mx-auto">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Manufacturing Process" }]} />
          <h1 className="text-4xl sm:text-5xl font-[family-name:var(--font-playfair)] font-bold text-white mt-4">
            Manufacturing Process
          </h1>
        </div>
      </section>

      <section className="py-20 bg-off-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <SectionHeader label="WORKFLOW" title="Production & Quality Control Flow" light={true} />
            <p className="text-gray-600 max-w-3xl mx-auto mt-6">
              Our state-of-the-art manufacturing facilities follow strict procedural workflows to ensure every product meets global quality standards. Select a process below to see the detailed manufacturing steps.
            </p>
          </div>

          {/* Process Selectors */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            {(Object.keys(processes) as ProcessType[]).map((key) => (
              <button
                key={key}
                onClick={() => { setActiveProcess(key); setActiveStep(0); }}
                className={`px-6 py-4 rounded-xl text-sm sm:text-base font-bold transition-all duration-300 shadow-sm ${
                  activeProcess === key
                    ? "bg-gold-500 text-navy-900 shadow-md transform scale-105"
                    : "bg-white text-gray-500 hover:text-navy-900 border border-gray-200"
                }`}
              >
                {processes[key].title}
              </button>
            ))}
          </div>

          {/* Active Process Flow */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 lg:p-12">
            <h2 className="text-2xl font-[family-name:var(--font-playfair)] font-bold text-navy-900 mb-10 text-center">
              {currentProcess.title}
            </h2>

            {/* Visual Flow Indicator */}
            <div className="relative mb-16 hidden md:block">
              {/* Connecting Line */}
              <div className="absolute top-1/2 left-0 right-0 h-1 -translate-y-1/2 bg-gray-100 rounded-full">
                <motion.div 
                  className="h-full bg-gold-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(activeStep / (currentProcess.steps.length - 1)) * 100}%` }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />
              </div>

              {/* Dots */}
              <div className="relative flex justify-between">
                {currentProcess.steps.map((step, index) => {
                  const isActive = index === activeStep;
                  const isPast = index < activeStep;
                  
                  // Only show dots, not all text to avoid crowding
                  return (
                    <button
                      key={index}
                      onClick={() => setActiveStep(index)}
                      className={`relative z-10 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 outline-none ${
                        isActive ? "bg-gold-500 scale-150 shadow-md shadow-gold-500/30" : 
                        isPast ? "bg-navy-700" : "bg-gray-200 hover:bg-gray-300"
                      }`}
                      aria-label={`Step ${index + 1}: ${step}`}
                    >
                      {isActive && <span className="absolute -bottom-8 w-max text-xs font-bold text-navy-900">{index + 1}</span>}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Step Details */}
            <div className="max-w-2xl mx-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-navy-50 rounded-xl p-8 border border-navy-100 text-center relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-2 h-full bg-gold-500"></div>
                  
                  <div className="w-16 h-16 bg-white rounded-full mx-auto flex items-center justify-center shadow-sm text-navy-900 mb-6">
                    {getStepIcon(currentProcess.steps[activeStep])}
                  </div>
                  
                  <div className="text-sm font-bold text-gold-500 tracking-wider uppercase mb-2">
                    Step {activeStep + 1} of {currentProcess.steps.length}
                  </div>
                  
                  <h3 className="text-3xl font-[family-name:var(--font-playfair)] font-bold text-navy-900 mb-8">
                    {currentProcess.steps[activeStep]}
                  </h3>
                  
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={() => setActiveStep(prev => Math.max(0, prev - 1))}
                      disabled={activeStep === 0}
                      className="px-6 py-2 rounded-lg border border-gray-300 text-gray-600 font-medium hover:bg-white disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                    >
                      Previous Step
                    </button>
                    <button
                      onClick={() => setActiveStep(prev => Math.min(currentProcess.steps.length - 1, prev + 1))}
                      disabled={activeStep === currentProcess.steps.length - 1}
                      className="px-6 py-2 rounded-lg bg-navy-900 text-white font-medium hover:bg-navy-800 disabled:opacity-30 flex items-center gap-2 transition-colors"
                    >
                      Next Step <ArrowRight size={16} />
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Full List (Mobile fallback & reference) */}
            <div className="mt-16 pt-16 border-t border-gray-100">
              <h3 className="text-lg font-bold text-navy-900 mb-8 text-center uppercase tracking-widest">Complete Process Outline</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-8">
                {currentProcess.steps.map((step, index) => (
                  <div 
                    key={index} 
                    className={`flex items-start gap-3 p-3 rounded-lg transition-colors cursor-pointer ${activeStep === index ? "bg-gold-50 border border-gold-200" : "hover:bg-gray-50"}`}
                    onClick={() => setActiveStep(index)}
                  >
                    <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${activeStep === index ? "bg-gold-500 text-navy-900" : "bg-navy-900 text-white"}`}>
                      {index + 1}
                    </span>
                    <span className={`text-sm font-medium pt-0.5 ${activeStep === index ? "text-navy-900" : "text-gray-600"}`}>
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
