import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { BookOpen, ExternalLink, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

type BibleApiVerse = {
  book_id?: string;
  book_name?: string;
  chapter?: number;
  verse?: number;
  text?: string;
};

type BibleApiResponse = {
  reference?: string;
  text?: string;
  translation_id?: string;
  translation_name?: string;
  translation_note?: string;
  verses?: BibleApiVerse[];
};

type Translation = "web" | "kjv";

function buildBibleApiUrl(q: string, translation: Translation) {
  // bible-api.com supports CORS and simple query strings.
  const encoded = encodeURIComponent(q.trim());
  return `https://bible-api.com/${encoded}?translation=${translation}`;
}

export function OrthodoxBible() {
  const [query, setQuery] = useState("John 3:16");
  const [translation, setTranslation] = useState<Translation>("web");
  const [submitted, setSubmitted] = useState("John 3:16");

  const url = useMemo(
    () => buildBibleApiUrl(submitted, translation),
    [submitted, translation],
  );

  const q = useQuery({
    queryKey: ["bible-api", submitted, translation],
    queryFn: async () => {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Bible request failed (${res.status})`);
      return (await res.json()) as BibleApiResponse;
    },
    enabled: Boolean(submitted.trim()),
  });

  const verses = q.data?.verses ?? [];

  return (
    <div className="grid gap-4">
      <Card className="rounded-3xl border-border/60 bg-card p-5 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">Bible (reader)</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Look up passages quickly. For Orthodox canon guidance, see the OCA source.
            </p>
          </div>
          <BookOpen className="h-5 w-5 text-muted-foreground" />
        </div>

        <Separator className="my-4" />

        <div className="grid gap-3">
          <div className="flex flex-col gap-2 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Try: John 1:1-5, Psalm 50, Romans 8"
                className="h-11 rounded-2xl pl-10"
              />
            </div>
            <Button
              className="h-11 rounded-2xl"
              onClick={() => setSubmitted(query)}
            >
              Read
            </Button>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2">
            <ToggleGroup
              type="single"
              value={translation}
              onValueChange={(v) => {
                if (v) setTranslation(v as Translation);
              }}
              className="gap-2"
            >
              <ToggleGroupItem
                value="web"
                className="h-9 rounded-2xl border border-border/60 px-3 data-[state=on]:border-primary/30 data-[state=on]:bg-primary/10"
              >
                WEB
              </ToggleGroupItem>
              <ToggleGroupItem
                value="kjv"
                className="h-9 rounded-2xl border border-border/60 px-3 data-[state=on]:border-primary/30 data-[state=on]:bg-primary/10"
              >
                KJV
              </ToggleGroupItem>
            </ToggleGroup>

            <Button
              asChild
              variant="outline"
              className="h-9 rounded-2xl border-border/60"
            >
              <a
                href="https://www.oca.org/questions/scripture/canon-of-scripture"
                target="_blank"
                rel="noreferrer"
              >
                OCA: Canon of Scripture <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>

          <p className="text-xs text-muted-foreground">
            Source: "https://www.oca.org/questions/scripture/canon-of-scripture"
          </p>
        </div>
      </Card>

      <Card className="rounded-3xl border-border/60 bg-card p-5 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-semibold tracking-tight">
              {q.isLoading ? "Loading…" : q.data?.reference || "Passage"}
            </h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Translation: {q.data?.translation_name || (translation === "web" ? "World English Bible" : "King James Version")}
            </p>
          </div>
          <Button
            asChild
            variant="outline"
            className="rounded-2xl border-border/60"
          >
            <a href={url} target="_blank" rel="noreferrer">
              Open JSON <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>

        <Separator className="my-4" />

        {q.isError ? (
          <p className="text-sm text-destructive">
            Couldn’t load that passage. Try a different reference (e.g. “John 3:16”).
          </p>
        ) : q.isLoading ? (
          <p className="text-sm text-muted-foreground">Fetching passage…</p>
        ) : verses.length ? (
          <div className="space-y-3">
            {verses.map((v, idx) => (
              <p key={idx} className="text-sm leading-relaxed">
                <span className="mr-2 align-top text-xs font-semibold text-muted-foreground">
                  {v.chapter}:{v.verse}
                </span>
                <span className="text-foreground/90">{v.text?.trim()}</span>
              </p>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            No text returned. Try a different reference.
          </p>
        )}

        <p className="mt-5 text-xs text-muted-foreground">
          Bible API source: "https://bible-api.com" (CORS-enabled). Not an official OCA publication.
        </p>
      </Card>

      <Card className="rounded-3xl border-border/60 bg-card p-5 shadow-sm">
        <h3 className="text-base font-semibold tracking-tight">Orthodox note</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          The Orthodox biblical canon includes additional Old Testament books. For what the
          Church receives as Scripture and how it’s used, follow the OCA guidance.
        </p>
        <div className="mt-4">
          <Button asChild className="rounded-2xl">
            <a
              href="https://www.oca.org/questions/scripture/canon-of-scripture"
              target="_blank"
              rel="noreferrer"
            >
              Open OCA canon explanation <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Source: "https://www.oca.org/questions/scripture/canon-of-scripture"
        </p>
      </Card>
    </div>
  );
}
