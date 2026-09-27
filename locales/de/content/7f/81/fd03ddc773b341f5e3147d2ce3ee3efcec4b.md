# Methodensyntax

Methoden in Cairo ähneln Funktionen, sind aber über Traits an einen bestimmten Typ gebunden.

Ihr erster Parameter ist immer `self` und steht für die Instanz, auf der die Methode aufgerufen wird.

Cairo erlaubt es zwar nicht, Methoden direkt auf einem Typ zu definieren, aber du kannst dieselbe Funktionalität erreichen, indem du einen Trait definierst und ihn für den Typ implementierst.

Hier ist ein Beispiel, wie du mit einem Trait eine Methode auf dem Typ `Rectangle` definierst:

```rust
#[derive(Copy, Drop)]
struct Rectangle {
    width: u64,
    height: u64,
}

#[generate_trait]
impl RectangleImpl of RectangleTrait {
    fn area(self: @Rectangle) -> u64 {
        (*self.width) * (*self.height)
    }
}

fn main() {
    let rect = Rectangle { width: 30, height: 50 };
    println!("Area is {}", rect.area());
}
```

Im obigen Beispiel berechnet die Methode `area` die Fläche eines Rechtecks.

Mit dem Attribut `#[generate_trait]` wird der Vorgang einfacher, weil der benötigte Trait automatisch für dich erstellt wird.

Das macht deinen Code übersichtlicher und erlaubt es trotzdem, Methoden mit bestimmten Typen zu verknüpfen.

## Assoziierte Funktionen

Assoziierte Funktionen ähneln Methoden, arbeiten aber nicht auf einer Instanz eines Typs: Sie erwarten `self` nicht als Parameter.

Solche Funktionen werden oft als Konstruktoren oder Hilfsfunktionen verwendet, die an den Typ gebunden sind.

```rust
#[generate_trait]
impl RectangleImpl of RectangleTrait {
    fn square(size: u64) -> Rectangle {
        Rectangle { width: size, height: size }
    }
}

fn main() {
    let square = RectangleTrait::square(10);
    println!("Square dimensions: {}x{}", square.width, square.height);
}
```

Assoziierte Funktionen wie `Rectangle::square` verwenden die `::`-Syntax und liegen im Namensraum des Typs.

Sie machen es einfach, Instanzen zu erstellen oder mit ihnen zu arbeiten, ohne dass ein bereits vorhandenes Objekt nötig ist.

Indem Cairo zusammengehörige Funktionalität in Traits und Implementierungen organisiert, ermöglicht es saubere, modulare und erweiterbare Codestrukturen.
