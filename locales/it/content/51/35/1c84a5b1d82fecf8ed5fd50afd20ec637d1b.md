# Informazioni

## True, false

- `true` e `false` sono usati per rappresentare stati logici booleani.
  - Sono istanze singleton degli oggetti [`TrueClass`][true-class] e [`FalseClass`][false-class].
  - possono comparire come valori letterali nel codice, oppure come risultato di metodi logici (`&&`, `||`, `!`) o di [confronto][comparable-class] (`<`, `>`, `==`).

## _Truthy_ e _falsey_

- Quando non si usano valori booleani in senso stretto, si applicano le regole di valutazione _truthy_ e _falsey_:

  - Solo `false` e `nil` vengono valutati come _falsey_.
  - Tutto il resto viene valutato come _truthy_.

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
