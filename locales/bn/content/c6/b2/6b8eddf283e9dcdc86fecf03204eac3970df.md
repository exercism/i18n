# ইঙ্গিত

## সাধারণ

- Strings নিয়ে কাজ করার জন্য Kotlin অনেক [ফাংশন][ref-strings] দেয়। `Members & Extensions` ট্যাবটি দেখতে ভুলবেন না!

## 1. লগ লাইন থেকে মেসেজ বের করা

- একটি নির্দিষ্ট ডেলিমিটারের পরে `String`-এর অংশ বের করার জন্য একটি [ফাংশন][ref-string-substringAfter] আছে।
- `String` থেকে হোয়াইটস্পেস সরানো নিয়ে [Kotlin-এ একটি String থেকে সব হোয়াইটস্পেস সরানো][tutorial-trim-white-space] লেখাটিতে আলোচনা করা হয়েছে।

## 2. লগ লাইন থেকে লগ লেভেল বের করা

- একটি নির্দিষ্ট ডেলিমিটারের _আগে_ `String`-এর অংশ বের করার জন্যও একটি [ফাংশন][ref-string-substringBefore] আছে।
- একটি `String`-কে ছোট হাতের অক্ষরে পরিবর্তন করার একটি [উপায়][ref-string-lowercase] আছে।

## 3. লগ লাইন নতুন করে ফরম্যাট করা

- [স্ট্রিং টেমপ্লেট][docs-string-template] একটি [মাল্টিলাইন স্ট্রিং][docs-string-multiline] দিয়ে তৈরি করা যায়।

[docs-string-multiline]: https://kotlinlang.org/docs/strings.html#multiline-strings
[docs-string-template]: https://kotlinlang.org/docs/strings.html#string-templates
[ref-strings]: https://kotlinlang.org/api/core/kotlin-stdlib/kotlin/-string/
[ref-string-indexOf]: https://kotlinlang.org/api/core/kotlin-stdlib/kotlin/-string/#-537588047%2FFunctions%2F-1430298843
[ref-string-lowercase]: https://kotlinlang.org/api/core/kotlin-stdlib/kotlin/-string/#-648004414%2FFunctions%2F-956074838
[ref-string-substringAfter]: https://kotlinlang.org/api/core/kotlin-stdlib/kotlin/-string/#1564391517%2FFunctions%2F-1430298843
[tutorial-search-text-in-string]: https://javarevisited.blogspot.com/2016/10/how-to-check-if-string-contains-another-substring-in-java-indexof-example.html
[tutorial-trim-white-space]: https://www.baeldung.com/kotlin/string-remove-whitespace
