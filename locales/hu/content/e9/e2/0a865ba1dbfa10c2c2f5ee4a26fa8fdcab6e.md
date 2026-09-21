# Bevezetés

## Aritmetikai operátorok

A JavaScript 6 különböző operátort kínál a számokon végzett alapvető aritmetikai műveletek elvégzéséhez.

- `+`: Az összeadás operátor a számok összegének kiszámítására szolgál.
- `-`: A kivonás operátor két szám különbségének meghatározására szolgál.
- `*`: A szorzás operátor két szám szorzatának kiszámítására szolgál.
- `/`: Az osztás operátor két szám elosztására szolgál.

```javascript
2 - 1.5; //=> 0.5
19 / 2; //=> 9.5
```

- `%`: A maradék operátor az elvégzett osztás maradékának meghatározására szolgál.

  ```javascript
  40 % 4; // => 0
  -11 % 4; // => -3
  ```

- `**`: A hatványozás operátor egy szám hatványra emelésére szolgál.

  ```javascript
  4 ** 3; // => 64
  4 ** 1 / 2; // => 2
  ```

## A műveletek sorrendje

Ha egy sorban több operátort használsz, a JavaScript egy elsőbbségi sorrendet követ, ahogy az [ebben az elsőbbségi táblázatban][mdn-operator-precedence] látható.
Hogy a mi esetünkre egyszerűsítsük: a JavaScript a PEDMAS (zárójel, hatványozás, osztás/szorzás, összeadás/kivonás) szabályát használja, amit az általános iskolai matekórákon tanultunk.

<!-- prettier-ignore-start -->
```javascript
const result = 3 ** 3 + 9 * 4 / (3 - 1);
// => 3 ** 3 + 9 * 4/2
// => 27 + 9 * 4/2
// => 27 + 18
// => 45
```
<!-- prettier-ignore-end -->

## Rövidített értékadó operátorok

A rövidített értékadó operátorok rövidebb módot kínálnak arra, hogy egy változón aritmetikai műveletet végző kódot írjunk, és az új értéket ugyanannak a változónak adjuk.
Vegyünk például két változót: `x` és `y`.
Ekkor az `x += y` ugyanaz, mint az `x = x + y`.
Ezt gyakran egy számmal használjuk a `y` változó helyett.
A többi 5 művelet is elvégezhető hasonló módon.

```javascript
let x = 5;
x += 25; // x is now 30

let y = 31;
y %= 3; // y is now 1
```

[mdn-operator-precedence]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence#table
