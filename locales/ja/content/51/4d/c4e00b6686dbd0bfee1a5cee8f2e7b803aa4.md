# はじめに

Factorのハッシュテーブルは*連想配列*です。`key/value`のペアの集まりで、O(1)で検索できます。より大きな[`assocs`][assocs]ファミリーに属しています。

## ハッシュテーブルのリテラル

```factor
H{ { "coal" 1 } { "wood" 2 } } .
```

`H{ }`は空のハッシュテーブルです。ハッシュテーブルは*可変*で、キーを追加したり削除したりするにつれて大きくなったり小さくなったりします。元のハッシュテーブルをそのまま残したいときは、先に`clone`してください。ハッシュテーブルを表示するとその中身が表示されますが、順序は挿入した順序とは関係ありません。ハッシュテーブルに順序はないのです。

## 値の読み取り

`at`（[`assocs`][assocs]にあります）は値を読み取ります。キーがなければ`f`を返します。

```
at      ( key assoc -- value/f )
key?    ( key assoc -- ? )
```

```factor
"coal" H{ { "coal" 1 } { "wood" 2 } } at .   ! => 1
"gold" H{ { "coal" 1 } { "wood" 2 } } at .   ! => f
```

## 値の書き込み

`set-at`は追加または上書きをし、`delete-at`は削除し、`change-at`は現在の値に対してquotationを実行します。3つとも*ハッシュテーブルを破壊的に書き換えます*。

```
set-at     ( value key assoc -- )
delete-at  ( key assoc -- )
change-at  ( key assoc quot: ( old -- new ) -- )
```

```factor
H{ } clone 5 "coal" pick set-at .
! => H{ { "coal" 5 } }
```

## `inc-at`：数を数える近道

`inc-at`（こちらも[`assocs`][assocs]にあります）は、あるキーの既存の値に1を足します。キーがなければ1として挿入します。数を数えるのにぴったりです。

```
inc-at ( key assoc -- )
```

```factor
H{ } clone "coal" over inc-at .
! => H{ { "coal" 1 } }
```

## 繰り返しと遅延挿入

`assoc-each`はすべての`( key value -- )`のペアをたどります。`cache`はあるキーの値を返し、キーがなければ与えられたquotationで一度だけ計算します。

```
assoc-each ( assoc quot: ( key value -- ) -- )
cache      ( key assoc quot: ( key -- value ) -- value )
```

`cache`は「探すか、なければ作る」というパターンを1語で表します。一連のキーからハッシュテーブルを組み立てるとき、呼び出しのたびにキーが存在しない場合を扱いたくないときに便利です。

## 一連のキーにハッシュテーブルの更新を適用する

入力が一連のキーで、キーごとにハッシュテーブルを1回ずつ更新したいときは、`each`で*その並び*を繰り返し、フライドquotation `'[ _ … ]`（[`fry`][fry]にあります）を使ってハッシュテーブルをループ本体に埋め込みます。たとえば、キーのリストを削除するには次のようにします。

```factor
{ "wood" "iron" } H{ { "coal" 5 } { "wood" 3 } { "iron" 2 } } clone
[ '[ _ delete-at ] each ] keep .
! => H{ { "coal" 5 } }
```

`'[ _ delete-at ]`はスタック上でそのすぐ下にあるハッシュテーブルを取り込みます。こうすることで、繰り返しのたびに`each`がキーを渡すだけでよくなります。`keep`は、最後の`.`のためにハッシュテーブルを保持したままquotationを実行します。

## 並びからハッシュテーブルを組み立てる

`map>assoc`（[`assocs`][assocs]にあります）は、並びに対してquotationをマップし、`( elt -- key value )`の結果を、見本の型のassocに集めます。

```
map>assoc ( seq quot: ( elt -- key value ) exemplar -- assoc )
```

```factor
{ "wood" } [ dup length ] H{ } map>assoc .
! => H{ { "wood" 4 } }
```

## キー、値、ペア

`keys`と`values`（[`assocs`][assocs]にあります）はキーだけ、または値だけを返します。`>alist`は`{ key value }`のペアを返します。

```
keys   ( assoc -- keys )
values ( assoc -- values )
>alist ( assoc -- alist )
```

```factor
H{ { "wood" 11 } { "coal" 7 } } keys .     ! the keys (order not guaranteed)
H{ { "wood" 11 } { "coal" 7 } } values .   ! the matching values
```

`keys`と`values`は対応しています。ある位置の値は、同じ位置のキーに対応する値です。

`sort-keys`（[`sorting`][sorting]にあります）は`{ key value }`のペアをキーで並べ替えて返します。

```factor
H{ { "wood" 11 } { "coal" 7 } } sort-keys .
! => { { "coal" 7 } { "wood" 11 } }
```

## ペアからハッシュテーブルに戻す

`>hashtable`（[`hashtables`][hashtables]にあります）は`>alist`の逆です。任意のassocを、O(1)で検索できるハッシュテーブルに変換します。多くの場合、`{ key value }`のペアからなるalistを変換するのに使います。

```
>hashtable ( assoc -- hashtable )
```

```factor
{ { "coal" 7 } { "wood" 11 } } >hashtable .
! => H{ { "wood" 11 } { "coal" 7 } }   (entry order not guaranteed)
```

ペアのリストを組み立てたり変換したりしたあと、それをハッシュテーブルに戻してキーで項目を引きたくなったときに便利です。

[assocs]: https://docs.factorcode.org/content/vocab-assocs.html
[fry]: https://docs.factorcode.org/content/article-fry.html
[hashtables]: https://docs.factorcode.org/content/vocab-hashtables.html
[sorting]: https://docs.factorcode.org/content/vocab-sorting.html
