# はじめに

## その他の列挙メソッド

「列挙」では、`count`、`any?`、`select`、`all`、`map`という列挙メソッドを紹介しました。ここでは、それらにいくつか新しいものを加えておさらいしましょう。

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

## ハッシュの列挙

`Hash`オブジェクトの列挙は、`Array`オブジェクトの列挙とまったく同じです。ただし、ブロックが受け取る引数がキーと値の2つになる点だけが違います。

```ruby
pet_names = {cat: "bob", horse: "caris", mouse: "arya"}
pet_names.each { |animal, name| ... }
```

値が片方だけ必要なときは、特別な`_`記号を使って、もう一方の値が不要であることを示せます。これは、エンジニアにとってのわかりやすさに役立つだけでなく、パフォーマンスの最適化にもなります。

```ruby
pet_names = {cat: "bob", horse: "caris", mouse: "arya"}
pet_names.map { |_, name| name }  #=> ["bob, "caris", "arya"]
```

## 入れ子の列挙

入れ子になったブロックの中で列挙したり、メソッドを次々とつなげたりすることもできます。たとえば、動物のハッシュの配列があり、名前の短い動物だけを取り出したいときは、次のように書けます。

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
