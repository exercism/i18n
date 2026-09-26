# 概要

TypeScriptは、型のための構文を備えたJavaScriptです。つまり、強く型付けされたプログラミング言語であり、オブジェクト指向、命令型、宣言型（たとえば関数型プログラミング）のスタイルをサポートして、どんな規模でもより良いツールを提供します。
いくつかの[プリミティブ][mdn-primitive]があり、それ以外はすべてオブジェクトとみなされます。

JavaScriptはWebページのスクリプト言語として最もよく知られていますが、Node.jsのようにブラウザー以外の多くの環境でも使われています。
この言語は活発に開発が進んでおり、マルチパラダイムという性質から、さまざまなプログラミングスタイルが可能です。

TypeScriptはその上に成り立っていて、こちらも活発に開発されています。
2023年のいくつかのランキングでは、日常的な利用においてJavaScriptよりも人気があります。

[JavaScriptを学ばずにTypeScriptを学ぶことはできない][handbook-js-or-ts]ので、このトラックの内容にはJavaScriptの概念を教えることに焦点を当てたものもあれば、TypeScript固有の機能だけに焦点を当てた概念もあります。

## （再）代入

TypeScriptで名前に値を代入する主な方法はいくつかあります。変数を使うか、定数を使うかです。
Exercismでは、変数は常に[camelCase][wiki-camel-case]で書き、定数は[SCREAMING_SNAKE_CASE][wiki-snake-case]で書きます。
従うべき公式のガイドがあるわけではなく、企業や組織によってさまざまなスタイルガイドがあります。
_変数は好きなように書いて構いません_。
演習で用意されているとおりに書くことの利点は、WebインターフェースやほとんどのIDEで違う色で強調表示されることです。

TypeScriptの変数は、[`const`][mdn-const]、[`let`][mdn-let]、[`var`][mdn-var]のいずれかのキーワードを使って定義できます。

`let`や`var`を使う場合、変数はその存続期間中に異なる値を参照できます。
たとえば`myFirstVariable`は、代入演算子`=`を使って何度も定義し直すことができます。

```typescript
let myFirstVariable = 1
myFirstVariable = 'Some string'
myFirstVariable = new SomeComplexClass()
```

`let`や`var`とは対照的に、`const`で定義した変数は一度しか代入できません。
TypeScriptでは、これを使って定数を定義します。

```typescript
const MY_FIRST_CONSTANT = 10

// Can not be re-assigned.
MY_FIRST_CONSTANT = 20
// => TypeError: Assignment to constant variable.
```

TypeScriptはこれを静的に検出できるので、TypeScriptコンパイラーもエラーを出します。

```typescript
// ^? Cannot assign to 'MY_FIRST_CONSTANT' because it is a constant.(2588)
```

つまり、`TypeError`を検出するためにコードを実行する必要はありません。

<!--prettier-ignore -->
~~~~exercism/note
💡 後の学習用の演習では、_定数_の代入（バインディング）と_定数_の値の違いを掘り下げて説明します。
~~~~

## 型推論

[型推論][handbook-type-inference]の話に深く立ち入るのは避けますが、代入された変数は通常、型注釈がなくても推論された型を持つことを知っておいてください。

```typescript
const MY_FIRST_CONSTANT = 10
// ^? const MY_FIRST_CONSTANT: number
```

この型は、その後コード全体で強制されます。
つまり、次のコードが有効なJavaScriptであるところでも、

```javascript
let myFirstVariable = 1
myFirstVariable = 'Some string'
```

TypeScriptではエラーになります。

```typescript
let myFirstVariable = 1
myFirstVariable = 'Some string'
// ^? Type 'string' is not assignable to type 'number'.(2322)
```

この機能により、型注釈を使わなくても型の安全性が保たれます。

### 定数の代入

`const`キーワードは、変数と定数の_両方_で登場します。
定数の周りでよく出てくるもう一つの概念は、[（不）可変性][wiki-mutability]です。

`const`キーワードが不変にするのは_バインディング_だけです。つまり、`const`変数には一度しか値を代入できません。
TypeScriptでは、[プリミティブ][mdn-primitive]の値だけが不変です。
ただし、[プリミティブ以外][mdn-primitive]の値は依然として変更できます。

```typescript
const MY_MUTABLE_VALUE_CONSTANT = { food: 'apple' }

// This is possible
MY_MUTABLE_VALUE_CONSTANT.food = 'pear'

MY_MUTABLE_VALUE_CONSTANT
// => { food: "pear" }
```

### 定数の値（不変性）

原則として、Exercismやその他の多くの組織、プロジェクトのスタイルガイドでは、`const SCREAMING_SNAKE_CASE`のように見える値は変更しません。
技術的には値を変更することも_できます_が、Exercismでは明確さと期待のすり合わせのために、これは推奨されません。
これを_必ず_強制しなければならない場合は、[`Object.freeze(value)`][mdn-object-freeze]を使います。

可能であれば、TypeScriptの`readonly`キーワード、`as const`、または`Readonly<T>`ジェネリック型を使って、不変性を静的に強制できます。
この話題については、後でもっと詳しく学びます。

```typescript
const MY_VALUE_CONSTANT = Object.freeze({ food: 'apple' })

MY_VALUE_CONSTANT.food = 'pear'
// ^? Cannot assign to 'food' because it is a read-only property.(2540)

MY_VALUE_CONSTANT
// => { food: "apple" }
```

実際の現場では、コードベースのあちこちで`Object.freeze`を見かけることはほとんどありませんが、`SCREAMING_SNAKE_CASE`の値を決して変更しないというルールは良いルールです。多くの場合、リンターのような自動解析で強制されます。

## 関数宣言

TypeScriptでは、機能のまとまりは_関数_にカプセル化されます。関連し合う関数は、たいてい同じファイルにまとめます。
これらの関数は入力を受け取ることができ、`return`キーワードを使って値を_返す_ことができます。
関数は`()`の構文で呼び出します。

```typescript
function add(num1: number, num2: number): number {
  return num1 + num2
}

add(1, 3)
// => 4
```

関数の入力には通常、コロン（`:`）に続けて型を書いて、型を注釈として付けます。
関数の戻り値は、入力リストを閉じたあとに、コロン（`:`）に続けて型を書いて注釈を付けられます。

関数の戻り値に型注釈がない場合、型は推論されます。

```typescript
function add(num1: number, num2: number) {
  return num1 + num2
}

add(1, 3)
// ^? function add(num1: number, num2: number): number
```

ここでは戻り値の型が推論されています。TypeScriptは`number + number`の結果が常に`number`でなければならないことを知っているからです。

<!--prettier-ignore -->
~~~~exercism/note
💡 TypeScriptでは関数を宣言する方法が_たくさん_あります。
これらの他の方法は、`function`キーワードを使う場合とは見た目が異なります。
このトラックではそれらを少しずつ紹介していきますが、すでに知っている場合はどれを使っても構いません。
ほとんどの場合、どちらを使っても良くも悪くもありません。
~~~~

## 型注釈

`add`の関数宣言で示したように、入力には明示的な型注釈`: number`が付いています。
変数宣言、クラスのプロパティ、関数宣言など、あらゆる場所で型注釈が使えます。

明示的な型注釈も、推論された型も、どちらも型チェッカーによって強制されます。

```typescript
add('foo', 3)
// ^? Argument of type 'string' is not assignable to parameter of type 'number'.(2345)
```

TypeScriptが明示的な型注釈を見つけられず、型を推論できない場合、`any`型が割り当てられます。[これは使うべきではありません][handbook-dont-use-any]。
後で、良い代替となる`unknown`型について学びます。

## エクスポートとインポート

`export`と`import`のキーワードは、普通のTypeScriptファイルを[TypeScriptモジュール][mdn-module]に変える強力なツールです。
関数、クラス、変数、定数といった構成要素をコードから選択的に公開できるだけでなく、次のようなさまざまな機能も可能になります。

- [エクスポートとインポートの名前を変更する][mdn-renaming-modules]。これにより名前の衝突を避けられます。
- [動的インポート][mdn-dynamic-imports]。必要になったときにコードを読み込みます。
- [ツリーシェイキング][blog-tree-shaking]。副作用のないモジュールや、_使われていない_モジュールの中身まで取り除いて、最終的なコードのサイズを小さくします。
- [_ライブバインディング_][blog-live-bindings]のエクスポート。元の値が変更されると、インポートしているすべての場所で変更される値をエクスポートできます。

具体的な例が、ExercismのTypeScriptトラックでのテストの仕組みです。
各演習には、たとえば`lasagna.ts`のような実装ファイルが少なくとも1つあり、たとえば`lasagna.test.ts`のようなテストファイルが少なくとも1つあります。
実装ファイルは`export`を使って公開APIを公開し、テストファイルは`import`を使ってそれらにアクセスします。こうして実装の結果をテストできます。

```typescript
// file.js
export const MY_VALUE = 10

export function add(num1, num2) {
  return num1 + num2
}

// file.spec.js
import { MY_VALUE, add } from './file.js'

add(MY_VALUE, 5)
// => 15
```

<!--prettier-ignore -->
~~~~exercism/advanced
TypeScriptコンパイラーは_インポートパスを書き換えない_ので、インポートは`.js`拡張子を使って書く必要があります（トランスパイル後にそうなるからです）。
ただし、パスを書き換えるプロセスがあるため、`allowImportingTsExtensions`オプションは有効になっています。
これにより、`.ts`からのインポート（および`.js`）が可能になります。

古いコードでは、_ファイル拡張子なし_のインポートを見かけることがあります。
~~~~

[blog-live-bindings]: https://2ality.com/2015/07/es6-module-exports.html#es6-modules-export-immutable-bindings
[blog-tree-shaking]: https://bitsofco.de/what-is-tree-shaking/
[mdn-const]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const
[mdn-dynamic-imports]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#Dynamic_Imports
[mdn-let]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let
[mdn-module]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules
[mdn-object-freeze]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
[mdn-primitive]: https://developer.mozilla.org/en-US/docs/Glossary/Primitive
[mdn-renaming-modules]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules#Renaming_imports_and_exports
[mdn-var]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var
[handbook-dont-use-any]: https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html#any
[handbook-js-or-ts]: https://www.typescriptlang.org/docs/handbook/typescript-from-scratch.html#learning-javascript-and-typescript
[handbook-type-inference]: https://www.typescriptlang.org/docs/handbook/type-inference.html
[wiki-mutability]: https://en.wikipedia.org/wiki/Immutable_object
[wiki-camel-case]: https://en.wikipedia.org/wiki/Camel_case
[wiki-snake-case]: https://en.wikipedia.org/wiki/Snake_case
