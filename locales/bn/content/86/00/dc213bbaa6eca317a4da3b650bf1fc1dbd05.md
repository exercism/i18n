# ইঙ্গিত

## সাধারণ

একটি ইভেন্টের প্রাথমিক তথ্য দিয়ে লিফলেট তৈরি করতে শুধু f-string বা `format()` মেথড ব্যবহার করুন।

- [পাইথনে স্ট্রিং ফরম্যাটিংয়ের পরিচিতি][str-f-strings-docs]
- [realpython.com-এর নিবন্ধ][realpython-article]

## 1. হেডারটি বড় হাতের অক্ষরে লিখুন

- str মেথড `capitalize` দিয়ে টাইটেলটি বড় হাতের অক্ষরে রূপান্তর করুন।

## 2. তারিখটি ফরম্যাট করুন

- `f''` বা `''.format()` ব্যবহার করে `date` ম্যানুয়ালি ফরম্যাট করতে হবে।
- `date` ফরম্যাট হবে এভাবে: 'Month day, year'।

## 3. ইউনিকোড ক্যারেক্টারগুলো আইকন হিসেবে রেন্ডার করুন

- `format` দিয়ে রেন্ডার করার একটি উপায় হলো ইউনিকোড প্রিফিক্স `u'{}'` ব্যবহার করা।

## 4. তৈরি লিফলেটটি দেখান

- অ্যাস্টেরিস্ক আর ক্যারেক্টারগুলো সারিবদ্ধ করতে সঠিক [format_spec ফিল্ড][formatspec-docs] খুঁজে বের করুন।
- ১ নম্বর অংশটি হলো বড় হাতের অক্ষরে লেখা `header` স্ট্রিং।
- ২ নম্বর অংশটি হলো `date`।
- ৩ নম্বর অংশটি হলো শিল্পীদের তালিকা; প্রতিটি শিল্পী একই ইনডেক্সের ইউনিকোড ক্যারেক্টারের সাথে যুক্ত।
- প্রতিটি লাইনে ২০টি ক্যারেক্টার থাকতে হবে।
- প্রতিটি অংশের মাঝে প্রয়োজনীয় খালি লাইন যোগ করতে সংক্ষিপ্ত কোড লিখুন।
- তারিখ না দেওয়া থাকলে সেটির জায়গায় একটি খালি লাইন দিন।

```python
******************** # 20 asterisks
*                  *
*     'Header'     * # capitalized header
*                  *
* Month day, year  * # Optional date
*                  *
* Artist1       ⑴ * # Artist list from 1 to 4
* Artist2       ⑵ *
* Artist3       ⑶ *
* Artist4       ⑷ *
*                  *
********************
```

[str-f-strings-docs]: https://docs.python.org/3/reference/lexical_analysis.html#f-strings
[realpython-article]: https://realpython.com/python-formatted-output/
[formatspec-docs]: https://docs.python.org/3/library/string.html#formatspec
