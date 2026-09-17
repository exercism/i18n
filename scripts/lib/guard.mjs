// The one guard: no English key, and no key outside this repo's prefix, ever.
//
// English is not stored in this repo, so publishing it from a directory walk is
// structurally impossible rather than defended against. What is still possible is
// SYNTHESISING an English key: keys are built from path templates, and a bad
// template could produce `i18n/website/en/...` out of a locale variable that was
// never a locale. Nothing downstream would notice. The object would upload
// cleanly, and the website would be serving an English catalog nobody deployed.
//
// Credential scoping cannot express the rule. The key that must not be written
// sits INSIDE the prefix this repo legitimately writes, so no bucket policy can
// separate them.
//
// It is a HARD FAIL by construction: it throws a GuardViolation, never a warning
// and never a silent skip. A publish that quietly dropped a key would look
// exactly like a successful one. `validate` makes it fire on every run, because a
// guard meant never to fire only stays honest if something makes it.

import { S3_PREFIX, TARGET_LOCALES } from "./constants.mjs";

export class GuardViolation extends Error {
  constructor(message) {
    super(message);
    this.name = "GuardViolation";
  }
}

// Every spelling of English a path template could plausibly produce.
const ENGLISH_SEGMENTS = new Set(["en", "en-US", "en-GB", "source", "default"]);

/**
 * Refuse any S3 key that is not `<prefix>/<area>/<target locale>/...`.
 *
 * The locale is checked POSITIVELY as well as negatively: the third segment must
 * be a locale locales.json lists, so a key built from `undefined`, from a typo or
 * from a locale nobody added fails here too, not only one spelled "en".
 */
export function assertPublishableKey(key, { locales = TARGET_LOCALES } = {}) {
  const normalised = String(key).replace(/^\/+/, "");
  const segments = normalised.split("/");
  if (segments[0] !== S3_PREFIX) throw new GuardViolation(`refusing to publish "${key}": every key must live under ${S3_PREFIX}/`);
  if (segments.some((segment) => segment === "" || segment === "." || segment === "..")) {
    throw new GuardViolation(`refusing to publish "${key}": empty or relative path segment`);
  }
  for (const segment of segments) {
    if (ENGLISH_SEGMENTS.has(segment)) {
      throw new GuardViolation(`refusing to publish "${key}": segment "${segment}" is English. English is deployed with the website and never published from here.`);
    }
  }
  if (segments.length > 2 && !locales.includes(segments[2])) {
    throw new GuardViolation(`refusing to publish "${key}": "${segments[2]}" is not a target locale in locales.json`);
  }
  return normalised;
}
