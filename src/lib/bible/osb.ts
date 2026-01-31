import type { BibleBook } from "@/lib/bible/books";

export type BaseTranslation = "kjv" | "web";
export type BibleApiTranslation = BaseTranslation | "dra";

export function translationForBook(
  book: BibleBook | undefined,
  base: BaseTranslation,
): BibleApiTranslation {
  if (!book) return base;
  if (book.forceTranslation) return book.forceTranslation;
  return base;
}

export function apiNameForBook(book: BibleBook | undefined) {
  if (!book) return "";
  return book.apiName ?? book.name;
}
