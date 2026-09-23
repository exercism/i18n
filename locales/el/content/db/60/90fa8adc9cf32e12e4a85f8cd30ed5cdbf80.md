# Εισαγωγή

Μια `str` στην Python είναι μια [αμετάβλητη ακολουθία][text sequence] από [σημεία κώδικα Unicode][unicode code points].
Αυτά μπορεί να περιλαμβάνουν γράμματα, διακριτικά σημεία, χαρακτήρες τοποθέτησης, αριθμούς, σύμβολα νομισμάτων, emoji, σημεία στίξης, χαρακτήρες κενού και αλλαγής γραμμής, και πολλά άλλα.
Καθώς είναι αμετάβλητη, η τιμή ενός αντικειμένου `str` στη μνήμη δεν αλλάζει. Οι μέθοδοι που φαίνεται να τροποποιούν μια συμβολοσειρά επιστρέφουν ένα νέο αντίγραφο ή στιγμιότυπο αυτού του αντικειμένου `str`.


Ένα λεκτικό `str` μπορεί να δηλωθεί με απλά `'` ή διπλά `"` εισαγωγικά. Ο χαρακτήρας διαφυγής `\` είναι διαθέσιμος όταν χρειάζεται.


```python

>>> single_quoted = 'These allow "double quoting" without "escape" characters.'

>>> double_quoted = "These allow embedded 'single quoting', so you don't have to use an 'escape' character."

>>> escapes = 'If needed, a \'slash\' can be used as an escape character within a string when switching quote styles won\'t work.'
```

Οι συμβολοσειρές πολλαπλών γραμμών δηλώνονται με `'''` ή `"""`.


```python
>>> triple_quoted =  '''Three single quotes or "double quotes" in a row allow for multi-line string literals.
  Line break characters, tabs and other whitespace are fully supported.

  You\'ll most often encounter these as "doc strings" or "doc tests" written just below the first line of a function or class definition.
    They\'re often used with auto documentation ✍ tools.
    '''
```

Οι συμβολοσειρές μπορούν να συνενωθούν με τον τελεστή `+`.
Αυτή η μέθοδος καλό είναι να χρησιμοποιείται με φειδώ, καθώς δεν είναι ιδιαίτερα αποδοτική ούτε εύκολη στη συντήρηση.


```python
language = "Ukrainian"
number = "nine"
word = "дев'ять"

sentence = word + " " + "means" + " " + number + " in " + language + "."

>>> print(sentence)
...
"дев'ять means nine in Ukrainian."
```

Αν μια συλλογή από μεμονωμένες συμβολοσειρές, όπως `list`, `tuple`, `set` ή κάτι άλλο, χρειάζεται να συνδυαστεί σε μία μόνο `str`, το [`<str>.join(<iterable>)`][str-join] είναι καλύτερη επιλογή:


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

Τα σημεία κώδικα μέσα σε μια `str` μπορούν να προσπελαστούν με έναν αριθμό `0-based index` από τα αριστερά:


```python
creative = '창의적인'

>>> creative[0]
'창'

>>> creative[2]
'적'

>>> creative[3]
'인'
```

Η πρόσβαση λειτουργεί και από τα δεξιά, ξεκινώντας με `-1-based index`:


```python
creative = '창의적인'

>>> creative[-4]
'창'

>>> creative[-2]
'적'

>>> creative[-1]
'인'

```

Δεν υπάρχει ξεχωριστός τύπος "χαρακτήρα" ή "rune" στην Python, οπότε η πρόσβαση με θέση σε μια συμβολοσειρά παράγει μια νέα `str` μήκους 1:


```python

>>> website = "exercism"
>>> type(website[0])
<class 'str'>

>>> len(website[0])
1

>>> website[0] == website[0:1] == 'e'
True
```

Οι υποσυμβολοσειρές μπορούν να επιλεγούν με _slice notation_, χρησιμοποιώντας [`<str>[<start>:stop:<step>]`][common sequence operations] για να παραχθεί μια νέα συμβολοσειρά.
Τα αποτελέσματα δεν περιλαμβάνουν τη θέση `stop`.
Αν δεν δοθεί `start`, η αρχική θέση θα είναι 0.
Αν δεν δοθεί `stop`, η θέση `stop` θα είναι το τέλος της συμβολοσειράς.


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

Οι συμβολοσειρές μπορούν επίσης να σπάσουν σε μικρότερες συμβολοσειρές με το [`<str>.split(<separator>)`][str-split], που επιστρέφει μια `list` από υποσυμβολοσειρές.
Στη συνέχεια, η λίστα μπορεί να προσπελαστεί με θέσεις ή να διαχωριστεί περαιτέρω, αν χρειάζεται.
Χρησιμοποιώντας το `<str>.split()` χωρίς ορίσματα, η συμβολοσειρά θα διαχωριστεί στα κενά.


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

Οι διαχωριστές για το `<str>.split()` μπορούν να αποτελούνται από περισσότερους από έναν χαρακτήρες.
Για την αντιστοίχιση του διαχωρισμού χρησιμοποιείται **ολόκληρη η συμβολοσειρά**.


```python

>>> colors = """red,
orange,
green,
purple,
yellow"""

>>> colors.split(',\n')
['red', 'orange', 'green', 'purple', 'yellow']
```

Οι συμβολοσειρές υποστηρίζουν όλες τις [κοινές πράξεις ακολουθιών][common sequence operations].
Μπορείς να διατρέξεις μεμονωμένα σημεία κώδικα σε έναν βρόχο με `for item in <str>`.
Μπορείς να διατρέξεις θέσεις _μαζί_ με τα στοιχεία τους σε έναν βρόχο με `for index, item in enumerate(<str>)`.


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
