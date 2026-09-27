# Dekomposition und Mehrfachzuweisung

Dekomposition bezeichnet das Herauslösen der Elemente aus einer Sammlung wie einem `Array` oder `Hash`.
Die dekomponierten Werte lassen sich anschließend innerhalb derselben Anweisung Variablen zuweisen.

Die [Mehrfachzuweisung][multiple assignment] ermöglicht es, Werte innerhalb einer Anweisung zu dekomponieren, indem du mehrere Variablen zuweist.
Dadurch wird der Code kürzer und lesbarer, und sie geschieht, indem du die zuzuweisenden Variablen durch ein Komma trennst, zum Beispiel `first, second, third = [1, 2, 3]`.

Der Splat-Operator (`*`) und der Double-Splat-Operator (`**`) werden häufig in Dekompositionskontexten eingesetzt.

~~~~exercism/caution
`*<variable_name>` und `**<variable_name>` sollten nicht mit `*` und `**` verwechselt werden.
Während `*` und `**` für Multiplikation bzw. Potenzierung verwendet werden, werden `*<variable_name>` und `**<variable_name>` als Kompositions- und Dekompositionsoperatoren verwendet.
~~~~

## Mehrfachzuweisung

Mit der Mehrfachzuweisung kannst du mehrere Variablen in einer Zeile zuweisen.
Um die Werte zu trennen, verwendest du ein Komma `,`:

```irb
>> a, b = 1, 2
=> [1, 2]
>> a
=> 1
```

Die Mehrfachzuweisung ist nicht auf einen Datentyp beschränkt:

```irb
>> x, y, z = 1, "Hello", true
=> [1, "Hello", true]
>> x
=> 1
>> y
=> 'Hello'
>> z
=> true
```

Mit der Mehrfachzuweisung kannst du Elemente in **Arrays** vertauschen.
Diese Praxis ist in [Sortieralgorithmen][sorting algorithms] recht verbreitet.
Zum Beispiel:

```irb
>> numbers = [1, 2]
=> [1, 2]
>> numbers[0], numbers[1] = numbers[1], numbers[0]
=> [2, 1]
>> numbers
=> [2, 1]
```

~~~~exercism/note
Das wird auch als „Parallele Zuweisung“ bezeichnet und kann verwendet werden, um eine temporäre Variable zu vermeiden.
~~~~

Gibt es mehr Variablen als Werte, werden den überzähligen Variablen `nil` zugewiesen:

```irb
>> a, b, c = 1, 2
=> [1, 2]
>> b
=> 2
>> c
=> nil
```

## Dekomposition

In Ruby ist es möglich, [die Elemente von **Arrays**/**Hashes**][decompose] in einzelne Variablen zu dekomponieren.
Da Werte in **Arrays** in einer Indexreihenfolge auftreten, werden sie in derselben Reihenfolge in Variablen entpackt:

```irb
>> fruits = ["apple", "banana", "cherry"]
>> x, y, z = fruits
>> x
=> "apple"
```

Wenn es Werte gibt, die du nicht brauchst, kannst du `_` verwenden, um „gesammelt, aber nicht verwendet“ anzugeben:

```irb
>> fruits = ["apple", "banana", "cherry"]
>> _, _, z = fruits
>> z
=> "cherry"
```

### Tiefes Dekomponieren

Das Dekomponieren und Zuweisen von Werten aus **Arrays** innerhalb eines **Arrays** (_auch als verschachteltes Array bekannt_) funktioniert genauso wie das flache Dekomponieren, benötigt aber einen [abgegrenzten Dekompositionsausdruck (`()`)][delimited decomposition expression], um den Kontext oder die Position der Werte zu klären:

```irb
>> fruits_vegetables = [["apple", "banana"], ["carrot", "potato"]]
>> (a, b), (c, d) = fruits_vegetables
>> a
=> "apple"
>> d
=> "potato"
```

Du kannst auch nur einen Teil eines verschachtelten **Arrays** tiefgehend entpacken:

```irb
>> fruits_vegetables = [["apple", "banana"], ["carrot", "potato"]]
>> a, (c, d) = fruits_vegetables
>> a
=> ["apple", "banana"]
>> c
=> "carrot"
```

Wenn die Dekomposition Variablen mit falscher Platzierung und/oder einer falschen Anzahl von Werten enthält, erhältst du einen **Syntaxfehler**:

```ruby
fruits_vegetables = [["apple", "banana"], ["carrot", "potato"]]

(a, b), (d) = fruits_vegetables
# syntax error, unexpected '=', expecting '.' or &. or :: or '['

((a, b), (d)) = fruits_vegetables
# syntax error, unexpected ')', expecting '.' or &. or :: or '['
```

Experimentiere hier, und dir wird auffallen, dass das erste Muster ausschlaggebend ist, nicht die verfügbaren Werte auf der rechten Seite.
Der Syntaxfehler hängt nicht an der Datenstruktur.

### Ein Array mit dem einfachen Splat-Operator (`*`) dekomponieren

Wenn du [ein **Array** dekomponierst][decompose], kannst du den Splat-Operator (`*`) verwenden, um die „übrig gebliebenen“ Werte einzufangen.
Das ist klarer, als das **Array** zu slicen (_was in manchen Situationen weniger lesbar ist_).
Zum Beispiel können wir das erste Element herauslösen und dann die übrigen Werte einem neuen **Array** ohne das erste Element zuweisen:

```irb
>> fruits = ["apple", "banana", "cherry", "orange", "kiwi", "melon", "mango"]
>> x, *last = fruits
>> x
=> "apple"
>> last
=> ["banana", "cherry", "orange", "kiwi", "melon", "mango"]
```

Wir können auch die Werte am Anfang und am Ende des **Arrays** herauslösen und dabei alle Werte in der Mitte gruppieren:

```irb
>> fruits = ["apple", "banana", "cherry", "orange", "kiwi", "melon", "mango"]
>> x, *middle, y, z = fruits
>> y
=> "melon"
>> middle
=> ["banana", "cherry", "orange", "kiwi"]
```

Wir können `*` auch in der tiefen Dekomposition verwenden:

```irb
>> fruits_vegetables = [["apple", "banana", "melon"], ["carrot", "potato", "tomato"]]
>> (a, *rest), b = fruits_vegetables
>> a
=> "apple"
>> rest
=> ["banana", "melon"]
```

### Einen `Hash` dekomponieren

Einen **Hash** zu dekomponieren ist etwas anders, als ein **Array** zu dekomponieren.
Um einen **Hash** entpacken zu können, musst du ihn zuerst in ein **Array** umwandeln.
Andernfalls findet keine Dekomposition statt:

```irb
>> fruits_inventory = {apple: 6, banana: 2, cherry: 3}
>> x, y, z = fruits_inventory
>> x
=> {:apple=>6, :banana=>2, :cherry=>3}
>> y
=> nil
```

Um einen `Hash` in ein **Array** umzuwandeln, kannst du die Methode `to_a` verwenden:

```irb
>> fruits_inventory = {apple: 6, banana: 2, cherry: 3}
>> fruits_inventory.to_a
=> [[:apple, 6], [:banana, 2], [:cherry, 3]]
>> x, y, z = fruits_inventory.to_a
>> x
=> [:apple, 6]
```

Wenn du die Schlüssel entpacken möchtest, kannst du die Methode `keys` verwenden:

```irb
>> fruits_inventory = {apple: 6, banana: 2, cherry: 3}
>> x, y, z = fruits_inventory.keys
>> x
=> :apple
```

Wenn du die Werte entpacken möchtest, kannst du die Methode `values` verwenden:

```irb
>> fruits_inventory = {apple: 6, banana: 2, cherry: 3}
>> x, y, z = fruits_inventory.values
>> x
=> 6
```

## Komposition

Komponieren ist die Möglichkeit, mehrere Werte zu einem **Array** zusammenzufassen, das einer Variablen zugewiesen wird.
Das ist nützlich, wenn du Werte _dekomponieren_, Änderungen vornehmen und die Ergebnisse dann wieder in eine Variable _komponieren_ möchtest.
Außerdem ermöglicht es das Zusammenführen von 2 oder mehr **Arrays**/**Hashes**.

### Ein Array mit dem Splat-Operator (`*`) komponieren

Ein **Array** lässt sich mit dem Splat-Operator (`*`) komponieren.
Dabei werden alle Werte in ein **Array** gepackt.

```irb
>> fruits = ["apple", "banana", "cherry"]
>> more_fruits = ["orange", "kiwi", "melon", "mango"]

# fruits and more_fruits are unpacked and then their elements are packed into combined_fruits
>> combined_fruits = *fruits, *more_fruits

>> combined_fruits
=> ["apple", "banana", "cherry", "orange", "kiwi", "melon", "mango"]
```

### Einen Hash mit dem Double-Splat-Operator (`**`) komponieren

Einen Hash komponierst du mit dem Double-Splat-Operator (`**`).
Dabei werden alle **Schlüssel**/**Wert**-Paare aus einem Hash in einen anderen Hash gepackt oder zwei Hashes miteinander kombiniert.

```irb
>> fruits_inventory = {apple: 6, banana: 2, cherry: 3}
>> more_fruits_inventory = {orange: 4, kiwi: 1, melon: 2, mango: 3}

# fruits_inventory and more_fruits_inventory are unpacked into key-values pairs and combined.
>> combined_fruits_inventory = {**fruits_inventory, **more_fruits_inventory}

# then the pairs are packed into combined_fruits_inventory
>> combined_fruits_inventory
=> {:apple=>6, :banana=>2, :cherry=>3, :orange=>4, :kiwi=>1, :melon=>2, :mango=>3}
```

## Verwendung des Splat-Operators (`*`) und des Double-Splat-Operators (`**`) mit Methoden

### Komposition mit Methodenparametern

Wenn du eine Methode erstellst, die eine beliebige Anzahl von Argumenten akzeptiert, kannst du [`*arguments`][arguments] oder [`**keyword_arguments`][keyword arguments] in der Methodendefinition verwenden.
`*arguments` wird verwendet, um eine beliebige Anzahl von Positionsargumenten (also Argumenten ohne Schlüsselwort) zu packen, und
`**keyword_arguments` wird verwendet, um eine beliebige Anzahl von Schlüsselwortargumenten zu packen.

Verwendung von `*arguments`:

```irb
# This method is defined to take any number of positional arguments
# (Using the single line form of the definition of a method.)

>> def my_method(*arguments)= arguments

# Arguments given to the method are packed into an array

>> my_method(1, 2, 3)
=> [1, 2, 3]

>> my_method("Hello")
=> ["Hello"]

>> my_method(1, 2, 3, "Hello", "Mars")
=> [1, 2, 3, "Hello", "Mars"]
```

Verwendung von `**keyword_arguments`:

```irb
# This method is defined to take any number of keyword arguments

>> def my_method(**keyword_arguments)= keyword_arguments

# Arguments given to the method are packed into a dictionary

>> my_method(a: 1, b: 2, c: 3)
=> {:a => 1, :b => 2, :c => 3}
```

Wenn die definierte Methode keine Parameter für Schlüsselwortargumente (`**keyword_arguments` oder `<key_word>: <value>`) hat, werden die Schlüsselwortargumente in einen Hash gepackt und dem letzten Parameter zugewiesen.

```irb
>> def my_method(a)= a

>> my_method(a: 1, b: 2, c: 3)
=> {:a => 1, :b => 2, :c => 3}
```

`*arguments` und `**keyword_arguments` können auch in Kombination miteinander verwendet werden:

```ruby
def my_method(*arguments, **keyword_arguments)
  p arguments.sum
  for (key, value) in keyword_arguments.to_a
    p key.to_s + " = " + value.to_s
  end
end


my_method(1, 2, 3, a: 1, b: 2, c: 3)
6
"a = 1"
"b = 2"
"c = 3"
```

Du kannst Argumente auch vor und nach `*arguments` schreiben, um bestimmte Positionsargumente zu ermöglichen.
Das funktioniert genauso wie das Dekomponieren eines Arrays.

~~~~exercism/caution
Argumente müssen in einer bestimmten Reihenfolge angeordnet sein:

`def my_method(<positional_arguments>, *arguments, <positional_arguments>, <keyword_arguments>, **keyword_arguments)`

Wenn du diese Reihenfolge nicht einhältst, bekommst du einen Fehler.
~~~~

```ruby
def my_method(a, b, *arguments)
  p a
  p b
  p arguments
end

my_method(1, 2, 3, 4, 5)
1
2
[3, 4, 5]
```

Du kannst Positionsargumente vor und nach `*arguments` schreiben:

```irb
>> def my_method(a, *middle, b)= middle

>> my_method(1, 2, 3, 4, 5)
=> [2, 3, 4]
```

Du kannst auch Positionsargumente, \*arguments, Schlüsselwortargumente und \*\*keyword_arguments kombinieren:

```irb
>> def my_method(first, *many, last, a:, **keyword_arguments)
     p first
     p many
     p last
     p a
     p keyword_arguments
     end

>> my_method(1, 2, 3, 4, 5, a: 6, b: 7, c: 8)
1
[2, 3, 4]
5
6
{:b => 7, :c => 8}
```

Wenn du die Argumente in einer falschen Reihenfolge schreibst, führt das zu einem Fehler:

```ruby
def my_method(a:, **keyword_arguments, first, *arguments, last)
  arguments
end

my_method(1, 2, 3, 4, a: 5)

syntax error, unexpected local variable or method, expecting & or '&'
... my_method(a:, **keyword_arguments, first, *arguments, last)
```

### In Methodenaufrufe dekomponieren

Du kannst den Splat-Operator (`*`) verwenden, um ein **Array** von Argumenten in einen Methodenaufruf zu entpacken:

```ruby
def my_method(a, b, c)
  p c
  p b
  p a
end

numbers = [1, 2, 3]
my_method(*numbers)
3
2
1
```

Du kannst auch den Double-Splat-Operator (`**`) verwenden, um einen **Hash** von Argumenten in einen Methodenaufruf zu entpacken:

```ruby
def my_method(a:, b:, c:)
  p c
  p b
  p a
end

numbers = {a: 1, b: 2, c: 3}
my_method(**numbers)
3
2
1
```

[arguments]: https://docs.ruby-lang.org/en/master/syntax/methods_rdoc.html#label-Array-2FHash+Argument
[keyword arguments]: https://docs.ruby-lang.org/en/master/syntax/methods_rdoc.html#label-Keyword+Arguments
[multiple assignment]: https://docs.ruby-lang.org/en/master/syntax/assignment_rdoc.html#label-Multiple+Assignment
[sorting algorithms]: https://en.wikipedia.org/wiki/Sorting_algorithm
[decompose]: https://docs.ruby-lang.org/en/master/syntax/assignment_rdoc.html#label-Array+Decomposition
[delimited decomposition expression]: https://riptutorial.com/ruby/example/8798/decomposition
