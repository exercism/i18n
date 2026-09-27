# নির্দেশনা

এই অনুশীলনীতে আপনি একটি সাধারণ ইন্টিজার ক্যালকুলেটরের জন্য এরর হ্যান্ডলিং তৈরি করবেন। বিষয়টি সহজ করতে, যোগ, গুণ ও ভাগ হিসাব করার জন্য মেথড দেওয়া হয়েছে।

লক্ষ্য হলো কাজ করে এমন একটি ক্যালকুলেটর তৈরি করা, যা `16`, `51` এবং `+` আর্গুমেন্ট দিলে নিম্নলিখিত প্যাটার্নের একটি স্ট্রিং রিটার্ন করে: `16 + 51 = 67`.

```csharp
SimpleCalculator.Calculate(16, 51, "+"); // => returns "16 + 51 = 67"

SimpleCalculator.Calculate(32, 6, "*"); // => returns "32 * 6 = 192"

SimpleCalculator.Calculate(512, 4, "/"); // => returns "512 / 4 = 128"
```

## 1. ক্যালকুলেটরের অপারেশনগুলো বাস্তবায়ন করুন

এই কাজে বাস্তবায়নের মূল মেথডটি হবে (_static_) `SimpleCalculator.Calculate()` মেথড। এটি তিনটি আর্গুমেন্ট নেয়। প্রথম দুটি আর্গুমেন্ট হলো ইন্টিজার সংখ্যা, যেগুলোর উপর একটি অপারেশন চালানো হবে। তৃতীয় আর্গুমেন্টটি স্ট্রিং টাইপের, এবং এই অনুশীলনীতে নিচের অপারেশনগুলো বাস্তবায়ন করা প্রয়োজন:

- `+` স্ট্রিং ব্যবহার করে যোগ
- `*` স্ট্রিং ব্যবহার করে গুণ
- `/` স্ট্রিং ব্যবহার করে ভাগ

## 2. অবৈধ অপারেশন হ্যান্ডল করুন

অন্য যেকোনো অপারেশন চিহ্ন `ArgumentOutOfRangeException` এক্সেপশন থ্রো করবে। যদি অপারেশন আর্গুমেন্টটি একটি খালি স্ট্রিং হয়, তাহলে মেথডটি `ArgumentException` এক্সেপশন থ্রো করবে। যখন অপারেশন আর্গুমেন্ট হিসেবে `null` দেওয়া হয়, তখন মেথডটি `ArgumentNullException` এক্সেপশন থ্রো করবে।

```csharp
SimpleCalculator.Calculate(100, 10, "-"); // => throws ArgumentOutOfRangeException

SimpleCalculator.Calculate(8, 2, ""); // => throws ArgumentException

SimpleCalculator.Calculate(58, 6, null); // => throws ArgumentNullException
```

## 3. শূন্য দিয়ে ভাগ করার সময় এরর হ্যান্ডল করুন

`0` দিয়ে ভাগ করার চেষ্টা করলে ক্যালকুলেটরটি `Division by zero is not allowed.` লেখা একটি স্ট্রিং রিটার্ন করবে। অন্য কোনো এক্সেপশন `SimpleCalculator.Calculate()` মেথড হ্যান্ডল করবে না।

```csharp
SimpleCalculator.Calculate(512, 0, "/"); // => returns "Division by zero is not allowed."
```
