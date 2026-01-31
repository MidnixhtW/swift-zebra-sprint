export type BibleBook = {
  key: string;
  name: string; // display name (OSB-style)
  testament: "OT" | "NT";
  group: "OT" | "Deuterocanon" | "NT";
  aliases: string[]; // used to resolve against external APIs
};

// NOTE:
// - The Orthodox Study Bible (OSB) uses an OT based on the Septuagint and includes deuterocanonical books.
// - The OSB translation text is copyrighted; this app aligns the *book list and structure*.

export const BIBLE_BOOKS: BibleBook[] = [
  // OSB-style Old Testament (including deuterocanon)
  { key: "gen", name: "Genesis", testament: "OT", group: "OT", aliases: ["Genesis"] },
  { key: "exo", name: "Exodus", testament: "OT", group: "OT", aliases: ["Exodus"] },
  { key: "lev", name: "Leviticus", testament: "OT", group: "OT", aliases: ["Leviticus"] },
  { key: "num", name: "Numbers", testament: "OT", group: "OT", aliases: ["Numbers"] },
  { key: "deu", name: "Deuteronomy", testament: "OT", group: "OT", aliases: ["Deuteronomy"] },
  { key: "jos", name: "Joshua", testament: "OT", group: "OT", aliases: ["Joshua"] },
  { key: "jdg", name: "Judges", testament: "OT", group: "OT", aliases: ["Judges"] },
  { key: "rut", name: "Ruth", testament: "OT", group: "OT", aliases: ["Ruth"] },

  // OSB commonly uses Kingdoms naming
  {
    key: "1kgd",
    name: "1 Kingdoms",
    testament: "OT",
    group: "OT",
    aliases: ["1 Kingdoms", "1 Samuel", "I Samuel"],
  },
  {
    key: "2kgd",
    name: "2 Kingdoms",
    testament: "OT",
    group: "OT",
    aliases: ["2 Kingdoms", "2 Samuel", "II Samuel"],
  },
  {
    key: "3kgd",
    name: "3 Kingdoms",
    testament: "OT",
    group: "OT",
    aliases: ["3 Kingdoms", "1 Kings", "I Kings"],
  },
  {
    key: "4kgd",
    name: "4 Kingdoms",
    testament: "OT",
    group: "OT",
    aliases: ["4 Kingdoms", "2 Kings", "II Kings"],
  },

  {
    key: "1chr",
    name: "1 Chronicles",
    testament: "OT",
    group: "OT",
    aliases: ["1 Chronicles", "I Chronicles"],
  },
  {
    key: "2chr",
    name: "2 Chronicles",
    testament: "OT",
    group: "OT",
    aliases: ["2 Chronicles", "II Chronicles"],
  },

  // Esdras naming varies across traditions; we include OSB display names with aliases.
  {
    key: "1esd",
    name: "1 Esdras",
    testament: "OT",
    group: "Deuterocanon",
    aliases: ["1 Esdras", "I Esdras", "3 Ezra", "3 Esdras"],
  },
  {
    key: "2esd",
    name: "2 Esdras",
    testament: "OT",
    group: "OT",
    aliases: ["2 Esdras", "II Esdras", "Ezra"],
  },
  {
    key: "neh",
    name: "Nehemiah",
    testament: "OT",
    group: "OT",
    aliases: ["Nehemiah"],
  },

  {
    key: "tob",
    name: "Tobit",
    testament: "OT",
    group: "Deuterocanon",
    aliases: ["Tobit"],
  },
  {
    key: "jdt",
    name: "Judith",
    testament: "OT",
    group: "Deuterocanon",
    aliases: ["Judith"],
  },
  {
    key: "est",
    name: "Esther",
    testament: "OT",
    group: "OT",
    aliases: ["Esther"],
  },

  {
    key: "1mac",
    name: "1 Maccabees",
    testament: "OT",
    group: "Deuterocanon",
    aliases: ["1 Maccabees", "I Maccabees"],
  },
  {
    key: "2mac",
    name: "2 Maccabees",
    testament: "OT",
    group: "Deuterocanon",
    aliases: ["2 Maccabees", "II Maccabees"],
  },
  {
    key: "3mac",
    name: "3 Maccabees",
    testament: "OT",
    group: "Deuterocanon",
    aliases: ["3 Maccabees", "III Maccabees"],
  },

  { key: "psa", name: "Psalms", testament: "OT", group: "OT", aliases: ["Psalms", "Psalm"] },
  {
    key: "pro",
    name: "Proverbs",
    testament: "OT",
    group: "OT",
    aliases: ["Proverbs"],
  },
  {
    key: "ecc",
    name: "Ecclesiastes",
    testament: "OT",
    group: "OT",
    aliases: ["Ecclesiastes"],
  },
  {
    key: "sng",
    name: "Song of Songs",
    testament: "OT",
    group: "OT",
    aliases: ["Song of Songs", "Song of Solomon", "Canticles"],
  },
  { key: "job", name: "Job", testament: "OT", group: "OT", aliases: ["Job"] },
  {
    key: "wis",
    name: "Wisdom of Solomon",
    testament: "OT",
    group: "Deuterocanon",
    aliases: ["Wisdom of Solomon", "Wisdom"],
  },
  {
    key: "sir",
    name: "Sirach",
    testament: "OT",
    group: "Deuterocanon",
    aliases: ["Sirach", "Ecclesiasticus"],
  },

  { key: "isa", name: "Isaiah", testament: "OT", group: "OT", aliases: ["Isaiah"] },
  { key: "jer", name: "Jeremiah", testament: "OT", group: "OT", aliases: ["Jeremiah"] },
  {
    key: "lam",
    name: "Lamentations",
    testament: "OT",
    group: "OT",
    aliases: ["Lamentations"],
  },
  {
    key: "bar",
    name: "Baruch",
    testament: "OT",
    group: "Deuterocanon",
    aliases: ["Baruch"],
  },
  { key: "ezk", name: "Ezekiel", testament: "OT", group: "OT", aliases: ["Ezekiel"] },
  { key: "dan", name: "Daniel", testament: "OT", group: "OT", aliases: ["Daniel"] },

  { key: "hos", name: "Hosea", testament: "OT", group: "OT", aliases: ["Hosea"] },
  { key: "jol", name: "Joel", testament: "OT", group: "OT", aliases: ["Joel"] },
  { key: "amo", name: "Amos", testament: "OT", group: "OT", aliases: ["Amos"] },
  { key: "oba", name: "Obadiah", testament: "OT", group: "OT", aliases: ["Obadiah"] },
  { key: "jon", name: "Jonah", testament: "OT", group: "OT", aliases: ["Jonah"] },
  { key: "mic", name: "Micah", testament: "OT", group: "OT", aliases: ["Micah"] },
  { key: "nam", name: "Nahum", testament: "OT", group: "OT", aliases: ["Nahum"] },
  { key: "hab", name: "Habakkuk", testament: "OT", group: "OT", aliases: ["Habakkuk"] },
  { key: "zep", name: "Zephaniah", testament: "OT", group: "OT", aliases: ["Zephaniah"] },
  { key: "hag", name: "Haggai", testament: "OT", group: "OT", aliases: ["Haggai"] },
  { key: "zec", name: "Zechariah", testament: "OT", group: "OT", aliases: ["Zechariah"] },
  { key: "mal", name: "Malachi", testament: "OT", group: "OT", aliases: ["Malachi"] },

  // New Testament (OSB NT uses NKJV, but text is copyrighted; this app uses public sources)
  { key: "mat", name: "Matthew", testament: "NT", group: "NT", aliases: ["Matthew"] },
  { key: "mrk", name: "Mark", testament: "NT", group: "NT", aliases: ["Mark"] },
  { key: "luk", name: "Luke", testament: "NT", group: "NT", aliases: ["Luke"] },
  { key: "jhn", name: "John", testament: "NT", group: "NT", aliases: ["John"] },
  { key: "act", name: "Acts", testament: "NT", group: "NT", aliases: ["Acts"] },
  { key: "rom", name: "Romans", testament: "NT", group: "NT", aliases: ["Romans"] },
  { key: "1co", name: "1 Corinthians", testament: "NT", group: "NT", aliases: ["1 Corinthians", "I Corinthians"] },
  { key: "2co", name: "2 Corinthians", testament: "NT", group: "NT", aliases: ["2 Corinthians", "II Corinthians"] },
  { key: "gal", name: "Galatians", testament: "NT", group: "NT", aliases: ["Galatians"] },
  { key: "eph", name: "Ephesians", testament: "NT", group: "NT", aliases: ["Ephesians"] },
  { key: "php", name: "Philippians", testament: "NT", group: "NT", aliases: ["Philippians"] },
  { key: "col", name: "Colossians", testament: "NT", group: "NT", aliases: ["Colossians"] },
  { key: "1th", name: "1 Thessalonians", testament: "NT", group: "NT", aliases: ["1 Thessalonians", "I Thessalonians"] },
  { key: "2th", name: "2 Thessalonians", testament: "NT", group: "NT", aliases: ["2 Thessalonians", "II Thessalonians"] },
  { key: "1ti", name: "1 Timothy", testament: "NT", group: "NT", aliases: ["1 Timothy", "I Timothy"] },
  { key: "2ti", name: "2 Timothy", testament: "NT", group: "NT", aliases: ["2 Timothy", "II Timothy"] },
  { key: "tit", name: "Titus", testament: "NT", group: "NT", aliases: ["Titus"] },
  { key: "phm", name: "Philemon", testament: "NT", group: "NT", aliases: ["Philemon"] },
  { key: "heb", name: "Hebrews", testament: "NT", group: "NT", aliases: ["Hebrews"] },
  { key: "jas", name: "James", testament: "NT", group: "NT", aliases: ["James"] },
  { key: "1pe", name: "1 Peter", testament: "NT", group: "NT", aliases: ["1 Peter", "I Peter"] },
  { key: "2pe", name: "2 Peter", testament: "NT", group: "NT", aliases: ["2 Peter", "II Peter"] },
  { key: "1jn", name: "1 John", testament: "NT", group: "NT", aliases: ["1 John", "I John"] },
  { key: "2jn", name: "2 John", testament: "NT", group: "NT", aliases: ["2 John", "II John"] },
  { key: "3jn", name: "3 John", testament: "NT", group: "NT", aliases: ["3 John", "III John"] },
  { key: "jud", name: "Jude", testament: "NT", group: "NT", aliases: ["Jude"] },
  { key: "rev", name: "Revelation", testament: "NT", group: "NT", aliases: ["Revelation", "Apocalypse"] },
];

export function getBookByNameLike(input: string): BibleBook | null {
  const q = input.trim().toLowerCase();
  if (!q) return null;

  // match start
  const starts = BIBLE_BOOKS.find(
    (b) => b.name.toLowerCase() === q || b.aliases.some((a) => a.toLowerCase() === q),
  );
  if (starts) return starts;

  // fuzzy includes
  const inc = BIBLE_BOOKS.find(
    (b) =>
      b.name.toLowerCase().startsWith(q) ||
      b.aliases.some((a) => a.toLowerCase().startsWith(q)),
  );
  return inc ?? null;
}
