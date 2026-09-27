# تجزیه و تخصیص چندگانه

تجزیه به عمل استخراج عناصر یک مجموعه، مانند `Array` یا `Hash`، اشاره دارد.
سپس می‌توان مقادیر تجزیه‌شده را در همان دستور به متغیرها تخصیص داد.

[تخصیص چندگانه][multiple assignment] توانایی تخصیص چندین متغیر برای تجزیه‌ی مقادیر در یک دستور است.
این کار باعث می‌شود کد مختصرتر و خواناتر باشد و با جدا کردن متغیرهایی که باید تخصیص داده شوند با کاما انجام می‌شود، مانند `first, second, third = [1, 2, 3]`.

عملگر splat (`*`) و عملگر double splat (`**`) اغلب در بافت‌های تجزیه به کار می‌روند.

~~~~exercism/caution
نباید `*<variable_name>` و `**<variable_name>` را با `*` و `**` اشتباه بگیرید.
در حالی که `*` و `**` به ترتیب برای ضرب و توان استفاده می‌شوند، `*<variable_name>` و `**<variable_name>` به عنوان عملگرهای ترکیب و تجزیه به کار می‌روند.
~~~~

## تخصیص چندگانه

تخصیص چندگانه به شما امکان می‌دهد چندین متغیر را در یک خط تخصیص دهید.
برای جدا کردن مقادیر، از کاما `,` استفاده کنید:

```irb
>> a, b = 1, 2
=> [1, 2]
>> a
=> 1
```

تخصیص چندگانه به یک نوع داده محدود نمی‌شود:

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

از تخصیص چندگانه می‌توان برای جابه‌جایی عناصر در **آرایه‌ها** استفاده کرد.
این کار در [الگوریتم‌های مرتب‌سازی][sorting algorithms] بسیار رایج است.
برای مثال:

```irb
>> numbers = [1, 2]
=> [1, 2]
>> numbers[0], numbers[1] = numbers[1], numbers[0]
=> [2, 1]
>> numbers
=> [2, 1]
```

~~~~exercism/note
به این کار «تخصیص موازی» هم می‌گویند و می‌توان از آن برای جلوگیری از متغیر موقت استفاده کرد.
~~~~

اگر تعداد متغیرها بیشتر از مقادیر باشد، به متغیرهای اضافی `nil` تخصیص داده می‌شود:

```irb
>> a, b, c = 1, 2
=> [1, 2]
>> b
=> 2
>> c
=> nil
```

## تجزیه

در Ruby می‌توان [عناصر **آرایه‌ها**/**هش‌ها** را به متغیرهای مجزا تجزیه کرد][decompose].
چون مقادیر در **آرایه‌ها** به ترتیب اندیس ظاهر می‌شوند، به همان ترتیب در متغیرها باز می‌شوند:

```irb
>> fruits = ["apple", "banana", "cherry"]
>> x, y, z = fruits
>> x
=> "apple"
```

اگر مقادیری مورد نیاز نباشند، می‌توانید از `_` استفاده کنید تا نشان دهید «جمع‌آوری شده اما استفاده نشده است»:

```irb
>> fruits = ["apple", "banana", "cherry"]
>> _, _, z = fruits
>> z
=> "cherry"
```

### تجزیه‌ی عمیق

تجزیه و تخصیص مقادیر **آرایه**های درون یک **آرایه** (_که به آن آرایه‌ی تودرتو هم می‌گویند_) مانند تجزیه‌ی سطحی کار می‌کند، اما به [عبارت تجزیه‌ی محدودشده (`()`)][delimited decomposition expression] نیاز دارد تا بافت یا موقعیت مقادیر را روشن کند:

```irb
>> fruits_vegetables = [["apple", "banana"], ["carrot", "potato"]]
>> (a, b), (c, d) = fruits_vegetables
>> a
=> "apple"
>> d
=> "potato"
```

همچنین می‌توانید فقط بخشی از یک **آرایه‌ی** تودرتو را به‌صورت عمیق باز کنید:

```irb
>> fruits_vegetables = [["apple", "banana"], ["carrot", "potato"]]
>> a, (c, d) = fruits_vegetables
>> a
=> ["apple", "banana"]
>> c
=> "carrot"
```

اگر در تجزیه، متغیرهایی با جای‌گیری نادرست و/یا تعداد نادرست مقادیر وجود داشته باشد، **خطای نگارش** دریافت می‌کنید:

```ruby
fruits_vegetables = [["apple", "banana"], ["carrot", "potato"]]

(a, b), (d) = fruits_vegetables
# syntax error, unexpected '=', expecting '.' or &. or :: or '['

((a, b), (d)) = fruits_vegetables
# syntax error, unexpected ')', expecting '.' or &. or :: or '['
```

اینجا آزمایش کنید و متوجه می‌شوید که این الگوی اول است که تعیین‌کننده است، نه مقادیر موجود در سمت راست.
خطای نگارش به ساختار داده گره نخورده است.

### تجزیه‌ی یک آرایه با عملگر splat تکی (`*`)

هنگام [تجزیه‌ی یک **آرایه**][decompose] می‌توانید از عملگر splat (`*`) برای گرفتن مقادیر «باقی‌مانده» استفاده کنید.
این روش از برش دادن **آرایه** روشن‌تر است (_که در برخی موقعیت‌ها خواناتر نیست_).
برای مثال، می‌توانیم اولین عنصر را استخراج کنیم و سپس مقادیر باقی‌مانده را در یک **آرایه‌ی** جدید بدون اولین عنصر قرار دهیم:

```irb
>> fruits = ["apple", "banana", "cherry", "orange", "kiwi", "melon", "mango"]
>> x, *last = fruits
>> x
=> "apple"
>> last
=> ["banana", "cherry", "orange", "kiwi", "melon", "mango"]
```

همچنین می‌توانیم مقادیر ابتدا و انتهای **آرایه** را استخراج کنیم و در همان حال همه‌ی مقادیر میانی را گروه‌بندی کنیم:

```irb
>> fruits = ["apple", "banana", "cherry", "orange", "kiwi", "melon", "mango"]
>> x, *middle, y, z = fruits
>> y
=> "melon"
>> middle
=> ["banana", "cherry", "orange", "kiwi"]
```

همچنین می‌توانیم از `*` در تجزیه‌ی عمیق استفاده کنیم:

```irb
>> fruits_vegetables = [["apple", "banana", "melon"], ["carrot", "potato", "tomato"]]
>> (a, *rest), b = fruits_vegetables
>> a
=> "apple"
>> rest
=> ["banana", "melon"]
```

### تجزیه‌ی یک `Hash`

تجزیه‌ی یک **هش** کمی با تجزیه‌ی یک **آرایه** تفاوت دارد.
برای اینکه بتوانید یک **هش** را باز کنید، ابتدا باید آن را به یک **آرایه** تبدیل کنید.
در غیر این صورت هیچ تجزیه‌ای رخ نمی‌دهد:

```irb
>> fruits_inventory = {apple: 6, banana: 2, cherry: 3}
>> x, y, z = fruits_inventory
>> x
=> {:apple=>6, :banana=>2, :cherry=>3}
>> y
=> nil
```

برای تبدیل یک `Hash` به **آرایه** می‌توانید از متد `to_a` استفاده کنید:

```irb
>> fruits_inventory = {apple: 6, banana: 2, cherry: 3}
>> fruits_inventory.to_a
=> [[:apple, 6], [:banana, 2], [:cherry, 3]]
>> x, y, z = fruits_inventory.to_a
>> x
=> [:apple, 6]
```

اگر می‌خواهید کلیدها را باز کنید، می‌توانید از متد `keys` استفاده کنید:

```irb
>> fruits_inventory = {apple: 6, banana: 2, cherry: 3}
>> x, y, z = fruits_inventory.keys
>> x
=> :apple
```

اگر می‌خواهید مقادیر را باز کنید، می‌توانید از متد `values` استفاده کنید:

```irb
>> fruits_inventory = {apple: 6, banana: 2, cherry: 3}
>> x, y, z = fruits_inventory.values
>> x
=> 6
```

## ترکیب

ترکیب، توانایی گروه‌بندی چندین مقدار در یک **آرایه** است که به یک متغیر تخصیص داده می‌شود.
این کار زمانی مفید است که می‌خواهید مقادیر را _تجزیه_ کنید، تغییراتی بدهید و سپس نتایج را دوباره در یک متغیر _ترکیب_ کنید.
همچنین امکان ادغام دو یا چند **آرایه**/**هش** را فراهم می‌کند.

### ترکیب یک آرایه با عملگر splat (`*`)

ترکیب یک **آرایه** را می‌توان با عملگر splat (`*`) انجام داد.
این کار همه‌ی مقادیر را در یک **آرایه** جمع می‌کند.

```irb
>> fruits = ["apple", "banana", "cherry"]
>> more_fruits = ["orange", "kiwi", "melon", "mango"]

# fruits and more_fruits are unpacked and then their elements are packed into combined_fruits
>> combined_fruits = *fruits, *more_fruits

>> combined_fruits
=> ["apple", "banana", "cherry", "orange", "kiwi", "melon", "mango"]
```

### ترکیب یک هش با عملگر double splat (`**`)

ترکیب یک هش با استفاده از عملگر double splat (`**`) انجام می‌شود.
این کار همه‌ی جفت‌های **کلید**/**مقدار** یک هش را در هش دیگر جمع می‌کند، یا دو هش را با هم ادغام می‌کند.

```irb
>> fruits_inventory = {apple: 6, banana: 2, cherry: 3}
>> more_fruits_inventory = {orange: 4, kiwi: 1, melon: 2, mango: 3}

# fruits_inventory and more_fruits_inventory are unpacked into key-values pairs and combined.
>> combined_fruits_inventory = {**fruits_inventory, **more_fruits_inventory}

# then the pairs are packed into combined_fruits_inventory
>> combined_fruits_inventory
=> {:apple=>6, :banana=>2, :cherry=>3, :orange=>4, :kiwi=>1, :melon=>2, :mango=>3}
```

## استفاده از عملگر splat (`*`) و عملگر double splat (`**`) با متدها

### ترکیب با پارامترهای متد

وقتی متدی می‌سازید که تعداد دلخواهی آرگومان می‌پذیرد، می‌توانید در تعریف متد از [`*arguments`][arguments] یا [`**keyword_arguments`][keyword arguments] استفاده کنید.
از `*arguments` برای جمع کردن تعداد دلخواهی آرگومان مکانی (غیرکلیدواژه‌ای) استفاده می‌شود و
از `**keyword_arguments` برای جمع کردن تعداد دلخواهی آرگومان کلیدواژه‌ای استفاده می‌شود.

استفاده از `*arguments`:

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

استفاده از `**keyword_arguments`:

```irb
# This method is defined to take any number of keyword arguments

>> def my_method(**keyword_arguments)= keyword_arguments

# Arguments given to the method are packed into a dictionary

>> my_method(a: 1, b: 2, c: 3)
=> {:a => 1, :b => 2, :c => 3}
```

اگر متد تعریف‌شده هیچ پارامتر تعریف‌شده‌ای برای آرگومان‌های کلیدواژه‌ای نداشته باشد (`**keyword_arguments` یا `<key_word>: <value>`)، آن‌گاه آرگومان‌های کلیدواژه‌ای در یک هش جمع می‌شوند و به آخرین پارامتر تخصیص داده می‌شوند.

```irb
>> def my_method(a)= a

>> my_method(a: 1, b: 2, c: 3)
=> {:a => 1, :b => 2, :c => 3}
```

از `*arguments` و `**keyword_arguments` می‌توان در ترکیب با یکدیگر نیز استفاده کرد:

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

همچنین می‌توانید آرگومان‌هایی پیش و پس از `*arguments` بنویسید تا آرگومان‌های مکانی مشخصی را ممکن کنید.
این کار مانند تجزیه‌ی یک آرایه عمل می‌کند.

~~~~exercism/caution
آرگومان‌ها باید به ترتیب مشخصی ساختاربندی شوند:

`def my_method(<positional_arguments>, *arguments, <positional_arguments>, <keyword_arguments>, **keyword_arguments)`

اگر این ترتیب را رعایت نکنید، خطا دریافت می‌کنید.
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

می‌توانید آرگومان‌های مکانی را پیش و پس از `*arguments` بنویسید:

```irb
>> def my_method(a, *middle, b)= middle

>> my_method(1, 2, 3, 4, 5)
=> [2, 3, 4]
```

همچنین می‌توانید آرگومان‌های مکانی، \*arguments، آرگومان‌های کلیدواژه‌ای و \*\*keyword_arguments را ترکیب کنید:

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

نوشتن آرگومان‌ها به ترتیب نادرست منجر به خطا می‌شود:

```ruby
def my_method(a:, **keyword_arguments, first, *arguments, last)
  arguments
end

my_method(1, 2, 3, 4, a: 5)

syntax error, unexpected local variable or method, expecting & or '&'
... my_method(a:, **keyword_arguments, first, *arguments, last)
```

### تجزیه در فراخوانی متدها

می‌توانید از عملگر splat (`*`) برای باز کردن یک **آرایه** از آرگومان‌ها در فراخوانی متد استفاده کنید:

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

همچنین می‌توانید از عملگر double splat (`**`) برای باز کردن یک **هش** از آرگومان‌ها در فراخوانی متد استفاده کنید:

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
