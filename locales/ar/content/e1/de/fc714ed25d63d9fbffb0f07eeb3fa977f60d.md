# التفكيك والإسناد المتعدد

يشير التفكيك إلى استخراج عناصر مجموعة، مثل `Array` أو `Hash`.
بعد ذلك يمكن إسناد القيم المُفكَّكة إلى متغيرات داخل العبارة نفسها.

[الإسناد المتعدد][multiple assignment] هو القدرة على إسناد قيم مُفكَّكة إلى عدة متغيرات في عبارة واحدة.
يتيح ذلك كتابة كود أكثر إيجازًا ووضوحًا، ويتم عبر فصل المتغيرات المراد إسنادها بفاصلة، مثل `first, second, third = [1, 2, 3]`.

غالبًا ما يُستخدم عامل النجمة (`*`) وعامل النجمة المزدوجة (`**`) في سياقات التفكيك.

~~~~exercism/caution
لا ينبغي الخلط بين `*<variable_name>` و`**<variable_name>` وبين `*` و`**`.
فبينما يُستخدم `*` و`**` للضرب والرفع إلى قوة على الترتيب، يُستخدم `*<variable_name>` و`**<variable_name>` عاملي تركيب وتفكيك.
~~~~

## الإسناد المتعدد

يتيح لك الإسناد المتعدد إسناد عدة متغيرات في سطر واحد.
ولفصل القيم، استخدم فاصلة `,`:

```irb
>> a, b = 1, 2
=> [1, 2]
>> a
=> 1
```

لا يقتصر الإسناد المتعدد على نوع بيانات واحد:

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

يمكن استخدام الإسناد المتعدد لتبديل العناصر في **المصفوفات**.
هذه الممارسة شائعة جدًا في [خوارزميات الترتيب][sorting algorithms].
على سبيل المثال:

```irb
>> numbers = [1, 2]
=> [1, 2]
>> numbers[0], numbers[1] = numbers[1], numbers[0]
=> [2, 1]
>> numbers
=> [2, 1]
```

~~~~exercism/note
يُعرف هذا أيضًا باسم «الإسناد المتوازي»، ويمكن استخدامه لتجنّب متغير مؤقت.
~~~~

إذا كان عدد المتغيرات أكثر من القيم، فستُسند `nil` إلى المتغيرات الإضافية:

```irb
>> a, b, c = 1, 2
=> [1, 2]
>> b
=> 2
>> c
=> nil
```

## التفكيك

في Ruby، يمكن [تفكيك عناصر **المصفوفات**/**Hash**][decompose] إلى متغيرات منفصلة.
ولأن القيم تظهر داخل **المصفوفات** بترتيب الفهارس، فإنها تُفكَّك إلى متغيرات بالترتيب نفسه:

```irb
>> fruits = ["apple", "banana", "cherry"]
>> x, y, z = fruits
>> x
=> "apple"
```

إذا كانت هناك قيم غير مطلوبة، يمكنك استخدام `_` للإشارة إلى «مُجمَّعة لكن غير مستخدمة»:

```irb
>> fruits = ["apple", "banana", "cherry"]
>> _, _, z = fruits
>> z
=> "cherry"
```

### التفكيك العميق

تفكيك وإسناد القيم من **مصفوفات** داخل **مصفوفة** (_تُعرف أيضًا بالمصفوفة المتداخلة_) يعمل بالطريقة نفسها التي يعمل بها التفكيك السطحي، لكنه يحتاج إلى [تعبير تفكيك محدَّد (`()`)][delimited decomposition expression] لتوضيح سياق القيم أو موضعها:

```irb
>> fruits_vegetables = [["apple", "banana"], ["carrot", "potato"]]
>> (a, b), (c, d) = fruits_vegetables
>> a
=> "apple"
>> d
=> "potato"
```

يمكنك أيضًا تفكيك جزء فقط من **مصفوفة** متداخلة تفكيكًا عميقًا:

```irb
>> fruits_vegetables = [["apple", "banana"], ["carrot", "potato"]]
>> a, (c, d) = fruits_vegetables
>> a
=> ["apple", "banana"]
>> c
=> "carrot"
```

إذا كان في التفكيك متغيرات في مواضع غير صحيحة و/أو عدد غير صحيح من القيم، فستحصل على **خطأ في الصياغة**:

```ruby
fruits_vegetables = [["apple", "banana"], ["carrot", "potato"]]

(a, b), (d) = fruits_vegetables
# syntax error, unexpected '=', expecting '.' or &. or :: or '['

((a, b), (d)) = fruits_vegetables
# syntax error, unexpected ')', expecting '.' or &. or :: or '['
```

جرّب ذلك هنا، وستلاحظ أن النمط الأول هو الذي يفرض الترتيب، وليس القيم المتاحة في الطرف الأيمن.
فخطأ الصياغة لا يرتبط ببنية البيانات.

### تفكيك مصفوفة باستخدام عامل النجمة المفرد (`*`)

عند [تفكيك **مصفوفة**][decompose] يمكنك استخدام عامل النجمة (`*`) لالتقاط القيم «المتبقية».
هذا أوضح من تقطيع **المصفوفة** (_وهو أقل قابلية للقراءة في بعض الحالات_).
على سبيل المثال، يمكننا استخراج العنصر الأول ثم إسناد القيم المتبقية إلى **مصفوفة** جديدة بدون العنصر الأول:

```irb
>> fruits = ["apple", "banana", "cherry", "orange", "kiwi", "melon", "mango"]
>> x, *last = fruits
>> x
=> "apple"
>> last
=> ["banana", "cherry", "orange", "kiwi", "melon", "mango"]
```

يمكننا أيضًا استخراج القيم في بداية **المصفوفة** ونهايتها مع تجميع كل القيم الواقعة في الوسط:

```irb
>> fruits = ["apple", "banana", "cherry", "orange", "kiwi", "melon", "mango"]
>> x, *middle, y, z = fruits
>> y
=> "melon"
>> middle
=> ["banana", "cherry", "orange", "kiwi"]
```

يمكننا أيضًا استخدام `*` في التفكيك العميق:

```irb
>> fruits_vegetables = [["apple", "banana", "melon"], ["carrot", "potato", "tomato"]]
>> (a, *rest), b = fruits_vegetables
>> a
=> "apple"
>> rest
=> ["banana", "melon"]
```

### تفكيك `Hash`

يختلف تفكيك **Hash** قليلًا عن تفكيك **المصفوفة**.
لتتمكن من تفكيك **Hash**، عليك أولًا تحويله إلى **مصفوفة**.
وإلا فلن يحدث أي تفكيك:

```irb
>> fruits_inventory = {apple: 6, banana: 2, cherry: 3}
>> x, y, z = fruits_inventory
>> x
=> {:apple=>6, :banana=>2, :cherry=>3}
>> y
=> nil
```

لتحويل `Hash` إلى **مصفوفة**، يمكنك استخدام الطريقة `to_a`:

```irb
>> fruits_inventory = {apple: 6, banana: 2, cherry: 3}
>> fruits_inventory.to_a
=> [[:apple, 6], [:banana, 2], [:cherry, 3]]
>> x, y, z = fruits_inventory.to_a
>> x
=> [:apple, 6]
```

إذا أردت تفكيك المفاتيح، يمكنك استخدام الطريقة `keys`:

```irb
>> fruits_inventory = {apple: 6, banana: 2, cherry: 3}
>> x, y, z = fruits_inventory.keys
>> x
=> :apple
```

إذا أردت تفكيك القيم، يمكنك استخدام الطريقة `values`:

```irb
>> fruits_inventory = {apple: 6, banana: 2, cherry: 3}
>> x, y, z = fruits_inventory.values
>> x
=> 6
```

## التركيب

التركيب هو القدرة على تجميع عدة قيم في **مصفوفة** واحدة تُسند إلى متغير.
يكون هذا مفيدًا عندما تريد _تفكيك_ القيم، وإجراء تغييرات عليها، ثم _تركيب_ النتائج مرة أخرى في متغير.
كما يتيح دمج مصفوفتين أو أكثر من **المصفوفات**/**Hash**.

### تركيب مصفوفة باستخدام عامل النجمة (`*`)

يمكن تركيب **مصفوفة** باستخدام عامل النجمة (`*`).
حيث سيحزم هذا كل القيم في **مصفوفة** واحدة.

```irb
>> fruits = ["apple", "banana", "cherry"]
>> more_fruits = ["orange", "kiwi", "melon", "mango"]

# fruits and more_fruits are unpacked and then their elements are packed into combined_fruits
>> combined_fruits = *fruits, *more_fruits

>> combined_fruits
=> ["apple", "banana", "cherry", "orange", "kiwi", "melon", "mango"]
```

### تركيب Hash باستخدام عامل النجمة المزدوجة (`**`)

يتم تركيب Hash باستخدام عامل النجمة المزدوجة (`**`).
حيث سيحزم هذا كل أزواج **المفتاح**/**القيمة** من Hash إلى Hash آخر، أو يدمج اثنين من Hash معًا.

```irb
>> fruits_inventory = {apple: 6, banana: 2, cherry: 3}
>> more_fruits_inventory = {orange: 4, kiwi: 1, melon: 2, mango: 3}

# fruits_inventory and more_fruits_inventory are unpacked into key-values pairs and combined.
>> combined_fruits_inventory = {**fruits_inventory, **more_fruits_inventory}

# then the pairs are packed into combined_fruits_inventory
>> combined_fruits_inventory
=> {:apple=>6, :banana=>2, :cherry=>3, :orange=>4, :kiwi=>1, :melon=>2, :mango=>3}
```

## استخدام عامل النجمة (`*`) وعامل النجمة المزدوجة (`**`) مع الطرق

### التركيب مع معاملات الطريقة

عندما تنشئ طريقة تقبل عددًا غير محدد من الوسائط، يمكنك استخدام [`*arguments`][arguments] أو [`**keyword_arguments`][keyword arguments] في تعريف الطريقة.
يُستخدم `*arguments` لحزم عدد غير محدد من الوسائط الموضعية (غير المفتاحية)،
ويُستخدم `**keyword_arguments` لحزم عدد غير محدد من الوسائط المفتاحية.

استخدام `*arguments`:

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

استخدام `**keyword_arguments`:

```irb
# This method is defined to take any number of keyword arguments

>> def my_method(**keyword_arguments)= keyword_arguments

# Arguments given to the method are packed into a dictionary

>> my_method(a: 1, b: 2, c: 3)
=> {:a => 1, :b => 2, :c => 3}
```

إذا لم تكن للطريقة المعرَّفة أي معاملات محددة للوسائط المفتاحية (`**keyword_arguments` أو `<key_word>: <value>`) فسيتم حزم الوسائط المفتاحية في Hash وإسنادها إلى المعامل الأخير.

```irb
>> def my_method(a)= a

>> my_method(a: 1, b: 2, c: 3)
=> {:a => 1, :b => 2, :c => 3}
```

يمكن أيضًا استخدام `*arguments` و`**keyword_arguments` معًا:

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

يمكنك أيضًا كتابة وسائط قبل `*arguments` وبعده للسماح بوسائط موضعية محددة.
وهذا يعمل بالطريقة نفسها التي يعمل بها تفكيك المصفوفة.

~~~~exercism/caution
يجب ترتيب الوسائط بترتيب محدد:

`def my_method(<positional_arguments>, *arguments, <positional_arguments>, <keyword_arguments>, **keyword_arguments)`

إذا لم تتبع هذا الترتيب، فستحصل على خطأ.
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

يمكنك كتابة وسائط موضعية قبل `*arguments` وبعده:

```irb
>> def my_method(a, *middle, b)= middle

>> my_method(1, 2, 3, 4, 5)
=> [2, 3, 4]
```

يمكنك أيضًا الجمع بين الوسائط الموضعية و\*arguments والوسائط المفتاحية و\*\*keyword_arguments:

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

كتابة الوسائط بترتيب غير صحيح ستؤدي إلى خطأ:

```ruby
def my_method(a:, **keyword_arguments, first, *arguments, last)
  arguments
end

my_method(1, 2, 3, 4, a: 5)

syntax error, unexpected local variable or method, expecting & or '&'
... my_method(a:, **keyword_arguments, first, *arguments, last)
```

### التفكيك في استدعاءات الطرق

يمكنك استخدام عامل النجمة (`*`) لتفكيك **مصفوفة** من الوسائط في استدعاء طريقة:

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

يمكنك أيضًا استخدام عامل النجمة المزدوجة (`**`) لتفكيك **Hash** من الوسائط في استدعاء طريقة:

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
