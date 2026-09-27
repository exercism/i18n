# 解構與多重賦值

解構是指從集合（例如 `Array` 或 `Hash`）中取出元素的動作。解構後的值接著可以在同一個敘述中指定給變數。

[多重賦值][multiple assignment]是指能在同一個敘述中，把解構後的值指定給多個變數。這能讓程式碼更簡潔、更好讀，做法是用逗號分隔要指定的變數，例如 `first, second, third = [1, 2, 3]`。

splat 運算子（`*`）和雙 splat 運算子（`**`）經常用於解構的情境中。

~~~~exercism/caution
不要把 `*<variable_name>` 和 `**<variable_name>` 與 `*` 和 `**` 搞混了。`*` 和 `**` 分別用於乘法和次方，而 `*<variable_name>` 和 `**<variable_name>` 則是組合與解構運算子。
~~~~

## 多重賦值

多重賦值讓你能在一行裡指定多個變數。要用逗號 `,` 分隔值：

```irb
>> a, b = 1, 2
=> [1, 2]
>> a
=> 1
```

多重賦值不受限於單一資料型態：

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

多重賦值可以用來交換**陣列**中的元素。這種做法在[排序演算法][sorting algorithms]中相當常見。例如：

```irb
>> numbers = [1, 2]
=> [1, 2]
>> numbers[0], numbers[1] = numbers[1], numbers[0]
=> [2, 1]
>> numbers
=> [2, 1]
```

~~~~exercism/note
這也稱為「Parallel Assignment」，可以用來避免使用暫時變數。
~~~~

如果變數比值多，多出來的變數會被指定為 `nil`：

```irb
>> a, b, c = 1, 2
=> [1, 2]
>> b
=> 2
>> c
=> nil
```

## 解構

在 Ruby 中，可以[把**陣列**／**雜湊**的元素解構][decompose]成不同的變數。由於值在**陣列**中是以索引順序出現的，它們會以相同的順序被拆解進變數：

```irb
>> fruits = ["apple", "banana", "cherry"]
>> x, y, z = fruits
>> x
=> "apple"
```

如果有不需要的值，可以用 `_` 表示「已收集但未使用」：

```irb
>> fruits = ["apple", "banana", "cherry"]
>> _, _, z = fruits
>> z
=> "cherry"
```

### 深層解構

從**陣列**內部的**陣列**（_也就是巢狀陣列_）解構並指定值，運作方式和淺層解構相同，但需要用[分隔式解構運算式（`()`）][delimited decomposition expression]來釐清值的脈絡或位置：

```irb
>> fruits_vegetables = [["apple", "banana"], ["carrot", "potato"]]
>> (a, b), (c, d) = fruits_vegetables
>> a
=> "apple"
>> d
=> "potato"
```

你也可以只深層拆解巢狀**陣列**中的一部分：

```irb
>> fruits_vegetables = [["apple", "banana"], ["carrot", "potato"]]
>> a, (c, d) = fruits_vegetables
>> a
=> ["apple", "banana"]
>> c
=> "carrot"
```

如果解構時變數的位置不正確，或值的數量不正確，就會得到**語法錯誤**：

```ruby
fruits_vegetables = [["apple", "banana"], ["carrot", "potato"]]

(a, b), (d) = fruits_vegetables
# syntax error, unexpected '=', expecting '.' or &. or :: or '['

((a, b), (d)) = fruits_vegetables
# syntax error, unexpected ')', expecting '.' or &. or :: or '['
```

在這裡實驗一下，你會發現決定結果的是第一個模式，而不是右邊可用的值。語法錯誤和資料結構本身無關。

### 用單一 splat 運算子（`*`）解構陣列

[解構**陣列**][decompose]時，可以用 splat 運算子（`*`）捕捉「剩下的」值。這比切分**陣列**（_在某些情況下比較不好讀_）更清楚。例如，我們可以取出第一個元素，然後把剩下的值指定到一個不含第一個元素的新**陣列**：

```irb
>> fruits = ["apple", "banana", "cherry", "orange", "kiwi", "melon", "mango"]
>> x, *last = fruits
>> x
=> "apple"
>> last
=> ["banana", "cherry", "orange", "kiwi", "melon", "mango"]
```

我們也可以取出**陣列**開頭和結尾的值，同時把中間所有的值群組起來：

```irb
>> fruits = ["apple", "banana", "cherry", "orange", "kiwi", "melon", "mango"]
>> x, *middle, y, z = fruits
>> y
=> "melon"
>> middle
=> ["banana", "cherry", "orange", "kiwi"]
```

我們也可以在深層解構中使用 `*`：

```irb
>> fruits_vegetables = [["apple", "banana", "melon"], ["carrot", "potato", "tomato"]]
>> (a, *rest), b = fruits_vegetables
>> a
=> "apple"
>> rest
=> ["banana", "melon"]
```

### 解構 `Hash`

解構**雜湊**和解放構**陣列**有點不同。要能拆解**雜湊**，你得先把它轉成**陣列**。否則就無法解構：

```irb
>> fruits_inventory = {apple: 6, banana: 2, cherry: 3}
>> x, y, z = fruits_inventory
>> x
=> {:apple=>6, :banana=>2, :cherry=>3}
>> y
=> nil
```

要把 `Hash` 強制轉成**陣列**，可以用 `to_a` 方法：

```irb
>> fruits_inventory = {apple: 6, banana: 2, cherry: 3}
>> fruits_inventory.to_a
=> [[:apple, 6], [:banana, 2], [:cherry, 3]]
>> x, y, z = fruits_inventory.to_a
>> x
=> [:apple, 6]
```

如果你想拆解鍵，可以用 `keys` 方法：

```irb
>> fruits_inventory = {apple: 6, banana: 2, cherry: 3}
>> x, y, z = fruits_inventory.keys
>> x
=> :apple
```

如果你想拆解值，可以用 `values` 方法：

```irb
>> fruits_inventory = {apple: 6, banana: 2, cherry: 3}
>> x, y, z = fruits_inventory.values
>> x
=> 6
```

## 組合

組合是指把多個值群組成一個**陣列**，再指定給變數。當你想要_解構_值、做些修改，然後再把結果_組合_回一個變數時，這就很有用。它也能讓你對 2 個以上的**陣列**／**雜湊**進行合併。

### 用 splat 運算子（`*`）組合陣列

組合**陣列**可以用 splat 運算子（`*`）來完成。這會把所有值打包成一個**陣列**。

```irb
>> fruits = ["apple", "banana", "cherry"]
>> more_fruits = ["orange", "kiwi", "melon", "mango"]

# fruits and more_fruits are unpacked and then their elements are packed into combined_fruits
>> combined_fruits = *fruits, *more_fruits

>> combined_fruits
=> ["apple", "banana", "cherry", "orange", "kiwi", "melon", "mango"]
```

### 用雙 splat 運算子（`**`）組合雜湊

組合雜湊是用雙 splat 運算子（`**`）來完成。這會把一個雜湊中所有的**鍵**／**值**配對打包進另一個雜湊，或把兩個雜湊合併在一起。

```irb
>> fruits_inventory = {apple: 6, banana: 2, cherry: 3}
>> more_fruits_inventory = {orange: 4, kiwi: 1, melon: 2, mango: 3}

# fruits_inventory and more_fruits_inventory are unpacked into key-values pairs and combined.
>> combined_fruits_inventory = {**fruits_inventory, **more_fruits_inventory}

# then the pairs are packed into combined_fruits_inventory
>> combined_fruits_inventory
=> {:apple=>6, :banana=>2, :cherry=>3, :orange=>4, :kiwi=>1, :melon=>2, :mango=>3}
```

## splat 運算子（`*`）與雙 splat 運算子（`**`）搭配方法的使用方式

### 搭配方法參數的組合

當你建立一個接受任意數量引數的方法時，可以在方法定義中使用 [`*arguments`][arguments] 或 [`**keyword_arguments`][keyword arguments]。`*arguments` 用來打包任意數量的位置（非關鍵字）引數，而 `**keyword_arguments` 用來打包任意數量的關鍵字引數。

`*arguments` 的用法：

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

`**keyword_arguments` 的用法：

```irb
# This method is defined to take any number of keyword arguments

>> def my_method(**keyword_arguments)= keyword_arguments

# Arguments given to the method are packed into a dictionary

>> my_method(a: 1, b: 2, c: 3)
=> {:a => 1, :b => 2, :c => 3}
```

如果定義的方法沒有任何為關鍵字引數定義的參數（`**keyword_arguments` 或 `<key_word>: <value>`），那麼關鍵字引數會被打包成一個雜湊，並指定給最後一個參數。

```irb
>> def my_method(a)= a

>> my_method(a: 1, b: 2, c: 3)
=> {:a => 1, :b => 2, :c => 3}
```

`*arguments` 和 `**keyword_arguments` 也可以互相搭配使用：

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

你也可以在 `*arguments` 前後撰寫引數，以允許特定的位置引數。這和解放構陣列的運作方式相同。

~~~~exercism/caution
引數必須按照特定的順序排列：

`def my_method(<positional_arguments>, *arguments, <positional_arguments>, <keyword_arguments>, **keyword_arguments)`

如果不遵守這個順序，就會發生錯誤。
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

你可以在 `*arguments` 前後撰寫位置引數：

```irb
>> def my_method(a, *middle, b)= middle

>> my_method(1, 2, 3, 4, 5)
=> [2, 3, 4]
```

你也可以組合位置引數、\*arguments、關鍵字引數和 \*\*keyword_arguments：

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

以不正確的順序撰寫引數會導致錯誤：

```ruby
def my_method(a:, **keyword_arguments, first, *arguments, last)
  arguments
end

my_method(1, 2, 3, 4, a: 5)

syntax error, unexpected local variable or method, expecting & or '&'
... my_method(a:, **keyword_arguments, first, *arguments, last)
```

### 解構進方法呼叫

你可以用 splat 運算子（`*`）把一組引數的**陣列**拆解進方法呼叫：

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

你也可以用雙 splat 運算子（`**`）把一組引數的**雜湊**拆解進方法呼叫：

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
