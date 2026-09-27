# ইঙ্গিত

## 1. স্পেসগুলো আন্ডারস্কোর দিয়ে প্রতিস্থাপন করুন

- [এই টিউটোরিয়ালটি][chars-tutorial] কাজে আসবে।
- `char`-এর [রেফারেন্স ডকুমেন্টেশন][chars-docs] এখানে রয়েছে।
- অ্যারে থেকে এলিমেন্ট যেভাবে বের করা যায়, ঠিক একইভাবে স্ট্রিং থেকেও `char` বের করতে পারেন।
- আউটপুট স্ট্রিং তৈরি করতে [`StringBuilder`][string-builder] ব্যবহার করা উচিত।
- স্পেস শনাক্ত করতে [এই মেথডটি][iswhitespace] দেখুন। মনে রাখবেন, এটি একটি static মেথড।
- `char` লিটারেল একক কোটেশনের ভেতরে লেখা হয়।

## 2. কন্ট্রোল ক্যারেক্টারকে বড় হাতের "CTRL" স্ট্রিং দিয়ে প্রতিস্থাপন করুন

- কোনো ক্যারেক্টার কন্ট্রোল ক্যারেক্টার কি না তা যাচাই করতে [এই মেথডটি][iscontrol] দেখুন।

## 3. কেবাব-কেস থেকে ক্যামেল-কেসে রূপান্তর করুন

- কোনো ক্যারেক্টারকে বড় হাতের অক্ষরে রূপান্তর করতে [এই মেথডটি][toupper] দেখুন।

## 4. গ্রিক ছোট হাতের অক্ষর বাদ দিন

- `char` ডিফল্ট সমতা ও তুলনার অপারেটর সাপোর্ট করে।

[chars-docs]: https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/char
[chars-tutorial]: https://csharp.net-tutorials.com/data-types/the-char-type/
[string-builder]: https://docs.microsoft.com/en-us/dotnet/api/system.text.stringbuilder
[iswhitespace]: https://docs.microsoft.com/en-us/dotnet/api/system.char.iswhitespace
[iscontrol]: https://docs.microsoft.com/en-us/dotnet/api/system.char.iscontrol
[toupper]: https://docs.microsoft.com/en-us/dotnet/api/system.char.toupper
[equality]: https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/operators/equality-operators
[comparison]: https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/operators/comparison-operators
