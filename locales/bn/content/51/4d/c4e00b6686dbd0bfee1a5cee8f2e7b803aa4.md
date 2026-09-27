# পরিচিতি

Factor-এ হ্যাশটেবল হলো *অ্যাসোসিয়েটিভ অ্যারে*, অর্থাৎ `key/value` জোড়ার সংগ্রহ, যেখানে লুকআপ হয় O(1) সময়ে। এগুলো বৃহত্তর [`assocs`][assocs] পরিবারের অংশ।

## হ্যাশটেবল লিটারাল

```factor
H{ { "coal" 1 } { "wood" 2 } } .
```

`H{ }` হলো একটি খালি হ্যাশটেবল। হ্যাশটেবল *মিউটেবল*; কী (key) যোগ বা মুছে ফেলার সাথে সাথে এগুলো বাড়ে ও কমে। মূলটি অপরিবর্তিত রাখতে চাইলে আগে `clone` করুন। একটি হ্যাশটেবল প্রিন্ট করলে তার এন্ট্রিগুলো দেখা যায়, তবে ক্রমটি ইনসার্শনের ক্রম অনুসারে হয় না, কারণ হ্যাশটেবল ক্রমহীন।

## পড়া

`at` ([`assocs`][assocs]-এ) একটি মান পড়ে, আর কী (key) না থাকলে `f` রিটার্ন করে:

```
at      ( key assoc -- value/f )
key?    ( key assoc -- ? )
```

```factor
"coal" H{ { "coal" 1 } { "wood" 2 } } at .   ! => 1
"gold" H{ { "coal" 1 } { "wood" 2 } } at .   ! => f
```

## লেখা

`set-at` যোগ করে বা ওভাররাইট করে; `delete-at` মুছে ফেলে; `change-at` বর্তমান মানের উপর একটি কোয়োটেশন চালায়। তিনটিই *মিউটেট* করে:

```
set-at     ( value key assoc -- )
delete-at  ( key assoc -- )
change-at  ( key assoc quot: ( old -- new ) -- )
```

```factor
H{ } clone 5 "coal" pick set-at .
! => H{ { "coal" 5 } }
```

## `inc-at`: গণনা বাড়ানোর শর্টকাট

`inc-at`-ও ([`assocs`][assocs]-এ) একটি কী (key)-এর বর্তমান মানের সাথে 1 যোগ করে, আর কী (key) না থাকলে সেটি 1 হিসেবে ঢুকিয়ে দেয়। গণনা করার জন্য একেবারে উপযুক্ত:

```
inc-at ( key assoc -- )
```

```factor
H{ } clone "coal" over inc-at .
! => H{ { "coal" 1 } }
```

## ইটারেশন ও লেজি ইনসার্শন

`assoc-each` প্রতিটি `( key value -- )` জোড়ার উপর দিয়ে চলে; `cache` একটি কী (key)-এর মান রিটার্ন করে, আর কী (key) না থাকলে সরবরাহ করা কোয়োটেশন দিয়ে একবার সেটি হিসাব করে নেয়।

```
assoc-each ( assoc quot: ( key value -- ) -- )
cache      ( key assoc quot: ( key -- value ) -- value )
```

`cache` এক শব্দেই "খুঁজুন বা তৈরি করুন" প্যাটার্নটি দেয়। কী (key)-এর একটি স্ট্রিম থেকে হ্যাশটেবল গড়ার সময় প্রতিটি কল সাইটে অনুপস্থিত এন্ট্রির কেসটি সামলাতে না চাইলে এটি দারুণ কাজে দেয়।

## কী (key)-এর একটি সিকোয়েন্স জুড়ে হ্যাশটেবল আপডেট প্রয়োগ করা

ইনপুট যখন কী (key)-এর একটি সিকোয়েন্স, আর আপনি প্রতিটি কী (key)-এর জন্য একবার করে হ্যাশটেবল আপডেট করতে চান, তখন `each` দিয়ে *সিকোয়েন্স*টির উপর ইটারেট করুন এবং একটি ফ্রায়েড কোয়োটেশন `'[ _ … ]` ([`fry`][fry] থেকে) ব্যবহার করে হ্যাশটেবলটি লুপ বডিতে বসিয়ে দিন। উদাহরণস্বরূপ, কী (key)-এর একটি তালিকা মুছে ফেলা:

```factor
{ "wood" "iron" } H{ { "coal" 5 } { "wood" 3 } { "iron" 2 } } clone
[ '[ _ delete-at ] each ] keep .
! => H{ { "coal" 5 } }
```

`'[ _ delete-at ]` স্ট্যাকের উপরে থাকা হ্যাশটেবলটি ধরে রাখে, ফলে প্রতিটি ইটারেশনে `each`-কে শুধু কী (key)-টি দিতে হয়। `keep` কোয়োটেশনটি চালায়, আর শেষের `.`-এর জন্য হ্যাশটেবলটি সংরক্ষণ করে রাখে।

## একটি সিকোয়েন্স থেকে হ্যাশটেবল তৈরি করা

`map>assoc` ([`assocs`][assocs]-এ) একটি সিকোয়েন্সের উপর একটি কোয়োটেশন ম্যাপ করে এবং `( elt -- key value )` ফলাফলগুলোকে এক্সেম্পলারের টাইপের একটি অ্যাসোসে জড়ো করে:

```
map>assoc ( seq quot: ( elt -- key value ) exemplar -- assoc )
```

```factor
{ "wood" } [ dup length ] H{ } map>assoc .
! => H{ { "wood" 4 } }
```

## কী (key), মান ও জোড়া

`keys` ও `values` ([`assocs`][assocs]-এ) শুধু কী (key)-গুলো বা শুধু মানগুলো রিটার্ন করে; `>alist` রিটার্ন করে `{ key value }` জোড়াগুলো।

```
keys   ( assoc -- keys )
values ( assoc -- values )
>alist ( assoc -- alist )
```

```factor
H{ { "wood" 11 } { "coal" 7 } } keys .     ! the keys (order not guaranteed)
H{ { "wood" 11 } { "coal" 7 } } values .   ! the matching values
```

`keys` আর `values` একে অন্যের সাথে মেলে: একটি নির্দিষ্ট অবস্থানের মানটি একই অবস্থানের কী (key)-এর সাথে সম্পর্কিত।

`sort-keys` ([`sorting`][sorting]-এ) `{ key value }` জোড়াগুলোকে কী (key) অনুসারে সাজিয়ে রিটার্ন করে:

```factor
H{ { "wood" 11 } { "coal" 7 } } sort-keys .
! => { { "coal" 7 } { "wood" 11 } }
```

## জোড়া থেকে আবার হ্যাশটেবলে

`>hashtable` ([`hashtables`][hashtables]-এ) হলো `>alist`-এর বিপরীত: যেকোনো অ্যাসোসকে, সাধারণত `{ key value }` জোড়ার একটি অ্যালিস্ট, O(1) লুকআপসহ একটি হ্যাশটেবলে রূপান্তর করে।

```
>hashtable ( assoc -- hashtable )
```

```factor
{ { "coal" 7 } { "wood" 11 } } >hashtable .
! => H{ { "wood" 11 } { "coal" 7 } }   (entry order not guaranteed)
```

জোড়ার একটি তালিকা জড়ো বা রূপান্তর করার পর সেটিকে আবার একটি হ্যাশটেবলে ভাঁজ করে কী (key) দিয়ে এন্ট্রি খুঁজতে চাইলে এটি কাজে লাগে।

[assocs]: https://docs.factorcode.org/content/vocab-assocs.html
[fry]: https://docs.factorcode.org/content/article-fry.html
[hashtables]: https://docs.factorcode.org/content/vocab-hashtables.html
[sorting]: https://docs.factorcode.org/content/vocab-sorting.html
