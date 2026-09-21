# Bevezetés

A `str` a Pythonban [változtathatatlan sorozat][text sequence], amely [Unicode-kódpontokból][unicode code points] áll.
Ezek lehetnek betűk, diakritikus jelek, pozicionáló karakterek, számok, pénznemszimbólumok, emodzsik, írásjelek, szóköz- és sortöréskarakterek, és még sok más.
 Mivel változtathatatlan, a `str` objektum értéke a memóriában nem változik; a karakterláncot látszólag módosító metódusok egy új másolatot vagy a `str` objektum egy új példányát adják vissza.


Egy `str` literál aposztróffal `'` vagy idézőjellel `"` hozható létre. Az escape `\` karakter szükség szerint elérhető.


```python

>>> single_quoted = 'These allow "double quoting" without "escape" characters.'

>>> double_quoted = "These allow embedded 'single quoting', so you don't have to use an 'escape' character."

>>> escapes = 'If needed, a \'slash\' can be used as an escape character within a string when switching quote styles won\'t work.'
```

A többsoros karakterláncokat `'''` vagy `"""` használatával hozzuk létre.


```python
>>> triple_quoted =  '''Three single quotes or "double quotes" in a row allow for multi-line string literals.
  Line break characters, tabs and other whitespace are fully supported.

  You\'ll most often encounter these as "doc strings" or "doc tests" written just below the first line of a function or class definition.
    They\'re often used with auto documentation ✍ tools.
    '''
```

A karakterláncok a `+` operátorral fűzhetők össze.
 Ezt a módszert mértékkel érdemes használni, mert nem túl hatékony, és nehéz karbantartani.


```python
language = "Ukrainian"
number = "nine"
word = "дев'ять"

sentence = word + " " + "means" + " " + number + " in " + language + "."

>>> print(sentence)
...
"дев'ять means nine in Ukrainian."
```

Ha egy `list`, `tuple`, `set` vagy más, egyedi karakterláncokból álló gyűjteményt egyetlen `str`-ré kell összevonni, akkor a [`<str>.join(<iterable>)`][str-join] jobb választás:


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

A `str`-en belüli kódpontokra balról egy `0-based index` számmal hivatkozhatsz:


```python
creative = '창의적인'

>>> creative[0]
'창'

>>> creative[2]
'적'

>>> creative[3]
'인'
```

Az indexelés jobbról is működik, `-1-based index`-szel kezdve:


```python
creative = '창의적인'

>>> creative[-4]
'창'

>>> creative[-2]
'적'

>>> creative[-1]
'인'

```

A Pythonban nincs külön „karakter” vagy „rune” típus, ezért egy karakterlánc indexelése egy 1 hosszúságú új `str`-t eredményez:


```python

>>> website = "exercism"
>>> type(website[0])
<class 'str'>

>>> len(website[0])
1

>>> website[0] == website[0:1] == 'e'
True
```

A rész-sztringek _szeleteléses jelöléssel_, a [`<str>[<start>:stop:<step>]`][common sequence operations] használatával választhatók ki, ami egy új karakterláncot eredményez.
 Az eredmény nem tartalmazza a `stop` indexet.
 Ha nincs megadva `start`, akkor a kezdőindex 0 lesz.
 Ha nincs megadva `stop`, akkor a `stop` index a karakterlánc vége lesz.


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

A karakterláncok kisebb darabokra is bonthatók a [`<str>.split(<separator>)`][str-split] segítségével, amely rész-sztringek `list`-jét adja vissza.
 A listát ezután szükség esetén tovább indexelheted vagy bonthatod.
 Ha a `<str>.split()`-et argumentumok nélkül használod, a karakterláncot szóközök mentén bontja fel.


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

A `<str>.split()` elválasztója egynél több karakter is lehet.
A felbontáshoz a **teljes karakterláncot** veszi alapul.


```python

>>> colors = """red,
orange,
green,
purple,
yellow"""

>>> colors.split(',\n')
['red', 'orange', 'green', 'purple', 'yellow']
```

A karakterláncok minden [általános sorozatműveletet][common sequence operations] támogatnak.
 Az egyes kódpontokon ciklusban, a `for item in <str>` segítségével mehetsz végig.
 Az indexeket _az_ elemeikkel együtt ciklusban, a `for index, item in enumerate(<str>)` segítségével járhatod be.


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
