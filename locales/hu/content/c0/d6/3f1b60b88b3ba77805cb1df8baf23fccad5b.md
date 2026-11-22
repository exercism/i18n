# Bevezetés

Ha egy `jq` program egy érték feldolgozása közben problémába fut — például egy számot stringgel próbál indexelni, érvénytelen JSON szöveget dolgoz fel, vagy rossz típusú argumentummal hív meg egy függvényt —, akkor **futásidejű hibát** vált ki.
Ha egy futásidejű hiba nincs elkapva, a `jq` üzenetet ír a _szabványos hibakimenetre_, és `5`-ös státusszal lép ki.

## Hibák kiváltása: `error` és `error(message)`

- Az `error` olyan hibát vált ki, amelynek értéke a **bemeneti** érték.
- Az `error(message)` olyan hibát vált ki, amelynek értéke a `message` eredménye.

A hiba értéke _bármilyen_ JSON-érték lehet, nem csak string.

```jq
42 | error("invalid value: \(.)")
# => "invalid value: 42"

42 | error
(not a string): 42
```

## Hibák elkapása: `try` és `catch`

A hibákat a `try EXP catch HANDLER` szerkezettel kaphatod el.
Először az első kifejezés fut le; ha az hibát vált ki, akkor a `HANDLER` kifejezés fut le, **úgy, hogy bemenete a hiba értéke**.
A `try catch` kimenete annak a kifejezésnek a kimenete, amelyik utoljára lefutott (vagy az `EXP`, vagy a `HANDLER`).

```jq
{a: 42} | try .a catch "no index a in \(.)"
# => 42

true | try .a catch "cannot index a \(type)"
# => "cannot index a boolean"

true | try error("some exception") catch .
# => "some exception"
```

A rövidebb `try EXP` forma ugyanazt jelenti, mint a `try EXP catch empty`: a hiba eldobódik, és nem lesz kimenet.

```jq
[{}, true, {"a": 1}] | [.[] | try .a]
# => [null, 1]
```

## Hibák elnyomása: a `?` operátor

A `?` operátor `EXP?` alakban a `try EXP` rövidítése.
Egy hibát okozó kifejezést olyanná alakít, amely egyszerűen nem ad kimenetet.

```jq
["1", "invalid", "3", 4] | [.[] | tonumber?]
# => [1, 3, 4]
```

Gyakran indexelő operátorokhoz téve találkozhatsz vele: `.foo?` és `.[]?`.

## A program leállítása: `halt_error` és `halt`

A `halt_error` leállítja a programot, a bemenetét nyers szövegként kiírja a _szabványos hibakimenetre_, majd a megadott státusszal lép ki; ha nem adsz meg státuszt, az alapérték `5`.
A rokon `halt` szűrő csendben állítja le a programot, `0`-ás kilépési státusszal.

```jq
"Error: something went wrong" | halt_error(1)
```
