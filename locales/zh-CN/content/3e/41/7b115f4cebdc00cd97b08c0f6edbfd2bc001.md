# 关于

Common Lisp 和其他语言一样，有一套决定两个对象是否“相同”的规则。这些规则定义了四个层级，每个层级都有一个执行该级别检查的函数。这些层级按从最严格到最宽松的顺序排列。

## `eq`

第一层是对象同一性。这种相等性用函数[`eq`][hyper-eq]检查。被检查相等性的两个对象必须是同一个对象：

```lisp
(eq 'apples 'apples)  ; => T
(eq 'apples 'oranges) ; => NIL

(eq '(a b c) '(a b c) ; => NIL (these two lists have the same contents but are not the same list)
(let ((list1 '(a b c)) (list2 list1)) 
  (eq list1 list2))   ; => T (these two lists are the same list)
```

## `eql`

第二层加入了数字和字符的相等性。这种相等性用函数[`eql`][hyper-eql]检查。检查的方式取决于实参的类型：

- 任何两个`eq`的对象也都是`eql`的
- 数字的类型和值都相同时，它们就是`eql`的
- 字符表示同一个字符时，它们就是`eql`的。

```lisp
(eql 1 1)     ; => T
(eql 1 1/1)   ; => NIL (one number is an integer, the other a rational)
(eql #\c #\c) ; => T
(eql #\c #\C) ; => NIL (case is different)
```

你可能会奇怪，为什么数字和字符不用[`eq`][hyper-eq]比较对象同一性。Common Lisp 标准允许实现自行选择是否复制数字和字符。因此`0`和`0`可能不是[`eq`][hyper-eq]的，因为它们可能是数字`0`的不同实例。

## `equal`

第三层检查结构上的相似性。这种相等性用[`equal`][hyper-equal]检查。检查的方式取决于实参的类型：

- 符号按[`eq`][hyper-eq]的方式比较
- 字符和数字按`eql`的方式比较
- 如果 cons 的元素都是[`equal`][hyper-equal]的，那么这些 cons 就是[`equal`][hyper-equal]的。这一比较是递归进行的。
- 如果字符串和位向量的元素都是`eql`的，那么它们就是[`equal`][hyper-equal]的
- 其他类型的数组按[`eq`][hyper-eq]的方式比较
- 如果路径名功能等价，那么它们就是[`equal`][hyper-equal]的。（在构成路径名各组成部分的字符串的大小写敏感性方面，这里为依赖具体实现的行为留有余地。）
- 其他任何类型的对象按[`eq`][hyper-eq]的方式比较

```lisp
(equal '(a (b c)) '(a (b c)))         ; => T (conses are equal if their contents are equal)
(equal "hello" "hello")               ; => T
(equal "hello" "HELLO")               ; => NIL
(equal #(1 2 3) #(1 2 3))             ; => NIL (arrays are equal only if eq)
(equal #P"foo/bar.md" #P"foo/bar.md") ; => T (pathnames are equal if "functionally equivalent"
```

## `equalp`

第四层，也是最宽松的一层相等性，用[`equalp`][hyper-equalp]检查。检查的方式取决于类型：

- 如果两个对象是[`equalp`][hyper-equalp]的，那么它们就是[`equalp`][hyper-equalp]的
- 如果数字的值相同，即使类型不同，它们也是[`equalp`][hyper-equalp]的
- 字符和字符串的比较不区分大小写
- 如果 cons 的元素都是[`equalp`][hyper-equalp]的，那么这些 cons 就是[`equalp`][hyper-equalp]的。这一比较是递归进行的。
- 如果数组的维数相同、各维的大小也相同，并且每个元素都是[`equalp`][hyper-equalp]的，那么这些数组就是[`equalp`][hyper-equalp]的。
- 如果结构体的类相同、槽相同，并且两个结构体之间每个对应的槽都是[`equalp`][hyper-equalp]的，那么这些结构体就是[`equalp`][hyper-equalp]的。
- 如果两个哈希表的`:test`函数相同、键相同（按该`:test`函数比较），并且这些键对应的值按[`equalp`][hyper-equalp]比较也相同，那么这两个哈希表就是[`equalp`][hyper-equalp]的。

```lisp
(equalp 1 1.0)                       ; => T
(equalp #\c #\C)                     ; => T
(equalp "hello" "HELLO")             ; => T
(equalp #(1 2 3) #(1.0 2.0 3.0))     ; => T (arrays contain elements which are `equalp`)
(equal #S(TEST :SLOT1 'a :SLOT2 'b) 
       #S(TEST :SLOT1 'a :SLOT2 'b)) ; => T (structures of the same class with slots that have values which are `equalp`)
```

## 类型专属函数

以上都是“通用”的相等性函数。按定义，它们适用于任何类型。当你编写通用代码、直到运行时才知道要比较的对象的类型时，这会很有用。不过，当你知道被比较的类型时，一般认为使用类型专属的相等性函数是“更好的风格”。例如用`string=`而不是`equal`。这些函数会在相关概念中介绍和讨论。

[hyper-eq]: http://www.lispworks.com/documentation/HyperSpec/Body/f_eq.htm
[hyper-eql]: http://www.lispworks.com/documentation/HyperSpec/Body/f_eql.htm
[hyper-equal]: http://www.lispworks.com/documentation/HyperSpec/Body/f_equal.htm
[hyper-equalp]: http://www.lispworks.com/documentation/HyperSpec/Body/f_equalp.htm
