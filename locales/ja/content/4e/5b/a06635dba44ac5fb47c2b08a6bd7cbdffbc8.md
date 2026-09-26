# はじめに

配列を扱っていると、配列の各要素に対してコードを実行したいことがあります。これを、配列の繰り返し（ループ）と呼びます。

ここでは、その過程で配列を変更したくない場合を見ていきます。配列を変換したい場合は、代わりに[配列の変換の概念][concept-array-transformations]を参照してください。

## `for`ループ

配列を繰り返し処理する最も基本的な方法は、`for`ループを使うことです。詳しくは、[`for`ループの概念][concept-for-loops]を参照してください。

```javascript
const numbers = [6.0221515, 10, 23];

for (let i = 0; i < numbers.length; i++) {
  console.log(numbers[i]);
}
// => 6.0221515
// => 10
// => 23
```

## `for...of`ループ

各繰り返しで値そのものを直接扱いたいときや、インデックスがまったく必要ないときは、`for...of`ループを使えます。

`for...of`は、上に示した基本的な`for`ループと同じように動きますが、ループ内で変数として_インデックス_を扱う代わりに、_値_を直接受け取ります。

```javascript
const numbers = [6.0221515, 10, 23];

// Because re-assigning number inside the loop will be very
// confusing, disallowing that via const is preferable.
for (const number of numbers) {
  console.log(number);
}
// => 6.0221515
// => 10
// => 23
```

通常の`for`ループと同じように、`continue`を使うと現在の繰り返しを止められ、`break`を使うとループの実行を完全に止められます。

## `forEach`メソッド

すべての配列には、配列の要素を繰り返し処理するために使える`forEach`メソッドがあります。

`forEach`は、入力として[コールバック][concept-callbacks]を受け取ります。コールバック関数は、配列の各要素に対して一度ずつ呼び出されます。コールバックには、現在の要素、そのインデックス、配列全体が引数として渡されます。多くの場合、使うのは現在の要素かインデックスだけです。

```javascript
const numbers = [6.0221515, 10, 23];

numbers.forEach((number, index) => console.log(number, index));
// => 6.0221515 0
// => 10 1
// => 23 2
```

`forEach`ループが始まってしまうと、繰り返しを途中で止める方法はありません。この場面では、`break`と`continue`という文は存在しません。

[concept-array-transformations]: /tracks/javascript/concepts/array-transformations
[concept-for-loops]: /tracks/javascript/concepts/for-loops
[concept-callbacks]: /tracks/javascript/concepts/callbacks
