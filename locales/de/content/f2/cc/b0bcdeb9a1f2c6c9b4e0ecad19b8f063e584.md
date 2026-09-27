# Einführung

## Weitere Enumerationsmethoden

In der Enumeration hast du die Enumerationsmethoden `count`, `any?`, `select`, `all` und `map` kennengelernt.
Hier eine kurze Wiederholung, ergänzt um ein paar weitere:

```ruby
fibonacci = [0, 1, 1, 2, 3, 5, 8, 13]

fibonacci.count  { |number| number == 1 }   #=> 2
fibonacci.any?   { |number| number > 20 }   #=> false
fibonacci.none?  { |number| number > 20 }   #=> true
fibonacci.select { |number| number.odd? }   #=> [1, 1, 3, 5, 13]
fibonacci.all?   { |number| number < 20 }   #=> true
fibonacci.map    { |number| number * 2  }   #=> [0, 2, 2, 4, 6, 10, 16, 26]
fibonacci.select { |number| number >= 5 }   #=> [5, 8, 13]
fibonacci.find   { |number| number >= 5 }   #=> 5

# Some methods work with or without a block
fibonacci.sum  #=> 33
fibonacci.sum { |number| number * number }  #=> 273

# There are also methods to help with nested arrays:
animals = [ ['cat', 'bob'], ['horse', 'caris'], ['mouse', 'arya'] ]
animals.flatten  #=> ["cat", "bob", "horse", "caris", "mouse", "arya"]
```

## Hashes enumerieren

`Hash`-Objekte zu enumerieren funktioniert genau wie `Array`-Objekte zu enumerieren, mit dem Unterschied, dass der Block zwei Argumente erhält: den Schlüssel und den Wert:

```ruby
pet_names = {cat: "bob", horse: "caris", mouse: "arya"}
pet_names.each { |animal, name| ... }
```

Wenn du nur einen der Werte brauchst, kannst du das spezielle `_`-Symbol verwenden, um anzuzeigen, dass ein Wert nicht benötigt wird.
Das macht den Code für Entwickler klarer und verbessert außerdem die Performance.

```ruby
pet_names = {cat: "bob", horse: "caris", mouse: "arya"}
pet_names.map { |_, name| name }  #=> ["bob, "caris", "arya"]
```

## Verschachtelte Enumerationen

Du kannst auch in verschachtelten Blöcken enumerieren und Methoden miteinander verketten.
Wenn wir zum Beispiel ein Array mit Hashes von Tieren haben und die Tiere mit den kurzen Namen herausfiltern wollen, könnten wir etwa so vorgehen:

```ruby
pets = [
  { animal: "cats", names: ["bob", "fred", "sandra"] },
  { animal: "horses", names: ["caris", "black beard", "speedy"] },
  { animal: "mice", names: ["arya", "jerry"] }
]

pets.map { |pet|
  pet[:names].select { |name| name.length <= 5 }
}.flatten.sort
#=> ["arya", "bob", "caris", "fred", "jerry"]
```
