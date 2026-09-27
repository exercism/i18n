# Einführung

In Common Lisp gibt es vier Arten, Zeit darzustellen. Zwei davon schauen wir uns hier an.

- Die universelle Zeit ist eine absolute Zeit: eine Ganzzahl, die die Anzahl der Sekunden seit `1900-01-01T00:00:00Z` angibt (also Mitternacht am 1. Januar 1900 in UTC).
- Die dekodierte Zeit ist ein Tupel aus 9 Werten, die zusammen einen bestimmten Kalenderzeitpunkt darstellen: Sekunden, Minuten, Stunde, Tag des Monats, Monat, Jahr, Wochentag, Sommerzeit-Flag, Zeitzone.
(Darauf gehen wir weiter unten genauer ein.)

## Universelle Zeit

Um die aktuelle universelle Zeit zu erhalten, verwendet man `get-universal-time` oder `get-decoded-time`.
Die erste Funktion gibt die aktuellen Sekunden seit `1900-01-01T00:00Z` zurück, die zweite dieselben Daten im dekodierten Format.

## Dekodierte Zeit

`decode-universal-time` und `encode-universal-time` sind die wichtigsten Funktionen für die Arbeit mit Zeit.
Die erste nimmt eine universelle Zeit entgegen und gibt einen dekodierten Zeitwert als [multiple-values][concept-multiple-values] zurück; die zweite nimmt die dekodierten Zeitwerte als Argumente entgegen und gibt eine universelle Zeit zurück.

Beide nehmen ein optionales Zeitzonen-Argument entgegen.
Das Format der Zeitzone steht weiter unten.

Eine dekodierte Zeit besteht aus folgenden Werten:

- *Sekunden*: eine Ganzzahl zwischen 0 und 59
- *Minuten*: eine Ganzzahl zwischen 0 und 59
- *Stunde*: eine Ganzzahl zwischen 0 und 23
- *Tag des Monats*: eine Ganzzahl zwischen 1 und 31 (die Obergrenze hängt natürlich vom Monat und vom Jahr ab)
- *Monat*: eine Ganzzahl zwischen 1 und 12
- *Jahr*: eine Ganzzahl, die das Jahr angibt.
- *Wochentag*: eine Ganzzahl zwischen 0 und 6. 0 bedeutet Montag, 1 bedeutet Dienstag usw. ... 6 bedeutet Sonntag.
- *Sommerzeit-Flag*: ein wahrer Wert zeigt an, dass die Sommerzeit gilt.
- *Zeitzone*: eine Zahl von Stunden zwischen -24 und 24, die den Versatz zu UTC angibt.
Die Zahl ist eine rationale Zahl und muss ein Vielfaches von `1/3600` sein.

```lisp
(encode-universal-time 1 2 3 4 5 2000 0) ; => 3166398121
(decode-universal-time 3166398121)       ; => 1
                                         ;    2
                                         ;    3
                                         ;    4
                                         ;    5
                                         ;    2000
                                         ;    3 (Thursday)
                                         ;    NIL
                                         ;    0
(decode-universal-time 2208988800) ; => 0
                                   ;    0
                                   ;    0
                                   ;    1
                                   ;    1
                                   ;    1970
                                   ;    3
                                   ;    NIL
                                   ;    0
```

[concept-multiple-values]: /tracks/common-lisp/concepts/multiple-values
