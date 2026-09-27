# 說明補充

## Arturo 的說明

在這道練習中，你需要支援兩種不同的方式來呼叫`stringify`這個詞：

1. 使用`roman`屬性（例如`stringify.roman 3999`）
2. 不使用`roman`屬性（例如`stringify 3999`）

想了解更多資訊，請參閱[屬性][attributes]文件，以及[`attr`][attr]文件。

~~~~exercism/caution
除了`attr`之外，`attrs`函式也很有用：它會把該次函式呼叫的所有屬性以字典的形式回傳。

請注意，這兩個函式都具有破壞性！

Arturo 的實作使用了一個[「屬性表」][createAttrsStack]。

* `attrs`會在取回屬性之後，[明確清空該表][getAttrsDict]。
* `attr`則會[把屬性從表中移除（「pop」）][builtinAttr]。

舉例來說：

```arturo
showAttributes: function [x][
    print attr 'question
    print attrs
    print attrs
]

showAttributes .question:"6 * 9" .answer:42 'arg
```
輸出：
```
6 * 9
[answer:42]
[]
```

每經過一步，都可以看到屬性字典在縮小。

**結論**：請注意，屬性只能取用一次。
如果你之後還需要用到屬性，請在函式開頭就先把它們保存下來。

[getAttrsDict]: https://github.com/arturo-lang/arturo/blob/2ef0081570feb6ab752404c32bbf85132df379fb/src/vm/stack.nim#L187
[builtinAttr]: https://github.com/arturo-lang/arturo/blob/2ef0081570feb6ab752404c32bbf85132df379fb/src/library/Reflection.nim#L85
[createAttrsStack]: https://github.com/arturo-lang/arturo/blob/2ef0081570feb6ab752404c32bbf85132df379fb/src/vm/stack.nim#L136
~~~~

[attributes]: https://arturo-lang.io/documentation/language/#attributes
[attr]: https://arturo-lang.io/documentation/library/reflection/attr/
