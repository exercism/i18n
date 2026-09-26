# 解构与多重赋值

解构是指从集合（例如`Array`或`Hash`）中提取元素的操作。解构出来的值可以在同一条语句里赋给变量。

[多重赋值][multiple assignment]是指在一个语句中把多个变量赋给解构出的值的能力。它能让代码更简洁、更易读，做法是用逗号分隔要赋值的变量，例如`first, second, third = [1, 2, 3]`。

展开运算符（`*`）和双展开运算符（`**`）常用于解构场景。

~~~~exercism/caution
`*<variable_name>`和`**<variable_name>`不应与`*`和`**`混淆。`*`和`**`分别用于乘法和幂运算，而`*<variable_name>`和`**<variable_name>`则用作组合和解构运算符。
~~~~

## 多重赋值

多重赋值让你可以在一行中给多个变量赋值。用逗号`,`分隔各个值：

```irb
>> a, b = 1, 2
=> [1, 2]
>> a
=> 1
```

多重赋值并不局限于一种数据类型：

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

多重赋值还可以用来交换**数组**中的元素。这种做法在[排序算法][sorting algorithms]中很常见。例如：

```irb
>> numbers = [1, 2]
=> [1, 2]
>> numbers[0], numbers[1] = numbers[1], numbers[0]
=> [2, 1]
>> numbers
=> [2, 1]
```

~~~~exercism/note
这也称为“并行赋值”，可以用来避免使用临时变量。
~~~~

如果变量的数量多于值的数量，多出来的变量会被赋值为`nil`：

```irb
>> a, b, c = 1, 2
=> [1, 2]
>> b
=> 2
>> c
=> nil
```

## 解构

在 Ruby 中，可以把**数组**/**哈希**中的元素[解构][decompose]成不同的变量。由于值在**数组**中按下标顺序出现，它们会按同样的顺序解包到变量中：

```irb
>> fruits = ["apple", "banana", "cherry"]
>> x, y, z = fruits
>> x
=> "apple"
```

如果有些值用不到，可以用`_`表示“已收集但不使用”：

```irb
>> fruits = ["apple", "banana", "cherry"]
>> _, _, z = fruits
>> z
=> "cherry"
```

### 深层解构

从**数组**内部的**数组**（_也称为嵌套数组_）中解构并赋值，方式与浅层解构相同，但需要用[带分隔符的解构表达式（`()`）][delimited decomposition expression]来明确值的上下文或位置：

```irb
>> fruits_vegetables = [["apple", "banana"], ["carrot", "potato"]]
>> (a, b), (c, d) = fruits_vegetables
>> a
=> "apple"
>> d
=> "potato"
```

你也可以只深层解包嵌套**数组**的一部分：

```irb
>> fruits_vegetables = [["apple", "banana"], ["carrot", "potato"]]
>> a, (c, d) = fruits_vegetables
>> a
=> ["apple", "banana"]
>> c
=> "carrot"
```

如果解构中变量的位置不对，或者值的数量不对，就会出现**语法错误**：

```ruby
fruits_vegetables = [["apple", "banana"], ["carrot", "potato"]]

(a, b), (d) = fruits_vegetables
# syntax error, unexpected '=', expecting '.' or &. or :: or '['

((a, b), (d)) = fruits_vegetables
# syntax error, unexpected ')', expecting '.' or &. or :: or '['
```

在这里动手试试，你会发现起决定作用的是第一个模式，而不是右侧可用的值。这个语法错误与数据结构无关。

### 用单展开运算符（`*`）解构数组

在[解构**数组**][decompose]时，你可以用展开运算符（`*`）捕获“剩下的”值。这比对**数组**切片更清晰（_切片在某些情况下可读性更差_）。例如，我们可以取出第一个元素，再把剩下的值赋给一个不含第一个元素的新**数组**：

```irb
>> fruits = ["apple", "banana", "cherry", "orange", "kiwi", "melon", "mango"]
>> x, *last = fruits
>> x
=> "apple"
>> last
=> ["banana", "cherry", "orange", "kiwi", "melon", "mango"]
```

也可以取出**数组**开头和结尾的值，同时把中间的值归成一组：

```irb
>> fruits = ["apple", "banana", "cherry", "orange", "kiwi", "melon", "mango"]
>> x, *middle, y, z = fruits
>> y
=> "melon"
>> middle
=> ["banana", "cherry", "orange", "kiwi"]
```

`*`在深层解构中同样适用：

```irb
>> fruits_vegetables = [["apple", "banana", "melon"], ["carrot", "potato", "tomato"]]
>> (a, *rest), b = fruits_vegetables
>> a
=> "apple"
>> rest
=> ["banana", "melon"]
```

### 解构`Hash`

解构**哈希**与解构**数组**略有不同。要解包**哈希**，需要先把它转换成**数组**。否则无法进行解构：

```irb
>> fruits_inventory = {apple: 6, banana: 2, cherry: 3}
>> x, y, z = fruits_inventory
>> x
=> {:apple=>6, :banana=>2, :cherry=>3}
>> y
=> nil
```

要把`Hash`强制转换成**数组**，可以使用`to_a`方法：

```irb
>> fruits_inventory = {apple: 6, banana: 2, cherry: 3}
>> fruits_inventory.to_a
=> [[:apple, 6], [:banana, 2], [:cherry, 3]]
>> x, y, z = fruits_inventory.to_a
>> x
=> [:apple, 6]
```

如果你想解包键，可以使用`keys`方法：

```irb
>> fruits_inventory = {apple: 6, banana: 2, cherry: 3}
>> x, y, z = fruits_inventory.keys
>> x
=> :apple
```

如果你想解包值，可以使用`values`方法：

```irb
>> fruits_inventory = {apple: 6, banana: 2, cherry: 3}
>> x, y, z = fruits_inventory.values
>> x
=> 6
```

## 组合

组合是指把多个值归拢成一个**数组**并赋给某个变量的能力。当你想要_解构_值、做点修改，再把结果_组合_回一个变量时，它很有用。它还让对 2 个或更多**数组**/**哈希**的合并成为可能。

### 用展开运算符（`*`）组合数组

组合**数组**可以用展开运算符（`*`）来完成。它会把所有值打包进一个**数组**。

```irb
>> fruits = ["apple", "banana", "cherry"]
>> more_fruits = ["orange", "kiwi", "melon", "mango"]

# fruits and more_fruits are unpacked and then their elements are packed into combined_fruits
>> combined_fruits = *fruits, *more_fruits

>> combined_fruits
=> ["apple", "banana", "cherry", "orange", "kiwi", "melon", "mango"]
```

### 用双展开运算符（`**`）组合哈希

组合哈希要用双展开运算符（`**`）来完成。它会把一个哈希中所有的**键**/**值**对打包进另一个哈希，或者把两个哈希合并在一起。

```irb
>> fruits_inventory = {apple: 6, banana: 2, cherry: 3}
>> more_fruits_inventory = {orange: 4, kiwi: 1, melon: 2, mango: 3}

# fruits_inventory and more_fruits_inventory are unpacked into key-values pairs and combined.
>> combined_fruits_inventory = {**fruits_inventory, **more_fruits_inventory}

# then the pairs are packed into combined_fruits_inventory
>> combined_fruits_inventory
=> {:apple=>6, :banana=>2, :cherry=>3, :orange=>4, :kiwi=>1, :melon=>2, :mango=>3}
```

## 展开运算符（`*`）和双展开运算符（`**`）在方法中的用法

### 使用方法形参进行组合

当你要创建一个接受任意数量实参的方法时，可以在方法定义中使用[`*arguments`][arguments]或[`**keyword_arguments`][keyword arguments]。`*arguments`用于打包任意数量的位置（非关键字）实参，`**keyword_arguments`用于打包任意数量的关键字实参。

`*arguments`的用法：

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

`**keyword_arguments`的用法：

```irb
# This method is defined to take any number of keyword arguments

>> def my_method(**keyword_arguments)= keyword_arguments

# Arguments given to the method are packed into a dictionary

>> my_method(a: 1, b: 2, c: 3)
=> {:a => 1, :b => 2, :c => 3}
```

如果所定义的方法没有任何用于关键字实参的形参（`**keyword_arguments`或`<key_word>: <value>`），那么关键字实参会被打包成一个哈希，并赋给最后一个形参。

```irb
>> def my_method(a)= a

>> my_method(a: 1, b: 2, c: 3)
=> {:a => 1, :b => 2, :c => 3}
```

`*arguments`和`**keyword_arguments`也可以相互搭配使用：

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

你也可以在`*arguments`的前后写实参，以便指定特定的位置实参。这和数组的解构方式一样。

~~~~exercism/caution
实参必须按特定的顺序组织：

`def my_method(<positional_arguments>, *arguments, <positional_arguments>, <keyword_arguments>, **keyword_arguments)`

如果不按这个顺序来，就会出错。
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

你可以在`*arguments`前后写位置实参：

```irb
>> def my_method(a, *middle, b)= middle

>> my_method(1, 2, 3, 4, 5)
=> [2, 3, 4]
```

你也可以把位置实参、\*arguments、关键字实参和\*\*keyword_arguments 组合到一起：

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

按错误的顺序写实参会导致错误：

```ruby
def my_method(a:, **keyword_arguments, first, *arguments, last)
  arguments
end

my_method(1, 2, 3, 4, a: 5)

syntax error, unexpected local variable or method, expecting & or '&'
... my_method(a:, **keyword_arguments, first, *arguments, last)
```

### 在方法调用中解构

你可以用展开运算符（`*`）把一个**数组**形式的实参解包到方法调用中：

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

你也可以用双展开运算符（`**`）把一个**哈希**形式的实参解包到方法调用中：

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
