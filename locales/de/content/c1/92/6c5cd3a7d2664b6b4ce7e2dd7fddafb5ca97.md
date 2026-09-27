# Gleitkommazahlen

Gleitkommazahlen sind reelle Zahlen: Sie können einen Nachkommateil haben. Im Rechner werden sie als Muster von Binärbits dargestellt, nach der [IEEE-754-Spezifikation](https://en.wikipedia.org/wiki/IEEE_754).
Gleitkommazahlen werden oft einfach Floats genannt.

Gleitkommazahlen sind immer vorzeichenbehaftet. Vorzeichenbehaftet bedeutet, dass eines der Bits der Zahl reserviert wird, um anzugeben, ob die Zahl negativ ist oder nicht.

Gleitkommazahlen haben eine **Bitbreite**, also einfach die Anzahl der Bits, aus denen die Zahl besteht. Das wirkt sich auf den Wertebereich und die Genauigkeit der Werte aus, die dieser Typ darstellen kann.

Rust hat 2 primitive Gleitkommatypen: `f32` und `f64`. Die Zahl nach dem `f` gibt die Bitbreite an. In anderen Sprachen wird `f32` manchmal als „einfache Genauigkeit“ und `f64` als „doppelte Genauigkeit“ bezeichnet.

## Was sollte ich verwenden?

Im Allgemeinen solltest du `f64` verwenden: Es ist auf den meisten modernen Consumer-Geräten genauso schnell wie `f32` und verringert deutlich, wie oft [Ungenauigkeiten bei Gleitkommazahlen](https://0.30000000000000004.com/) auftreten.

Wenn du rationale Zahlen mit unendlicher Genauigkeit brauchst, kannst du das Crate [`num-rational`](https://crates.io/crates/num-rational) verwenden, das den Typ `BigRational` bereitstellt. Wenn du Dezimalzahlen mit fester Genauigkeit brauchst, kannst du das Crate [`rust_decimal`](https://crates.io/crates/rust_decimal) verwenden, das den Typ `Decimal` bereitstellt.

## Zwischen Gleitkommazahlen umwandeln

In Rust gibt es keine impliziten numerischen Umwandlungen. Wenn du zwischen Gleitkommatypen umwandeln musst, gibt es zwei grundlegende Strategien: das Schlüsselwort `as` und die Traits `From` und `TryFrom`.

Das Schlüsselwort `as` ist einfach zu verwenden: `expr as Type`. Allerdings gibt es eine Reihe von [Fallstricken und Feinheiten](https://doc.rust-lang.org/nomicon/casts.html), die du bei `as`-Casts beachten musst.

Umwandlungen über Traits sind etwas aufwendiger, aber sicherer: Konvertierungs-Traits sind nur dort implementiert, wo sie sicher sind. Zum Beispiel implementiert [`f32`](https://doc.rust-lang.org/std/primitive.f32.html) `From<u8>`, `From<u16>`, `From<i8>` und `From<i16>`: Jeder Wert, der durch einen dieser Typen darstellbar ist, ist garantiert auch in einem `f32` darstellbar. Das kannst du etwa als `f32::from(expr)` oder `expr.into()` verwenden, wobei `expr` einen dieser Typen ergibt.

Beim Umwandeln von Gleitkommawerten wird das `as`-Casting oft bevorzugt, einfach weil es verhältnismäßig wenige trait-basierte Umwandlungen gibt. Stand Oktober 2020 ist `TryFrom` für Gleitkommazahlen nicht implementiert. Das `as`-Casting von `f32` nach `f64` ist verlustfrei. Umgekehrt ist es verlustbehaftet, folgt aber einem definierten Umwandlungsprotokoll, das den Verlust minimieren soll.
