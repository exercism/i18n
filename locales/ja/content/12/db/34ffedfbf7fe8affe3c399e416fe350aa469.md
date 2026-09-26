# 説明

この演習では、シンプルな整数電卓のエラー処理を実装します。話を簡単にするために、足し算・掛け算・割り算を計算するメソッドはすでに用意されています。

目標は、引数として`16`、`51`、`+`が渡されたときに、`16 + 51 = 67`というパターンの文字列を返す、動く電卓を作ることです。

```csharp
SimpleCalculator.Calculate(16, 51, "+"); // => returns "16 + 51 = 67"

SimpleCalculator.Calculate(32, 6, "*"); // => returns "32 * 6 = 192"

SimpleCalculator.Calculate(512, 4, "/"); // => returns "512 / 4 = 128"
```

## 1. 電卓の演算を実装する

このタスクで実装する中心となるメソッドは、（静的）`SimpleCalculator.Calculate()`メソッドです。これは3つの引数を取ります。最初の2つの引数は、演算の対象となる整数です。3つ目の引数は文字列型で、この演習では次の演算を実装する必要があります。

- `+`という文字列を使った足し算
- `*`という文字列を使った掛け算
- `/`という文字列を使った割り算

## 2. 不正な演算を処理する

それ以外の演算記号では、`ArgumentOutOfRangeException`例外をスローする必要があります。演算の引数が空文字列の場合、メソッドは`ArgumentException`例外をスローする必要があります。演算の引数として`null`が渡された場合、メソッドは`ArgumentNullException`例外をスローする必要があります。

```csharp
SimpleCalculator.Calculate(100, 10, "-"); // => throws ArgumentOutOfRangeException

SimpleCalculator.Calculate(8, 2, ""); // => throws ArgumentException

SimpleCalculator.Calculate(58, 6, null); // => throws ArgumentNullException
```

## 3. ゼロで割ったときのエラーを処理する

`0`で割ろうとしたとき、電卓は`Division by zero is not allowed.`という内容の文字列を返す必要があります。それ以外の例外は、`SimpleCalculator.Calculate()`メソッドで処理してはいけません。

```csharp
SimpleCalculator.Calculate(512, 0, "/"); // => returns "Division by zero is not allowed."
```
