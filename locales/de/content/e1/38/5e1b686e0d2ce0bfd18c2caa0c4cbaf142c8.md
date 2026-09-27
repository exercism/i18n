# Überblick

## Allgemeine Syntax

Die for-Schleife ist eine der am häufigsten verwendeten Anweisungen, um Logik wiederholt auszuführen.
In Go besteht sie aus dem Schlüsselwort `for`, einem Schleifenkopf und einem Block, der den in geschweifte Klammern gefassten Schleifenblock enthält.
Der Schleifenkopf besteht aus 3 Komponenten, die durch Semikolons `;` getrennt sind: Initialisierung, Bedingung und Post.

```go
for init; condition; post {
  // loop body - code that is executed repeatedly as long as the condition is true
}
```

- Die Komponente **Initialisierung** ist Code, der nur einmal ausgeführt wird, bevor die Schleife startet.
- Die Komponente **Bedingung** muss ein Ausdruck sein, der zu einem booleschen Wert auswertet und steuert, wann die Schleife beendet werden soll.
  Der Code in der Schleife wird so lange ausgeführt, wie diese Bedingung zu wahr auswertet.
  Sobald dieser Ausdruck zu falsch auswertet, werden keine weiteren Iterationen der Schleife ausgeführt.
- Die Komponente **Post** ist Code, der am Ende jeder Iteration ausgeführt wird.

**Hinweis:** Anders als in anderen Sprachen gibt es keine runden Klammern `()` um die drei Komponenten des Schleifenkopfs.
Tatsächlich ist das Einfügen solcher Klammern ein Kompilierungsfehler.
Die geschweiften Klammern `{ }` um den Schleifenblock sind jedoch immer erforderlich.

## For-Schleifen: Ein Beispiel

Die Initialisierung richtet normalerweise eine Zählervariable ein, die Bedingung prüft, ob die Schleife fortgesetzt oder beendet werden soll, und die Post-Komponente erhöht normalerweise den Zähler am Ende jeder Wiederholung.

```go
for i := 1; i < 10; i++ {
  fmt.Println(i)
}
```

Diese Schleife gibt die Zahlen von `1` bis `9` aus (einschließlich `9`).
Den Schritt legst du oft mit einer Anweisung zum Erhöhen oder Verringern fest, wie im obigen Beispiel gezeigt.

## Optionale Komponenten des Schleifenkopfs

Die Komponenten Initialisierung und Post im Schleifenkopf sind optional:

```go
var sum = 1
for sum < 1000 {
	sum += sum
}
fmt.Println(sum)
// Output: 1024
```

Wenn du die Initialisierung und die Post-Komponente in einer for-Schleife wie oben weglässt, erzeugst du eine while-Schleife in Go.
Es gibt kein Schlüsselwort `while`.
Das ist ein Beispiel für das Go-Prinzip, dass Konzepte orthogonal sein sollten.
Da es bereits ein Konzept gibt, um das Verhalten einer while-Schleife zu erreichen, nämlich die for-Schleife, wurde `while` nicht als zusätzliches Konzept hinzugefügt.

## Break und Continue

Innerhalb eines Schleifenblocks kannst du das Schlüsselwort `break` verwenden, um die Ausführung der Schleife vollständig zu beenden:

```go
for n := 0; n <= 5; n++ {
  if n == 3 {
    break
  }
  fmt.Println(n)
}
// Output:
// 0
// 1
// 2
```

Im Gegensatz dazu stoppt das Schlüsselwort `continue` nur die Ausführung der aktuellen Iteration und fährt mit der nächsten fort:

```go
for n := 0; n <= 5; n++ {
  if n%2 == 0 {
    continue
  }
  fmt.Println(n)
}
// Output:
// 1
// 3
// 5
```

## Unendliche for-Schleife

Der Bedingungsteil des Schleifenkopfs ist ebenfalls optional.
Tatsächlich kannst du eine Schleife ohne Schleifenkopf schreiben:

```go
for {
  // Endless loop...
}
```

Diese Schleife endet nur, wenn das Programm beendet wird oder wenn sie ein `break` in ihrem Schleifenblock enthält.

## Labels und goto

Wenn wir `break` verwenden, stoppt Go die innerste Schleife.
Ebenso führt Go bei Verwendung von `continue` die nächste Iteration der innersten Schleife aus.
Das ist jedoch nicht immer wünschenswert.
Wir können Labels zusammen mit `break` und `continue` verwenden, um genau festzulegen, aus welcher Schleife wir aussteigen bzw. in welcher wir fortfahren wollen.
In diesem Beispiel erstellen wir ein Label `OuterLoop`, das auf die äußerste Schleife verweist.
In der innersten Schleife verwenden wir dann `break` gefolgt vom Namen des Labels der äußersten Schleife, um auszudrücken, dass wir aus der äußersten Schleife aussteigen wollen:

```go
OuterLoop:
    for i := 0; i < 10; i++ {
        for j := 0; j < 10; j++ {
            // ...
            break OuterLoop
        }
    }
```

Die Verwendung von Labels mit `continue` würde ebenfalls funktionieren; in diesem Fall würde Go mit der nächsten Iteration der Schleife fortfahren, auf die das Label verweist.
Go hat außerdem ein Schlüsselwort `goto`, das ähnlich funktioniert und es uns ermöglicht, von einem Codestück zu einem anderen mit einem Label markierten Codestück zu springen.
**Warnung:** Obwohl Go erlaubt, zu einem mit einem Label markierten Codestück zu springen, kann die Verwendung dieses Sprachfeatures den Code schnell sehr schwer lesbar machen.
Aus diesem Grund wird die Verwendung von Labels oft nicht empfohlen.
