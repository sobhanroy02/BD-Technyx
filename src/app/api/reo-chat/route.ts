import { NextResponse } from "next/server";

type IncomingMessage = {
  role: "user" | "reo";
  text: string;
};

type ReoRequest = {
  message?: string;
  history?: IncomingMessage[];
};

function trimToWords(input: string, maxWords: number) {
  const words = input.trim().split(/\s+/);
  return words.slice(0, maxWords).join(" ");
}

function generateBackendReply(message: string, history: IncomingMessage[]) {
  const normalized = message.toLowerCase();
  const lastUserNeed = history
    .slice()
    .reverse()
    .find((item) => item.role === "user" && item.text.toLowerCase() !== normalized)?.text;

  if (normalized.includes("service")) {
    return "BD TECHNYX offers five core systems: Marketing Command Center, UI/UX Design Studio, Web Development Core, Product and Brand Hub, and Innovation Labs. Tell me your goal and I can suggest the best starting module.";
  }

  if (normalized.includes("lab") || normalized.includes("prototype")) {
    return "Our Labs run in four tracks: startup collaboration, prototype building, AI experiments, and product pipeline simulation. If you want, I can guide you to the exact section and intake flow.";
  }

  if (normalized.includes("price") || normalized.includes("cost") || normalized.includes("budget")) {
    return "Pricing is scope-based, usually tied to sprint length, team composition, and outcomes. Share your timeline and objective, and we can map a practical package recommendation.";
  }

  if (normalized.includes("time") || normalized.includes("delivery") || normalized.includes("how long")) {
    return "Typical delivery windows: 4 to 8 weeks for focused MVPs, and 8 to 12 weeks for growth-grade systems with analytics, automation, and experimentation layers.";
  }

  if (normalized.includes("work") || normalized.includes("case") || normalized.includes("portfolio")) {
    return "You can open View Our Work to see case trailers with Problem, Strategy, Execution, and Results. I can also summarize which case best matches your industry.";
  }

  if (normalized.includes("hello") || normalized.includes("hi") || normalized.includes("hey")) {
    return "Hello, I am Reo. I can help with services, labs, case studies, launch timelines, and collaboration planning.";
  }

  if (lastUserNeed) {
    return `Understood. Based on your earlier context about "${trimToWords(lastUserNeed, 10)}", I recommend starting with a quick discovery call so BD TECHNYX can map the right growth and engineering path.`;
  }

  return "I can help with service selection, labs, project timelines, pricing direction, and case studies. Ask a specific question and I will provide a direct next step.";
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ReoRequest;
    const message = (body.message || "").trim();
    const history = Array.isArray(body.history) ? body.history.slice(-12) : [];

    if (!message) {
      return NextResponse.json({ reply: "Please share your question so I can help." }, { status: 400 });
    }

    const reply = generateBackendReply(message, history);
    return NextResponse.json({ reply, source: "reo-backend" });
  } catch {
    return NextResponse.json(
      { reply: "Reo is temporarily recalibrating. Please retry your question in a moment." },
      { status: 500 },
    );
  }
}
