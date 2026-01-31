import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  BookOpen,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Search,
  Star,
} from "lucide-react";
import { BIBLE_BOOKS } from "@/lib/bible/books";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

type BibleApiVerse = {
  book_name?: string;
  chapter?: number;
  verse?: number;
  text?: string;
};

type BibleApiResponse = {
  reference?: string;
  translation_id?: string;
  translation_name?: string;
  translation_note?: string;
  verses?: BibleApiVerse[];
};

type Translation = "web" | "kjv";

type BookmarkItem = {
  ref: string;
  translation: Translation;
  createdAt: number;
};

function bibleApiUrl(ref: string, translation: Translation) {
  const encoded = encodeURIComponent(ref.trim());
  return `https://bible-api.com/${encoded}?translation=${translation}`;
}

function bookmarksKey() {
  return "bible:bookmarks";
}

function lastReadKey() {
  return "bible:last_read";
}

function safeJsonParse<T>(raw: string | null): T | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export function OrthodoxBible() {
  const [translation, setTranslation] = useState<Translation>("web");

  // Browse mode
  const [book, setBook] = useState("John");
  const [chapter, setChapter] = useState(1);

  // Reference mode
  const [refInput, setRefInput] = useState("John 3:16");
  const [refSubmitted, setRefSubmitted] = useState("John 3:16");

  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);

  useEffect(() => {
    const saved = safeJsonParse<{
      translation?: Translation;
      book?: string;
      chapter?: number;
      ref?: string;
    }>(localStorage.getItem(lastReadKey()));

    if (saved?.translation) setTranslation(saved.translation);
    if (saved?.book) setBook(saved.book);
    if (typeof saved?.chapter === "number") setChapter(Math.max(1, saved.chapter));
    if (saved?.ref) {
      setRefInput(saved.ref);
      setRefSubmitted(saved.ref);
    }

    const savedBookmarks = safeJsonParse<BookmarkItem[]>(
      localStorage.getItem(bookmarksKey()),
    );
    setBookmarks(savedBookmarks ?? []);
  }, []);

  useEffect(() => {
    localStorage.setItem(
      lastReadKey(),
      JSON.stringify({ translation, book, chapter, ref: refSubmitted }),
    );
  }, [translation, book, chapter, refSubmitted]);

  useEffect(() => {
    localStorage.setItem(bookmarksKey(), JSON.stringify(bookmarks));
  }, [bookmarks]);

  const browseRef = `${book} ${chapter}`;
  const browseUrl = useMemo(
    () => bibleApiUrl(browseRef, translation),
    [browseRef, translation],
  );
  const refUrl = useMemo(
    () => bibleApiUrl(refSubmitted, translation),
    [refSubmitted, translation],
  );

  const browseQuery = useQuery({
    queryKey: ["bible", "browse", book, chapter, translation],
    queryFn: async () => {
      const res = await fetch(browseUrl);
      if (!res.ok) throw new Error(`Bible request failed (${res.status})`);
      return (await res.json()) as BibleApiResponse;
    },
  });

  const refQuery = useQuery({
    queryKey: ["bible", "ref", refSubmitted, translation],
    queryFn: async () => {
      const res = await fetch(refUrl);
      if (!res.ok) throw new Error(`Bible request failed (${res.status})`);
      return (await res.json()) as BibleApiResponse;
    },
    enabled: Boolean(refSubmitted.trim()),
  });

  const browseVerses = browseQuery.data?.verses ?? [];
  const browseTitle = browseQuery.data?.reference ?? browseRef;

  const isBookmarked = useMemo(() => {
    const ref = `${book} ${chapter}`;
    return bookmarks.some((b) => b.ref === ref && b.translation === translation);
  }, [book, chapter, bookmarks, translation]);

  const ot = useMemo(
    () => BIBLE_BOOKS.filter((b) => b.testament === "OT"),
    [],
  );
  const nt = useMemo(
    () => BIBLE_BOOKS.filter((b) => b.testament === "NT"),
    [],
  );

  function addBookmark(ref: string) {
    setBookmarks((prev) => {
      const next: BookmarkItem[] = [
        { ref, translation, createdAt: Date.now() },
        ...prev.filter((b) => !(b.ref === ref && b.translation === translation)),
      ];
      return next.slice(0, 80);
    });
  }

  function removeBookmark(ref: string) {
    setBookmarks((prev) =>
      prev.filter((b) => !(b.ref === ref && b.translation === translation)),
    );
  }

  return (
    <div className="grid gap-4">
      <Card className="rounded-3xl border-border/60 bg-card p-5 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">Bible</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Browse by book & chapter, or jump to a reference. Bookmarks sync to this device.
            </p>
          </div>
          <BookOpen className="h-5 w-5 text-muted-foreground" />
        </div>

        <Separator className="my-4" />

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
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

        <p className="mt-2 text-xs text-muted-foreground">
          Orthodox canon guidance source: "https://www.oca.org/questions/scripture/canon-of-scripture"
        </p>
      </Card>

      <Tabs defaultValue="browse" className="w-full">
        <TabsList className="grid w-full grid-cols-3 rounded-2xl bg-muted/30 p-1">
          <TabsTrigger value="browse" className="rounded-xl">
            <BookOpen className="mr-2 h-4 w-4" /> Browse
          </TabsTrigger>
          <TabsTrigger value="reference" className="rounded-xl">
            <Search className="mr-2 h-4 w-4" /> Reference
          </TabsTrigger>
          <TabsTrigger value="bookmarks" className="rounded-xl">
            <Star className="mr-2 h-4 w-4" /> Bookmarks
          </TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="mt-4">
          <div className="grid gap-4">
            <Card className="rounded-3xl border-border/60 bg-card p-5 shadow-sm">
              <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
                <div className="grid gap-2 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <p className="text-xs font-semibold tracking-wide text-muted-foreground">
                      Book
                    </p>
                    <Select value={book} onValueChange={setBook}>
                      <SelectTrigger className="h-11 rounded-2xl">
                        <SelectValue placeholder="Choose a book" />
                      </SelectTrigger>
                      <SelectContent className="max-h-[60vh]">
                        <div className="px-2 pb-2 pt-2 text-xs font-semibold text-muted-foreground">
                          Old Testament
                        </div>
                        {ot.map((b) => (
                          <SelectItem key={b.id} value={b.name}>
                            {b.name}
                          </SelectItem>
                        ))}
                        <div className="px-2 pb-2 pt-3 text-xs font-semibold text-muted-foreground">
                          New Testament
                        </div>
                        {nt.map((b) => (
                          <SelectItem key={b.id} value={b.name}>
                            {b.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <p className="text-xs font-semibold tracking-wide text-muted-foreground">
                      Chapter
                    </p>
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        className="h-11 w-11 rounded-2xl border-border/60 p-0"
                        onClick={() => setChapter((c) => Math.max(1, c - 1))}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Input
                        value={String(chapter)}
                        onChange={(e) => {
                          const n = Number(e.target.value);
                          if (!Number.isFinite(n)) return;
                          setChapter(Math.max(1, Math.floor(n)));
                        }}
                        inputMode="numeric"
                        className="h-11 rounded-2xl text-center"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        className="h-11 w-11 rounded-2xl border-border/60 p-0"
                        onClick={() => setChapter((c) => c + 1)}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Tip: if a chapter doesn't exist, the reader will show an error—just go back.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={isBookmarked ? "secondary" : "outline"}
                    className="h-11 rounded-2xl border-border/60"
                    onClick={() => {
                      const ref = `${book} ${chapter}`;
                      if (isBookmarked) removeBookmark(ref);
                      else addBookmark(ref);
                    }}
                  >
                    <Bookmark className="mr-2 h-4 w-4" />
                    {isBookmarked ? "Bookmarked" : "Bookmark"}
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    className="h-11 rounded-2xl border-border/60"
                  >
                    <a href={browseUrl} target="_blank" rel="noreferrer">
                      Open JSON <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="rounded-3xl border-border/60 bg-card p-5 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-base font-semibold tracking-tight">{browseTitle}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Translation: {browseQuery.data?.translation_name || "—"}
                  </p>
                </div>
                <Badge className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  Chapter
                </Badge>
              </div>

              <Separator className="my-4" />

              {browseQuery.isError ? (
                <p className="text-sm text-destructive">
                  Couldn't load {book} {chapter}. Try another chapter.
                </p>
              ) : browseQuery.isLoading ? (
                <p className="text-sm text-muted-foreground">Fetching chapter…</p>
              ) : browseVerses.length ? (
                <div className="space-y-3">
                  {browseVerses.map((v, idx) => (
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
                  No text returned.
                </p>
              )}

              <div className="mt-5 text-xs text-muted-foreground">
                Text API source: "https://bible-api.com" (CORS-enabled). Not an official OCA publication.
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reference" className="mt-4">
          <div className="grid gap-4">
            <Card className="rounded-3xl border-border/60 bg-card p-5 shadow-sm">
              <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
                <div className="grid gap-2">
                  <p className="text-xs font-semibold tracking-wide text-muted-foreground">
                    Reference
                  </p>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      value={refInput}
                      onChange={(e) => setRefInput(e.target.value)}
                      placeholder="Try: John 1:1-5, Psalm 50, Romans 8"
                      className="h-11 rounded-2xl pl-10"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") setRefSubmitted(refInput);
                      }}
                    />
                  </div>
                </div>
                <Button className="h-11 rounded-2xl" onClick={() => setRefSubmitted(refInput)}>
                  Read
                </Button>
              </div>
            </Card>

            <Card className="rounded-3xl border-border/60 bg-card p-5 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-base font-semibold tracking-tight">
                    {refQuery.isLoading ? "Loading…" : refQuery.data?.reference || refSubmitted}
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Translation: {refQuery.data?.translation_name || "—"}
                  </p>
                </div>
                <Button asChild variant="outline" className="rounded-2xl border-border/60">
                  <a href={refUrl} target="_blank" rel="noreferrer">
                    Open JSON <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>

              <Separator className="my-4" />

              {refQuery.isError ? (
                <p className="text-sm text-destructive">
                  Couldn't load that reference. Try "John 3:16".
                </p>
              ) : refQuery.isLoading ? (
                <p className="text-sm text-muted-foreground">Fetching passage…</p>
              ) : (refQuery.data?.verses?.length ?? 0) ? (
                <div className="space-y-3">
                  {(refQuery.data?.verses ?? []).map((v, idx) => (
                    <p key={idx} className="text-sm leading-relaxed">
                      <span className="mr-2 align-top text-xs font-semibold text-muted-foreground">
                        {v.chapter}:{v.verse}
                      </span>
                      <span className="text-foreground/90">{v.text?.trim()}</span>
                    </p>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No text returned.</p>
              )}
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="bookmarks" className="mt-4">
          <Card className="rounded-3xl border-border/60 bg-card p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-base font-semibold tracking-tight">Bookmarks</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Saved on this device.
                </p>
              </div>
              <Star className="h-5 w-5 text-muted-foreground" />
            </div>

            <Separator className="my-4" />

            {bookmarks.length ? (
              <div className="grid gap-2">
                {bookmarks.map((b) => (
                  <div
                    key={`${b.translation}:${b.ref}:${b.createdAt}`}
                    className="flex flex-col justify-between gap-2 rounded-2xl border border-border/60 bg-muted/20 p-4 sm:flex-row sm:items-center"
                  >
                    <div>
                      <p className="text-sm font-semibold">{b.ref}</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Translation: {b.translation.toUpperCase()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        className="rounded-2xl border-border/60"
                        onClick={() => {
                          // Load into browse if it looks like "Book Chapter"
                          const match = b.ref.match(/^(.*)\s+(\d+)$/);
                          if (match) {
                            setBook(match[1]);
                            setChapter(Number(match[2]));
                          }
                          setRefInput(b.ref);
                          setRefSubmitted(b.ref);
                        }}
                      >
                        Open
                      </Button>
                      <Button
                        variant="ghost"
                        className="rounded-2xl text-muted-foreground hover:text-foreground"
                        onClick={() => removeBookmark(b.ref)}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                No bookmarks yet. Bookmark a chapter from Browse.
              </p>
            )}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}