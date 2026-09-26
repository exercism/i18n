# ヒント

## General

- [集合][sets]は、変更可能で順序のないコレクションで、重複する要素を持ちません。
- 集合にはどんなデータ型でも入れられますが、すべての要素が[ハッシュ可能][hashable]である必要があります。
- 集合は[イテラブル][iterable]です。
- 集合は、他のコレクションから重複をすばやく取り除いたり、要素が含まれているかを調べたりするのによく使われます。
- 集合では、`union`、`intersection`、`difference`、`symmetric difference`などの数学的な演算もサポートされています。

## 1. 食材を整理する

- `set()`コンストラクターは、任意の[イテラブル][iterable]を引数に取ることができます。[概念：リスト](/tracks/python/concepts/lists)はイテラブルです。
- 覚えておきましょう：[概念：タプル](/tracks/python/concepts/tuples)は`(<element_1>, <element_2>)`で作ることも、`tuple()`コンストラクターで作ることもできます。

## 2. カクテルとモクテル

- 2つの集合が共通の要素を1つも持たないとき、その`set`同士は_互いに素_であるといいます。
- `set()`コンストラクターは、任意の[イテラブル][iterable]を引数に取ることができます。[概念：リスト](/tracks/python/concepts/lists)はイテラブルです。
- Pythonでは、[概念：文字列](/tracks/python/concepts/strings)は`+`記号で連結できます。

## 3. 料理を分類する

- ここでは、利用できる食事のカテゴリーを[概念：ループ](/tracks/python/concepts/loops)で繰り返し処理すると役に立つかもしれません。
- `<set_1>`のすべての要素が`<set_2>`に含まれていれば、`<set_1> <= <set_2>`です。
- `<=`に相当するメソッドは`<set>.issubset(<iterable>)`です。
- [概念：タプル](/tracks/python/concepts/tuples)には、他のタプルを含め、どんなデータ型でも入れられます。タプルは`(<element_1>, <element_2>)`で作ることも、`tuple()`コンストラクターで作ることもできます。
- [概念：タプル](/tracks/python/concepts/tuples)内の要素には、左からは0始まりのインデックス番号で、右からは-1始まりのインデックス番号でアクセスできます。
- `set()`コンストラクターは、任意の[イテラブル][iterable]を引数に取ることができます。[概念：リスト](/tracks/python/concepts/lists)はイテラブルです。
- [概念：文字列](/tracks/python/concepts/strings)は`+`記号で連結できます。

## 4. アレルゲンと制限のある食品にラベルを付ける

- 集合の_積集合_は、`<set_1>`と`<set_2>`で共通する要素です。
- `&`に相当する集合のメソッドは`<set>.intersection(<iterable>)`です。
- [概念：タプル](/tracks/python/concepts/tuples)内の要素には、左からは0始まりのインデックス番号で、右からは-1始まりのインデックス番号でアクセスできます。
- `set()`コンストラクターは、任意の[イテラブル][iterable]を引数に取ることができます。[概念：リスト](/tracks/python/concepts/lists)はイテラブルです。
- [概念：タプル](/tracks/python/concepts/tuples)は`(<element_1>, <element_2>)`で作ることも、`tuple()`コンストラクターで作ることもできます。

## 5. 食材の「マスターリスト」を作成する

- 集合の_和集合_は、`<set_1`>と`<set_2>`を1つの`set`にまとめたものです。
- `|`に相当する集合のメソッドは`<set>.union(<iterable>)`です。
- ここでは、いろいろな料理を[概念：ループ](/tracks/python/concepts/loops)で繰り返し処理すると役に立つかもしれません。

## 6. トレイで運ぶ前菜を取り出す

- 集合の_差集合_は、`<set_1>`から`<set_2>`の要素を取り除いたもので、たとえば`<set_1> - <set_2>`です。
- `-`に相当する集合のメソッドは`<set>.difference(<iterable>)`です。
- `set()`コンストラクターは、任意の[イテラブル][iterable]を引数に取ることができます。[概念：リスト](/tracks/python/concepts/lists)はイテラブルです。
- [概念：リスト](/tracks/python/concepts/lists)のコンストラクターは、任意の[イテラブル][iterable]を引数に取ることができます。集合はイテラブルです。

## 7. 1つのレシピでしか使われない食材を見つける

- 集合の_対称差_は、`<set_1>`または`<set_2>`には現れるけれど、**_両方_**には現れない要素です。
- 集合の_対称差_は、`set`の_和集合_から`set`の_積集合_を引いたものと同じです。たとえば`(<set_1> | <set_2>) - (<set_1> & <set_2>)`です。
- 3つ以上の`sets`の_対称差_には、入力の`sets`をまたいで2回より多く繰り返される要素が含まれます。こうした集合をまたいで繰り返される要素を取り除くには、集合のペア同士の_積集合_を対称差から引く必要があります。
- ここでは、いろいろな料理を[概念：ループ](/tracks/python/concepts/loops)で繰り返し処理すると役に立つかもしれません。

[hashable]: https://docs.python.org/3.7/glossary.html#term-hashable
[iterable]: https://docs.python.org/3/glossary.html#term-iterable
[sets]: https://docs.python.org/3/tutorial/datastructures.html#sets