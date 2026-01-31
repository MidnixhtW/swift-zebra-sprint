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
    a: "Because God truly became man in Jesus Christ. Icons witness to the Incarnation and help us pray by directing honor to the person depicted (the ‘prototype’), not to wood and paint. Veneration is not worship—worship belongs to God alone.",
    sourceLabel: "OCA – Icons (The Orthodox Faith)",
    sourceUrl:
      "https://www.oca.org/orthodoxy/the-orthodox-faith/worship/the-church-building/icons",
  },
  {
    q: "Why do Orthodox ask saints to pray for them?",
    a: "The saints are alive in Christ and remain members of His one Body. Asking their intercession is like asking a faithful friend to pray—while worship is offered only to the Holy Trinity.",
    sourceLabel: "OCA – Praying to the Saints",
    sourceUrl: "https://www.oca.org/reflections/fr.-lawrence-farley/praying-to-the-saints",
  },
  {
    q: "Why do Orthodox Christians fast?",
    a: "Fasting is a spiritual discipline that supports repentance, prayer, and mercy. It’s meant to train freedom from passions and dependence on comfort—not to ‘earn’ salvation. The Church teaches fasting should be joined to almsgiving and turning away from sin.",
    sourceLabel: "OCA – Fasting (The Orthodox Faith)",
    sourceUrl:
      "https://www.oca.org/orthodoxy/the-orthodox-faith/spirituality/prayer-fasting-and-almsgiving/fasting",
  },
  {
    q: "How do I make the sign of the Cross (and why)?",
    a: "It’s a short bodily prayer that confesses the Holy Trinity and proclaims Christ’s saving Cross. Traditionally: forehead → chest → right shoulder → left shoulder.",
    sourceLabel: "OCA – Sign of the Cross",
    sourceUrl:
      "https://www.oca.org/orthodoxy/the-orthodox-faith/worship/the-church-building/sign-of-the-cross",
  },
  {
    q: "What is Holy Tradition?",
    a: "Holy Tradition is the living faith and life of the Church handed down from the apostles—Scripture is its central written expression. Orthodox Christians receive the Bible within the Church’s worship and teaching, not as an isolated document.",
    sourceLabel: "OCA – Tradition (The Orthodox Faith)",
    sourceUrl:
      "https://www.oca.org/orthodoxy/the-orthodox-faith/doctrine-scripture/sources-of-christian-doctrine/tradition",
  },
  {
    q: "What is Confession in Orthodoxy?",
    a: "Confession (Penance) is the sacramental healing of sins through repentance, spoken confession, and absolution. The priest is a witness and minister of Christ’s forgiveness, guiding the penitent back into communion.",
    sourceLabel: "OCA – The Sacrament of Confession (Q&A)",
    sourceUrl: "https://www.oca.org/questions/sacramentconfession",
  },
  {
    q: "How should I pray each day?",
    a: "Orthodox prayer is meant to be regular, simple, and attentive—formed by the Church’s worship and supported by short, consistent daily prayer. The goal is communion with God in humility and love.",
    sourceLabel: "OCA – Prayer (The Orthodox Faith)",
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
            <h2 className="text-xl font-semibold tracking-tight">Catechesis (common questions)</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Short answers, always backed up with an OCA source link.
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
