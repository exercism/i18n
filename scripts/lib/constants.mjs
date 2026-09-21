// Constants shared by every script in this repo. Anything more than one script
// needs to agree on lives here.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

/** Where the scripts themselves live. Never overridden. */
export const SCRIPTS_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");

/**
 * The tree the scripts operate on: `locales/`, `locales.json` and
 * `website-exclusions.json`.
 *
 * It is this repo, unless `EXERCISM_I18N_ROOT` names another directory.
 * `scripts/test.mjs` uses that to run the real scripts over a fixture tree it
 * builds in a temp directory, where it controls exactly which locales and
 * files exist.
 */
export const REPO_ROOT = process.env.EXERCISM_I18N_ROOT ? path.resolve(process.env.EXERCISM_I18N_ROOT) : SCRIPTS_ROOT;

export const LOCALES_DIR = path.join(REPO_ROOT, "locales");

/** The locale English is called wherever a locale segment names it. */
export const SOURCE_LOCALE = "en";

const config = JSON.parse(fs.readFileSync(path.join(REPO_ROOT, "locales.json"), "utf8"));

/** Locales this repo actively translates into. Never includes English. */
export const TARGET_LOCALES = config.targets;

/** Locales queued for future work, not yet translated here. */
export const PLANNED_LOCALES = config.plannedTargets ?? [];

/**
 * Checks `productionTargets` when this module loads.
 *
 * This list decides which locales gate, so a mistake in it fails silently: the
 * run passes having stopped checking a live language. Two mistakes cause that:
 *
 *  - a locale `targets` does not include (a casing slip such as "pt-br" for
 *    "pt-BR", or an old code) drops that locale out of the production set;
 *  - a missing or non-array list empties the set without anyone deciding it
 *    should be empty.
 *
 * An empty list is allowed here, unlike in Jiki's repo, which this was forked
 * from. It was this repo's state until `hu` was added. Every gating script
 * prints `productionGateNotice()` when it is empty, so the state is visible and
 * not mistaken for a pass.
 *
 * It returns the message, and the caller below makes it fatal. Returning it
 * lets `scripts/test.mjs` test each case without editing locales.json or
 * starting a subprocess.
 *
 * @returns {string|null} the failure message, or null if the list is sound.
 */
export function productionLocaleIssue(productionTargets, targetLocales) {
  if (!Array.isArray(targetLocales)) return `locales.json "targets" must be an array of locale codes.`;
  if (!Array.isArray(productionTargets)) {
    return (
      `locales.json "productionTargets" is ${productionTargets === undefined ? "missing" : `not an array (got ${JSON.stringify(productionTargets)})`}. ` +
      `It must be an array of locale codes: it is the list validate.mjs and completeness.mjs gate on. ` +
      `An empty array is allowed and means "no locale is in production yet"; an absent one is a mistake.`
    );
  }
  const strays = productionTargets.filter((locale) => !targetLocales.includes(locale));
  if (strays.length > 0) {
    return (
      `locales.json "productionTargets" lists ${strays.length === 1 ? "a locale" : "locales"} that "targets" does not: ` +
      `${strays.join(", ")}. Every production locale must be a target locale, and a code that matches nothing silently ` +
      `drops out of the gate (check the casing: "pt-BR", not "pt-br"). Known targets: ${targetLocales.join(", ") || "(none)"}`
    );
  }
  const english = [...targetLocales, ...productionTargets].filter((locale) => /^en(-|$)/i.test(locale));
  if (english.length > 0) return `locales.json lists English ("${english[0]}") as a target. English is never stored in this repo.`;
  return null;
}

const productionIssue = productionLocaleIssue(config.productionTargets, TARGET_LOCALES);
if (productionIssue) fail(productionIssue);

/**
 * The subset of TARGET_LOCALES held to a production standard.
 *
 * It is what `validate.mjs` exits non-zero on, and what `completeness.mjs` holds
 * a source repo's PR to. May be empty: see `productionLocaleIssue`.
 */
export const PRODUCTION_LOCALES = config.productionTargets;

/** The line every gating script prints when the gate is empty, or null when it is not. */
export function productionGateNotice() {
  if (PRODUCTION_LOCALES.length > 0) return null;
  return `note: locales.json "productionTargets" is empty, so NOTHING GATES. No locale is in production yet. This is not a pass.`;
}

export function assertTargetLocale(locale) {
  if (/^en(-|$)/i.test(locale)) {
    fail(`refusing to treat "${locale}" as a target locale. English is authored in the source repos and read from a checkout, never held here.`);
  }
  if (!TARGET_LOCALES.includes(locale)) {
    fail(`unknown target locale "${locale}". Add it to locales.json "targets" first. Known: ${TARGET_LOCALES.join(", ") || "(none yet)"}`);
  }
}

export function fail(message) {
  console.error(`error: ${message}`);
  process.exit(1);
}
