# Introdução

## Mais métodos de enumeração

Em Enumeração, você conheceu os métodos de enumeração `count`, `any?`, `select`, `all` e `map`.
Veja uma recapitulação desses métodos, com alguns extras:

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

## Enumerando hashes

Enumerar objetos `Hash` é exatamente igual a enumerar objetos `Array`, exceto que o bloco recebe dois argumentos: a chave e o valor:

```ruby
pet_names = {cat: "bob", horse: "caris", mouse: "arya"}
pet_names.each { |animal, name| ... }
```

Se você só precisa de um dos valores, pode usar o símbolo especial `_` para indicar que um dos valores não é necessário.
Isso ajuda tanto na clareza para quem está lendo o código quanto no desempenho, funcionando também como uma otimização.

```ruby
pet_names = {cat: "bob", horse: "caris", mouse: "arya"}
pet_names.map { |_, name| name }  #=> ["bob, "caris", "arya"]
```

## Enumerações aninhadas

Você também pode enumerar em blocos aninhados e encadear métodos uns nos outros.
Por exemplo, se temos um array de hashes de animais e queremos extrair os animais com nomes curtos, podemos fazer algo assim:

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
