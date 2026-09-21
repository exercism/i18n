# Tippek

## 1. Határozd meg, hogy szükséged lesz-e jogosítványra

- A [szigorú egyenlőségoperátor][mdn-equality-operators] segítségével ellenőrizd, hogy a bemeneted egyenlő-e egy adott stringgel.
- A boolean fogalomban megismert két [logikai operátor][mdn-logical-operators] egyikével kombináld a két feltételt.
- Ehhez a részfeladathoz **nem** kell elágazás. A felépített boolean kifejezést közvetlenül visszaadhatod.

## 2. Válassz két lehetséges megvásárolható jármű közül

- Egy [relációs operátor][mdn-relational-operators] segítségével állapítsd meg, melyik lehetőség jön előbb a szótári sorrendben.
- Ezután az összehasonlítás eredményétől függően állítsd be egy segédváltozó értékét egy [if-else elágazás][mdn-if-statement] segítségével.
- Végül építsd fel az ajánló mondatot. Ehhez az [összeadás operátor][mdn-addition] használatával fűzheted össze a két stringet.

## 3. Számíts becslést egy használt jármű árára

- Kezdd azzal, hogy meghatározod a jármű kora alapján a százalékot. Mentsd el egy segédváltozóban. Használj [if-else if-else elágazást][mdn-if-statement], ahogy az utasításokban szerepel.
- A két if feltételben [relációs operátorok][mdn-relational-operators] segítségével hasonlítsd össze az autó korát a küszöbértékekkel.
- Az eredmény kiszámításához alkalmazd a százalékot az eredeti árra. Például a `30% of x` kiszámítható úgy, hogy `30`-at elosztod `100`-zal, és megszorzod `x`-szel.

[mdn-equality-operators]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators#equality_operators
[mdn-logical-operators]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators#binary_logical_operators
[mdn-relational-operators]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators#relational_operators
[mdn-addition]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Addition
[mdn-if-statement]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else
