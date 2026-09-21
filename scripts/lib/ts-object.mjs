// Reads the website's i18next bundles without executing them.
//
// The frontend's English is written as TypeScript modules under
// app/javascript/i18n/en/: each is `export default { 'key': 'value', ... }`,
// and index.ts imports them all and maps a namespace to each. Evaluating those
// files would be the easy way to read them, and this repo must never do it:
// the completeness check reads a pull request's English, most Exercism PRs
// come from forks, and `vm` is not a security boundary. So the bundles are
// parsed as data, by a parser that accepts exactly the subset they are written
// in and rejects everything else.
//
// The subset: line and block comments, `import x from './y'` lines, one
// `export default { ... }`, keys that are quoted strings or bare identifiers,
// and values that are a quoted string, a nested object, or (in index.ts) a
// bare identifier naming an import. Adjacent strings joined with `+` are
// combined.
//
// Anything else fails with an error naming the file and line: a template
// literal, a function call, a spread. Skipping what it cannot read would
// quietly drop keys from the English catalog, and a key English does not list
// is never required to be translated. So the parser fails loudly.

export class BundleSyntaxError extends Error {
  constructor(message) {
    super(message);
    this.name = "BundleSyntaxError";
  }
}

const IDENT_START = /[A-Za-z_$]/;
const IDENT_PART = /[A-Za-z0-9_$]/;

const ESCAPES = { n: "\n", t: "\t", r: "\r", b: "\b", f: "\f", v: "\v", 0: "\0" };

function tokenize(source, file) {
  const tokens = [];
  let i = 0;
  const bad = (what) => {
    const line = source.slice(0, i).split("\n").length;
    throw new BundleSyntaxError(`${file}:${line}: ${what}`);
  };

  while (i < source.length) {
    const char = source[i];
    if (/\s/.test(char)) {
      i += 1;
    } else if (char === "/" && source[i + 1] === "/") {
      const end = source.indexOf("\n", i);
      i = end === -1 ? source.length : end;
    } else if (char === "/" && source[i + 1] === "*") {
      const end = source.indexOf("*/", i + 2);
      if (end === -1) bad("unterminated block comment");
      i = end + 2;
    } else if (char === "'" || char === '"') {
      let value = "";
      let j = i + 1;
      for (;;) {
        if (j >= source.length || source[j] === "\n") bad("unterminated string");
        if (source[j] === char) break;
        if (source[j] === "\\") {
          const next = source[j + 1];
          if (next === "u") {
            const braced = source[j + 2] === "{";
            const hex = braced ? source.slice(j + 3, source.indexOf("}", j)) : source.slice(j + 2, j + 6);
            if (!/^[0-9a-fA-F]+$/.test(hex)) bad("bad \\u escape");
            value += String.fromCodePoint(parseInt(hex, 16));
            j += braced ? hex.length + 4 : 6;
          } else if (next === "x") {
            value += String.fromCharCode(parseInt(source.slice(j + 2, j + 4), 16));
            j += 4;
          } else if (next === "\n") {
            j += 2; // a line continuation contributes nothing
          } else {
            value += ESCAPES[next] ?? next;
            j += 2;
          }
          continue;
        }
        value += source[j];
        j += 1;
      }
      tokens.push({ type: "string", value, at: i });
      i = j + 1;
    } else if (char === "`") {
      bad("template literals are not supported: write the English as a plain quoted string");
    } else if (IDENT_START.test(char)) {
      let j = i + 1;
      while (j < source.length && IDENT_PART.test(source[j])) j += 1;
      tokens.push({ type: "ident", value: source.slice(i, j), at: i });
      i = j;
    } else if ("{}:,+;".includes(char)) {
      tokens.push({ type: char, at: i });
      i += 1;
    } else {
      bad(`unexpected character ${JSON.stringify(char)}`);
    }
  }
  return tokens;
}

/**
 * Parse one bundle module.
 *
 * @returns {{ imports: Record<string,string>, value: object }} `imports` maps a
 *   local name to the module specifier it was imported from; `value` is the
 *   default export, with `{ $ref: name }` wherever a value was a bare identifier.
 */
export function parseBundle(source, file = "<bundle>") {
  const tokens = tokenize(source, file);
  let position = 0;

  const lineOf = (token) => source.slice(0, token?.at ?? source.length).split("\n").length;
  const bad = (what, token = tokens[position]) => {
    throw new BundleSyntaxError(`${file}:${lineOf(token)}: ${what}`);
  };
  const peek = () => tokens[position];
  const take = (type, value) => {
    const token = tokens[position];
    if (!token || token.type !== type || (value !== undefined && token.value !== value)) {
      bad(`expected ${value ?? type}, found ${token ? (token.value ?? token.type) : "end of file"}`);
    }
    position += 1;
    return token;
  };

  function parseValue() {
    const token = peek();
    if (!token) bad("expected a value, found end of file");
    if (token.type === "{") return parseObject();
    if (token.type === "string") {
      let value = take("string").value;
      while (peek()?.type === "+") {
        take("+");
        value += take("string").value;
      }
      return value;
    }
    if (token.type === "ident") return { $ref: take("ident").value };
    return bad(`a value must be a quoted string or an object, found ${token.type}`);
  }

  function parseObject() {
    take("{");
    const out = {};
    while (peek() && peek().type !== "}") {
      const keyToken = peek();
      if (keyToken.type !== "string" && keyToken.type !== "ident") bad("expected a key");
      position += 1;
      const key = keyToken.value;
      if (Object.prototype.hasOwnProperty.call(out, key)) bad(`duplicate key ${JSON.stringify(key)}`, keyToken);
      // `{ name }` shorthand always means the import called `name`.
      if (peek()?.type === ":") {
        take(":");
        out[key] = parseValue();
      } else if (keyToken.type === "ident") {
        out[key] = { $ref: key };
      } else {
        bad(`key ${JSON.stringify(key)} has no value`);
      }
      if (peek()?.type === ",") take(",");
      else if (peek()?.type !== "}") bad("expected , or }");
    }
    take("}");
    return out;
  }

  const imports = {};
  let value = null;

  while (position < tokens.length) {
    const token = peek();
    if (token.type === ";") {
      position += 1;
    } else if (token.type === "ident" && token.value === "import") {
      take("ident", "import");
      const name = take("ident").value;
      take("ident", "from");
      imports[name] = take("string").value;
    } else if (token.type === "ident" && token.value === "export") {
      take("ident", "export");
      take("ident", "default");
      if (value !== null) bad("more than one default export");
      value = parseObject();
    } else {
      bad(`unexpected ${token.value ?? token.type} at the top level`);
    }
  }

  if (value === null) throw new BundleSyntaxError(`${file}: no \`export default { ... }\``);
  return { imports, value };
}
