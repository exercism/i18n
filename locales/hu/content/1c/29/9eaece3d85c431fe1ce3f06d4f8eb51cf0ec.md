# Kiegészítés az utasításokhoz

## Megvalósítás

Cairoban, ahol nincs natív támogatás a lebegőpontos számokra, a törtértékeket egész számokkal ábrázoljuk.

Ez a megközelítés elengedhetetlen a blokklánc-fejlesztésben a számítások pontosságának megőrzéséhez.

Ebben a feladatban **fixpontos aritmetikát** használunk azzal, hogy a keringési időket mikroszekundumokká alakítjuk.

Például a Merkúr `0.2408467` földi évnyi keringési ideje `240,846,700` mikroszekundum lesz, ha megszorozzuk `1,000,000`-rel.

A tizedes pontosság figyelembevétele érdekében a tesztesetek azt feltételezik, hogy a kapott életkor **két tizedesjegyet** tartalmaz, egész számokként ábrázolva.

Ez azt jelenti, hogy egy `31.69` éves életkor `3169`-ként van tárolva a kódban.

Ennek érdekében 100-zal szorozunk, mielőtt elvégezzük az osztást.

Íme egy példa:

```rust
let mercury_orbital_period = 240_846_700; // in microseconds
let age_microseconds = age_seconds * 1_000_000;
// multiplying with 100 to retain 2 decimal places
age_microseconds * 100 / mercury_orbital_period
```

Ezzel a módszerrel biztosítod, hogy a törtértékek pontosan egész számokként legyenek ábrázolva, miközben megőrzöd a szükséges két tizedesjegy pontosságot, ami elengedhetetlen a tesztek sikeres teljesítéséhez.
