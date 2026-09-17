// Constants shared by every script in this repo. Anything that more than one
// script needs to agree on lives here and nowhere else.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

/** Where the scripts themselves live. Never overridden. */
export const SCRIPTS_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");

/**
 * The tree the scripts operate on: `locales/`, `locales.json` and
 * `website-exclusions.json`.
 *
 * It is this repo, except when `EXERCISM_I18N_ROOT` names another directory.
 * That override exists for `scripts/test.mjs`, which runs the real scripts over
 * a fixture tree it builds in a temp directory. Both `targets` lists are empty in
 * the real `locales.json` today, so without it there would be no way to run the
 * checker against anything at all.
 */
export const REPO_ROOT = process.env.EXERCISM_I18N_ROOT ? path.resolve(process.env.EXERCISM_I18N_ROOT) : SCRIPTS_ROOT;

export const LOCALES_DIR = path.join(REPO_ROOT, "locales");

/** The locale English is called wherever a locale segment names it. */
export const SOURCE_LOCALE = "en";

// TODO(iHiD): bucket names, credentials and IAM are an open decision. Nothing
// below is a real bucket. `publish.mjs --upload` refuses to run until
// EXERCISM_I18N_BUCKET is set, so a guess here can never reach S3.
export const S3_BUCKET_ENV = "EXERCISM_I18N_BUCKET";
/** Every published key lives under this prefix, and the key guard enforces it. */
export const S3_PREFIX = "i18n";

const config = JSON.parse(fs.readFileSync(path.join(REPO_ROOT, "locales.json"), "utf8"));

/** Locales this repo actively translates into. Never includes English. */
export const TARGET_LOCALES = config.targets;

/** Locales queued for future work, not yet translated here. */
export const PLANNED_LOCALES = config.plannedTargets ?? [];

/**
 * Why `productionTargets` is checked at load.
 *
 * This list SHRINKS a gate, which makes every mistake in it silent in the worst
 * possible direction: whatever goes wrong, the result is a run that goes green
 * having quietly stopped checking a live language. Two shapes of mistake do it:
 *
 *  - a locale `targets` does not know (a casing slip, "pt-br" for "pt-BR", or a
 *    stale code) drops that one locale out of the production bucket;
 *  - an absent or non-array list empties the bucket without anybody having
 *    decided that it should be empty.
 *
 * An EMPTY list is the one shape that is legitimate here and is not in Jiki's
 * repo, which this was forked from. No Exercism locale is in production yet, so
 * "nothing gates" is today's honest answer. It is accepted, and every script that
 * gates prints `productionGateNotice()` so that state is said out loud rather
 * than read as a pass.
 *
 * Returned rather than thrown so `scripts/test.mjs` can assert each case without
 * a doctored locales.json or a subprocess. The caller below is what makes it
 * fatal.
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
