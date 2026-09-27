# ইঙ্গিত

## 1. অনুমোদন ডিফাইন করুন

- প্রযোজনীয় অপশনগুলোর জন্য কনস্ট্রাক্টর দিয়ে `Approval` নামের একটি [অ্যালজেব্রাইক ডেটা টাইপ ডিফাইন করুন][ADT]।

## 2. খাবারের ধরন ডিফাইন করুন

- প্রযোজনীয় অপশনগুলোর জন্য কনস্ট্রাক্টর দিয়ে `Cuisine` নামের একটি [অ্যালজেব্রাইক ডেটা টাইপ ডিফাইন করুন][ADT]।

## 3. সিনেমার জনরা ডিফাইন করুন

- প্রযোজনীয় অপশনগুলোর জন্য কনস্ট্রাক্টর দিয়ে `Genre` নামের একটি [অ্যালজেব্রাইক ডেটা টাইপ ডিফাইন করুন][ADT]।

## 4. অ্যাক্টিভিটি ডিফাইন করুন

- ভিন্ন ভিন্ন অ্যাক্টিভিটি এনক্যাপসুলেট করতে [সংযুক্ত ডেটাসহ একটি অ্যালজেব্রাইক ডেটা টাইপ ডিফাইন করুন][ADT-with-data]।

## 5. অ্যাক্টিভিটি রেট করুন

- অ্যাক্টিভিটির মানের উপর ভিত্তি করে লজিক চালানোর সবচেয়ে ভালো উপায় হলো [কেস এক্সপ্রেশন][case-expression] ব্যবহার করা।
- অ্যালজেব্রাইক ডেটা টাইপের কোনো কেস প্যাটার্ন ম্যাচ করলে তার সংযুক্ত ডেটায় অ্যাক্সেস পাওয়া যায়।
- একটি প্যাটার্নে অতিরিক্ত শর্ত যোগ করতে আপনি কেসের ভেতরে একটি [গার্ড][guards] ব্যবহার করতে পারেন।
- একটি কেসে বাকি সব সম্ভাব্য মান ধরতে চাইলে আপনি ওয়াইল্ডকার্ড প্যাটার্ন `_` ব্যবহার করতে পারেন।

[ADT]: https://www.schoolofhaskell.com/school/starting-with-haskell/introduction-to-haskell/2-algebraic-data-types#enumeration-types
[ADT-with-data]: https://www.schoolofhaskell.com/school/starting-with-haskell/introduction-to-haskell/2-algebraic-data-types#beyond-enumerations
[case-expression]: https://www.schoolofhaskell.com/school/starting-with-haskell/introduction-to-haskell/2-algebraic-data-types#case-expessions
[guards]: https://learnyouahaskell.github.io/syntax-in-functions.html#guards-guards
