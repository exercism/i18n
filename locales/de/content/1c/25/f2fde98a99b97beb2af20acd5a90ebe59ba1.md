# Einführung

Es ist oft nützlich, eine Sammlung von Elementen zu einer Gruppe zusammenzufassen und diese Gruppen als Einheiten zu behandeln.
In Cairo nennen wir eine solche Gruppe ein Struct, und jedes Element ist eines der Felder des Structs.
Ein Struct legt die allgemeine Menge der verfügbaren Felder fest, aber ein bestimmtes Exemplar eines Structs wird als Instanz bezeichnet.

Außerdem können für Structs Methoden definiert werden, die Zugriff auf die Felder haben.
Das Struct selbst wird in diesem Fall als `self` bezeichnet.
Wenn eine Methode `ref self: SomeStruct` verwendet, können die Felder geändert, also mutiert werden.
Wenn eine Methode `self: SomeStruct` oder `self: @SomeStruct` verwendet, können die Felder nicht geändert werden: Sie sind unveränderlich.
Die Kontrolle über die Veränderbarkeit hilft dem Borrow-Checker dabei, sicherzustellen, dass ganze Klassen von Nebenläufigkeitsfehlern in Cairo gar nicht erst auftreten.

In dieser Übung implementierst du zwei Arten von Methoden für ein Struct.
Die erste Art wird allgemein als Getter bezeichnet: Sie machen die Felder des Structs nach außen sichtbar, ohne dass jemand anderes diesen Wert verändern kann.

Außerdem implementierst du Methoden einer anderen Art, die allgemein als Setter bekannt sind.
Diese ändern den Wert des Feldes.
Setter sind in Cairo nicht sehr verbreitet. Wenn ein Feld frei geändert werden darf, ist es üblicher, es einfach öffentlich zu machen. Nützlich sind sie aber, wenn das Aktualisieren des Feldes Nebenwirkungen haben soll.

Structs werden mit dem Schlüsselwort `struct` definiert, gefolgt vom großgeschriebenen Namen des Typs, den das Struct beschreibt:

```rust
struct Item {}
```

Weitere Typen werden dann als _Felder_ in das Struct aufgenommen, jedes mit seinem eigenen Typ:

```rust
struct Item {
    name: String,
    weight: f32,
    worth: u32,
}
```

Ein Trait definiert eine Menge von Methoden, die von einem Typ implementiert werden können (wir konzentrieren uns hier auf Structs, aber Traits können auch für Enums implementiert werden).
Diese Methoden können für Instanzen des Typs aufgerufen werden, sobald dieses Trait implementiert ist.
Traits werden mit dem Schlüsselwort `trait` definiert, und innerhalb eines Traits definieren wir die Methodensignaturen, die unser Typ implementieren soll.

```rust
trait ImplTrait {
    // Define the method signature
    fn new() -> Item;
}
```

Schließlich können Methoden für Structs innerhalb eines `impl`-Blocks definiert werden, der das definierte Trait implementiert:

```rust
impl ItemImpl of ImplTrait {
    // initializes and returns a new instance of our Item struct
    fn new() -> Item {
        Item {}
    }
}
```
