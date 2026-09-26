# はじめに

[配列][array]は、Swiftの3つの主要なコレクション型の1つです。
配列は、要素を順番に並べたリストです。
配列にはどのような型の要素でも格納できますが、1つの配列の中の要素はすべて同じ型でなければなりません。
配列は、変数に代入すると可変になり、配列を作成したあとで要素を追加・削除・変更できます。
定数に代入すると不変になり、中身を変更することはできません。

配列リテラルは、角括弧（`[...]`）で囲んだ、カンマ区切りの要素のリストとして書きます。
Swiftは、リテラルの中の要素から配列の型を推論できます。

```swift
let evenInts = [2, 4, 6, 8, 10, 12]
var oddInts = [1, 3, 5, 7, 9, 11, 13]
let greetings = ["Hello!", "Hi!", "¡Hola!"]
```

型を明示的に指定することもできます。
配列の型は2通りの方法で書けます。`Array<T>`か、省略記法の`[T]`です。ここで`T`は、配列に格納される値の型を表します。

```swift
let evenInts: Array<Int> = [2, 4, 6, 8, 10, 12]
var oddInts: [Int] = [1, 3, 5, 7, 9, 11, 13]
let greetings: [String] = ["Hello!", "Hi!", "¡Hola!"]
```

## 配列のサイズ

[`count`][count]プロパティを使うと、配列の要素数を調べられます。

```swift
evenInts.count
// returns 6
```

## 空の配列

空の配列を作るには、型を指定する必要があります。
これには、配列のイニシャライザ構文か、明示的な型注釈を使います。

```swift
let emptyArray = [Int]()
let emptyArray2 = Array<Int>()
let emptyArray3: [Int] = []
```

## 多次元配列

配列を入れ子にすると、多次元配列を作れます。
入れ子になった配列の型を明示的に指定するときは、`[[Int]]`や`Array<Array<Int>>`のように、要素の型を入れ子の角括弧で囲みます。

```swift
let multiDimArray = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
let multiDimArray2: [[Int]] = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
```

## 配列の末尾に追加する

[`append(_:)`][append]メソッドを使うと、可変の配列の末尾に要素を追加できます。

```swift
var oddInts = [1, 3, 5, 7, 9, 11, 13]
oddInts.append(15)
// oddInts is now [1, 3, 5, 7, 9, 11, 13, 15]
```

## 配列に挿入する

[`insert(_:at:)`][insert]メソッドを使うと、指定したインデックスに要素を挿入できます。
このメソッドは2つの引数を取ります。挿入する要素と、挿入する位置のインデックスです。

```swift
var oddInts = [1, 3, 5, 7, 9, 11, 13]
oddInts.insert(0, at: 0)
// oddInts is now [0, 1, 3, 5, 7, 9, 11, 13]
```

## 配列を足し合わせる

`+`演算子を使うと、2つの配列を1つの配列にまとめられます。
`+`演算子は新しい配列を作って返します。元の配列は変更しません。

```swift
var oddInts = [1, 3, 5, 7, 9, 11, 13]
let combined = oddInts + [15, 17, 19]
// combined is [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]

print(oddInts)
// prints [1, 3, 5, 7, 9, 11, 13]
```

## 配列の要素にアクセスする

配列名のあとに角括弧（`[]`）を書き、その中にインデックスを入れると、配列の個々の要素にアクセスできます。
配列のインデックスは0から始まる`Int`値で、最初の要素は`0`です。
有効な範囲外のインデックスにアクセスすると、実行時エラーが発生し、プログラムがクラッシュします。

```swift
let evenInts = [2, 4, 6, 8, 10, 12]
let oddInts = [1, 3, 5, 7, 9, 11, 13]

evenInts[2]
// returns 6

oddInts[7]
// Fatal error: Index out of range
```

## 配列の要素を変更する

可変の配列では、特定のインデックスに新しい値を代入すると、その要素を変更できます。
要素を読み取るときと同様、有効な範囲外のインデックスを使うと実行時エラーが発生します。

```swift
var evenInts = [2, 4, 6, 8, 10, 12]

evenInts[2] = 0
// evenInts is now [2, 4, 0, 8, 10, 12]
```

## 配列と文字列の相互変換

[`joined(separator:)`][joined]メソッドを使うと、文字列の配列を1つの文字列に連結できます。このメソッドは区切り文字の文字列を取ります。

```swift
let evenInts = ["2", "4", "6", "8", "10", "12"]
let evenIntsString = evenInts.joined(separator: ", ")
// returns "2, 4, 6, 8, 10, 12"
```

[`split(separator:)`][split]メソッドに区切り文字を渡すと、文字列を部分文字列の配列に分割できます。

```swift
let evenIntsString = "2, 4, 6, 8, 10, 12"
let evenInts = evenIntsString.split(separator: ",")
// returns ["2", " 4", " 6", " 8", " 10", " 12"]
```

## 配列から要素を削除する

[`remove(at:)`][remove]メソッドを使うと、指定したインデックスの要素を削除できます。
インデックスは配列の有効な範囲内でなければなりません。そうでない場合は実行時エラーが発生します。

```swift
var oddInts = [1, 3, 5, 7, 9, 11, 13]
oddInts.remove(at: 3)
// oddInts is now [1, 3, 5, 9, 11, 13]
```

配列の最後の要素を削除するには、[`removeLast()`][removeLast]メソッドを使います。
空の配列に対して`removeLast()`を呼び出すと、実行時エラーが発生します。

```swift
var oddInts = [1, 3, 5, 7, 9, 11, 13]
oddInts.removeLast()
// oddInts is now [1, 3, 5, 7, 9, 11]
```

[array]: https://developer.apple.com/documentation/swift/array
[count]: https://developer.apple.com/documentation/swift/array/count
[insert]: https://developer.apple.com/documentation/swift/array/insert(_:at:)-3erb3
[remove]: https://developer.apple.com/documentation/swift/array/remove(at:)-1p2pj
[removeLast]: https://developer.apple.com/documentation/swift/array/removelast()
[append]: https://developer.apple.com/documentation/swift/array/append(_:)-1ytnt
[joined]: https://developer.apple.com/documentation/swift/array/joined(separator:)-5do1g
[split]: https://developer.apple.com/documentation/swift/string/2894564-split
