# Anleitung

In dieser Übung simulierst du ein fensterbasiertes Computersystem.
Du erstellst einige Fenster, die verschoben und in ihrer Größe geändert werden können.
Das folgende Bild veranschaulicht die Werte, mit denen du unten arbeitest.

```text
                  <--------------------- screenSize.width --------------------->

       ^          ┌────────────────────────────────────────────────────────────┐
       |          │                                                            │
       |          │         position.x, _                                      │
       |          │         position.y   \                                     │
       |          │                       \<----- size.width ----->            │
       |          │                 ^      *──────────────────────┐            │
       |          │                 |      │        title         │            │
       |          │                 |      ├──────────────────────┤            │
screenSize.height │                 |      │                      │            │
       |          │            size.height │                      │            │
       |          │                 |      │       contents       │            │
       |          │                 |      │                      │            │
       |          │                 |      │                      │            │
       |          │                 v      └──────────────────────┘            │
       |          │                                                            │
       |          │                                                            │
       v          └────────────────────────────────────────────────────────────┘
```

📣 Um deine vielfältigen JavaScript-Kenntnisse zu üben, **versuche, die Aufgaben 1 und 2 mit Prototype-Syntax und die restlichen Aufgaben mit Klassen-Syntax zu lösen**.

## 1. Definiere Size zum Speichern der Abmessungen des Fensters

Definiere eine Klasse (Konstruktorfunktion) namens `Size`.
Sie soll zwei Felder `width` und `height` haben, die die aktuellen Abmessungen des Fensters speichern.
Die Konstruktorfunktion soll Anfangswerte für diese Felder entgegennehmen.
Die Breite wird als erster Parameter übergeben, die Höhe als zweiter.
Die Standardbreite und -höhe sollen `80` bzw. `60` sein.

Definiere außerdem eine Methode `resize(newWidth, newHeight)`, die eine neue Breite und Höhe als Parameter entgegennimmt und die Felder an die neue Größe anpasst.

```javascript
const size = new Size(1080, 764);
size.width;
// => 1080
size.height;
// => 764

size.resize(1920, 1080);
size.width;
// => 1920
size.height;
// => 1080
```

## 2. Definiere Position zum Speichern einer Fensterposition

Definiere eine Klasse (Konstruktorfunktion) namens `Position` mit zwei Feldern, `x` und `y`, die die aktuelle horizontale bzw. vertikale Position der linken oberen Ecke des Fensters speichern.
Die Konstruktorfunktion soll Anfangswerte für diese Felder entgegennehmen.
Der Wert für `x` wird als erster Parameter übergeben, der Wert für `y` als zweiter.
Der Standardwert soll für beide Felder `0` sein.

Die Position (0, 0) ist die linke obere Ecke des Bildschirms, wobei die `x`-Werte größer werden, wenn du dich nach rechts bewegst, und die `y`-Werte größer werden, wenn du dich nach unten bewegst.

Definiere außerdem eine Methode `move(newX, newY)`, die neue x- und y-Parameter entgegennimmt und die Eigenschaften an die neue Position anpasst.

```javascript
const point = new Position();
point.x;
// => 0
point.y;
// => 0

point.move(100, 200);
point.x;
// => 100
point.y;
// => 200
```

## 3. Definiere eine Klasse ProgramWindow

Definiere eine Klasse `ProgramWindow` mit den folgenden Feldern:

- `screenSize`: enthält einen festen Wert vom Typ `Size` mit `width` 800 und `height` 600
- `size` : enthält einen Wert vom Typ `Size`; der Anfangswert ist der Standardwert der `Size`-Instanz
- `position` : enthält einen Wert vom Typ `Position`; der Anfangswert ist der Standardwert der `Position`-Instanz

Wenn das Fenster geöffnet (erstellt) wird, hat es am Anfang immer die Standardgröße und -position.

```javascript
const programWindow = new ProgramWindow();
programWindow.screenSize.width;
// => 800

// Similar for the other fields.
```

Randnotiz: Der Name `ProgramWindow` wird anstelle von `Window` verwendet, um die Klasse von der eingebauten `Window`-Klasse abzugrenzen, die es in Browser-Umgebungen gibt.

## 4. Füge eine Methode zum Ändern der Fenstergröße hinzu

Die Klasse `ProgramWindow` soll eine Methode `resize` enthalten.
Sie soll einen Parameter vom Typ `Size` entgegennehmen und versuchen, die Größe des Fensters auf die angegebene Größe zu ändern.

Die neue Größe darf jedoch bestimmte Grenzen nicht überschreiten.

- Die kleinstmögliche Höhe oder Breite ist 1.
  Angeforderte Höhen oder Breiten kleiner als 1 werden auf 1 begrenzt.
- Die maximale Höhe und Breite hängen von der aktuellen Position des Fensters ab; die Ränder des Fensters können nicht über die Ränder des Bildschirms hinaus verschoben werden.
  Werte, die größer als diese Grenzen sind, werden auf die größtmögliche Größe begrenzt.
  Wenn die Position des Fensters zum Beispiel bei `x` = 400, `y` = 300 liegt und eine Größenänderung auf `height` = 400, `width` = 300 angefordert wird, dann würde das Fenster auf `height` = 300, `width` = 300 geändert, da der Bildschirm in `y`-Richtung nicht groß genug ist, um die Anforderung vollständig aufzunehmen.

```javascript
const programWindow = new ProgramWindow();

const newSize = new Size(600, 400);
programWindow.resize(newSize);
programWindow.size.width;
// => 600
programWindow.size.height;
// => 400
```

## 5. Füge eine Methode zum Verschieben des Fensters hinzu

Neben der Größenänderung soll die Klasse `ProgramWindow` auch eine Methode `move` enthalten.
Sie soll einen Parameter vom Typ `Position` entgegennehmen.
Die Methode `move` ähnelt `resize`, allerdings passt diese Methode die _Position_ des Fensters an den angeforderten Wert an, nicht die Größe.

Wie bei `resize` darf die neue Position bestimmte Grenzen nicht überschreiten.

- Die kleinste Position ist 0 für `x` und `y`.
- Die maximale Position in beide Richtungen hängt von der aktuellen Größe des Fensters ab.
  Die Ränder können nicht über die Ränder des Bildschirms hinaus verschoben werden.
  Werte, die größer als diese Grenzen sind, werden auf den größtmöglichen Wert begrenzt.
  Wenn die Größe des Fensters zum Beispiel bei `x` = 250, `y` = 100 liegt und eine Verschiebung auf `x` = 600, `y` = 200 angefordert wird, dann würde das Fenster auf `x` = 550, `y` = 200 verschoben, da der Bildschirm in `x`-Richtung nicht groß genug ist, um die Anforderung vollständig aufzunehmen.

```javascript
const programWindow = new ProgramWindow();

const newPosition = new Position(50, 100);
programWindow.move(newPosition);
programWindow.position.x;
// => 50
programWindow.position.y;
// => 100
```

## 6. Ändere ein Programmfenster

Implementiere eine Funktion `changeWindow`, die eine `ProgramWindow`-Instanz entgegennimmt und das Fenster auf die angegebene Größe und Position ändert.
Die Funktion soll die übergebene `ProgramWindow`-Instanz zurückgeben, nachdem die Änderungen angewendet wurden.

Das Fenster soll eine Breite von 400 und eine Höhe von 300 erhalten und bei x = 100, y = 150 positioniert sein.

```javascript
const programWindow = new ProgramWindow();
changeWindow(programWindow);
programWindow.size.width;
// => 400

// Similar for the other fields.
```
