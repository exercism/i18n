# ইঙ্গিত

## 1. ড্রাইভিং লাইসেন্স লাগবে কি না তা নির্ধারণ করুন

- আপনার ইনপুট কোনো নির্দিষ্ট স্ট্রিংয়ের সমান কি না তা যাচাই করতে [স্ট্রিক্ট ইকুয়ালস অপারেটর][mdn-equality-operators] ব্যবহার করুন।
- বুলিয়ান কনসেপ্টে শেখা দুটি [লজিক্যাল অপারেটর][mdn-logical-operators] থেকে যেকোনো একটি ব্যবহার করে দুটি শর্ত একসাথে মেলাতে পারেন।
- এই কাজটি সমাধান করতে আপনার কোনো `if` স্টেটমেন্টের দরকার **নেই**। আপনি যে বুলিয়ান এক্সপ্রেশনটি তৈরি করবেন, সেটি সরাসরি রিটার্ন করতে পারেন।

## 2. কেনার জন্য দুটি সম্ভাব্য গাড়ির মধ্যে একটি বেছে নিন

- অভিধানের ক্রম অনুসারে কোন অপশনটি আগে আসে তা নির্ধারণ করতে একটি [রিলেশনাল অপারেটর][mdn-relational-operators] ব্যবহার করুন।
- এরপর [`if`-`else` স্টেটমেন্ট][mdn-if-statement] ব্যবহার করে ওই তুলনার ফলাফল অনুযায়ী একটি সহায়ক ভ্যারিয়েবলের মান নির্ধারণ করুন।
- সবশেষে সুপারিশের বাক্যটি তৈরি করুন। এর জন্য দুটি স্ট্রিং জোড়া লাগাতে আপনি [যোগ অপারেটর][mdn-addition] ব্যবহার করতে পারেন।

## 3. একটি ব্যবহৃত গাড়ির দামের আনুমানিক হিসাব বের করুন

- গাড়ির বয়স অনুযায়ী শতাংশ নির্ধারণ করে শুরু করুন। এটি একটি সহায়ক ভ্যারিয়েবলে সংরক্ষণ করুন। নির্দেশনায় যেমন বলা হয়েছে, তেমন একটি [`if`-`else if`-`else` স্টেটমেন্ট][mdn-if-statement] ব্যবহার করুন।
- দুটি `if` শর্তে [রিলেশনাল অপারেটর][mdn-relational-operators] ব্যবহার করে গাড়ির বয়সের সাথে সীমা মানগুলো তুলনা করুন।
- ফলাফল বের করতে মূল দামে শতাংশটি প্রয়োগ করুন। উদাহরণস্বরূপ, `30% of x` হিসাব করা যায় `30`-কে `100` দিয়ে ভাগ করে `x` দিয়ে গুণ করে।

[mdn-equality-operators]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators#equality_operators
[mdn-logical-operators]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators#binary_logical_operators
[mdn-relational-operators]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators#relational_operators
[mdn-addition]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Addition
[mdn-if-statement]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else
