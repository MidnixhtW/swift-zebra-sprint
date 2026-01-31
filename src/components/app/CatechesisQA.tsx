import { useMemo, useState } from "react";
import { ExternalLink, HelpCircle, Search } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Category =
  | "All"
  | "Prayer"
  | "Worship"
  | "Sacraments"
  | "Scripture"
  | "Daily life"
  | "Saints & icons"
  | "Death & funerals";

type QA = {
  category: Category;
  q: string;
  a: string;
  sourceLabel: string;
  sourceUrl: string;
};

const QA_ITEMS: QA[] = [
  {
    category: "Worship",
    q: "What is the Divine Liturgy?",
    a: [
      "The Divine Liturgy is the Church's central act of worship, where the faithful gather to hear the Scriptures, offer thanksgiving, and receive Holy Communion.",
      "In practice, it's not something you 'watch'—it's something you participate in with attention: prayer, singing, listening, offering your life to God, and (when blessed and prepared) receiving the Eucharist.",
      "Use this app's Readings tab to follow the lections, then bring that attention into the Liturgy on Sunday (and feast days).",
    ].join("\n\n"),
    sourceLabel: "OCA – The Divine Liturgy (Q&A)",
    sourceUrl: "https://www.oca.org/questions/divineliturgy/the-divine-liturgy",
  },
  {
    category: "Worship",
    q: "Why is it important to participate in the entire Divine Liturgy?",
    a: [
      "The Liturgy is a single, unified act of the Church—not separate 'pieces' to drop into.",
      "Arriving early and staying through the dismissal trains attention, keeps the service from becoming a private 'drive-through,' and helps the community pray as one Body.",
      "If you're building consistency: aim for the whole service, even when you can't receive Communion.",
    ].join("\n\n"),
    sourceLabel: "OCA – Participation in the entire Divine Liturgy (Q&A)",
    sourceUrl:
      "https://www.oca.org/questions/divineliturgy/participation-in-the-entire-divine-liturgy",
  },
  {
    category: "Sacraments",
    q: "What are the sacraments in Orthodoxy?",
    a: [
      "Orthodox Christians speak of 'mysteries' (sacraments) as the Church's life in Christ—God's grace working through visible actions.",
      "The OCA's Q&A gives an overview that includes Baptism and Chrismation (entry into the Church), Eucharist (center), Confession (healing), Marriage and Priesthood (service), and Holy Unction (healing).",
      "A helpful way to use this app: keep the daily rhythm (prayer and Scripture) so Sunday worship and the sacraments are lived—not just studied.",
    ].join("\n\n"),
    sourceLabel: "OCA – The Sacraments (Q&A)",
    sourceUrl: "https://www.oca.org/questions/sevensacraments/the-sacraments",
  },
  {
    category: "Sacraments",
    q: "What is Chrismation?",
    a: [
      "Chrismation is the sealing of the gift of the Holy Spirit—often described as a person's 'personal Pentecost.'",
      "It is normally joined to Baptism (especially for infants), and it completes initiation into the Church's sacramental life.",
    ].join("\n\n"),
    sourceLabel: "OCA – Seven Sacraments (Q&A)",
    sourceUrl: "https://www.oca.org/questions/sevensacraments/seven-sacraments",
  },
  {
    category: "Sacraments",
    q: "How are people usually received into the OCA from other Christian groups?",
    a: [
      "Reception depends on the person's background, and the Church applies pastoral discernment.",
      "The OCA Q&A discusses recognition of Trinitarian baptism and common reception by Chrismation (along with confession and Eucharist), rather than a one-size-fits-all approach.",
      "Always handle this with your priest (not internet checklists).",
    ].join("\n\n"),
    sourceLabel: "OCA – Questions on the Sacraments (Q&A)",
    sourceUrl: "https://www.oca.org/questions/sevensacraments/questions-on-the-sacraments",
  },
  {
    category: "Sacraments",
    q: "How should I think about preparing for Communion?",
    a: [
      "Preparation is not only a personal feeling; it's a Church practice: prayer, fasting, repentance, and obedience to your priest's guidance.",
      "The OCA's Communion questions emphasize pastoral preparation and avoiding rigid, universal rules that ignore a person's actual situation.",
    ].join("\n\n"),
    sourceLabel: "OCA – Communion Questions (Q&A)",
    sourceUrl: "https://www.oca.org/questions/divineliturgy/communion-questions",
  },
  {
    category: "Sacraments",
    q: "How often should I receive Holy Communion?",
    a: [
      "There isn't a single number for everyone. The OCA Q&A addresses frequency together with preparation (prayer, fasting, repentance, confession) and the guidance of your priest.",
      "A good 'app rule' is: focus on preparing well and participating fully—frequency follows with pastoral direction.",
    ].join("\n\n"),
    sourceLabel: "OCA – Frequency of Communion (Q&A)",
    sourceUrl: "https://www.oca.org/questions/divineliturgy/frequency-of-communion",
  },
  {
    category: "Sacraments",
    q: "Why confess in the presence of a priest?",
    a: [
      "Orthodox Christians confess to God, in the presence of a priest, for healing and reconciliation.",
      "The priest is a witness for the Church and a pastor who can guide and support repentance; absolution is a sacramental act of the Church.",
    ].join("\n\n"),
    sourceLabel: "OCA – Confessing in the Presence of a Priest (Q&A)",
    sourceUrl:
      "https://www.oca.org/questions/sacramentconfession/confessing-in-the-presence-of-a-priest",
  },
  {
    category: "Sacraments",
    q: "Do I need 'proof of confession'?",
    a: [
      "The OCA Q&A addresses 'proof of confession' in the context of pastoral care and the relationship between a father-confessor and a parish priest.",
      "In general, don't treat confession as a bureaucratic transaction; treat it as a healing practice under guidance.",
    ].join("\n\n"),
    sourceLabel: "OCA – Proof of Confession (Q&A)",
    sourceUrl: "https://www.oca.org/questions/sacramentconfession/proof-of-confession",
  },
  {
    category: "Sacraments",
    q: "How are baptismal names chosen?",
    a: [
      "The OCA Q&A explains the practice of choosing baptismal (Christian) names, commonly connected to saints and the Church's calendar.",
      "A practical approach: choose a name you can pray with—a saint you can actually learn from and ask for intercession.",
    ].join("\n\n"),
    sourceLabel: "OCA – Baptismal Names (Q&A)",
    sourceUrl: "https://www.oca.org/questions/sevensacraments/baptismal-names",
  },
  {
    category: "Saints & icons",
    q: "Why do Orthodox Christians venerate icons?",
    a: [
      "Because the Word truly became flesh: the Incarnation makes depicting Christ possible and meaningful.",
      "Icons are 'windows' that help us pray and remember the Kingdom. Honor shown to an icon goes to the person depicted (the prototype), not to wood and paint.",
      "Veneration is not worship—worship belongs to God alone.",
    ].join("\n\n"),
    sourceLabel: "OCA – Icons (The Orthodox Faith)",
    sourceUrl:
      "https://www.oca.org/orthodoxy/the-orthodox-faith/worship/the-church-building/icons",
  },
  {
    category: "Saints & icons",
    q: "Why ask saints to pray for us?",
    a: [
      "The saints are alive in Christ and remain members of His one Body.",
      "Asking for their intercession is like asking a faithful friend to pray—but with the confidence that the saint is already glorified in Christ.",
      "This does not replace prayer to God; it supports it.",
    ].join("\n\n"),
    sourceLabel: "OCA – Mary / Prayer / Death (Q&A)",
    sourceUrl: "https://www.oca.org/questions/teaching/mary-prayer-death",
  },
  {
    category: "Saints & icons",
    q: "What does the OCA say about kissing icons / a common spoon?",
    a: [
      "The OCA Q&A discusses practical concerns about kissing icons and receiving from the common chalice and spoon.",
      "Because situations differ (health, local guidance, pastoral direction), treat this as a pastoral question rather than a social-media debate.",
    ].join("\n\n"),
    sourceLabel: "OCA – Common Chalice & Spoon / Kissing Icons (Q&A)",
    sourceUrl:
      "https://www.oca.org/questions/divineliturgy/common-chalice-spoon-kissing-icons",
  },
  {
    category: "Saints & icons",
    q: "How does the OCA describe the Theotokos (Mary)?",
    a: [
      "The OCA provides multiple Q&As and articles on the Theotokos.",
      "A useful way to keep things clear: Orthodox honor (veneration) is distinct from worship, and devotion to the Theotokos always leads us to Christ.",
    ].join("\n\n"),
    sourceLabel: "OCA – Sinlessness of Mary (Q&A)",
    sourceUrl: "https://www.oca.org/questions/saints/sinlessness-of-mary",
  },
  {
    category: "Daily life",
    q: "Why do Orthodox Christians fast?",
    a: [
      "Fasting is a spiritual discipline that supports repentance, prayer, and mercy.",
      "It is meant to train freedom from passions and dependency on comfort—not to 'earn' salvation.",
      "Fasting without mercy and repentance becomes empty; fasting with humility becomes medicine.",
    ].join("\n\n"),
    sourceLabel: "OCA – Orthodox Fasting (Q&A)",
    sourceUrl: "https://www.oca.org/questions/dailylife/orthodox-fasting",
  },
  {
    category: "Daily life",
    q: "What's the point of Lenten fasting?",
    a: [
      "Great Lent prepares the faithful for Pascha through repentance and a more focused way of life.",
      "The OCA Q&A discusses the traditional abstentions and also the need for pastoral adjustments when needed.",
    ].join("\n\n"),
    sourceLabel: "OCA – Lenten Fasting (Q&A)",
    sourceUrl: "https://www.oca.org/questions/dailylife/lenten-fasting",
  },
  {
    category: "Daily life",
    q: "What is Holy Tradition (and how is it different from customs)?",
    a: [
      "Holy Tradition is the living faith and life of the Church handed down from the apostles.",
      "Customs vary by time and place; Holy Tradition concerns the faith, worship, and sacramental life of the Church.",
      "When in doubt: learn your parish's practice and ask your priest.",
    ].join("\n\n"),
    sourceLabel: "OCA – Holy Tradition vs. Customs (Q&A)",
    sourceUrl: "https://www.oca.org/questions/dailylife/holy-tradition-vs.-customs",
  },
  {
    category: "Daily life",
    q: "What does the OCA say about the Rosary?",
    a: [
      "The OCA Q&A notes that the Roman Catholic Rosary is not an Orthodox devotion in its present form.",
      "Orthodox Christians commonly use the Jesus Prayer and a prayer rope as a simple practice of repeating prayer with attention.",
    ].join("\n\n"),
    sourceLabel: "OCA – The Rosary (Q&A)",
    sourceUrl: "https://www.oca.org/questions/romancatholicism/the-rosary",
  },
  {
    category: "Worship",
    q: "Is 'Easter' a pagan feast?",
    a: [
      "The OCA Q&A addresses the claim that 'Easter' is pagan and clarifies the Christian meaning of the feast (Pascha).",
      "In daily life, the key is the content: the celebration of Christ's Resurrection.",
    ].join("\n\n"),
    sourceLabel: "OCA – Is 'Easter' a pagan feast? (Q&A)",
    sourceUrl: "https://www.oca.org/questions/liturgicalyear/is-easter-a-pagan-feast",
  },
  {
    category: "Scripture",
    q: "How does Orthodoxy understand the Bible?",
    a: [
      "The OCA describes the Bible as 'the book of the Church'—received, read, and interpreted within the Church's worship and teaching.",
      "The Gospels are central, and the Old Testament is understood as pointing to and fulfilled in Christ.",
    ].join("\n\n"),
    sourceLabel: "OCA – Bible (Q&A)",
    sourceUrl: "https://www.oca.org/questions/scripture/bible",
  },
  {
    category: "Scripture",
    q: "Should Orthodox Christians study the Bible outside of church services?",
    a: [
      "Yes—personal and group study can be deeply helpful when it remains connected to the Church's faith.",
      "The OCA Q&A encourages Scripture study and points readers toward responsible approaches (not speculative interpretations).",
    ].join("\n\n"),
    sourceLabel: "OCA – Study of the Bible (Q&A)",
    sourceUrl: "https://www.oca.org/questions/scripture/study-of-the-bible",
  },
  {
    category: "Scripture",
    q: "What is the Orthodox canon of Scripture?",
    a: [
      "The OCA Q&A discusses the canon of Scripture and the Orthodox Old Testament canon (including books sometimes called 'Apocrypha' or 'Deuterocanonical').",
      "If you want a practical habit: focus on the daily lections and Psalms, then deepen with guidance.",
    ].join("\n\n"),
    sourceLabel: "OCA – Canon of Scripture (Q&A)",
    sourceUrl: "https://www.oca.org/questions/scripture/canon-of-scripture",
  },
  {
    category: "Worship",
    q: "Why make the sign of the Cross?",
    a: [
      "It is a brief bodily prayer that confesses the Holy Trinity and proclaims Christ's saving Cross.",
      "The gesture trains the mind and body to remember God, not just the intellect.",
    ].join("\n\n"),
    sourceLabel: "OCA – Sign of the Cross (The Orthodox Faith)",
    sourceUrl:
      "https://www.oca.org/orthodoxy/the-orthodox-faith/worship/the-church-building/sign-of-the-cross",
  },
  {
    category: "Worship",
    q: "Why do Orthodox cross right-to-left?",
    a: [
      "The OCA Q&A notes that Eastern Christians traditionally cross right-to-left, while the West commonly goes left-to-right today.",
      "Historically, the West once crossed the same way as the East; the exact reason for later reversal is not firmly established.",
    ].join("\n\n"),
    sourceLabel: "OCA – Sign of the Cross Direction (Q&A)",
    sourceUrl: "https://www.oca.org/questions/teaching/sign-of-the-cross-direction",
  },
  {
    category: "Death & funerals",
    q: "What does the OCA say about cremation?",
    a: [
      "The OCA Q&A explains that the Church normally prefers burial, connected to the Christian hope of resurrection.",
      "It also notes there have been rare circumstances where cremation happened by necessity or economia.",
      "For a real-life decision, this should be handled pastorally with your priest.",
    ].join("\n\n"),
    sourceLabel: "OCA – Cremation (Q&A)",
    sourceUrl: "https://www.oca.org/questions/deathfunerals/cremation",
  },
  {
    category: "Sacraments",
    q: "Where can I find many questions about marriage in the OCA?",
    a: [
      "The OCA has a dedicated Q&A index for the Sacrament of Marriage.",
      "Use it when you need specifics (non-Orthodox spouse, divorce/remarriage, wedding rite, etc.), since these situations often require pastoral guidance.",
    ].join("\n\n"),
    sourceLabel: "OCA – The Sacrament of Marriage (Q&A index)",
    sourceUrl: "https://www.oca.org/questions/sacramentmarriage",
  },
];

export function CatechesisQA() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category>("All");

  const categories: Category[] = useMemo(
    () => [
      "All",
      "Prayer",
      "Worship",
      "Sacraments",
      "Scripture",
      "Daily life",
      "Saints & icons",
      "Death & funerals",
    ],
    [],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return QA_ITEMS.filter((item) => {
      const categoryOk = category === "All" ? true : item.category === category;
      if (!categoryOk) return false;
      if (!q) return true;
      const hay = `${item.q}\n${item.a}\n${item.sourceLabel}\n${item.sourceUrl}`.toLowerCase();
      return hay.includes(q);
    });
  }, [query, category]);

  return (
    <div className="grid gap-4">
      <Card className="rounded-3xl border-border/60 bg-card p-5 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">Catechesis (Q&A)</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Expanded summaries + direct OCA sources. Use search to find a topic fast.
            </p>
          </div>
          <HelpCircle className="h-5 w-5 text-muted-foreground" />
        </div>

        <Separator className="my-4" />

        <div className="grid gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search (e.g., confession, icons, fasting, Bible…)"
              className="h-11 rounded-2xl pl-10"
            />
          </div>

          <Tabs value={category} onValueChange={(v) => setCategory(v as Category)}>
            <TabsList className="w-full flex-wrap justify-start rounded-2xl bg-muted/30 p-1">
              {categories.map((c) => (
                <TabsTrigger key={c} value={c} className="rounded-xl">
                  {c}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <div className="text-xs text-muted-foreground">
            Not seeing your question? Browse the full OCA index: "https://www.oca.org/questions"
          </div>
        </div>
      </Card>

      <Card className="rounded-3xl border-border/60 bg-card p-5 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-base font-semibold tracking-tight">
            Questions ({filtered.length})
          </h3>
          <Button asChild variant="outline" className="rounded-2xl border-border/60">
            <a href="https://www.oca.org/questions" target="_blank" rel="noreferrer">
              Open OCA Q&A index <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>

        <Separator className="my-4" />

        <Accordion type="single" collapsible className="w-full">
          {filtered.map((item, idx) => (
            <AccordionItem key={idx} value={`qa-${idx}`} className="border-none">
              <AccordionTrigger className="rounded-2xl border border-border/60 bg-muted/20 px-4 text-left hover:no-underline">
                <div className="flex w-full items-center justify-between gap-3">
                  <span>{item.q}</span>
                  <span className="hidden rounded-full bg-primary/10 px-3 py-1 text-[11px] font-semibold text-primary sm:inline-flex">
                    {item.category}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-3">
                <div className="grid gap-3">
                  <p className="whitespace-pre-line text-sm leading-relaxed text-foreground/90">
                    {item.a}
                  </p>

                  <div className="grid gap-2">
                    <Button
                      asChild
                      variant="outline"
                      className="w-fit rounded-2xl border-border/60"
                    >
                      <a href={item.sourceUrl} target="_blank" rel="noreferrer">
                        {item.sourceLabel} <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                    <div className="text-xs text-muted-foreground">
                      Source: "{item.sourceUrl}"
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Card>
    </div>
  );
}