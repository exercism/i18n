# About

## `true`と`false`

- `true`と`false`は、真偽値の論理状態を表すために使われます。
  - これらは[`TrueClass`][true-class]と[`FalseClass`][false-class]オブジェクトのシングルトンインスタンスです。
  - コード内にリテラルとして現れることもあれば、論理メソッド（`&&`、`||`、`!`）や[比較][comparable-class]メソッド（`<`、`>`、`==`）の結果として現れることもあります。

## _Truthy_と_falsey_

- 厳密な真偽値を使わない場合は、_truthy_と_falsey_の評価ルールが適用されます。

  - `false`と`nil`だけが_falsey_と評価されます。
  - それ以外はすべて_truthy_と評価されます。

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
