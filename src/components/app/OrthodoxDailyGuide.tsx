import {
  ExternalLink,
  HeartHandshake,
  ScrollText,
  Sparkles,
  HandCoins,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

function GuideCard({
  title,
  description,
  bullets,
  sourceLabel,
  sourceUrl,
}: {
  title: string;
  description: string;
  bullets: string[];
  sourceLabel: string;
  sourceUrl: string;
}) {
  return (
    <Card className="rounded-3xl border-border/60 bg-card p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-base font-semibold tracking-tight">{title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        </div>
        <Sparkles className="h-5 w-5 text-muted-foreground" />
      </div>

      <Separator className="my-4" />

      <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed">
        {bullets.map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <Button asChild variant="outline" className="rounded-2xl border-border/60">
          <a href={sourceUrl} target="_blank" rel="noreferrer">
            {sourceLabel} <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </Button>
        <div className="text-xs text-muted-foreground">Source: "{sourceUrl}"</div>
      </div>
    </Card>
  );
}

export function OrthodoxDailyGuide() {
  return (
    <div className="grid gap-4">
      <Card className="rounded-3xl border-border/60 bg-card p-5 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">Daily Orthodox life</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              A practical rhythm (prayer • Scripture • fasting • almsgiving • worship) with OCA sources.
            </p>
          </div>
          <HeartHandshake className="h-5 w-5 text-muted-foreground" />
        </div>

        <Separator className="my-4" />

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-border/60 bg-muted/20 p-4">
            <p className="text-xs font-semibold tracking-wide text-muted-foreground">Morning</p>
            <p className="mt-1 text-sm">Pray briefly, then read the day's Scripture.</p>
          </div>
          <div className="rounded-2xl border border-border/60 bg-muted/20 p-4">
            <p className="text-xs font-semibold tracking-wide text-muted-foreground">Day</p>
            <p className="mt-1 text-sm">Keep attention: a short Jesus Prayer, small acts of mercy.</p>
          </div>
          <div className="rounded-2xl border border-border/60 bg-muted/20 p-4">
            <p className="text-xs font-semibold tracking-wide text-muted-foreground">Meals</p>
            <p className="mt-1 text-sm">Bless, give thanks, and follow the fast as able.</p>
          </div>
          <div className="rounded-2xl border border-border/60 bg-muted/20 p-4">
            <p className="text-xs font-semibold tracking-wide text-muted-foreground">Evening</p>
            <p className="mt-1 text-sm">Thank God, repent simply, and forgive.</p>
          </div>
        </div>
      </Card>

      <GuideCard
        title="Prayer (how to keep a rule)"
        description="Keep it short, regular, and attentive—then grow with guidance."
        bullets={[
          "Choose a small daily rule you can keep (morning + evening).",
          "Use the Church's words (common prayers) instead of inventing your own each day.",
          "Aim for attention and humility more than length.",
          "If you expand your rule, do it with pastoral guidance.",
        ]}
        sourceLabel="OCA – Prayer (The Orthodox Faith)"
        sourceUrl="https://www.oca.org/orthodoxy/the-orthodox-faith/worship/the-daily-cycles-of-prayer/prayer"
      />

      <GuideCard
        title="Fasting (purpose & practice)"
        description="Fasting is for repentance and love—not for pride or comparison."
        bullets={[
          "Fast to train the heart (repentance, self-control), not to win arguments.",
          "Join fasting to prayer and mercy—otherwise it becomes empty.",
          "Ask your priest for a blessing if health or life circumstances require adjustments.",
        ]}
        sourceLabel="OCA – Orthodox Fasting (Q&A)"
        sourceUrl="https://www.oca.org/questions/dailylife/orthodox-fasting"
      />

      <Card className="rounded-3xl border-border/60 bg-card p-5 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-base font-semibold tracking-tight">Almsgiving (mercy in practice)</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Keep it concrete: time, attention, money, forgiveness.
            </p>
          </div>
          <HandCoins className="h-5 w-5 text-muted-foreground" />
        </div>

        <Separator className="my-4" />

        <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed">
          <li>Give quietly; don't curate an image of generosity.</li>
          <li>Make mercy practical: a person, a place, a habit.</li>
          <li>Let almsgiving and fasting support each other (less for me → more for others).</li>
        </ul>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Button asChild variant="outline" className="rounded-2xl border-border/60">
            <a
              href="https://www.oca.org/orthodoxy/the-orthodox-faith/spirituality/prayer-fasting-and-almsgiving/almsgiving"
              target="_blank"
              rel="noreferrer"
            >
              OCA – Almsgiving <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
          <div className="text-xs text-muted-foreground">
            Source: "https://www.oca.org/orthodoxy/the-orthodox-faith/spirituality/prayer-fasting-and-almsgiving/almsgiving"
          </div>
        </div>
      </Card>

      <GuideCard
        title="Scripture (how Orthodox read the Bible)"
        description="Read Scripture inside the Church's life: worship, saints, and tradition."
        bullets={[
          "Keep the Gospels central; read the daily lections.",
          "Let the Church's worship teach you how to interpret Scripture.",
          "Use reliable commentaries; avoid speculative 'end-times' sensationalism.",
        ]}
        sourceLabel="OCA – Bible (Q&A)"
        sourceUrl="https://www.oca.org/questions/scripture/bible"
      />

      <GuideCard
        title="Divine Liturgy (the center)"
        description="The Liturgy isn't background music—it's the Church's offering and Communion with Christ."
        bullets={[
          "Arrive early if possible; stay for the whole service when you can.",
          "Listen for the Scripture readings; offer your life with the gifts.",
          "Prepare for Communion with prayer, fasting, repentance, and guidance.",
        ]}
        sourceLabel="OCA – The Divine Liturgy (Q&A)"
        sourceUrl="https://www.oca.org/questions/divineliturgy/the-divine-liturgy"
      />

      <GuideCard
        title="Confession & healing"
        description="Confession is sacramental healing: repentance spoken honestly before God with a priest present."
        bullets={[
          "Confess to God in the presence of a priest as witness and pastor.",
          "Be concrete, humble, and brief—avoid self-justification.",
          "Ask for a simple rule to keep between confessions.",
        ]}
        sourceLabel="OCA – Confessing in the Presence of a Priest (Q&A)"
        sourceUrl="https://www.oca.org/questions/sacramentconfession/confessing-in-the-presence-of-a-priest"
      />

      <Card className="rounded-3xl border-border/60 bg-card p-5 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-base font-semibold tracking-tight">Catechism (deeper study)</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              A longer-format manual for adult instruction (OCA PDF).
            </p>
          </div>
          <ScrollText className="h-5 w-5 text-muted-foreground" />
        </div>
        <Separator className="my-4" />
        <div className="flex flex-wrap items-center gap-2">
          <Button asChild className="rounded-2xl">
            <a
              href="https://www.oca.org/cdn/PDFs/2023-0609-EOCB.pdf"
              target="_blank"
              rel="noreferrer"
            >
              Open catechism PDF <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
          <div className="text-xs text-muted-foreground">
            Source: "https://www.oca.org/cdn/PDFs/2023-0609-EOCB.pdf"
          </div>
        </div>
      </Card>
    </div>
  );
}