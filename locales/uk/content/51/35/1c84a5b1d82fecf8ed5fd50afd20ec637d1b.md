# Докладніше

## `true`, `false`

- `true` і `false` використовуються для представлення булевих значень (англ. Boolean), тобто логічних станів.
  - Це єдині екземпляри обʼєктів [`TrueClass`][true-class] і [`FalseClass`][false-class].
  - вони можуть зустрічатися як літерали в коді або як результат логічних (`&&` (логічне і), `||` (логічне або), `!`) чи методів [порівняння][comparable-class] (`<`, `>`, `==`).

## _Truthy_ і _falsey_

- Коли ми не використовуємо строгі булеві значення, застосовуються правила оцінювання _truthy_ та _falsey_:

  - Лише `false` і `nil` оцінюються як _falsey_.
  - Усе інше оцінюється як _truthy_.

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
