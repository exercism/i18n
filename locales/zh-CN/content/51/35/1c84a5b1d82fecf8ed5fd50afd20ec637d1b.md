# 关于

## 真与假

- `true`和`false`用于表示布尔逻辑状态。
  - 它们是[`TrueClass`][true-class]和[`FalseClass`][false-class]对象的单例实例。
  - 它们可以作为代码中的字面量出现，也可以作为逻辑（`&&`、`||`、`!`）或[比较][comparable-class]（`<`、`>`、`==`）方法的结果出现。

## _Truthy_ 和 _falsey_

- 当不使用严格的布尔值时，会应用 _truthy_ 和 _falsey_ 求值规则：

  - 只有`false`和`nil`求值为 _falsey_。
  - 其他所有内容都求值为 _truthy_。

  ```ruby
  # A simplified definition
  def falsey
    nil || false
  end

  def truthy
    not falsey
  end
  ```

[c-family]: https://en.wikipedia.org/wiki/List_of_C-family_programming_languages
[control-expressions]: https://en.wikibooks.org/wiki/Ruby_Programming/Syntax/Control_Structures
[true-class]: https://docs.ruby-lang.org/en/master/TrueClass.html
[false-class]: https://docs.ruby-lang.org/en/master/FalseClass.html
[nil-class]: https://docs.ruby-lang.org/en/master/NilClass.html
[comparable-class]: https://docs.ruby-lang.org/en/master/Comparable.html
[constants]: https://www.rubyguides.com/2017/07/ruby-constants/
[integer-class]: https://docs.ruby-lang.org/en/master/Integer.html
[kernel-class]: https://docs.ruby-lang.org/en/master/Kernel.html
[methods]: https://launchschool.com/books/ruby/read/methods
[returns]: https://www.freecodecamp.org/news/idiomatic-ruby-writing-beautiful-code-6845c830c664/
