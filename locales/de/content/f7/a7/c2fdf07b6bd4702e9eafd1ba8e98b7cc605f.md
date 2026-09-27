# Einführung

Go bietet ein eingebautes Paket namens `fmt` (Format-Paket), das eine Vielzahl von Funktionen bereitstellt, um das Format von Eingaben und Ausgaben zu steuern.
Die am häufigsten verwendete Funktion ist `Sprintf`. Sie verwendet _Verben_ wie `%s`, um Werte in einen String einzusetzen, und gibt diesen String zurück.

```go
import "fmt"

food := "taco"
fmt.Sprintf("Bring me a %s", food)
// Returns: Bring me a taco
```

In Go lassen sich Gleitkommazahlen bequem mit den Verben von `Sprintf` formatieren: `%g` (kompakte Darstellung), `%e` (Exponent) oder `%f` (ohne Exponent).
Mit allen drei Verben lassen sich die Breite und die numerische Position des Feldes steuern.

```go
import "fmt"

number := 4.3242
fmt.Sprintf("%.2f", number)
// Returns: 4.32
```

Eine vollständige Liste der verfügbaren Verben findest du in der [Dokumentation des Format-Pakets][fmt-docs].

`fmt` enthält weitere Funktionen für die Arbeit mit Strings, zum Beispiel `Println`, die die Argumente, die sie erhält, einfach auf der Konsole ausgibt, und `Printf`, die die Eingabe genauso wie `Sprintf` formatiert, bevor sie sie ausgibt.

[fmt-docs]: https://pkg.go.dev/fmt
