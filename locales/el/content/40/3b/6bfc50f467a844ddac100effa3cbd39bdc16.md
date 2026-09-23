# Μορφοποίηση συμβολοσειρών

Το ενσωματωμένο `str` της Python μπορεί να αρχικοποιηθεί με δύο ισχυρές μεθόδους μορφοποίησης συμβολοσειρών: τα `f-strings` και τη `str.format()`. Η παρεμβολή συμβολοσειρών με `f'{variable}'` προτιμάται, επειδή είναι ένα ευανάγνωστο, πλήρες και πολύ γρήγορο module. Όταν χρειάζεται μια προσέγγιση φιλική προς τη διεθνοποίηση ή πιο ευέλικτη, η `str.format()` σου επιτρέπει να δημιουργήσεις σχεδόν όλες τις άλλες παραλλαγές του `str` που μπορεί να χρειαστείς.

# Κυριολεκτική παρεμβολή συμβολοσειράς. f-string

Η κυριολεκτική παρεμβολή συμβολοσειράς είναι ένας τρόπος να μορφοποιείς και να αξιολογείς εκφράσεις σε `str` γρήγορα και αποδοτικά, χρησιμοποιώντας το πρόθεμα `f` και τα άγκιστρα `{object}`. Μπορεί να χρησιμοποιηθεί με όλους τους τύπους συμβολοσειρών που περικλείουν το κείμενο: με απλά εισαγωγικά `'`, με διπλά εισαγωγικά `"` και, για πολλαπλές γραμμές και διαφυγή χαρακτήρων, με τριπλά εισαγωγικά `'''` ή `"""`.

Σε αυτό το βασικό παράδειγμα **f-string**, η μεταβλητή `name` εμφανίζεται στην αρχή της συμβολοσειράς, και η μεταβλητή `age` τύπου `int` μετατρέπεται σε `str` και εμφανίζεται μετά το `' is '`.

```python
>>> name, age = 'Artemis', 21
>>> f'{name} is {age} years old.'
'Artemis is 21 years old.'
```

Οι εκφράσεις που αξιολογεί ένα `f-string` μπορούν να είναι σχεδόν οτιδήποτε, οπότε ισχύουν οι συνήθεις προφυλάξεις για τον καθαρισμό της εισόδου. Μερικές από τις πολλές τιμές που μπορούν να αξιολογηθούν: `str`, αριθμοί, μεταβλητές, αριθμητικές εκφράσεις, εκφράσεις υπό συνθήκη, ενσωματωμένοι τύποι, slices, συναρτήσεις ή οποιαδήποτε αντικείμενα για τα οποία έχουν οριστεί μέθοδοι `__str__` ή `__repr__`. Μερικά παραδείγματα:

```python
>>> waves = {'water': 1, 'light': 3, 'sound': 5}

>>> f'"A dict can be represented with f-string: {waves}."'
'"A dict can be represented with f-string: {\'water\': 1, \'light\': 3, \'sound\': 5}."'

>>> f'Tenfold the value of "light" is {waves["light"]*10}.'
'Tenfold the value of "light" is 30.'
```

Η έξοδος ενός f-string υποστηρίζει τους ίδιους μηχανισμούς ελέγχου, όπως το _πλάτος_, τη _στοίχιση_ και την _ακρίβεια_, που περιγράφονται για τη `.format()`. Η παρεμβολή συμβολοσειρών δεν μπορεί να χρησιμοποιηθεί μαζί με το GNU gettext API για διεθνοποίηση (I18N) και τοπικοποίηση (L10N), οπότε πρέπει να χρησιμοποιηθεί η `str.format()`.

# Μέθοδος str.format()

Η `str.format()` επιτρέπει την αντικατάσταση placeholders μέσα στο κείμενο. Οι placeholders προσδιορίζονται με ονομαστικές θέσεις `{price}` ή με αριθμημένες θέσεις `{0}`, ή ως κενοί placeholders `{}`. Οι τιμές τους δίνονται ως παράμετροι στη μέθοδο `str.format()`. Παράδειγμα:

```python
>>> 'My text: {placeholder1} and {}.'.format(12, placeholder1='value1')
'My text: value1 and 12.'
```

Η `.format()` της Python υποστηρίζει μια ολόκληρη σειρά από [προσδιοριστικά μιας μίνι γλώσσας][format-mini-language] που μπορούν να χρησιμοποιηθούν για στοίχιση κειμένου, μετατροπή κ.λπ.

Ο σύνθετος προσδιοριστής μορφοποίησης είναι ο `{[<name>][!<conversion>][:<format_specifier>]}`:

- Το `<name>` μπορεί να είναι ένας ονομαστικός placeholder ή ένας αριθμός ή κενό.
- Το `!<conversion>` είναι προαιρετικό και πρέπει να είναι ένα από τα τρία: `!s` για τη [`str()`][str-conversion], `!r` για τη [`repr()`][repr-conversion] ή `!a` για τη [`ascii()`][ascii-conversion]. Από προεπιλογή, χρησιμοποιείται η `str()`.
- Το `:<format_specifier>` είναι προαιρετικό και έχει πολλές επιλογές, οι οποίες [αναφέρονται εδώ][format-specifiers].

Παράδειγμα μετατροπών για ένα γράμμα με διακριτικό σημείο σε ascii:

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

Παράδειγμα προσδιοριστών μορφοποίησης, [περισσότερα παραδείγματα στο τέλος αυτής της σελίδας][summary-string-format]:

```python
>>> "The number {0:d} has a representation in binary: '{0: >8b}'.".format(42)
"The number 42 has a representation in binary: '  101010'."
```

Η `str.format()` πρέπει να χρησιμοποιείται μαζί με το [GNU gettext API][gnu-gettext-api] για διεθνοποίηση (I18N) και τοπικοποίηση (L10N).

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
