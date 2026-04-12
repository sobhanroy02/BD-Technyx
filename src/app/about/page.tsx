"use client";

import SectionScene from "../../components/SectionScene";
import { motion } from "framer-motion";

const dnaPillars = [
  {
    title: "Marketing Intelligence",
    description: "Data-driven campaigns powered by predictive analytics and constant A/B iteration.",
    icon: "📈"
  },
  {
    title: "Design Systems",
    description: "Scalable, token-based architectures ensuring pixel-perfect consistency across all digital touchpoints.",
    icon: "📐"
  },
  {
    title: "Product Engineering",
    description: "High-performance codebases architected for immense scale and extreme reliability.",
    icon: "⚙️"
  },
  {
    title: "Emerging Technologies",
    description: "Integrating LLMs, neural networks, and Web3 paradigms directly into core operations.",
    icon: "🔮"
  }
];

const stats = [
  { value: "100+", label: "Products Launched" },
  { value: "99.9%", label: "Uptime Guaranteed" },
  { value: "5", label: "Global Node Centers" },
  { value: "24/7", label: "System Intelligence" }
];

export default function AboutPage() {
  return (
    <section className="reveal relative overflow-hidden px-5 py-20 md:px-8 lg:px-16 mt-16 md:mt-10 lg:mt-6 pb-32 min-h-screen">
      <div className="absolute inset-0 hidden opacity-65 md:block">
        <SectionScene variant="about" />
      </div>

      <div className="absolute top-20 right-20 w-64 h-64 bg-neon-violet/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-electric-blue/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="mx-auto relative z-10 max-w-7xl">
        {/* Top Hero Layout */}
        <div className="grid gap-12 lg:grid-cols-12 mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6"
          >
            <p className="text-xs tracking-[0.24em] text-neon-violet font-semibold border-b border-neon-violet/30 inline-block pb-2 mb-6">ABOUT · NEURAL CORE</p>
            <h2 className="text-4xl font-semibold text-white md:text-6xl leading-[1.1]">
              Built for Visionary Startups and <br className="hidden md:block"/> Scalable Businesses
            </h2>
            <p className="mt-8 text-lg text-[#AAB8D4] leading-relaxed max-w-2xl">
              BD TECHNYX helps teams scale through extreme marketing intelligence, advanced architectural design systems, rapid product engineering, and cutting-edge emerging technologies. 
              <br/><br/>
              We don't just build software. We construct resilient digital ecosystems where strategy and aggressive experimentation ship together seamlessly.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-6 flex flex-col justify-center"
          >
            <div className="glass holo-border rounded-3xl p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-neon-violet/10 to-transparent pointer-events-none" />
              <p className="text-sm text-[#D9D1D7] mb-8 font-mono">SYSTEM_DIAGNOSTICS_ACTIVE</p>
              
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, idx) => (
                  <div key={stat.label} className="border border-white/10 bg-black/40 rounded-2xl p-5 hover:border-electric-blue/40 transition-colors">
                     <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-electric-blue to-neon-violet">{stat.value}</p>
                     <p className="text-xs text-[#AAB8D4] mt-2 uppercase tracking-wider">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* DNA Pillars Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-32"
        >
          <div className="text-center mb-16">
             <h3 className="text-3xl font-semibold text-white">Our Digital DNA</h3>
             <p className="text-[#AAB8D4] mt-4 max-w-2xl mx-auto">The fundamental building blocks injected into every platform we architect.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {dnaPillars.map((pillar, i) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                key={pillar.title}
                className="glass rounded-3xl p-6 border border-white/5 hover:border-white/20 hover:bg-white/5 transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-black/50 border border-white/10 flex items-center justify-center text-2xl mb-6 shadow-[0_0_15px_rgba(203,251,69,0.05)] group-hover:scale-110 transition-transform">
                  {pillar.icon}
                </div>
                <h4 className="text-lg font-semibold text-white mb-3 tracking-wide">{pillar.title}</h4>
                <p className="text-sm text-[#AAB8D4] leading-relaxed">
                  {pillar.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
