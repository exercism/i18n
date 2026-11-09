# Hinweise

## Allgemein

- Es ist möglich, aber nicht erforderlich, jede Aufgabe mit einer einzigen Anweisung im Funktionskörper zu lösen.


## 1. Feststellen, ob eine Karte vorhanden ist

- Befindet sich die Karte [im][ref-match] Stapel?

## 2. Die Position einer Karte finden

- Ist die Karte im Stapel enthalten?
- Wenn ja, an [welcher][ref-which] Position?
- Alle Karten sind garantiert verschieden, was die Aufgabe einfacher macht.
- Gib entweder die Position oder `-1` zurück.
  - Sieh dir das [Konzept zu Bedingungen][concept-conditionals] an, um verschiedene Möglichkeiten kennenzulernen, zu verzweigen, wenn etwas `TRUE` oder `FALSE` ist.
  - Wenn du [`if_else`][ref-if_else] verwendest (der modernste Ansatz, hier aber nicht wirklich erforderlich), sei dir bewusst, dass es strikt verlangt, dass beide Zweige denselben Typ von Ergebnis zurückgeben. Möglicherweise musst du ausdrücklich ein einzelnes Element zurückgeben statt eines Vektors, der leer sein könnte.
  - Um das erste Element eines Vektors zu erhalten, füge einfach `[1]` hinter alles an, das einen Vektor zurückgibt.

## 3. Feststellen, ob jede Karte gerade ist

- Der Rest-Operator ist `%%`.
- `x` ist gerade, wenn `x %% 2 == 0`.
- Erfüllen [alle][ref-all] Karten dieses Kriterium?

## 4. Prüfen, ob der Stapel eine Karte mit ungeradem Wert enthält

- Eine Karte ist ungerade, wenn sie nicht gerade ist, sieh dir also die vorherige Aufgabe an.
- Erfüllt [irgendeine][ref-any] Karte dieses Kriterium?

## 5. Die erste ungerade Karte aus dem Stapel holen

- Gibt es eine ungerade Karte im Stapel?
- Wenn ja, gib die erste _Karte_ zurück (nicht die Position).

## 6. Die Position der ersten geraden Karte bestimmen

- Gibt es eine gerade Karte im Stapel?
- Wenn ja, gib die _Position_ der ersten geraden Karte zurück.

[ref-match]: https://www.rdocumentation.org/packages/base/versions/3.6.2/topics/match
[ref-which]: https://www.rdocumentation.org/packages/base/versions/3.3.0/topics/which
[concept-conditionals]: https://exercism.org/tracks/r/concepts/conditionals
[ref-all]: https://www.rdocumentation.org/packages/base/versions/3.3.0/topics/all
[ref-any]: https://www.rdocumentation.org/packages/base/versions/3.3.0/topics/any
[ref-if_else]: https://dplyr.tidyverse.org/reference/if_else.html
