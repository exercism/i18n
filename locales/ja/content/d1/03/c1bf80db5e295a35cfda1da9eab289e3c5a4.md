# はじめに
## `switch`文

[`switch`文][switch]を使うと、1つの値を複数の候補と比較できます。
複数の`else-if`文を使うよりも、簡潔にコードを書けます。
`switch`文は`switch`キーワードから始まり、その後に比較する値を書きます。
次に、`case`キーワードの後に比較対象の値を書いて、各ケースを定義します。
どのケースにも一致しないときのデフォルトのケースは、`default`キーワードで定義します。
`else-if`文と同じように、`switch`文は最初に一致したケースに対応するコードブロックだけを実行します。

```swift
switch value {
case 1:
    print("One")
case 2:
    print("Two")
default:
    print("Other")
}
```

次の例を見てみましょう。

```swift
if str == "apple" {
    print("Let's bake an apple crumble")
} else if str == "lemon" {
    print("Let's bake a lemon meringue pie!")
} else if str == "peach" {
    print("Let's bake a peach pie!")
} else {
    print("Let's buy ice cream.")
}
```

これは、次のように書き換えられます。

```swift
switch str {
case "apple":
    print("Let's bake an apple crumble")
case "lemon":
    print("Let's bake a lemon meringue pie!")
case "peach":
    print("Let's bake a peach pie!")
default:
    print("Let's buy ice cream.")
}
```

## `while`ループ

[`while`ループ][while-loops]は、ある条件が真である間、コードを実行し続ける制御フローの文です。
Swiftには、`while`ループと`repeat-while`ループの2種類があります。
`while`ループでは、ループ本体を実行する前に条件が評価されます。条件が偽なら、ループ本体は一度も実行されません。
Swiftの`while`ループは、次のような構造になっています。

```swift
while <#condition#> {
  <#code#>
}
```

このループは`count`が0より大きい間実行され、その結果、2、1、"Liftoff!"と出力します。

```swift
var count = 2
while count > 0 {
  print("\(count)…")
  count -= 1
}
print("Liftoff!")

// prints:
// 2…
// 1…
// Liftoff!
```

[`repeat-while`ループ][while-loops]は`while`ループに似ていますが、条件はループ本体を実行した後に評価されます。
つまり、条件が偽であっても、ループ本体は必ず少なくとも1回は実行されます。
Swiftの`repeat-while`ループは、次のような構造になっています。

```swift
repeat {
  <#code#>
} while <#condition#>
```

この例では条件が偽なので、ループは1回だけ実行されます。
`repeat-while`ループなので、条件が評価される前にループ本体が1回実行されます。

```swift
var count = 2
repeat {
  print("\(count)…")
} while count < 0
print("Liftoff!")
```

## 制御転送

Swiftには、ループや`switch`文の実行フローを変えるための制御転送文があります。
`return`に加えて、Swiftには`continue`、`break`、ループラベル、`fallthrough`があります。

### `continue`

`continue`文は、現在の繰り返しの実行をやめて、すぐに次の繰り返しを始めるようループに指示します。
`while`ループや`repeat-while`ループでは、条件の判定へ直接ジャンプします。
`for-in`ループでは、シーケンスの次の要素へ進みます。

```swift
var count = 1
while count < 6 {
    count += 1
    if count == 4 {
        continue
    }
    print(count)
}

// Prints:
// 2
// 3
// 5
// 6
```

### `break`

`break`文は、ループ全体または`switch`文をすぐに終了します。
実行は、ループまたは`switch`の次の行から再開されます。

```swift
for fruit in ["banana", "grapes", "apple", "strawberry", "kiwi", "lemon"] {
    if !fruit.count.isMultiple(of: 2) {
        break
    }
    print(fruit)
}

// Prints:
// banana
// grapes
```

### ラベル付き文

入れ子になったループでは、最も内側のループではなく外側のループに対して`break`や`continue`を効かせたいことがあります。
ループの前に名前とコロン（`labelName:`）を付けると、そのループにラベルを付けられます。
付けたラベルは、`break`や`continue`に渡せます。

```swift
outerLoop: for fruit in ["banana", "grapes", "apple", "strawberry", "kiwi", "lemon"] {
    print("\n--- \(fruit) ---")
    for letter in fruit {
        guard letter != "n" else {
            break outerLoop
        }
        print(letter)
    }
}

// Prints:
// --- banana ---
// b
// a
```

[control-transfer]: https://docs.swift.org/swift-book/documentation/the-swift-programming-language/controlflow/#Control-Transfer-Statements
[fallthrough]: https://docs.swift.org/swift-book/documentation/the-swift-programming-language/controlflow/#Fallthrough
[while-loops]: https://docs.swift.org/swift-book/documentation/the-swift-programming-language/controlflow/#While-Loops
[repeat-loops]: https://docs.swift.org/swift-book/documentation/the-swift-programming-language/controlflow/#Repeat-While
[switch]: https://docs.swift.org/swift-book/documentation/the-swift-programming-language/controlflow/#Switch
