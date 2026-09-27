# Einführung

Slices in Go ähneln Listen oder Arrays in anderen Sprachen.
Sie enthalten mehrere Elemente eines bestimmten Typs (oder Interfaces).

Slices in Go basieren auf Arrays.
Arrays haben eine feste Größe.
Ein Slice ist dagegen eine dynamisch dimensionierte, flexible Sicht auf die Elemente eines Arrays.

Ein Slice wird wie `[]T` geschrieben, wobei `T` der Typ der Elemente im Slice ist:

```go
var empty []int                 // an empty slice
withData := []int{0,1,2,3,4,5}  // a slice pre-filled with some data
```

Du kannst ein Element an einem bestimmten nullbasierten Index mit eckigen Klammern abrufen oder setzen:

```go
withData[1] = 5
x := withData[1] // x is now 5
```

Du kannst aus einem vorhandenen Slice einen neuen Slice erstellen, indem du einen Bereich von Elementen abrufst.
Dabei verwendest du wieder eckige Klammern, gibst aber sowohl einen Startindex (einschließlich) als auch einen Endindex (ausschließlich) an.
Wenn du keinen Startindex angibst, ist er standardmäßig 0.
Wenn du keinen Endindex angibst, ist er standardmäßig die Länge des Slices.

```go
newSlice := withData[2:4]
// => []int{2,3}
newSlice := withData[:2]
// => []int{0,1}
newSlice := withData[2:]
// => []int{2,3,4,5}
newSlice := withData[:]
// => []int{0,1,2,3,4,5}
```

Du kannst Elemente mit der Funktion `append` zu einem Slice hinzufügen.
Im Folgenden hängen wir `4` und `2` an den Slice `a` an.

```go
a := []int{1, 3}
a = append(a, 4, 2)
// => []int{1,3,4,2}
```

`append` gibt immer einen neuen Slice zurück. Wenn wir nur Elemente an einen vorhandenen Slice anhängen wollen, ist es üblich, das Ergebnis wieder der Slice-Variablen zuzuweisen, die wir als erstes Argument übergeben, so wie oben.

Mit `append` kannst du auch zwei Slices zusammenführen:

```go
nextSlice := []int{100,101,102}
newSlice  := append(withData, nextSlice...)
// => []int{0,1,2,3,4,5,100,101,102}
```

## Indizes in Slices

Wenn du mit Indizes von Slices arbeitest, solltest du das immer durch eine Prüfung absichern, die sicherstellt, dass der Index tatsächlich existiert.
Wenn du das nicht tust, stürzt die gesamte Anwendung ab.

## Leere Slices

`nil`-Slices sind der Standard für leere Slices.
Sie haben keine Nachteile gegenüber einem Slice ohne Werte.
Die Funktion `len` funktioniert mit `nil`-Slices, Elemente können hinzugefügt werden, ohne ihn zu initialisieren, und so weiter.
Wenn du einen neuen Slice erstellst, bevorzuge `var s []int` (`nil`-Slice) gegenüber `s := []int{}` (leerer, nicht-`nil`-Slice).

## Performance

Wenn du Slices erstellst, die iterativ gefüllt werden, gibt es eine einfache Möglichkeit, die Performance zu verbessern, sofern die endgültige Größe des Slices bekannt ist.
Der Schlüssel ist, die Anzahl der Speicherzuweisungen zu minimieren, denn sie sind ziemlich teuer und fallen an, wenn der Slice über seinen zugewiesenen Speicherbereich hinauswächst.
Der sicherste Weg ist, eine Kapazität `cap` für den Slice mit `s := make([]int, 0, cap)` anzugeben und dann wie gewohnt mit `append` Elemente an den Slice anzuhängen.
Auf diese Weise wird der Speicherplatz für `cap` Elemente sofort zugewiesen, während die Länge des Slices null ist.
In der Praxis ist `cap` oft die Länge eines anderen Slices: `s := make([]int, 0, len(otherSlice))`.

## Append ist keine reine Funktion

Die Funktion `append` von Go ist auf Performance optimiert und erstellt daher keine Kopie des Eingabe-Slices.
Das bedeutet, dass der ursprüngliche Slice (1. Parameter in `append`) manchmal geändert wird.
