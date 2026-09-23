# À propos

## Vrai, faux

- `true` et `false` servent à représenter des états logiques booléens.
  - Ce sont des instances uniques des objets [`TrueClass`][true-class] et [`FalseClass`][false-class].
  - On les rencontre sous forme de littéraux dans le code, ou comme résultat de méthodes logiques (`&&`, `||`, `!`) ou de [comparaison][comparable-class] (`<`, `>`, `==`).

## _Truthy_ et _falsey_

- Lorsqu'on n'utilise pas de valeurs booléennes strictes, ce sont les règles d'évaluation _truthy_ et _falsey_ qui s'appliquent :

  - Seuls `false` et `nil` sont évalués comme _falsey_.
  - Tout le reste est évalué comme _truthy_.

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
