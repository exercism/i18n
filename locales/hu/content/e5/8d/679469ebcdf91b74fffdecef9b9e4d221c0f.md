# Részletesen

A TypeScript JavaScript, kiegészítve a típusok szintaxisával, így erősen típusos programozási nyelv, amely támogatja az objektumorientált, imperatív és deklaratív (például funkcionális programozási) stílusokat, és bármekkora léptékben jobb toolingot biztosít.
Van néhány [primitív][mdn-primitive], és minden más objektumnak számít.

Bár a JavaScript a leginkább weblapok szkriptnyelveként ismert, sok nem böngészős környezet is használja, például a Node.js.
A nyelv aktívan fejlődik, és mivel több paradigmát támogató nyelv, a programozás számos stílusát teszi lehetővé.

A TypeScript erre épül, és szintén aktívan fejlesztik.
A 2023-as rangsorok egy részében a napi használatban népszerűbb a JavaScriptnél.

Mivel [nem tanulhatsz meg TypeScriptet anélkül, hogy JavaScriptet is megtanulnál][handbook-js-or-ts], ezen a kurzuson a tartalom egy része a JavaScript-fogalmak tanítására összpontosít, más része pedig kizárólag a TypeScript saját jellemzőivel foglalkozik.

## (Újra)értékadás

Néhány alapvető módja van az értékek nevekhez rendelésének a TypeScriptben: változókkal vagy konstansokkal.
Az Exercismen a változókat mindig [camelCase][wiki-camel-case] írásmóddal írjuk; a konstansokat [SCREAMING_SNAKE_CASE][wiki-snake-case] írásmóddal.
Nincs hivatalos útmutató, amit követni kellene, és a különböző cégeknek és szervezeteknek más-más stílusútmutatójuk van.
_Nyugodtan írd a változókat úgy, ahogy szeretnéd_.
Ha úgy írod őket, ahogy a feladatok elő vannak készítve, az az előnyöd, hogy másképp lesznek kiemelve a webes felületen és a legtöbb IDE-ben.

A TypeScriptben a változókat a [`const`][mdn-const], [`let`][mdn-let] vagy [`var`][mdn-var] kulcsszóval definiálhatod.

Egy változó `let` vagy `var` használatakor az élettartama során különböző értékekre hivatkozhat.
Például a `myFirstVariable` sokszor definiálható és újradefiniálható a `=` értékadó operátorral:

```typescript
let myFirstVariable = 1
myFirstVariable = 'Some string'
myFirstVariable = new SomeComplexClass()
```

A `let` és `var` kulcsszóval definiált változókkal ellentétben a `const` kulcsszóval definiált változóknak csak egyszer adhatsz értéket.
Így definiálunk konstansokat a TypeScriptben.

```typescript
const MY_FIRST_CONSTANT = 10

// Can not be re-assigned.
MY_FIRST_CONSTANT = 20
// => TypeError: Assignment to constant variable.
```

Mivel a TypeScript ezt statikusan felismeri, a TypeScript-fordító is hibát jelez:

```typescript
// ^? Cannot assign to 'MY_FIRST_CONSTANT' because it is a constant.(2588)
```

Ez azt jelenti, hogy nem kell futtatnod a kódot a `TypeError` felismeréséhez.

<!--prettier-ignore -->
~~~~exercism/note
💡 Egy későbbi tanulófeladatban körbejárjuk és elmagyarázzuk a különbséget a _konstans_ értékadás / kötés és a _konstans_ érték között.
~~~~

## Típuskövetkeztetés

Anélkül, hogy túl mélyre ásnánk a [típuskövetkeztetés][handbook-type-inference] témáját, érdemes tudnod, hogy egy értéket kapott változónak általában még típusannotáció nélkül is van kikövetkeztetett típusa.

```typescript
const MY_FIRST_CONSTANT = 10
// ^? const MY_FIRST_CONSTANT: number
```

Ezt a típust aztán az egész kódon számon kéri a fordító.
Ez azt is jelenti, hogy míg a következő kód érvényes JavaScript:

```javascript
let myFirstVariable = 1
myFirstVariable = 'Some string'
```

A TypeScript viszont hibát jelez:

```typescript
let myFirstVariable = 1
myFirstVariable = 'Some string'
// ^? Type 'string' is not assignable to type 'number'.(2322)
```

Ez a jellemző akkor is biztosítja a típusbiztonságot, ha nem használsz típusannotációkat.

### Konstans értékadás

A `const` kulcsszót _mind_ a változók, _mind_ a konstansok kapcsán említjük.
Egy másik fogalom, amit gyakran emlegetnek a konstansok kapcsán, az [(im)módosíthatóság][wiki-mutability].

A `const` kulcsszó csak a _kötést_ teszi módosíthatatlanná, azaz egy `const` változónak csak egyszer adhatsz értéket.
A TypeScriptben csak a [primitív][mdn-primitive] értékek módosíthatatlanok.
A [nem primitív][mdn-primitive] értékek azonban továbbra is módosíthatók.

```typescript
const MY_MUTABLE_VALUE_CONSTANT = { food: 'apple' }

// This is possible
MY_MUTABLE_VALUE_CONSTANT.food = 'pear'

MY_MUTABLE_VALUE_CONSTANT
// => { food: "pear" }
```

### Konstans érték (módosíthatatlanság)

Általános szabályként az Exercismen, valamint sok más szervezet és projekt stílusútmutatójában ne módosíts olyan értékeket, amelyek `const SCREAMING_SNAKE_CASE` formájúak.
Technikailag az értékek _megváltoztathatók_, de az átláthatóság és az elvárások kezelése érdekében az Exercismen ezt nem javasoljuk.
Amikor ezt _muszáj_ érvényesíteni, használd az [`Object.freeze(value)`][mdn-object-freeze] hívást.

Ahol lehetséges, a TypeScript `readonly` kulcsszava, az `as const`, vagy a `Readonly<T>` generikus típus használható a módosíthatatlanság statikus érvényesítésére.
Erről a témáról később tanulsz majd többet.

```typescript
const MY_VALUE_CONSTANT = Object.freeze({ food: 'apple' })

MY_VALUE_CONSTANT.food = 'pear'
// ^? Cannot assign to 'food' because it is a read-only property.(2540)

MY_VALUE_CONSTANT
// => { food: "apple" }
```

A gyakorlatban ritka, hogy `Object.freeze` mindenhol előfordul egy kódbázisban, de az a szabály, hogy soha ne módosíts egy `SCREAMING_SNAKE_CASE` értéket, jó szabály; gyakran automatizált elemzéssel, például linterrel érvényesítik.

## Függvénydeklarációk

A TypeScriptben a funkcionalitás egységeit _függvényekbe_ zárjuk, és általában az összetartozó függvényeket ugyanabba a fájlba csoportosítjuk.
A függvények paramétereket (argumentumokat) fogadhatnak, és a `return` kulcsszóval _adhatnak vissza_ értéket.
A függvényeket `()` szintaxissal hívjuk meg.

```typescript
function add(num1: number, num2: number): number {
  return num1 + num2
}

add(1, 3)
// => 4
```

A függvény paramétereit általában típusannotációval látjuk el: kettőspont (`:`) után a típus következik.
A függvény visszatérési értékét a paraméterlista lezárása után annotálhatod kettősponttal (`:`) és a típussal.

Ha egy függvény visszatérési értékéhez nincs típusannotáció, a típus kikövetkeztetésre kerül.

```typescript
function add(num1: number, num2: number) {
  return num1 + num2
}

add(1, 3)
// ^? function add(num1: number, num2: number): number
```

Itt a visszatérési típus azért lett kikövetkeztetve, mert a TypeScript tudja, hogy a `number + number` eredménye mindig `number` kell legyen.

<!--prettier-ignore -->
~~~~exercism/note
💡 A TypeScriptben _sok_ különböző módon deklarálhatsz függvényt.
Ezek a többi mód másképp néz ki, mint a `function` kulcsszó használata.
A kurzus fokozatosan igyekszik bevezetni őket, de ha már ismered őket, nyugodtan használd bármelyiket.
A legtöbb esetben nem jobb vagy rosszabb az egyik vagy a másik használata.
~~~~

## Típusannotációk

Amint az `add` függvény deklarációjában látszik, a paramétereknek explicit típusannotációjuk van: `: number`.
A változódeklarációk, az osztálytulajdonságok, a függvénydeklarációk és még sok más mind támogatja a típusannotációkat.

A típusellenőrző mind az explicit típusannotációkat, mind a kikövetkeztetett típusokat érvényesíti.

```typescript
add('foo', 3)
// ^? Argument of type 'string' is not assignable to parameter of type 'number'.(2345)
```

Ha a TypeScript nem talál explicit típusannotációt, és nem tudja kikövetkeztetni a típust, akkor az `any` típust rendeli hozzá, amelyet [nem szabad használnod][handbook-dont-use-any].
Később megismerkedsz az `unknown` típussal mint jó alternatívával.

## Exportálás és importálás

Az `export` és `import` kulcsszavak hatékony eszközök, amelyek egy hétköznapi TypeScript-fájlt [TypeScript-modullá][mdn-module] alakítanak.
Azon túl, hogy lehetővé teszik, hogy a kód szelektíven tegyen közzé komponenseket, például függvényeket, osztályokat, változókat és konstansokat, számos más funkciót is nyújtanak, például:

- [Exportok és importok átnevezése][mdn-renaming-modules], amivel elkerülheted a névütközéseket,
- [Dinamikus importok][mdn-dynamic-imports], amelyek igény szerint töltik be a kódot,
- [Tree shaking][blog-tree-shaking], amely csökkenti a végleges kód méretét azáltal, hogy eltávolítja a mellékhatásmentes modulokat és akár azoknak a moduloknak a tartalmát is, _amelyeket nem használunk_,
- [_live bindings_][blog-live-bindings] exportálása, amivel exportálhatsz egy olyan értéket, amely mindenhol módosul, ahol importálják, ha az eredeti érték módosul.

Egy konkrét példa erre az, hogyan működnek a tesztek az Exercism TypeScript-kurzusán.
Minden feladatnak van legalább egy implementációs fájlja, például `lasagna.ts`, és minden feladatnak van legalább egy tesztfájlja, például `lasagna.test.ts`.
Az implementációs fájl az `export` kulcsszóval teszi közzé a nyilvános API-t, a tesztfájl pedig az `import` kulcsszóval éri el ezeket, így tudja tesztelni az implementáció eredményeit.

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
Mivel a TypeScript-fordító _nem írja át az importútvonalakat_, az importokat a `.js` kiterjesztéssel kell írni (mivel az átfordítás után az lesz belőlük).
Az `allowImportingTsExtensions` beállítás azonban be van kapcsolva, mert van egy folyamatunk, amely átírja az útvonalakat.
Így `.ts`-ből (valamint `.js`-ből) is importálhatsz.

Régebbi kódban _fájlkiterjesztés nélküli_ importokat találsz.
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
