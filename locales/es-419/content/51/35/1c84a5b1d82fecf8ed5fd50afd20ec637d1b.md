# Acerca de

## True, False

- `true` y `false` se usan para representar estados lógicos Boolean.
  - Son instancias únicas de los objetos [`TrueClass`][true-class] y [`FalseClass`][false-class].
  - pueden aparecer como literales en el código, o como el resultado de métodos lógicos (`&&`, `||`, `!`) o de [comparación][comparable-class] (`<`, `>`, `==`).

## _Truthy_ y _falsey_

- Cuando no se usan valores Boolean estrictos, se aplican las reglas de evaluación _truthy_ y _falsey_:

  - Solo `false` y `nil` se evalúan como _falsey_.
  - Todo lo demás se evalúa como _truthy_.

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
