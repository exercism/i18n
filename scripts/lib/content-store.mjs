// Walking one locale's blob-id content store.
//
// `locales/<locale>/content/` holds nothing but `<ab>/<cd>/<36 hex>.<ext>` files.
// This lists what is actually there, including what should not be, so validate
// can name a stray file rather than never seeing it.

import fs from "node:fs";
import path from "node:path";
import { contentRoot, parseContentRelativePath } from "./content-types.mjs";

function* walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true }).sort((a, b) => (a.name < b.name ? -1 : 1))) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

/**
 * Every file under one locale's content root, as
 * `{ file, relative, id, extension }`. `id` is null for a file whose path is not
 * a well-formed blob-id path.
 */
export function listContentFiles(locale) {
  const root = contentRoot(locale);
  if (!fs.existsSync(root)) return [];
  return [...walk(root)]
    .filter((file) => path.basename(file) !== ".gitkeep")
    .map((file) => {
      const relative = path.relative(root, file).split(path.sep).join("/");
      const parsed = parseContentRelativePath(relative);
      return { file, relative, id: parsed?.id ?? null, extension: parsed?.extension ?? path.extname(file) };
    });
}

/** The blob ids one locale holds, as a Map of id -> extension. */
export function heldContent(locale) {
  return new Map(
    listContentFiles(locale)
      .filter((entry) => entry.id !== null)
      .map((entry) => [entry.id, entry.extension])
  );
}
