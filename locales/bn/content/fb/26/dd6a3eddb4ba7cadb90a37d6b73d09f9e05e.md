# Instructions append

## Arturo-এর নির্দেশাবলি

এই অনুশীলনীর জন্য, আপনাকে `stringify` ওয়ার্ডটি কল করার দুটি ভিন্ন উপায় সমর্থন করতে হবে:

1. `roman` অ্যাট্রিবিউটসহ (যেমন `stringify.roman 3999`)
2. `roman` অ্যাট্রিবিউট ছাড়া (যেমন `stringify 3999`)

আরও তথ্যের জন্য, [অ্যাট্রিবিউট][attributes] ডকুমেন্টেশন এবং [`attr`][attr] ডকুমেন্টেশন দেখুন।

~~~~exercism/caution
`attr` ছাড়াও, `attrs` ফাংশনটি দরকারী: এটি ফাংশন কলের সব অ্যাট্রিবিউট একটি ডিকশনারি হিসেবে রিটার্ন করে।

সাবধান থাকুন, এই দুটি ফাংশন ধ্বংসাত্মক!

Arturo-এর ইমপ্লিমেন্টেশন একটি ["অ্যাট্রিবিউট টেবিল"][createAttrsStack] ব্যবহার করে।

* `attrs` অ্যাট্রিবিউটগুলো রিট্রিভ করার পরে [স্পষ্টভাবে টেবিলটি খালি করে][getAttrsDict]।
* `attr` [টেবিল থেকে অ্যাট্রিবিউটটি সরিয়ে ফেলে ("পপ" করে)][builtinAttr]।

একটি উদাহরণ:

```arturo
showAttributes: function [x][
    print attr 'question
    print attrs
    print attrs
]

showAttributes .question:"6 * 9" .answer:42 'arg
```
আউটপুট দেয়
```
6 * 9
[answer:42]
[]
```

প্রতিটি ধাপে আমরা অ্যাট্রিবিউট ডিকশনারিটি ছোট হয়ে যেতে দেখি।

**উপসংহার**: মনে রাখবেন, আপনি অ্যাট্রিবিউট শুধু একবারই ফেচ করতে পারেন।
যদি আবার অ্যাট্রিবিউট রেফার করতে হয়, তাহলে ফাংশনগুলোর শুরুতে সেগুলো ক্যাপচার করে রাখুন।

[getAttrsDict]: https://github.com/arturo-lang/arturo/blob/2ef0081570feb6ab752404c32bbf85132df379fb/src/vm/stack.nim#L187
[builtinAttr]: https://github.com/arturo-lang/arturo/blob/2ef0081570feb6ab752404c32bbf85132df379fb/src/library/Reflection.nim#L85
[createAttrsStack]: https://github.com/arturo-lang/arturo/blob/2ef0081570feb6ab752404c32bbf85132df379fb/src/vm/stack.nim#L136
~~~~

[attributes]: https://arturo-lang.io/documentation/language/#attributes
[attr]: https://arturo-lang.io/documentation/library/reflection/attr/
