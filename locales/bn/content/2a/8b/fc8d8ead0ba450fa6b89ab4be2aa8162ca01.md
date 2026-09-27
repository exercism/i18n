# ইঙ্গিত

## সাধারণ

- [csharp.net-এর তারিখ ও সময় নিয়ে টিউটোরিয়াল][csharp.net-datetimes-working-with-datetimes-time]

## 1. অ্যাপয়েন্টমেন্টের তারিখ পার্স করুন

- `DateTime` ক্লাসে একটি `string` থেকে `DateTime`-এ [পার্স করার][docs.microsoft.com_parsing-date] বেশ কয়েকটি মেথড আছে।

## 2. কোনো অ্যাপয়েন্টমেন্ট ইতিমধ্যে পেরিয়ে গেছে কি না তা যাচাই করুন

- ডিফল্ট [তুলনা অপারেটর][docs.microsoft.com_datetime-operators] ব্যবহার করে `DateTime` অবজেক্ট তুলনা করা যায়।
- বর্তমান তারিখ ও সময় পেতে একটি [প্রপার্টি][docs.microsoft.com_datetime-properties] আছে।

## 3. অ্যাপয়েন্টমেন্টটি বিকেলে কি না তা যাচাই করুন

- কোনো `DateTime` অবজেক্টের সময়ের অংশে অ্যাক্সেস করা যায় তার একটি [প্রপার্টির][docs.microsoft.com_datetime-properties] মাধ্যমে।

## 4. অ্যাপয়েন্টমেন্টের সময় ও তারিখ বর্ণনা করুন

- টেস্টগুলো এমনভাবে চলছে যেন সেগুলো যুক্তরাষ্ট্রের কোনো মেশিনে চলছে, অর্থাৎ কোনো `DateTime`-কে `string`-এ রূপান্তর করলে তারিখ ও সময় US ফরম্যাটে রিটার্ন আসবে।
- কোনো `DateTime` ইনস্ট্যান্সকে `string`-এ রূপান্তর করার সময় আপনি হয় একটি [স্ট্যান্ডার্ড ফরম্যাট স্ট্রিং][docs.microsoft.com_standard-date-and-time-format-strings], নয়তো একটি [কাস্টম ফরম্যাট স্ট্রিং][docs.microsoft.com_custom-date-and-time-format-strings] ব্যবহার করতে পারেন।

## 5. অ্যানিভার্সারির তারিখ রিটার্ন করুন

- নতুন একটি `DateTime` ইনস্ট্যান্স তৈরি করতে `DateTime`-এর বিভিন্ন [কনস্ট্রাক্টরের][constructors] একটি ব্যবহার করুন।
- বর্তমান বছর পেতে আপনি বর্তমান তারিখ-সময়ের একটি [প্রপার্টি][docs.microsoft.com_datetime-properties] ব্যবহার করতে পারেন।

[docs.microsoft.com_parsing-date]: https://docs.microsoft.com/en-us/dotnet/standard/base-types/parsing-datetime
[docs.microsoft.com_datetime-operators]: https://docs.microsoft.com/en-us/dotnet/api/system.datetime
[docs.microsoft.com_datetime-properties]: https://docs.microsoft.com/en-us/dotnet/api/system.datetime
[docs.microsoft.com_standard-date-and-time-format-strings]: https://docs.microsoft.com/en-us/dotnet/standard/base-types/standard-date-and-time-format-strings
[docs.microsoft.com_custom-date-and-time-format-strings]: https://docs.microsoft.com/en-us/dotnet/standard/base-types/custom-date-and-time-format-strings
[csharp.net-datetimes-working-with-datetimes-time]: https://csharp.net-tutorials.com/data-types/working-with-dates-time//
[constructors]: https://docs.microsoft.com/en-us/dotnet/api/system.datetime
