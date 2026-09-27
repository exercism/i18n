# المقدمة

`str` في Python هو [تسلسل غير قابل للتغيير][text sequence] من [نقاط ترميز Unicode][unicode code points].
وقد تشمل هذه الحروف والعلامات التشكيلية ومحارف التموضع والأعداد ورموز العملات والرموز التعبيرية وعلامات الترقيم والمسافات ومحارف فواصل الأسطر وغيرها.
 ولأنه غير قابل للتغيير، فإن قيمة كائن `str` في الذاكرة لا تتغير؛ والطرق التي تبدو وكأنها تعدّل السلسلة النصية تُرجع نسخة جديدة أو كائنًا جديدًا من `str`.


يمكن تعريف قيمة حرفية من نوع `str` باستخدام علامتي اقتباس مفردتين `'` أو مزدوجتين `"`. ومحرف الهروب `\` متاح عند الحاجة.


```python

>>> single_quoted = 'These allow "double quoting" without "escape" characters.'

>>> double_quoted = "These allow embedded 'single quoting', so you don't have to use an 'escape' character."

>>> escapes = 'If needed, a \'slash\' can be used as an escape character within a string when switching quote styles won\'t work.'
```

تُعرَّف السلاسل النصية متعددة الأسطر باستخدام `'''` أو `"""`.


```python
>>> triple_quoted =  '''Three single quotes or "double quotes" in a row allow for multi-line string literals.
  Line break characters, tabs and other whitespace are fully supported.

  You\'ll most often encounter these as "doc strings" or "doc tests" written just below the first line of a function or class definition.
    They\'re often used with auto documentation ✍ tools.
    '''
```

يمكن دمج السلاسل النصية باستخدام عامل `+`.
 ويُفضَّل استخدام هذا الأسلوب باعتدال، لأنه ليس سريع الأداء ولا يسهل الحفاظ عليه.


```python
language = "Ukrainian"
number = "nine"
word = "дев'ять"

sentence = word + " " + "means" + " " + number + " in " + language + "."

>>> print(sentence)
...
"дев'ять means nine in Ukrainian."
```

إذا احتجت إلى دمج `list` أو `tuple` أو `set` أو أي مجموعة أخرى من السلاسل النصية الفردية في `str` واحدة، فإن [`<str>.join(<iterable>)`][str-join] خيار أفضل:


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

يمكن الرجوع إلى نقاط الترميز داخل `str` برقم `0-based index` من اليسار:


```python
creative = '창의적인'

>>> creative[0]
'창'

>>> creative[2]
'적'

>>> creative[3]
'인'
```

تعمل الفهرسة أيضًا من اليمين، بدءًا من `-1-based index`:


```python
creative = '창의적인'

>>> creative[-4]
'창'

>>> creative[-2]
'적'

>>> creative[-1]
'인'

```

لا يوجد في Python نوع منفصل للحرف أو لـ "rune"، لذا فإن فهرسة سلسلة نصية تُنتج `str` جديدة بطول 1:


```python

>>> website = "exercism"
>>> type(website[0])
<class 'str'>

>>> len(website[0])
1

>>> website[0] == website[0:1] == 'e'
True
```

يمكن اختيار سلاسل نصية فرعية عبر _تدوين التقطيع_، باستخدام [`<str>[<start>:stop:<step>]`][common sequence operations] لإنتاج سلسلة نصية جديدة.
 ولا تشمل النتائج فهرس `stop`.
 وإذا لم يُحدَّد `start`، فسيكون فهرس البدء 0.
 وإذا لم يُحدَّد `stop`، فسيكون فهرس `stop` نهاية السلسلة النصية.


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

يمكن أيضًا تقسيم السلاسل النصية إلى سلاسل أصغر عبر [`<str>.split(<separator>)`][str-split]، والذي سيُرجع `list` من السلاسل الفرعية.
 ويمكن بعد ذلك فهرسة المصفوفة أو تقسيمها أكثر عند الحاجة.
 واستخدام `<str>.split()` دون أي وسائط سيقسم السلسلة النصية عند المسافات البيضاء.


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

يمكن أن تتكون الفواصل في `<str>.split()` من أكثر من محرف واحد.
تُستخدم **السلسلة النصية كاملة** لمطابقة التقسيم.


```python

>>> colors = """red,
orange,
green,
purple,
yellow"""

>>> colors.split(',\n')
['red', 'orange', 'green', 'purple', 'yellow']
```

تدعم السلاسل النصية جميع [عمليات التسلسل الشائعة][common sequence operations].
 ويمكن المرور على نقاط الترميز الفردية في حلقة عبر `for item in <str>`.
 ويمكن المرور على الفهارس _مع_ العناصر في حلقة عبر `for index, item in enumerate(<str>)`.


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
