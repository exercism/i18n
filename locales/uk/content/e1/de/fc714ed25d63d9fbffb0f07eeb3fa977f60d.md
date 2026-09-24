# Декомпозиція та множинне присвоєння

Декомпозиція полягає у вилученні елементів колекції, як-от `Array` або `Hash`.
Декомпозовані значення потім можна присвоїти змінним у межах однієї інструкції.

[Множинне присвоєння][multiple assignment] дає змогу присвоїти кілька змінних, щоб декомпозувати значення в межах однієї інструкції.
Завдяки цьому код стає лаконічнішим і зрозумілішим; змінні, яким присвоюються значення, розділяють комою, як-от `first, second, third = [1, 2, 3]`.

Оператор splat (`*`) і подвійний оператор splat (`**`) часто використовують у контексті декомпозиції.

~~~~exercism/caution
`*<variable_name>` і `**<variable_name>` не варто плутати з `*` і `**`.
`*` і `**` використовують для множення та піднесення до степеня відповідно, а `*<variable_name>` і `**<variable_name>` — як оператори композиції та декомпозиції.
~~~~

## Множинне присвоєння

Множинне присвоєння дає змогу присвоїти кілька змінних в одному рядку.
Щоб розділити значення, використаймо кому `,`:

```irb
>> a, b = 1, 2
=> [1, 2]
>> a
=> 1
```

Множинне присвоєння не обмежується одним типом даних:

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

Множинне присвоєння можна використати, щоб обміняти місцями елементи **масиву**.
Цей прийом досить поширений в [алгоритмах сортування][sorting algorithms].
Наприклад:

```irb
>> numbers = [1, 2]
=> [1, 2]
>> numbers[0], numbers[1] = numbers[1], numbers[0]
=> [2, 1]
>> numbers
=> [2, 1]
```

~~~~exercism/note
Це також називають «паралельним присвоєнням»; його можна використати, щоб уникнути тимчасової змінної.
~~~~

Якщо змінних більше, ніж значень, зайвим змінним буде присвоєно `nil`:

```irb
>> a, b, c = 1, 2
=> [1, 2]
>> b
=> 2
>> c
=> nil
```

## Декомпозиція

У Ruby можна [декомпозувати елементи **масивів**/**хешів**][decompose] в окремі змінні.
Оскільки значення розташовані в **масивах** у порядку індексів, вони розпаковуються у змінні в тому самому порядку:

```irb
>> fruits = ["apple", "banana", "cherry"]
>> x, y, z = fruits
>> x
=> "apple"
```

Якщо якісь значення не потрібні, можна використати `_`, щоб позначити «зібрано, але не використано»:

```irb
>> fruits = ["apple", "banana", "cherry"]
>> _, _, z = fruits
>> z
=> "cherry"
```

### Глибока декомпозиція

Декомпозиція й присвоєння значень із **масивів** усередині **масиву** (_який ще називають вкладеним масивом_) відбувається так само, як і поверхнева декомпозиція, але потребує [виразу декомпозиції з обмежувачами (`()`)][delimited decomposition expression], щоб уточнити контекст або позицію значень:

```irb
>> fruits_vegetables = [["apple", "banana"], ["carrot", "potato"]]
>> (a, b), (c, d) = fruits_vegetables
>> a
=> "apple"
>> d
=> "potato"
```

Можна також глибоко розпакувати лише частину вкладеного **масиву**:

```irb
>> fruits_vegetables = [["apple", "banana"], ["carrot", "potato"]]
>> a, (c, d) = fruits_vegetables
>> a
=> ["apple", "banana"]
>> c
=> "carrot"
```

Якщо у декомпозиції змінні розташовані неправильно та/або кількість значень неправильна, ми отримаємо **помилку синтаксису**:

```ruby
fruits_vegetables = [["apple", "banana"], ["carrot", "potato"]]

(a, b), (d) = fruits_vegetables
# syntax error, unexpected '=', expecting '.' or &. or :: or '['

((a, b), (d)) = fruits_vegetables
# syntax error, unexpected ')', expecting '.' or &. or :: or '['
```

Поекспериментуймо тут, і ми помітимо, що саме перший зразок визначає розподіл, а не наявні значення з правого боку.
Помилка синтаксису не повʼязана зі структурою даних.

### Декомпозиція масиву за допомогою одинарного оператора splat (`*`)

Коли ми [декомпозуємо **масив**][decompose], можна використати оператор splat (`*`), щоб захопити «зайві» значення.
Це зрозуміліше, ніж зріз **масиву** (_який у деяких ситуаціях менш читабельний_).
Наприклад, ми можемо вилучити перший елемент, а потім присвоїти решту значень новому **масиву** без першого елемента:

```irb
>> fruits = ["apple", "banana", "cherry", "orange", "kiwi", "melon", "mango"]
>> x, *last = fruits
>> x
=> "apple"
>> last
=> ["banana", "cherry", "orange", "kiwi", "melon", "mango"]
```

Можна також вилучити значення на початку й у кінці **масиву**, згрупувавши всі значення посередині:

```irb
>> fruits = ["apple", "banana", "cherry", "orange", "kiwi", "melon", "mango"]
>> x, *middle, y, z = fruits
>> y
=> "melon"
>> middle
=> ["banana", "cherry", "orange", "kiwi"]
```

Оператор `*` можна використати і в глибокій декомпозиції:

```irb
>> fruits_vegetables = [["apple", "banana", "melon"], ["carrot", "potato", "tomato"]]
>> (a, *rest), b = fruits_vegetables
>> a
=> "apple"
>> rest
=> ["banana", "melon"]
```

### Декомпозиція `Hash`

Декомпозиція **хеша** дещо відрізняється від декомпозиції **масиву**.
Щоб розпакувати **хеш**, спершу треба перетворити його на **масив**.
Інакше декомпозиції не станеться:

```irb
>> fruits_inventory = {apple: 6, banana: 2, cherry: 3}
>> x, y, z = fruits_inventory
>> x
=> {:apple=>6, :banana=>2, :cherry=>3}
>> y
=> nil
```

Щоб привести `Hash` до **масиву**, можна використати метод `to_a`:

```irb
>> fruits_inventory = {apple: 6, banana: 2, cherry: 3}
>> fruits_inventory.to_a
=> [[:apple, 6], [:banana, 2], [:cherry, 3]]
>> x, y, z = fruits_inventory.to_a
>> x
=> [:apple, 6]
```

Якщо потрібно розпакувати ключі, можна використати метод `keys`:

```irb
>> fruits_inventory = {apple: 6, banana: 2, cherry: 3}
>> x, y, z = fruits_inventory.keys
>> x
=> :apple
```

Якщо потрібно розпакувати значення, можна використати метод `values`:

```irb
>> fruits_inventory = {apple: 6, banana: 2, cherry: 3}
>> x, y, z = fruits_inventory.values
>> x
=> 6
```

## Композиція

Компонування дає змогу згрупувати кілька значень в один **масив**, який присвоюється змінній.
Це стає в пригоді, коли ми хочемо _декомпозувати_ значення, щось у них змінити, а потім _скомпонувати_ результат назад у змінну.
Це також дозволяє обʼєднувати два або більше **масивів**/**хешів**.

### Композиція масиву за допомогою оператора splat (`*`)

Скомпонувати **масив** можна за допомогою оператора splat (`*`).
Він спакує всі значення в один **масив**.

```irb
>> fruits = ["apple", "banana", "cherry"]
>> more_fruits = ["orange", "kiwi", "melon", "mango"]

# fruits and more_fruits are unpacked and then their elements are packed into combined_fruits
>> combined_fruits = *fruits, *more_fruits

>> combined_fruits
=> ["apple", "banana", "cherry", "orange", "kiwi", "melon", "mango"]
```

### Композиція хеша за допомогою подвійного оператора splat (`**`)

Компонування хеша виконують за допомогою подвійного оператора splat (`**`).
Він пакує всі пари **ключ**/**значення** з одного хеша в інший хеш або обʼєднує два хеші разом.

```irb
>> fruits_inventory = {apple: 6, banana: 2, cherry: 3}
>> more_fruits_inventory = {orange: 4, kiwi: 1, melon: 2, mango: 3}

# fruits_inventory and more_fruits_inventory are unpacked into key-values pairs and combined.
>> combined_fruits_inventory = {**fruits_inventory, **more_fruits_inventory}

# then the pairs are packed into combined_fruits_inventory
>> combined_fruits_inventory
=> {:apple=>6, :banana=>2, :cherry=>3, :orange=>4, :kiwi=>1, :melon=>2, :mango=>3}
```

## Використання оператора splat (`*`) і подвійного оператора splat (`**`) з методами

### Композиція з параметрами методу

Коли ми створюємо метод, який приймає довільну кількість аргументів, у визначенні методу можна використати [`*arguments`][arguments] або [`**keyword_arguments`][keyword arguments].
`*arguments` використовують, щоб спакувати довільну кількість позиційних (неключових) аргументів, а `**keyword_arguments` — довільну кількість ключових аргументів.

Використання `*arguments`:

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

Використання `**keyword_arguments`:

```irb
# This method is defined to take any number of keyword arguments

>> def my_method(**keyword_arguments)= keyword_arguments

# Arguments given to the method are packed into a dictionary

>> my_method(a: 1, b: 2, c: 3)
=> {:a => 1, :b => 2, :c => 3}
```

Якщо у визначеному методі немає параметрів для ключових аргументів (`**keyword_arguments` або `<key_word>: <value>`), то ключові аргументи буде спаковано в хеш і присвоєно останньому параметру.

```irb
>> def my_method(a)= a

>> my_method(a: 1, b: 2, c: 3)
=> {:a => 1, :b => 2, :c => 3}
```

`*arguments` і `**keyword_arguments` можна також використовувати разом:

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

Можна також писати аргументи до й після `*arguments`, щоб задати конкретні позиційні аргументи.
Це працює так само, як декомпозиція масиву.

~~~~exercism/caution
Аргументи потрібно впорядкувати в певній послідовності:

`def my_method(<positional_arguments>, *arguments, <positional_arguments>, <keyword_arguments>, **keyword_arguments)`

Якщо не дотриматися цього порядку, виникне помилка.
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

Позиційні аргументи можна писати до й після `*arguments`:

```irb
>> def my_method(a, *middle, b)= middle

>> my_method(1, 2, 3, 4, 5)
=> [2, 3, 4]
```

Можна також поєднувати позиційні аргументи, \*arguments, ключові аргументи та \*\*keyword_arguments:

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

Якщо записати аргументи в неправильному порядку, виникне помилка:

```ruby
def my_method(a:, **keyword_arguments, first, *arguments, last)
  arguments
end

my_method(1, 2, 3, 4, a: 5)

syntax error, unexpected local variable or method, expecting & or '&'
... my_method(a:, **keyword_arguments, first, *arguments, last)
```

### Декомпозиція у викликах методів

Оператор splat (`*`) можна використати, щоб розпакувати **масив** аргументів у виклик методу:

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

Подвійний оператор splat (`**`) можна також використати, щоб розпакувати **хеш** аргументів у виклик методу:

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
