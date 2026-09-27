# Introduzione

## Altri metodi di enumerazione

In Enumerazione, hai conosciuto i metodi di enumerazione `count`, `any?`, `select`, `all` e `map`.
Ecco un riepilogo, con qualche aggiunta:

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

## Enumerare gli hash

Enumerare oggetti `Hash` è esattamente come enumerare oggetti `Array`, tranne che il blocco riceve due argomenti: la chiave e il valore:

```ruby
pet_names = {cat: "bob", horse: "caris", mouse: "arya"}
pet_names.each { |animal, name| ... }
```

Se ti serve solo uno dei valori, puoi usare il simbolo speciale `_` per indicare che un valore non serve.
Questo aiuta sia per la chiarezza per lo sviluppatore, sia come ottimizzazione delle prestazioni.

```ruby
pet_names = {cat: "bob", horse: "caris", mouse: "arya"}
pet_names.map { |_, name| name }  #=> ["bob, "caris", "arya"]
```

## Enumerazioni annidate

Puoi anche enumerare in blocchi annidati e concatenare i metodi tra loro.
Per esempio, se abbiamo un array di hash di animali e vogliamo estrarre gli animali con nomi corti, potremmo fare qualcosa del genere:

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
