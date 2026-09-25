// Keys a locale holds and English does not: grouped for reading, never deleted.
//
// `checkCatalog` warns about every one of them, and it is right to (see the
// header of scripts/lib/checks.mjs: a catalog is expected to run ahead of
// English, and a key left over from old English looks the same). What it cannot
// do is say it briefly. There are 333 of them today, spread over four locales,
// and printing one line each buries the eighteen other warnings a run has. Two
// real defects went unnoticed inside that wall this week.
//
// So the occurrences are grouped, in the reporting layer only. What is checked
// does not change, `--json` still carries every id, and nothing here can hide
// an ERROR.
//
// ## Grouped by catalog, and by the set of keys
//
// One line for the whole run would say a number and nothing a person could act
// on. The catalog is what someone looks at next, and it is also what makes a
// rise readable: the orphans sit at a known number per catalog, so "metadata/ruby
// 5" where it read 4 yesterday says English renamed or removed something in
// ruby, which is worth seeing. The count is therefore the signal, and it is per
// catalog.
//
// One upstream rename leaves the same orphans in every locale, so a line is one
// catalog and one set of keys, and it names the locales that hold that set. That
// is 333 keys in 79 catalogs printed as about twenty lines, and a locale whose
// set differs from its siblings' still gets a line of its own.
//
// ## Only the stamped ones are grouped
//
// `checkCatalog` reports an extra key in one of two ways, and they are opposites.
// A stamped one is a standing fact: its English has been hashed, hundreds of them
// sit in the tree, and nobody acts on them one key at a time. That is what is
// grouped here.
//
// An unstamped one is rare and actionable, and it blocks a named PR in another
// repo until one command is run (see the extra-key section of
// scripts/lib/checks.mjs, and CLAUDE.md). The command names the key, the locale
// and the catalog, so grouping it would throw away the very thing a reader needs.
// It keeps its own line, printed in full against its catalog, and this block
// reconciles its total against those rather than counting them, so the numbers
// add up for someone reading both.
//
// ## Nothing here prunes
//
// Removing a key is a deletion, which this repo forbids under locales/
// (scripts/no-deletions.mjs), and whether the orphans are ever pruned is iHiD's
// decision, not a side effect of tidying the output. So these are counted and
// printed as a number, and the keys stay exactly where they are.

/**
 * Every "key not in English" warning in a run, as one group per catalog.
 *
 * @param {Array} results  validate's per-catalog results
 * @returns {Array} `{ locale, type, keys }`, the heaviest first
 */
export function summariseExtraKeys(results) {
  const groups = [];
  for (const result of results) {
    const keys = result.issues.filter((found) => found.extraKey && !found.neverStamped).map((found) => found.extraKey);
    if (keys.length > 0) groups.push({ locale: result.locale, type: result.type, keys });
  }
  const order = (a, b) => b.keys.length - a.keys.length || (a.locale < b.locale ? -1 : a.locale > b.locale ? 1 : 0) || (a.type < b.type ? -1 : 1);
  return groups.sort(order);
}

/**
 * The lines to print: one catalog and one set of keys, with the locales holding
 * that set. Also what the run counts as warnings, because it is what a person is
 * asked to read.
 *
 * @returns {Array} `{ type, count, keys, locales }`, the heaviest first
 */
export function extraKeyRows(groups) {
  const rows = new Map();
  for (const group of groups) {
    const keys = [...group.keys].sort();
    const at = `${group.type}\u0000${keys.join("\u0000")}`;
    const row = rows.get(at) ?? { type: group.type, count: keys.length, keys, locales: [] };
    row.locales.push(group.locale);
    rows.set(at, row);
  }
  const order = (a, b) => b.count - a.count || (a.type < b.type ? -1 : a.type > b.type ? 1 : 0) || (a.locales[0] < b.locales[0] ? -1 : 1);
  return [...rows.values()].map((row) => ({ ...row, locales: row.locales.sort() })).sort(order);
}

/** Extra keys that have never been stamped, which print one line each. */
export function countNeverStamped(results) {
  return results.reduce((sum, result) => sum + result.issues.filter((found) => found.neverStamped).length, 0);
}

/**
 * The summary block, as lines.
 *
 * `neverStamped` is how many extra keys printed their own line above, so that a
 * reader adding the two up gets every extra key the run found.
 */
export function renderExtraKeys(groups, { neverStamped = 0 } = {}) {
  if (groups.length === 0) return [];
  const total = groups.reduce((sum, group) => sum + group.keys.length, 0);
  const perLocale = new Map();
  for (const group of groups) perLocale.set(group.locale, (perLocale.get(group.locale) ?? 0) + group.keys.length);
  const held = [...perLocale.entries()].sort(([a], [b]) => (a < b ? -1 : 1)).map(([locale, count]) => `${locale} ${count}`).join(", ");
  const lines = ["", `Keys not in English: ${total} in ${groups.length} catalog(s) (${held}):`];
  for (const row of extraKeyRows(groups)) lines.push(`  ${row.type.padEnd(20)} ${String(row.count).padStart(4)} key(s)  ${row.locales.join(" ")}`);
  lines.push(`  Each is fine while English catches up, and left over from old English if it never arrives.`);
  lines.push(`  A count that has risen is English having renamed or removed something. Nothing here is deleted; --json lists every id.`);
  if (neverStamped > 0) {
    lines.push(`  ${neverStamped} further key(s) English does not have printed in full above, because they have never been stamped and one command each ends them.`);
  }
  return lines;
}
