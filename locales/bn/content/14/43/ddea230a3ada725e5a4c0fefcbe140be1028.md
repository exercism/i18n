# নির্দেশনার পরিশিষ্ট

## বিষয়

এই সমস্যাটি সমাধানের সময় Rust-এর যে বিষয়গুলো নিয়ে পড়তে চাইতে পারেন:

- Trait, অর্থাৎ From trait এবং [নিজের trait তৈরি করা](https://doc.rust-lang.org/book/ch10-02-traits.html)
- trait-এর জন্য [ডিফল্ট মেথড ইমপ্লিমেন্টেশন](https://doc.rust-lang.org/book/ch10-02-traits.html#default-implementations)
- ম্যাক্রো। এই অনুশীলনীতে একটি ম্যাক্রো ব্যবহার করলে বয়লারপ্লেট কমতে পারে আর পড়ার সহজতাও বাড়তে পারে। যেমন,
  [একটি ম্যাক্রো একসাথে একাধিক টাইপের জন্য একটি trait ইমপ্লিমেন্ট করতে পারে](https://stackoverflow.com/questions/39150216/implementing-a-trait-for-multiple-types-at-once),
  যদিও `years_during`-কে Planet trait-এর মধ্যেই ইমপ্লিমেন্ট করা ঠিক আছে। একটি ম্যাক্রো
  struct এবং তাদের ইমপ্লিমেন্টেশন দুটোই ডিফাইন করতে পারে। ম্যাক্রো শুরু করার তথ্য
  পাবেন এখানে:

  - [The Rust Programming Language-এর Macros অধ্যায়](https://doc.rust-lang.org/stable/book/ch19-06-macros.html)
  - [সহায়ক বিস্তারিতসহ Macros অধ্যায়ের একটি পুরনো সংস্করণ](https://doc.rust-lang.org/1.30.0/book/first-edition/macros.html)
  - [Rust By Example](https://doc.rust-lang.org/stable/rust-by-example/macros.html)
