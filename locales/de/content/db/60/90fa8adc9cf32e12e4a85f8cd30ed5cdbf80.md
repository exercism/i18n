# Einführung

Ein `str` in Python ist eine [unveränderliche Sequenz][text sequence] von [Unicode-Codepunkten][unicode code points].
Diese können Buchstaben, diakritische Zeichen, Positionierungszeichen, Zahlen, Währungssymbole, Emojis, Satzzeichen, Leerzeichen und Zeilenumbruchzeichen und mehr umfassen.
Da sie unveränderlich sind, ändert sich der Wert eines `str`-Objekts im Speicher nicht; Methoden, die eine Zeichenkette zu verändern scheinen, geben eine neue Kopie oder Instanz dieses `str`-Objekts zurück.


Ein `str`-Literal kann mit einfachen `'` oder doppelten `"` Anführungszeichen deklariert werden. Das Escape-Zeichen `\` steht bei Bedarf zur Verfügung.


```python

>>> single_quoted = 'These allow "double quoting" without "escape" characters.'

>>> double_quoted = "These allow embedded 'single quoting', so you don't have to use an 'escape' character."

>>> escapes = 'If needed, a \'slash\' can be used as an escape character within a string when switching quote styles won\'t work.'
```

Mehrzeilige Zeichenketten werden mit `'''` oder `"""` deklariert.


```python
>>> triple_quoted =  '''Three single quotes or "double quotes" in a row allow for multi-line string literals.
  Line break characters, tabs and other whitespace are fully supported.

  You\'ll most often encounter these as "doc strings" or "doc tests" written just below the first line of a function or class definition.
    They\'re often used with auto documentation ✍ tools.
    '''
```

Zeichenketten können mit dem `+`-Operator verkettet werden.
 Diese Methode sollte sparsam eingesetzt werden, da sie nicht sehr leistungsfähig und schwer zu pflegen ist.


```python
language = "Ukrainian"
number = "nine"
word = "дев'ять"

sentence = word + " " + "means" + " " + number + " in " + language + "."

>>> print(sentence)
...
"дев'ять means nine in Ukrainian."
```

Wenn eine `list`, `tuple`, `set` oder eine andere Sammlung einzelner Zeichenketten zu einer einzigen `str` zusammengefügt werden soll, ist [`<str>.join(<iterable>)`][str-join] die bessere Option:


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

Auf Codepunkte innerhalb einer `str` kann von links mit einer `0-based index`-Nummer zugegriffen werden:


```python
creative = '창의적인'

>>> creative[0]
'창'

>>> creative[2]
'적'

>>> creative[3]
'인'
```

Die Indizierung funktioniert auch von rechts, beginnend mit einem `-1-based index`:


```python
creative = '창의적인'

>>> creative[-4]
'창'

>>> creative[-2]
'적'

>>> creative[-1]
'인'

```

In Python gibt es keinen separaten Typ für „Zeichen“ oder „Rune“, daher erzeugt die Indizierung einer Zeichenkette eine neue `str` der Länge 1:


```python

>>> website = "exercism"
>>> type(website[0])
<class 'str'>

>>> len(website[0])
1

>>> website[0] == website[0:1] == 'e'
True
```

Teilzeichenketten können über die _Slice-Notation_ ausgewählt werden, indem [`<str>[<start>:stop:<step>]`][common sequence operations] verwendet wird, um eine neue Zeichenkette zu erzeugen.
 Die Ergebnisse schließen den `stop`-Index aus.
 Wenn kein `start` angegeben ist, ist der Startindex 0.
 Wenn kein `stop` angegeben ist, ist der `stop`-Index das Ende der Zeichenkette.


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

Zeichenketten können auch über [`<str>.split(<separator>)`][str-split] in kleinere Zeichenketten zerlegt werden, was eine `list` von Teilzeichenketten zurückgibt.
 Die Liste kann dann bei Bedarf weiter indiziert oder zerlegt werden.
 Die Verwendung von `<str>.split()` ohne Argumente zerlegt die Zeichenkette an Leerraumzeichen.


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

Trennzeichen für `<str>.split()` können aus mehr als einem Zeichen bestehen.
Die **gesamte Zeichenkette** wird für den Split-Abgleich verwendet.


```python

>>> colors = """red,
orange,
green,
purple,
yellow"""

>>> colors.split(',\n')
['red', 'orange', 'green', 'purple', 'yellow']
```

Zeichenketten unterstützen alle [allgemeinen Sequenzoperationen][common sequence operations].
 Einzelne Codepunkte können in einer Schleife mit `for item in <str>` durchlaufen werden.
 Indizes _mit_ Elementen können in einer Schleife mit `for index, item in enumerate(<str>)` durchlaufen werden.


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
