# Introduction

En Python, une `str` est une [séquence immuable][text sequence] de [points de code Unicode][unicode code points].
Ces points de code peuvent être des lettres, des signes diacritiques, des caractères de positionnement, des nombres, des symboles monétaires, des emoji, de la ponctuation, des espaces, des caractères de saut de ligne, et bien d'autres choses encore.
Comme elle est immuable, la valeur d'un objet `str` en mémoire ne change pas ; les méthodes qui semblent modifier une _string_ renvoient une nouvelle copie, ou une nouvelle instance, de cet objet `str`.


Un littéral `str` peut être déclaré avec des guillemets simples `'` ou doubles `"`. Le caractère d'échappement `\` est disponible si nécessaire.


```python

>>> single_quoted = 'These allow "double quoting" without "escape" characters.'

>>> double_quoted = "These allow embedded 'single quoting', so you don't have to use an 'escape' character."

>>> escapes = 'If needed, a \'slash\' can be used as an escape character within a string when switching quote styles won\'t work.'
```

Les _strings_ multilignes se déclarent avec `'''` ou `"""`.


```python
>>> triple_quoted =  '''Three single quotes or "double quotes" in a row allow for multi-line string literals.
  Line break characters, tabs and other whitespace are fully supported.

  You\'ll most often encounter these as "doc strings" or "doc tests" written just below the first line of a function or class definition.
    They\'re often used with auto documentation ✍ tools.
    '''
```

On peut concaténer des _strings_ avec l'opérateur `+`.
Il vaut mieux en user avec parcimonie, car cette méthode n'est pas très performante et reste difficile à maintenir.


```python
language = "Ukrainian"
number = "nine"
word = "дев'ять"

sentence = word + " " + "means" + " " + number + " in " + language + "."

>>> print(sentence)
...
"дев'ять means nine in Ukrainian."
```

Si l'on doit combiner une `list`, un `tuple`, un `set` ou une autre collection de _strings_ en une seule `str`, [`<str>.join(<iterable>)`][str-join] est une meilleure option :


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

On peut référencer les points de code d'une `str` par un `0-based index` en partant de la gauche :


```python
creative = '창의적인'

>>> creative[0]
'창'

>>> creative[2]
'적'

>>> creative[3]
'인'
```

L'indexation fonctionne aussi depuis la droite, en partant d'un `-1-based index` :


```python
creative = '창의적인'

>>> creative[-4]
'창'

>>> creative[-2]
'적'

>>> creative[-1]
'인'

```

Il n'existe pas en Python de type « caractère » ou « rune » distinct, donc indexer une _string_ produit une nouvelle `str` de longueur 1 :


```python

>>> website = "exercism"
>>> type(website[0])
<class 'str'>

>>> len(website[0])
1

>>> website[0] == website[0:1] == 'e'
True
```

On peut sélectionner des sous-chaînes via la notation de tranche, en utilisant [`<str>[<start>:stop:<step>]`][common sequence operations] pour produire une nouvelle _string_.
Les résultats excluent l'indice `stop`.
Si aucun `start` n'est donné, l'indice de départ sera 0.
Si aucun `stop` n'est donné, l'indice `stop` correspondra à la fin de la _string_.


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

On peut aussi découper des _strings_ en _strings_ plus petites avec [`<str>.split(<separator>)`][str-split], qui renvoie une `list` de sous-chaînes.
Cette liste peut ensuite être indexée ou découpée davantage, si nécessaire.
Utiliser `<str>.split()` sans argument découpe la _string_ sur les espaces.


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

Les séparateurs de `<str>.split()` peuvent comporter plus d'un caractère.
C'est la **_string_ entière** qui est utilisée pour la correspondance du découpage.


```python

>>> colors = """red,
orange,
green,
purple,
yellow"""

>>> colors.split(',\n')
['red', 'orange', 'green', 'purple', 'yellow']
```

Les _strings_ prennent en charge toutes les [opérations courantes sur les séquences][common sequence operations].
On peut parcourir chaque point de code dans une boucle avec `for item in <str>`.
On peut parcourir les indices _avec_ les éléments correspondants dans une boucle avec `for index, item in enumerate(<str>)`.


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
