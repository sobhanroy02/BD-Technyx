"use client";

import SectionScene from "../../components/SectionScene";

export default function LabsPage() {
  return (
    <section className="reveal relative overflow-hidden section-grid px-5 py-20 md:px-8 lg:px-16 mt-16 md:mt-10 lg:mt-6">
      <div className="absolute inset-0 hidden opacity-60 md:block">
        <SectionScene variant="labs" />
      </div>
      <div className="mx-auto relative z-10 max-w-7xl rounded-3xl border border-white/10 bg-linear-to-br from-[#0d1327]/80 via-[#11183a]/75 to-[#0b1022]/75 p-6 md:p-10 ring-1 ring-electric-blue/50 shadow-[0_0_36px_rgba(91,141,255,0.22)] backdrop-blur-md">
        <p className="text-xs tracking-[0.24em] text-cyber-teal">BD TECHNYX LABS · SIGNATURE ZONE</p>
        <h2 className="mt-3 text-3xl font-semibold text-white md:text-5xl">Underground Innovation Lab Complex</h2>
        <p className="mt-4 max-w-3xl text-[#E3DDE3]">
          Startup collaboration zone, prototype building area, AI experiment lab, and a live product development pipeline running as
          holographic blueprints with scanning beams and pulsing grid floors.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            "Startup Collaboration Zone",
            "Prototype Building Area",
            "AI Experiment Lab",
            "Product Development Pipeline",
          ].map((item, index) => (
            <div key={item} className={`glass rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md ${index % 2 === 0 ? "float-slower" : "float-slow"}`}>
              <p className="text-sm text-white">{item}</p>
              <p className="mt-2 text-xs text-[#D8D1D9]">Live simulation streams · active scans · realtime build telemetry</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
