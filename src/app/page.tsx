"use client";

import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import PricingModal from "@/components/PricingModal";

export default function Home() {
  const rootRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [showPricingModal, setShowPricingModal] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((element) => {
        gsap.fromTo(
          element,
          { autoAlpha: 0, y: 30 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
          },
        );
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const handleNavAction = (targetPath: string) => {
    router.push(`/${targetPath}`);
  };

  return (
    <div ref={rootRef} className="relative z-10 w-full h-full min-h-[calc(100vh-80px)] overflow-hidden">
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-gradient-to-b from-black via-slate-900 to-purple-900/40 pointer-events-none">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover object-[center_bottom] scale-105 opacity-60"
        >
          <source src="/hero-moon.mp4" type="video/mp4" />
        </video>
        {/* Soft overlay gradient to smooth the bottom to black and dim it slightly */}
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-purple-900/60 via-purple-900/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-purple-600/10" />
        
        {/* Floating animated elements like in the image */}
        <div className="absolute top-1/3 left-1/4 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute top-1/2 right-1/4 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl animate-float-slower" />
        <div className="absolute bottom-1/3 left-1/3 w-48 h-48 bg-indigo-500/5 rounded-full blur-3xl animate-float-slow" />
      </div>

      <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-5 pt-20 pb-32 text-center md:px-8 lg:px-16 pointer-events-none">
        
        <div className="reveal glass holo-border mb-6 inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-medium text-white shadow-[0_0_20px_rgba(255,255,255,0.05)] pointer-events-auto">
          <span className="h-2 w-2 rounded-full bg-[#cbfb45] shadow-[0_0_10px_#cbfb45]" />
          Introducing Money management website
        </div>

        <h1 className="reveal mx-auto max-w-4xl text-5xl font-semibold tracking-tight text-white md:text-7xl lg:text-[5.5rem] leading-[1.05]">
          Turn your big idea into a stunning website
        </h1>
        
        <p className="reveal mt-6 mx-auto max-w-2xl text-[15px] text-[#A3A3A3] md:text-lg leading-relaxed">
          Fintech is its potential to promote financial inclusion. In many parts of the world, 
          millions of people lack access to traditional banking services.
        </p>

        <div className="reveal mt-10 flex flex-wrap items-center justify-center gap-4 pointer-events-auto">
          <button
            suppressHydrationWarning
            className="flex items-center gap-2 rounded-full bg-[#cbfb45] px-8 py-3.5 text-sm font-semibold text-black transition-transform hover:scale-105"
            type="button"
            onClick={() => handleNavAction("contact")}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 12H20M20 12L14 6M20 12L14 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Get Started Now
          </button>
          
          <button
            suppressHydrationWarning
            className="rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-black transition-transform hover:scale-105"
            type="button"
            onClick={() => setShowPricingModal(true)}
          >
            View Pricing
          </button>
        </div>

        <PricingModal isOpen={showPricingModal} onClose={() => setShowPricingModal(false)} />
      </section>
    </div>
  );
}
