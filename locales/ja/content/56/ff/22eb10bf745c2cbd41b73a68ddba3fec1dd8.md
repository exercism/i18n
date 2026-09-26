# 概要

配列は、Factorの固定長シーケンス型です。要素は変更できますが、長さは変更できません。
リテラルは`{ … }`で書き、要素の間は空白で区切ります。`arrays`ボキャブラリーには、スタックから値を取り出す小さなコンストラクターが追加されています。

| ワード     | 効果                              |
|----------|-------------------------------------|
| `1array` | `( a     -- { a } )`                |
| `2array` | `( a b   -- { a b } )`              |
| `3array` | `( a b c -- { a b c } )`            |
| `<array>`| `( n elt -- array )`：`elt`を`n`個コピーした配列 |
| `array?` | `( obj   -- ? )`：型を調べる述語   |

`sequences`の[プロトコル][sequence-protocol]にあるワードは、配列と組み合わせてよく登場するものがいくつかあるので、まとめて覚えておく価値があります。

| ワード      | 効果                                                |
|-----------|-------------------------------------------------------|
| `concat`  | `( seqs -- seq )`：シーケンスのシーケンスを平坦にする   |
| `join`    | `( seqs glue -- seq )`：区切り文字をはさんで平坦にする |
| `reverse` | `( seq -- newseq )`：順序を逆にする                   |
| `index`   | `( elt seq -- i/f )`：要素のインデックス、なければ`f`   |
| `member?` | `( elt seq -- ? )`：要素が含まれるかどうかを調べる      |

```factor
USING: arrays sequences ;

3 4 2array .                       ! => { 3 4 }
{ { 1 2 } { 3 4 } } concat .       ! => { 1 2 3 4 }
{ 1 2 3 4 } reverse .              ! => { 4 3 2 1 }
"b" { "a" "b" "c" } index .        ! => 1
"b" { "a" "b" "c" } member? .      ! => t
```

[`sets`][sets]の`all-unique?`と`members`も、どんなシーケンスでも受け付けます。配列の要素をハッシュセットに変換しなくても、重複を取り除いたり、重複がないか調べたりしたいときに便利です。

[sets]: https://docs.factorcode.org/content/vocab-sets.html
[sequence-protocol]: https://docs.factorcode.org/content/article-sequence-protocol.html
