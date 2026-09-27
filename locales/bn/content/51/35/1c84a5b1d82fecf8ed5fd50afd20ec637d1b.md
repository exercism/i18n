# পরিচিতি

## ট্রু, ফলস

- `true` ও `false` দিয়ে বুলিয়ান লজিক্যাল অবস্থা বোঝানো হয়।
  - এগুলো [`TrueClass`][true-class] ও [`FalseClass`][false-class] অবজেক্টের সিঙ্গলটন ইনস্ট্যান্স।
  - এগুলো কোডে লিটারাল হিসেবে থাকতে পারে, আবার লজিক্যাল (`&&`, `||`, `!`) বা [তুলনার][comparable-class] (`<`, `>`, `==`) মেথডের ফলাফল হিসেবেও আসতে পারে।

## _ট্রুথি_ ও _ফলসি_

- কঠোর বুলিয়ান মান ব্যবহার না করলে _ট্রুথি_ ও _ফলসি_ ইভ্যালুয়েশনের নিয়ম প্রযোজ্য হয়:

  - শুধু `false` ও `nil`-ই _ফলসি_ হিসেবে ইভ্যালুয়েট হয়।
  - বাকি সবকিছু _ট্রুথি_ হিসেবে ইভ্যালুয়েট হয়।

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
