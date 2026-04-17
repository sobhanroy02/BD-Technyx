"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface PricingService {
  id: string;
  name: string;
  description: string;
  features: string[];
  icon: string;
}

const pricingServices: PricingService[] = [
  {
    id: "marketing",
    name: "Marketing Command Center",
    description: "Full-service marketing strategy and execution",
    features: [
      "Campaign Strategy & Planning",
      "3D Globe Campaign Analytics",
      "Social Media Management",
      "Growth Analytics Dashboard",
      "Monthly Performance Reports",
    ],
    icon: "🎯",
  },
  {
    id: "uiux",
    name: "UI/UX Design Studio",
    description: "Complete digital experience design",
    features: [
      "Wireframing & Prototyping",
      "Interactive Design Systems",
      "User Testing & Research",
      "Responsive Design",
      "Design Tokens & Documentation",
    ],
    icon: "🎨",
  },
  {
    id: "development",
    name: "Web Development Core",
    description: "Full-stack development solutions",
    features: [
      "Custom Web Applications",
      "API Development & Integration",
      "Performance Optimization",
      "Security Implementation",
      "Maintenance & Support",
    ],
    icon: "⚙️",
  },
  {
    id: "brand",
    name: "Product & Brand Design Hub",
    description: "Brand identity and product design",
    features: [
      "Brand Strategy Development",
      "Logo & Visual Identity Design",
      "Brand Guidelines",
      "Product Positioning",
      "Market Research & Analysis",
    ],
    icon: "✨",
  },
  {
    id: "innovation",
    name: "Innovation Labs",
    description: "Experimental and R&D consulting",
    features: [
      "Prototype Development",
      "Technology Research",
      "AI/ML Integration Consulting",
      "Future Tech Strategy",
      "Proof of Concept Development",
    ],
    icon: "🚀",
  },
];

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PricingModal({ isOpen, onClose }: PricingModalProps) {
  const [selectedService, setSelectedService] = useState<string>(pricingServices[0].id);
  const [mounted, setMounted] = useState(false);

  const activeService = pricingServices.find((s) => s.id === selectedService) || pricingServices[0];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-120 bg-[#04050A]/90 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="h-full w-full overflow-hidden rounded-none border border-white/10 bg-[#070910] p-5 md:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto flex h-full w-full max-w-7xl min-h-0 flex-col">
              {/* Header */}
              <div className="mb-6 flex items-start justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <p className="text-xs tracking-[0.24em] text-electric-blue uppercase">PRICING · SERVICE BASED</p>
                  <h2 className="mt-3 text-3xl md:text-4xl font-semibold text-white">Custom Pricing Plans</h2>
                  <p className="mt-2 text-[#A3A3A3]">Pricing is based on your selected services and requirements</p>
                </div>
                <button
                  suppressHydrationWarning
                  onClick={onClose}
                  className="shrink-0 text-2xl text-white/60 hover:text-white transition-colors"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>

              {/* Scrollable body */}
              <div className="min-h-0 flex-1 overflow-y-auto pr-2 pb-8">

                {/* Service Selector */}
                <div className="mb-8">
                  <p className="mb-3 text-sm font-semibold text-white">Select a Service:</p>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
                    {pricingServices.map((service) => (
                      <button
                        suppressHydrationWarning
                        key={service.id}
                        onClick={() => setSelectedService(service.id)}
                        className={`rounded-xl border p-3 text-center transition-all duration-300 ${selectedService === service.id
                            ? "border-electric-blue/30 bg-white/8 ring-1 ring-neon-violet/70 shadow-[0_0_24px_rgba(91,141,255,0.28)] backdrop-blur-md"
                            : "border-white/10 bg-transparent opacity-80 hover:border-electric-blue/25 hover:bg-linear-to-br hover:from-electric-blue/10 hover:via-neon-violet/10 hover:to-cyber-teal/10 hover:opacity-100"
                          }`}
                      >
                        <div className="mb-3 flex justify-start">
                          <div className={`flex h-10 w-10 items-center justify-center rounded-full border ${selectedService === service.id ? "border-electric-blue/40 bg-linear-to-br from-electric-blue via-neon-violet to-cyber-teal shadow-[0_0_16px_rgba(91,141,255,0.35)]" : "border-white/15 bg-white/5 backdrop-blur-md"}`}>
                            <span className={`h-3 w-3 rounded-full ${selectedService === service.id ? "bg-white shadow-[0_0_12px_rgba(255,255,255,0.9)]" : "bg-[#7b8ab8]"}`} />
                          </div>
                        </div>
                        <p className="text-xs font-semibold text-white leading-tight">{service.name.split(" ").slice(0, 2).join(" ")}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Service Details */}
                <motion.div
                  key={activeService.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-2xl border border-electric-blue/15 bg-white/6 p-6 shadow-[0_0_32px_rgba(45,75,170,0.12)] backdrop-blur-md md:p-8"
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className="text-5xl">{activeService.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-2xl md:text-3xl font-semibold text-white">{activeService.name}</h3>
                      <p className="mt-2 text-[#A3A3A3]">{activeService.description}</p>
                    </div>
                  </div>

                  {/* Features Grid */}
                  <div className="mb-6">
                    <p className="text-sm font-semibold text-electric-blue mb-4 uppercase tracking-[0.12em]">Included Features:</p>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {activeService.features.map((feature, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="mt-1 shrink-0 w-5 h-5 rounded-full bg-electric-blue/30 flex items-center justify-center">
                            <span className="w-2 h-2 rounded-full bg-electric-blue" />
                          </div>
                          <span className="text-sm text-[#D0DEFA]">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pricing Info */}
                  <div className="section-grid rounded-xl border border-electric-blue/15 bg-white/5 p-4 mb-6 backdrop-blur-md">
                    <div className="flex items-baseline justify-between">
                      <div>
                        <p className="text-xs tracking-[0.18em] text-electric-blue uppercase mb-1">Service Cost</p>
                        <p className="text-2xl md:text-3xl font-bold text-white">Custom Quote</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs tracking-[0.18em] text-cyber-teal uppercase mb-1">Timeline</p>
                        <p className="text-lg font-semibold text-[#D0DEFA]">Based on scope</p>
                      </div>
                    </div>
                  </div>

                  {/* Info Text */}
                  <div className="bg-linear-to-r from-electric-blue/10 via-neon-violet/10 to-cyber-teal/10 border border-electric-blue/20 rounded-lg p-4 mb-6">
                    <p className="text-xs md:text-sm text-[#E3DDE3]">
                      <strong>Note:</strong> Our pricing is completely customized based on your specific requirements, project scope, timeline, and business goals.
                      Each service can be tailored to fit your needs. Contact us for a detailed quote and consultation.
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href="/contact"
                      className="flex items-center justify-center gap-2 rounded-full bg-linear-to-r from-electric-blue via-neon-violet to-cyber-teal px-8 py-3 text-sm font-semibold text-white transition-transform hover:scale-105 flex-1 shadow-[0_0_22px_rgba(91,141,255,0.22)]"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 12H20M20 12L14 6M20 12L14 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      Get a Custom Quote
                    </a>
                    <button
                      suppressHydrationWarning
                      onClick={onClose}
                      className="rounded-full border border-white/30 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 flex-1"
                    >
                      Close
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
