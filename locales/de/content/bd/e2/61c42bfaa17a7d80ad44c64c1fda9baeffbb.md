# Über

Ein Vokabular ist die Organisationseinheit in Factor: eine benannte
Sammlung von Wortdefinitionen.

```factor
USING: kernel ;
IN: greetings.formal

: hello ( name -- str ) "Greetings, " prepend ;
```

## Aufbau von Dateien und Verzeichnissen

Vokabelnamen verwenden `.` als Trennzeichen. Der Pfad folgt den
Punkten:

| Vokabular             | Datei                                       |
| ---                    | ---                                        |
| `greetings`            | `greetings/greetings.factor`               |
| `greetings.formal`     | `greetings/formal/formal.factor`           |
| `greetings.casual`     | `greetings/casual/casual.factor`           |

Der Loader von Factor sucht Vokabulare, indem er die *Vokabular-Wurzeln*
durchläuft (das Projektstammverzeichnis und die mitgelieferte
Basisbibliothek), bis er für jedes Pfadsegment ein Verzeichnis mit
passendem Namen findet. Das letzte Segment wird als Dateiname wiederholt.

## `USING:` und `IN:`

`USING:` (daneben `USE:` für jeweils ein einzelnes Vokabular) bringt
andere Vokabulare in den Suchpfad der aktuellen Datei. `IN:` legt fest,
zu welchem Vokabular die in dieser Datei definierten Wörter *gehören*:
Ihre vollqualifizierten Namen beginnen mit diesem Präfix.

```factor
USING: kernel sequences greetings.formal ;
IN: greetings

: greet-everyone ( names -- strs )
    [ hello ] map ;
```

Hier gehört `greet-everyone` zu `greetings`, ruft `hello` aus
`greetings.formal` auf und `map` aus `sequences`.

## Warum eine Lösung auf mehrere Vokabulare aufteilen

Wenn du Code auf mehrere Vokabulare aufteilst, kannst du:

- kleine Hilfswörter nach Zuständigkeit gruppieren, getrennt von der
  übergeordneten Routine, die sie zusammensetzt.
- die Hilfswörter von woanders wiederverwenden, ohne die
  Hauptroutine mitzuschleppen.
- jede Datei als eine einzelne, zusammenhängende Ebene der Abstraktion
  lesen.

Der Loader von Factor ist schnell und lazy genug, dass das Aufteilen
*nach unten* in kleinere Vokabulare wenig kostet; die Konvention in der
Standardbibliothek ist es, aggressiv zu faktorisieren.
