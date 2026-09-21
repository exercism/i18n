# Tippek

## 1. Az ügyfelek osztályozása

- Az `any()` és az `all()` függvény hasznos lehet itt.
- Definiálhatsz külön függvényt ehhez a kettőhöz, de közvetlenül névtelen függvényt is használhatsz.

## 2. A határozott véleményű ügyfelek különválasztása

- A szótárat kell szűrnöd.
- Egy szótár alapértelmezés szerint kulcs/érték `Pair` párokon iterál, amelyeket mezőkkel (first/second) vagy indexszel (1/2) érhetsz el.
- Használd az `all_15()` függvényedet.

## 3. Az értékelések átalakítása binárissá

- Az `1`-et `0`-ra és az `5`-öt `1`-re kell leképezned.
- Ügyelj rá, hogy a kimeneti tömb alakja ugyanaz legyen, mint a bemeneti tömbé.

## 4. Az értékelésekből mátrix készítése

- Ez a `mapreduce()` függvénnyel oldható meg.
- Használd a `tobinary()` függvényedet a leképezés (egy részéhez?).
- Mátrixot úgy kaphatsz, ha vektorok vektorát `hcat()` vagy `vcat()` segítségével redukálod, attól függően, hogy oszlop- vagy sorvektor a bemenet.
- Figyelj a kimenetre. Minden értékelésvektor egy sor a mátrixban? A `transpose()` függvény valahol hasznos lehet.
