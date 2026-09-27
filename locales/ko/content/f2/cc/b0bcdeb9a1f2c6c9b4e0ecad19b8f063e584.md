# 소개

## 더 많은 순회 메서드

Enumeration에서는 `count`, `any?`, `select`, `all`, `map` 순회 메서드를 배웠어요.
이번에는 그것들을 복습하면서 몇 가지를 더해 볼게요.

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

## 해시 순회하기

`Hash` 객체를 순회하는 것은 `Array` 객체를 순회하는 것과 똑같아요.
다만 블록이 키와 값, 두 개의 인자를 받는다는 점이 달라요.

```ruby
pet_names = {cat: "bob", horse: "caris", mouse: "arya"}
pet_names.each { |animal, name| ... }
```

값 중 하나만 필요하다면, 필요 없는 값은 특별한 `_` 기호로 표시하면 돼요.
이렇게 하면 코드를 읽는 사람이 의도를 더 분명하게 알 수 있고, 성능 최적화에도 도움이 돼요.

```ruby
pet_names = {cat: "bob", horse: "caris", mouse: "arya"}
pet_names.map { |_, name| name }  #=> ["bob, "caris", "arya"]
```

## 중첩 순회

중첩된 블록 안에서 순회할 수도 있고, 메서드를 연달아 연결할 수도 있어요.
예를 들어 동물에 대한 해시들이 담긴 배열이 있고, 이름이 짧은 동물만 뽑아내고 싶다고 해봐요.
그럴 때는 이렇게 하면 돼요.

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
