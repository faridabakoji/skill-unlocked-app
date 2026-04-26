import { useState } from "react";
import { ArrowRight, Sparkles, Calendar, Globe, Code2, CheckCircle2 } from "lucide-react";
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
const Results = ({
  description,
  onBack,
}: {
  description: string;
  onBack: () => void;
}) => {
  const skills = extractSkills(description);

  return (
    <section className="space-y-6 py-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button
        onClick={onBack}
        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        ← Edit
      </button>

      {/* Profile Card */}
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
              key={s.label}
              className="rounded-full bg-primary-foreground/15 px-3 py-1.5 text-sm font-medium backdrop-blur-sm"
            >
              {s.icon} {s.label}
            </span>
          ))}
        </div>
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
        <OpportunityCard
          tag="Fully funded"
          tagIcon={<Globe className="h-3 w-3" />}
          title="One Young World Sandoz Scholarship"
          focus="Global health equity"
          deadline="Deadline: May 19, 2026"
          reason="Your community work signals exactly the impact-driven leadership they fund."
          accent="primary"
        />
        <OpportunityCard
          tag="Fully funded"
          tagIcon={<Globe className="h-3 w-3" />}
          title="World Bank Youth Summit Delegate Programme"
          focus="SDGs & economic development"
          deadline="Applications open"
          reason="Your perspective on contribution and access is what this summit needs."
          accent="accent"
        />
        <OpportunityCard
          tag="Open to all"
          tagIcon={<Code2 className="h-3 w-3" />}
          title="Hack-Nation Global AI Hackathon"
          focus="Build real economic participation"
          deadline="No credentials required"
          reason="Builders welcome. Your hands-on skills are the only ticket needed."
          accent="primary"
        />
      </div>

      <p className="pt-4 text-center text-xs text-muted-foreground">
        More opportunities matched daily.
      </p>
    </section>
  );
};

const OpportunityCard = ({
  tag,
  tagIcon,
  title,
  focus,
  deadline,
  reason,
  accent,
}: {
  tag: string;
  tagIcon: React.ReactNode;
  title: string;
  focus: string;
  deadline: string;
  reason: string;
  accent: "primary" | "accent";
}) => {
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
      <h5 className="font-display text-xl font-600 leading-snug text-card-foreground">
        {title}
      </h5>
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

/* ---------- helpers ---------- */
function extractSkills(text: string): { label: string; icon: string }[] {
  const t = text.toLowerCase();
  const tags: { label: string; icon: string }[] = [];

  if (/(teach|train|mentor|learn|school|student)/.test(t))
    tags.push({ label: "Education & Mentorship", icon: "🎓" });
  if (/(code|develop|software|app|web|ai|data|tech|program)/.test(t))
    tags.push({ label: "Technology & Building", icon: "💻" });
  if (/(community|village|organi|volunteer|help|health|social)/.test(t))
    tags.push({ label: "Community Impact", icon: "🌍" });
  if (/(make|craft|weave|design|art|sew|cook|build|create)/.test(t))
    tags.push({ label: "Craft & Creation", icon: "✋" });
  if (/(sell|trade|market|business|shop|client|customer)/.test(t))
    tags.push({ label: "Enterprise & Trade", icon: "📈" });
  if (/(write|story|tell|speak|language|translate)/.test(t))
    tags.push({ label: "Communication", icon: "🗣️" });

  // Always show three categories
  const fallback = [
    { label: "Practical Skills", icon: "🛠️" },
    { label: "Lived Experience", icon: "🌱" },
    { label: "Initiative & Drive", icon: "⚡" },
  ];
  while (tags.length < 3) {
    const next = fallback.shift();
    if (!next) break;
    if (!tags.find((x) => x.label === next.label)) tags.push(next);
  }
  return tags.slice(0, 3);
}

export default Index;
