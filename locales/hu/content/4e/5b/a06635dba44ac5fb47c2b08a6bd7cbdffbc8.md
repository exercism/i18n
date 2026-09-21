# Bevezetés

Amikor tömbökkel dolgozol, előfordul, hogy minden egyes értékre le szeretnéd futtatni ugyanazt a kódot. Ezt hívjuk úgy, hogy iterálunk vagy ciklust futtatunk a tömbön.

Itt azt az esetet nézzük meg, amikor nem szeretnéd módosítani a tömböt menet közben.
Ha a tömböket át szeretnéd alakítani, nézd meg helyette a [tömbátalakítások fogalmát][concept-array-transformations].

## A `for` ciklus

A tömb iterálásának legegyszerűbb módja a `for` ciklus használata, lásd a [ciklusok fogalmát][concept-for-loops].

```javascript
const numbers = [6.0221515, 10, 23];

for (let i = 0; i < numbers.length; i++) {
  console.log(numbers[i]);
}
// => 6.0221515
// => 10
// => 23
```

## A `for...of` ciklus

Amikor minden iterációban közvetlenül az értékkel szeretnél dolgozni, és egyáltalán nincs szükséged az indexre, használhatsz `for...of` ciklust.

A `for...of` ugyanúgy működik, mint a fentebb látott egyszerű `for` ciklus, csak itt nem kell a ciklusváltozóként az _indexszel_ bajlódnod: helyette közvetlenül az _értéket_ kapod meg.

```javascript
const numbers = [6.0221515, 10, 23];

// Because re-assigning number inside the loop will be very
// confusing, disallowing that via const is preferable.
for (const number of numbers) {
  console.log(number);
}
// => 6.0221515
// => 10
// => 23
```

Ahogy a hagyományos `for` ciklusokban is, használhatod a `continue` utasítást az aktuális iteráció leállításához, a `break` utasítást pedig a ciklus teljes leállításához.

## A `forEach` metódus

Minden tömb rendelkezik egy `forEach` metódussal, amellyel bejárhatod a tömb elemeit.

A `forEach` paraméterként egy [callbacket][concept-callbacks] fogad.
A callback függvény minden egyes tömbelemre egyszer hívódik meg.
Az aktuális elem, annak indexe és a teljes tömb argumentumként kerül átadásra a callbacknek.
Gyakran csak az aktuális elemet vagy az indexet használjuk.

```javascript
const numbers = [6.0221515, 10, 23];

numbers.forEach((number, index) => console.log(number, index));
// => 6.0221515 0
// => 10 1
// => 23 2
```

Miután a `forEach` ciklus elindult, nincs mód az iteráció leállítására.
A `break` és a `continue` utasítás nem létezik ebben a kontextusban.

[concept-array-transformations]: /tracks/javascript/concepts/array-transformations
[concept-for-loops]: /tracks/javascript/concepts/for-loops
[concept-callbacks]: /tracks/javascript/concepts/callbacks
