# Hinweise

## Allgemein

- [Sets][sets] sind veränderbare, ungeordnete Sammlungen ohne doppelte Elemente.
- Sets können jeden Datentyp enthalten, solange alle Elemente [hashbar][hashable] sind.
- Sets sind [iterierbar][iterable].
- Sets werden meistens verwendet, um andere Sammlungen schnell zu deduplizieren oder um Zugehörigkeit zu prüfen.
- Sets unterstützen auch mathematische Operationen wie `union`, `intersection`, `difference` und `symmetric difference`

## 1. Zutaten der Gerichte bereinigen

- Der Konstruktor `set()` kann jedes [Iterable][iterable] als Argument annehmen. [Konzept: Listen](/tracks/python/concepts/lists) sind iterierbar.
- Denk daran: [Konzept: Tupel](/tracks/python/concepts/tuples) lassen sich mit `(<element_1>, <element_2>)` oder über den Konstruktor `tuple()` bilden.

## 2. Cocktails und Mocktails

- Ein `set` ist _disjunkt_ zu einem anderen Set, wenn die beiden Sets keine gemeinsamen Elemente haben.
- Der Konstruktor `set()` kann jedes [Iterable][iterable] als Argument annehmen. [Konzept: Listen](/tracks/python/concepts/lists) sind iterierbar.
- In Python lassen sich [Konzept: Strings](/tracks/python/concepts/strings) mit dem `+`-Zeichen verketten.

## 3. Gerichte kategorisieren

- Vielleicht ist es hier nützlich, mit [Konzept: Schleifen](/tracks/python/concepts/loops) durch die verfügbaren Mahlzeitenkategorien zu iterieren.
- Wenn alle Elemente von `<set_1>` in `<set_2>` enthalten sind, dann gilt `<set_1> <= <set_2>`.
- Das Methodenäquivalent von `<=` ist `<set>.issubset(<iterable>)`
- [Konzept: Tupel](/tracks/python/concepts/tuples) können jeden Datentyp enthalten, auch andere Tupel. Tupel lassen sich mit `(<element_1>, <element_2>)` oder über den Konstruktor `tuple()` bilden.
- Auf Elemente innerhalb von [Konzept: Tupel](/tracks/python/concepts/tuples) kannst du von links mit einer 0-basierten Indexzahl zugreifen oder von rechts mit einer -1-basierten Indexzahl.
- Der Konstruktor `set()` kann jedes [Iterable][iterable] als Argument annehmen. [Konzept: Listen](/tracks/python/concepts/lists) sind iterierbar.
- [Konzept: Strings](/tracks/python/concepts/strings) lassen sich mit dem `+`-Zeichen verketten.

## 4. Allergene und eingeschränkte Lebensmittel kennzeichnen

- Eine Set-_Schnittmenge_ sind die Elemente, die `<set_1>` und `<set_2>` gemeinsam haben.
- Das Set-Methodenäquivalent von `&` ist `<set>.intersection(<iterable>)`
- Auf Elemente innerhalb von [Konzept: Tupel](/tracks/python/concepts/tuples) kannst du von links mit einer 0-basierten Indexzahl zugreifen oder von rechts mit einer -1-basierten Indexzahl.
- Der Konstruktor `set()` kann jedes [Iterable][iterable] als Argument annehmen. [Konzept: Listen](/tracks/python/concepts/lists) sind iterierbar.
- [Konzept: Tupel](/tracks/python/concepts/tuples) lassen sich mit `(<element_1>, <element_2>)` oder über den Konstruktor `tuple()` bilden.

## 5. Eine „Masterliste“ der Zutaten zusammenstellen

- Eine Set-_Vereinigung_ entsteht, wenn `<set_1`> und `<set_2>` zu einem einzigen `set` kombiniert werden
- Das Set-Methodenäquivalent von `|` ist `<set>.union(<iterable>)`
- Vielleicht ist es hier nützlich, mit [Konzept: Schleifen](/tracks/python/concepts/loops) durch die verschiedenen Gerichte zu iterieren.

## 6. Vorspeisen zum Servieren auf Tabletts herausziehen

- Eine Set-_Differenz_ entsteht, wenn die Elemente von `<set_2>` aus `<set_1>` entfernt werden, z. B. `<set_1> - <set_2>`.
- Das Set-Methodenäquivalent von `-` ist `<set>.difference(<iterable>)`
- Der Konstruktor `set()` kann jedes [Iterable][iterable] als Argument annehmen. [Konzept: Listen](/tracks/python/concepts/lists) sind iterierbar.
- Der Konstruktor von [Konzept: Liste](/tracks/python/concepts/lists) kann jedes [Iterable][iterable] als Argument annehmen. Sets sind iterierbar.

## 7. Zutaten finden, die nur in einem Rezept vorkommen

- Eine Set-_symmetrische Differenz_ enthält Elemente, die in `<set_1>` oder `<set_2>` vorkommen, aber nicht in **_beiden_** Sets.
- Eine Set-_symmetrische Differenz_ ist dasselbe, wie wenn du die `set`-_Schnittmenge_ von der `set`-_Vereinigung_ subtrahierst, z. B. `(<set_1> | <set_2>) - (<set_1> & <set_2>)`
- Eine _symmetrische Differenz_ von mehr als zwei `sets` enthält Elemente, die über die Eingabe-`sets` hinweg mehr als zweimal vorkommen. Um diese über Sets hinweg wiederholten Elemente zu entfernen, müssen die _Schnittmengen_ zwischen Set-Paaren von der symmetrischen Differenz subtrahiert werden.
- Vielleicht ist es hier nützlich, mit [Konzept: Schleifen](/tracks/python/concepts/loops) durch die verschiedenen Gerichte zu iterieren.


[hashable]: https://docs.python.org/3.7/glossary.html#term-hashable
[iterable]: https://docs.python.org/3/glossary.html#term-iterable
[sets]: https://docs.python.org/3/tutorial/datastructures.html#sets