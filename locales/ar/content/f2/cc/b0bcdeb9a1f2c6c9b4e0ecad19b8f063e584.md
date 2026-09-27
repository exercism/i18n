# مقدمة

## المزيد من طرق التعداد

في التعداد، تعرّفت على طرق التعداد `count` و`any?` و`select` و`all` و`map`.
وإليك مراجعة سريعة لها، مع إضافة بعض الطرق الأخرى:

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

## تعداد كائنات `Hash`

تعداد كائنات `Hash` يشبه تمامًا تعداد كائنات `Array`، لكن الكتلة تستقبل وسيطين: المفتاح والقيمة:

```ruby
pet_names = {cat: "bob", horse: "caris", mouse: "arya"}
pet_names.each { |animal, name| ... }
```

إذا كنت بحاجة إلى قيمة واحدة فقط، يمكنك استخدام الرمز الخاص `_` للإشارة إلى أن إحدى القيمتين غير مطلوبة.
يساعد هذا في وضوح الكود للمطوّر، وهو أيضًا تحسين للأداء.

```ruby
pet_names = {cat: "bob", horse: "caris", mouse: "arya"}
pet_names.map { |_, name| name }  #=> ["bob, "caris", "arya"]
```

## التعداد المتداخل

يمكنك أيضًا التعداد داخل كتل متداخلة، وربط الطرق ببعضها البعض.
على سبيل المثال، إذا كان لدينا مصفوفة من كائنات `Hash` للحيوانات، وأردنا استخراج الحيوانات ذات الأسماء القصيرة، فقد نفعل شيئًا مثل:

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
