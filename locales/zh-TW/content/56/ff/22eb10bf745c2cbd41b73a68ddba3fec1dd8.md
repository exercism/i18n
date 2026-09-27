# 關於

陣列是 Factor 的固定長度序列型別：你可以改變其中的元素，但不能改變長度。
字面值使用 `{ … }`，元素之間以空白分隔；`arrays` 詞彙庫提供了一些小型建構子，
可以從堆疊上取出值：

| 詞       | 效果                                |
|----------|-------------------------------------|
| `1array` | `( a     -- { a } )`                |
| `2array` | `( a b   -- { a b } )`              |
| `3array` | `( a b c -- { a b c } )`            |
| `<array>`| `( n elt -- array )` — `n` 個 `elt` 的複本 |
| `array?` | `( obj   -- ? )` — 型別述詞         |

`sequences` 裡有幾個[協定][sequence-protocol]詞經常和陣列一起出現，值得把它們
當成一組來認識：

| 詞        | 效果                                                  |
|-----------|-------------------------------------------------------|
| `concat`  | `( seqs -- seq )` — 攤平一個由序列組成的序列          |
| `join`    | `( seqs glue -- seq )` — 以分隔符號攤平               |
| `reverse` | `( seq -- newseq )`                                   |
| `index`   | `( elt seq -- i/f )` — 元素的索引，或 `f`             |
| `member?` | `( elt seq -- ? )` — 成員測試                         |

```factor
USING: arrays sequences ;

3 4 2array .                       ! => { 3 4 }
{ { 1 2 } { 3 4 } } concat .       ! => { 1 2 3 4 }
{ 1 2 3 4 } reverse .              ! => { 4 3 2 1 }
"b" { "a" "b" "c" } index .        ! => 1
"b" { "a" "b" "c" } member? .      ! => t
```

[`sets`][sets] 的 `all-unique?` 和 `members` 也接受任何序列。當你想要
去除陣列元素中的重複，或檢查有沒有重複，又不想先轉成 hash-set 時，
這兩個詞就很方便。

[sets]: https://docs.factorcode.org/content/vocab-sets.html
[sequence-protocol]: https://docs.factorcode.org/content/article-sequence-protocol.html
