# Σχετικά

## True, False

- Τα `true` και `false` χρησιμοποιούνται για να αναπαραστήσουν τις Boolean (λογική τιμή) καταστάσεις.
  - Είναι στιγμιότυπα singleton των αντικειμένων [`TrueClass`][true-class] και [`FalseClass`][false-class].
  - μπορούν να εμφανιστούν ως literal στον κώδικα ή ως αποτέλεσμα λογικών (`&&`, `||`, `!`) ή [συγκριτικών][comparable-class] (`<`, `>`, `==`) μεθόδων.

## _Truthy_ και _falsey_

- Όταν δεν χρησιμοποιείς αυστηρές Boolean τιμές, εφαρμόζονται οι κανόνες αξιολόγησης _truthy_ και _falsey_:

  - Μόνο το `false` και το `nil` αξιολογούνται ως _falsey_.
  - Οτιδήποτε άλλο αξιολογείται ως _truthy_.

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
