"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionScene from "../../components/SectionScene";

type ServiceModule = {
  title: string;
  subtitle: string;
  bullets: string[];
  metrics: { label: string; val: string; prefix?: string; suffix?: string; fill: number }[];
};

const serviceModules: ServiceModule[] = [
  {
    title: "Marketing Command Center",
    subtitle: "Rotating global campaign intelligence and growth vectors",
    bullets: ["3D Globe View", "Campaign Data Lines", "Live Growth Charts"],
    metrics: [
      { label: "Traffic Growth", val: "218", prefix: "+", suffix: "%", fill: 80 },
      { label: "Conversion Boost", val: "63", prefix: "+", suffix: "%", fill: 65 },
      { label: "Brand Reach", val: "4.2", prefix: "x", fill: 90 },
    ],
  },
  {
    title: "UI/UX Design Studio",
    subtitle: "Adaptive wireframes and interface modules assembling in the air",
    bullets: ["Floating Wireframes", "Auto Grid Systems", "Design Tokens in Motion"],
    metrics: [
      { label: "Prototype Speed", val: "3.4", suffix: "x", fill: 75 },
      { label: "UX Score", val: "94", suffix: "/100", fill: 94 },
      { label: "Drop-Off", val: "31", prefix: "-", suffix: "%", fill: 31 },
    ],
  },
  {
    title: "Web Development Core",
    subtitle: "Holographic architecture with flowing code and neural APIs",
    bullets: ["API Connections", "Data Packet Streams", "Server Pulse Topology"],
    metrics: [
      { label: "Core Web Vitals", val: "98", fill: 98 },
      { label: "Release Velocity", val: "72", prefix: "+", suffix: "%", fill: 72 },
      { label: "Infra Stability", val: "99.99", suffix: "%", fill: 100 },
    ],
  },
  {
    title: "Product & Brand Design Hub",
    subtitle: "Identity engines, morphing marks, and typography systems",
    bullets: ["3D Product Forms", "Live Logo Morphing", "Type Grid Dynamics"],
    metrics: [
      { label: "Retention", val: "39", prefix: "+", suffix: "%", fill: 60 },
      { label: "Brand Recall", val: "58", prefix: "+", suffix: "%", fill: 58 },
      { label: "Ad Efficiency", val: "44", prefix: "+", suffix: "%", fill: 44 },
    ],
  },
  {
    title: "Innovation Labs",
    subtitle: "Experiment-driven prototyping with futuristic machinery",
    bullets: ["Robotic Build Pipelines", "Prototype Clouds", "Experimental Interfaces"],
    metrics: [
      { label: "MVP Cycle", val: "52", prefix: "-", suffix: "%", fill: 52 },
      { label: "Validation Rate", val: "61", prefix: "+", suffix: "%", fill: 61 },
      { label: "Scale Readiness", val: "88", suffix: "/100", fill: 88 },
    ],
  },
];

export default function ServicesPage() {
  const [activeService, setActiveService] = useState(0);

  return (
    <section className="reveal relative overflow-hidden px-5 py-20 md:px-8 lg:px-16 mt-16 md:mt-12 lg:mt-8 min-h-screen">
      <div className="absolute inset-0 hidden opacity-65 md:block">
        <SectionScene variant="services" />
      </div>
      
      {/* Dynamic Background Elements */}
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-electric-blue/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-neon-violet/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="mx-auto relative z-10 max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-3 text-xs tracking-[0.24em] text-electric-blue font-semibold">SERVICES · INTERACTIVE 3D MODULES</p>
          <h2 className="mb-12 text-3xl font-semibold text-white md:text-5xl max-w-3xl leading-tight">Command Systems for Engineered Growth</h2>
        </motion.div>
        
        <div className="grid gap-4 lg:grid-cols-5">
          {serviceModules.map((service, index) => (
            <motion.button
              suppressHydrationWarning
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
              key={service.title}
              type="button"
              onMouseEnter={() => setActiveService(index)}
              onFocus={() => setActiveService(index)}
              onClick={() => setActiveService(index)}
              className={`rounded-2xl p-5 text-left transition-all duration-300 ${
                activeService === index 
                ? "border border-electric-blue/45 bg-linear-to-br from-sky-400/35 via-blue-400/30 to-cyan-400/30 shadow-[0_0_34px_rgba(120,190,255,0.28)] backdrop-blur-md" 
                : "border border-white/18 bg-linear-to-br from-sky-400/18 via-blue-400/16 to-cyan-400/16 opacity-100 hover:border-sky-300/55 hover:from-sky-300/24 hover:via-blue-300/22 hover:to-cyan-300/22"
              }`}
            >
                <div className="h-10 w-10 mb-4 rounded-full border border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-center relative overflow-hidden group">
                  <span className={`w-3 h-3 rounded-full relative z-10 transition-all ${activeService === index ? "bg-electric-blue shadow-[0_0_10px_rgba(91,141,255,0.95)]" : "bg-white/30"}`} />
                {activeService === index && (
                     <span className="absolute inset-0 bg-linear-to-br from-electric-blue/20 via-neon-violet/20 to-cyber-teal/20 animate-pulse" />
                )}
              </div>
              <p className="text-[17.67px] font-semibold text-white">{service.title}</p>
              <p className="mt-2 text-[14.56px] text-[#AAB8D4] line-clamp-2 md:line-clamp-none">{service.subtitle}</p>
            </motion.button>
          ))}
        </div>

        <div className="mt-8 relative min-h-110">
        <AnimatePresence mode="wait">
          <motion.div
            key={serviceModules[activeService].title}
            initial={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="rounded-3xl border border-sky-300/45 bg-linear-to-br from-sky-400/22 via-blue-400/18 to-cyan-400/20 p-6 md:p-10 relative overflow-hidden shadow-[0_0_36px_rgba(120,190,255,0.24)] backdrop-blur-md"
          >
            {/* Inner ambient glow */}
            <div className="absolute top-0 right-0 w-full h-full bg-linear-to-bl from-sky-300/30 via-blue-300/18 to-transparent pointer-events-none" />

            <div className="grid gap-12 lg:grid-cols-12 relative z-10">
              <div className="lg:col-span-7">
                <h3 className="text-3xl md:text-4xl font-semibold text-white">{serviceModules[activeService].title}</h3>
                <p className="mt-4 text-lg text-[#C2D0E8] max-w-xl">{serviceModules[activeService].subtitle}</p>

                <div className="mt-10 grid gap-4 md:grid-cols-3">
                  {serviceModules[activeService].bullets.map((bullet, i) => (
                    <motion.div 
                      key={bullet} 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + (i * 0.1) }}
                        className="section-grid rounded-xl border border-sky-300/35 bg-linear-to-br from-sky-300/20 via-blue-300/18 to-cyan-300/18 p-5 text-sm text-[#E3F2FF] flex flex-col justify-center gap-3 hover:border-sky-300/60 transition-colors backdrop-blur-md"
                    >
                      <span className="text-electric-blue text-xs font-mono tracking-widest">0{i+1} //</span>
                      <span className="font-medium text-[13px]">{bullet}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-5 flex flex-col justify-center">
                <div className="space-y-6">
                  {serviceModules[activeService].metrics.map((metric, i) => (
                    <motion.div 
                      key={metric.label} 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + (i * 0.1) }}
                      className="rounded-2xl p-5 border border-sky-300/35 bg-linear-to-br from-sky-300/20 via-blue-300/16 to-cyan-300/18 relative overflow-hidden group backdrop-blur-md"
                    >
                      <div className="flex justify-between items-end mb-4">
                        <span className="text-sm font-medium text-[#AAB8D4] tracking-wide">{metric.label}</span>
                        <div className="text-right">
                          <span className="text-2xl font-bold text-white">
                            {metric.prefix}{metric.val}{metric.suffix}
                          </span>
                        </div>
                      </div>
                      
                      {/* Animated Progress Bar */}
                      <div className="h-2 w-full bg-sky-200/20 rounded-full overflow-hidden shadow-inner">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${metric.fill}%` }}
                          transition={{ duration: 1, delay: 0.5 + (i * 0.1), ease: "easeOut" }}
                          className="h-full bg-linear-to-r from-electric-blue to-cyber-teal rounded-full relative"
                        >
                          <div className="absolute inset-0 bg-white/20 w-full animate-[shimmer_2s_infinite]" />
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
