"use client";

import { useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionScene from "../../components/SectionScene";

const portfolioProjects = [
  {
    name: "Nova Commerce Grid",
    problem: "Fragmented customer acquisition and low conversion trajectories.",
    strategy: "Unified intelligence dashboard + full-funnel redesign.",
    execution: "AI insights engine, rapid experiments, and modular commerce stack.",
    results: "Revenue velocity +162% in 6 months.",
  },
  {
    name: "Helix SaaS Command",
    problem: "Complex product onboarding with weak activation depth.",
    strategy: "Behavioral UX architecture and contextual lifecycle messaging.",
    execution: "Connected product analytics, onboarding AI guides, and optimized flows.",
    results: "Activation uplift +71%, churn drop -29%.",
  },
  {
    name: "Quantum BrandOS",
    problem: "Inconsistent cross-channel brand expression and weak recall.",
    strategy: "Scalable identity system + creative operations automation.",
    execution: "Live design tokens, generative creative variants, performance feedback loop.",
    results: "Brand recall +57%, CAC efficiency +36%.",
  },
];

type PortfolioProject = (typeof portfolioProjects)[number];

function TiltCard({ children }: { children: ReactNode }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const onMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    const rotateY = (x - 0.5) * 12;
    const rotateX = -(y - 0.5) * 10;
    el.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  };

  const reset = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px)";
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className="transform-gpu transition-transform duration-200"
    >
      {children}
    </div>
  );
}

export default function WorkPage() {
  const [activeProjectIndex, setActiveProjectIndex] = useState<number | null>(null);

  const openProjectDrawer = (projectIndex: number) => {
    setActiveProjectIndex(projectIndex);
  };

  const closeProjectDrawer = () => {
    setActiveProjectIndex(null);
  };

  const activeProject: PortfolioProject | null = activeProjectIndex === null ? null : portfolioProjects[activeProjectIndex];

  return (
    <section className="reveal relative overflow-hidden px-5 py-20 md:px-8 lg:px-16 mt-16 md:mt-10 lg:mt-6">
      <div className="absolute inset-0 hidden opacity-65 md:block">
        <SectionScene variant="work" />
      </div>
      <div className="mx-auto relative z-10 max-w-7xl">
        <p className="text-xs tracking-[0.24em] text-neon-orange">PORTFOLIO · CASE TRAILERS</p>
        <h2 className="mt-3 text-3xl font-semibold text-white md:text-5xl">Cinematic Project Intelligence</h2>
        <div className="mt-8 grid gap-5 transition-all duration-500 lg:grid-cols-3">
          {portfolioProjects.map((project, index) => (
            <TiltCard key={project.name}>
              <button
                suppressHydrationWarning
                type="button"
                onClick={() => openProjectDrawer(index)}
                className="w-full text-left"
                aria-label={`Open case study: ${project.name}`}
              >
                <article
                  className={`glass holo-border rounded-2xl p-5 transition-all duration-300 ${
                    activeProjectIndex === index ? "ring-1 ring-neon-violet/70 shadow-[0_0_30px_rgba(229,9,20,0.26)]" : ""
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-semibold text-white">{project.name}</p>
                    <span className="text-[11px] tracking-[0.2em] text-electric-blue">OPEN</span>
                  </div>
                  <div className="mt-4 space-y-3 text-sm text-[#E3DDE4]">
                    <p><span className="font-semibold text-white">Problem:</span> {project.problem}</p>
                    <p><span className="font-semibold text-white">Strategy:</span> {project.strategy}</p>
                    <p><span className="font-semibold text-white">Execution:</span> {project.execution}</p>
                    <p><span className="font-semibold text-cyber-teal">Results:</span> {project.results}</p>
                  </div>
                </article>
              </button>
            </TiltCard>
          ))}
        </div>

        <AnimatePresence>
          {activeProject && (
            <motion.aside
              key={activeProject.name}
              initial={{ opacity: 0, y: 26, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.985 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="glass holo-border mt-6 rounded-3xl p-6 md:p-8"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs tracking-[0.24em] text-neon-orange">CASE TRAILER MODE</p>
                  <h3 className="mt-2 text-2xl font-semibold text-white md:text-3xl">{activeProject.name}</h3>
                </div>
                <button
                  suppressHydrationWarning
                  type="button"
                  onClick={closeProjectDrawer}
                  className="neon-btn rounded-lg px-4 py-2 text-xs font-semibold tracking-wide text-white"
                >
                  <span>Close Trailer</span>
                </button>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <div className="section-grid rounded-xl border border-white/10 p-4">
                  <p className="text-xs tracking-[0.18em] text-electric-blue">PROBLEM</p>
                  <p className="mt-2 text-sm text-[#F0E7EC]">{activeProject.problem}</p>
                </div>
                <div className="section-grid rounded-xl border border-white/10 p-4">
                  <p className="text-xs tracking-[0.18em] text-neon-violet">STRATEGY</p>
                  <p className="mt-2 text-sm text-[#F0E7EC]">{activeProject.strategy}</p>
                </div>
                <div className="section-grid rounded-xl border border-white/10 p-4">
                  <p className="text-xs tracking-[0.18em] text-neon-orange">EXECUTION</p>
                  <p className="mt-2 text-sm text-[#F0E7EC]">{activeProject.execution}</p>
                </div>
                <div className="section-grid rounded-xl border border-cyber-teal/40 p-4">
                  <p className="text-xs tracking-[0.18em] text-cyber-teal">RESULTS</p>
                  <p className="mt-2 text-sm text-[#F6F6F6]">{activeProject.results}</p>
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
