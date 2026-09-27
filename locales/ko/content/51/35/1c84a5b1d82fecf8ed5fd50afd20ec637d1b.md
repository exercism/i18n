# 개요

## 참과 거짓

- `true`와 `false`는 불리언 논리 상태를 나타내는 데 사용해요.
  - 이 둘은 [`TrueClass`][true-class]와 [`FalseClass`][false-class] 객체의 싱글턴 인스턴스예요.
  - 코드에서 리터럴로 등장할 수도 있고, 논리(`&&`, `||`, `!`) 또는 [비교][comparable-class] (`<`, `>`, `==`) 메서드의 결과로 나타날 수도 있어요.

## _참 같은 값_과 _거짓 같은 값_

- 엄격한 불리언 값을 사용하지 않을 때에는 _참 같은 값_과 _거짓 같은 값_ 평가 규칙이 적용돼요.

  - `false`와 `nil`만이 _거짓 같은 값_으로 평가돼요.
  - 그 밖의 모든 값은 _참 같은 값_으로 평가돼요.

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
