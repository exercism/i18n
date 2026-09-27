# 關於

## True 與 False

- `true`和`false`用來表示布林邏輯狀態。
  - 它們是 [`TrueClass`][true-class]和[`FalseClass`][false-class]物件的單例實例。
  - 它們可能在程式碼中以字面值出現，或作為邏輯（`&&`、`||`、`!`）或[比較][comparable-class]（`<`、`>`、`==`）方法的結果。

## _Truthy_ 與 _falsey_

- 當不使用嚴格的布林值時，會套用 _truthy_ 和 _falsey_ 的求值規則：

  - 只有 `false`和`nil`會求值為 _falsey_。
  - 其他所有東西都會求值為 _truthy_。

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
