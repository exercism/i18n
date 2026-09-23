# Σχετικά

Η Python αναπαριστά τις αληθείς και ψευδείς τιμές με τον τύπο [`bool`][bools], ο οποίος είναι υποκλάση του `int`. Υπάρχουν μόνο δύο Boolean τιμές σε αυτόν τον τύπο: `True` και `False`. Αυτές οι τιμές μπορούν να ανατεθούν σε μια μεταβλητή και να συνδυαστούν με τους [τελεστές Boolean][boolean-operators] (`and`, `or`, `not`):

```python
>>> true_variable = True and True
>>> false_variable = True and False

>>> true_variable = False or True
>>> false_variable = False or False

>>> true_variable = not False
>>> false_variable = not True
```

Οι [τελεστές Boolean][boolean-operators] χρησιμοποιούν _αποτίμηση βραχυκυκλώματος_, που σημαίνει ότι η έκφραση στη δεξιά πλευρά του τελεστή αποτιμάται μόνο αν χρειάζεται.

Κάθε τελεστής έχει διαφορετική προτεραιότητα: το `not` αποτιμάται πριν από το `and` και το `or`. Οι παρενθέσεις μπορούν να χρησιμοποιηθούν για να αποτιμηθεί ένα μέρος της έκφρασης πριν από τα υπόλοιπα:

```python
>>> not True and True
False

>>> not (True and False)
True
```

Όλοι οι `boolean operators` θεωρούνται χαμηλότερης προτεραιότητας από τους [`comparison operators`][comparisons] της Python, όπως τα `==`, `>`, `<`, `is` και `is not`.

## Μετατροπή τύπων και _truthiness_

Η συνάρτηση `bool` ([`bool()`][bool-function]) μετατρέπει οποιοδήποτε αντικείμενο σε μια Boolean τιμή. Από προεπιλογή, όλα τα αντικείμενα επιστρέφουν `True`, εκτός αν έχει οριστεί να επιστρέφουν `False`.

Μερικά `built-ins` θεωρούνται πάντα `False` εξ ορισμού:

- οι σταθερές `None` και `False`
- το μηδέν οποιουδήποτε _αριθμητικού τύπου_ (`int`, `float`, `complex`, `decimal` ή `fraction`)
- κενές _ακολουθίες_ και _συλλογές_ (`str`, `list`, `set`, `tuple`, `dict`, `range(0)`)

```python
>>> bool(None)
False

>>> bool(1)
True

>>> bool(0)
False

>>> bool([1,2,3])
True

>>> bool([])
False

>>> bool({"Pig" : 1, "Cow": 3})
True

>>> bool({})
False
```

Όταν ένα αντικείμενο χρησιμοποιείται σε ένα _Boolean περιβάλλον_, αξιολογείται με διαφάνεια ως _truthy_ ή _falsey_ χρησιμοποιώντας τη `bool()`:

```python
>>> a = "is this true?"
>>> b = []

# This will print "True", as a non-empty string is considered a "truthy" value
>>> if a:
...  print("True")

# This will print "False", as an empty list is considered a "falsey" value
>>> if not b:
...   print("False")
```

Οι κλάσεις μπορούν να ορίσουν πώς αξιολογούνται σε καταστάσεις _truthy_, αν υπερκαλύπτουν και υλοποιούν μια μέθοδο `__bool__()`, ή/και μια μέθοδο `__len__()`.

## Πώς λειτουργούν τα Boolean εσωτερικά

Ο τύπος `bool` είναι υλοποιημένος ως _υπο-τύπος_ του _int_. Αυτό σημαίνει ότι το `True` είναι _αριθμητικά ίσο_ με το `1` και το `False` είναι _αριθμητικά ίσο_ με το `0`. Αυτό είναι παρατηρήσιμο όταν τα συγκρίνουμε με έναν _τελεστή ισότητας_:

```python
>>> 1 == True
True

>>> 0 == False
True
```

Ωστόσο, τα `bools` είναι **ακόμα διαφορετικά** από τα `ints`, όπως φαίνεται όταν τα συγκρίνουμε με τον _τελεστή ταυτότητας_, το `is`:

```python
>>> 1 is True
False

>>> 0 is False
False
```

> Σημείωση: στην python >= 3.8, η χρήση ενός literal (όπως `1`, `''`, `[]` ή `{}`) στην _αριστερή πλευρά_ του `is` θα εμφανίσει μια προειδοποίηση.

Θεωρείται [αντιπρότυπο της Python][comparing to true in the wrong way] να χρησιμοποιείς τον τελεστή ισότητας για να συγκρίνεις μια μεταβλητή Boolean με το `True` ή το `False`. Αντ' αυτού, θα πρέπει να χρησιμοποιείς τον τελεστή ταυτότητας `is`:

```python

>>> flag = True

# Not "Pythonic"
>>> if flag == True:
...    print("This works, but it's not considered Pythonic.")

# A better way
>>> if flag:
...    print("Pythonistas prefer this pattern as more Pythonic.")
```

[Boolean-operators]: https://docs.python.org/3/library/stdtypes.html#boolean-operations-and-or-not
[bool-function]: https://docs.python.org/3/library/functions.html#bool
[bools]: https://docs.python.org/3/library/stdtypes.html#typebool
[comparing to true in the wrong way]: https://docs.quantifiedcode.com/python-anti-patterns/readability/comparison_to_true.html
[comparisons]: https://docs.python.org/3/library/stdtypes.html#comparisons
