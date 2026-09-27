# مقدمه

`str` در Python یک [دنباله‌ی تغییرناپذیر][text sequence] از [کدپوینت‌های یونیکد][unicode code points] است.
این‌ها می‌توانند شامل حروف، نشانه‌های اعراب، نویسه‌های موقعیت‌دهی، اعداد، نمادهای ارز، ایموجی، نشانه‌گذاری، فاصله و نویسه‌های شکست خط و موارد بیشتر باشند.
 چون تغییرناپذیر است، مقدار یک شیء `str` در حافظه تغییر نمی‌کند؛ متدهایی که به نظر می‌رسد رشته را تغییر می‌دهند، یک رونوشت یا نمونه‌ی جدید از همان شیء `str` برمی‌گردانند.

یک مقدار ثابت `str` می‌تواند با کوتیشن تک `'` یا دوگانه `"` اعلام شود. نویسه‌ی فرار `\` در صورت نیاز در دسترس است.

```python

>>> single_quoted = 'These allow "double quoting" without "escape" characters.'

>>> double_quoted = "These allow embedded 'single quoting', so you don't have to use an 'escape' character."

>>> escapes = 'If needed, a \'slash\' can be used as an escape character within a string when switching quote styles won\'t work.'
```

رشته‌های چندخطی با `'''` یا `"""` اعلام می‌شوند.

```python
>>> triple_quoted =  '''Three single quotes or "double quotes" in a row allow for multi-line string literals.
  Line break characters, tabs and other whitespace are fully supported.

  You\'ll most often encounter these as "doc strings" or "doc tests" written just below the first line of a function or class definition.
    They\'re often used with auto documentation ✍ tools.
    '''
```

رشته‌ها می‌توانند با عملگر `+` به هم الحاق شوند. این روش باید کم استفاده شود، چون کارایی چندانی ندارد و نگهداری آن آسان نیست.

```python
language = "Ukrainian"
number = "nine"
word = "дев'ять"

sentence = word + " " + "means" + " " + number + " in " + language + "."

>>> print(sentence)
...
"дев'ять means nine in Ukrainian."
```

اگر قرار است یک `list`، `tuple`، `set` یا مجموعه‌ی دیگری از رشته‌های تک‌تک در یک `str` واحد ترکیب شود، [`<str>.join(<iterable>)`][str-join] گزینه‌ی بهتری است:

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

کدپوینت‌های درون یک `str` را می‌توان با شماره‌ی `0-based index` از سمت چپ ارجاع داد:

```python
creative = '창의적인'

>>> creative[0]
'창'

>>> creative[2]
'적'

>>> creative[3]
'인'
```

نمایه‌گذاری از سمت راست هم کار می‌کند، با شروع از `-1-based index`:

```python
creative = '창의적인'

>>> creative[-4]
'창'

>>> creative[-2]
'적'

>>> creative[-1]
'인'

```

در Python نوع جداگانه‌ای به نام «نویسه» یا «رون» وجود ندارد، بنابراین نمایه‌گذاری یک رشته یک `str` جدید به طول ۱ تولید می‌کند:

```python

>>> website = "exercism"
>>> type(website[0])
<class 'str'>

>>> len(website[0])
1

>>> website[0] == website[0:1] == 'e'
True
```

زیررشته‌ها را می‌توان با _نشانه‌گذاری برش_ انتخاب کرد، با استفاده از [`<str>[<start>:stop:<step>]`][common sequence operations] برای تولید یک رشته‌ی جدید. نتایج، ایندکس `stop` را شامل نمی‌شوند. اگر `start` داده نشود، ایندکس شروع ۰ خواهد بود. اگر `stop` داده نشود، ایندکس `stop` انتهای رشته خواهد بود.

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

رشته‌ها را می‌توان با [`<str>.split(<separator>)`][str-split] هم به رشته‌های کوچک‌تر تقسیم کرد، که یک `list` از زیررشته‌ها برمی‌گرداند. سپس می‌توان لیست را در صورت نیاز دوباره نمایه‌گذاری یا تقسیم کرد. استفاده از `<str>.split()` بدون هیچ آرگومانی، رشته را روی فضای خالی تقسیم می‌کند.

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

جداکننده‌های `<str>.split()` می‌توانند بیش از یک نویسه باشند. برای تطبیق تقسیم، از **کل رشته** استفاده می‌شود.

```python

>>> colors = """red,
orange,
green,
purple,
yellow"""

>>> colors.split(',\n')
['red', 'orange', 'green', 'purple', 'yellow']
```

رشته‌ها از همه‌ی [عملیات‌های رایج دنباله][common sequence operations] پشتیبانی می‌کنند. کدپوینت‌های تک‌تک را می‌توان با `for item in <str>` در یک حلقه پیمایش کرد. ایندکس‌ها _همراه با_ عنصرها را می‌توان با `for index, item in enumerate(<str>)` در یک حلقه پیمایش کرد.

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
