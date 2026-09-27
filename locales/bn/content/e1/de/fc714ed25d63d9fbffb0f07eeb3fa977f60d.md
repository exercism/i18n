# ডিকম্পোজিশন ও মাল্টিপল অ্যাসাইনমেন্ট

ডিকম্পোজিশন বলতে কোনো কালেকশনের এলিমেন্টগুলো আলাদা করে বের করার কাজকে বোঝায়, যেমন একটি `Array` বা `Hash`।
এরপর ডিকম্পোজ করা মানগুলো একই স্টেটমেন্টেই ভ্যারিয়েবলে অ্যাসাইন করা যায়।

[মাল্টিপল অ্যাসাইনমেন্ট][multiple assignment] হলো একই স্টেটমেন্টে একাধিক ভ্যারিয়েবলে ডিকম্পোজ করা মান অ্যাসাইন করার ক্ষমতা।
এতে কোড আরও সংক্ষিপ্ত ও পাঠযোগ্য হয়, আর এটি করতে অ্যাসাইন করার ভ্যারিয়েবলগুলো কমা দিয়ে আলাদা করা হয়, যেমন `first, second, third = [1, 2, 3]`।

স্প্ল্যাট অপারেটর (`*`) আর ডাবল স্প্ল্যাট অপারেটর (`**`) প্রায়ই ডিকম্পোজিশনের ক্ষেত্রে ব্যবহৃত হয়।

~~~~exercism/caution
`*<variable_name>` আর `**<variable_name>` কে `*` আর `**` এর সঙ্গে গুলিয়ে ফেলা উচিত নয়।
`*` আর `**` যথাক্রমে গুণ ও সূচকের জন্য ব্যবহৃত হয়, অন্যদিকে `*<variable_name>` আর `**<variable_name>` কম্পোজিশন ও ডিকম্পোজিশন অপারেটর হিসেবে ব্যবহৃত হয়।
~~~~

## মাল্টিপল অ্যাসাইনমেন্ট

মাল্টিপল অ্যাসাইনমেন্ট দিয়ে আপনি এক লাইনেই একাধিক ভ্যারিয়েবলে অ্যাসাইন করতে পারেন।
মানগুলো আলাদা করতে কমা `,` ব্যবহার করুন:

```irb
>> a, b = 1, 2
=> [1, 2]
>> a
=> 1
```

মাল্টিপল অ্যাসাইনমেন্ট একটি ডেটা টাইপেই সীমাবদ্ধ নয়:

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

মাল্টিপল অ্যাসাইনমেন্ট দিয়ে **অ্যারে**র এলিমেন্টগুলো অদলবদল করা যায়।
[সর্টিং অ্যালগরিদম][sorting algorithms] রচনার সময় এই কৌশলটি বেশ কমন।
যেমন:

```irb
>> numbers = [1, 2]
=> [1, 2]
>> numbers[0], numbers[1] = numbers[1], numbers[0]
=> [2, 1]
>> numbers
=> [2, 1]
```

~~~~exercism/note
এটিকে "প্যারালাল অ্যাসাইনমেন্ট" নামেও ডাকা হয়, আর এটি একটি টেম্পোরারি ভ্যারিয়েবল এড়াতে ব্যবহার করা যায়।
~~~~

মানের চেয়ে বেশি ভ্যারিয়েবল থাকলে বাড়তি ভ্যারিয়েবলগুলোতে `nil` অ্যাসাইন হবে:

```irb
>> a, b, c = 1, 2
=> [1, 2]
>> b
=> 2
>> c
=> nil
```

## ডিকম্পোজিশন

Ruby-তে **অ্যারে**/**হ্যাশ**ের এলিমেন্টগুলোকে আলাদা আলাদা ভ্যারিয়েবলে [ডিকম্পোজ করা][decompose] সম্ভব।
**অ্যারে**তে মানগুলো যেহেতু ইন্ডেক্স ক্রমে থাকে, তাই সেগুলো একই ক্রমে ভ্যারিয়েবলগুলোতে আনপ্যাক হয়:

```irb
>> fruits = ["apple", "banana", "cherry"]
>> x, y, z = fruits
>> x
=> "apple"
```

কোনো মানের প্রয়োজন না থাকলে `_` দিয়ে বোঝাতে পারেন যে সেটি "নেওয়া হয়েছে কিন্তু ব্যবহার করা হয়নি":

```irb
>> fruits = ["apple", "banana", "cherry"]
>> _, _, z = fruits
>> z
=> "cherry"
```

### ডিপ ডিকম্পোজিশন

একটি **অ্যারে**র ভেতরের **অ্যারে** (_যাকে নেস্টেড অ্যারে-ও বলা হয়_) থেকে মান ডিকম্পোজ ও অ্যাসাইন করা ঠিক শ্যালো ডিকম্পোজিশনের মতোই কাজ করে, তবে মানের প্রসঙ্গ বা অবস্থান স্পষ্ট করতে [ডিলিমিটেড ডিকম্পোজিশন এক্সপ্রেশন (`()`)][delimited decomposition expression] দরকার হয়:

```irb
>> fruits_vegetables = [["apple", "banana"], ["carrot", "potato"]]
>> (a, b), (c, d) = fruits_vegetables
>> a
=> "apple"
>> d
=> "potato"
```

আপনি একটি নেস্টেড **অ্যারে**র শুধু একটি অংশও গভীরভাবে আনপ্যাক করতে পারেন:

```irb
>> fruits_vegetables = [["apple", "banana"], ["carrot", "potato"]]
>> a, (c, d) = fruits_vegetables
>> a
=> ["apple", "banana"]
>> c
=> "carrot"
```

ডিকম্পোজিশনে ভ্যারিয়েবলের অবস্থান ভুল হলে এবং/অথবা মানের সংখ্যা ভুল হলে আপনি একটি **সিনট্যাক্স এরর** পাবেন:

```ruby
fruits_vegetables = [["apple", "banana"], ["carrot", "potato"]]

(a, b), (d) = fruits_vegetables
# syntax error, unexpected '=', expecting '.' or &. or :: or '['

((a, b), (d)) = fruits_vegetables
# syntax error, unexpected ')', expecting '.' or &. or :: or '['
```

এখানে পরীক্ষা করে দেখুন, তাহলে বুঝবেন যে ডান দিকের উপলব্ধ মান নয়, বরং প্রথম প্যাটার্নই নির্ধারণ করে।
সিনট্যাক্স এররটি ডেটা স্ট্রাকচারের সাথে সম্পর্কিত নয়।

### সিঙ্গেল স্প্ল্যাট অপারেটর (`*`) দিয়ে একটি অ্যারে ডিকম্পোজ করা

[একটি **অ্যারে** ডিকম্পোজ করার][decompose] সময় স্প্ল্যাট অপারেটর (`*`) দিয়ে "বাকি পড়ে থাকা" মানগুলো ধরা যায়।
এটি **অ্যারে**টি স্লাইস করার চেয়ে স্পষ্ট (_যা কিছু ক্ষেত্রে কম পাঠযোগ্য_)।
যেমন, আমরা প্রথম এলিমেন্টটি বের করে বাকি মানগুলো প্রথম এলিমেন্ট ছাড়া একটি নতুন **অ্যারে**তে অ্যাসাইন করতে পারি:

```irb
>> fruits = ["apple", "banana", "cherry", "orange", "kiwi", "melon", "mango"]
>> x, *last = fruits
>> x
=> "apple"
>> last
=> ["banana", "cherry", "orange", "kiwi", "melon", "mango"]
```

আমরা **অ্যারে**র শুরু ও শেষের মানগুলোও বের করতে পারি, আর মাঝের সব মান একসাথে গ্রুপ করতে পারি:

```irb
>> fruits = ["apple", "banana", "cherry", "orange", "kiwi", "melon", "mango"]
>> x, *middle, y, z = fruits
>> y
=> "melon"
>> middle
=> ["banana", "cherry", "orange", "kiwi"]
```

ডিপ ডিকম্পোজিশনেও আমরা `*` ব্যবহার করতে পারি:

```irb
>> fruits_vegetables = [["apple", "banana", "melon"], ["carrot", "potato", "tomato"]]
>> (a, *rest), b = fruits_vegetables
>> a
=> "apple"
>> rest
=> ["banana", "melon"]
```

### একটি `Hash` ডিকম্পোজ করা

একটি **হ্যাশ** ডিকম্পোজ করা **অ্যারে** ডিকম্পোজ করার চেয়ে একটু আলাদা।
একটি **হ্যাশ** আনপ্যাক করতে হলে প্রথমে সেটিকে একটি **অ্যারে**তে রূপান্তর করতে হবে।
নাহলে কোনো ডিকম্পোজিশনই হবে না:

```irb
>> fruits_inventory = {apple: 6, banana: 2, cherry: 3}
>> x, y, z = fruits_inventory
>> x
=> {:apple=>6, :banana=>2, :cherry=>3}
>> y
=> nil
```

একটি `Hash`-কে **অ্যারে**তে রূপান্তর করতে আপনি `to_a` মেথড ব্যবহার করতে পারেন:

```irb
>> fruits_inventory = {apple: 6, banana: 2, cherry: 3}
>> fruits_inventory.to_a
=> [[:apple, 6], [:banana, 2], [:cherry, 3]]
>> x, y, z = fruits_inventory.to_a
>> x
=> [:apple, 6]
```

কী (key)গুলো আনপ্যাক করতে চাইলে আপনি `keys` মেথড ব্যবহার করতে পারেন:

```irb
>> fruits_inventory = {apple: 6, banana: 2, cherry: 3}
>> x, y, z = fruits_inventory.keys
>> x
=> :apple
```

মানগুলো আনপ্যাক করতে চাইলে আপনি `values` মেথড ব্যবহার করতে পারেন:

```irb
>> fruits_inventory = {apple: 6, banana: 2, cherry: 3}
>> x, y, z = fruits_inventory.values
>> x
=> 6
```

## কম্পোজিশন

কম্পোজ করা হলো একাধিক মানকে একটি **অ্যারে**তে গ্রুপ করে একটি ভ্যারিয়েবলে অ্যাসাইন করার ক্ষমতা।
আপনি যখন মানগুলো _ডিকম্পোজ_ করতে, পরিবর্তন করতে, তারপর ফলাফলগুলো আবার একটি ভ্যারিয়েবলে _কম্পোজ_ করতে চান তখন এটি কাজে লাগে।
এছাড়া এটি ২ বা তার বেশি **অ্যারে**/**হ্যাশ** মার্জ করাও সম্ভব করে।

### স্প্ল্যাট অপারেটর (`*`) দিয়ে একটি অ্যারে কম্পোজ করা

স্প্ল্যাট অপারেটর (`*`) দিয়ে একটি **অ্যারে** কম্পোজ করা যায়।
এটি সব মান একটি **অ্যারে**তে প্যাক করে।

```irb
>> fruits = ["apple", "banana", "cherry"]
>> more_fruits = ["orange", "kiwi", "melon", "mango"]

# fruits and more_fruits are unpacked and then their elements are packed into combined_fruits
>> combined_fruits = *fruits, *more_fruits

>> combined_fruits
=> ["apple", "banana", "cherry", "orange", "kiwi", "melon", "mango"]
```

### ডাবল স্প্ল্যাট অপারেটর (`**`) দিয়ে একটি হ্যাশ কম্পোজ করা

ডাবল স্প্ল্যাট অপারেটর (`**`) দিয়ে একটি হ্যাশ কম্পোজ করা হয়।
এটি একটি হ্যাশের সব **কী (key)**/**মান** জোড়া আরেকটি হ্যাশে প্যাক করে, বা দুটি হ্যাশ একসাথে জোড়া লাগায়।

```irb
>> fruits_inventory = {apple: 6, banana: 2, cherry: 3}
>> more_fruits_inventory = {orange: 4, kiwi: 1, melon: 2, mango: 3}

# fruits_inventory and more_fruits_inventory are unpacked into key-values pairs and combined.
>> combined_fruits_inventory = {**fruits_inventory, **more_fruits_inventory}

# then the pairs are packed into combined_fruits_inventory
>> combined_fruits_inventory
=> {:apple=>6, :banana=>2, :cherry=>3, :orange=>4, :kiwi=>1, :melon=>2, :mango=>3}
```

## মেথডের সঙ্গে স্প্ল্যাট অপারেটর (`*`) ও ডাবল স্প্ল্যাট অপারেটর (`**`) এর ব্যবহার

### মেথড প্যারামিটার দিয়ে কম্পোজিশন

আপনি যখন এমন একটি মেথড তৈরি করেন যা যেকোনো সংখ্যক আর্গুমেন্ট গ্রহণ করে, তখন মেথড ডেফিনিশনে [`*arguments`][arguments] বা [`**keyword_arguments`][keyword arguments] ব্যবহার করতে পারেন।
`*arguments` যেকোনো সংখ্যক পজিশনাল (নন-কিওয়ার্ডেড) আর্গুমেন্ট প্যাক করতে ব্যবহৃত হয় আর
`**keyword_arguments` যেকোনো সংখ্যক কিওয়ার্ড আর্গুমেন্ট প্যাক করতে ব্যবহৃত হয়।

`*arguments` এর ব্যবহার:

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

`**keyword_arguments` এর ব্যবহার:

```irb
# This method is defined to take any number of keyword arguments

>> def my_method(**keyword_arguments)= keyword_arguments

# Arguments given to the method are packed into a dictionary

>> my_method(a: 1, b: 2, c: 3)
=> {:a => 1, :b => 2, :c => 3}
```

ডিফাইন করা মেথডে কিওয়ার্ড আর্গুমেন্টের জন্য (`**keyword_arguments` বা `<key_word>: <value>`) কোনো প্যারামিটার ডিফাইন করা না থাকলে, কিওয়ার্ড আর্গুমেন্টগুলো একটি হ্যাশে প্যাক হয়ে শেষ প্যারামিটারে অ্যাসাইন হবে।

```irb
>> def my_method(a)= a

>> my_method(a: 1, b: 2, c: 3)
=> {:a => 1, :b => 2, :c => 3}
```

`*arguments` আর `**keyword_arguments` একসাথেও ব্যবহার করা যায়:

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

নির্দিষ্ট পজিশনাল আর্গুমেন্টের সুবিধার জন্য আপনি `*arguments` এর আগে ও পরে আর্গুমেন্ট লিখতেও পারেন।
এটি অ্যারে ডিকম্পোজ করার মতোই কাজ করে।

~~~~exercism/caution
আর্গুমেন্টগুলো একটি নির্দিষ্ট ক্রমে সাজাতে হবে:

`def my_method(<positional_arguments>, *arguments, <positional_arguments>, <keyword_arguments>, **keyword_arguments)`

এই ক্রম না মানলে আপনি একটি এরর পাবেন।
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

আপনি `*arguments` এর আগে ও পরে পজিশনাল আর্গুমেন্ট লিখতে পারেন:

```irb
>> def my_method(a, *middle, b)= middle

>> my_method(1, 2, 3, 4, 5)
=> [2, 3, 4]
```

আপনি পজিশনাল আর্গুমেন্ট, \*arguments, কিওয়ার্ড আর্গুমেন্ট আর \*\*keyword_arguments-ও একসাথে মেলাতে পারেন:

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

ভুল ক্রমে আর্গুমেন্ট লিখলে একটি এরর হবে:

```ruby
def my_method(a:, **keyword_arguments, first, *arguments, last)
  arguments
end

my_method(1, 2, 3, 4, a: 5)

syntax error, unexpected local variable or method, expecting & or '&'
... my_method(a:, **keyword_arguments, first, *arguments, last)
```

### মেথড কলে ডিকম্পোজ করা

স্প্ল্যাট অপারেটর (`*`) দিয়ে আর্গুমেন্টের একটি **অ্যারে** মেথড কলে আনপ্যাক করতে পারেন:

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

ডাবল স্প্ল্যাট অপারেটর (`**`) দিয়ে আর্গুমেন্টের একটি **হ্যাশ**ও মেথড কলে আনপ্যাক করতে পারেন:

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
