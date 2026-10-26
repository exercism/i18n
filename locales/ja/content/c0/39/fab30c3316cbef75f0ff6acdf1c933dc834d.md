# はじめに

Swiftの`guard`文は、必要な条件が満たされていないときに、関数やループ、メソッドから早い段階で抜けるために使います。たとえば、次のとおりです。

```swift
guard myValue >= 0 else { return 0 }
let root = myValue.squareRoot()
```

上の例では、`guard`は直後に続く真偽値の式を評価します。
条件が`true`であれば、`guard`文に続くコードの処理が続きます。
条件が`false`であれば、`else`ブロック内のコードが実行されます。

`if`文とは異なり、次のような違いがあります。

- `guard`文には`else`節を**必ず**含める必要があります。
- `else`節は、**必ず**制御を移して周囲のスコープから抜けなければなりません（たとえば、`return`、`continue`、`break`を使うか、エラーをスローします）。

`guard`は、前提条件をすっきりと検証するのによく使われます。
たとえば、sinc関数（$\text{sinc}(x) = \frac{\sin(x)}{x}$、ゼロ除算を避けるため$\text{sinc}(0) = 1$）を考えてみましょう。

```swift
func sinc(_ x: Double) -> Double {
    guard x != 0 else { return 1 }
    return sin(x) / x
}

sinc(0)             // returns 1
sinc(Double.pi / 2) // returns 0.6366197723675814
```
