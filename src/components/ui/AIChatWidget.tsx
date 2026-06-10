"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, User, CornerDownLeft, ShieldCheck } from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: Date;
}

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const starterChips = [
    "What products do you supply?",
    "Can I get a quotation?",
    "What are your delivery options?",
    "Do you provide bulk order support?"
  ];

  // Initialize with welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: "welcome",
          sender: "bot",
          text: "Welcome to Shree Raj Steels! I am your AI Support Assistant. I can answer inquiries regarding our pipe fittings, flanges, material grades (ASTM, ASME, API), delivery turnaround times, bulk order shipping, and certifications. How may I assist you today?",
          timestamp: new Date()
        }
      ]);
    }
  }, [messages.length]);

  // Scroll to bottom of conversation
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const botResponses: Record<string, string> = {
    products: "Shree Raj Steels is a premier ISO 9001 + PED certified manufacturer and global supplier of high-grade industrial piping components. Our core catalog includes seamless and welded pipes, elbows (45/90/180 degree, long & short radius), equal/reducing tees, concentric and eccentric reducers, flanges (weld neck, slip-on, blind, socket weld), and special alloy custom fittings. We supply sizes ranging from 1/2\" up to 48\" in NPS, complying with ASTM, ASME, API, DIN, and EN specifications.",
    quote: "Getting a quotation from Shree Raj Steels is fast and seamless. You can head over to our dedicated 'Request a Quote' page where you can upload your BOQ sheet, drawings, or detailed specification documents. Alternatively, you can send your technical sheets directly to sales@shreerajsteels.com. Our engineering team reviews all technical requirements and aims to return a comprehensive, competitive commercial quotation within 2 hours.",
    delivery: "We optimize logistics from our strategic warehouses located at Kalamboli Steel Market (Raigad) and Kharghar (Navi Mumbai). We offer Pan-India transport dispatches and global port-to-port ocean freight shipping. For stocked inventory items, we offer immediate 24-hour dispatch, whereas custom alloy fabrication items are scheduled on prioritized production queues. All shipments are packed in heavy-duty industrial wooden crates with full weatherproofing.",
    bulk: "Yes, we specialize in high-volume contract supply for large-scale infrastructure, power plants, petrochemical refineries, water distribution systems, and offshore engineering installations. We support bulk purchasing agreements, offering volume-tiered pricing structures, dedicated customer service coordinators, custom mill runs, and complete logistical coordination to project staging yards globally.",
    grades: "We process and stock a vast range of material specifications. This includes Carbon Steel (ASTM A106 Grade B, A53, API 5L X42/X52/X60/X65), Alloy Steel (ASTM A335 P11, P22, P91 for high-temperature and high-pressure steam utility), Stainless Steel (ASTM A312/A403 304L, 316L, 321, 347, 904L), and Special Alloys (Duplex 2205, Super Duplex 2507, Hastelloy, Inconel, and Monel). All grades are fully traceable.",
    certifications: "Quality compliance is our highest priority. Every fitting, flange, and pipe delivered by Shree Raj Steels is accompanied by complete mill test certificates (MTC) in accordance with EN 10204 Type 3.1 or Type 3.2. Our facilities undergo routine audits and are fully accredited with ISO 9001:2015, ISO 14001:2015, ISO 45001:2018, CE-PED 2014/68/EU, and AD2000 certifications.",
    contact: "You can reach the Shree Raj Steels sales and support divisions directly via telephone at +91-7069672923 or +91-7400410762. Our corporate office is located at 408, Kamdhenu Commerz, Sector 14, Kharghar, Navi Mumbai, 410210, India. You can also send general business enquiries to info@shreerajsteels.com or sales@shreerajsteels.com."
  };

  const getBotReply = (userText: string): string => {
    const text = userText.toLowerCase();

    if (text.includes("product") || text.includes("supply") || text.includes("catalog") || text.includes("fittings") || text.includes("pipe") || text.includes("flange")) {
      return botResponses.products;
    }
    if (text.includes("quote") || text.includes("quotation") || text.includes("price") || text.includes("cost") || text.includes("inquiry")) {
      return botResponses.quote;
    }
    if (text.includes("delivery") || text.includes("shipping") || text.includes("freight") || text.includes("dispatch") || text.includes("transport")) {
      return botResponses.delivery;
    }
    if (text.includes("bulk") || text.includes("large order") || text.includes("volume") || text.includes("wholesale")) {
      return botResponses.bulk;
    }
    if (text.includes("grade") || text.includes("material") || text.includes("alloy") || text.includes("astm") || text.includes("stainless") || text.includes("carbon")) {
      return botResponses.grades;
    }
    if (text.includes("cert") || text.includes("iso") || text.includes("quality") || text.includes("ped") || text.includes("mtc") || text.includes("trace")) {
      return botResponses.certifications;
    }
    if (text.includes("contact") || text.includes("phone") || text.includes("email") || text.includes("address") || text.includes("location") || text.includes("office")) {
      return botResponses.contact;
    }

    // Default general B2B fallback response (meets 300-400 character requirement)
    return "Thank you for your message. Shree Raj Steels is committed to providing premium industrial piping solutions with full compliance. Since your query contains specific project parameters, it would be best for our technical engineers to review this. Please leave your contact number and email here, or write to sales@shreerajsteels.com with your technical drawings, and we will get back to you with detailed feedback.";
  };

  const handleSendMessage = (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: Message = {
      id: Math.random().toString(),
      sender: "user",
      text: textToSend,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const botReplyText = getBotReply(textToSend);
      const botMsg: Message = {
        id: Math.random().toString(),
        sender: "bot",
        text: botReplyText,
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <div className="fixed bottom-6 right-6 z-[9999] no-print">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative h-14 w-14 bg-gradient-to-b from-[#f3dfa2] via-[#C9A84C] to-[#997928] border border-[#f5e4b3]/60 text-[#09111e] rounded-full flex items-center justify-center shadow-[0_4px_16px_rgba(201,168,76,0.35),_inset_0_2px_3px_rgba(255,255,255,0.45),_inset_0_-2px_4px_rgba(0,0,0,0.4)] hover:from-[#f7e4ac] hover:via-[#d4b96f] hover:to-[#ac8a34] hover:shadow-[0_6px_22px_rgba(201,168,76,0.5),_inset_0_2px_3px_rgba(255,255,255,0.55),_inset_0_-2px_4px_rgba(0,0,0,0.3)] transition-all duration-200 cursor-pointer outline-none"
          aria-label="Toggle AI Support Assistant"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
              >
                <X className="w-5 h-5" />
              </motion.div>
            ) : (
              <motion.div
                key="chat"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="relative"
              >
                <MessageSquare className="w-5 h-5" />
                {/* Glowing status indicator dot */}
                <span className="absolute -top-1.5 -right-1.5 h-2.5 w-2.5 rounded-full bg-emerald-500 border-2 border-[#C9A84C] animate-pulse" />
              </motion.div>
            )}
          </AnimatePresence>
          {/* Subtle pulse border ring */}
          <span className="absolute inset-0 rounded-full bg-[#C9A84C] animate-pulse-ring opacity-20" />
        </motion.button>
      </div>

      {/* Chat window drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="fixed bottom-24 right-6 w-[calc(100vw-32px)] sm:w-[400px] h-[520px] bg-[#0f1c2d]/98 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col z-[9998] no-print backdrop-blur-md"
          >
            {/* Header */}
            <div className="px-5 py-4 bg-gradient-to-r from-[#0b1320] to-[#0f1b2d] border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-[#C9A84C]/10 border border-[#C9A84C]/25 flex items-center justify-center text-[#C9A84C]">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-sm text-white flex items-center gap-1.5">
                    SRS Support Assistant
                    <span title="Verified Assistant">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Online • Technical Help</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Message Feed Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2.5 max-w-[85%] ${
                    msg.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                  }`}
                >
                  {/* Sender Avatar */}
                  <div
                    className={`h-7 w-7 rounded-full flex-shrink-0 flex items-center justify-center text-xs border ${
                      msg.sender === "user"
                        ? "bg-slate-900 border-slate-800 text-slate-300"
                        : "bg-[#C9A84C]/10 border-[#C9A84C]/20 text-[#C9A84C]"
                    }`}
                  >
                    {msg.sender === "user" ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                  </div>

                  {/* Bubble content */}
                  <div className="space-y-1">
                    <div
                      className={`p-3 rounded-2xl text-xs leading-relaxed whitespace-pre-wrap ${
                        msg.sender === "user"
                          ? "bg-[#C9A84C] text-[#09111e] rounded-tr-none font-medium"
                          : "bg-slate-900 border border-slate-800/80 text-slate-100 rounded-tl-none font-sans shadow-sm"
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className="text-[9px] text-slate-500 block text-right px-1">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}

              {/* Bot typing state indicator */}
              {isTyping && (
                <div className="flex items-start gap-2.5 max-w-[85%] mr-auto">
                  <div className="h-7 w-7 rounded-full bg-[#C9A84C]/10 border border-[#C9A84C]/20 text-[#C9A84C] flex items-center justify-center text-xs">
                    <Bot className="w-3.5 h-3.5 animate-bounce" />
                  </div>
                  <div className="bg-slate-900 border border-slate-800/80 p-3 rounded-2xl rounded-tl-none flex items-center gap-1 shadow-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick chips (Starter Options) */}
            {messages.length === 1 && !isTyping && (
              <div className="px-4 py-2 border-t border-slate-850 bg-slate-900/20 flex flex-wrap gap-1.5 overflow-x-auto select-none max-h-24">
                {starterChips.map((chip, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(chip)}
                    className="px-2.5 py-1 text-[10px] font-semibold text-slate-300 hover:text-white bg-slate-900 border border-slate-800 hover:border-[#C9A84C]/45 rounded-full transition-all cursor-pointer"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            )}

            {/* Message input bar */}
            <div className="p-3 bg-[#0b1320] border-t border-slate-850">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage(input);
                }}
                className="flex items-center gap-2 bg-[#070d17] border border-slate-850 rounded-xl px-3 py-2 focus-within:border-[#C9A84C]/60 transition-colors"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your inquiry..."
                  disabled={isTyping}
                  className="flex-1 bg-transparent text-xs text-white placeholder-slate-600 outline-none border-none focus:ring-0 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="text-slate-500 hover:text-[#C9A84C] disabled:opacity-30 disabled:hover:text-slate-500 transition-colors cursor-pointer"
                  title="Send Message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
              <div className="flex items-center justify-between text-[8px] text-slate-600 mt-2 px-1">
                <span>SRS Support Assistant Agent v1.0</span>
                <span className="flex items-center gap-0.5">
                  Press Enter <CornerDownLeft className="w-2 h-2" />
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
