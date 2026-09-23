# Introduction

## D'autres méthodes d'énumération

Dans Énumération, tu as découvert les méthodes d'énumération `count`, `any?`, `select`, `all` et `map`.
En voici un récapitulatif, avec quelques ajouts :

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

## L'énumération des `Hash`

Énumérer des objets `Hash` est exactement la même chose qu'énumérer des objets `Array`, à ceci près que le bloc reçoit deux arguments, la clé et la valeur :

```ruby
pet_names = {cat: "bob", horse: "caris", mouse: "arya"}
pet_names.each { |animal, name| ... }
```

Si tu n'as besoin que d'une seule des deux valeurs, tu peux utiliser le symbole spécial `_` pour indiquer que l'autre n'est pas nécessaire.
Cela améliore à la fois la clarté pour la personne qui développe et les performances.

```ruby
pet_names = {cat: "bob", horse: "caris", mouse: "arya"}
pet_names.map { |_, name| name }  #=> ["bob, "caris", "arya"]
```

## Énumérations imbriquées

Tu peux aussi énumérer dans des blocs imbriqués et enchaîner les méthodes les unes aux autres.
Par exemple, si on a un tableau de `Hash` d'animaux et qu'on veut en extraire ceux dont le nom est court, on pourrait faire quelque chose comme :

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
