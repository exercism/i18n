# Einführung

Die `guard`-Anweisung in Swift dient dem frühen Verlassen von Funktionen, Schleifen oder Methoden, wenn eine erforderliche Bedingung nicht erfüllt ist:

```swift
guard myValue >= 0 else { return 0 }
let root = myValue.squareRoot()
```

Im obigen Beispiel wertet `guard` den booleschen Ausdruck aus, der darauf folgt.
Ist die Bedingung `true`, läuft die Ausführung mit dem Code nach der `guard`-Anweisung weiter.
Ist sie `false`, wird der Code im `else`-Block ausgeführt.

Anders als eine `if`-Anweisung:

- Eine `guard`-Anweisung **muss** einen `else`-Zweig enthalten.
- Der `else`-Zweig **muss** die Kontrolle so übertragen, dass der umgebende Gültigkeitsbereich verlassen wird (zum Beispiel mit `return`, `continue`, `break` oder indem du einen Fehler wirfst).

`guard` wird oft genutzt, um Vorbedingungen sauber zu prüfen.
Zum Beispiel die sinc-Funktion ($\text{sinc}(x) = \frac{\sin(x)}{x}$, mit $\text{sinc}(0) = 1$, um eine Division durch null zu vermeiden):

```swift
func sinc(_ x: Double) -> Double {
    guard x != 0 else { return 1 }
    return sin(x) / x
}

sinc(0)             // returns 1
sinc(Double.pi / 2) // returns 0.6366197723675814
```
