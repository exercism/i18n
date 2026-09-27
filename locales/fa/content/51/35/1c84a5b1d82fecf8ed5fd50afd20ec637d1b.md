# درباره

## `true` و `false`

- از `true` و `false` برای نمایش حالت‌های «منطقی» استفاده می‌شود.
  - آن‌ها نمونه‌های یگانه‌ی [`TrueClass`][true-class] و [`FalseClass`][false-class] هستند.
  - ممکن است در کد به‌صورت لیترال بیایند، یا نتیجه‌ی متدهای منطقی (`&&`، `||`، `!`) یا متدهای [مقایسه][comparable-class] (`<`، `>`، `==`) باشند.

## «درست‌نما» و «غلط‌نما»

- وقتی از مقادیر منطقی واقعی استفاده نمی‌کنید، قواعد ارزیابی درست‌نما و غلط‌نما اعمال می‌شوند:

  - تنها `false` و `nil` به‌صورت غلط‌نما ارزیابی می‌شوند.
  - هر مقدار دیگری درست‌نما ارزیابی می‌شود.

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
