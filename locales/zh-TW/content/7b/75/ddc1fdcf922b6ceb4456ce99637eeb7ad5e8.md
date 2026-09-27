# 元組

[元組][tuple]是有限且有序的元素列表，而且不可變。
元組要求每個位置都必須有固定的型別。
這也意味著編譯器知道每個位置上是什麼型別。
元組中每個位置使用的型別可以不同，但這些型別必須在編譯期就已知。

## 建立元組

依照元組的值型別是否能在編譯時解析，元組可以用不同的方式建立。
如果這些值在編譯期就已知，就能用元組字面值語法建立元組；否則就必須明確宣告。
同樣重要的是，值的型別要與元組中指定的型別相符，而且值的數量也要與指定的型別數量一致。
以下是透過元組字面值語法定義的範例：

```crystal
tuple = {1, "foo", 'c'} # Tuple(Int32, String, Char)
```

也可以用`Tuple`類別來建立元組。

```crystal
tuple = Tuple(Int32, String, Char).new(1, "foo", 'c')
```

或者，你也可以明確指定賦予該元組的變數型別。

```crystal
tuple : Tuple(Int32, String, Char) = {1, "foo", 'c'}
```

明確指定元組的型別很有用，因為這樣就能定義某個位置應該存放聯合型別。
也就是說，一個位置可以存放多種型別。

```crystal
tuple : Tuple(Int32 | String, String, Char) = {1, "foo", 'c'}
```

## 轉換

### 從陣列建立元組

你可以使用`Tuple`類別的`from`方法，從陣列建立元組。
這需要明確指定元組的型別。

```crystal
array = [1, "foo", 'c']
tuple = Tuple(Int32, String, Char).from(array)
```

### 轉換成陣列

你可以使用`to_a`方法把元組轉換成陣列。
產生的陣列元素型別，是元組中每個欄位型別的聯集。

```crystal
tuple = {1, "foo", 'c'}
array = tuple.to_a
array # => [1, "foo", 'c']
```

## 存取元素

和陣列一樣，元組的索引從 0 開始，也就是第一個元素的索引是 0。
不過，和陣列不同的是，每個元素的型別都是固定且在編譯期已知的，因此對元組取索引時，元素的型別會依位置而不同。
要存取元組中的元素，可以使用`[]`運算子。

```crystal
array = [1, "foo", 'c']
array[0]         # => 1
typeof(array[0]) # => Int32 | String | Char

tuple = {1, "foo", 'c'}
tuple[0]         # => 1
typeof(tuple[0]) # => Int32
```

存取陣列元素時的另一個差異是：如果索引是明確指定的，編譯器會檢查該索引是否落在元組的邊界內。
也就是說，你會得到編譯期錯誤，而不是執行期錯誤。

```crystal
tuple = {1, "foo", 'c'}
tuple[3]
# => Error: index out of bounds for Tuple(Int32, String, Char) (3 not in -3..2)
```

不過，如果索引存放在變數裡，編譯器就無法在編譯期檢查索引是否落在元組的邊界內，而會改為在執行期產生錯誤。

## 子元組

你可以搭配範圍使用`[]`運算子，取得元組的子元組。
回傳的是一個新元組，內含指定範圍中的元素。
範圍必須在編譯期提供，否則編譯器無法得知子元組中各元素的型別。
這表示範圍必須是範圍字面值，不能先指定給變數。

```crystal
tuple = {1, "foo", 'c'}
subtuple = tuple[0..1] # Tuple(Int32, String)

i = 0..1
tuple[i]
# Error: Tuple#[](Range) can only be called with range literals known at compile-time
```

## 何時該使用元組

當你想把固定數量的值群組在一起，而且這些值的型別在編譯期就已知時，元組就很有用。
這是因為元組不可變，所以佔用的記憶體比陣列少，速度也比陣列快。
另一個使用情境是從方法回傳多個值。
如果這些值的型別各不相同，這特別有幫助，因為元組中每個位置可以有不同型別。

如果需要的是大小能成長或縮減、或經常需要修改的資料結構，就不應該使用元組。

[tuple]: https://crystal-lang.org/reference/syntax_and_semantics/literals/tuple.html
