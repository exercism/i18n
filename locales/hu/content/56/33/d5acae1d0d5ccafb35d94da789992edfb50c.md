# Bevezetés

Az algebrai adattípus (ADT) rögzített számú nevesített esetet ír le.
Az ADT minden értéke pontosan egy nevesített esetnek felel meg.

Az ADT-t a `data` kulcsszóval definiáljuk, az eseteket függőleges vonal (`|`) karakterekkel választjuk el.
Ha egyik esethez sem tartozik adat, az ADT hasonló ahhoz, amit más nyelvek általában _felsorolásnak_ (vagy _enum_) neveznek.

```haskell
data Season
  = Spring
  | Summer
  | Autumn
  | Winter
```

Az ADT minden esetéhez opcionálisan tartozhat adat, és a különböző esetekhez különböző típusú adatok tartozhatnak. Ha az esethez adat tartozik, konstruktorra van szükség.

```haskell
data Number
  = NInt Int      --'NInt' is the constructor for an Int Number.
  | NFloat Float  --'NFloat' is the constructor for an Float Number.
  | Invalid       --'Invalid' does not have data associated to it.
```

Egy adott esethez tartozó értéket úgy hozhatunk létre, hogy a nevére hivatkozunk (pl. `NInt 22`).
Mivel az esetnevek valójában konstruktorfüggvények, a hozzájuk tartozó adatot sima függvényargumentumként adhatjuk át.

Az ADT-k _strukturális egyenlőséggel_ rendelkeznek, ami azt jelenti, hogy két érték, amely ugyanahhoz az esethez tartozik, és ugyanazokkal az (opcionális) adatokkal rendelkezik, egyenértékű.

Bár használhatunk `if/else` kifejezéseket az ADT-k kezelésére, a velük való munka ajánlott módja a mintaillesztés a _case_ utasítással:

```haskell
add1 :: Number -> String
add1 number =
    case number of
      NInt    i -> show (i + 1)
      NFloat  f -> show (f + 1.0)
      Invalid   -> error "Invalid input"
```
