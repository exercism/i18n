# Tippek

## Általános

- Ezekhez a feladatokhoz [feltételes kifejezésekre][concept-conditionals] lesz szükséged.

## 1. Karakterek összehasonlítása

- A karaktereket olyan függvényekkel lehet összehasonlítani, mint a `char-greaterp`, a `char-lessp` és a `char=`.

## 2. A karakter „méretének” meghatározása

- A Common Lispben két függvény dönti el, hogy egy karakter nagy- vagy kisbetű: a `upper-case-p` és a `lower-case-p`.
- Egy karakter nem feltétlenül nagybetű vagy kisbetű.

## 3. A karakter „méretének” megváltoztatása

- A Common Lispben két függvény szolgál egy karakter „méretének” megváltoztatására: a `char-upcase` és a `char-downcase`.

## 4. A karakter „típusának” meghatározása

- A Common Lispben van egy `alpha-char-p` predikátumfüggvény, amely megmondja, hogy egy karakter betű-e.
- A Common Lispben van egy `digit-char-p` predikátumfüggvény, amely megmondja, hogy egy karakter számjegy-e.
- A `char=` segítségével megállapíthatod, hogy két karakter egyenlő-e.
- A szóközt a Common Lispben #\Space jelöli.
- Az újsor karaktert a Common Lispben #\Newline jelöli.

[concept-conditionals]: /tracks/common-lisp/concepts/conditionals
