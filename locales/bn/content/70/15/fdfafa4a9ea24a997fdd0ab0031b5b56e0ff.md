# সম্পর্কে

Python ট্রু ও ফলস মানগুলোকে [`bool`][bools] টাইপ দিয়ে প্রকাশ করে, যেটি `int`-এর একটি সাবক্লাস। এই টাইপে মাত্র দুটি বুলিয়ান মান আছে: `True` এবং `False`. এই মানগুলো একটি ভ্যারিয়েবলে অ্যাসাইন করা যায় এবং [বুলিয়ান অপারেটর][boolean-operators] (`and`, `or`, `not`) দিয়ে একত্রে ব্যবহার করা যায়:


```python
>>> true_variable = True and True
>>> false_variable = True and False

>>> true_variable = False or True
>>> false_variable = False or False

>>> true_variable = not False
>>> false_variable = not True
```

[বুলিয়ান অপারেটর][boolean-operators] _শর্ট-সার্কিট ইভালুয়েশন_ ব্যবহার করে, অর্থাৎ অপারেটরের ডান দিকের এক্সপ্রেশনটি কেবল প্রয়োজনে মূল্যায়ন করা হয়।

প্রতিটি অপারেটরের প্রিসিডেন্স আলাদা, যেখানে `not`-কে `and` ও `or`-এর আগে মূল্যায়ন করা হয়। বন্ধনী দিয়ে এক্সপ্রেশনের একটি অংশ অন্যগুলোর আগে মূল্যায়ন করা যায়:

```python
>>> not True and True
False

>>> not (True and False)
True
```

সব `boolean operators`-কে Python-এর [`comparison operators`][comparisons]-এর চেয়ে কম প্রিসিডেন্সের বলে ধরা হয়, যেমন `==`, `>`, `<`, `is` ও `is not`.


## টাইপ কোয়ার্শন ও ট্রুথিনেস

`bool` ফাংশন ([`bool()`][bool-function]) যেকোনো অবজেক্টকে একটি বুলিয়ান মানে রূপান্তর করে। ডিফল্টভাবে সব অবজেক্টই `True` রিটার্ন করে, যদি না সেগুলোকে `False` রিটার্ন করার জন্য ডিফাইন করা হয়।

কয়েকটি `built-ins` সংজ্ঞা অনুযায়ী সবসময় `False` বলে ধরা হয়:

- ধ্রুবক `None` এবং `False`
- যেকোনো _নিউমেরিক টাইপ_-এর শূন্য (`int`, `float`, `complex`, `decimal`, বা `fraction`)
- খালি _সিকোয়েন্স_ ও _কালেকশন_ (`str`, `list`, `set`, `tuple`, `dict`, `range(0)`)


```python
>>> bool(None)
False

>>> bool(1)
True

>>> bool(0)
False

>>> bool([1,2,3])
True

>>> bool([])
False

>>> bool({"Pig" : 1, "Cow": 3})
True

>>> bool({})
False
```

কোনো অবজেক্টকে _বুলিয়ান কনটেক্সট_-এ ব্যবহার করলে, `bool()` দিয়ে সেটিকে স্বচ্ছভাবে _ট্রুথি_ বা _ফলসি_ হিসেবে মূল্যায়ন করা হয়:


```python
>>> a = "is this true?"
>>> b = []

# This will print "True", as a non-empty string is considered a "truthy" value
>>> if a:
...  print("True")

# This will print "False", as an empty list is considered a "falsey" value
>>> if not b:
...   print("False")
```


ক্লাসগুলো `__bool__()` মেথড, এবং/অথবা `__len__()` মেথড ওভাররাইড ও ইমপ্লিমেন্ট করলে ট্রুথি পরিস্থিতিতে নিজেদের কীভাবে মূল্যায়ন করা হবে তা ঠিক করতে পারে।


## বুলিয়ান আসলে ভেতরে ভেতরে কীভাবে কাজ করে

`bool` টাইপটি _int_-এর একটি _সাব-টাইপ_ হিসেবে ইমপ্লিমেন্ট করা হয়েছে। এর মানে হলো `True` _সাংখ্যিকভাবে সমান_ `1`-এর, আর `False` _সাংখ্যিকভাবে সমান_ `0`-এর। এদের _ইকুয়ালিটি অপারেটর_ দিয়ে তুলনা করলে এটা লক্ষ্য করা যায়:


```python
>>> 1 == True
True

>>> 0 == False
True
```

তবে, _আইডেন্টিটি অপারেটর_ `is` দিয়ে তুলনা করলে দেখা যায়, `bools` কিন্তু `ints` থেকে **এখনও আলাদা**:


```python
>>> 1 is True
False

>>> 0 is False
False
```

> দ্রষ্টব্য: python >= 3.8-এ, `is`-এর _বাম দিকে_ একটি লিটারাল (`1`, `''`, `[]`, বা `{}` এর মতো) ব্যবহার করলে একটি সতর্কবার্তা দেখানো হবে।


কোনো বুলিয়ান ভ্যারিয়েবলকে `True` বা `False`-এর সাথে তুলনা করতে ইকুয়ালিটি অপারেটর ব্যবহার করা [Python-এর একটি অ্যান্টি-প্যাটার্ন][comparing to true in the wrong way] বলে ধরা হয়। বরং, আইডেন্টিটি অপারেটর `is` ব্যবহার করা উচিত:


```python

>>> flag = True

# Not "Pythonic"
>>> if flag == True:
...    print("This works, but it's not considered Pythonic.")

# A better way
>>> if flag:
...    print("Pythonistas prefer this pattern as more Pythonic.")
```


[Boolean-operators]: https://docs.python.org/3/library/stdtypes.html#boolean-operations-and-or-not
[bool-function]: https://docs.python.org/3/library/functions.html#bool
[bools]: https://docs.python.org/3/library/stdtypes.html#typebool
[comparing to true in the wrong way]: https://docs.quantifiedcode.com/python-anti-patterns/readability/comparison_to_true.html
[comparisons]: https://docs.python.org/3/library/stdtypes.html#comparisons
