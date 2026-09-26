# 元组

[元组][tuple]是一个不可变的、有限的、有序的元素列表。
元组要求每个位置都有固定的类型。
这反过来意味着编译器知道每个位置是什么类型。
元组中各个位置使用的类型可以不同，但这些类型必须在编译期已知。

## 创建元组

取决于元组各值的类型能否在编译时被推断，元组可以用不同的方式创建。
如果这些值在编译期已知，就可以用元组字面量语法创建元组，否则需要显式声明。
同样重要的是，值的类型必须与元组中指定的类型匹配，值的数量也必须与指定的类型数量一致。
下面是通过元组字面量语法定义的例子：

```crystal
tuple = {1, "foo", 'c'} # Tuple(Int32, String, Char)
```

也可以用 `Tuple` 类创建元组。

```crystal
tuple = Tuple(Int32, String, Char).new(1, "foo", 'c')
```

另一种方式是显式指定赋给该元组的变量的类型。

```crystal
tuple : Tuple(Int32, String, Char) = {1, "foo", 'c'}
```

显式指定元组的类型会很有用，因为这样可以定义某个位置应存放联合类型。
也就是说，一个位置可以存放多种类型。

```crystal
tuple : Tuple(Int32 | String, String, Char) = {1, "foo", 'c'}
```

## 转换

### 从数组创建元组

你可以使用 `Tuple` 类的 `from` 方法从数组创建元组。
这要求指定元组的类型。

```crystal
array = [1, "foo", 'c']
tuple = Tuple(Int32, String, Char).from(array)
```

### 转换为数组

你可以使用 `to_a` 方法把元组转换为数组。
得到的数组的元素类型，是元组中每个字段类型的联合。

```crystal
tuple = {1, "foo", 'c'}
array = tuple.to_a
array # => [1, "foo", 'c']
```

## 访问元素

与数组一样，元组的下标从零开始，也就是说第一个元素位于下标 0。
不过，与数组不同的是，每个元素的类型都是固定的，并在编译期已知，因此在对元组做索引时，元素的类型是随位置而定的。
要访问元组中的元素，可以使用 `[]` 运算符。

```crystal
array = [1, "foo", 'c']
array[0]         # => 1
typeof(array[0]) # => Int32 | String | Char

tuple = {1, "foo", 'c'}
tuple[0]         # => 1
typeof(tuple[0]) # => Int32
```

从数组访问元素时的另一个区别在于：如果指定了下标，编译器会检查该下标是否在元组的边界之内。
也就是说，你会得到编译期错误，而不是运行时错误。

```crystal
tuple = {1, "foo", 'c'}
tuple[3]
# => Error: index out of bounds for Tuple(Int32, String, Char) (3 not in -3..2)
```

不过，如果下标存储在变量中，编译器就无法在编译期检查该下标是否在元组的边界之内，而会在运行时给出错误。

## 子元组

你可以通过带范围的 `[]` 运算符获取元组的子元组。
返回的是一个新元组，包含指定范围内的元素。
范围必须在编译期给出，否则编译器无法知道子元组中各元素的类型。
这意味着范围必须是范围字面量，而不能赋值给变量。

```crystal
tuple = {1, "foo", 'c'}
subtuple = tuple[0..1] # Tuple(Int32, String)

i = 0..1
tuple[i]
# Error: Tuple#[](Range) can only be called with range literals known at compile-time
```

## 何时使用元组

当你想要把数量固定的一组值组合在一起，并且这些值的类型在编译期已知时，元组很有用。
这是因为元组占用的内存更少，而且由于元组不可变，比数组更快。
另一个使用场景是从方法中返回多个值。
如果这些值的类型不同，这一点尤其有用，因为元组中的每个位置都可以有不同的类型。

当需要一种能增大或缩小、或经常需要修改的数据结构时，就不应该使用元组。

[tuple]: https://crystal-lang.org/reference/syntax_and_semantics/literals/tuple.html
