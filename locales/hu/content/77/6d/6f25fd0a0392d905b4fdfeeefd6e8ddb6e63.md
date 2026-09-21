# Tippek

## Általános

- A számológép verme valójában csak egy Factor-tömb. Egy *művelet* egy
  `( stack -- new-stack )` idézet.
- A [`sequences`][sequences] csomag `head*` szava mindent visszaad, kivéve
  az utolsó `n` elemet; a `last2` pedig az utolsó kettőt.

## 1. Valósítsd meg az összeadást

- A [`kernel`][kernel] csomag `bi` szavával bontsd két számításra a bemenetet:
  „a tömb mínusz az utolsó két eleme” és „az utolsó két elem összege”.
  Ezután a `suffix` fűzi össze őket.

## 2. Valósítsd meg a szorzást

- Ugyanaz a felépítés, mint az 1. részfeladatban, csak `*`-gal a `+` helyett.

## 3. Alkalmazz egyetlen műveletet

- Az idézet hatása `( stack -- new-stack )`. Ezt a `call` szónál deklaráld,
  hogy a fordító ellenőrizni tudja a típusát: `call( stack -- new-stack )`.

## 4. Értékelj ki egy programot

- Az `each` (a [`sequences`][sequences] csomagban) végigfuttat egy idézetet egy
  sorozaton. Minden iteráció látja az aktuális vermet, leemeli a program
  következő műveletét, és alkalmazza azt.

## 5. Értékelj ki név alapján

- Minden nevet keress ki az asszociatív tömbből az `at` szóval (a
  [`assocs`][assocs] csomagban), így megkapod a hozzá tartozó műveletet, majd
  használd újra az `evaluate` szót.
- Egy fry-idézet, a [`curry-compose-fry`][fry] csomagból származó `'[ _ at ]`
  bezárja magába az asszociatív tömböt, így a `map` egyetlen menetben
  kicserélheti az egyes neveket a hozzájuk tartozó műveletre.

## 6. Osztás biztonságosan

- A `throw` (a [`kernel`][kernel] csomagban) hibát dob. A `zero-divisor-error`
  már deklarálva van, tehát ezt hívod meg: `zero-divisor-error throw`.
- Az osztás ágát egy `if`-fel védd le, amely ellenőrzi, hogy a legalsó
  osztó `0`-e.

[sequences]: https://docs.factorcode.org/content/vocab-sequences.html
[kernel]: https://docs.factorcode.org/content/vocab-kernel.html
[assocs]: https://docs.factorcode.org/content/vocab-assocs.html
[fry]: https://docs.factorcode.org/content/vocab-fry.html
