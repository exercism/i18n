# সম্পর্কে

অন্য ভাষাগুলোর মতো Common Lisp-এরও কিছু নিয়ম আছে, যা দিয়ে ঠিক করা হয় দুটি অবজেক্ট 'একই' কি না। এই নিয়মগুলো চারটি স্তর তৈরি করে, আর প্রতিটি স্তরের জন্য একটি করে ফাংশন আছে যা ওই স্তরের যাচাই করে। স্তরগুলো কঠোরতম থেকে শিথিলতম ক্রমে সাজানো।

## `eq`

প্রথম স্তরটি অবজেক্ট আইডেন্টিটি। এই সমতা [`eq`][hyper-eq] ফাংশন দিয়ে যাচাই করা হয়। যে দুটি অবজেক্টের সমতা যাচাই করা হচ্ছে, তাদের অবশ্যই অভিন্ন অবজেক্ট হতে হবে:

```lisp
(eq 'apples 'apples)  ; => T
(eq 'apples 'oranges) ; => NIL

(eq '(a b c) '(a b c) ; => NIL (these two lists have the same contents but are not the same list)
(let ((list1 '(a b c)) (list2 list1)) 
  (eq list1 list2))   ; => T (these two lists are the same list)
```

## `eql`

দ্বিতীয় স্তরে যোগ হয় সংখ্যা ও ক্যারেক্টারের সমতা। এই সমতা [`eql`][hyper-eql] ফাংশন দিয়ে যাচাই করা হয়। যাচাই কীভাবে হবে তা নির্ভর করে আর্গুমেন্টগুলোর টাইপের উপর:

- যেকোনো দুটি অবজেক্ট যদি `eq` হয়, তবে তারা `eql`
- সংখ্যাগুলো `eql` হয় যদি তাদের টাইপ ও মান একই হয়
- ক্যারেক্টারগুলো `eql` হয় যদি তারা একই ক্যারেক্টার বোঝায়।

```lisp
(eql 1 1)     ; => T
(eql 1 1/1)   ; => NIL (one number is an integer, the other a rational)
(eql #\c #\c) ; => T
(eql #\c #\C) ; => NIL (case is different)
```

কারও মনে প্রশ্ন জাগতে পারে, সংখ্যা ও ক্যারেক্টারকে [`eq`][hyper-eq] দিয়ে অবজেক্ট আইডেন্টিটি মিলিয়ে দেখা হয় না কেন। Common Lisp স্ট্যান্ডার্ড ইমপ্লিমেন্টেশনগুলোকে অনুমতি দেয়, তারা চাইলে সংখ্যা ও ক্যারেক্টারের কপি বানাতে পারে। তাই `0` আর `0` [`eq`][hyper-eq] নাও হতে পারে, কারণ তারা `0` সংখ্যাটির আলাদা আলাদা ইনস্ট্যান্স হতে পারে।

## `equal`

তৃতীয় স্তরে দেখা হয় গাঠনিক সাদৃশ্য। এই সমতা [`equal`][hyper-equal] দিয়ে যাচাই করা হয়। যাচাই কীভাবে হবে তা নির্ভর করে আর্গুমেন্টগুলোর টাইপের উপর:

- সিম্বলগুলো [`eq`][hyper-eq] দিয়ে যেন তুলনা করা হচ্ছে সেভাবে তুলনা করা হয়
- ক্যারেক্টার ও সংখ্যাগুলো `eql` দিয়ে যেন তুলনা করা হচ্ছে সেভাবে তুলনা করা হয়
- কনসগুলো [`equal`][hyper-equal] হয় যদি তাদের এলিমেন্টগুলো [`equal`][hyper-equal] হয়। এটি রিকার্সিভভাবে করা হয়।
- স্ট্রিং ও বিট ভেক্টর [`equal`][hyper-equal] হয় যদি তাদের এলিমেন্টগুলো `eql` হয়
- অন্যান্য টাইপের অ্যারেগুলো [`eq`][hyper-eq] দিয়ে যেন তুলনা করা হচ্ছে সেভাবে তুলনা করা হয়
- পাথনেমগুলো [`equal`][hyper-equal] হয় যদি তারা কার্যকারিতার দিক থেকে সমতুল্য হয়। (পাথনেমের উপাদানগুলো যে স্ট্রিং দিয়ে তৈরি, তাদের কেস সেনসিটিভিটি নিয়ে এখানে ইমপ্লিমেন্টেশন-নির্ভর আচরণের সুযোগ আছে।)
- অন্য যেকোনো টাইপের অবজেক্ট [`eq`][hyper-eq] দিয়ে যেন তুলনা করা হচ্ছে সেভাবে তুলনা করা হয়

```lisp
(equal '(a (b c)) '(a (b c)))         ; => T (conses are equal if their contents are equal)
(equal "hello" "hello")               ; => T
(equal "hello" "HELLO")               ; => NIL
(equal #(1 2 3) #(1 2 3))             ; => NIL (arrays are equal only if eq)
(equal #P"foo/bar.md" #P"foo/bar.md") ; => T (pathnames are equal if "functionally equivalent"
```

## `equalp`

সমতার চতুর্থ ও সবচেয়ে শিথিল স্তরটি [`equalp`][hyper-equalp] দিয়ে যাচাই করা হয়। যাচাই কীভাবে হবে তা নির্ভর করে টাইপের উপর:

- দুটি অবজেক্ট যদি [`equalp`][hyper-equalp] হয়, তবে তারা [`equalp`][hyper-equalp]
- সংখ্যাগুলো [`equalp`][hyper-equalp] হয় যদি তাদের মান একই হয়, এমনকি টাইপ একই না হলেও
- ক্যারেক্টার ও স্ট্রিং বড়-ছোট হাতের অক্ষর নির্বিশেষে তুলনা করা হয়
- কনসগুলো [`equalp`][hyper-equalp] হয় যদি তাদের এলিমেন্টগুলো [`equalp`][hyper-equalp] হয়। এটি রিকার্সিভভাবে করা হয়।
- অ্যারেগুলো [`equalp`][hyper-equalp] হয় যদি তাদের মাত্রার সংখ্যা একই হয়, সেই মাত্রাগুলো একই হয়, এবং প্রতিটি এলিমেন্ট [`equalp`][hyper-equalp] হয়।
- স্ট্রাকচারগুলো [`equalp`][hyper-equalp] হয় যদি তাদের ক্লাস ও স্লট একই হয় এবং দুটি স্ট্রাকচারের মধ্যে সেই স্লটগুলোর প্রতিটি [`equalp`][hyper-equalp] হয়।
- হ্যাশ টেবিলগুলো [`equalp`][hyper-equalp] হয় যদি দুটিরই `:test` ফাংশন একই হয়, তাদের কী একই হয় (ওই `:test` ফাংশন দিয়ে তুলনা করে), এবং সেই কীগুলোর মান [`equalp`][hyper-equalp] দিয়ে তুলনা করে একই হয়।

```lisp
(equalp 1 1.0)                       ; => T
(equalp #\c #\C)                     ; => T
(equalp "hello" "HELLO")             ; => T
(equalp #(1 2 3) #(1.0 2.0 3.0))     ; => T (arrays contain elements which are `equalp`)
(equal #S(TEST :SLOT1 'a :SLOT2 'b) 
       #S(TEST :SLOT1 'a :SLOT2 'b)) ; => T (structures of the same class with slots that have values which are `equalp`)
```

## টাইপ-নির্দিষ্ট ফাংশন

উপরেরগুলো হলো 'জেনেরিক' সমতার ফাংশন। এগুলো সংজ্ঞা অনুযায়ী যেকোনো টাইপের জন্য কাজ করে। জেনেরিক কোড লেখার সময় এটি কাজে লাগতে পারে, যখন কোড রানটাইম পর্যন্ত জানেই না সে কোন টাইপের অবজেক্ট তুলনা করবে। তবে যে টাইপগুলো তুলনা করা হচ্ছে সেগুলো জানা থাকলে টাইপ-নির্দিষ্ট সমতার ফাংশন ব্যবহার করাকেই সাধারণত "উত্তম স্টাইল" ধরা হয়। যেমন `equal`-এর বদলে `string=`। এই ফাংশনগুলো প্রাসঙ্গিক কনসেপ্টগুলোতে দেখানো ও আলোচনা করা হবে।

[hyper-eq]: http://www.lispworks.com/documentation/HyperSpec/Body/f_eq.htm
[hyper-eql]: http://www.lispworks.com/documentation/HyperSpec/Body/f_eql.htm
[hyper-equal]: http://www.lispworks.com/documentation/HyperSpec/Body/f_equal.htm
[hyper-equalp]: http://www.lispworks.com/documentation/HyperSpec/Body/f_equalp.htm
