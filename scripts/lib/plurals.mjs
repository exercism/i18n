// Which plural categories a locale needs, and what a plural GROUP is.
//
// English has two plural forms and most of Exercism's target languages do not.
// Polish needs `one`, `few`, `many` and `other`; Japanese needs `other` alone;
// Arabic needs all six. So a translated catalog legitimately holds DIFFERENT KEYS
// from English wherever English pluralises, and key parity that compares leaf for
// leaf would call a correct Polish catalog broken twice over: extra keys English
// lacks, and (for Japanese) missing keys English has.
//
// The unit of parity is therefore the plural GROUP, never its leaves. English
// says "this key pluralises"; each locale then holds whichever categories its own
// grammar reaches, and the group is present, missing, stale or done as one thing.
//
// The two catalogs spell a group differently, and that is the only difference
// between them here:
//
//   backend  (Rails)    a nested hash:    `slots.filled.one`, `slots.filled.other`
//   frontend (i18next)  a key suffix:     `slotsFilled_one`,  `slotsFilled_other`
//                       and for ordinals: `place_ordinal_one`, `place_ordinal_other`
//
// Everything is derived from Intl.PluralRules, whose CLDR data lives in the JS
// engine. There is no per-language table in this repo and there must never be
// one.

export const CATEGORIES = ["zero", "one", "two", "few", "many", "other"];
const CATEGORY_SET = new Set(CATEGORIES);

const cache = new Map();

/**
 * The plural categories `locale`'s grammar reaches, or null when it is not a
 * locale Intl has CLDR data for.
 *
 * Null rather than a guess: `new Intl.PluralRules("xx")` silently falls back to
 * the runtime default locale, and answering an unknown locale with English's
 * rules would call a group complete that is not.
 */
export function requiredCategories(locale, { ordinal = false } = {}) {
  const key = `${locale}|${ordinal}`;
  if (cache.has(key)) return cache.get(key);

  let categories = null;
  if (Intl.PluralRules.supportedLocalesOf(locale).length > 0) {
    categories = new Intl.PluralRules(locale, { type: ordinal ? "ordinal" : "cardinal" }).resolvedOptions().pluralCategories;
  }
  cache.set(key, categories);
  return categories;
}

/**
 * Whether a category a locale's grammar does not reach may still be present.
 *
 * `zero` is the one. Rails uses a `zero:` entry for a count of 0 in any locale
 * when the entry exists, and i18next honours `_zero` the same way, both
 * independently of CLDR. So `zero` is optional everywhere, never required by a
 * language whose CLDR rules omit it, and never reported as unreachable.
 * Cardinal only: neither library special-cases an ordinal zero.
 */
export function isOptionalCategory(category, { ordinal = false } = {}) {
  return category === "zero" && !ordinal;
}

/**
 * How one catalog kind spells a plural key.
 *
 * `split(key)` returns `{ base, category, ordinal }` when the key is SHAPED like
 * a plural key, or null. Shape alone proves nothing (`step_one` is a perfectly
 * good ordinary key), so callers only treat it as plural when English has the
 * group's `other`, which both libraries require a plural to have.
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
