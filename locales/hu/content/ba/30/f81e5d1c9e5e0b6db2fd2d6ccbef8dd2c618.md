# Tippek

## Általános

- A Factorban a karakterek egészek (Unicode-kódpontok), ezért a numerikus `<`, `>` és `=` operátorok közvetlenül működnek.
- A predikátumok és a kis- és nagybetűváltás az [`unicode`][unicode] szótárban találhatók.
- A visszaadott szimbólumokat (`less`, `big`, `alpha`, ...) deklarálni kell, mielőtt használod; a `SYMBOLS: ... ;` formával csoportosíthatod őket.

## 1. Két karakter összehasonlítása

- Használd a `<` és `>` operátort a [`math`][math] szótárból.
- A három esetet a [`combinators`][combinators] szótárból származó `cond` segítségével fogd össze.

## 2. A méret meghatározása

- A `LETTER?` a nagybetűs predikátum, a `letter?` pedig a kisbetűs.

## 3. A méret megváltoztatása

- A `ch>upper` és a `ch>lower` a karakterenkénti átalakítók (létezik karakterlánc szintű `>upper`/`>lower` is, de itt egyetlen karaktered van).

## 4. A típus meghatározása

- A `cond`-ban számít a sorrend. A `Letter?` a nagy- *vagy* a kisbetűkre is illeszkedik, ezért minden nagy- vagy kisbetűre vonatkozó vizsgálat előtt kell lefutnia.

[unicode]: https://docs.factorcode.org/content/vocab-unicode.html
[math]: https://docs.factorcode.org/content/vocab-math.html
[combinators]: https://docs.factorcode.org/content/vocab-combinators.html
