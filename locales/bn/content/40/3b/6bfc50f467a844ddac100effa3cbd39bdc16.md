# স্ট্রিং ফরম্যাটিং

Python-এর বিল্ট-ইন `str` দুটি নির্ভরযোগ্য স্ট্রিং ফরম্যাটিং পদ্ধতি দিয়ে ইনিশিয়ালাইজ করা যায়: `f-strings` এবং `str.format()`। `f'{variable}'` দিয়ে স্ট্রিং ইন্টারপোলেশন বেশি পছন্দনীয়, কারণ এটি সহজে পড়া যায়, সম্পূর্ণ এবং খুব দ্রুত একটি মডিউল। যখন আন্তর্জাতিকীকরণ-বান্ধব বা আরও নমনীয় কোনো পদ্ধতির দরকার হয়, তখন `str.format()` দিয়ে আপনার প্রয়োজন হতে পারে এমন প্রায় বাকি সব `str` ভ্যারিয়েশন তৈরি করা যায়।

# লিটারাল স্ট্রিং ইন্টারপোলেশন। f-string

লিটারাল স্ট্রিং ইন্টারপোলেশন হলো `f` প্রিফিক্স ও কার্লি ব্রেস `{object}` ব্যবহার করে দ্রুত ও দক্ষভাবে এক্সপ্রেশন ফরম্যাট করে `str`-এ রূপান্তর ও মূল্যায়ন করার একটি উপায়। এটি সব ধরনের কোটিং স্ট্রিং-এর সাথে ব্যবহার করা যায়: সিঙ্গল কোট `'`, ডাবল কোট `"`, আর মাল্টিলাইন ও এস্কেপিংয়ের জন্য ট্রিপল কোট `'''` বা `"""`।

**f-string**-এর এই সাধারণ উদাহরণে `name` ভ্যারিয়েবলটি স্ট্রিংয়ের শুরুতে রেন্ডার করা হয়েছে, আর `int` টাইপের `age` ভ্যারিয়েবলকে `str`-এ কনভার্ট করে `' is '`-এর পরে রেন্ডার করা হয়েছে।

```python
>>> name, age = 'Artemis', 21
>>> f'{name} is {age} years old.'
'Artemis is 21 years old.'
```

একটি `f-string` যে এক্সপ্রেশনগুলো ইভ্যালুয়েট করে তা প্রায় যেকোনো কিছুই হতে পারে, তাই ইনপুট স্যানিটাইজ নিয়ে চিরচেনা সতর্কতাগুলো এখানেও প্রযোজ্য। যেসব মান ইভ্যালুয়েট করা যায় তার কয়েকটি: `str`, সংখ্যা, ভ্যারিয়েবল, গাণিতিক এক্সপ্রেশন, শর্তসাপেক্ষ এক্সপ্রেশন, বিল্ট-ইন টাইপ, স্লাইস, ফাংশন, কিংবা `__str__` বা `__repr__` মেথড ডিফাইন করা যেকোনো অবজেক্ট। কিছু উদাহরণ:

```python
>>> waves = {'water': 1, 'light': 3, 'sound': 5}

>>> f'"A dict can be represented with f-string: {waves}."'
'"A dict can be represented with f-string: {\'water\': 1, \'light\': 3, \'sound\': 5}."'

>>> f'Tenfold the value of "light" is {waves["light"]*10}.'
'Tenfold the value of "light" is 30.'
```

f-string আউটপুট `.format()`-এর জন্য বর্ণিত _width_, _alignment_ এবং _precision_-এর মতো একই কন্ট্রোল মেকানিজম সমর্থন করে। আন্তর্জাতিকীকরণ (I18N) ও লোকালাইজেশন (L10N)-এর জন্য GNU gettext API-এর সাথে স্ট্রিং ইন্টারপোলেশন একসাথে ব্যবহার করা যায় না, বদলে `str.format()` ব্যবহার করতে হয়।

# str.format() মেথড

`str.format()` টেক্সটের ভেতরের প্লেসহোল্ডার প্রতিস্থাপনের সুযোগ দেয়। প্লেসহোল্ডার চিহ্নিত করা হয় নামযুক্ত ইনডেক্স `{price}`, সংখ্যাযুক্ত ইনডেক্স `{0}`, বা খালি প্লেসহোল্ডার `{}` দিয়ে। এগুলোর মান `str.format()` মেথডে প্যারামিটার হিসেবে উল্লেখ করা হয়। উদাহরণ:

```python
>>> 'My text: {placeholder1} and {}.'.format(12, placeholder1='value1')
'My text: value1 and 12.'
```

Python `.format()` একগুচ্ছ [মিনি ল্যাঙ্গুয়েজ স্পেসিফায়ার][format-mini-language] সমর্থন করে, যা টেক্সট অ্যালাইন করতে, কনভার্ট করতে ইত্যাদি কাজে লাগানো যায়।

জটিল ফরম্যাটিং স্পেসিফায়ারটি হলো `{[<name>][!<conversion>][:<format_specifier>]}`:

- `<name>` হতে পারে একটি নামযুক্ত প্লেসহোল্ডার, একটি সংখ্যা বা খালি।
- `!<conversion>` ঐচ্ছিক এবং তিনটির একটি হওয়া উচিত: `!s` মানে [`str()`][str-conversion], `!r` মানে [`repr()`][repr-conversion] আর `!a` মানে [`ascii()`][ascii-conversion]। ডিফল্টভাবে `str()` ব্যবহৃত হয়।
- `:<format_specifier>` ঐচ্ছিক এবং এতে অনেক অপশন আছে, যেগুলো [এখানে তালিকাভুক্ত][format-specifiers]।

ডায়াক্রিটিকাল ascii অক্ষরের কনভার্সনের উদাহরণ:

```python
>>> '{0!s}'.format('ë')
'ë'
>>> '{0!r}'.format('ë')
"'ë'"
>>> '{0!a}'.format('ë')
"'\\xeb'"

>>> 'She said her name is not {} but {!r}.'.format('Anna', 'Zoë')
"She said her name is not Anna but 'Zoë'."
```

ফরম্যাট স্পেসিফায়ারের উদাহরণ, [আরও উদাহরণ এই পেজের শেষে][summary-string-format]:

```python
>>> "The number {0:d} has a representation in binary: '{0: >8b}'.".format(42)
"The number 42 has a representation in binary: '  101010'."
```

`str.format()` আন্তর্জাতিকীকরণ (I18N) ও লোকালাইজেশন (L10N)-এর জন্য [GNU gettext API][gnu-gettext-api]-এর সাথে একসাথে ব্যবহার করা উচিত।

[all-about-formatting]: https://realpython.com/python-formatted-output
[difference-formatting]: https://realpython.com/python-string-formatting/#2-new-style-string-formatting-strformat
[printf-style-docs]: https://docs.python.org/3/library/stdtypes.html#printf-style-string-formatting
[tuples]: https://www.w3schools.com/python/python_tuples.asp
[format-mini-language]: https://docs.python.org/3/library/string.html#format-specification-mini-language
[str-conversion]: https://www.w3resource.com/python/built-in-function/str.php
[repr-conversion]: https://www.w3resource.com/python/built-in-function/repr.php
[ascii-conversion]: https://www.w3resource.com/python/built-in-function/ascii.php
[format-specifiers]: https://www.python.org/dev/peps/pep-3101/#standard-format-specifiers
[summary-string-format]: https://www.w3schools.com/python/ref_string_format.asp
[template-string]: https://docs.python.org/3/library/string.html#template-strings
[gnu-gettext-api]: https://docs.python.org/3/library/gettext.html
