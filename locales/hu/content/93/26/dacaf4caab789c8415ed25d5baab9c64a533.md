# Tippek

A bevezető tartalmazza a feladathoz szükséges dolgok nagy részét.
Az 5. részfeladat (a megjelenítés) korábban is elvégezhető, hogy segítse a vizualizációt, de ügyelj rá, hogy figyelembe vedd a pontok lehetséges, eltérő értékeit.

## 1. Definiáld az Exercism logót `Matrix`-ként

- Légy kreatív! De egyszerűen be is másolhatod a feladatleírásból.

## 2. Definiálj függvényeket, amelyekkel a logó összehúzza a szemöldökét

- Ne feledd, hogy a `!` jellel végződő függvények megváltoztatják a bemenetet (helyben módosítják), a többi viszont nem.
- A `frown!` megvalósítható egyes elemek értékadásával, vagy (kevésbé hatékonyan) két sor felcserélésével.
- A `frown` nagyon hasonló lesz a `frown!`-hoz, csak a bemeneti mátrix `copy` másolatát adja vissza.

## 3. Rakj össze egy matricafalat

- Használd a `frown()` függvényedet.
- A `vcat()` és `hcat()` függvények, illetve ezek megfelelői itt jó barátaid lesznek.
- Figyeld meg, hogy a felső felet az alsótól egy csupa `1`-ből (azaz `X`-ből) álló sor választja el.
- A `ones()` függvényt is használhatod, ha szeretnéd, de ügyelj az alakjára.

## 4. Alakítsd át a pontokat oszloponkénti pixelszámokká

- A broadcast nagyszerű módja annak, hogy ezt tömören megvalósítsd.
- A broadcasthoz egy *sor* vektorra lesz szükséged, amely az egyes oszlopok pontszámait tartalmazza.
- Ahhoz, hogy egy vektort kapj az oszloponkénti pontszámokkal, alkalmazhatsz egy függvényt a `Matrix`-ra a megadott `dims` paraméterrel.

## 5. Jeleníts meg egy pontmátrixot

- A pontokat (pl. `1`, `2` stb.) és a `0`-kat `"X"`-re, illetve `" "`-re kell átalakítani.
- A `eachrow()` használata egy belső ciklushoz hasznos lehet itt, de nem szükséges.
- A `join()` függvény is segíthet tömörebbé tenni a dolgokat, sőt akár broadcastolható is.
