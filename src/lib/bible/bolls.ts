export type BollsBook = {
  bookid: number;
  chronorder?: number;
  name: string;
  chapters: number;
};

export type BollsVerse = {
  bookid?: number;
  chapter?: number;
  verse?: number;
  text?: string; // HTML
};

function stripHtml(s: string) {
  return s
    .replace(/<br\s*\/?\s*>/gi, "\n")
    .replace(/<[^>]*>/g, "")
    .replace(/\s+\n/g, "\n")
    .trim();
}

function norm(s: string) {
  return s
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/\./g, "")
    .replace(/\s+/g, " ")
    .trim();
}

const booksCache = new Map<string, Promise<BollsBook[]>>();

export async function fetchBollsBooks(slug: string): Promise<BollsBook[]> {
  if (!booksCache.has(slug)) {
    booksCache.set(
      slug,
      fetch(`https://bolls.life/get-books/${encodeURIComponent(slug)}/`).then(
        async (r) => {
          if (!r.ok) throw new Error(`Failed to load books (${r.status})`);
          return (await r.json()) as BollsBook[];
        },
      ),
    );
  }
  return booksCache.get(slug)!;
}

export async function resolveBollsBookId(
  slug: string,
  candidates: string[],
): Promise<number | null> {
  const books = await fetchBollsBooks(slug);
  const byName = new Map<string, number>();
  for (const b of books) byName.set(norm(b.name), b.bookid);

  for (const c of candidates) {
    const id = byName.get(norm(c));
    if (typeof id === "number") return id;
  }

  // fuzzy contains match (very small + safe)
  for (const c of candidates) {
    const nc = norm(c);
    for (const [name, id] of byName.entries()) {
      if (name === nc) return id;
      if (name.includes(nc) || nc.includes(name)) return id;
    }
  }

  return null;
}

export async function fetchBollsChapter(
  slug: string,
  bookid: number,
  chapter: number,
): Promise<Array<{ verse: number; text: string }>> {
  const url = `https://bolls.life/get-text/${encodeURIComponent(slug)}/${bookid}/${chapter}/`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to load chapter (${res.status})`);
  const raw = (await res.json()) as BollsVerse[];

  return raw
    .map((v) => ({
      verse: Number(v.verse ?? 0),
      text: stripHtml(v.text ?? ""),
    }))
    .filter((v) => v.verse > 0 && v.text);
}
