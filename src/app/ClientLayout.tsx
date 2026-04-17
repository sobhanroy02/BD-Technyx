"use client";

import { AnimatePresence, motion } from "framer-motion";
import { type ReactNode, useEffect, useState, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

type ChatMessage = {
  id: number;
  role: "user" | "reo";
  text: string;
};

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void> | void;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

const reoQuickQueries = [
  "What services do you offer?",
  "How do I start collaboration?",
  "Show me labs details",
  "How fast is delivery?",
];

const BRAND_NAME = "BD TECHNYX";
const MAX_BRAND_CYCLES = 2;

export default function ClientLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const showSharedPageBackground = pathname !== "/";

  const [isAiConsoleOpen, setAiConsoleOpen] = useState(false);
  const [hudMetrics, setHudMetrics] = useState({ sync: 96, load: 72, signal: 99 });
  const [isHudVisible, setHudVisible] = useState(true);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [deferredInstallPrompt, setDeferredInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [brandPhase, setBrandPhase] = useState<"logo" | "typing" | "name">("logo");
  const [typedBrandChars, setTypedBrandChars] = useState(0);
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

  // Global cursor and HUD effects
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
      setHudMetrics(() => ({
        sync: 94 + Math.floor(Math.abs(Math.sin(Date.now() * 0.001)) * 6),
        load: 64 + Math.floor(Math.abs(Math.cos(Date.now() * 0.0012)) * 26),
        signal: 95 + Math.floor(Math.abs(Math.sin(Date.now() * 0.0015)) * 5),
      }));
    }, 1200);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const onBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setDeferredInstallPrompt(event as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", onBeforeInstallPrompt);
    return () => window.removeEventListener("beforeinstallprompt", onBeforeInstallPrompt);
  }, []);

  // Keyboard shortcut for AI Console
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

  useEffect(() => {
    return () => {
      reoGreetingTimeouts.current.forEach((id) => window.clearTimeout(id));
      reoGreetingTimeouts.current = [];
    };
  }, []);

  useEffect(() => {
    let logoTimer: number | undefined;
    let holdTimer: number | undefined;
    let typingTimer: number | undefined;
    let cycleCount = 0;

    const clearTimers = () => {
      if (logoTimer) window.clearTimeout(logoTimer);
      if (holdTimer) window.clearTimeout(holdTimer);
      if (typingTimer) window.clearInterval(typingTimer);
    };

    const runCycle = () => {
      setBrandPhase("logo");
      setTypedBrandChars(0);

      logoTimer = window.setTimeout(() => {
        setBrandPhase("typing");
        let index = 0;

        typingTimer = window.setInterval(() => {
          index += 1;
          setTypedBrandChars(index);

          if (index >= BRAND_NAME.length) {
            if (typingTimer) window.clearInterval(typingTimer);
            setBrandPhase("name");

            cycleCount += 1;
            if (cycleCount >= MAX_BRAND_CYCLES) {
              setTypedBrandChars(BRAND_NAME.length);
              return;
            }

            holdTimer = window.setTimeout(runCycle, 4200);
          }
        }, 120);
      }, 2800);
    };

    runCycle();
    return clearTimers;
  }, []);

  const handleNavAction = (targetPath: string) => {
    router.push(`/${targetPath}`);
    setMobileMenuOpen(false);
  };

  const handleConsoleAction = (targetPath: string) => {
    handleNavAction(targetPath);
    setAiConsoleOpen(false);
  };

  const handleDownloadWebApp = async () => {
    if (deferredInstallPrompt) {
      await deferredInstallPrompt.prompt();
      await deferredInstallPrompt.userChoice;
      setDeferredInstallPrompt(null);
      return;
    }

    window.open("/manifest.webmanifest", "_blank", "noopener,noreferrer");
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

  return (
    <>
      <div className="cursor-aura" />
      
      {/* Global Navigation */}
      <nav className="fixed left-0 right-0 top-0 z-40 px-4 pt-4 md:px-8 lg:px-14">
        <div className="glass mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-3 rounded-2xl border border-sky-200/30 bg-linear-to-r from-sky-300/16 via-blue-400/10 to-sky-200/16 px-4 py-3">
          <button
            suppressHydrationWarning
            type="button"
            onClick={() => handleNavAction("")}
            className="text-sm font-semibold tracking-[0.18em] text-white"
          >
            <span className="brand-lockup">
              <AnimatePresence mode="wait">
                {brandPhase === "logo" ? (
                  <motion.span
                    key="brand-logo"
                    initial={{ opacity: 0, scale: 0.6, rotate: -20 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.75, rotate: 20 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="brand-logo-mark"
                  >
                    BD
                  </motion.span>
                ) : (
                  <motion.span
                    key="brand-name"
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -6 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="brand-bd-technyx"
                  >
                    {brandPhase === "typing" ? BRAND_NAME.slice(0, typedBrandChars) : BRAND_NAME}
                    {brandPhase === "typing" && <span className="brand-caret" aria-hidden />}
                  </motion.span>
                )}
              </AnimatePresence>
            </span>
          </button>

          <div className="hidden flex-wrap items-center gap-2 text-xs md:flex md:text-sm">
            <button suppressHydrationWarning type="button" className="neon-btn rounded-lg px-3 py-2 text-white" onClick={() => handleNavAction("services")}><span>Services</span></button>
            <button suppressHydrationWarning type="button" className="neon-btn rounded-lg px-3 py-2 text-white" onClick={() => handleNavAction("labs")}><span>Labs</span></button>
            <button suppressHydrationWarning type="button" className="neon-btn rounded-lg px-3 py-2 text-white" onClick={() => handleNavAction("work")}><span>Work</span></button>
            <button suppressHydrationWarning type="button" className="neon-btn rounded-lg px-3 py-2 text-white" onClick={() => handleNavAction("about")}><span>About</span></button>
            <button suppressHydrationWarning type="button" className="neon-btn rounded-lg px-3 py-2 text-white" onClick={() => handleNavAction("timeline")}><span>Timeline</span></button>
            <button suppressHydrationWarning type="button" className="neon-btn rounded-lg px-3 py-2 text-white" onClick={() => handleNavAction("contact")}><span>Build With Us</span></button>
            <button suppressHydrationWarning type="button" className="neon-btn rounded-lg px-3 py-2 text-white" onClick={() => setAiConsoleOpen(true)}><span>AI Console</span></button>
            <button suppressHydrationWarning type="button" className="neon-btn rounded-lg px-3 py-2 text-white" onClick={() => setHudVisible((prev) => !prev)}><span>{isHudVisible ? "Hide HUD" : "Show HUD"}</span></button>
            <button suppressHydrationWarning type="button" className="neon-btn rounded-lg px-3 py-2 text-white" onClick={() => setReoOpen(true)}><span>Talk to Reo</span></button>
          </div>

          <button
            suppressHydrationWarning
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="flex items-center rounded-none border-0 bg-transparent px-0 py-2 text-white md:hidden"
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMobileMenuOpen}
          >
            <span className="text-lg leading-none">{isMobileMenuOpen ? "×" : "☰"}</span>
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="glass mx-auto mt-3 w-full max-w-7xl rounded-2xl border border-sky-200/25 bg-linear-to-r from-sky-300/14 via-blue-400/8 to-sky-200/14 p-4 md:hidden">
            <div className="grid gap-2 text-sm">
              <button suppressHydrationWarning type="button" className="w-full border-0 bg-transparent px-0 py-2 text-left text-white hover:text-[#cbfb45]" onClick={() => handleNavAction("services")}><span>Services</span></button>
              <button suppressHydrationWarning type="button" className="w-full border-0 bg-transparent px-0 py-2 text-left text-white hover:text-[#cbfb45]" onClick={() => handleNavAction("labs")}><span>Labs</span></button>
              <button suppressHydrationWarning type="button" className="w-full border-0 bg-transparent px-0 py-2 text-left text-white hover:text-[#cbfb45]" onClick={() => handleNavAction("work")}><span>Work</span></button>
              <button suppressHydrationWarning type="button" className="w-full border-0 bg-transparent px-0 py-2 text-left text-white hover:text-[#cbfb45]" onClick={() => handleNavAction("about")}><span>About</span></button>
              <button suppressHydrationWarning type="button" className="w-full border-0 bg-transparent px-0 py-2 text-left text-white hover:text-[#cbfb45]" onClick={() => handleNavAction("timeline")}><span>Timeline</span></button>
              <button suppressHydrationWarning type="button" className="w-full border-0 bg-transparent px-0 py-2 text-left text-white hover:text-[#cbfb45]" onClick={() => handleNavAction("contact")}><span>Build With Us</span></button>
              <button suppressHydrationWarning type="button" className="w-full border-0 bg-transparent px-0 py-2 text-left text-white hover:text-[#cbfb45]" onClick={() => setAiConsoleOpen(true)}><span>AI Console</span></button>
              <button suppressHydrationWarning type="button" className="w-full border-0 bg-transparent px-0 py-2 text-left text-white hover:text-[#cbfb45]" onClick={() => setHudVisible((prev) => !prev)}><span>{isHudVisible ? "Hide HUD" : "Show HUD"}</span></button>
              <button suppressHydrationWarning type="button" className="w-full border-0 bg-transparent px-0 py-2 text-left text-white hover:text-[#cbfb45]" onClick={() => setReoOpen(true)}><span>Talk to Reo</span></button>
            </div>
          </div>
        )}
      </nav>

      {/* Global HUD */}
      {isHudVisible && (
        <aside className="fixed right-4 top-24 z-40 hidden w-52 rounded-2xl border border-white/15 bg-[#0c0d12]/80 p-4 backdrop-blur-md md:block">
          <p className="text-[11px] tracking-[0.2em] text-electric-blue">LIVE NEURAL HUD</p>
          <div className="mt-3 space-y-2 text-xs text-[#F2E8EC]">
            <p>SYNC: {hudMetrics.sync}%</p>
            <p>SYSTEM LOAD: {hudMetrics.load}%</p>
            <p>SIGNAL: {hudMetrics.signal}%</p>
          </div>
          <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
            <div className="h-full rounded-full bg-linear-to-r from-electric-blue via-neon-violet to-cyber-teal transition-all duration-500" style={{ width: `${hudMetrics.signal}%` }} />
          </div>
        </aside>
      )}

      {/* AI Console Overlay */}
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
              className="w-full max-w-2xl rounded-3xl border border-sky-300/45 bg-linear-to-br from-sky-400/22 via-blue-400/18 to-cyan-400/20 p-6 md:p-8 backdrop-blur-md shadow-[0_0_32px_rgba(120,190,255,0.24)]"
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
                <button suppressHydrationWarning type="button" onClick={() => handleConsoleAction("services")} className="rounded-xl border border-sky-300/35 bg-sky-200/12 px-4 py-3 text-left text-sm text-white backdrop-blur-md transition-colors hover:border-sky-300/55 hover:bg-sky-200/20"><span>Open Services Matrix</span></button>
                <button suppressHydrationWarning type="button" onClick={() => handleConsoleAction("labs")} className="rounded-xl border border-sky-300/35 bg-sky-200/12 px-4 py-3 text-left text-sm text-white backdrop-blur-md transition-colors hover:border-sky-300/55 hover:bg-sky-200/20"><span>Enter Labs Node</span></button>
                <button suppressHydrationWarning type="button" onClick={() => handleConsoleAction("work")} className="rounded-xl border border-sky-300/35 bg-sky-200/12 px-4 py-3 text-left text-sm text-white backdrop-blur-md transition-colors hover:border-sky-300/55 hover:bg-sky-200/20"><span>View Work Intelligence</span></button>
                <button suppressHydrationWarning type="button" onClick={() => { setAiConsoleOpen(false); setReoOpen(true); }} className="rounded-xl border border-sky-300/35 bg-sky-200/12 px-4 py-3 text-left text-sm text-white backdrop-blur-md transition-colors hover:border-sky-300/55 hover:bg-sky-200/20"><span>Talk to Reo Assistant</span></button>
                <button suppressHydrationWarning type="button" onClick={() => handleConsoleAction("timeline")} className="rounded-xl border border-sky-300/35 bg-sky-200/12 px-4 py-3 text-left text-sm text-white backdrop-blur-md transition-colors hover:border-sky-300/55 hover:bg-sky-200/20"><span>Open Timeline Flow</span></button>
                <button suppressHydrationWarning type="button" onClick={() => handleConsoleAction("contact")} className="rounded-xl border border-sky-300/35 bg-sky-200/12 px-4 py-3 text-left text-sm text-white backdrop-blur-md transition-colors hover:border-sky-300/55 hover:bg-sky-200/20"><span>Start Collaboration</span></button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reo Chat Assistant */}
      <motion.button
        suppressHydrationWarning
        type="button"
        onClick={handleReoFabClick}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.96 }}
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-linear-to-br from-electric-blue via-neon-violet to-cyber-teal shadow-[0_0_30px_rgba(229,9,20,0.38)] ring-2 ring-white/15"
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
              <div className="relative h-14 w-14 rounded-2xl bg-linear-to-br from-electric-blue via-neon-violet to-cyber-teal p-2 shadow-[0_0_26px_rgba(229,9,20,0.35)]">
                <div className="flex h-full w-full items-center justify-center rounded-xl bg-[#121016]">
                  <div className="relative h-10 w-10 rounded-full bg-white/90">
                    <div className="absolute -top-2 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-electric-blue shadow-[0_0_10px_rgba(229,9,20,0.8)]" />
                    <div className="absolute inset-x-2 top-3 flex justify-between">
                      <span className="h-2 w-2 rounded-full bg-[#19151e]" />
                      <span className="h-2 w-2 rounded-full bg-[#19151e]" />
                    </div>
                    <div className="absolute left-1/2 top-6 h-2 w-6 -translate-x-1/2 rounded-full bg-[#f3e9ed]" />
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
                  className={`rounded-xl p-3 ${message.role === "reo" ? "bg-white/8 text-[#F5ECEE]" : "bg-electric-blue/20 text-white"}`}
                >
                  <p className="mb-1 text-[10px] tracking-[0.14em] text-[#9ABCE8]">{message.role === "reo" ? "REO" : "YOU"}</p>
                  <p>{message.text}</p>
                </div>
              ))}
              {isReoTyping && (
                <div className="rounded-xl bg-white/8 p-3 text-sm text-[#F2E8ED]">Reo is analyzing your query...</div>
              )}
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {reoQuickQueries.map((query) => (
                <button
                  suppressHydrationWarning
                  key={query}
                  type="button"
                  onClick={() => sendMessageToReo(query)}
                  className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] text-[#F3E9ED] transition hover:border-electric-blue"
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
                className="w-full rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm text-white outline-none placeholder:text-[#D1C8CC]"
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

      <main id="main-site" className="relative isolate overflow-hidden min-h-screen pt-20">
        {showSharedPageBackground && (
          <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 h-full w-full object-cover object-center scale-105"
            >
              <source src="/15886614-hd_1080_1920_30fps%20(1).mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-linear-to-b from-black/75 via-[#23153c]/48 to-[#23153c]/88" />
            <div className="absolute inset-x-0 bottom-0 h-64 bg-linear-to-t from-[#23153c]/96 via-[#3b82f6]/10 to-transparent" />
            <div className="absolute inset-x-0 top-0 h-24 bg-linear-to-b from-[#3b82f6]/10 via-[#7c3aed]/8 to-transparent" />
          </div>
        )}

        <div className="relative z-10">
        {children}
        </div>
      </main>

      <footer className="relative -mt-12 w-full overflow-hidden bg-[#23153c] px-6 pb-8 pt-14 md:px-10 lg:px-20">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover object-center"
        >
          <source src="/14492092_1920_1080_30fps%20(1).mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-linear-to-b from-[#23153c]/76 via-[#23153c]/86 to-[#23153c]/96" />
        <div className="absolute inset-x-0 -top-16 h-32 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.28),rgba(124,58,237,0.72)_42%,rgba(35,21,60,0.96)_76%,transparent_100%)] blur-2xl" />
        <div className="absolute inset-x-0 top-0 h-20 bg-linear-to-b from-[#3b82f6]/14 via-[#7c3aed]/12 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-[#23153c]/98 via-[#23153c]/84 to-transparent" />

        <div className="relative z-10 mx-auto flex max-w-350 flex-col justify-between gap-6 md:flex-row md:gap-5">
          <div className="flex flex-col space-y-2 md:w-1/4">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-sm bg-[#cbfb45]">
                <span className="h-2 w-2 bg-black" />
              </div>
              <span className="text-xl font-bold text-white tracking-wide">BD Technyx.</span>
            </div>
            <p className="text-sm text-[#b7a8c8]">Your AI-Powered Workflow.</p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:w-2/3 lg:w-3/4">
            <div className="flex flex-col space-y-1.5">
              <h4 className="mb-2 font-medium text-white">Quick Link</h4>
              <button suppressHydrationWarning type="button" onClick={() => handleNavAction("")} className="text-left text-sm text-[#cbfb45] hover:text-[#e4ff88] transition">Home 01</button>
              <button suppressHydrationWarning type="button" onClick={() => handleNavAction("")} className="text-left text-sm text-[#b7a8c8] hover:text-white transition">Home 02</button>
              <button suppressHydrationWarning type="button" onClick={() => handleNavAction("about")} className="text-left text-sm text-[#b7a8c8] hover:text-white transition">About Us</button>
              <button suppressHydrationWarning type="button" onClick={() => handleNavAction("services")} className="text-left text-sm text-[#b7a8c8] hover:text-white transition">Features</button>
              <button suppressHydrationWarning type="button" onClick={() => handleNavAction("pricing")} className="text-left text-sm text-[#b7a8c8] hover:text-white transition">Pricing</button>
              <button suppressHydrationWarning type="button" onClick={() => handleNavAction("blog")} className="text-left text-sm text-[#b7a8c8] hover:text-white transition">Blog</button>
              <button suppressHydrationWarning type="button" onClick={() => handleNavAction("integration")} className="text-left text-sm text-[#b7a8c8] hover:text-white transition">Integration</button>
              <button suppressHydrationWarning type="button" onClick={() => handleNavAction("contact")} className="text-left text-sm text-[#b7a8c8] hover:text-white transition">Contact Us</button>
            </div>

            <div className="flex flex-col space-y-1.5">
              <h4 className="mb-2 font-medium text-white">Utility Pages</h4>
              <button suppressHydrationWarning type="button" className="text-left text-sm text-[#b7a8c8] hover:text-white transition">404</button>
              <button suppressHydrationWarning type="button" className="text-left text-sm text-[#b7a8c8] hover:text-white transition">Password</button>
              <button suppressHydrationWarning type="button" className="text-left text-sm text-[#b7a8c8] hover:text-white transition">License</button>
              <button suppressHydrationWarning type="button" className="text-left text-sm text-[#b7a8c8] hover:text-white transition">Changelog</button>
              <button suppressHydrationWarning type="button" className="text-left text-sm text-[#b7a8c8] hover:text-white transition">Style Guide</button>
              <button suppressHydrationWarning type="button" className="text-left text-sm text-[#b7a8c8] hover:text-white transition">Privacy Policy</button>
              <button suppressHydrationWarning type="button" className="text-left text-sm text-[#b7a8c8] hover:text-white transition">Terms &amp; Conditions</button>
            </div>

            <div className="flex flex-col space-y-3">
              <div className="flex flex-col space-y-1.5">
                <h4 className="mb-1 font-medium text-white">Our Office</h4>
                <p className="text-sm text-[#b7a8c8] leading-relaxed">
                  88 Market Street, San Francisco,<br /> CA 94103 United States
                </p>
              </div>
              <div className="flex flex-col space-y-1.5">
                <h4 className="mb-1 font-medium text-white">Our Phone</h4>
                <p className="text-sm text-[#b7a8c8] leading-relaxed">+117 2345 6948</p>
              </div>
            </div>
          </div>
        </div>
        <div className="relative z-10 mx-auto mt-6 flex max-w-350 flex-col gap-2 pt-3 text-sm text-[#b7a8c8] md:flex-row md:items-center md:justify-between">
          <p>© 2025 All rights reserved, Developed by BD Technyx</p>
          <button
            suppressHydrationWarning
            type="button"
            onClick={handleDownloadWebApp}
            className="neon-btn rounded-full px-5 py-2 text-sm text-white"
          >
            <span>Download Web App</span>
          </button>
        </div>
      </footer>
    </>
  );
}
