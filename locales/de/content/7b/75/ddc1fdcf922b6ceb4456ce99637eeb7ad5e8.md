# Tupel

Ein [Tupel][tuple] ist eine endliche, geordnete Liste von Elementen, die unveränderlich ist.
Tupel erfordern, dass alle Positionen einen festen Typ haben.
Das wiederum bedeutet, dass der Compiler weiß, welcher Typ an welcher Position steht.
Die in einem Tupel verwendeten Typen können an jeder Position unterschiedlich sein, aber die Typen müssen zur Kompilierzeit bekannt sein.

## Ein Tupel erstellen

Je nachdem, ob die Typen der Werte des Tupels zur Kompilierzeit abgeleitet werden können, kann das Tupel auf verschiedene Arten erstellt werden.
Wenn die Werte zur Kompilierzeit bekannt sind, kann das Tupel mit der Tupel-Literal-Syntax erstellt werden, andernfalls müssen sie explizit deklariert werden.
Wichtig ist außerdem, dass die Typen der Werte mit den im Tupel angegebenen Typen übereinstimmen und dass die Anzahl der Werte mit der Anzahl der angegebenen Typen übereinstimmt.
Hier ist ein Beispiel für die Definition mit der Tupel-Literal-Syntax:

```crystal
tuple = {1, "foo", 'c'} # Tuple(Int32, String, Char)
```

Du kannst ein Tupel auch mit der Klasse `Tuple` erstellen.

```crystal
tuple = Tuple(Int32, String, Char).new(1, "foo", 'c')
```

Alternativ kannst du den Typ der Variable, der das Tupel zugewiesen wird, explizit angeben.

```crystal
tuple : Tuple(Int32, String, Char) = {1, "foo", 'c'}
```

Den Typ des Tupels explizit anzugeben, kann nützlich sein, da du damit festlegen kannst, dass eine Position einen Union-Typ enthalten soll.
Das bedeutet, dass eine Position mehrere Typen enthalten kann.

```crystal
tuple : Tuple(Int32 | String, String, Char) = {1, "foo", 'c'}
```

## Konvertierung

### Ein Tupel aus einem Array erstellen

Du kannst mit der Methode `from` der Klasse `Tuple` ein Tupel aus einem Array erstellen.
Dabei muss der Typ des Tupels angegeben werden.

```crystal
array = [1, "foo", 'c']
tuple = Tuple(Int32, String, Char).from(array)
```

### Konvertierung in ein Array

Du kannst mit der Methode `to_a` ein Tupel in ein Array umwandeln.
Der Elementtyp des resultierenden Arrays ist die Vereinigung der Typen aller Felder im Tupel.

```crystal
tuple = {1, "foo", 'c'}
array = tuple.to_a
array # => [1, "foo", 'c']
```

## Auf Elemente zugreifen

Wie Arrays sind Tupel nullbasiert, das heißt, das erste Element hat den Index 0.
Anders als bei Arrays ist der Typ jedes Elements jedoch fest und zur Kompilierzeit bekannt. Wenn du also ein Tupel indizierst, ist der Typ des Elements spezifisch für die Position.
Um auf ein Element in einem Tupel zuzugreifen, kannst du den Operator `[]` verwenden.

```crystal
array = [1, "foo", 'c']
array[0]         # => 1
typeof(array[0]) # => Int32 | String | Char

tuple = {1, "foo", 'c'}
tuple[0]         # => 1
typeof(tuple[0]) # => Int32
```

Ein weiterer Unterschied beim Zugriff auf Elemente aus Arrays besteht darin, dass der Compiler prüft, ob der Index innerhalb der Grenzen des Tupels liegt, wenn der Index angegeben ist.
Das bedeutet, dass du einen Fehler zur Kompilierzeit statt eines Laufzeitfehlers bekommst.

```crystal
tuple = {1, "foo", 'c'}
tuple[3]
# => Error: index out of bounds for Tuple(Int32, String, Char) (3 not in -3..2)
```

Wenn der Index jedoch in einer Variable gespeichert ist, kann der Compiler zur Kompilierzeit nicht prüfen, ob der Index innerhalb der Grenzen des Tupels liegt, und gibt stattdessen einen Laufzeitfehler aus.

## Subtupel

Du kannst ein Subtupel eines Tupels erhalten, indem du den Operator `[]` mit einem Range verwendest.
Zurückgegeben wird ein neues Tupel mit den Elementen aus dem angegebenen Range.
Der Range muss zur Kompilierzeit angegeben werden, sonst kann der Compiler die Typen der Elemente im Subtupel nicht kennen.
Das bedeutet, dass der Range ein Range-Literal sein muss und nicht einer Variable zugewiesen werden darf.

```crystal
tuple = {1, "foo", 'c'}
subtuple = tuple[0..1] # Tuple(Int32, String)

i = 0..1
tuple[i]
# Error: Tuple#[](Range) can only be called with range literals known at compile-time
```

## Wann du ein Tupel verwenden solltest

Tupel sind nützlich, wenn du eine feste Anzahl von Werten gruppieren möchtest, deren Typen zur Kompilierzeit bekannt sind.
Das liegt daran, dass Tupel aufgrund ihrer Unveränderlichkeit weniger Speicher benötigen und schneller sind als Arrays.
Ein weiterer Anwendungsfall ist die Rückgabe mehrerer Werte aus einer Methode.
Das ist besonders hilfreich, wenn die Werte unterschiedliche Typen haben, da jede Position im Tupel einen anderen Typ haben kann.

Tupel solltest du nicht verwenden, wenn eine Datenstruktur benötigt wird, die wachsen oder schrumpfen kann oder häufig geändert werden muss.

[tuple]: https://crystal-lang.org/reference/syntax_and_semantics/literals/tuple.html
