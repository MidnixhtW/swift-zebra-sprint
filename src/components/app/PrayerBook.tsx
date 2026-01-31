import { Hand, MoonStar, Sun, Utensils } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PrayerRule } from "@/components/app/PrayerRule";

function PrayerBlock({ title, lines }: { title: string; lines: string[] }) {
  return (
    <div className="rounded-2xl border border-border/60 bg-muted/20 p-4">
      <p className="text-xs font-semibold tracking-wide text-muted-foreground">
        {title}
      </p>
      <div className="mt-2 space-y-2 text-sm leading-relaxed">
        {lines.map((l, idx) => (
          <p key={idx}>{l}</p>
        ))}
      </div>
    </div>
  );
}

const trisagion = [
  "Holy God, Holy Mighty, Holy Immortal, have mercy on us. (3x)",
  "Glory to the Father, and to the Son, and to the Holy Spirit, now and ever and unto ages of ages. Amen.",
  "O Most Holy Trinity, have mercy on us; Lord, cleanse us from our sins; Master, pardon our transgressions; Holy One, visit and heal our infirmities for Your Name's sake.",
  "Lord, have mercy. (3x)",
  "Our Father, Who art in heaven, hallowed be Thy Name. Thy kingdom come. Thy will be done on earth as it is in heaven. Give us this day our daily bread; and forgive us our trespasses, as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil.",
];

const morning = [
  "In the Name of the Father, and of the Son, and of the Holy Spirit. Amen.",
  "Glory to You, our God, glory to You.",
];

const evening = [
  "In the Name of the Father, and of the Son, and of the Holy Spirit. Amen.",
  "Glory to You, our God, glory to You.",
];

const jesus = ["Lord Jesus Christ, Son of God, have mercy on me, a sinner."];

// From: https://www.oca.org/orthodoxy/prayers/before-and-after-meals
const beforeMeals = [
  "In the name of the Father, and of the Son, and of the Holy Spirit. Amen.",
  "Our Father, Who art in Heaven, hallowed be Thy name. Thy Kingdom come. Thy will be done, on earth as it is in Heaven. Give us this day our daily bread; and forgive us our trespasses, as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil.",
  "Glory to the Father, and to the Son, and to the Holy Spirit, now and ever and unto ages of ages. Amen.",
  "Lord, have mercy. (3x)",
  "O Christ our God, bless the food, drink, and fellowship of Thy servants, for Thou art holy always, now and ever and unto ages of ages. Amen.",
];

// From: https://www.oca.org/orthodoxy/prayers/before-and-after-meals
const afterMeals = [
  "We give thanks to Thee, O Christ our God, that Thou hast satisfied us with Thy earthly blessings; deprive us not also of Thy Heavenly Kingdom.",
  "As Thou didst come to Thy disciples and didst grant them peace; so come to us and save us, O Savior.",
  "Glory to the Father, and to the Son, and to the Holy Spirit, now and ever and unto ages of ages. Amen.",
  "Lord, have mercy. (3x)",
  "Blessed is God, Who has fed and nourished us with His bountiful gifts by His grace and compassion always, now and ever and unto ages of ages. Amen.",
];

export function PrayerBook() {
  return (
    <div className="grid gap-4">
      <PrayerRule />

      <Card className="rounded-3xl border-border/60 bg-card p-5 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">Prayers</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              A short, reliable rule you can actually keep — plus OCA texts & links.
            </p>
          </div>
          <Badge className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            Everyday use
          </Badge>
        </div>

        <Separator className="my-4" />

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="morning" className="border-none">
            <AccordionTrigger className="rounded-2xl border border-border/60 bg-muted/20 px-4 text-left hover:no-underline">
              <span className="inline-flex items-center gap-2">
                <Sun className="h-4 w-4 text-primary" /> Morning
              </span>
            </AccordionTrigger>
            <AccordionContent className="pt-3">
              <div className="grid gap-3">
                <PrayerBlock title="Begin" lines={morning} />
                <PrayerBlock title="Trisagion prayers" lines={trisagion} />
                <PrayerBlock title="Jesus Prayer (optional: 10–100)" lines={jesus} />

                <div className="flex flex-wrap items-center gap-2">
                  <Button
                    asChild
                    variant="outline"
                    className="rounded-2xl border-border/60"
                  >
                    <a
                      href="https://www.oca.org/orthodoxy/prayers/morning-prayers"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Full Morning Prayers (OCA)
                    </a>
                  </Button>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="evening" className="mt-3 border-none">
            <AccordionTrigger className="rounded-2xl border border-border/60 bg-muted/20 px-4 text-left hover:no-underline">
              <span className="inline-flex items-center gap-2">
                <MoonStar className="h-4 w-4 text-primary" /> Evening
              </span>
            </AccordionTrigger>
            <AccordionContent className="pt-3">
              <div className="grid gap-3">
                <PrayerBlock title="Begin" lines={evening} />
                <PrayerBlock title="Trisagion prayers" lines={trisagion} />
                <PrayerBlock title="Jesus Prayer (optional: 10–100)" lines={jesus} />

                <div className="flex flex-wrap items-center gap-2">
                  <Button
                    asChild
                    variant="outline"
                    className="rounded-2xl border-border/60"
                  >
                    <a
                      href="https://www.oca.org/orthodoxy/prayers/evening-prayers"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Full Evening Prayers (OCA)
                    </a>
                  </Button>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="meals" className="mt-3 border-none">
            <AccordionTrigger className="rounded-2xl border border-border/60 bg-muted/20 px-4 text-left hover:no-underline">
              <span className="inline-flex items-center gap-2">
                <Utensils className="h-4 w-4 text-primary" /> Meals (OCA)
              </span>
            </AccordionTrigger>
            <AccordionContent className="pt-3">
              <div className="grid gap-3">
                <PrayerBlock title="Before meals" lines={beforeMeals} />
                <PrayerBlock title="After meals" lines={afterMeals} />

                <div className="flex flex-wrap items-center gap-2">
                  <Button
                    asChild
                    variant="outline"
                    className="rounded-2xl border-border/60"
                  >
                    <a
                      href="https://www.oca.org/orthodoxy/prayers/before-and-after-meals"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Source: Before & After Meals (OCA)
                    </a>
                  </Button>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="notes" className="mt-3 border-none">
            <AccordionTrigger className="rounded-2xl border border-border/60 bg-muted/20 px-4 text-left hover:no-underline">
              <span className="inline-flex items-center gap-2">
                <Hand className="h-4 w-4 text-primary" /> Notes for keeping it real
              </span>
            </AccordionTrigger>
            <AccordionContent className="pt-3">
              <div className="space-y-2 text-sm leading-relaxed text-muted-foreground">
                <p>
                  This app includes a short rule so you can stay consistent. For the complete
                  OCA texts, open the source links.
                </p>
                <p>
                  If you're building a larger prayer rule, do it with your priest/spiritual
                  father.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Card>
    </div>
  );
}