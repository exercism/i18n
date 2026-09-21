# A rekurzió megértése JavaScriptben

A rekurzió erőteljes fogalom a programozásban: lényege, hogy egy függvény önmagát hívja meg.
Elsőre kissé nehezen megfogható, de ha egyszer megérted az alapokat, értékes eszközzé válik az összetett problémák megoldásában.
A rekurziót JavaScriptben könnyen érthető példákon keresztül nézzük meg.

## Mi a rekurzió?

Rekurzióról akkor beszélünk, amikor egy függvény önmagát hívja meg, akár közvetlenül, akár közvetetten.
Hasonlít egy ciklushoz, de abban különbözik, hogy a problémát kisebb, könnyebben kezelhető részproblémákra bonthatja.

### 1. példa: visszaszámlálás

Kezdjük egy egyszerű példával: egy visszaszámláló függvénnyel.

```javascript
function countdown(num) {
  // Base case
  if (num <= 0) {
    console.log('Blastoff!');
    return;
  }

  // Recursive case
  console.log(num);
  countdown(num - 1);
}

// Call the function
countdown(5);
```

Ebben a példában:

- **Alapeset**: amikor a `num` értéke 0 vagy annál kisebb lesz, a függvény kiírja, hogy „Blastoff!”, és többé nem hívja meg önmagát.
- **Rekurzív eset**: a függvény kiírja az aktuális `num` értékét, és a `num - 1` értékkel hívja meg önmagát.

### 2. példa: faktoriális

Most egy klasszikus rekurziós példát nézzünk meg: egy szám faktoriálisának kiszámítását.

```javascript
function factorial(n) {
  // Base case
  if (n === 0 || n === 1) {
    return 1;
  }

  // Recursive case
  return n * factorial(n - 1);
}

// Test the function
console.log(factorial(5)); // Output: 120
```

Ebben a példában:

- **Alapeset**: ha `n` 0 vagy 1, a függvény 1-et ad vissza.
- **Rekurzív eset**: a függvény megszorozza `n`-t az `n - 1` faktoriálisával.

## A legfontosabb fogalmak

### Az alapeset

Minden rekurzív függvényben kell lennie legalább egy alapesetnek: egy feltételnek, amelynél a függvény már nem hívja meg önmagát.
Alapeset nélkül a rekurzió a végtelenségig folytatódna, ami veremtúlcsorduláshoz vezet.

### A rekurzív eset

A rekurzív eset határozza meg, hogyan hívja meg a függvény önmagát a probléma kisebb vagy egyszerűbb változatával.

## A rekurzió előnyei és hátrányai

**Előnyök:**

- Elegáns megoldás bizonyos problémákra.
- A matematikai indukció elvét követi.

**Hátrányok:**

- Kevésbé hatékony lehet, mint az iteratív megoldások.
- Mély rekurzió esetén veremtúlcsorduláshoz vezethet.

## Összegzés

A rekurzió értékes technika, amely azzal egyszerűsíti az összetett problémákat, hogy kisebb, könnyebben kezelhető részproblémákra bontja őket.
Ahhoz, hogy hatékony rekurzív megoldásokat írj JavaScriptben, elengedhetetlen, hogy megértsd az alapeseteket és a rekurzív eseteket.

**Tudj meg többet:**

- [MDN: rekurzió JavaScriptben](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions#recursion)
- [Eloquent JavaScript: 3. fejezet - függvények](https://eloquentjavascript.net/03_functions.html)
