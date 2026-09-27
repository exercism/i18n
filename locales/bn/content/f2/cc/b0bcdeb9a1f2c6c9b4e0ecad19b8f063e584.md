# পরিচিতি

## আরও এনুমারেশন মেথড

এনুমারেশন অধ্যায়ে আপনাকে `count`, `any?`, `select`, `all` আর `map` এই এনুমারেশন মেথডগুলোর সাথে পরিচয় করানো হয়েছিল। নিচে সেগুলোরই একটি পুনরালোচনা দেওয়া হলো, সাথে কিছু অতিরিক্ত মেথডও যোগ করা হয়েছে:

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

## হ্যাশ এনুমারেট করা

`Hash` অবজেক্ট এনুমারেট করা আর `Array` অবজেক্ট এনুমারেট করা একেবারে একই, শুধু একটি পার্থক্য আছে: এখানে ব্লকটি দুটি আর্গুমেন্ট পায়, কী (key) আর মান:

```ruby
pet_names = {cat: "bob", horse: "caris", mouse: "arya"}
pet_names.each { |animal, name| ... }
```

আপনার যদি দুটির মধ্যে একটিরই দরকার হয়, তাহলে বিশেষ `_` প্রতীকটি দিয়ে বোঝাতে পারেন যে ওই মানটি লাগবে না।
এতে ডেভেলপারের কাছে কোডটি পরিষ্কার থাকে, আবার পারফরম্যান্সের দিক থেকেও এটি একটি অপটিমাইজেশন।

```ruby
pet_names = {cat: "bob", horse: "caris", mouse: "arya"}
pet_names.map { |_, name| name }  #=> ["bob, "caris", "arya"]
```

## নেস্টেড এনুমারেশন

আপনি নেস্টেড ব্লকের ভেতরেও এনুমারেট করতে পারেন, আর মেথডগুলোকে একটির সঙ্গে আরেকটি জুড়ে চেইন করেও চালাতে পারেন।
উদাহরণস্বরূপ, ধরা যাক পশুদের নিয়ে হ্যাশের একটি অ্যারে আছে, আর আমরা ছোট নামের পশুগুলো বের করতে চাই; তাহলে আমরা অনেকটা এরকম করতে পারি:

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
