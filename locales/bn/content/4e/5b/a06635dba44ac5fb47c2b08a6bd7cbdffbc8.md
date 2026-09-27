# পরিচিতি

অ্যারে নিয়ে কাজ করার সময়, আপনি অনেক সময় অ্যারের প্রতিটি মানের জন্য কোড চালাতে চান। এটাকেই অ্যারের উপর ইটারেশন বা লুপিং বলা হয়।

এখানে আমরা সেই ক্ষেত্রে দেখব, যেখানে আপনি এই প্রক্রিয়ায় অ্যারেটি পরিবর্তন করতে চান না। অ্যারে রূপান্তরের জন্য বরং [অ্যারে ট্রান্সফরমেশন কনসেপ্ট][concept-array-transformations] দেখুন।

## `for` লুপ

অ্যারের উপর ইটারেট করার সবচেয়ে মৌলিক উপায় হলো একটি `for` লুপ ব্যবহার করা, দেখুন [ফর লুপ কনসেপ্ট][concept-for-loops]।

```javascript
const numbers = [6.0221515, 10, 23];

for (let i = 0; i < numbers.length; i++) {
  console.log(numbers[i]);
}
// => 6.0221515
// => 10
// => 23
```

## `for...of` লুপ

যখন আপনি প্রতিটি ইটারেশনে সরাসরি মানটি নিয়ে কাজ করতে চান এবং ইনডেক্সের একেবারেই প্রয়োজন হয় না, তখন আপনি একটি `for...of` লুপ ব্যবহার করতে পারেন।

`for...of` উপরে দেখানো সাধারণ `for` লুপের মতোই কাজ করে, তবে লুপে একটি ভ্যারিয়েবল হিসেবে _ইনডেক্স_ নিয়ে ভাবতে না হয়ে বরং আপনাকে সরাসরি _মান_ দেওয়া হয়।

```javascript
const numbers = [6.0221515, 10, 23];

// Because re-assigning number inside the loop will be very
// confusing, disallowing that via const is preferable.
for (const number of numbers) {
  console.log(number);
}
// => 6.0221515
// => 10
// => 23
```

সাধারণ `for` লুপের মতোই, আপনি `continue` দিয়ে বর্তমান ইটারেশন থামাতে পারেন এবং `break` দিয়ে লুপের সম্পাদন পুরোপুরি থামাতে পারেন।

## `forEach` মেথড

প্রতিটি অ্যারেতে একটি `forEach` মেথড থাকে, যা অ্যারের এলিমেন্টগুলোর উপর লুপ করতে ব্যবহার করা যায়।

`forEach` একটি প্যারামিটার হিসেবে [কলব্যাক][concept-callbacks] গ্রহণ করে। অ্যারের প্রতিটি এলিমেন্টের জন্য কলব্যাক ফাংশনটি একবার করে কল করা হয়। কলব্যাকটিকে আর্গুমেন্ট হিসেবে বর্তমান এলিমেন্ট, তার ইনডেক্স এবং সম্পূর্ণ অ্যারে দেওয়া হয়। অনেক সময় শুধু বর্তমান এলিমেন্ট বা ইনডেক্সই ব্যবহার করা হয়।

```javascript
const numbers = [6.0221515, 10, 23];

numbers.forEach((number, index) => console.log(number, index));
// => 6.0221515 0
// => 10 1
// => 23 2
```

`forEach` লুপ শুরু হয়ে গেলে ইটারেশন থামানোর কোনো উপায় নেই। এই প্রসঙ্গে `break` ও `continue` স্টেটমেন্টের অস্তিত্ব নেই।

[concept-array-transformations]: /tracks/javascript/concepts/array-transformations
[concept-for-loops]: /tracks/javascript/concepts/for-loops
[concept-callbacks]: /tracks/javascript/concepts/callbacks
