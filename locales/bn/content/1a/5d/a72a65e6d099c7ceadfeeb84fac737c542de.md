# ইঙ্গিত

## সাধারণ

- প্রতি দিনের পাখি গণনা `birdsPerDay` নামের একটি [ফিল্ডে][fields] সংরক্ষণ করা থাকে।
- প্রতি দিনের পাখি গণনা এমন একটি অ্যারে, যেখানে ঠিক ৭টি ইন্টিজার থাকে।

## 1. গত সপ্তাহে গণনাগুলো কী ছিল তা দেখুন

- যেহেতু এই মেথডটি চলতি সপ্তাহের গণনার উপর নির্ভর করে _না_, তাই এটিকে একটি [`static` মেথড][static-members] হিসেবে ডিফাইন করা হয়।
- [অ্যারে ডিফাইন করার কয়েকটি উপায়][single-dimensional-arrays] আছে।

## 2. আজ কতটি পাখি এসেছে তা দেখুন

- মনে রাখবেন, গণনাগুলো দিন অনুযায়ী পুরোনো থেকে সাম্প্রতিকতম ক্রমে সাজানো থাকে, যেখানে শেষ এলিমেন্টটি আজকের দিনটিকে বোঝায়।
- শেষ এলিমেন্টটি অ্যাক্সেস করা যায় হয় এর (নির্দিষ্ট) ইনডেক্স ব্যবহার করে (শূন্য থেকে গণনা শুরু করার কথা মনে রাখবেন), নয়তো [অ্যারের সাইজ][array-length] ব্যবহার করে এর ইনডেক্স হিসাব করে।

## 3. আজকের গণনা বাড়ান

- আজকের গণনা বোঝায় এমন এলিমেন্টে আজকের গণনার সাথে ১ যোগ করে বসান।

## 4. কোনো দিন পাখি না আসার ঘটনা ছিল কি না তা দেখুন

- `Array` ক্লাসে একটি [বিল্ট-ইন মেথড][array-indexof] আছে, যেটি এলিমেন্টটি যে ইনডেক্সে পাওয়া যায় সেটি রিটার্ন করে, আর কোনো মিলে যাওয়া এলিমেন্ট না পাওয়া গেলে -1 রিটার্ন করে।

## 5. প্রথম কয়েক দিনে কতটি পাখি এসেছে তার সংখ্যা হিসাব করুন

- আসা পাখির সংখ্যা ধরে রাখতে একটি ভ্যারিয়েবল ব্যবহার করা যায়।
- একটি [`for` লুপ][for-statement] ব্যবহার করে অ্যারের উপর ইটারেশন করা যায়।
- লুপের ভিতরে ভ্যারিয়েবলটি আপডেট করা যায়।
- মনে রাখবেন: অ্যারের ইনডেক্স গণনা শুরু হয় `0` থেকে।

## 6. ব্যস্ত দিনের সংখ্যা হিসাব করুন

- ব্যস্ত দিনের সংখ্যা ধরে রাখতে একটি ভ্যারিয়েবল ব্যবহার করা যায়।
- একটি [`foreach` লুপ][array-foreach] ব্যবহার করে অ্যারের উপর ইটারেশন করা যায়।
- লুপের ভিতরে ভ্যারিয়েবলটি আপডেট করা যায়।
- লুপের ভিতরে একটি [শর্তসাপেক্ষ স্টেটমেন্ট][if-statement] ব্যবহার করা যায়।

[array-foreach]: https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/arrays/using-foreach-with-arrays
[single-dimensional-arrays]: https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/arrays/single-dimensional-arrays
[fields]: https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/fields
[static-members]: https://www.oreilly.com/library/view/programming-c/0596001177/ch04s03.html
[array-indexof]: https://docs.microsoft.com/en-us/dotnet/api/system.array.indexof
[if-statement]: https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/if-else
[array-length]: https://docs.microsoft.com/en-us/dotnet/api/system.array.length
[for-statement]: https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/for
