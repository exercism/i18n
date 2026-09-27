# Anweisungen

Als angehende Magierin muss Elyse noch ein paar Grundlagen üben.
Sie hat einen Stapel Karten, den sie manipulieren möchte.

Um es sich etwas einfacher zu machen, benutzt sie nur die Karten 1 bis 10, sodass sich ihr Kartenstapel durch ein Array von Zahlen darstellen lässt.
Die Position einer bestimmten Karte entspricht dem Index im Array.
Das heißt, Position 0 verweist auf die erste Karte, Position 1 auf die zweite Karte und so weiter.

~~~~exercism/note
Alle Funktionen sollen das Array der Karten aktualisieren und dann das geänderte Array zurückgeben. Diese weit verbreitete Arbeitsweise ist als Builder-Pattern bekannt und erlaubt es dir, Funktionen ganz elegant aneinanderzureihen.
~~~~

## 1. Eine Karte aus einem Stapel holen

Um eine Karte auszuwählen, gib die Karte am Index `position` aus dem gegebenen Stapel zurück.

Implementiere die Funktion `getCard(at:from:)`, die zwei Argumente entgegennimmt: `at` ist die Position der Karte im Stapel und `from` ist der Kartenstapel.
Die Funktion soll die Karte an der Position `index` aus dem gegebenen Stapel zurückgeben.

```swift
let index = 2
getCard(at: index, from: [1, 2, 4, 1])
// returns 4
```

## 2. Eine Karte im Stapel ändern

Zaubere ein bisschen und tausche die Karte am Index `position` gegen die angegebene Ersatzkarte aus.

Implementiere die Funktion `setCard(at:in:to)`, die drei Argumente entgegennimmt: `at` ist die Position der Karte im Stapel, `in` ist der Kartenstapel und `to` ist die neue Karte, die die Karte an der Position `index` ersetzen soll.
Die Funktion soll eine Kopie des Stapels zurückgeben, bei der die Karte an der Position `index` durch die neue Karte ersetzt wurde.
Wenn der angegebene `index` kein gültiger Index im Stapel ist, soll der ursprüngliche Stapel unverändert zurückgegeben werden.

```swift
let index = 2
let newCard = 6
setCard(at: index, in: [1, 2, 4, 1], to: newCard)
// returns [1, 2, 6, 1]
```

## 3. Eine Karte oben auf den Stapel legen

Lass eine Karte erscheinen, indem du eine neue Karte oben auf den Stapel legst.

Implementiere die Funktion `insert(_:atTopOf:)`, die zwei Argumente entgegennimmt: die neue Karte, die eingefügt werden soll, und den Kartenstapel.
Die Funktion soll eine Kopie des Stapels zurückgeben, bei der die neue Karte oben auf den Stapel gelegt wurde.

```swift
let newCard = 8
insert(newCard, atTopOf: [5, 9, 7, 1])
// returns [5, 9, 7, 1, 8]
```

## 4. Eine Karte aus dem Stapel entfernen

Lass eine Karte verschwinden, indem du die Karte an der angegebenen `position` aus dem Stapel entfernst.

Implementiere die Funktion `removeCard(at:from:)`, die zwei Argumente entgegennimmt: `at` ist die Position der Karte im Stapel und `from` ist der Kartenstapel.
Die Funktion soll eine Kopie des Stapels zurückgeben, bei der die Karte an der Position `index` entfernt wurde.
Wenn der angegebene `index` kein gültiger Index im Stapel ist, soll der ursprüngliche Stapel unverändert zurückgegeben werden.

```swift
let index = 2
removeCard(at: index, from: [3, 2, 6, 4, 8])
// returns [3, 2, 4, 8]
```

## 5. Eine Karte in den Stapel einfügen

Lass eine Karte erscheinen, indem du eine neue Karte an der angegebenen `position` in den Stapel einfügst.

Implementiere die Funktion `insert(_:at:from:)`, die drei Argumente entgegennimmt: die neue Karte, die eingefügt werden soll, die Position, an der die neue Karte eingefügt werden soll, und den Kartenstapel.
Die Funktion soll eine Kopie des Stapels zurückgeben, bei der die neue Karte an der angegebenen Position hinzugefügt wurde.
Wenn der angegebene `index` kein gültiger Index im Stapel ist, soll der ursprüngliche Stapel unverändert zurückgegeben werden.

```swift
let newCard = 8
insert(newCard, at: 2, from: [5, 9, 7, 1])
// returns [5, 9, 8, 7, 1]
```

## 6. Die Größe des Stapels prüfen

Prüfe, ob die Größe des Stapels gleich `stackSize` ist oder nicht.

Implementiere die Funktion `checkSizeOfStack(_:_:)`, die zwei Argumente entgegennimmt: `stack` ist der Kartenstapel und `stackSize` ist die Größe des Stapels.
Die Funktion soll `true` zurückgeben, wenn die Größe des Stapels gleich `stackSize` ist, und sonst `false`.

```swift
let stackSize = 4
checkSizeOfStack([3, 2, 6, 4, 8], stackSize)
// returns false
```
