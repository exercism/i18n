# 说明附录

## Arturo 说明

这道练习中，你需要支持两种不同的方式来调用`stringify`词：

1. 带上`roman`属性（例如`stringify.roman 3999`）
2. 不带`roman`属性（例如`stringify 3999`）

想了解更多信息，请查阅 [属性][attributes] 文档以及 [`attr`][attr] 文档。

~~~~exercism/caution
除了`attr`，`attrs`函数也很有用：它会以字典的形式返回函数调用的所有属性。

注意，这两个函数都具有破坏性！

Arturo 的实现使用了一个[“属性表”][createAttrsStack]。

* `attrs` 在取出属性后会[显式清空该表][getAttrsDict]。
* `attr` 会[从表中移除（“弹出”）该属性][builtinAttr]。

一个例子：

```arturo
showAttributes: function [x][
    print attr 'question
    print attrs
    print attrs
]

showAttributes .question:"6 * 9" .answer:42 'arg
```
输出
```
6 * 9
[answer:42]
[]
```

每执行一步，我们都会看到属性字典在缩小。

**结论**：注意，你只能获取一次属性。
如果你需要再次引用属性，请在函数的开头就把它们捕获下来。

[getAttrsDict]: https://github.com/arturo-lang/arturo/blob/2ef0081570feb6ab752404c32bbf85132df379fb/src/vm/stack.nim#L187
[builtinAttr]: https://github.com/arturo-lang/arturo/blob/2ef0081570feb6ab752404c32bbf85132df379fb/src/library/Reflection.nim#L85
[createAttrsStack]: https://github.com/arturo-lang/arturo/blob/2ef0081570feb6ab752404c32bbf85132df379fb/src/vm/stack.nim#L136
~~~~

[attributes]: https://arturo-lang.io/documentation/language/#attributes
[attr]: https://arturo-lang.io/documentation/library/reflection/attr/
