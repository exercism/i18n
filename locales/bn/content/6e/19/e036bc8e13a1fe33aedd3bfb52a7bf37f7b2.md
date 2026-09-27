# ভূমিকা

## অপশন

`Option` টাইপ এমন মান প্রকাশ করতে ব্যবহার করা হয়, যেগুলো হয় অনুপস্থিত, নয়তো উপস্থিত থাকে।

এটি `gleam/option` মডিউলে এভাবে ডিফাইন করা আছে:

```gleam
type Option(a) {
  Some(a)
  None
}
```

কোনো মান উপস্থিত থাকলে সেটি মুড়ে দিতে `Some` কনস্ট্রাক্টর ব্যবহার করা হয়, আর মানের অনুপস্থিতি বোঝাতে `None` কনস্ট্রাক্টর ব্যবহার করা হয়।

`Option`-এর ভেতরের কনটেন্ট অ্যাক্সেস করতে প্রায়ই প্যাটার্ন ম্যাচিং ব্যবহার করা হয়।

```gleam
import gleam/option.{type Option, None, Some}

pub fn say_hello(person: Option(String)) -> String {
  case person {
    Some(name) -> "Hello, " <> name <> "!"
    None -> "Hello, Friend!"
  }
}
```

```gleam
say_hello(Some("Matthieu"))
// -> "Hello, Matthieu!"

say_hello(None)
// -> "Hello, Friend!"
```

`gleam/option` মডিউলে `Option` টাইপ নিয়ে কাজ করার জন্য আরও কিছু দরকারি ফাংশন ডিফাইন করা আছে, যেমন `unwrap`, যা `Option`-এর কনটেন্ট রিটার্ন করে, আর মানটি `None` হলে একটি ডিফল্ট মান রিটার্ন করে।

```gleam
import gleam/option.{type Option}

pub fn say_hello_again(person: Option(String)) -> String {
  let name = option.unwrap(person, "Friend")
  "Hello, " <> name <> "!"
}
```
