# نبذة

## صحيح، خطأ

- يُستخدم `true` و `false` لتمثيل حالات منطقية.
  - وهما المثالان الوحيدان للكائنين [`TrueClass`][true-class] و [`FalseClass`][false-class].
  - وقد يظهران كقيم حرفية في الكود، أو كنتيجة لدوال منطقية (`&&`، `||`، `!`) أو [دوال المقارنة][comparable-class] (`<`، `>`، `==`).

## _صادق_ و _زائف_

- عندما لا تستخدم قيمًا منطقية صارمة، تُطبَّق قواعد التقييم _الصادق_ و_الزائف_:

  - لا يُقيَّم كقيمة _زائفة_ سوى `false` و `nil`.
  - ويُقيَّم كل ما عدا ذلك كقيمة _صادقة_.

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
