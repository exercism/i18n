# Вступ

## Більше методів перебирання

У Перебиранні ми познайомилися з методами перебирання `count`, `any?`, `select`, `all` і `map`.
Ось нагадування про них, до якого додано кілька додаткових методів:

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

## Перебирання словників

Перебирання обʼєктів `Hash` нічим не відрізняється від перебирання обʼєктів `Array`, хіба що блок отримує два аргументи: ключ і значення:

```ruby
pet_names = {cat: "bob", horse: "caris", mouse: "arya"}
pet_names.each { |animal, name| ... }
```

Якщо нам потрібне лише одне зі значень, можна використати спеціальний символ `_`, щоб позначити, що одне значення не потрібне.
Це допомагає і з погляду ясності для розробника, і є оптимізацією продуктивності.

```ruby
pet_names = {cat: "bob", horse: "caris", mouse: "arya"}
pet_names.map { |_, name| name }  #=> ["bob, "caris", "arya"]
```

## Вкладені перебирання

Можна також перебирати у вкладених блоках і поєднувати методи в ланцюжок.
Наприклад, якщо в нас є масив словників із тваринами, і ми хочемо вибрати тварин із короткими іменами, можна зробити щось таке:

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
