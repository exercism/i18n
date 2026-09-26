# 概要

Common Lispにも、他の言語と同様に、2つのオブジェクトが「同じ」かどうかを判断するためのルールがあります。
このルールは4つのレベルを定義していて、それぞれのレベルには、そのレベルでのチェックを行う関数があります。
レベルは、最も厳しいものから最も緩いものへと並んでいます。

## `eq`

最初のレベルは、オブジェクトの同一性です。
この等価性は、関数[`eq`][hyper-eq]でチェックします。
等しいかどうかを調べる2つのオブジェクトは、まったく同じオブジェクトでなければなりません。

```lisp
(eq 'apples 'apples)  ; => T
(eq 'apples 'oranges) ; => NIL

(eq '(a b c) '(a b c) ; => NIL (these two lists have the same contents but are not the same list)
(let ((list1 '(a b c)) (list2 list1)) 
  (eq list1 list2))   ; => T (these two lists are the same list)
```

## `eql`

2番目のレベルでは、数値と文字の等価性が加わります。
この等価性は、関数[`eql`][hyper-eql]でチェックします。
チェックの方法は、引数の型によって変わります。

- `eq`である2つのオブジェクトは、`eql`です
- 数値は、型と値が同じであれば`eql`です
- 文字は、同じ文字を表していれば`eql`です

```lisp
(eql 1 1)     ; => T
(eql 1 1/1)   ; => NIL (one number is an integer, the other a rational)
(eql #\c #\c) ; => T
(eql #\c #\C) ; => NIL (case is different)
```

なぜ数値と文字が、[`eq`][hyper-eq]によるオブジェクトの同一性で比較されないのか、不思議に思うかもしれません。
Common Lispの標準では、実装が望むなら数値や文字をコピーすることが許されています。
そのため、`0`と`0`は[`eq`][hyper-eq]でないことがあります。それぞれが数値`0`の異なるインスタンスである可能性があるからです。

## `equal`

3番目のレベルでは、構造的な類似性をチェックします。
この等価性は、[`equal`][hyper-equal]でチェックします。
チェックの方法は、引数の型によって変わります。

- シンボルは、[`eq`][hyper-eq]と同様に比較されます
- 文字と数値は、`eql`と同様に比較されます
- コンスは、その要素が[`equal`][hyper-equal]であれば[`equal`][hyper-equal]です。
これは再帰的に行われます。
- 文字列とビットベクターは、その要素が`eql`であれば[`equal`][hyper-equal]です
- その他の型の配列は、[`eq`][hyper-eq]と同様に比較されます
- パス名は、機能的に等価であれば[`equal`][hyper-equal]です。
（ここには、パス名の構成要素となる文字列の大文字小文字の扱いに関して、実装依存の動作が入り込む余地があります。）
- その他の型のオブジェクトは、[`eq`][hyper-eq]と同様に比較されます

```lisp
(equal '(a (b c)) '(a (b c)))         ; => T (conses are equal if their contents are equal)
(equal "hello" "hello")               ; => T
(equal "hello" "HELLO")               ; => NIL
(equal #(1 2 3) #(1 2 3))             ; => NIL (arrays are equal only if eq)
(equal #P"foo/bar.md" #P"foo/bar.md") ; => T (pathnames are equal if "functionally equivalent"
```

## `equalp`

4番目で最も緩いレベルの等価性は、[`equalp`][hyper-equalp]でチェックします。
チェックの方法は、型によって変わります。

- 2つのオブジェクトが[`equalp`][hyper-equalp]であれば、それらは[`equalp`][hyper-equalp]です
- 数値は、型が同じでなくても値が同じであれば[`equalp`][hyper-equalp]です
- 文字と文字列は、大文字小文字を区別せずに比較されます
- コンスは、その要素が[`equalp`][hyper-equalp]であれば[`equalp`][hyper-equalp]です。
これは再帰的に行われます。
- 配列は、次元数が同じで、それらの次元が一致し、各要素が[`equalp`][hyper-equalp]であれば[`equalp`][hyper-equalp]です。
- 構造体は、同じクラスとスロットを持ち、それらのスロットのそれぞれが2つの構造体の間で[`equalp`][hyper-equalp]であれば[`equalp`][hyper-equalp]です。
- ハッシュテーブルは、両方が同じ`:test`関数を持ち、同じキーを持ち（その`:test`関数で比較した場合）、それらのキーが[`equalp`][hyper-equalp]で比較して同じ値を持てば[`equalp`][hyper-equalp]です。

```lisp
(equalp 1 1.0)                       ; => T
(equalp #\c #\C)                     ; => T
(equalp "hello" "HELLO")             ; => T
(equalp #(1 2 3) #(1.0 2.0 3.0))     ; => T (arrays contain elements which are `equalp`)
(equal #S(TEST :SLOT1 'a :SLOT2 'b) 
       #S(TEST :SLOT1 'a :SLOT2 'b)) ; => T (structures of the same class with slots that have values which are `equalp`)
```

## 型に特化した関数

ここまでに挙げたのは、「汎用的な」等価性の関数です。
これらは、定義どおり、どのような型に対しても機能します。
これは、比較するオブジェクトの型が実行時までわからないような汎用的なコードを書くときに役立ちます。
ただし、比較する型がわかっている場合には、型に特化した等価性の関数を使うほうが「よりよいスタイル」だと一般に考えられています。
たとえば、`equal`ではなく`string=`を使います。
これらの関数は、関連するコンセプトの中で紹介し、説明します。

[hyper-eq]: http://www.lispworks.com/documentation/HyperSpec/Body/f_eq.htm
[hyper-eql]: http://www.lispworks.com/documentation/HyperSpec/Body/f_eql.htm
[hyper-equal]: http://www.lispworks.com/documentation/HyperSpec/Body/f_equal.htm
[hyper-equalp]: http://www.lispworks.com/documentation/HyperSpec/Body/f_equalp.htm
