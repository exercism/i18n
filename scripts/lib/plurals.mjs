// Which plural categories a locale needs, and what a plural group is.
//
// English has two plural forms, and most of Exercism's target languages do
// not. Polish needs `one`, `few`, `many` and `other`; Japanese needs only
// `other`; Arabic needs all six. So a translated catalog has different keys
// from English wherever English pluralises. Comparing leaf by leaf would call a
// correct Polish catalog broken (extra keys English lacks), and a correct
// Japanese one too (missing keys English has).
//
// So parity is counted per plural group, never per leaf. English marks a key
// as plural; each locale then holds whichever categories its own grammar uses,
// and the group is present, missing, stale or done as a whole.
//
// The two catalogs spell a group differently, which is the only difference
// between them here:
//
//   backend  (Rails)    a nested hash:    `slots.filled.one`, `slots.filled.other`
//   frontend (i18next)  a key suffix:     `slotsFilled_one`,  `slotsFilled_other`
//                       and for ordinals: `place_ordinal_one`, `place_ordinal_other`
//
// Everything comes from Intl.PluralRules, whose CLDR data is built into the JS
// engine. There is no per-language table in this repo, and one should not be
// added.

export const CATEGORIES = ["zero", "one", "two", "few", "many", "other"];
const CATEGORY_SET = new Set(CATEGORIES);

const cache = new Map();

/**
 * The plural categories `locale`'s grammar uses, in CATEGORIES order, or null
 * when Intl has no CLDR data for it.
 *
 * The order is fixed here because the engine's order varies: V8 in Node 20
 * returns `pluralCategories` alphabetically (`few, many, one, other`), later V8
 * in CLDR order. The same catalog must produce the same ERRORs on every runtime.
 *
 * An unknown locale returns null because `new Intl.PluralRules("xx")` silently
 * falls back to the runtime's default locale, and using English's rules for it
 * would call an incomplete group complete.
 */
export function requiredCategories(locale, { ordinal = false } = {}) {
  const key = `${locale}|${ordinal}`;
  if (cache.has(key)) return cache.get(key);

  let categories = null;
  try {
    if (Intl.PluralRules.supportedLocalesOf(locale).length > 0) {
      const reached = new Intl.PluralRules(locale, { type: ordinal ? "ordinal" : "cardinal" }).resolvedOptions().pluralCategories;
      categories = CATEGORIES.filter((category) => reached.includes(category));
    }
  } catch {
    // A malformed tag throws. Treat it as unknown too.
  }
  cache.set(key, categories);
  return categories;
}

/**
 * Whether a category a locale's grammar does not reach may still be present.
 *
 * Only `zero`. Rails uses a `zero:` entry for a count of 0 in any locale if the
 * entry exists, and i18next does the same with `_zero`, both regardless of
 * CLDR. So `zero` is optional everywhere: never required when a language's CLDR
 * rules omit it, and never reported as unreachable. Cardinal only: neither
 * library special-cases an ordinal zero.
 */
export function isOptionalCategory(category, { ordinal = false } = {}) {
  return category === "zero" && !ordinal;
}

/**
 * How one catalog kind spells a plural key.
 *
 * `split(key)` returns `{ base, category, ordinal }` when the key is shaped like
 * a plural key, or null. The shape alone is not enough (`step_one` can be an
 * ordinary key), so callers only treat a key as plural when English has the
 * group's `other`, which both libraries require.
 */
export const PLURAL_SPELLING = {
  backend: {
    split(key) {
      const dot = key.lastIndexOf(".");
      if (dot === -1) return null;
      const category = key.slice(dot + 1);
      return CATEGORY_SET.has(category) ? { base: key.slice(0, dot), category, ordinal: false } : null;
    },
    join: (base, category) => `${base}.${category}`,
    unitId: (base) => `${base}.*`
  },
  // The per-repo metadata catalogs (scripts/lib/metadata.mjs) hold names, titles
  // and blurbs. None of it is pluralised, so no key is part of a group.
  metadata: { split: () => null, join: (base) => base, unitId: (base) => base },
  frontend: {
    split(key) {
      const match = /^(.*?)(_ordinal)?_(zero|one|two|few|many|other)$/.exec(key);
      if (!match || match[1] === "" || match[1].endsWith(":")) return null;
      return { base: match[1], category: match[3], ordinal: match[2] !== undefined };
    },
    join: (base, category, ordinal = false) => `${base}${ordinal ? "_ordinal" : ""}_${category}`,
    unitId: (base, ordinal = false) => `${base}${ordinal ? "_ordinal" : ""}_*`
  }
};
