# Pyret ট্র্যাকের টেস্ট

## পূর্বশর্ত ইনস্টল করা

একটি অনুশীলনী সফলভাবে ডাউনলোড করার পর, টেস্ট চালানোর জন্য আপনাকে Node.js মডিউলগুলো ইনস্টল করতে হবে:

```sh
cd /path/to/exercise
npm install
```

এরপর `pyret` কমান্ড লাইন টুলটি যে ডিরেক্টরিতে আছে সেটি আপনার $PATH-এ যোগ করুন

```sh
# bash
PATH="./node_modules/.bin:$PATH"

# zsh
path=(./node_modules/.bin $path)

# fish
fish_add_path ./node_modules/.bin
```

## শুরু করা

অনুশীলনীর ডিরেক্টরির ভেতরে বেশ কয়েকটি ফাইল থাকবে, তবে সবচেয়ে গুরুত্বপূর্ণ দুটি হলো আপনার সমাধান ফাইল ও টেস্ট ফাইল।
নিচের উদাহরণে আমরা Leap অনুশীলনীটি ডাউনলোড করেছি।

```bash
leap/
├── leap.arr       # Solution file - your code goes here
├── leap-test.arr  # Test cases for the exercise
```

টেস্ট চালাতে, আপনি যদি অফিসিয়াল Exercism CLI ডাউনলোড করে থাকেন তবে `exercism test` ব্যবহার করুন, নয়তো `pyret leap-test.arr` রান করুন।
Pyret টেস্ট স্যুটটি চালাবে, যেটি লেবেল করা একাধিক `check` ব্লক নিয়ে গঠিত; এগুলো নির্দিষ্ট ইনপুট আর প্রত্যাশিত ফলাফলের বিপরীতে আপনার সমাধান ফাইল পরীক্ষা করে।
এই প্রক্রিয়ার একটি গুরুত্বপূর্ণ দিক হলো আপনার কোডের অংশগুলো স্পষ্টভাবে এক্সপোর্ট করা, যাতে টেস্ট স্যুট সেগুলো দেখতে পারে।

## provide

এই ট্র্যাকের টেস্টগুলো আপনার ফাইল ইমপোর্ট করবে, ফলে আপনার কোড থেকে স্পষ্টভাবে এক্সপোর্ট করা সব কিছুতে সেগুলোর অ্যাক্সেস থাকবে।

ভ্যারিয়েবল এক্সপোর্ট করতে, আপনার ফাইলের শুরুতে একটি [provide স্টেটমেন্ট][provide-statement] যোগ করতে হবে।

নিচের স্নিপেটগুলো `a`, `b`, এবং `c` এক্সপোর্ট করার দুটি বৈধ উপায়।

```pyret
# using a list of bindings
provide a, b, c end
```

```pyret
# using an object literal
provide {
  a: a,
  b: b,
  c: c
}
end
```

তৃতীয় একটি উপায়, `provide *`, হলো কাস্টম ডেটা টাইপ ছাড়া বাকি সব টপ-লেভেল বাইন্ডিং এক্সপোর্ট করার সংক্ষিপ্ত রূপ।
তবে এটি সাধারণত সুপারিশ করা হয় না, কারণ Pyret [shadowing][shadowing] অনুমোদন করে না, এই ব্যাপারে সে কঠোর।

## provide-types

কিছু অনুশীলনীতে টেস্টের উদ্দেশ্যে একটি [কাস্টম ডেটা টাইপ][data-definition] এক্সপোর্ট করা লাগবে।
সেসব ক্ষেত্রে আপনি একটি [provide-types স্টেটমেন্ট][provide-types-statement] ব্যবহার করতে পারেন।
যেহেতু একটি ডেটা টাইপের অতিরিক্ত কিছু ফাংশন থাকে যা এক্সপোর্ট নাও হতে পারে, তাই shadowing-এর আশঙ্কা থাকা সত্ত্বেও `provide-types *` ব্যবহার করার পরামর্শ দেওয়া হয়।

```pyret
provide-types *

data MyPoint:
  | two-dim(x, y)
  | three-dim(x, y, z)
end
```

সব অনুশীলনীর স্টাবেই আপনার ব্যবহারের জন্য `provide` বা `provide-types` স্টেটমেন্ট তৈরি করা থাকবে।

[provide-statement]: https://pyret.org/docs/latest/Provide_Statements.html
[shadowing]: https://pyret.org/docs/latest/Bindings.html#%28part._s~3ashadowing%29
[data-definition]: https://pyret.org/docs/latest/s_declarations.html#%28elem._%28bnf-prod._%28.Pyret._data-decl%29%29%29
[provide-types-statement]: https://pyret.org/docs/latest/Provide_Statements.html
