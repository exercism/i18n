# A különc partirobot

## Történet

Volt egyszer egy különc programozó, aki egy furcsa házban élt, rácsos ablakok mögött.
Egy nap elvállalt egy állást egy online álláshirdetési portálon: partirobotot kellett
építenie. A robotnak köszöntenie kell az embereket, és a helyükre kell kísérnie őket.
Az első változat nagyon technikásra sikerült, és jól megmutatta, hogy a programozó
mennyire nem ért az emberi kapcsolatokhoz. Némelyik megoldás a végső kiadásba is
bekerült.

## Feladatok

- Köszöntsd minden vendéget így:

```
Welcome to my party, <name>!
```

- Azt a vendéget, akinek ma van a születésnapja, így köszöntsd, hogy a robot fitogtathassa a vendégekről szerzett tudását:

```
Happy birthday <name>! You are now <age> years old!
Welcome to my party!
```

- Aki a helyét kéri, annak útbaigazítást adsz a táblájához:

```
Welcome to my party, <name>!
You have been assigned to table <table-number-in-hex>. Your table is <direction>, exactly <distance-float> meters from here.
You will be sitting next to <neighbour-name>!
```

## Megvalósítások

- [Go: strings][implementation-go] (referenciamegvalósítás)

## Referencia

- [`types/string`][types-string]

[types-string]: https://github.com/exercism/v3/blob/main/reference/types/string.md
[implementation-go]: https://github.com/exercism/go/blob/main/exercises/concept/strings/.docs/instructions.md
