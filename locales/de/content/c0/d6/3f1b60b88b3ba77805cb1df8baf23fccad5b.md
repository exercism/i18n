# Einführung

Ein `jq`-Programm, das beim Verarbeiten eines Werts auf ein Problem stößt, löst einen **Laufzeitfehler** aus. Das passiert zum Beispiel, wenn es eine Zahl mit einem String indiziert, ungültigen JSON-Text parst oder eine Funktion mit einem Argument vom falschen Typ aufruft.
Ein nicht abgefangener Laufzeitfehler führt dazu, dass `jq` eine Meldung auf der _Standardfehlerausgabe_ ausgibt und mit Status `5` beendet wird.

## Fehler auslösen: `error` und `error(message)`

- `error` löst einen Fehler aus, dessen Wert der **Eingabewert** ist.
- `error(message)` löst einen Fehler aus, dessen Wert das Ergebnis von `message` ist.

Der Fehlerwert kann _jeder_ JSON-Wert sein, nicht nur ein String.

```jq
42 | error("invalid value: \(.)")
# => "invalid value: 42"

42 | error
(not a string): 42
```

## Fehler abfangen: `try` und `catch`

Fehler lassen sich mit `try EXP catch HANDLER` abfangen.
Der erste Ausdruck wird ausgeführt; löst er einen Fehler aus, wird der Ausdruck `HANDLER` **mit dem Fehlerwert als Eingabewert** ausgeführt.
Die Ausgabe von `try catch` ist die Ausgabe des Ausdrucks, der zuletzt ausgeführt wurde (entweder `EXP` oder `HANDLER`).

```jq
{a: 42} | try .a catch "no index a in \(.)"
# => 42

true | try .a catch "cannot index a \(type)"
# => "cannot index a boolean"

true | try error("some exception") catch .
# => "some exception"
```

Die kürzere Form `try EXP` entspricht `try EXP catch empty`: Der Fehler wird verworfen und es wird keine Ausgabe erzeugt.

```jq
[{}, true, {"a": 1}] | [.[] | try .a]
# => [null, 1]
```

## Fehler unterdrücken: der Operator `?`

Der Operator `?`, verwendet als `EXP?`, ist eine Kurzform für `try EXP`.
Er verwandelt einen fehlschlagenden Ausdruck in einen, der einfach keine Ausgabe erzeugt.

```jq
["1", "invalid", "3", 4] | [.[] | tonumber?]
# => [1, 3, 4]
```

Oft sieht man ihn an den Indizierungsoperatoren: `.foo?` und `.[]?`.

## Das Programm anhalten: `halt_error` und `halt`

`halt_error` stoppt das Programm, gibt seinen Eingabewert als reinen Text auf der _Standardfehlerausgabe_ aus und beendet es mit dem angegebenen Status, standardmäßig `5`.
Der verwandte Filter `halt` stoppt das Programm ohne Ausgabe mit Beendigungsstatus `0`.

```jq
"Error: something went wrong" | halt_error(1)
```
