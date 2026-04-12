"use client";

import SectionScene from "../../components/SectionScene";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const timelineData = [
  {
    stage: "Concept",
    title: "Ideation & Strategy Mapping",
    description: "We dive deep into your vision, target audience, and market landscape to define a clear, executable roadmap and strategic positioning.",
    deliverables: ["Market Analysis", "User Personas", "Technical Architecture"],
    metric: "2-4 Weeks",
    icon: "💡"
  },
  {
    stage: "Design",
    title: "UI/UX & Brand Identity",
    description: "Crafting intuitive and stunning interfaces that reflect your brand's DNA while maximizing user engagement and conversion metrics.",
    deliverables: ["Wireframes", "Design System", "Interactive Prototypes"],
    metric: "3-6 Weeks",
    icon: "🎨"
  },
  {
    stage: "Development",
    title: "Engineering & Neural Core",
    description: "Building scalable, high-performance applications using cutting-edge technologies and modular architecture frameworks.",
    deliverables: ["Frontend Systems", "Backend API Integration", "Security Audits"],
    metric: "6-12 Weeks",
    icon: "⚙️"
  },
  {
    stage: "Launch",
    title: "Deployment & Market Entry",
    description: "Executing a flawless rollout with performance monitoring, scaling provisions, and initial marketing campaigns.",
    deliverables: ["Production Deployment", "QA Sign-off", "Launch Analytics"],
    metric: "1-2 Weeks",
    icon: "🚀"
  },
  {
    stage: "Growth",
    title: "Scaling & Continuous Iteration",
    description: "Analyzing user data, conducting A/B tests, and shipping new features to ensure continuous market dominance and user retention.",
    deliverables: ["Performance Reports", "Feature Updates", "Conversion Optimization"],
    metric: "Ongoing",
    icon: "📊"
  }
];

export default function TimelinePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="reveal relative overflow-hidden px-5 py-20 md:px-8 lg:px-16 mt-16 md:mt-10 lg:mt-6 pb-40">
      <div className="absolute inset-0 hidden opacity-65 md:block">
        <SectionScene variant="timeline" />
      </div>

      {/* Floating ambient elements for depth */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float-slow pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-float-slower pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-72 h-72 bg-cyber-teal/10 rounded-full blur-3xl animate-float-slow pointer-events-none" />

      <div className="mx-auto relative z-10 max-w-7xl">
        <div className="text-center md:text-left mb-20">
          <p className="text-xs tracking-[0.24em] text-electric-blue">INNOVATION TIMELINE</p>
          <h2 className="mt-3 text-3xl font-semibold text-white md:text-6xl">From Concept to <br className="hidden md:block" /> Market Dominance</h2>
          <p className="mt-6 text-[#AAB8D4] max-w-2xl text-lg relative">
            Our established pipeline ensures speed without sacrificing quality. Watch how your idea transforms into an engineering powerhouse.
          </p>
        </div>

        {/* Timeline Container */}
        <div ref={containerRef} className="relative mt-20 md:mt-32 max-w-5xl mx-auto">
          {/* Center Scroll Line for Desktop / Left Line for Mobile */}
          <div className="absolute left-[36px] md:left-1/2 top-0 bottom-0 w-1 bg-white/10 -translate-x-1/2 rounded-full overflow-hidden">
            <motion.div 
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-electric-blue via-neon-violet to-cyber-teal"
              style={{ height: lineHeight }}
            />
          </div>

          <div className="flex flex-col gap-12 md:gap-24">
            {timelineData.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={item.stage} className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-16 ${isEven ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  
                  {/* Timeline Glowing Dot */}
                  <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5 }}
                    className="absolute left-[36px] md:left-1/2 w-10 h-10 -translate-x-1/2 rounded-full border border-white/20 bg-[#070910] flex items-center justify-center z-10 shadow-[0_0_20px_rgba(203,251,69,0.3)]"
                  >
                    <span className="w-4 h-4 rounded-full bg-electric-blue shadow-[0_0_10px_rgba(203,251,69,0.8)]" />
                  </motion.div>

                  {/* Icon & Label Segment */}
                  <motion.div 
                    initial={{ opacity: 0, x: isEven ? -50 : 50, y: 20 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className={`w-full md:w-1/2 flex pl-20 md:pl-0 ${isEven ? "md:justify-end" : "md:justify-start"}`}
                  >
                    <div className="flex flex-col items-start md:items-center text-left md:text-center">
                      <div className="w-24 h-24 rounded-2xl glass holo-border flex items-center justify-center text-5xl mb-4 shadow-[0_0_30px_rgba(203,251,69,0.1)] group hover:scale-110 transition-transform duration-500">
                        <span className="group-hover:animate-pulse">{item.icon}</span>
                      </div>
                      <h3 className="text-2xl font-bold text-white tracking-wide">{item.stage}</h3>
                      <p className="text-electric-blue font-mono text-sm mt-2 font-semibold bg-electric-blue/10 px-4 py-1 rounded-full">{item.metric}</p>
                    </div>
                  </motion.div>

                  {/* Deep Content Box Segment */}
                  <motion.div 
                    initial={{ opacity: 0, x: isEven ? 50 : -50, y: 30 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                    className="w-full md:w-1/2 pl-20 md:pl-0"
                  >
                    <div className="glass rounded-3xl p-6 md:p-8 hover:holo-border transition-all duration-300 relative group overflow-hidden border border-white/5">
                      <div className="absolute inset-0 bg-gradient-to-br from-electric-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                      
                      <h4 className="text-xl md:text-2xl font-semibold text-white mb-4 relative z-10">{item.title}</h4>
                      <p className="text-[#AAB8D4] leading-relaxed mb-6 text-sm md:text-base relative z-10">{item.description}</p>
                      
                      <div className="space-y-3 relative z-10">
                        <p className="text-xs uppercase tracking-widest text-[#D0DEFA] font-semibold border-b border-white/10 pb-2 mb-3">Key Deliverables</p>
                        {item.deliverables.map((del, i) => (
                          <div key={i} className="flex items-center gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyber-teal flex-shrink-0 shadow-[0_0_8px_rgba(30,215,96,0.8)]" />
                            <span className="text-sm text-[#E2DEE5]">{del}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
