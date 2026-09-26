# はじめに

JavaScriptには、いくつでも要素を扱えるようにする組み込みの`...`演算子があります。使われる場面によって、_残余演算子_ または _スプレッド演算子_ と呼ばれます。

## 残余演算子

### 残余要素

代入の左辺に`...`が現れるとき、この3つのドットは`rest`演算子と呼ばれます。3つのドットと変数名を合わせたものは、残余要素と呼ばれます。残余要素は0個以上の値を集めて、1つの配列にまとめます。

```javascript
const [a, b, ...everythingElse] = [0, 1, 1, 2, 3, 5, 8];
a;
// => 0
b;
// => 1
everythingElse;
// => [1, 2, 3, 5, 8]
```

JavaScriptでは、他の言語とは違って、`rest`要素の末尾にカンマを置くことはできません。分割代入では、_必ず_最後の要素でなければなりません。次の例は`SyntaxError`をスローします。

```javascript
const [...items, last] = [2, 4, 8, 16]
```

### 残余プロパティ

配列と同じように、`rest`演算子を使って1つ以上のオブジェクトのプロパティを集め、1つのオブジェクトにまとめることもできます。

```javascript
const { street, ...address } = {
  street: 'Platz der Republik 1',
  postalCode: '11011',
  city: 'Berlin',
};
street;
// => 'Platz der Republik 1'
address;
// => {postalCode: '11011', city: 'Berlin'}
```

## 残余引数

関数定義で、最後の引数のとなりに`...`が現れると、その仮引数は _残余引数_ と呼ばれます。これを使うと、関数はいくつでも引数を配列として受け取れます。

```javascript
function concat(...strings) {
  return strings.join(' ');
}
concat('one');
// => 'one'
concat('one', 'two', 'three');
// => 'one two three'
```

## スプレッド

### スプレッド要素

代入の右辺に`...`が現れると、それは`spread`演算子と呼ばれます。配列を要素のリストに展開します。残余要素と違って、配列リテラル式のどこにでも書くことができ、複数使うこともできます。

```javascript
const oneToFive = [1, 2, 3, 4, 5];
const oneToTen = [...oneToFive, 6, 7, 8, 9, 10];
oneToTen;
// => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const woow = ['A', ...oneToFive, 'B', 'C', 'D', 'E', ...oneToFive, 42];
woow;
// =>  ["A", 1, 2, 3, 4, 5, "B", "C", "D", "E", 1, 2, 3, 4, 5, 42]
```

### スプレッドプロパティ

配列と同じように、`spread`演算子を使って、あるオブジェクトのプロパティを別のオブジェクトにコピーすることもできます。

```javascript
let address = {
  postalCode: '11011',
  city: 'Berlin',
};
address = { ...address, country: 'Germany' };
// => {
//   postalCode: '11011',
//   city: 'Berlin',
//   country: 'Germany',
// }
```
