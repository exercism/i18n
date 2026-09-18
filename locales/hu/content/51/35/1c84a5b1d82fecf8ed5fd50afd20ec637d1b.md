# Bővebben

## Igaz, hamis

- A `true` és a `false` a Boolean logikai állapotok ábrázolására szolgál.
  - A [`TrueClass`][true-class] és a [`FalseClass`][false-class] objektumok szingleton példányai.
  - Előfordulhatnak literálként a kódban, vagy logikai (`&&`, `||`, `!`) vagy [összehasonlító][comparable-class] (`<`, `>`, `==`) metódusok eredményeként.

## _Truthy_ és _falsey_

- Ha nem szigorú Boolean értékeket használunk, a _truthy_ és _falsey_ kiértékelési szabályok érvényesülnek:

  - Csak a `false` és a `nil` értékelődik _falsey_-nak.
  - Minden más _truthy_-nak értékelődik.

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
