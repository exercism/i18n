# Überblick

## Wahr, falsch

- Mit `true` und `false` stellst du boolesche Werte dar.
  - Sie sind Singleton-Instanzen der Objekte [`TrueClass`][true-class] und [`FalseClass`][false-class].
  - Sie können als Literale im Code auftreten oder als Ergebnis von logischen Methoden (`&&`, `||`, `!`) oder [Vergleichsmethoden][comparable-class] (`<`, `>`, `==`).

## _Truthy_ und _falsey_

- Wenn du keine strikten booleschen Werte verwendest, gelten die Auswertungsregeln für _truthy_ und _falsey_:

  - Nur `false` und `nil` werden als _falsey_ ausgewertet.
  - Alles andere wird als _truthy_ ausgewertet.

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
