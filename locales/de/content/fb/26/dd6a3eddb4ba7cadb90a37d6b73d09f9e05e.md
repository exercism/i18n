# Ergänzung zu den Anweisungen

## Anweisungen für Arturo

Für diese Übung musst du zwei verschiedene Arten unterstützen, das Wort `stringify` aufzurufen:

1. Mit dem Attribut `roman` (z. B. `stringify.roman 3999`)
2. Ohne das Attribut `roman` (z. B. `stringify 3999`)

Weitere Informationen findest du in der Dokumentation zu [Attributen][attributes] sowie in der Dokumentation zu [`attr`][attr].

~~~~exercism/caution
Zusätzlich zu `attr` ist die Funktion `attrs` nützlich: Sie gibt alle Attribute des Funktionsaufrufs als Wörterbuch zurück.

Achtung, diese beiden Funktionen sind destruktiv!

Die Implementierung von Arturo verwendet eine [„Attribute-Tabelle“][createAttrsStack].

* `attrs` [leert die Tabelle ausdrücklich][getAttrsDict], nachdem die Attribute abgerufen wurden.
* `attr` [entfernt („poppt“) das Attribut aus der Tabelle][builtinAttr].

Ein Beispiel:

```arturo
showAttributes: function [x][
    print attr 'question
    print attrs
    print attrs
]

showAttributes .question:"6 * 9" .answer:42 'arg
```
gibt aus
```
6 * 9
[answer:42]
[]
```

Bei jedem Schritt sehen wir, wie das Attribut-Wörterbuch schrumpft.

**Fazit**: Beachte, dass du Attribute nur einmal abrufen kannst.
Wenn du später noch einmal auf Attribute zugreifen musst, erfasse sie am Anfang deiner Funktionen.

[getAttrsDict]: https://github.com/arturo-lang/arturo/blob/2ef0081570feb6ab752404c32bbf85132df379fb/src/vm/stack.nim#L187
[builtinAttr]: https://github.com/arturo-lang/arturo/blob/2ef0081570feb6ab752404c32bbf85132df379fb/src/library/Reflection.nim#L85
[createAttrsStack]: https://github.com/arturo-lang/arturo/blob/2ef0081570feb6ab752404c32bbf85132df379fb/src/vm/stack.nim#L136
~~~~

[attributes]: https://arturo-lang.io/documentation/language/#attributes
[attr]: https://arturo-lang.io/documentation/library/reflection/attr/
