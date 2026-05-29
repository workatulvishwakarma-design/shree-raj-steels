"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, X } from "lucide-react";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState({
    essential: true,
    analytics: true,
    personalization: false,
  });

  useEffect(() => {
    // Check if consent has already been given
    const consent = localStorage.getItem("srs-cookie-consent");
    if (!consent) {
      // Trigger a slight delay so it feels premium and doesn't flash instantly
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem("srs-cookie-consent", "all");
    setIsVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem("srs-cookie-consent", "essential");
    setIsVisible(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem(
      "srs-cookie-consent",
      JSON.stringify({
        status: "custom",
        ...preferences,
      })
    );
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.95 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 right-6 left-6 sm:left-auto z-[9999] max-w-md w-full bg-navy-800/98 backdrop-blur-xl border border-white/10 rounded-2xl p-5 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col gap-4 no-print text-white font-[family-name:var(--font-montserrat)]"
          role="dialog"
          aria-modal="true"
          aria-label="Cookie consent settings"
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2.5 text-gold-500">
              <ShieldAlert className="w-5 h-5 flex-shrink-0 animate-pulse" />
              <h3 className="font-bold text-sm tracking-wider uppercase">Cookie Preferences</h3>
            </div>
            <button
              onClick={handleReject}
              className="text-gray-400 hover:text-white transition-colors p-1"
              aria-label="Dismiss cookie policy"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body Text */}
          {!showPreferences ? (
            <p className="text-xs text-gray-300 leading-relaxed">
              We use cookies to analyze website traffic, customize structural tools, and optimize your 
              experience. By clicking &ldquo;Accept All&rdquo;, you consent to our use of all cookies. You can 
              learn more or modify selections at our{" "}
              <a href="/about#privacy" className="text-gold-500 hover:underline font-semibold">
                Privacy Policy
              </a>{" "}
              and{" "}
              <a href="/about#cookies" className="text-gold-500 hover:underline font-semibold">
                Cookie Policy
              </a>.
            </p>
          ) : (
            /* Preferences Customizer */
            <div className="flex flex-col gap-3 py-1">
              <div className="flex items-center justify-between text-xs border-b border-white/5 pb-2">
                <div>
                  <span className="font-bold block">Essential Cookies</span>
                  <span className="text-[10px] text-gray-400">Required for website functionality.</span>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.essential}
                  disabled
                  className="rounded border-gray-600 bg-transparent text-gold-500 focus:ring-gold-500 w-4 h-4"
                />
              </div>
              <div className="flex items-center justify-between text-xs border-b border-white/5 pb-2">
                <div>
                  <span className="font-bold block">Performance &amp; Analytics</span>
                  <span className="text-[10px] text-gray-400">Helps us monitor and improve site speed.</span>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.analytics}
                  onChange={(e) =>
                    setPreferences({ ...preferences, analytics: e.target.checked })
                  }
                  className="rounded border-gray-600 bg-transparent text-gold-500 focus:ring-gold-500 w-4 h-4 cursor-pointer"
                />
              </div>
              <div className="flex items-center justify-between text-xs pb-1">
                <div>
                  <span className="font-bold block">Personalization</span>
                  <span className="text-[10px] text-gray-400">Saves layout settings and recent searches.</span>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.personalization}
                  onChange={(e) =>
                    setPreferences({ ...preferences, personalization: e.target.checked })
                  }
                  className="rounded border-gray-600 bg-transparent text-gold-500 focus:ring-gold-500 w-4 h-4 cursor-pointer"
                />
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 mt-2 w-full">
            {!showPreferences ? (
              <>
                <button
                  onClick={handleAcceptAll}
                  className="flex-1 py-2.5 bg-gold-500 text-navy-900 font-bold rounded-lg text-xs hover:bg-gold-400 transition-colors shadow-md shadow-gold-500/10 cursor-pointer"
                >
                  Accept All
                </button>
                <button
                  onClick={() => setShowPreferences(true)}
                  className="flex-1 py-2.5 border border-white/20 text-white font-semibold rounded-lg text-xs hover:bg-white/5 transition-colors cursor-pointer"
                >
                  Configure
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleSavePreferences}
                  className="flex-1 py-2.5 bg-gold-500 text-navy-900 font-bold rounded-lg text-xs hover:bg-gold-400 transition-colors cursor-pointer"
                >
                  Save Choices
                </button>
                <button
                  onClick={() => setShowPreferences(false)}
                  className="flex-1 py-2.5 border border-white/20 text-white font-semibold rounded-lg text-xs hover:bg-white/5 transition-colors cursor-pointer"
                >
                  Back
                </button>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
