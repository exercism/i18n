# নির্দেশনা সংযোজন


## Python ট্র্যাকের জন্য এই অনুশীলনীটি কীভাবে তৈরি হয়েছে


এই অনুশীলনীর পরীক্ষাগুলো আশা করে যে আপনার ক্লকটি একটি Clock `class`-এর মাধ্যমে ইমপ্লিমেন্ট করা হবে।
Python-এ ক্লাস সম্পর্কে আপনার ধারণা না থাকলে, [concept:python/classes]() এবং [ক্লাস][classes in python] (_Python ডকুমেন্টেশন থেকে_) শুরুর জন্য ভালো জায়গা।


## আপনার ক্লাসের রিপ্রেজেন্টেশন

[অবজেক্ট][what-is-an-object] নিয়ে কাজ করার এবং ডিবাগ করার সময়, সেই অবজেক্টের একটি ভালো রিপ্রেজেন্টেশন থাকা জরুরি।
উদাহরণস্বরূপ, Python [REPL][REPL] পরিবেশে আপনি যদি একটি নতুন [`datetime.datetime`][datetime] অবজেক্ট তৈরি করেন, তাহলে তার [স্ট্রিং রিপ্রেজেন্টেশন][str-rep-classes] দেখতে পাবেন:


```python
>>> from datetime import datetime
>>> new_date = datetime(2022, 5, 4)
>>> new_date
datetime.datetime(2022, 5, 4, 0, 0)
```

আপনার Clock `class`-এর উচিত একটি কাস্টম `object` তৈরি করা, যা তারিখ _ছাড়া_ সময় নিয়ে কাজ করে।
এই `class`-এর একটি গুরুত্বপূর্ণ দিক হবে, এটিকে কীভাবে একটি _স্ট্রিং_ হিসেবে রিপ্রেজেন্ট করা হয়।
অন্য প্রোগ্রামাররা, যারা Clock `class` থেকে তৈরি Clock `objects` ব্যবহার করেন বা কল করেন, তাঁরা ডিবাগ করা এবং অন্যান্য কাজের জন্য এই স্ট্রিং রিপ্রেজেন্টেশনের সাহায্য নেবেন।
তবে, একটি কাস্টম `class`-এর ডিফল্ট রিপ্রেজেন্টেশন খুব একটা সহায়ক নয়:


```python
>>> Clock(12, 34)
<Clock object st 0x102807b20 >
```

আরও সহায়ক একটি রিপ্রেজেন্টেশন তৈরি করতে, আপনি `class`-এ একটি [`__repr__`][repr-method] [স্পেশাল মেথড][dunder-methods] ডিফাইন করতে পারেন।

আদর্শভাবে, ওই `__repr__` মেথডটি বৈধ Python কোড রিটার্ন করে, যা [`eval()`][eval-built-in]-এ পাস করলে অবজেক্টটি আবার তৈরি করা যায়, ঠিক যেমনটি [একটি `__repr__` মেথডের স্পেসিফিকেশনে][repr-docs] বলা হয়েছে।
বৈধ Python কোড রিটার্ন করলে অন্য ডেভেলপার সরাসরি কোডে বা REPL-এ `str` কপি-পেস্ট করতে পারেন।
11:30 AM বোঝানো একটি `Clock` দেখতে এমন হতে পারে:

```python
 `Clock(11, 30)`
```

সব কাস্টম ক্লাসে একটি `__repr__` মেথড ডিফাইন করা ভালো অভ্যাস।
বিবেচনার জন্য আরও কিছু বিষয়:

- সমস্যা ডিবাগ করার সময় এই মেথড থেকে পাওয়া তথ্য উপকারী হওয়া উচিত।
- _আদর্শভাবে_, মেথডটি এমন একটি স্ট্রিং রিটার্ন করে যা বৈধ Python কোড, যদিও সেটি সবসময় সম্ভব নাও হতে পারে।
- বৈধ Python কোড কার্যকর না হলে, অ্যাঙ্গেল ব্র্যাকেটের মধ্যে একটি বিবরণ রিটার্ন করাই প্রচলিত রীতি: `< ...a practical description... >`।


### স্ট্রিং রূপান্তর

`__repr__` মেথডের পাশাপাশি, `class`-এর একটি বিকল্প "মানুষের পড়ার উপযোগী" স্ট্রিং রিপ্রেজেন্টেশনেরও প্রয়োজন হতে পারে।
এটি প্রোগ্রামের আউটপুট বা ডকুমেন্টেশনের জন্য অবজেক্টটি ফরম্যাট করতে ব্যবহার করা হতে পারে।
এটি করা হয় একটি [`__str__`][str-dunder] স্পেশাল মেথড লিখে।
আবার `datetime.datetime`-এর দিকে তাকালে:


```python
>>> str(datetime.datetime(2022, 5, 4))
'2022-05-04 00:00:00'
```

একটি `datetime` অবজেক্টকে যখন নিজেকে স্ট্রিং রিপ্রেজেন্টেশনে রূপান্তর করতে বলা হয়, তখন এটি [ISO 8601 স্ট্যান্ডার্ড][ISO 8601] অনুযায়ী ফরম্যাট করা একটি `str` রিটার্ন করে, যা বেশিরভাগ datetime লাইব্রেরি সহজে পড়া যায় এমন তারিখ ও সময়ে পার্স করতে পারে।

এই অনুশীলনীতে আপনি আপনার Clock-এর জন্য একটি `__str__` মেথড লেখার সুযোগ পাবেন, সেইসাথে একটি `__repr__` মেথডও।

```python
>>> str(Clock(11, 30))
'11:30'
```

এই স্ট্রিং রূপান্তরকে সমর্থন করতে, আপনাকে আপনার `class`-এ একটি `__str__` স্পেশাল মেথড তৈরি করতে হবে, যা Clock-এর সময় দেখানো আরও "মানুষের পড়ার উপযোগী" একটি স্ট্রিং রিটার্ন করবে।

আপনি যদি একটি `__str__` মেথড না তৈরি করেন এবং আপনার ক্লাসে `str()` কল করেন, তাহলে Python বিকল্প হিসেবে আপনার ক্লাসে `__repr__` কল করার চেষ্টা করবে।
তাই এই দুটি স্পেশাল মেথডের মধ্যে যদি আপনি একটি কেবল ইমপ্লিমেন্ট করেন, তাহলে শুধু `__str__` নয়, বরং `__repr__` তৈরি করাই ভালো হবে।


[ISO 8601]: https://www.iso.org/iso-8601-date-and-time-format.html
[REPL]: https://pythonprogramminglanguage.com/repl/
[classes in python]: https://docs.python.org/3/tutorial/classes.html
[datetime]: https://docs.python.org/3/library/datetime.html#available-types
[dunder-methods]: https://www.pythonmorsels.com/every-dunder-method/
[eval-built-in]: https://docs.python.org/3/library/functions.html#eval
[repr-docs]: https://docs.python.org/3/reference/datamodel.html#object.__repr__
[repr-method]: https://docs.python.org/3/library/functions.html#repr
[str-dunder]: https://docs.python.org/3/reference/datamodel.html#object.__str__
[str-rep-classes]: https://www.digitalocean.com/community/tutorials/python-str-repr-functions#introduction
[what-is-an-object]: https://realpython.com/ref/glossary/object/
