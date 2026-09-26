# 关于

数组是 Factor 的定长序列类型：可以修改其中的元素，但不能改变长度。
字面量写作`{ … }`，元素之间用空白分隔；`arrays`词汇表提供了一些小巧的
构造函数，可以从栈上取值：

| 词        | 效果                                 |
|----------|-------------------------------------|
| `1array` | `( a     -- { a } )`                |
| `2array` | `( a b   -- { a b } )`              |
| `3array` | `( a b c -- { a b c } )`            |
| `<array>`| `( n elt -- array )`：`n`份`elt`的副本 |
| `array?` | `( obj   -- ? )`：类型谓词            |

`sequences`里有几个[协议][sequence-protocol]词经常和数组一起出现，值得
把它们作为一个整体来掌握：

| 词         | 效果                                                  |
|-----------|-------------------------------------------------------|
| `concat`  | `( seqs -- seq )`：展平嵌套序列                        |
| `join`    | `( seqs glue -- seq )`：用分隔符展平                   |
| `reverse` | `( seq -- newseq )`                                   |
| `index`   | `( elt seq -- i/f )`：元素的下标，找不到则为`f`         |
| `member?` | `( elt seq -- ? )`：成员测试                           |

```factor
USING: arrays sequences ;

3 4 2array .                       ! => { 3 4 }
{ { 1 2 } { 3 4 } } concat .       ! => { 1 2 3 4 }
{ 1 2 3 4 } reverse .              ! => { 4 3 2 1 }
"b" { "a" "b" "c" } index .        ! => 1
"b" { "a" "b" "c" } member? .      ! => t
```

[`sets`][sets]里的`all-unique?`和`members`也接受任意序列，在需要给数组
元素去重、或者不想先转换成哈希集合就想检查有没有重复元素时，它们很好用。

[sets]: https://docs.factorcode.org/content/vocab-sets.html
[sequence-protocol]: https://docs.factorcode.org/content/article-sequence-protocol.html
