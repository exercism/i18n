# Über

TypeScript ist JavaScript mit einer Syntax für Typen. Dadurch ist es eine stark typisierte Programmiersprache, die objektorientierte, imperative und deklarative Stile (z. B. funktionale Programmierung) unterstützt und dir bei jeder Größenordnung besseres Tooling bietet.
Es gibt einige [primitive Werte][mdn-primitive], und alles andere gilt als Objekt.

JavaScript ist vor allem als Skriptsprache für Webseiten bekannt, aber auch viele Umgebungen außerhalb des Browsers nutzen es, zum Beispiel Node.js.
Die Sprache wird aktiv weiterentwickelt und erlaubt aufgrund ihrer Multiparadigmen-Eigenschaft viele Programmierstile.

TypeScript baut darauf auf und wird ebenfalls aktiv weiterentwickelt.
In einigen Rankings aus dem Jahr 2023 ist es im täglichen Einsatz beliebter als JavaScript.

Da [du TypeScript nicht lernen kannst, ohne JavaScript zu lernen][handbook-js-or-ts], konzentriert sich ein Teil der Inhalte in diesem Track darauf, JavaScript-Konzepte zu vermitteln, und ein Teil der Konzepte behandelt nur TypeScript-spezifische Features.

## (Neu-)Zuweisung

Es gibt einige grundlegende Wege, in TypeScript Werte an Namen zu binden: über Variablen oder Konstanten.
Auf Exercism werden Variablen immer in [camelCase][wiki-camel-case] geschrieben, Konstanten in [SCREAMING_SNAKE_CASE][wiki-snake-case].
Es gibt keine offizielle Richtlinie, an die du dich halten musst, und verschiedene Unternehmen und Organisationen haben unterschiedliche Styleguides.
_Du kannst Variablen schreiben, wie du möchtest_.
Der Vorteil, wenn du sie so schreibst, wie die Übungen vorbereitet sind: Sie werden in der Weboberfläche und in den meisten IDEs anders hervorgehoben.

Variablen in TypeScript kannst du mit den Schlüsselwörtern [`const`][mdn-const], [`let`][mdn-let] oder [`var`][mdn-var] definieren.

Wenn du `let` oder `var` verwendest, kann eine Variable im Laufe ihres Lebens auf verschiedene Werte verweisen.
Zum Beispiel kannst du `myFirstVariable` mit dem Zuweisungsoperator `=` beliebig oft definieren und neu zuweisen:

```typescript
let myFirstVariable = 1
myFirstVariable = 'Some string'
myFirstVariable = new SomeComplexClass()
```

Im Gegensatz zu `let` und `var` kannst du Variablen, die mit `const` definiert werden, nur einmal zuweisen.
So werden in TypeScript Konstanten definiert.

```typescript
const MY_FIRST_CONSTANT = 10

// Can not be re-assigned.
MY_FIRST_CONSTANT = 20
// => TypeError: Assignment to constant variable.
```

Da TypeScript das statisch erkennen kann, gibt auch der TypeScript-Compiler einen Fehler aus:

```typescript
// ^? Cannot assign to 'MY_FIRST_CONSTANT' because it is a constant.(2588)
```

Das heißt, du musst den Code nicht ausführen, um den `TypeError` zu erkennen.

<!--prettier-ignore -->
~~~~exercism/note
💡 In einer späteren Lernübung wird der Unterschied zwischen einer _konstanten_ Zuweisung bzw. Bindung und einem _konstanten_ Wert untersucht und erklärt.
~~~~

## Typinferenz

Ohne zu tief in das Thema [Typinferenz][handbook-type-inference] einzusteigen, solltest du wissen, dass eine zugewiesene Variable normalerweise einen abgeleiteten Typ hat, auch ohne Typannotation.

```typescript
const MY_FIRST_CONSTANT = 10
// ^? const MY_FIRST_CONSTANT: number
```

Dieser Typ wird dann im gesamten Code durchgesetzt.
Das bedeutet auch: Wo der folgende Code gültiges JavaScript ist:

```javascript
let myFirstVariable = 1
myFirstVariable = 'Some string'
```

meldet es in TypeScript einen Fehler:

```typescript
let myFirstVariable = 1
myFirstVariable = 'Some string'
// ^? Type 'string' is not assignable to type 'number'.(2322)
```

Dieses Feature sorgt für Typsicherheit, auch wenn keine Typannotationen verwendet werden.

### Zuweisung an Konstanten

Das Schlüsselwort `const` wird _sowohl_ für Variablen als auch für Konstanten verwendet.
Ein weiteres Konzept, das oft im Zusammenhang mit Konstanten genannt wird, ist die [(Un-)Veränderlichkeit][wiki-mutability].

Das Schlüsselwort `const` macht nur die _Bindung_ unveränderlich. Das heißt: Du kannst einer `const`-Variable nur einmal einen Wert zuweisen.
In TypeScript sind nur [primitive][mdn-primitive] Werte unveränderlich.
[Nicht-primitive][mdn-primitive] Werte kannst du dagegen weiterhin verändern.

```typescript
const MY_MUTABLE_VALUE_CONSTANT = { food: 'apple' }

// This is possible
MY_MUTABLE_VALUE_CONSTANT.food = 'pear'

MY_MUTABLE_VALUE_CONSTANT
// => { food: "pear" }
```

### Konstante Werte (Unveränderlichkeit)

Generell gilt: Auf Exercism und in vielen anderen Organisationen und Projekt-Styleguides solltest du Werte, die wie `const SCREAMING_SNAKE_CASE` aussehen, nicht verändern.
Technisch gesehen _können_ die Werte geändert werden, aber für Klarheit und klare Erwartungen auf Exercism raten wir davon ab.
Wenn das _erzwungen_ werden muss, verwende [`Object.freeze(value)`][mdn-object-freeze].

Wo es möglich ist, kannst du das TypeScript-Schlüsselwort `readonly`, `as const` oder den generischen Typ `Readonly<T>` verwenden, um Unveränderlichkeit statisch zu erzwingen.
Mehr zu diesem Thema lernst du später.

```typescript
const MY_VALUE_CONSTANT = Object.freeze({ food: 'apple' })

MY_VALUE_CONSTANT.food = 'pear'
// ^? Cannot assign to 'food' because it is a read-only property.(2540)

MY_VALUE_CONSTANT
// => { food: "apple" }
```

In freier Wildbahn wirst du `Object.freeze` kaum überall in einer Codebasis sehen, aber die Regel, einen `SCREAMING_SNAKE_CASE`-Wert niemals zu verändern, ist eine gute Regel; sie wird oft durch automatisierte Analyse, etwa einen Linter, durchgesetzt.

## Funktionsdeklarationen

In TypeScript werden Funktionseinheiten in _Funktionen_ gekapselt, wobei zusammengehörige Funktionen üblicherweise in derselben Datei stehen.
Diese Funktionen können Parameter (Argumente) entgegennehmen und mit dem Schlüsselwort `return` einen Wert _zurückgeben_.
Funktionen werden mit der Syntax `()` aufgerufen.

```typescript
function add(num1: number, num2: number): number {
  return num1 + num2
}

add(1, 3)
// => 4
```

Funktionsparameter solltest du normalerweise mit einem Typ annotieren, indem du einen Doppelpunkt (`:`) gefolgt vom Typ angibst.
Rückgabewerte von Funktionen kannst du nach der schließenden runden Klammer der Parameterliste annotieren, ebenfalls mit einem Doppelpunkt (`:`) gefolgt vom Typ.

Wenn eine Funktion keine Typannotation für ihren Rückgabewert hat, wird der Typ abgeleitet.

```typescript
function add(num1: number, num2: number) {
  return num1 + num2
}

add(1, 3)
// ^? function add(num1: number, num2: number): number
```

Hier wurde der Rückgabetyp abgeleitet, weil TypeScript weiß, dass das Ergebnis von `number + number` immer `number` sein muss.

<!--prettier-ignore -->
~~~~exercism/note
💡 In TypeScript gibt es _viele_ verschiedene Möglichkeiten, eine Funktion zu deklarieren.
Diese anderen Arten sehen anders aus als die Verwendung des Schlüsselworts `function`.
Der Track versucht, sie nach und nach einzuführen, aber wenn du sie schon kennst, kannst du jede davon verwenden.
In den meisten Fällen ist die eine nicht besser oder schlechter als die andere.
~~~~

## Typannotationen

Wie in der Funktionsdeklaration für `add` zu sehen ist, haben die Parameter eine explizite Typannotation `: number`.
Variablendeklarationen, Klasseneigenschaften, Funktionsdeklarationen und mehr unterstützen alle Typannotationen.

Sowohl explizite Typannotationen als auch abgeleitete Typen werden vom Type-Checker durchgesetzt.

```typescript
add('foo', 3)
// ^? Argument of type 'string' is not assignable to parameter of type 'number'.(2345)
```

Wenn TypeScript keine explizite Typannotation findet und den Typ nicht ableiten kann, weist es den Typ `any` zu, den [du nicht verwenden solltest][handbook-dont-use-any].
Später lernst du den Typ `unknown` als gute Alternative kennen.

## Export und Import

Die Schlüsselwörter `export` und `import` sind mächtige Werkzeuge, die aus einer gewöhnlichen TypeScript-Datei ein [TypeScript-Modul][mdn-module] machen.
Sie erlauben es nicht nur, bestimmte Komponenten wie Funktionen, Klassen, Variablen und Konstanten gezielt nach außen freizugeben, sondern ermöglichen auch eine ganze Reihe weiterer Features, zum Beispiel:

- [Umbenennen von Exporten und Importen][mdn-renaming-modules], wodurch du Namenskonflikte vermeiden kannst,
- [Dynamische Importe][mdn-dynamic-imports], die Code bei Bedarf laden,
- [Tree Shaking][blog-tree-shaking], das die Größe des endgültigen Codes reduziert, indem es nebenwirkungsfreie Module und sogar Inhalte von Modulen _die nicht verwendet werden_ entfernt,
- das Exportieren von [_Live-Bindings_][blog-live-bindings], wodurch du einen Wert exportieren kannst, der überall, wo er importiert wird, mitverändert wird, wenn sich der ursprüngliche Wert ändert.

Ein konkretes Beispiel ist, wie die Tests im TypeScript-Track von Exercism funktionieren.
Jede Übung hat mindestens eine Implementierungsdatei, zum Beispiel `lasagna.ts`, und jede Übung hat mindestens eine Testdatei, zum Beispiel `lasagna.test.ts`.
Die Implementierungsdatei verwendet `export`, um die öffentliche API freizugeben, und die Testdatei verwendet `import`, um darauf zuzugreifen. So kann sie die Ergebnisse der Implementierung testen.

```typescript
// file.js
export const MY_VALUE = 10

export function add(num1, num2) {
  return num1 + num2
}

// file.spec.js
import { MY_VALUE, add } from './file.js'

add(MY_VALUE, 5)
// => 15
```

<!--prettier-ignore -->
~~~~exercism/advanced
Da der TypeScript-Compiler Importpfade _nicht umschreibt_, solltest du die Importe mit der Endung `.js` schreiben (denn das ist es, was nach der Transpilierung daraus wird).
Allerdings ist die Option `allowImportingTsExtensions` aktiviert, weil wir einen Prozess haben, der die Pfade umschreibt.
Dadurch kannst du aus `.ts` importieren (ebenso wie aus `.js`).

In älterem Code findest du Importe _ohne Dateiendung_.
~~~~

[blog-live-bindings]: https://2ality.com/2015/07/es6-module-exports.html#es6-modules-export-immutable-bindings
[blog-tree-shaking]: https://bitsofco.de/what-is-tree-shaking/
[mdn-const]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const
[mdn-dynamic-imports]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#Dynamic_Imports
[mdn-let]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let
[mdn-module]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules
[mdn-object-freeze]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
[mdn-primitive]: https://developer.mozilla.org/en-US/docs/Glossary/Primitive
[mdn-renaming-modules]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules#Renaming_imports_and_exports
[mdn-var]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var
[handbook-dont-use-any]: https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html#any
[handbook-js-or-ts]: https://www.typescriptlang.org/docs/handbook/typescript-from-scratch.html#learning-javascript-and-typescript
[handbook-type-inference]: https://www.typescriptlang.org/docs/handbook/type-inference.html
[wiki-mutability]: https://en.wikipedia.org/wiki/Immutable_object
[wiki-camel-case]: https://en.wikipedia.org/wiki/Camel_case
[wiki-snake-case]: https://en.wikipedia.org/wiki/Snake_case
