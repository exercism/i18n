# 简介

Factor 中的哈希表是*关联数组*，即由`key/value`键值对组成的集合，查找复杂度为 O(1)。它们属于更庞大的 [`assocs`][assocs]家族。

## 哈希表字面量

```factor
H{ { "coal" 1 } { "wood" 2 } } .
```

`H{ }`是空哈希表。哈希表是*可变的*，会随着你添加和删除键而增长或缩小。如果你不想改动原来的哈希表，先`clone`一下。打印哈希表会显示它的各个条目，但顺序与插入顺序无关：哈希表是无序的。

## 读取

`at`（位于 [`assocs`][assocs]）读取一个值，如果键不存在则返回`f`：

```
at      ( key assoc -- value/f )
key?    ( key assoc -- ? )
```

```factor
"coal" H{ { "coal" 1 } { "wood" 2 } } at .   ! => 1
"gold" H{ { "coal" 1 } { "wood" 2 } } at .   ! => f
```

## 写入

`set-at`添加或覆盖；`delete-at`删除；`change-at`对当前值运行一个 quotation。这三个都会*修改*原哈希表：

```
set-at     ( value key assoc -- )
delete-at  ( key assoc -- )
change-at  ( key assoc quot: ( old -- new ) -- )
```

```factor
H{ } clone 5 "coal" pick set-at .
! => H{ { "coal" 5 } }
```

## `inc-at`，计数快捷方式

`inc-at`（同样位于 [`assocs`][assocs]）会把某个键的现有值加 1，键不存在时则以 1 插入。非常适合用来计数：

```
inc-at ( key assoc -- )
```

```factor
H{ } clone "coal" over inc-at .
! => H{ { "coal" 1 } }
```

## 迭代与惰性插入

`assoc-each`遍历每一个`( key value -- )`键值对；`cache`返回某个键对应的值，若该键不存在，则用传入的 quotation 计算一次。

```
assoc-each ( assoc quot: ( key value -- ) -- )
cache      ( key assoc quot: ( key -- value ) -- value )
```

`cache`用一个词就实现了“查找或创建”模式，当你从一连串键构建哈希表、又不想在每个调用点都处理条目缺失的情况时，它非常方便。

## 对一串键批量更新哈希表

当输入是一串键，而你想为每个键更新一次哈希表时，用`each`遍历这个*序列*，并使用 fried quotation `'[ _ … ]`（来自 [`fry`][fry]）把哈希表烘焙进循环体。例如，删除一组键：

```factor
{ "wood" "iron" } H{ { "coal" 5 } { "wood" 3 } { "iron" 2 } } clone
[ '[ _ delete-at ] each ] keep .
! => H{ { "coal" 5 } }
```

`'[ _ delete-at ]`会捕获栈中位于它上方的哈希表，这样每次迭代时`each`只需提供键即可。`keep`在运行 quotation 的同时保留哈希表，供最后的`.`使用。

## 从序列构建哈希表

`map>assoc`（位于 [`assocs`][assocs]）把一个 quotation 映射到序列上，并将`( elt -- key value )`的结果收集成一个 assoc，其类型与 exemplar 相同：

```
map>assoc ( seq quot: ( elt -- key value ) exemplar -- assoc )
```

```factor
{ "wood" } [ dup length ] H{ } map>assoc .
! => H{ { "wood" 4 } }
```

## 键、值与键值对

`keys`和`values`（位于 [`assocs`][assocs]）只返回键或只返回值；`>alist`返回`{ key value }`键值对。

```
keys   ( assoc -- keys )
values ( assoc -- values )
>alist ( assoc -- alist )
```

```factor
H{ { "wood" 11 } { "coal" 7 } } keys .     ! the keys (order not guaranteed)
H{ { "wood" 11 } { "coal" 7 } } values .   ! the matching values
```

`keys`和`values`是对齐的：某个位置上的值属于同一位置上的键。

`sort-keys`（位于 [`sorting`][sorting]）返回按键排序后的`{ key value }`键值对：

```factor
H{ { "wood" 11 } { "coal" 7 } } sort-keys .
! => { { "coal" 7 } { "wood" 11 } }
```

## 从键值对回到哈希表

`>hashtable`（位于 [`hashtables`][hashtables]）是`>alist`的逆操作：它把任意 assoc（最常见的是由`{ key value }`键值对组成的 alist）转换成支持 O(1) 查找的哈希表。

```
>hashtable ( assoc -- hashtable )
```

```factor
{ { "coal" 7 } { "wood" 11 } } >hashtable .
! => H{ { "wood" 11 } { "coal" 7 } }   (entry order not guaranteed)
```

当你已经组装或转换了一组键值对，想把它重新折叠成哈希表以便按键查找条目时，这个函数很好用。

[assocs]: https://docs.factorcode.org/content/vocab-assocs.html
[fry]: https://docs.factorcode.org/content/article-fry.html
[hashtables]: https://docs.factorcode.org/content/vocab-hashtables.html
[sorting]: https://docs.factorcode.org/content/vocab-sorting.html
