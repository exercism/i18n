# Hinweise

## Allgemein

## 1. Implementiere die `new()`-Methode

- Die `new()`-Methode erhält die Argumente, mit denen wir eine `User`-Instanz erzeugen wollen.
  Sie sollte eine Instanz von `User` mit dem angegebenen Namen, Alter und Gewicht zurückgeben.

- In der [Struct-Dokumentation][structs] findest du Beispiele, wie du Structs definierst und instanziierst.

## 2. Implementiere die Getter-Methoden

- Die Methoden `name()`, `age()` und `weight()` sind Getter.
  Mit anderen Worten: Sie sind dafür zuständig, das entsprechende Feld einer Struct-Instanz zurückzugeben.

- In Cairo musst du keine `return`-Anweisung verwenden, es sei denn, du möchtest ausdrücklich, dass eine Funktion oder Methode vorzeitig zurückkehrt.
  Ansonsten ist es idiomatischer, eine _implizite_ Rückgabe zu nutzen, indem du das Semikolon für das Ergebnis weglässt, das eine Funktion oder Methode zurückgeben soll.
  Eine explizite Rückgabe zu verwenden ist nicht _falsch_, aber es ist sauberer, wo möglich die implizite Rückgabe zu nutzen.

```rust
fn foo() -> i32 {
    1
}
```

- In der [Methodendokumentation][methods] findest du weitere Beispiele, wie du Methoden für Structs definierst.

## 3. Implementiere die Setter-Methoden

- Die Methoden `set_age()` und `set_weight()` sind Setter. Sie sind dafür zuständig, das entsprechende Feld einer Struct-Instanz mit dem Eingabeargument zu aktualisieren.

- Wie die Signaturen dieser Methoden vorgeben, sollten die Setter-Methoden nichts zurückgeben.

[structs]: https://book.cairo-lang.org/ch05-01-defining-and-instantiating-structs.html
[methods]: https://book.cairo-lang.org/ch05-03-method-syntax.html
