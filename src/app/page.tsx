"use client";

import CityScene from "../components/CityScene";
import SectionScene from "../components/SectionScene";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { type ReactNode, type RefObject, useEffect, useMemo, useRef, useState } from "react";

type ServiceModule = {
  title: string;
  subtitle: string;
  bullets: string[];
  metricA: string;
  metricB: string;
  metricC: string;
};

const serviceModules: ServiceModule[] = [
  {
    title: "Marketing Command Center",
    subtitle: "Rotating global campaign intelligence and growth vectors",
    bullets: ["3D Globe View", "Campaign Data Lines", "Live Growth Charts"],
    metricA: "Traffic Growth +218%",
    metricB: "Conversion Boost +63%",
    metricC: "Brand Reach x4.2",
  },
  {
    title: "UI/UX Design Studio",
    subtitle: "Adaptive wireframes and interface modules assembling in the air",
    bullets: ["Floating Wireframes", "Auto Grid Systems", "Design Tokens in Motion"],
    metricA: "Prototype Speed 3.4x",
    metricB: "UX Score +47%",
    metricC: "Drop-Off -31%",
  },
  {
    title: "Web Development Core",
    subtitle: "Holographic architecture with flowing code and neural APIs",
    bullets: ["API Connections", "Data Packet Streams", "Server Pulse Topology"],
    metricA: "Core Web Vitals 98",
    metricB: "Release Velocity +72%",
    metricC: "Infra Stability 99.99%",
  },
  {
    title: "Product & Brand Design Hub",
    subtitle: "Identity engines, morphing marks, and typography systems",
    bullets: ["3D Product Forms", "Live Logo Morphing", "Type Grid Dynamics"],
    metricA: "Retention +39%",
    metricB: "Brand Recall +58%",
    metricC: "Ad Efficiency +44%",
  },
  {
    title: "Innovation Labs",
    subtitle: "Experiment-driven prototyping with futuristic machinery",
    bullets: ["Robotic Build Pipelines", "Prototype Clouds", "Experimental Interfaces"],
    metricA: "MVP Cycle -52%",
    metricB: "Validation Rate +61%",
    metricC: "Scale Readiness +73%",
  },
];

const timelineData = ["Concept", "Design", "Development", "Launch", "Growth"];

const bootLines = [
  "Initializing BD TECHNYX Systems…",
  "Loading Innovation Modules…",
  "Activating Digital Infrastructure…",
];

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

type NavTarget = "home" | "services" | "labs" | "work" | "about" | "timeline" | "contact";

type ChatMessage = {
  id: number;
  role: "user" | "reo";
  text: string;
};

const reoQuickQueries = [
  "What services do you offer?",
  "How do I start collaboration?",
  "Show me labs details",
  "How fast is delivery?",
];

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

export default function Home() {
  const rootRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLElement>(null);
  const conversionRef = useRef<HTMLElement>(null);
  const labsRef = useRef<HTMLElement>(null);
  const portfolioRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLElement>(null);
  const leadNameRef = useRef<HTMLInputElement>(null);
  const requestTypeRef = useRef<HTMLSelectElement>(null);
  const [activeService, setActiveService] = useState(0);
  const [bootIndex, setBootIndex] = useState(0);
  const [isBooting, setBooting] = useState(true);
  const [activeFocusSection, setActiveFocusSection] = useState<"labs" | "portfolio" | "conversion" | null>(null);
  const [ctaFeedback, setCtaFeedback] = useState<string>("Select a command to navigate the headquarters.");
  const [activeProjectIndex, setActiveProjectIndex] = useState<number | null>(null);
  const [isSkyscraperPanelOpen, setSkyscraperPanelOpen] = useState(false);
  const [isAiConsoleOpen, setAiConsoleOpen] = useState(false);
  const [hudMetrics, setHudMetrics] = useState({ sync: 96, load: 72, signal: 99 });
  const [isReoOpen, setReoOpen] = useState(false);
  const [isReoTyping, setReoTyping] = useState(false);
  const [isReoBotGreeting, setReoBotGreeting] = useState(false);
  const [reoInput, setReoInput] = useState("");
  const [reoMessages, setReoMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      role: "reo",
      text: "Hi, I am Reo. I can help with services, labs, case studies, and collaboration booking.",
    },
  ]);
  const reoGreetingTimeouts = useRef<number[]>([]);

  const compareRows = useMemo(
    () => [
      { label: "Growth Intelligence", startup: "Standard", scale: "Advanced", enterprise: "Command AI" },
      { label: "Design System Ops", startup: "Tokens", scale: "Multi-Brand", enterprise: "Autonomous" },
      { label: "Engineering Pods", startup: "1 Squad", scale: "2 Squads", enterprise: "4+ Squads" },
      { label: "Reporting Layer", startup: "Weekly", scale: "Daily", enterprise: "Realtime" },
    ],
    [],
  );

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      document.documentElement.style.setProperty("--cursor-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--cursor-y", `${event.clientY}px`);
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setBootIndex((prev) => {
        if (prev >= bootLines.length - 1) {
          window.setTimeout(() => setBooting(false), 220);
          window.clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 420);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((element) => {
        gsap.fromTo(
          element,
          { autoAlpha: 0, y: 70 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 85%",
            },
          },
        );
      });

      gsap.to(".parallax-layer", {
        yPercent: -12,
        ease: "none",
        scrollTrigger: {
          trigger: "#main-site",
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!activeFocusSection) return;

    const timer = window.setTimeout(() => setActiveFocusSection(null), 2200);
    return () => window.clearTimeout(timer);
  }, [activeFocusSection]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setHudMetrics(() => ({
        sync: 94 + Math.floor(Math.abs(Math.sin(Date.now() * 0.001)) * 6),
        load: 64 + Math.floor(Math.abs(Math.cos(Date.now() * 0.0012)) * 26),
        signal: 95 + Math.floor(Math.abs(Math.sin(Date.now() * 0.0015)) * 5),
      }));
    }, 1200);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    return () => {
      reoGreetingTimeouts.current.forEach((id) => window.clearTimeout(id));
      reoGreetingTimeouts.current = [];
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setAiConsoleOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const scrollToBlock = (sectionRef: RefObject<HTMLElement | null>) => {
    if (!sectionRef.current) return;

    const yOffset = 56;
    const y = sectionRef.current.getBoundingClientRect().top + window.scrollY - yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const handleBuildWithUs = () => {
    setCtaFeedback("Consultation channel primed. Share your goals and timeline.");
    setActiveFocusSection("conversion");
    scrollToBlock(conversionRef);
    window.setTimeout(() => {
      requestTypeRef.current?.focus();
      if (requestTypeRef.current) {
        requestTypeRef.current.value = "Startup Collaboration Request";
      }
      leadNameRef.current?.focus();
    }, 500);
  };

  const handleExploreLabs = () => {
    setCtaFeedback("Innovation Labs activated. Signature zone is now in focus.");
    setActiveFocusSection("labs");
    setActiveService(4);
    scrollToBlock(labsRef);
  };

  const handleViewOurWork = () => {
    setCtaFeedback("Portfolio module open. Browse cinematic case intelligence.");
    setActiveFocusSection("portfolio");
    scrollToBlock(portfolioRef);
    window.setTimeout(() => {
      setActiveProjectIndex(0);
    }, 420);
  };

  const handleNavAction = (target: NavTarget) => {
    if (target === "home") {
      scrollToBlock(heroRef);
      return;
    }

    if (target === "services") {
      setActiveService(0);
      scrollToBlock(servicesRef);
      return;
    }

    if (target === "labs") {
      handleExploreLabs();
      return;
    }

    if (target === "work") {
      handleViewOurWork();
      return;
    }

    if (target === "about") {
      scrollToBlock(aboutRef);
      return;
    }

    if (target === "timeline") {
      scrollToBlock(timelineRef);
      return;
    }

    handleBuildWithUs();
  };

  const handleConsoleAction = (target: NavTarget) => {
    handleNavAction(target);
    setAiConsoleOpen(false);
  };

  const handleReoFabClick = () => {
    if (isReoOpen) {
      setReoOpen(false);
      return;
    }

    setReoBotGreeting(true);
    const openId = window.setTimeout(() => setReoOpen(true), 750);
    const hideId = window.setTimeout(() => setReoBotGreeting(false), 1450);
    reoGreetingTimeouts.current.push(openId, hideId);
  };

  const handleOpenSkyscraperPanel = () => {
    setSkyscraperPanelOpen(true);
    setCtaFeedback("Skyscraper command deck opened. Select a module to continue.");
  };

  const handleCloseSkyscraperPanel = () => {
    setSkyscraperPanelOpen(false);
  };

  const openProjectDrawer = (projectIndex: number) => {
    setActiveFocusSection("portfolio");
    setActiveProjectIndex(projectIndex);
  };

  const closeProjectDrawer = () => {
    setActiveProjectIndex(null);
  };

  const generateReoReply = (query: string) => {
    const normalized = query.toLowerCase();

    if (normalized.includes("service")) {
      return "We offer Marketing Command Center, UI/UX Studio, Web Development Core, Product & Brand Hub, and Innovation Labs.";
    }

    if (normalized.includes("lab")) {
      return "Our BD TECHNYX Labs include startup collaboration, prototype building, AI experiments, and live product simulation pipelines.";
    }

    if (normalized.includes("price") || normalized.includes("cost") || normalized.includes("budget")) {
      return "Project pricing is modular based on scope, team model, and timeline. Use Build With Us and we will share a tailored plan.";
    }

    if (normalized.includes("time") || normalized.includes("delivery") || normalized.includes("launch")) {
      return "Most MVP launches happen in 4-8 weeks, while growth-engineering programs run in phased 12-week cycles.";
    }

    if (normalized.includes("work") || normalized.includes("case")) {
      return "Open the View Our Work section to explore cinematic case studies with problem, strategy, execution, and results.";
    }

    return "I can help with services, labs, project timelines, collaboration, and case studies. Ask me anything and I will guide you.";
  };

  const sendMessageToReo = async (message: string) => {
    const cleaned = message.trim();
    if (!cleaned) return;

    const nextMessages = [...reoMessages, { id: reoMessages.length + 1, role: "user" as const, text: cleaned }];
    setReoMessages(nextMessages);
    setReoInput("");
    setReoTyping(true);

    try {
      const response = await fetch("/api/reo-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: cleaned,
          history: nextMessages.slice(-8).map((item) => ({ role: item.role, text: item.text })),
        }),
      });

      if (!response.ok) {
        throw new Error(`reo_api_${response.status}`);
      }

      const data = (await response.json()) as { reply?: string };
      const reply = data.reply?.trim() || generateReoReply(cleaned);

      setReoMessages((prev) => [...prev, { id: prev.length + 1, role: "reo", text: reply }]);
    } catch {
      const fallbackReply = generateReoReply(cleaned);
      setReoMessages((prev) => [...prev, { id: prev.length + 1, role: "reo", text: fallbackReply }]);
    } finally {
      setReoTyping(false);
    }
  };

  const activeProject: PortfolioProject | null = activeProjectIndex === null ? null : portfolioProjects[activeProjectIndex];

  return (
    <div ref={rootRef} className="relative bg-background text-foreground">
      <div className="cursor-aura" />

      {isBooting && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A0C13]"
        >
          <div className="glass holo-border mx-6 w-full max-w-2xl rounded-2xl p-6 md:p-8">
            <p className="mb-4 text-xs font-semibold tracking-[0.26em] text-electric-blue">SYSTEM BOOT INTERFACE</p>
            <h2 className="mb-5 text-2xl font-semibold text-white md:text-3xl">BD TECHNYX Control Matrix</h2>
            <div className="space-y-3">
              {bootLines.map((line, index) => (
                <p
                  key={line}
                  className={`text-sm md:text-base ${index <= bootIndex ? "text-[#D7E8FF]" : "text-[#4F5D79]"}`}
                >
                  {index <= bootIndex ? "[ACTIVE]" : "[WAIT]"} {line}
                </p>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      <main id="main-site" className="relative isolate overflow-hidden">
        <nav className="fixed left-0 right-0 top-0 z-40 px-4 pt-4 md:px-8 lg:px-14">
          <div className="glass mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-3 rounded-2xl px-4 py-3">
            <button
              suppressHydrationWarning
              type="button"
              onClick={() => handleNavAction("home")}
              className="text-sm font-semibold tracking-[0.18em] text-white"
            >
              BD TECHNYX
            </button>

            <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm">
              <button suppressHydrationWarning type="button" className="neon-btn rounded-lg px-3 py-2 text-white" onClick={() => handleNavAction("services")}><span>Services</span></button>
              <button suppressHydrationWarning type="button" className="neon-btn rounded-lg px-3 py-2 text-white" onClick={() => handleNavAction("labs")}><span>Labs</span></button>
              <button suppressHydrationWarning type="button" className="neon-btn rounded-lg px-3 py-2 text-white" onClick={() => handleNavAction("work")}><span>Work</span></button>
              <button suppressHydrationWarning type="button" className="neon-btn rounded-lg px-3 py-2 text-white" onClick={() => handleNavAction("about")}><span>About</span></button>
              <button suppressHydrationWarning type="button" className="neon-btn rounded-lg px-3 py-2 text-white" onClick={() => handleNavAction("timeline")}><span>Timeline</span></button>
              <button suppressHydrationWarning type="button" className="neon-btn rounded-lg px-3 py-2 text-white" onClick={() => handleNavAction("contact")}><span>Build With Us</span></button>
              <button suppressHydrationWarning type="button" className="neon-btn rounded-lg px-3 py-2 text-white" onClick={() => setAiConsoleOpen(true)}><span>AI Console</span></button>
              <button suppressHydrationWarning type="button" className="neon-btn rounded-lg px-3 py-2 text-white" onClick={() => setReoOpen(true)}><span>Talk to Reo</span></button>
            </div>
          </div>
        </nav>

        <aside className="fixed right-4 top-24 z-40 hidden w-52 rounded-2xl border border-white/15 bg-[#0C1222]/75 p-4 backdrop-blur-md md:block">
          <p className="text-[11px] tracking-[0.2em] text-electric-blue">LIVE NEURAL HUD</p>
          <div className="mt-3 space-y-2 text-xs text-[#CFE2FF]">
            <p>SYNC: {hudMetrics.sync}%</p>
            <p>SYSTEM LOAD: {hudMetrics.load}%</p>
            <p>SIGNAL: {hudMetrics.signal}%</p>
          </div>
          <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
            <div className="h-full rounded-full bg-linear-to-r from-electric-blue via-neon-violet to-cyber-teal transition-all duration-500" style={{ width: `${hudMetrics.signal}%` }} />
          </div>
        </aside>

        <div className="ambient-orb -left-24 top-32 bg-electric-blue/50 parallax-layer" />
        <div className="ambient-orb -right-20 top-88 bg-neon-violet/45 parallax-layer" />
        <div className="hero-beam left-[10%] top-20 h-152 w-10" />
        <div className="hero-beam right-[12%] top-24 h-136 w-8" />

        <section ref={heroRef} className="relative min-h-screen overflow-hidden px-5 pb-16 pt-32 md:px-8 lg:px-16">
          <div className="absolute inset-0 hidden md:block">
            <CityScene />
          </div>
          <div className="absolute inset-0 md:hidden">
            <div className="h-full w-full bg-[radial-gradient(circle_at_20%_20%,rgba(58,168,255,0.25),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(123,92,255,0.3),transparent_45%),linear-gradient(170deg,#0f1117,#151A2E_65%,#0e162b)]" />
          </div>

          <div className="relative z-10 mx-auto grid max-w-7xl gap-8 pt-6 md:pt-12 lg:grid-cols-12">
            <div className="reveal lg:col-span-7">
              <div className="glass holo-border inline-flex items-center gap-3 rounded-full px-4 py-2 text-xs tracking-[0.22em] text-[#B9C9E8]">
                <span className="h-2 w-2 rounded-full bg-cyber-teal pulse-ring" />
                BD TECHNYX · DIGITAL INNOVATION BASE
              </div>

              <h1 className="glitch neon-text mt-7 text-4xl font-semibold leading-tight text-white md:text-6xl" data-text="Engineering Digital Dominance">
                Engineering Digital Dominance
              </h1>
              <p className="mt-5 max-w-2xl text-base text-[#C4D2EA] md:text-lg">
                Building the digital infrastructure of tomorrow inside a cinematic headquarters where technology, growth,
                and intelligence converge.
              </p>

              <div className="mt-5 grid max-w-2xl grid-cols-2 gap-3 text-xs md:grid-cols-4">
                {[
                  "AI Strategy Matrix Online",
                  "Realtime Command Telemetry",
                  "Neural Growth Engine Active",
                  "Cyber Design System Synced",
                ].map((stat) => (
                  <div key={stat} className="glass rounded-xl p-3 text-[#CFE3FF]">
                    {stat}
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  suppressHydrationWarning
                  className="neon-btn rounded-xl px-5 py-3 text-sm font-semibold tracking-wide text-white"
                  type="button"
                  onClick={handleBuildWithUs}
                >
                  <span>Build With Us</span>
                </button>
                <button
                  suppressHydrationWarning
                  className="neon-btn rounded-xl px-5 py-3 text-sm font-semibold tracking-wide text-white"
                  type="button"
                  onClick={handleExploreLabs}
                >
                  <span>Explore Our Labs</span>
                </button>
                <button
                  suppressHydrationWarning
                  className="neon-btn rounded-xl px-5 py-3 text-sm font-semibold tracking-wide text-white"
                  type="button"
                  onClick={handleViewOurWork}
                >
                  <span>View Our Work</span>
                </button>
              </div>

              <p className="mt-3 text-sm text-[#9FC0EF]">{ctaFeedback}</p>

              <div className="mt-8 grid max-w-2xl grid-cols-2 gap-3 text-xs md:grid-cols-4">
                {[
                  "Holographic Data Screens",
                  "Neural Marketing Systems",
                  "Product Engineering Pods",
                  "Experimental AI Labs",
                ].map((item) => (
                  <div key={item} className="glass rounded-xl p-3 text-[#BCD1F1]">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="reveal float-slow lg:col-span-5">
              <div className="glass holo-border rounded-2xl p-5">
                <p className="text-xs tracking-[0.24em] text-electric-blue">VIRTUAL SKYSCRAPER NODE</p>
                <h3 className="mt-3 text-2xl font-semibold text-white">BD TECHNYX</h3>
                <p className="mb-6 text-sm text-[#C2CFE8]">Digital Innovation Base</p>

                <div className="section-grid rounded-xl border border-white/10 p-4">
                  <div className="grid gap-3 text-sm md:grid-cols-2">
                    <div className="glass rounded-lg p-3">Marketing analytics dashboard online</div>
                    <div className="glass rounded-lg p-3">UI wireframe assembly active</div>
                    <div className="glass rounded-lg p-3">Brand growth chart synchronized</div>
                    <div className="glass rounded-lg p-3">Code visualization stream live</div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between gap-3">
                  <p className="text-xs text-[#AFC7EA]">Status: Command Deck Ready</p>
                  <button
                    suppressHydrationWarning
                    type="button"
                    onClick={handleOpenSkyscraperPanel}
                    className="neon-btn rounded-lg px-4 py-2 text-xs font-semibold tracking-[0.14em] text-white"
                  >
                    <span>Open Node Window</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <AnimatePresence>
          {isSkyscraperPanelOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-[#070B13]/70 px-4 backdrop-blur-sm"
            >
              <motion.div
                initial={{ opacity: 0, y: 24, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 14, scale: 0.98 }}
                transition={{ duration: 0.26, ease: "easeOut" }}
                className="glass holo-border w-full max-w-3xl rounded-3xl p-6 md:p-8"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-xs tracking-[0.22em] text-electric-blue">VIRTUAL SKYSCRAPER NODE WINDOW</p>
                    <h4 className="mt-2 text-2xl font-semibold text-white">BD TECHNYX Command Deck</h4>
                    <p className="mt-2 text-sm text-[#BCD1EE]">Live control room for growth intelligence, design operations, and engineering deployment.</p>
                  </div>
                  <button
                    suppressHydrationWarning
                    type="button"
                    onClick={handleCloseSkyscraperPanel}
                    className="neon-btn rounded-lg px-4 py-2 text-xs font-semibold tracking-wide text-white"
                  >
                    <span>Close Window</span>
                  </button>
                </div>

                <div className="mt-6 grid gap-3 md:grid-cols-3">
                  <div className="section-grid rounded-xl border border-white/10 p-4">
                    <p className="text-xs tracking-[0.18em] text-cyber-teal">NODE LOAD</p>
                    <p className="mt-2 text-sm text-[#E3F8FF]">84% Active Systems</p>
                  </div>
                  <div className="section-grid rounded-xl border border-white/10 p-4">
                    <p className="text-xs tracking-[0.18em] text-neon-violet">LIVE MODULES</p>
                    <p className="mt-2 text-sm text-[#E3F8FF]">21 synchronized pipelines</p>
                  </div>
                  <div className="section-grid rounded-xl border border-white/10 p-4">
                    <p className="text-xs tracking-[0.18em] text-neon-orange">GLOBAL SIGNAL</p>
                    <p className="mt-2 text-sm text-[#E3F8FF]">Latency 12ms · stable</p>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div className="glass rounded-xl p-4 text-sm text-[#C8DBF9]">
                    <p className="mb-2 font-semibold text-white">Operational Streams</p>
                    <p>Marketing intelligence dashboards running with realtime growth vectors and campaign telemetry.</p>
                  </div>
                  <div className="glass rounded-xl p-4 text-sm text-[#C8DBF9]">
                    <p className="mb-2 font-semibold text-white">Engineering Streams</p>
                    <p>Code topology, API health checks, and deployment channels synchronized across product squads.</p>
                  </div>
                </div>

                <div className="mt-7 flex flex-wrap gap-3">
                  <button suppressHydrationWarning type="button" onClick={() => { handleCloseSkyscraperPanel(); handleNavAction("services"); }} className="neon-btn rounded-lg px-4 py-2 text-xs font-semibold text-white">
                    <span>Open Services Deck</span>
                  </button>
                  <button suppressHydrationWarning type="button" onClick={() => { handleCloseSkyscraperPanel(); handleNavAction("labs"); }} className="neon-btn rounded-lg px-4 py-2 text-xs font-semibold text-white">
                    <span>Enter Labs Zone</span>
                  </button>
                  <button suppressHydrationWarning type="button" onClick={() => { handleCloseSkyscraperPanel(); handleNavAction("work"); }} className="neon-btn rounded-lg px-4 py-2 text-xs font-semibold text-white">
                    <span>View Case Deck</span>
                  </button>
                  <button suppressHydrationWarning type="button" onClick={() => { handleCloseSkyscraperPanel(); handleNavAction("contact"); }} className="neon-btn rounded-lg px-4 py-2 text-xs font-semibold text-white">
                    <span>Start Collaboration</span>
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isAiConsoleOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-[#05070D]/80 px-4 backdrop-blur-sm"
            >
              <motion.div
                initial={{ opacity: 0, y: 18, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.98 }}
                className="glass holo-border w-full max-w-2xl rounded-3xl p-6 md:p-8"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs tracking-[0.22em] text-electric-blue">AI COMMAND CONSOLE</p>
                    <h4 className="mt-2 text-2xl font-semibold text-white">BD TECHNYX Neural Command Layer</h4>
                    <p className="mt-1 text-sm text-[#BFD3F4]">Use quick commands or press Ctrl/Cmd + K anytime.</p>
                  </div>
                  <button
                    suppressHydrationWarning
                    type="button"
                    onClick={() => setAiConsoleOpen(false)}
                    className="neon-btn rounded-lg px-4 py-2 text-xs font-semibold text-white"
                  >
                    <span>Close</span>
                  </button>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <button suppressHydrationWarning type="button" onClick={() => handleConsoleAction("services")} className="neon-btn rounded-xl px-4 py-3 text-left text-sm text-white"><span>Open Services Matrix</span></button>
                  <button suppressHydrationWarning type="button" onClick={() => handleConsoleAction("labs")} className="neon-btn rounded-xl px-4 py-3 text-left text-sm text-white"><span>Enter Labs Node</span></button>
                  <button suppressHydrationWarning type="button" onClick={() => handleConsoleAction("work")} className="neon-btn rounded-xl px-4 py-3 text-left text-sm text-white"><span>View Work Intelligence</span></button>
                  <button suppressHydrationWarning type="button" onClick={() => { setAiConsoleOpen(false); setReoOpen(true); }} className="neon-btn rounded-xl px-4 py-3 text-left text-sm text-white"><span>Talk to Reo Assistant</span></button>
                  <button suppressHydrationWarning type="button" onClick={() => handleConsoleAction("timeline")} className="neon-btn rounded-xl px-4 py-3 text-left text-sm text-white"><span>Open Timeline Flow</span></button>
                  <button suppressHydrationWarning type="button" onClick={() => handleConsoleAction("contact")} className="neon-btn rounded-xl px-4 py-3 text-left text-sm text-white"><span>Start Collaboration</span></button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          suppressHydrationWarning
          type="button"
          onClick={handleReoFabClick}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.96 }}
          className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-linear-to-br from-electric-blue via-neon-violet to-cyber-teal shadow-[0_0_30px_rgba(58,168,255,0.4)] ring-2 ring-white/15"
          aria-label={isReoOpen ? "Close Reo chat" : "Open Reo chat"}
        >
          <span className="text-[11px] font-semibold tracking-[0.2em] text-white">{isReoOpen ? "×" : "REO"}</span>
          <span className="absolute inset-0 rounded-full border border-white/30 animate-ping opacity-30" aria-hidden />
        </motion.button>

        <AnimatePresence>
          {isReoBotGreeting && !isReoOpen && (
            <motion.div
              initial={{ opacity: 0, y: 22, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.95 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="glass holo-border fixed bottom-24 right-5 z-50 w-60 rounded-3xl p-4"
            >
              <div className="flex items-start gap-3">
                <div className="relative h-14 w-14 rounded-2xl bg-linear-to-br from-electric-blue via-neon-violet to-cyber-teal p-2 shadow-[0_0_26px_rgba(58,168,255,0.35)]">
                  <div className="flex h-full w-full items-center justify-center rounded-xl bg-[#0c1324]">
                    <div className="relative h-10 w-10 rounded-full bg-white/90">
                      <div className="absolute -top-2 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-electric-blue shadow-[0_0_10px_rgba(58,168,255,0.8)]" />
                      <div className="absolute inset-x-2 top-3 flex justify-between">
                        <span className="h-2 w-2 rounded-full bg-[#0f182b]" />
                        <span className="h-2 w-2 rounded-full bg-[#0f182b]" />
                      </div>
                      <div className="absolute left-1/2 top-6 h-2 w-6 -translate-x-1/2 rounded-full bg-[#d9e6ff]" />
                      <div className="reo-hand absolute -right-3 top-3 h-8 w-3 rounded-full bg-white/90" />
                    </div>
                  </div>
                </div>
                <div className="space-y-1 text-sm text-[#d4e5ff]">
                  <p className="text-xs tracking-[0.2em] text-cyber-teal">REO IS HERE</p>
                  <p>Hey! I am Reo. Waving in and booting the chat...</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isReoOpen && (
            <motion.aside
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 14, scale: 0.98 }}
              className="glass holo-border fixed bottom-20 right-5 z-50 w-88 rounded-3xl p-4 md:w-96"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs tracking-[0.2em] text-cyber-teal">LIVE ASSISTANT</p>
                  <h4 className="text-lg font-semibold text-white">Reo</h4>
                </div>
                <button
                  suppressHydrationWarning
                  type="button"
                  onClick={() => setReoOpen(false)}
                  className="neon-btn rounded-lg px-3 py-1 text-xs text-white"
                >
                  <span>Close</span>
                </button>
              </div>

              <div className="mt-3 max-h-56 space-y-2 overflow-y-auto pr-1 text-sm">
                {reoMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`rounded-xl p-3 ${message.role === "reo" ? "bg-white/8 text-[#D6E8FF]" : "bg-electric-blue/20 text-white"}`}
                  >
                    <p className="mb-1 text-[10px] tracking-[0.14em] text-[#9ABCE8]">{message.role === "reo" ? "REO" : "YOU"}</p>
                    <p>{message.text}</p>
                  </div>
                ))}
                {isReoTyping && (
                  <div className="rounded-xl bg-white/8 p-3 text-sm text-[#CDE2FF]">Reo is analyzing your query...</div>
                )}
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {reoQuickQueries.map((query) => (
                  <button
                    suppressHydrationWarning
                    key={query}
                    type="button"
                    onClick={() => sendMessageToReo(query)}
                    className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] text-[#D2E6FF] transition hover:border-cyber-teal"
                  >
                    {query}
                  </button>
                ))}
              </div>

              <div className="mt-4 flex gap-2">
                <input
                  value={reoInput}
                  onChange={(event) => setReoInput(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      sendMessageToReo(reoInput);
                    }
                  }}
                  className="w-full rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm text-white outline-none placeholder:text-[#88A8D0]"
                  placeholder="Ask Reo anything..."
                />
                <button
                  suppressHydrationWarning
                  type="button"
                  onClick={() => sendMessageToReo(reoInput)}
                  className="neon-btn rounded-xl px-4 py-2 text-sm text-white"
                >
                  <span>Send</span>
                </button>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        <section ref={servicesRef} className="reveal relative overflow-hidden px-5 py-20 md:px-8 lg:px-16">
          <div className="absolute inset-0 hidden opacity-65 md:block">
            <SectionScene variant="services" />
          </div>
          <div className="mx-auto relative z-10 max-w-7xl">
            <p className="mb-3 text-xs tracking-[0.24em] text-electric-blue">SERVICES · INTERACTIVE 3D MODULES</p>
            <h2 className="mb-8 text-3xl font-semibold text-white md:text-5xl">Command Systems for Growth and Engineering</h2>
            <div className="grid gap-4 lg:grid-cols-5">
              {serviceModules.map((service, index) => (
                <button
                  suppressHydrationWarning
                  key={service.title}
                  type="button"
                  onMouseEnter={() => setActiveService(index)}
                  onFocus={() => setActiveService(index)}
                  onClick={() => setActiveService(index)}
                  className={`glass rounded-2xl p-4 text-left transition-all duration-300 ${
                    activeService === index ? "holo-border -translate-y-1 shadow-[0_0_35px_rgba(58,168,255,0.18)]" : "opacity-80"
                  }`}
                >
                  <p className="text-sm font-semibold text-white">{service.title}</p>
                  <p className="mt-2 text-xs text-[#AAB8D4]">{service.subtitle}</p>
                </button>
              ))}
            </div>

            <motion.div
              key={serviceModules[activeService].title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="glass holo-border mt-6 rounded-3xl p-6 md:p-8"
            >
              <div className="grid gap-8 lg:grid-cols-12">
                <div className="lg:col-span-7">
                  <h3 className="text-2xl font-semibold text-white">{serviceModules[activeService].title}</h3>
                  <p className="mt-3 text-[#C2D0E8]">{serviceModules[activeService].subtitle}</p>

                  <div className="mt-5 grid gap-3 md:grid-cols-3">
                    {serviceModules[activeService].bullets.map((bullet) => (
                      <div key={bullet} className="section-grid rounded-xl border border-white/10 p-3 text-sm text-[#BBD0EE]">
                        {bullet}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="lg:col-span-5">
                  <div className="space-y-3">
                    {[serviceModules[activeService].metricA, serviceModules[activeService].metricB, serviceModules[activeService].metricC].map(
                      (metric) => (
                        <div key={metric} className="glass rounded-xl p-4 text-sm text-white">
                          {metric}
                        </div>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section ref={labsRef} className="reveal relative overflow-hidden section-grid px-5 py-20 md:px-8 lg:px-16">
          <div className="absolute inset-0 hidden opacity-60 md:block">
            <SectionScene variant="labs" />
          </div>
          <div
            className={`mx-auto relative z-10 max-w-7xl rounded-3xl border border-white/10 bg-[#0D1426]/70 p-6 transition-all duration-500 md:p-10 ${
              activeFocusSection === "labs" ? "ring-1 ring-cyber-teal/60 shadow-[0_0_36px_rgba(0,229,195,0.28)]" : ""
            }`}
          >
            <p className="text-xs tracking-[0.24em] text-cyber-teal">BD TECHNYX LABS · SIGNATURE ZONE</p>
            <h2 className="mt-3 text-3xl font-semibold text-white md:text-5xl">Underground Innovation Lab Complex</h2>
            <p className="mt-4 max-w-3xl text-[#BFD0EA]">
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
                <div key={item} className={`glass rounded-2xl p-5 ${index % 2 === 0 ? "float-slower" : "float-slow"}`}>
                  <p className="text-sm text-white">{item}</p>
                  <p className="mt-2 text-xs text-[#9FB3D8]">Live simulation streams · active scans · realtime build telemetry</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section ref={aboutRef} className="reveal relative overflow-hidden px-5 py-20 md:px-8 lg:px-16">
          <div className="absolute inset-0 hidden opacity-65 md:block">
            <SectionScene variant="about" />
          </div>
          <div className="mx-auto relative z-10 grid max-w-7xl gap-8 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="text-xs tracking-[0.24em] text-neon-violet">ABOUT · NEURAL CORE</p>
              <h2 className="mt-3 text-3xl font-semibold text-white md:text-5xl">Built for Visionary Startups and Scalable Businesses</h2>
              <p className="mt-5 text-[#C4D3EA]">
                BD TECHNYX helps teams scale through marketing intelligence, advanced design systems, product engineering, and emerging
                technologies. We build digital ecosystems where strategy and experimentation ship together.
              </p>
            </div>
            <div className="lg:col-span-7">
              <div className="glass section-grid rounded-3xl p-6 md:p-8">
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  {[
                    "Marketing Intelligence",
                    "Design Systems",
                    "Product Engineering",
                    "Emerging Technologies",
                  ].map((item) => (
                    <div key={item} className="rounded-xl border border-white/15 bg-white/5 p-4 text-xs text-[#D4E3FB]">
                      {item}
                    </div>
                  ))}
                </div>
                <p className="mt-5 text-sm text-[#AFC2E2]">BD TECHNYX logo particles are represented as reactive neural grid nodes in this section.</p>
              </div>
            </div>
          </div>
        </section>

        <section ref={portfolioRef} className="reveal relative overflow-hidden px-5 py-20 md:px-8 lg:px-16">
          <div className="absolute inset-0 hidden opacity-65 md:block">
            <SectionScene variant="work" />
          </div>
          <div className="mx-auto relative z-10 max-w-7xl">
            <p className="text-xs tracking-[0.24em] text-neon-orange">PORTFOLIO · CASE TRAILERS</p>
            <h2 className="mt-3 text-3xl font-semibold text-white md:text-5xl">Cinematic Project Intelligence</h2>
            <div
              className={`mt-8 grid gap-5 transition-all duration-500 lg:grid-cols-3 ${
                activeFocusSection === "portfolio" ? "rounded-3xl ring-1 ring-neon-violet/60 shadow-[0_0_36px_rgba(123,92,255,0.26)] p-2" : ""
              }`}
            >
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
                        activeProjectIndex === index ? "ring-1 ring-neon-violet/70 shadow-[0_0_30px_rgba(123,92,255,0.28)]" : ""
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-lg font-semibold text-white">{project.name}</p>
                        <span className="text-[11px] tracking-[0.2em] text-electric-blue">OPEN</span>
                      </div>
                      <div className="mt-4 space-y-3 text-sm text-[#BCD0EC]">
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
                      <p className="mt-2 text-sm text-[#CCE0FF]">{activeProject.problem}</p>
                    </div>
                    <div className="section-grid rounded-xl border border-white/10 p-4">
                      <p className="text-xs tracking-[0.18em] text-neon-violet">STRATEGY</p>
                      <p className="mt-2 text-sm text-[#CCE0FF]">{activeProject.strategy}</p>
                    </div>
                    <div className="section-grid rounded-xl border border-white/10 p-4">
                      <p className="text-xs tracking-[0.18em] text-neon-orange">EXECUTION</p>
                      <p className="mt-2 text-sm text-[#CCE0FF]">{activeProject.execution}</p>
                    </div>
                    <div className="section-grid rounded-xl border border-cyber-teal/40 p-4">
                      <p className="text-xs tracking-[0.18em] text-cyber-teal">RESULTS</p>
                      <p className="mt-2 text-sm text-[#D7FFF8]">{activeProject.results}</p>
                    </div>
                  </div>
                </motion.aside>
              )}
            </AnimatePresence>
          </div>
        </section>

        <section ref={timelineRef} className="reveal relative overflow-hidden px-5 py-20 md:px-8 lg:px-16">
          <div className="absolute inset-0 hidden opacity-65 md:block">
            <SectionScene variant="timeline" />
          </div>
          <div className="mx-auto relative z-10 max-w-7xl">
            <p className="text-xs tracking-[0.24em] text-electric-blue">INNOVATION TIMELINE</p>
            <h2 className="mt-3 text-3xl font-semibold text-white md:text-5xl">From Concept to Market Dominance</h2>
            <div className="mt-10 grid gap-6 md:grid-cols-5">
              {timelineData.map((stage, index) => (
                <div key={stage} className="relative">
                  <div className="mx-auto mb-4 h-5 w-5 rounded-full border border-white/30 bg-electric-blue shadow-[0_0_20px_rgba(58,168,255,0.7)]" />
                  {index < timelineData.length - 1 && (
                    <div className="absolute left-1/2 top-2 hidden h-0.5 w-full bg-linear-to-r from-electric-blue via-neon-violet to-cyber-teal md:block" />
                  )}
                  <div className="glass rounded-xl p-4 text-center text-sm text-[#D0DEFA]">{stage}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="reveal relative overflow-hidden section-grid px-5 py-20 md:px-8 lg:px-16">
          <div className="absolute inset-0 hidden opacity-65 md:block">
            <SectionScene variant="rooms" />
          </div>
          <div className="mx-auto relative z-10 max-w-7xl">
            <p className="text-xs tracking-[0.24em] text-cyber-teal">DIGITAL HEADQUARTERS ROOMS</p>
            <h2 className="mt-3 text-3xl font-semibold text-white md:text-5xl">Immersive Strategic Environments</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {[
                "AI Strategy Center",
                "Data Visualization Room",
                "Marketing War Room",
                "Creative Studio Environment",
              ].map((room) => (
                <div key={room} className="glass rounded-2xl p-5">
                  <p className="text-base font-semibold text-white">{room}</p>
                  <p className="mt-2 text-sm text-[#A8B8D8]">Holographic interfaces, synchronized intelligence, and cinematic room transitions.</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section ref={conversionRef} className="reveal relative overflow-hidden px-5 py-20 md:px-8 lg:px-16">
          <div className="absolute inset-0 hidden opacity-65 md:block">
            <SectionScene variant="conversion" />
          </div>
          <div className="mx-auto relative z-10 max-w-7xl">
            <p className="text-xs tracking-[0.24em] text-neon-violet">CONVERSION · BUSINESS MODULES</p>
            <h2 className="mt-3 text-3xl font-semibold text-white md:text-5xl">Launch Your Innovation Partnership</h2>

            <div className="mt-8 grid gap-6 lg:grid-cols-12">
              <form
                suppressHydrationWarning
                className={`glass holo-border space-y-4 rounded-2xl p-6 transition-all duration-500 lg:col-span-7 ${
                  activeFocusSection === "conversion" ? "ring-1 ring-electric-blue/60 shadow-[0_0_36px_rgba(58,168,255,0.28)]" : ""
                }`}
              >
                <p className="text-lg font-semibold text-white">Lead Capture & Collaboration Request</p>
                <div className="grid gap-4 md:grid-cols-2">
                  <input suppressHydrationWarning ref={leadNameRef} className="rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-[#8BA1C8]" placeholder="Your Name" />
                  <input suppressHydrationWarning className="rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-[#8BA1C8]" placeholder="Company" />
                  <input suppressHydrationWarning className="rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-[#8BA1C8] md:col-span-2" placeholder="Email Address" />
                  <select suppressHydrationWarning ref={requestTypeRef} className="rounded-xl border border-white/20 bg-[#121B31] px-4 py-3 text-sm text-white outline-none md:col-span-2">
                    <option value="Startup Collaboration Request">Startup Collaboration Request</option>
                    <option value="Service Consultation Booking">Service Consultation Booking</option>
                    <option value="Product Engineering Sprint">Product Engineering Sprint</option>
                    <option value="Marketing Intelligence Engagement">Marketing Intelligence Engagement</option>
                  </select>
                  <textarea suppressHydrationWarning className="rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-[#8BA1C8] md:col-span-2" rows={4} placeholder="Project vision, timeline, and objectives" />
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

        <footer className="px-5 pb-10 pt-6 md:px-8 lg:px-16">
          <div className="mx-auto max-w-7xl border-t border-white/10 pt-6 text-sm text-[#9AB0D5]">
            <p>BD TECHNYX · Engineering Digital Dominance.</p>
          </div>
        </footer>
      </main>
    </div>
  );
}
