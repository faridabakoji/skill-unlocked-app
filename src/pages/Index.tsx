import { useState } from "react";
import { ArrowRight, Sparkles, Calendar, Globe, Code2, CheckCircle2, Coins } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type Screen = "home" | "input" | "results";

const Index = () => {
  const [screen, setScreen] = useState<Screen>("home");
  const [description, setDescription] = useState("");

  return (
    <main className="min-h-screen bg-gradient-sunset">
      <div className="mx-auto max-w-xl px-5 py-8 sm:py-12">
        {screen === "home" && <Home onNext={() => setScreen("input")} />}
        {screen === "input" && (
          <InputScreen
            value={description}
            onChange={setDescription}
            onBack={() => setScreen("home")}
            onNext={() => setScreen("results")}
          />
        )}
        {screen === "results" && (
          <Results description={description} onBack={() => setScreen("input")} />
        )}
      </div>
    </main>
  );
};

/* ---------- Screen 1: Home ---------- */
const Home = ({ onNext }: { onNext: () => void }) => (
  <section className="flex min-h-[90vh] flex-col justify-between py-6 animate-in fade-in duration-700">
    <header className="flex items-center gap-2">
      <div className="h-2 w-2 rounded-full bg-primary" />
      <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
        Adaye
      </span>
    </header>

    <div className="space-y-8 py-12">
      <div className="space-y-3">
        <h1 className="font-display text-6xl font-600 leading-[0.95] text-foreground sm:text-7xl">
          Adaye<span className="text-primary">.</span>
        </h1>
        <p className="font-display text-2xl italic text-accent sm:text-3xl">
          Participate. Contribute. Belong.
        </p>
      </div>

      <div className="space-y-4 text-base leading-relaxed text-foreground/80 sm:text-lg">
        <p>
          Millions of people are economically invisible. Not because they lack skill.
          Because the system requires permission before it allows contribution.
        </p>
        <p className="font-medium text-foreground">Adaye changes that.</p>
      </div>
    </div>

    <div className="space-y-4">
      <Button
        onClick={onNext}
        size="lg"
        className="group h-14 w-full rounded-full bg-primary text-base font-medium text-primary-foreground shadow-warm transition-all hover:scale-[1.01] hover:bg-primary/90"
      >
        Tell us what you do
        <ArrowRight className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1" />
      </Button>
      <p className="text-center text-xs text-muted-foreground">
        No sign up. No resume. Just you.
      </p>
    </div>
  </section>
);

/* ---------- Screen 2: Input ---------- */
const InputScreen = ({
  value,
  onChange,
  onBack,
  onNext,
}: {
  value: string;
  onChange: (v: string) => void;
  onBack: () => void;
  onNext: () => void;
}) => (
  <section className="flex min-h-[90vh] flex-col py-6 animate-in fade-in slide-in-from-right-4 duration-500">
    <button
      onClick={onBack}
      className="mb-8 self-start text-sm text-muted-foreground transition-colors hover:text-foreground"
    >
      ← Back
    </button>

    <div className="flex-1 space-y-6">
      <div className="space-y-3">
        <h2 className="font-display text-4xl font-600 leading-tight text-foreground sm:text-5xl">
          What do you do?
        </h2>
        <p className="text-base leading-relaxed text-muted-foreground">
          Describe your skills, your work, or what you make. Any language. Any format.
          No resume. No credentials. No permission needed.
        </p>
      </div>

      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="I weave baskets and teach other women in my village... I code on weekends... I organise community health drives..."
        className="min-h-[280px] resize-none rounded-2xl border-2 border-border bg-card p-5 text-base leading-relaxed shadow-card focus-visible:border-primary focus-visible:ring-0"
      />
    </div>

    <Button
      onClick={onNext}
      disabled={value.trim().length < 5}
      size="lg"
      className="group mt-6 h-14 w-full rounded-full bg-accent text-base font-medium text-accent-foreground shadow-warm transition-all hover:scale-[1.01] hover:bg-accent/90 disabled:opacity-40"
    >
      <Sparkles className="mr-1 h-5 w-5" />
      Find my opportunities
    </Button>
  </section>
);

/* ---------- Screen 3: Results ---------- */
type Level = "Strong" | "Emerging" | "Developing";

const Results = ({
  description,
  onBack,
}: {
  description: string;
  onBack: () => void;
}) => {
  const understood = extractUnderstanding(description);
  const skills = extractSkills(description);
  const signals = extractSignals(description);
  const opportunities = orderOpportunities(description);

  return (
    <section className="space-y-6 py-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button
        onClick={onBack}
        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        ← Edit
      </button>

      {/* What we understood */}
      <div className="rounded-3xl border border-border bg-card p-6 shadow-card">
        <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
          <CheckCircle2 className="h-3.5 w-3.5 text-accent" />
          What we understood
        </div>
        <ul className="space-y-2.5">
          {understood.map((line) => (
            <li key={line} className="flex items-start gap-3 text-base leading-relaxed text-foreground/85">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              {line}
            </li>
          ))}
        </ul>
      </div>

      {/* Skill tags profile */}
      <div className="rounded-3xl bg-gradient-terracotta p-6 text-primary-foreground shadow-warm">
        <div className="mb-1 flex items-center gap-2 text-xs uppercase tracking-[0.2em] opacity-80">
          <Sparkles className="h-3 w-3" />
          Your Skills Profile
        </div>
        <h3 className="font-display text-2xl font-600 leading-tight">
          You bring real value to the table.
        </h3>
        <div className="mt-5 flex flex-wrap gap-2">
          {skills.map((s) => (
            <span
              key={s}
              className="rounded-full bg-primary-foreground/15 px-3 py-1.5 text-sm font-medium backdrop-blur-sm"
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Capability Signal */}
      <div className="rounded-3xl border border-border bg-card p-6 shadow-card">
        <div className="mb-4 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          Capability Signal
        </div>
        <ul className="space-y-4">
          {signals.map((sig) => (
            <SignalRow key={sig.label} label={sig.label} level={sig.level} />
          ))}
        </ul>
      </div>

      <div className="space-y-1 pt-2">
        <h4 className="font-display text-2xl font-600 text-foreground">
          Opportunities for you
        </h4>
        <p className="text-sm text-muted-foreground">
          Hand-picked. No gatekeepers.
        </p>
      </div>

      {/* Opportunity Cards */}
      <div className="space-y-4">
        {opportunities.map((o) => (
          <OpportunityCard key={o.title} {...o} />
        ))}
      </div>

      <p className="pt-4 text-center text-xs text-muted-foreground">
        More opportunities matched daily.
      </p>
    </section>
  );
};

/* ---------- Capability Signal Row ---------- */
const SignalRow = ({ label, level }: { label: string; level: Level }) => {
  const filled = level === "Strong" ? 3 : level === "Emerging" ? 2 : 1;
  const levelColor =
    level === "Strong"
      ? "text-accent"
      : level === "Emerging"
      ? "text-primary"
      : "text-muted-foreground";

  return (
    <li className="flex items-center justify-between gap-4">
      <span className="text-sm font-medium text-foreground sm:text-base">{label}</span>
      <div className="flex items-center gap-3">
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={`h-2 w-6 rounded-full ${
                i < filled
                  ? level === "Strong"
                    ? "bg-accent"
                    : level === "Emerging"
                    ? "bg-primary"
                    : "bg-primary/50"
                  : "bg-muted"
              }`}
            />
          ))}
        </div>
        <span className={`w-20 text-right text-xs font-semibold uppercase tracking-wider ${levelColor}`}>
          {level}
        </span>
      </div>
    </li>
  );
};

/* ---------- Opportunity Card ---------- */
type Opp = {
  tag: string;
  tagIcon: React.ReactNode;
  title: string;
  focus: string;
  deadline: string;
  reason: string;
  accent: "primary" | "accent";
};

const OpportunityCard = ({ tag, tagIcon, title, focus, deadline, reason, accent }: Opp) => {
  const tagBg = accent === "primary" ? "bg-primary-soft text-primary" : "bg-accent-soft text-accent";
  const btnBg =
    accent === "primary"
      ? "bg-primary text-primary-foreground hover:bg-primary/90"
      : "bg-accent text-accent-foreground hover:bg-accent/90";

  return (
    <article className="group rounded-2xl border border-border bg-card p-5 shadow-card transition-all hover:shadow-soft">
      <div className={`mb-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${tagBg}`}>
        {tagIcon}
        {tag}
      </div>
      <h5 className="font-display text-xl font-600 leading-snug text-card-foreground">{title}</h5>
      <p className="mt-1 text-sm text-muted-foreground">{focus}</p>

      <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
        <Calendar className="h-3.5 w-3.5" />
        {deadline}
      </div>

      <div className="mt-4 flex items-start gap-2 rounded-xl bg-muted/60 p-3">
        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
        <p className="text-sm leading-relaxed text-foreground/80">{reason}</p>
      </div>

      <Button className={`mt-4 h-11 w-full rounded-full font-medium ${btnBg}`}>
        Apply now
        <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Button>
    </article>
  );
};

/* ---------- Signal detection helpers ---------- */
type Signals = {
  community: number;
  teaching: number;
  trade: number;
  tech: number;
  craft: number;
  health: number;
  sourcing: number;
  organising: number;
};

function detect(text: string): Signals {
  const t = text.toLowerCase();
  const score = (patterns: RegExp[]) =>
    patterns.reduce((n, p) => n + (t.match(p)?.length ?? 0), 0);

  return {
    community: score([/community/g, /village/g, /neighbou?r/g, /local/g, /people/g]),
    teaching: score([/teach/g, /train/g, /mentor/g, /show others/g, /learn/g, /school/g]),
    trade: score([/sell/g, /sold/g, /trade/g, /market/g, /shop/g, /custom(er|ers)/g, /client/g, /buy/g, /price/g]),
    tech: score([/code/g, /coding/g, /develop/g, /software/g, /\bapp\b/g, /\bweb\b/g, /\bai\b/g, /data/g, /tech/g, /program/g, /hack/g]),
    craft: score([/weave/g, /sew/g, /craft/g, /\bmake\b/g, /build/g, /design/g, /art\b/g, /cook/g, /\bbake\b/g],),
    health: score([/health/g, /clinic/g, /\bcare\b/g, /nurs/g, /medicine/g, /wellbeing/g],),
    sourcing: score([/source/g, /supply/g, /supplier/g, /grow/g, /harvest/g, /farm/g, /raw material/g],),
    organising: score([/organi[sz]e/g, /coordinat/g, /lead/g, /\brun\b/g, /manage/g, /gather/g],),
  };
}

/* ---------- "What we understood" ---------- */
function extractUnderstanding(text: string): string[] {
  const s = detect(text);
  const lines: { score: number; line: string }[] = [];

  if (s.community + s.organising > 0)
    lines.push({ score: s.community + s.organising + 1, line: "You coordinate people within your community." });
  if (s.teaching > 0)
    lines.push({ score: s.teaching + 1, line: "You pass on knowledge to others around you." });
  if (s.trade > 0)
    lines.push({ score: s.trade + 1, line: "You engage in informal trade and sales." });
  if (s.tech > 0)
    lines.push({ score: s.tech + 1, line: "You build with technology, often outside formal settings." });
  if (s.craft > 0)
    lines.push({ score: s.craft + 1, line: "You make things with your hands and create real value." });
  if (s.health > 0)
    lines.push({ score: s.health + 1, line: "You contribute to the wellbeing of people around you." });
  if (s.sourcing > 0)
    lines.push({ score: s.sourcing + 1, line: "You work close to where things are grown, made, or sourced." });

  // Fallbacks so we always have 2–3 lines
  const fallback = [
    "You contribute to local problem solving.",
    "You take initiative without waiting for permission.",
    "You bring lived experience that systems often overlook.",
  ];
  while (lines.length < 3) {
    const next = fallback.shift();
    if (!next) break;
    if (!lines.find((l) => l.line === next)) lines.push({ score: 0, line: next });
  }

  return lines.sort((a, b) => b.score - a.score).slice(0, 3).map((l) => l.line);
}

/* ---------- Specific skill tags ---------- */
function extractSkills(text: string): string[] {
  const s = detect(text);
  const candidates: { score: number; label: string }[] = [
    { score: s.teaching * 2, label: "Peer Education" },
    { score: s.community + s.organising * 2, label: "Community Coordination" },
    { score: s.trade * 2, label: "Informal Sales" },
    { score: s.sourcing * 2 + (s.trade > 0 ? 1 : 0), label: "Local Sourcing" },
    { score: s.tech * 2, label: "Applied Technology" },
    { score: s.craft * 2, label: "Hands-On Production" },
    { score: s.health * 2, label: "Care & Wellbeing" },
    { score: s.organising, label: "Grassroots Leadership" },
    { score: s.trade + s.craft, label: "Customer Relationships" },
  ];

  const picked = candidates.filter((c) => c.score > 0).sort((a, b) => b.score - a.score).map((c) => c.label);

  const fallback = ["Practical Problem Solving", "Lived Experience", "Self-Directed Initiative"];
  while (picked.length < 3) {
    const next = fallback.shift();
    if (!next) break;
    if (!picked.includes(next)) picked.push(next);
  }
  return picked.slice(0, 4);
}

/* ---------- Capability signals with levels ---------- */
function extractSignals(text: string): { label: string; level: Level }[] {
  const s = detect(text);
  const toLevel = (n: number): Level => (n >= 3 ? "Strong" : n >= 1 ? "Emerging" : "Developing");

  const all = [
    { label: "Community Coordination", score: s.community + s.organising * 2 },
    { label: "Informal Sales", score: s.trade * 2 + s.sourcing },
    { label: "Technical Skills", score: s.tech * 2 },
    { label: "Peer Education", score: s.teaching * 2 },
    { label: "Hands-On Craft", score: s.craft * 2 },
    { label: "Care & Wellbeing", score: s.health * 2 },
  ];

  // Pick top 3 by score, but always include at least one even if zero
  const top = all.sort((a, b) => b.score - a.score).slice(0, 3);
  return top.map((t) => ({ label: t.label, level: toLevel(t.score) }));
}

/* ---------- Opportunities, routed by input category ---------- */
function orderOpportunities(text: string): Opp[] {
  const t = text.toLowerCase();

  const has = (patterns: RegExp[]) => patterns.some((p) => p.test(t));

  const tradeMatch = has([
    /\btrade\b/, /\bsell/, /\bsold\b/, /\bmarket/, /\bbusiness/, /palm oil/,
    /shea butter/, /\bcommerce/, /\bvendor/, /\bshop\b/, /\bstall\b/, /\bmerch/,
    /\bcustom(er|ers)\b/, /\bclient/,
  ]);

  const healthMatch = has([
    /\bhealth/, /\bmedicine/, /\bmedical/, /\bclinic/, /\bnurs/, /\bwellness/,
    /\bwellbeing/, /\bcare\b/, /\bdoctor/, /\bpatient/,
  ]);

  const techMatch = has([
    /\bcod(e|ing)\b/, /\btechnology\b/, /\btech\b/, /\bsoftware/, /\bai\b/,
    /\bdata\b/, /\bengineer/, /\bdevelop(er|ment)?\b/, /\bprogram(m|ing)/,
    /\bapp\b/, /\bweb\b/, /\bhack/,
  ]);

  const communityMatch = has([
    /\bcommunity/, /\bteach/, /\beducat/, /\btrain/, /\bmentor/, /\bcoordinat/,
    /\bwomen\b/, /\bgirls\b/, /\bleader/, /\borgani[sz]/, /\bvillage/, /\bschool/,
  ]);

  /* ---------- Trade set ---------- */
  const tradeSet: Opp[] = [
    {
      tag: "Fully funded",
      tagIcon: <Globe className="h-3 w-3" />,
      title: "Tony Elumelu Foundation Entrepreneurship Programme",
      focus: "Funding & mentorship for African entrepreneurs",
      deadline: "Deadline: June 2026",
      reason: "Your trading and business activity is exactly the entrepreneurship they fund.",
      accent: "primary",
    },
    {
      tag: "Open to all",
      tagIcon: <Coins className="h-3 w-3" />,
      title: "IFC SME Finance Forum",
      focus: "For informal business owners across Africa",
      deadline: "No credentials required",
      reason: "Built for informal commerce — your hands-on market experience qualifies.",
      accent: "accent",
    },
    {
      tag: "Fully funded",
      tagIcon: <Globe className="h-3 w-3" />,
      title: "Mastercard Foundation Young Africa Works",
      focus: "Connects young entrepreneurs to markets & capital",
      deadline: "Applications open",
      reason: "Your work in informal commerce is the kind of contribution they back.",
      accent: "primary",
    },
  ];

  /* ---------- Health set ---------- */
  const healthSet: Opp[] = [
    {
      tag: "Fully funded",
      tagIcon: <Globe className="h-3 w-3" />,
      title: "One Young World Sandoz Scholarship",
      focus: "Global health equity",
      deadline: "Deadline: May 19, 2026",
      reason: "Your community health work signals exactly the leadership they fund.",
      accent: "primary",
    },
    {
      tag: "Open globally",
      tagIcon: <Globe className="h-3 w-3" />,
      title: "WHO Health for All Film Festival Grant",
      focus: "For health advocates worldwide",
      deadline: "Applications open",
      reason: "Your lived health work makes you an advocate WHO wants to amplify.",
      accent: "accent",
    },
    {
      tag: "Fully funded",
      tagIcon: <Globe className="h-3 w-3" />,
      title: "Africa CDC Youth Health Fellowship",
      focus: "For young health leaders across Africa",
      deadline: "Applications open",
      reason: "Your wellbeing work places you in the next generation of African health leaders.",
      accent: "primary",
    },
  ];

  /* ---------- Tech set ---------- */
  const techSet: Opp[] = [
    {
      tag: "Open to all",
      tagIcon: <Code2 className="h-3 w-3" />,
      title: "Hack-Nation Global AI Hackathon",
      focus: "Build real economic participation",
      deadline: "No credentials required",
      reason: "Builders welcome. Your technical skills are the only ticket needed.",
      accent: "primary",
    },
    {
      tag: "Funded",
      tagIcon: <Globe className="h-3 w-3" />,
      title: "Google for Startups Africa Fund",
      focus: "Supports tech founders across Africa",
      deadline: "Rolling applications",
      reason: "Your technical work fits the founder profile they invest in.",
      accent: "accent",
    },
    {
      tag: "Fully funded",
      tagIcon: <Code2 className="h-3 w-3" />,
      title: "ALX Africa Tech Fellowship",
      focus: "For emerging tech talent",
      deadline: "Applications open",
      reason: "Your self-taught technical skills are exactly who ALX is built for.",
      accent: "primary",
    },
  ];

  /* ---------- Community / leadership set ---------- */
  const communitySet: Opp[] = [
    {
      tag: "Fully funded",
      tagIcon: <Globe className="h-3 w-3" />,
      title: "World Bank Youth Summit Delegate Programme",
      focus: "SDGs & economic development",
      deadline: "Applications open",
      reason: "Your community leadership perspective is what this summit needs.",
      accent: "primary",
    },
    {
      tag: "Fully funded",
      tagIcon: <Globe className="h-3 w-3" />,
      title: "Amujae Initiative",
      focus: "For African women in leadership",
      deadline: "Applications open",
      reason: "Your leadership in your community is the foundation Amujae builds on.",
      accent: "accent",
    },
    {
      tag: "Fully funded",
      tagIcon: <Globe className="h-3 w-3" />,
      title: "YALI Network Fellowship",
      focus: "For community leaders across Africa",
      deadline: "Applications open",
      reason: "Your grassroots organising is the kind of leadership YALI invests in.",
      accent: "primary",
    },
  ];

  /* ---------- Default set ---------- */
  const defaultSet: Opp[] = [
    {
      tag: "Fully funded",
      tagIcon: <Globe className="h-3 w-3" />,
      title: "World Bank Youth Summit Delegate Programme",
      focus: "SDGs & economic development",
      deadline: "Applications open",
      reason: "Your perspective on contribution and access is what this summit needs.",
      accent: "primary",
    },
    {
      tag: "Fully funded",
      tagIcon: <Globe className="h-3 w-3" />,
      title: "One Young World Sandoz Scholarship",
      focus: "Global health equity",
      deadline: "Deadline: May 19, 2026",
      reason: "Your impact-driven work signals the leadership they fund.",
      accent: "accent",
    },
    {
      tag: "Open to all",
      tagIcon: <Code2 className="h-3 w-3" />,
      title: "Hack-Nation Global AI Hackathon",
      focus: "Build real economic participation",
      deadline: "No credentials required",
      reason: "Builders welcome. No credentials required to participate.",
      accent: "primary",
    },
  ];

  if (tradeMatch) return tradeSet;
  if (healthMatch) return healthSet;
  if (techMatch) return techSet;
  if (communityMatch) return communitySet;
  return defaultSet;
}

export default Index;
