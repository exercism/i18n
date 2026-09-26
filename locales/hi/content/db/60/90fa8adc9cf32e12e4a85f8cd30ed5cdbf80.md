# परिचय

Python में `str` [अपरिवर्तनीय अनुक्रम][text sequence] होता है, जो [यूनिकोड कोड पॉइंट][unicode code points] से बना होता है। इनमें अक्षर, विशेषक चिह्न, स्थिति बताने वाले अक्षर, संख्याएँ, मुद्रा चिह्न, इमोजी, विराम चिह्न, स्पेस और लाइन ब्रेक अक्षर, और भी बहुत कुछ शामिल हो सकता है। चूँकि यह अपरिवर्तनीय है, मेमोरी में `str` ऑब्जेक्ट की वैल्यू नहीं बदलती; जो मेथड स्ट्रिंग में बदलाव करते दिखते हैं, वे उस `str` ऑब्जेक्ट की एक नई कॉपी या नया इंस्टेंस लौटाते हैं।

`str` लिटरल को सिंगल `'` या डबल `"` कोट्स के ज़रिए घोषित किया जा सकता है। ज़रूरत पड़ने पर एस्केप `\` अक्षर भी इस्तेमाल किया जा सकता है।

```python

>>> single_quoted = 'These allow "double quoting" without "escape" characters.'

>>> double_quoted = "These allow embedded 'single quoting', so you don't have to use an 'escape' character."

>>> escapes = 'If needed, a \'slash\' can be used as an escape character within a string when switching quote styles won\'t work.'
```

मल्टी-लाइन स्ट्रिंग को `'''` या `"""` से घोषित किया जाता है।

```python
>>> triple_quoted =  '''Three single quotes or "double quotes" in a row allow for multi-line string literals.
  Line break characters, tabs and other whitespace are fully supported.

  You\'ll most often encounter these as "doc strings" or "doc tests" written just below the first line of a function or class definition.
    They\'re often used with auto documentation ✍ tools.
    '''
```

स्ट्रिंग को `+` ऑपरेटर से जोड़ा जा सकता है। इस तरीके का इस्तेमाल कम ही करना चाहिए, क्योंकि यह बहुत कुशल नहीं है और इसे बनाए रखना भी आसान नहीं है।

```python
language = "Ukrainian"
number = "nine"
word = "дев'ять"

sentence = word + " " + "means" + " " + number + " in " + language + "."

>>> print(sentence)
...
"дев'ять means nine in Ukrainian."
```

अगर अलग-अलग स्ट्रिंग के किसी `list`, `tuple`, `set` या किसी अन्य कलेक्शन को एक ही `str` में जोड़ना हो, तो [`<str>.join(<iterable>)`][str-join] बेहतर विकल्प है:

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

किसी `str` के भीतर के कोड पॉइंट्स को बाईं ओर से `0-based index` संख्या से रेफर किया जा सकता है:

```python
creative = '창의적인'

>>> creative[0]
'창'

>>> creative[2]
'적'

>>> creative[3]
'인'
```

दाईं ओर से भी इंडेक्स लगाया जा सकता है, और वह `-1-based index` से शुरू होता है:

```python
creative = '창의적인'

>>> creative[-4]
'창'

>>> creative[-2]
'적'

>>> creative[-1]
'인'

```

Python में “character” या "rune" नाम का कोई अलग टाइप नहीं है, इसलिए स्ट्रिंग पर इंडेक्स लगाने से लंबाई 1 की नई `str` बनती है:

```python

>>> website = "exercism"
>>> type(website[0])
<class 'str'>

>>> len(website[0])
1

>>> website[0] == website[0:1] == 'e'
True
```

सबस्ट्रिंग को _स्लाइस नोटेशन_ के ज़रिए चुना जा सकता है, जिसमें [`<str>[<start>:stop:<step>]`][common sequence operations] से एक नई स्ट्रिंग बनती है। परिणाम में `stop` इंडेक्स शामिल नहीं होता। अगर `start` नहीं दिया गया है, तो शुरुआती इंडेक्स 0 होगा। अगर `stop` नहीं दिया गया है, तो `stop` इंडेक्स स्ट्रिंग के अंत में होगा।

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

स्ट्रिंग को [`<str>.split(<separator>)`][str-split] के ज़रिए छोटी स्ट्रिंग में भी तोड़ा जा सकता है, जो सबस्ट्रिंग की एक `list` लौटाता है। ज़रूरत पड़ने पर उस ऐरे पर आगे इंडेक्स लगाया जा सकता है या उसे फिर से स्प्लिट किया जा सकता है। `<str>.split()` को बिना किसी आर्गुमेंट के इस्तेमाल करने पर स्ट्रिंग व्हाइटस्पेस पर टूट जाती है।

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

`<str>.split()` के सेपरेटर एक से ज़्यादा अक्षर के भी हो सकते हैं। स्प्लिट का मिलान **पूरी स्ट्रिंग** से किया जाता है।

```python

>>> colors = """red,
orange,
green,
purple,
yellow"""

>>> colors.split(',\n')
['red', 'orange', 'green', 'purple', 'yellow']
```

स्ट्रिंग सभी [common sequence operations][common sequence operations] का समर्थन करती है। हर कोड पॉइंट पर `for item in <str>` लिखकर लूप में एक-एक करके चला जा सकता है। इंडेक्स के _साथ_ आइटम पर `for index, item in enumerate(<str>)` लिखकर भी लूप में एक-एक करके चला जा सकता है।

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
