# Sobre

## True, False

- `true` e `false` são usados para representar estados lógicos do tipo Boolean.
  - São instâncias singleton dos objetos [`TrueClass`][true-class] e [`FalseClass`][false-class].
  - Podem aparecer como literais no código, ou como resultado de métodos lógicos (`&&`, `||`, `!`) ou de [comparação][comparable-class] (`<`, `>`, `==`).

## _Truthy_ e _falsey_

- Quando você não usa valores Boolean estritos, valem as regras de avaliação _truthy_ e _falsey_:

  - Apenas `false` e `nil` são avaliados como _falsey_.
  - Todo o resto é avaliado como _truthy_.

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
