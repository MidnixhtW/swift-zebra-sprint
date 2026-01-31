import { ExternalLink, HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type QA = {
  q: string;
  a: string;
  sourceLabel: string;
  sourceUrl: string;
};

const QA_ITEMS: QA[] = [
  {
    q: "Why do Orthodox Christians venerate icons?",
    a: "Summary: because the Incarnation makes depicting Christ possible; icons lead us to prayer and honor the person depicted (the prototype), while worship belongs to God alone.",
    sourceLabel: "OCA source – Icons (The Orthodox Faith)",
    sourceUrl:
      "https://www.oca.org/orthodoxy/the-orthodox-faith/worship/the-church-building/icons",
  },
  {
    q: "Why do Orthodox ask saints to pray for them?",
    a: "Summary: the saints are alive in Christ and remain members of His one Body; we ask their intercession while worship is offered only to the Holy Trinity.",
    sourceLabel: "OCA source – Praying to the Saints",
    sourceUrl: "https://www.oca.org/reflections/fr.-lawrence-farley/praying-to-the-saints",
  },
  {
    q: "Why do Orthodox Christians fast?",
    a: "Summary: fasting supports repentance, prayer, and mercy; it trains freedom from passions and is meant to be joined to almsgiving and turning away from sin.",
    sourceLabel: "OCA source – Fasting (The Orthodox Faith)",
    sourceUrl:
      "https://www.oca.org/orthodoxy/the-orthodox-faith/spirituality/prayer-fasting-and-almsgiving/fasting",
  },
  {
    q: "How do I make the sign of the Cross (and why)?",
    a: "Summary: it's a short bodily prayer confessing the Trinity and proclaiming Christ's saving Cross; traditionally: forehead → chest → right shoulder → left shoulder.",
    sourceLabel: "OCA source – Sign of the Cross",
    sourceUrl:
      "https://www.oca.org/orthodoxy/the-orthodox-faith/worship/the-church-building/sign-of-the-cross",
  },
  {
    q: "What is Holy Tradition?",
    a: "Summary: Holy Tradition is the living faith and life of the Church handed down from the apostles; Scripture is its central written expression and is received within the Church.",
    sourceLabel: "OCA source – Tradition (The Orthodox Faith)",
    sourceUrl:
      "https://www.oca.org/orthodoxy/the-orthodox-faith/doctrine-scripture/sources-of-christian-doctrine/tradition",
  },
  {
    q: "What is Confession in Orthodoxy?",
    a: "Summary: Confession (Penance) is sacramental healing through repentance, confession, and absolution—restoring communion with Christ and His Church.",
    sourceLabel: "OCA source – The Sacrament of Confession (Q&A index)",
    sourceUrl: "https://www.oca.org/questions/sacramentconfession",
  },
  {
    q: "How should I pray each day?",
    a: "Summary: prayer should be regular, simple, and attentive—formed by the Church's worship, supported by a consistent daily rule, and aimed at communion with God.",
    sourceLabel: "OCA source – Prayer (The Orthodox Faith)",
    sourceUrl:
      "https://www.oca.org/orthodoxy/the-orthodox-faith/worship/the-daily-cycles-of-prayer/prayer",
  },
];

export function CatechesisQA() {
  return (
    <div className="grid gap-4">
      <Card className="rounded-3xl border-border/60 bg-card p-5 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">
              Catechesis (common questions)
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Each answer below is a brief summary — tap the OCA link for the full teaching.
            </p>
          </div>
          <HelpCircle className="h-5 w-5 text-muted-foreground" />
        </div>

        <Separator className="my-4" />

        <Accordion type="single" collapsible className="w-full">
          {QA_ITEMS.map((item, idx) => (
            <AccordionItem key={idx} value={`qa-${idx}`} className="border-none">
              <AccordionTrigger className="rounded-2xl border border-border/60 bg-muted/20 px-4 text-left hover:no-underline">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="pt-3">
                <div className="grid gap-3">
                  <p className="text-sm leading-relaxed text-foreground/90">{item.a}</p>
                  <Button
                    asChild
                    variant="outline"
                    className="w-fit rounded-2xl border-border/60"
                  >
                    <a href={item.sourceUrl} target="_blank" rel="noreferrer">
                      {item.sourceLabel} <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Card>
    </div>
  );
}