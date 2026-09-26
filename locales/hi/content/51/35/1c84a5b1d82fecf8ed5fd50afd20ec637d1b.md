# परिचय

## सही, गलत

- `true` और `false` का उपयोग बूलियन तार्किक स्थितियों को दर्शाने के लिए किया जाता है।
  - ये [`TrueClass`][true-class] और [`FalseClass`][false-class] ऑब्जेक्ट के एकमात्र इंस्टेंस हैं।
  - ये कोड में लिटरल के रूप में आ सकते हैं, या तार्किक (`&&`, `||`, `!`) या [तुलना][comparable-class] (`<`, `>`, `==`) मेथड के परिणाम के रूप में।

## _ट्रुथी_ और _फॉल्सी_

- जब सख्त बूलियन वैल्यू का उपयोग नहीं किया जाता, तो _ट्रुथी_ और _फॉल्सी_ मूल्यांकन नियम लागू होते हैं:

  - केवल `false` और `nil` ही _फॉल्सी_ माने जाते हैं।
  - बाकी सब कुछ _ट्रुथी_ माना जाता है।

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
