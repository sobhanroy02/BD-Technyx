"use client";

import { useMemo, useRef } from "react";
import SectionScene from "../../components/SectionScene";

export default function ContactPage() {
  const leadNameRef = useRef<HTMLInputElement>(null);
  const requestTypeRef = useRef<HTMLSelectElement>(null);

  const compareRows = useMemo(
    () => [
      { label: "Growth Intelligence", startup: "Standard", scale: "Advanced", enterprise: "Command AI" },
      { label: "Design System Ops", startup: "Tokens", scale: "Multi-Brand", enterprise: "Autonomous" },
      { label: "Engineering Pods", startup: "1 Squad", scale: "2 Squads", enterprise: "4+ Squads" },
      { label: "Reporting Layer", startup: "Weekly", scale: "Daily", enterprise: "Realtime" },
    ],
    [],
  );

  return (
    <section className="reveal relative overflow-hidden px-5 py-20 md:px-8 lg:px-16 mt-16 md:mt-10 lg:mt-6">
      <div className="absolute inset-0 hidden opacity-65 md:block">
        <SectionScene variant="conversion" />
      </div>
      <div className="mx-auto relative z-10 max-w-7xl">
        <p className="text-xs tracking-[0.24em] text-neon-violet">CONVERSION · BUSINESS MODULES</p>
        <h2 className="mt-3 text-3xl font-semibold text-white md:text-5xl">Launch Your Innovation Partnership</h2>

        <div className="mt-8 grid gap-6 lg:grid-cols-12">
          <form
            suppressHydrationWarning
            className="glass holo-border space-y-4 rounded-2xl p-6 transition-all duration-500 lg:col-span-7 ring-1 ring-electric-blue/60 shadow-[0_0_36px_rgba(229,9,20,0.26)]"
          >
            <p className="text-lg font-semibold text-white">Lead Capture & Collaboration Request</p>
            <div className="grid gap-4 md:grid-cols-2">
              <input suppressHydrationWarning ref={leadNameRef} className="rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-[#D1C8CC]" placeholder="Your Name" />
              <input suppressHydrationWarning className="rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-[#D1C8CC]" placeholder="Company" />
              <input suppressHydrationWarning className="rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-[#D1C8CC] md:col-span-2" placeholder="Email Address" />
              <select suppressHydrationWarning ref={requestTypeRef} className="rounded-xl border border-white/20 bg-[#15161d] px-4 py-3 text-sm text-white outline-none md:col-span-2">
                <option value="Startup Collaboration Request">Startup Collaboration Request</option>
                <option value="Service Consultation Booking">Service Consultation Booking</option>
                <option value="Product Engineering Sprint">Product Engineering Sprint</option>
                <option value="Marketing Intelligence Engagement">Marketing Intelligence Engagement</option>
              </select>
              <textarea suppressHydrationWarning className="rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-[#D1C8CC] md:col-span-2" rows={4} placeholder="Project vision, timeline, and objectives" />
            </div>
            <button suppressHydrationWarning type="button" className="neon-btn rounded-xl px-6 py-3 text-sm font-semibold text-white">
              <span>Activate Consultation Channel</span>
            </button>
          </form>

          <div className="space-y-6 lg:col-span-5">
            <div className="glass rounded-2xl p-5">
              <p className="mb-3 text-lg font-semibold text-white">Interactive Service Comparison</p>
              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-xs text-[#C4D6F5]">
                  <thead>
                    <tr className="text-[#EAF3FF]">
                      <th className="pb-2">System</th>
                      <th className="pb-2">Startup</th>
                      <th className="pb-2">Scale</th>
                      <th className="pb-2">Enterprise</th>
                    </tr>
                  </thead>
                  <tbody>
                    {compareRows.map((row) => (
                      <tr key={row.label} className="border-t border-white/10">
                        <td className="py-2 pr-3">{row.label}</td>
                        <td className="py-2 pr-3">{row.startup}</td>
                        <td className="py-2 pr-3">{row.scale}</td>
                        <td className="py-2">{row.enterprise}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="glass rounded-2xl p-5">
              <p className="mb-3 text-lg font-semibold text-white">Client Testimonials</p>
              <div className="space-y-3 text-sm text-[#BFD1EC]">
                <p>“BD TECHNYX transformed our growth engine into a measurable command system.” — Venture-backed SaaS CEO</p>
                <p>“Their design + engineering sync gave us a market-ready product in record time.” — Startup Founder</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
