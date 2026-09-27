# Hinweise

## Allgemeines

- Die Anzahl der Vögel pro Tag wird in einem [Feld][fields] mit dem Namen `birdsPerDay` gespeichert.
- Die Anzahl der Vögel pro Tag ist ein Array, das genau 7 Ganzzahlen enthält.

## 1. Prüfe, wie viele Vögel letzte Woche gezählt wurden

- Da diese Methode _nicht_ von der Zählung der aktuellen Woche abhängt, ist sie als [`static`-Methode][static-members] definiert.
- Es gibt [mehrere Möglichkeiten, ein Array zu definieren][single-dimensional-arrays].

## 2. Prüfe, wie viele Vögel heute zu Besuch kamen

- Denk daran, dass die Zählungen nach Tagen geordnet sind, vom ältesten zum neuesten, wobei das letzte Element den heutigen Tag darstellt.
- Auf das letzte Element kannst du entweder über seinen (festen) Index zugreifen (denk daran, bei null mit dem Zählen zu beginnen) oder seinen Index über die [Größe des Arrays][array-length] berechnen.

## 3. Erhöhe die heutige Zählung

- Setze das Element, das die heutige Zählung darstellt, auf die heutige Zählung plus 1.

## 4. Prüfe, ob es einen Tag ohne Vögel gab

- Die Klasse `Array` hat eine [eingebaute Methode][array-indexof], die den ersten Index zurückgibt, an dem das Element gefunden wird, oder -1, wenn kein passendes Element gefunden wurde.

## 5. Berechne die Anzahl der Vögel für die ersten Tage

- Du kannst eine Variable verwenden, um die Anzahl der zu Besuch kommenden Vögel zu speichern.
- Das Array kann mit einer [`for`-Schleife][for-statement] durchlaufen werden.
- Die Variable kann innerhalb der Schleife aktualisiert werden.
- Denk daran: Arrays werden ab `0` indiziert.

## 6. Berechne die Anzahl der geschäftigen Tage

- Du kannst eine Variable verwenden, um die Anzahl der geschäftigen Tage zu speichern.
- Das Array kann mit einer [`foreach`-Schleife][array-foreach] durchlaufen werden.
- Die Variable kann innerhalb der Schleife aktualisiert werden.
- Innerhalb der Schleife kann eine [Bedingte Anweisung][if-statement] verwendet werden.

[array-foreach]: https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/arrays/using-foreach-with-arrays
[single-dimensional-arrays]: https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/arrays/single-dimensional-arrays
[fields]: https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/fields
[static-members]: https://www.oreilly.com/library/view/programming-c/0596001177/ch04s03.html
[array-indexof]: https://docs.microsoft.com/en-us/dotnet/api/system.array.indexof
[if-statement]: https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/if-else
[array-length]: https://docs.microsoft.com/en-us/dotnet/api/system.array.length
[for-statement]: https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/for
