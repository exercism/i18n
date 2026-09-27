# পরিচিতি

TypeScript হলো টাইপের জন্য সিনট্যাক্স-সহ JavaScript, যা এটিকে একটি স্ট্রংলি টাইপড প্রোগ্রামিং ভাষা করে তোলে। এটি অবজেক্ট-ওরিয়েন্টেড, ইম্পারেটিভ এবং ডিক্লারেটিভ (যেমন ফাংশনাল প্রোগ্রামিং) স্টাইল সমর্থন করে এবং যেকোনো আকারে আপনাকে আরও ভালো টুলিং দেয়।
এতে কয়েকটি [প্রিমিটিভ][mdn-primitive] আছে, আর বাকি সবকিছুই অবজেক্ট হিসেবে ধরা হয়।

JavaScript ওয়েব পেজের স্ক্রিপ্টিং ভাষা হিসেবে সবচেয়ে বেশি পরিচিত হলেও, Node.js-এর মতো অনেক নন-ব্রাউজার পরিবেশও এটি ব্যবহার করে।
ভাষাটি সক্রিয়ভাবে বিকশিত হচ্ছে; আর এর মাল্টি-প্যারাডাইম বৈশিষ্ট্যের কারণে এটি অনেক ধরনের প্রোগ্রামিং স্টাইলের সুযোগ দেয়।

TypeScript এর উপরে তৈরি এবং এটিও সক্রিয়ভাবে বিকশিত হচ্ছে।
২০২৩ সালের কিছু র‍্যাংকিংয়ে দৈনন্দিন ব্যবহারে এটি JavaScript-এর চেয়ে বেশি জনপ্রিয়।

যেহেতু [JavaScript না শিখে TypeScript শেখা যায় না][handbook-js-or-ts], এই ট্র্যাকের কিছু অংশ JavaScript ধারণা শেখানোর দিকে মনোযোগী, আর কিছু ধারণা শুধু TypeScript-এর নিজস্ব বৈশিষ্ট্য নিয়ে আলোচনা করে।

## (পুনরায়) অ্যাসাইনমেন্ট

TypeScript-এ নামের সাথে মান অ্যাসাইন করার কয়েকটি প্রধান উপায় আছে: ভ্যারিয়েবল বা কনস্ট্যান্ট ব্যবহার করা।
Exercism-এ ভ্যারিয়েবল সবসময় [camelCase][wiki-camel-case] আকারে লেখা হয়; আর কনস্ট্যান্ট লেখা হয় [SCREAMING_SNAKE_CASE][wiki-snake-case] আকারে।
এটি অনুসরণ করার মতো কোনো অফিসিয়াল গাইড নেই, আর বিভিন্ন প্রতিষ্ঠান ও সংস্থার স্টাইল গাইড আলাদা আলাদা।
_ভ্যারিয়েবল আপনার ইচ্ছেমতো যেভাবেই লিখতে পারেন_।
অনুশীলনীগুলো যেভাবে প্রস্তুত করা হয়েছে সেভাবে লিখলে সুবিধা হলো, ওয়েব ইন্টারফেস ও বেশিরভাগ IDE-তে এগুলো আলাদাভাবে হাইলাইট হবে।

TypeScript-এ [`const`][mdn-const], [`let`][mdn-let] বা [`var`][mdn-var] কিওয়ার্ড দিয়ে ভ্যারিয়েবল ডিফাইন করা যায়।

`let` বা `var` ব্যবহার করলে একটি ভ্যারিয়েবল তার জীবনকালে ভিন্ন ভিন্ন মান নির্দেশ করতে পারে।
যেমন, অ্যাসাইনমেন্ট অপারেটর `=` ব্যবহার করে `myFirstVariable` অনেকবার ডিফাইন ও পুনরায় ডিফাইন করা যায়:

```typescript
let myFirstVariable = 1
myFirstVariable = 'Some string'
myFirstVariable = new SomeComplexClass()
```

`let` ও `var`-এর বিপরীতে, `const` দিয়ে ডিফাইন করা ভ্যারিয়েবলে কেবল একবারই মান অ্যাসাইন করা যায়।
TypeScript-এ কনস্ট্যান্ট ডিফাইন করতে এটি ব্যবহার করা হয়।

```typescript
const MY_FIRST_CONSTANT = 10

// Can not be re-assigned.
MY_FIRST_CONSTANT = 20
// => TypeError: Assignment to constant variable.
```

যেহেতু TypeScript এটি স্ট্যাটিকভাবে শনাক্ত করতে পারে, TypeScript কম্পাইলারও একটি এরর দেবে:

```typescript
// ^? Cannot assign to 'MY_FIRST_CONSTANT' because it is a constant.(2588)
```

এর মানে হলো, `TypeError` শনাক্ত করতে আপনার কোড রান করার প্রয়োজন নেই।

<!--prettier-ignore -->
~~~~exercism/note
💡 পরবর্তী একটি শেখার অনুশীলনীতে _কনস্ট্যান্ট_ অ্যাসাইনমেন্ট / বাইন্ডিং আর _কনস্ট্যান্ট_ মানের মধ্যে পার্থক্য নিয়ে আলোচনা ও ব্যাখ্যা করা হবে।
~~~~

## টাইপ ইনফারেন্স

[টাইপ ইনফারেন্স][handbook-type-inference] বিষয়ে খুব গভীরে না গিয়েও আপনার জানা উচিত, একটি অ্যাসাইন করা ভ্যারিয়েবলের সাধারণত একটি ইনফার্ড টাইপ থাকে, এমনকি টাইপ অ্যানোটেশন ছাড়াও।

```typescript
const MY_FIRST_CONSTANT = 10
// ^? const MY_FIRST_CONSTANT: number
```

এরপর পুরো কোডে এই টাইপটিই প্রয়োগ করা হয়।
এর মানে আরও হলো, নিচের কোডটি যেখানে বৈধ JavaScript:

```javascript
let myFirstVariable = 1
myFirstVariable = 'Some string'
```

TypeScript-এ এটি ব্যবহার করলে এরর দেয়:

```typescript
let myFirstVariable = 1
myFirstVariable = 'Some string'
// ^? Type 'string' is not assignable to type 'number'.(2322)
```

এই বৈশিষ্ট্যটি টাইপ অ্যানোটেশন ব্যবহার না করলেও টাইপ-সেফটি নিশ্চিত করে।

### কনস্ট্যান্ট অ্যাসাইনমেন্ট

`const` কিওয়ার্ডটি ভ্যারিয়েবল ও কনস্ট্যান্ট _দুটোর_ ক্ষেত্রেই উল্লেখ করা হয়।
কনস্ট্যান্ট নিয়ে প্রায়ই আরেকটি ধারণার কথা আসে, তা হলো [(অ-)পরিবর্তনশীলতা][wiki-mutability]।

`const` কিওয়ার্ডটি কেবল _বাইন্ডিংটিকে_ অপরিবর্তনীয় করে, অর্থাৎ একটি `const` ভ্যারিয়েবলে আপনি কেবল একবারই একটি মান অ্যাসাইন করতে পারেন।
TypeScript-এ কেবল [প্রিমিটিভ][mdn-primitive] মানই অপরিবর্তনীয়।
তবে [নন-প্রিমিটিভ][mdn-primitive] মান এখনও পরিবর্তন করা যায়।

```typescript
const MY_MUTABLE_VALUE_CONSTANT = { food: 'apple' }

// This is possible
MY_MUTABLE_VALUE_CONSTANT.food = 'pear'

MY_MUTABLE_VALUE_CONSTANT
// => { food: "pear" }
```

### কনস্ট্যান্ট মান (অপরিবর্তনীয়তা)

সাধারণ নিয়ম হিসেবে, Exercism-এ এবং আরও অনেক প্রতিষ্ঠান ও প্রকল্পের স্টাইল গাইডে, `const SCREAMING_SNAKE_CASE`-এর মতো দেখতে মান পরিবর্তন করা হয় না।
টেকনিক্যালি মানগুলো _পরিবর্তন করা যায়_, কিন্তু স্পষ্টতা ও প্রত্যাশা বজায় রাখার জন্য Exercism-এ এটি নিরুৎসাহিত করা হয়।
যখন এটি _অবশ্যই_ প্রয়োগ করতে হবে, তখন [`Object.freeze(value)`][mdn-object-freeze] ব্যবহার করুন।

যেখানে সম্ভব, স্ট্যাটিকভাবে অপরিবর্তনীয়তা প্রয়োগ করতে TypeScript-এর `readonly` কিওয়ার্ড, `as const`, অথবা `Readonly<T>` জেনেরিক টাইপ ব্যবহার করা যায়।
এই বিষয়ে আপনি পরে আরও শিখবেন।

```typescript
const MY_VALUE_CONSTANT = Object.freeze({ food: 'apple' })

MY_VALUE_CONSTANT.food = 'pear'
// ^? Cannot assign to 'food' because it is a read-only property.(2540)

MY_VALUE_CONSTANT
// => { food: "apple" }
```

বাস্তব জগতে পুরো কোডবেস জুড়ে `Object.freeze` দেখা যায় না, তবে `SCREAMING_SNAKE_CASE` মান কখনও পরিবর্তন না করার নিয়মটি ভালো একটি নিয়ম; প্রায়ই লিন্টারের মতো স্বয়ংক্রিয় বিশ্লেষণ দিয়ে এটি প্রয়োগ করা হয়।

## ফাংশন ডিক্লারেশন

TypeScript-এ কার্যকারিতার এককগুলো _ফাংশনে_ মোড়া থাকে, আর যদি ফাংশনগুলো একসাথে থাকার মতো হয় তবে সাধারণত সেগুলো একই ফাইলে রাখা হয়।
এই ফাংশনগুলো প্যারামিটার (আর্গুমেন্ট) নিতে পারে এবং `return` কিওয়ার্ড দিয়ে একটি মান _রিটার্ন_ করতে পারে।
ফাংশন `()` সিনট্যাক্স দিয়ে কল করা হয়।

```typescript
function add(num1: number, num2: number): number {
  return num1 + num2
}

add(1, 3)
// => 4
```

ফাংশনের প্যারামিটার সাধারণত কোলন (`:`) দিয়ে তারপর টাইপ লিখে অ্যানোটেট করা উচিত।
ফাংশনের রিটার্ন ভ্যালু প্যারামিটার তালিকা বন্ধ করার পরে কোলন (`:`) দিয়ে তারপর টাইপ লিখে অ্যানোটেট করা যায়।

কোনো ফাংশনের রিটার্ন ভ্যালুর জন্য টাইপ অ্যানোটেশন না থাকলে, টাইপটি ইনফার করা হবে।

```typescript
function add(num1: number, num2: number) {
  return num1 + num2
}

add(1, 3)
// ^? function add(num1: number, num2: number): number
```

এখানে রিটার্ন টাইপটি ইনফার করা হয়েছে কারণ TypeScript জানে যে `number + number`-এর ফলাফল সবসময় `number`-ই হতে হবে।

<!--prettier-ignore -->
~~~~exercism/note
💡 TypeScript-এ ফাংশন ডিক্লার করার _অনেক_ ভিন্ন উপায় আছে।
এই অন্য উপায়গুলো `function` কিওয়ার্ড ব্যবহারের চেয়ে ভিন্ন দেখায়।
ট্র্যাকটি ধীরে ধীরে সেগুলো পরিচয় করাতে চেষ্টা করে, তবে আপনি যদি ইতিমধ্যে সেগুলো জানেন, তবে যেকোনোটি নির্দ্বিধায় ব্যবহার করতে পারেন।
বেশিরভাগ ক্ষেত্রেই একটা বা অন্যটা ব্যবহার করা ভালো বা খারাপ কিছু নয়।
~~~~

## টাইপ অ্যানোটেশন

`add`-এর ফাংশন ডিক্লারেশনে যেমন দেখানো হয়েছে, প্যারামিটারগুলোর একটি স্পষ্ট টাইপ অ্যানোটেশন `: number` আছে।
ভ্যারিয়েবল ডিক্লারেশন, ক্লাস প্রপার্টি, ফাংশন ডিক্লারেশন এবং আরও অনেক কিছুই টাইপ অ্যানোটেশন সমর্থন করে।

স্পষ্ট টাইপ অ্যানোটেশন এবং ইনফার্ড টাইপ, দুটোই টাইপ-চেকার দ্বারা প্রয়োগ করা হয়।

```typescript
add('foo', 3)
// ^? Argument of type 'string' is not assignable to parameter of type 'number'.(2345)
```

TypeScript যদি কোনো স্পষ্ট টাইপ অ্যানোটেশন না পায় এবং টাইপ ইনফার করতে না পারে, তবে এটি `any` টাইপ অ্যাসাইন করবে, যা [আপনার ব্যবহার করা উচিত নয়][handbook-dont-use-any]।
পরে আপনি `unknown` টাইপ সম্পর্কে একটি ভালো বিকল্প হিসেবে শিখবেন।

## এক্সপোর্ট ও ইমপোর্ট

`export` ও `import` কিওয়ার্ড দুটি শক্তিশালী টুল, যা একটি সাধারণ TypeScript ফাইলকে [TypeScript মডিউলে][mdn-module] পরিণত করে।
ফাংশন, ক্লাস, ভ্যারিয়েবল ও কনস্ট্যান্টের মতো উপাদান নির্বাচিতভাবে প্রকাশ করার সুযোগ দেওয়ার পাশাপাশি, এটি আরও একগুচ্ছ বৈশিষ্ট্য সক্ষম করে, যেমন:

- [এক্সপোর্ট ও ইমপোর্টের নাম বদলানো][mdn-renaming-modules], যা নামের সংঘর্ষ এড়াতে দেয়,
- [ডাইনামিক ইমপোর্ট][mdn-dynamic-imports], যা চাহিদা অনুযায়ী কোড লোড করে,
- [ট্রি শেকিং][blog-tree-shaking], যা সাইড-ইফেক্টমুক্ত মডিউল এবং এমনকি _যেসব মডিউলের বিষয়বস্তু ব্যবহার করা হয় না_ সেগুলো বাদ দিয়ে চূড়ান্ত কোডের আকার কমায়,
- [_লাইভ বাইন্ডিং_][blog-live-bindings] এক্সপোর্ট করা, যা এমন একটি মান এক্সপোর্ট করতে দেয় যা মূল মান পরিবর্তিত হলে যেখানেই ইমপোর্ট করা হয়েছে সেখানেই পরিবর্তিত হয়।

একটি বাস্তব উদাহরণ হলো Exercism-এর TypeScript ট্র্যাকে টেস্টগুলো যেভাবে কাজ করে।
প্রতিটি অনুশীলনীতে অন্তত একটি ইমপ্লিমেন্টেশন ফাইল থাকে, যেমন `lasagna.ts`, এবং প্রতিটি অনুশীলনীতে অন্তত একটি টেস্ট ফাইল থাকে, যেমন `lasagna.test.ts`।
ইমপ্লিমেন্টেশন ফাইলটি পাবলিক API প্রকাশ করতে `export` ব্যবহার করে আর টেস্ট ফাইলটি এগুলো ব্যবহার করতে `import` ব্যবহার করে, এভাবেই এটি ইমপ্লিমেন্টেশনের ফলাফল টেস্ট করতে পারে।

```typescript
// file.js
export const MY_VALUE = 10

export function add(num1, num2) {
  return num1 + num2
}

// file.spec.js
import { MY_VALUE, add } from './file.js'

add(MY_VALUE, 5)
// => 15
```

<!--prettier-ignore -->
~~~~exercism/advanced
যেহেতু TypeScript কম্পাইলার _ইমপোর্ট পাথ পুনরায় লেখে না_, তাই ইমপোর্টগুলো `.js` এক্সটেনশন দিয়ে লেখা উচিত (কারণ ট্রান্সপাইলেশনের পর এটিই হয়ে যায়)।
তবে `allowImportingTsExtensions` অপশনটি চালু আছে কারণ আমাদের একটি প্রক্রিয়া পাথগুলো পুনরায় লেখে।
এটি `.ts` (এবং `.js`) থেকে ইমপোর্ট করার সুযোগ দেয়।

পুরোনো কোডে আপনি _ফাইল এক্সটেনশন ছাড়া_ ইমপোর্ট পাবেন।
~~~~

[blog-live-bindings]: https://2ality.com/2015/07/es6-module-exports.html#es6-modules-export-immutable-bindings
[blog-tree-shaking]: https://bitsofco.de/what-is-tree-shaking/
[mdn-const]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const
[mdn-dynamic-imports]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#Dynamic_Imports
[mdn-let]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let
[mdn-module]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules
[mdn-object-freeze]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
[mdn-primitive]: https://developer.mozilla.org/en-US/docs/Glossary/Primitive
[mdn-renaming-modules]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules#Renaming_imports_and_exports
[mdn-var]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var
[handbook-dont-use-any]: https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html#any
[handbook-js-or-ts]: https://www.typescriptlang.org/docs/handbook/typescript-from-scratch.html#learning-javascript-and-typescript
[handbook-type-inference]: https://www.typescriptlang.org/docs/handbook/type-inference.html
[wiki-mutability]: https://en.wikipedia.org/wiki/Immutable_object
[wiki-camel-case]: https://en.wikipedia.org/wiki/Camel_case
[wiki-snake-case]: https://en.wikipedia.org/wiki/Snake_case
