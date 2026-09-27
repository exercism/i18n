# ভূমিকা

Python-এ একটি `str` হলো [ইউনিকোড কোড পয়েন্ট][unicode code points]-এর একটি [ইমিউটেবল সিকোয়েন্স][text sequence]।
এর মধ্যে থাকতে পারে অক্ষর, ডায়াক্রিটিক্যাল চিহ্ন, পজিশনিং ক্যারেক্টার, সংখ্যা, মুদ্রা প্রতীক, ইমোজি, যতিচিহ্ন, স্পেস এবং লাইন ব্রেক ক্যারেক্টার, আরও অনেক কিছু।
 যেহেতু ইমিউটেবল, তাই মেমোরিতে একটি `str` অবজেক্টের মান বদলায় না; যে মেথডগুলো একটি স্ট্রিং পরিবর্তন করে বলে মনে হয়, সেগুলো ওই `str` অবজেক্টের একটি নতুন কপি বা ইনস্ট্যান্স রিটার্ন করে।


একটি `str` লিটারাল একক `'` বা দ্বৈত `"` কোটেশন দিয়ে ডিক্লেয়ার করা যায়। প্রয়োজন হলে এস্কেপ `\` ক্যারেক্টার ব্যবহার করা যায়।


```python

>>> single_quoted = 'These allow "double quoting" without "escape" characters.'

>>> double_quoted = "These allow embedded 'single quoting', so you don't have to use an 'escape' character."

>>> escapes = 'If needed, a \'slash\' can be used as an escape character within a string when switching quote styles won\'t work.'
```

মাল্টি-লাইন স্ট্রিং `'''` বা `"""` দিয়ে ডিক্লেয়ার করা হয়।


```python
>>> triple_quoted =  '''Three single quotes or "double quotes" in a row allow for multi-line string literals.
  Line break characters, tabs and other whitespace are fully supported.

  You\'ll most often encounter these as "doc strings" or "doc tests" written just below the first line of a function or class definition.
    They\'re often used with auto documentation ✍ tools.
    '''
```

স্ট্রিংগুলো `+` অপারেটর দিয়ে একসাথে যুক্ত করা যায়। এই পদ্ধতি অল্প ব্যবহার করা উচিত, কারণ এটি খুব বেশি পারফরম্যান্ট নয় বা সহজে রক্ষণাবেক্ষণযোগ্য নয়।


```python
language = "Ukrainian"
number = "nine"
word = "дев'ять"

sentence = word + " " + "means" + " " + number + " in " + language + "."

>>> print(sentence)
...
"дев'ять means nine in Ukrainian."
```

যদি আলাদা আলাদা স্ট্রিংয়ের একটি `list`, `tuple`, `set` বা অন্য কোনো কালেকশনকে একটি `str`-এ একত্র করতে হয়, তাহলে [`<str>.join(<iterable>)`][str-join] ভালো একটি বিকল্প:


```python
# str.join() makes a new string from the iterables elements.
>>> chickens = ["hen", "egg", "rooster"] # Lists are iterable.
>>> ' '.join(chickens)
'hen egg rooster'

# Any string can be used as the joining element.
>>> ' :: '.join(chickens)
'hen :: egg :: rooster'

>>> ' 🌿 '.join(chickens)
'hen 🌿 egg 🌿 rooster'


# Any iterable can be used as input.
>>> flowers = ("rose", "daisy", "carnation")  # Tuples are iterable.
>>> '*-*'.join(flowers)
'rose*-*daisy*-*carnation'

>>> flowers = {"rose", "daisy", "carnation"}  # Sets are iterable, but output order is not guaranteed.
>>> '*-*'.join(flowers)
'rose*-*carnation*-*daisy'

>>> phrase = "This is my string"  # Strings are iterable, but be careful!
>>> '..'.join(phrase)
'T..h..i..s.. ..i..s.. ..m..y.. ..s..t..r..i..n..g'


# Separators are inserted **between** elements, but can be any string (including spaces).
# This can be exploited for interesting effects.
>>> under_words = ['under', 'current', 'sea', 'pin', 'dog', 'lay']
>>> separator = ' ⤴️ under'
>>> separator.join(under_words)
'under ⤴️ undercurrent ⤴️ undersea ⤴️ underpin ⤴️ underdog ⤴️ underlay'

# The separator can be composed different ways, as long as the result is a string.
>>> upper_words = ['upper', 'crust', 'case', 'classmen', 'most', 'cut']
>>> separator = ' 🌟 ' + upper_words[0]
>>> separator.join(upper_words)
 'upper 🌟 uppercrust 🌟 uppercase 🌟 upperclassmen 🌟 uppermost 🌟 uppercut'
```

স্ট্রিংয়ের ভেতরের কোড পয়েন্টগুলো বাম দিক থেকে `0-based index` সংখ্যা দিয়ে রেফারেন্স করা যায়:


```python
creative = '창의적인'

>>> creative[0]
'창'

>>> creative[2]
'적'

>>> creative[3]
'인'
```

ডান দিক থেকেও ইনডেক্স করা যায়, যা `-1-based index` দিয়ে শুরু হয়:


```python
creative = '창의적인'

>>> creative[-4]
'창'

>>> creative[-2]
'적'

>>> creative[-1]
'인'

```

Python-এ আলাদা কোনো “ক্যারেক্টার” বা “রুন” টাইপ নেই, তাই একটি স্ট্রিং ইনডেক্স করলে ১ দৈর্ঘ্যের একটি নতুন `str` তৈরি হয়:


```python

>>> website = "exercism"
>>> type(website[0])
<class 'str'>

>>> len(website[0])
1

>>> website[0] == website[0:1] == 'e'
True
```

সাবস্ট্রিংগুলো _স্লাইস নোটেশন_ দিয়ে নির্বাচন করা যায়, [`<str>[<start>:stop:<step>]`][common sequence operations] ব্যবহার করে একটি নতুন স্ট্রিং তৈরি করা যায়।
 ফলাফল থেকে `stop` ইনডেক্স বাদ পড়ে।
 যদি `start` না দেওয়া হয়, শুরুর ইনডেক্স ০ হবে।
 যদি `stop` না দেওয়া হয়, `stop` ইনডেক্স হবে স্ট্রিংয়ের শেষ।


```python
moon_and_stars = '🌟🌟🌙🌟🌟⭐'
sun_and_moon = '🌞🌙🌞🌙🌞🌙🌞🌙🌞'

>>> moon_and_stars[1:4]
'🌟🌙🌟'

>>> moon_and_stars[:3]
'🌟🌟🌙'

>>> moon_and_stars[3:]
'🌟🌟⭐'

>>> moon_and_stars[:-1]
'🌟🌟🌙🌟🌟'

>>> moon_and_stars[:-3]
'🌟🌟🌙'

>>> sun_and_moon[::2]
'🌞🌞🌞🌞🌞'

>>> sun_and_moon[:-2:2]
'🌞🌞🌞🌞'

>>> sun_and_moon[1:-1:2]
'🌙🌙🌙🌙'
```

স্ট্রিংগুলোকে [`<str>.split(<separator>)`][str-split] দিয়ে ছোট ছোট স্ট্রিংয়েও ভাঙা যায়, যা সাবস্ট্রিংয়ের একটি `list` রিটার্ন করে।
 প্রয়োজনে ওই লিস্টটিকে আরও ইনডেক্স বা স্প্লিট করা যায়।
 কোনো আর্গুমেন্ট ছাড়া `<str>.split()` ব্যবহার করলে স্ট্রিংটি হোয়াইটস্পেসে ভাগ হবে।


```python
>>> cat_ipsum = "Destroy house in 5 seconds mock the hooman."
>>> cat_ipsum.split()
...
['Destroy', 'house', 'in', '5', 'seconds', 'mock', 'the', 'hooman.']


>>> cat_ipsum.split()[-1]
'hooman.'


>>> cat_words = "feline, four-footed, ferocious, furry"
>>> cat_words.split(', ')
...
['feline', 'four-footed', 'ferocious', 'furry']
```

`<str>.split()`-এর জন্য সেপারেটর একাধিক ক্যারেক্টারেরও হতে পারে।
স্প্লিট মেলানোর জন্য **পুরো স্ট্রিং** ব্যবহার করা হয়।


```python

>>> colors = """red,
orange,
green,
purple,
yellow"""

>>> colors.split(',\n')
['red', 'orange', 'green', 'purple', 'yellow']
```

স্ট্রিংগুলো সব [সাধারণ সিকোয়েন্স অপারেশন][common sequence operations] সমর্থন করে।
 `for item in <str>` দিয়ে একটি লুপে প্রতিটি কোড পয়েন্ট ইটারেট করা যায়।
 `for index, item in enumerate(<str>)` দিয়ে আইটেমসহ ইনডেক্সগুলো একটি লুপে ইটারেট করা যায়।


```python

>>> exercise = 'လေ့ကျင့်'

# Note that there are more code points than perceived glyphs or characters
>>> for code_point in exercise:
...    print(code_point)
...
လ
ေ
့
က
ျ
င
်
့

# Using enumerate will give both the value and index position of each element.
>>> for index, code_point in enumerate(exercise):
...    print(index, ": ", code_point)
...
0 :  လ
1 :  ေ
2 :  ့
3 :  က
4 :  ျ
5 :  င
6 :  ်
7 :  ့
```


[common sequence operations]: https://docs.python.org/3/library/stdtypes.html#common-sequence-operations
[str-join]: https://docs.python.org/3/library/stdtypes.html#str.join
[str-split]: https://docs.python.org/3/library/stdtypes.html#str.split
[text sequence]: https://docs.python.org/3/library/stdtypes.html#text-sequence-type-str
[unicode code points]: https://stackoverflow.com/questions/27331819/whats-the-difference-between-a-character-a-code-point-a-glyph-and-a-grapheme
